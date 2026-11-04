/* Motor puro constructor y evaluador de Prompts, GEMINI.md y SKILL.md para Google Antigravity */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const PROMPT_PRESETS = {
    cotizador: {
      role: 'Director Comercial y Especialista en Pricing B2B',
      goal: 'Construir un cotizador web interactivo con semáforo de margen bruto y vista de cliente imprimible.',
      contextFiles: '@catalogo_productos.csv, @GEMINI.md',
      command: 'planning',
      constraints: 'Moneda COP en formato es-CO; Margen Bruto = (Precio_Neto - Costo) / Precio_Neto; bloquear si margen < 25 %.',
      conceptualTopic: 'Diferencia entre Recargo sobre Costo (Markup) y Margen Bruto sobre Precio Neto'
    },
    conciliador: {
      role: 'Auditor Financiero Senior y Especialista en Tesorería',
      goal: 'Cruzar el libro interno de ventas contra el extracto bancario detectando comisiones de pasarela y partidas en tránsito.',
      contextFiles: '@conciliacion_ventas_banco.csv, @GEMINI.md',
      command: 'planning',
      constraints: 'Tolerancia de compensación de 0 a 4 días; calcular Neto = Bruto * (1 - %Comision); probar los 4 estados de interfaz.',
      conceptualTopic: 'Emparejamiento Tolerante (Fuzzy Matching Financiero) y Partidas Conciliatorias'
    },
    inventario: {
      role: 'Ingeniero en Cadena de Suministro (Supply Chain)',
      goal: 'Crear un sistema de control de existencias que calcule Stock de Seguridad, Punto de Reorden (ROP) y Clasificación ABC.',
      contextFiles: '@inventario_bodega.csv, @GEMINI.md',
      command: 'planning',
      constraints: 'ROP = (Venta_Promedio * Tiempo_Entrega) + Stock_Seguridad; alerta roja cuando Stock_Actual <= ROP.',
      conceptualTopic: 'Punto de Reorden (ROP) y Colchón Protector de Stock de Seguridad'
    }
  };

  /* Modos y comandos confirmados en la documentación de Antigravity. 'planning' es el modo Planning del agente (no lleva prefijo). */
  const VALID_COMMANDS = ['planning', '/grill-me', '/goal', '/schedule', '/browser'];

  function normalizeSpec(rawSpec) {
    const s = rawSpec || {};
    return {
      role: String(s.role || '').trim(),
      goal: String(s.goal || s.objective || '').trim(),
      contextFiles: String(s.contextFiles || s.atFiles || '').trim(),
      command: String(s.command || 'planning').trim(),
      constraints: String(s.constraints || (s.formula ? ('Español de Colombia (es-CO), regla: ' + s.formula + '; probar los 4 estados.') : '')).trim(),
      conceptualTopic: String(s.conceptualTopic || s.conceptualTheme || '').trim()
    };
  }

  function exerciseToPromptSpec(ex) {
    if (!ex) return null;
    const match = String(ex.initialPrompt || '').match(/Actúa como ([^.\n]+)/i);
    const role = (match && match[1].trim()) || (ex.nonDevProfile ? 'Especialista en ' + ex.nonDevProfile : 'Consultor de Automatización Antigravity');
    const goal = ex.goal || ex.objective || ('Construir solución modular y verificada para ' + (ex.title || 'el ejercicio') + '.');
    const atFiles = ex.kit && ex.kit.filename ? ('@' + ex.kit.filename + ', @GEMINI.md') : '@datos_semilla.csv, @GEMINI.md';
    const formula = (ex.testCase && ex.testCase.formulaHint) ? ex.testCase.formulaHint : 'Validación matemática determinista';
    const unit = (ex.testCase && ex.testCase.unit) ? ex.testCase.unit : 'unidades';
    const constraints = 'Español de Colombia (es-CO), moneda ' + unit + '; Regla: ' + formula + '; probar los 4 estados (válido, inválido, vacío y reset).';
    const conceptualTheme = ex.conceptualTaskTitle || ex.title || 'Estudio Conceptual';
    const testCase = ex.testCase || { sampleInput: '100', expectedValue: 100 };
    return {
      role: role, objective: goal, goal: goal, atFiles: atFiles, contextFiles: atFiles,
      command: ((String(ex.initialPrompt || '').match(/^\/(grill-me|goal)\b/) || [])[0]) || 'planning', constraints: constraints, formula: formula, testCase: testCase,
      conceptualTheme: conceptualTheme, conceptualTopic: conceptualTheme
    };
  }

  function scorePromptSpec(rawSpec) {
    const spec = normalizeSpec(rawSpec);
    let score = 0;
    const checks = [];

    if (spec.role.length >= 8) {
      score += 20;
      checks.push({ ok: true, label: 'Rol experto definido con claridad (+20 %)' });
    } else {
      checks.push({ ok: false, label: 'Falta definir el rol experto (ej. Auditor Financiero Senior)' });
    }

    if (spec.goal.length >= 15) {
      score += 20;
      checks.push({ ok: true, label: 'Objetivo funcional concreto y observable (+20 %)' });
    } else {
      checks.push({ ok: false, label: 'El objetivo es muy corto o ambiguo' });
    }

    if (spec.contextFiles.includes('@')) {
      score += 20;
      checks.push({ ok: true, label: 'Anclado a archivos reales con @menciones (+20 %)' });
    } else {
      checks.push({ ok: false, label: 'Incluye al menos un archivo semilla con @ (ej. @datos.csv)' });
    }

    if (VALID_COMMANDS.includes(spec.command)) {
      score += 20;
      checks.push({ ok: true, label: 'Usa un modo de trabajo real de Antigravity (' + (spec.command === 'planning' ? 'modo Planning' : spec.command) + ') (+20 %)' });
    } else {
      checks.push({ ok: false, label: 'Elige cómo trabaja el agente: modo Planning, /grill-me o /goal' });
    }

    if (spec.constraints.length >= 12) {
      score += 20;
      checks.push({ ok: true, label: 'Declara fórmulas, moneda y restricciones verificables (+20 %)' });
    } else {
      checks.push({ ok: false, label: 'Agrega restricciones numéricas o reglas de negocio explícitas' });
    }

    const level = score >= 80 ? 'Profesional Asertivo' : (score >= 60 ? 'Intermedio Funcional' : 'Básico Ambiguo');
    return { score, level, checks };
  }

  function buildAntigravityPrompt(rawSpec) {
    const spec = normalizeSpec(rawSpec);
    const cmd = spec.command || 'planning';
    const role = spec.role || 'Arquitecto de Soluciones y Especialista de Dominio';
    const goal = spec.goal || 'Construir una herramienta interactiva verificada para mi proyecto.';
    const files = spec.contextFiles || '@datos_semilla.csv y @GEMINI.md';
    const constraints = spec.constraints || 'Español de Colombia (es-CO), moneda COP, cero datos inventados y cobertura de los 4 estados (válido, inválido, vacío y reset).';

    return [
      (cmd.startsWith('/') ? cmd + ' ' : '') + 'Actúa como ' + role + '.',
      'No busco un prototipo improvisado: necesito una solución modular y determinista dentro de mi carpeta de trabajo.',
      'Antes de modificar archivos, preséntame un Implementation Plan y espera mi aprobación.',
      '',
      '[1. OBJETIVO Y CONTEXTO EN TIERRA]',
      '- Objetivo principal: ' + goal,
      '- Fuentes de datos obligatorias: ' + files,
      '',
      '[2. REGLAS DE NEGOCIO Y RESTRICCIONES INNEGOCIABLES]',
      '- ' + constraints,
      '- Implementa los 4 estados obligatorios de interfaz: Entrada Válida (Caso Testigo), Entrada Inválida (números negativos o texto mal formado), Entrada Vacía (sin mostrar NaN) y Botón de Reinicio (Reset).',
      '- Mantén cada archivo por debajo de 250 líneas y garantiza compatibilidad local.',
      '',
      '[3. VERIFICACIÓN ANTES DE ENTREGAR]',
      '- Escribe pruebas automáticas (node --test) para cada función de cálculo, ejecútalas y corrige hasta que pasen.',
      '- Abre la herramienta con /browser, comprueba el Caso Testigo y resume la evidencia en el Walkthrough.'
    ].join('\n');
  }

  function buildConceptualTaskGuide(rawSpec) {
    const spec = normalizeSpec(rawSpec);
    const topic = spec.conceptualTopic || 'Verificación manual del Caso Testigo y reglas de negocio';
    return [
      'GUÍA DE TAREA CONCEPTUAL EN PARALELO (MIENTRAS EL AGENTE CONSTRUYE)',
      '1. Tema de estudio activo: ' + topic + '.',
      '2. Toma una hoja y calcula a mano 1 Caso Testigo usando los datos de ' + (spec.contextFiles || 'tu archivo semilla') + '.',
      '3. Anota qué debe responder la aplicación si alguien deja un campo vacío o escribe un número negativo.',
      '4. Cuando Antigravity termine, ingresa tu Caso Testigo y verifica que el resultado coincida al 100 %.'
    ].join('\n');
  }

  function buildGeminiMdTemplate(rawSpec) {
    const spec = normalizeSpec(rawSpec);
    return [
      '# GEMINI.md — Memoria Permanente del Proyecto',
      '',
      '## 1. Rol y Propósito',
      '- Especialidad activa: ' + (spec.role || 'Consultoría y Operaciones Empresariales') + '.',
      '- Objetivo del sistema: ' + (spec.goal || 'Herramienta operativa local libre de alucinaciones') + '.',
      '',
      '## 2. Reglas Innegociables',
      '- Idioma: Español de Colombia (`es-CO`) y moneda en Pesos Colombianos (`COP`).',
      '- Fuentes de verdad: ' + (spec.contextFiles || '@datos_semilla.csv') + '.',
      '- Restricciones de dominio: ' + (spec.constraints || 'Validar entradas y no usar datos ficticios ocultos') + '.',
      '- Probar siempre los 4 estados: válido, inválido, vacío y reinicio (`reset`).'
    ].join('\n');
  }

  function buildSkillMdTemplate(rawSpec) {
    const spec = normalizeSpec(rawSpec);
    const slug = (spec.conceptualTopic || 'auditoria-operativa')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 32) || 'auditoria-operativa';

    return [
      '---',
      'name: ' + slug,
      'description: Ejecuta y audita el flujo de "' + (spec.goal || 'validación operativa') + '" aplicando reglas deterministas.',
      '---',
      '',
      '# Procedimiento Operativo Estándar (' + slug + ')',
      '',
      '1. Leer los archivos de entrada: ' + (spec.contextFiles || '@datos_semilla.csv') + '.',
      '2. Aplicar las reglas de negocio: ' + (spec.constraints || 'Verificación matemática exacta sin redondeos arbitrarios') + '.',
      '3. Comprobar los 4 estados (válido, inválido, vacío y reset) y generar reporte con hallazgos verificables.'
    ].join('\n');
  }

  return {
    PROMPT_PRESETS,
    normalizeSpec,
    scorePromptSpec,
    exerciseToPromptSpec,
    buildAntigravityPrompt,
    buildConceptualTaskGuide,
    buildGeminiMdTemplate,
    buildSkillMdTemplate
  };
});
