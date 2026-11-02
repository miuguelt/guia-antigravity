/* Catálogo de las 12 herramientas de Google Antigravity, protocolo de 6 pasos y matriz diagnóstica */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const ANTIGRAVITY_TOOLS = [
    {
      id: 'tool-01', code: 'Agent Manager (Ctrl+E)', category: 'Vistas del Sistema',
      title: '1. Agent Manager (Mission Control)',
      summary: 'Centro de mando para dirigir uno o varios agentes en paralelo sobre misiones completas, revisar artefactos y aprobar planes sin tocar código.',
      whenToUse: 'Cuando inicias un proyecto nuevo, delegas una funcionalidad completa o coordinas múltiples módulos desacoplados.',
      exampleCommand: 'Abre Agent Manager con Ctrl+E -> New Conversation -> /plan Construye el módulo de inventario.'
    },
    {
      id: 'tool-02', code: 'Editor View (Tab / Ctrl+I)', category: 'Vistas del Sistema',
      title: '2. Editor View, Supercomplete (Tab) y Edición en Línea (Ctrl+I)',
      summary: 'Vista de edición quirúrgica para inspeccionar archivos, aceptar sugerencias predictivas con Tab o seleccionar líneas específicas y transformarlas con Ctrl+I.',
      whenToUse: 'Cuando quieres cambiar una fórmula, traducir un bloque, ajustar un color o corregir un texto puntual en segundos.',
      exampleCommand: 'Selecciona la función en el editor -> presiona Ctrl+I -> "Ajusta el IVA al 19 % y redondea a pesos enteros".'
    },
    {
      id: 'tool-03', code: 'Artifacts & Diffs', category: 'Control de Calidad',
      title: '3. Artifacts (Implementation Plan / Walkthrough) y Comentarios Inline',
      summary: 'Documentos estructurados donde el agente presenta su plan antes de programar y su reporte de verificación al terminar. Puedes hacer clic en cualquier línea para dejar comentarios.',
      whenToUse: 'Antes de aprobar un cambio importante (revisando implementation_plan.md) y al auditar los cambios línea por línea (Diffs).',
      exampleCommand: 'Haz clic en el párrafo 3 del Implementation Plan -> comenta: "Usa la mediana en lugar del promedio" -> Proceed.'
    },
    {
      id: 'tool-04', code: '/plan', category: 'Comandos Slash',
      title: '4. Comando /plan (Planificación Estructurada)',
      summary: 'Obliga al agente a analizar primero los archivos, diseñar la arquitectura paso a paso y esperar tu aprobación antes de modificar el proyecto.',
      whenToUse: 'En todo ejercicio o requerimiento de más de un paso para evitar que la IA adivine o rompa lo existente.',
      exampleCommand: '/plan Diseña el cotizador leyendo @catalogo_productos.csv con semáforo de margen bruto.'
    },
    {
      id: 'tool-05', code: '/grill-me', category: 'Comandos Slash',
      title: '5. Comando /grill-me (Entrevista de Descubrimiento)',
      summary: 'Invierte los roles: antes de proponer una solución, el agente te entrevista con preguntas clave para descubrir reglas de negocio ocultas y casos borde.',
      whenToUse: 'Cuando tienes una idea general pero aún no has definido todos los detalles técnicos o excepciones del negocio.',
      exampleCommand: '/grill-me Quiero armar un sistema de comisiones para 12 vendedores con metas escalonadas.'
    },
    {
      id: 'tool-06', code: '/browser', category: 'Comandos Slash',
      title: '6. Subagente /browser (Verificación Visual e Interactiva)',
      summary: 'Abre un navegador real, interactúa con botones y formularios, comprueba los 4 estados (válido, inválido, vacío, reset) y captura evidencias.',
      whenToUse: 'Después de crear o modificar cualquier interfaz HTML para confirmar que los cálculos y el diseño adaptable funcionen de verdad.',
      exampleCommand: '/browser Abre calculadora_equilibrio.html, ingresa Costos Fijos 3000000 y verifica que dé 100 unidades.'
    },
    {
      id: 'tool-07', code: '/goal y /boost', category: 'Comandos Slash',
      title: '7. Comandos /goal (Autonomía) y /boost (Razonamiento Profundo)',
      summary: '/goal mantiene al agente iterando y verificando hasta cumplir todos los criterios de aceptación; /boost activa análisis multi-perspectiva para problemas complejos.',
      whenToUse: 'En proyectos integrales de Nivel 4, refactorizaciones profundas o algoritmos financieros y de optimización exigentes.',
      exampleCommand: '/goal Completa los 4 módulos de la Suite Pyme y no te detengas hasta que todas las pruebas pasen al 100 %.'
    },
    {
      id: 'tool-08', code: '/schedule', category: 'Comandos Slash',
      title: '8. Comando /schedule (Automatización Programada)',
      summary: 'Permite programar tareas recurrentes o temporizadores para que el agente ejecute auditorías, reportes o conciliaciones de forma periódica.',
      whenToUse: 'Para cierres semanales, revisión de vencimientos de contratos o monitoreo periódico de carpetas.',
      exampleCommand: '/schedule Ejecuta todos los viernes la auditoría de cierres semanales sobre @bitacora_cierres.json.'
    },
    {
      id: 'tool-09', code: '/compact y /learn', category: 'Comandos Slash',
      title: '9. Comandos /compact (Higiene de Contexto) y /learn (Aprendizaje Persistente)',
      summary: '/compact resume conversaciones largas liberando memoria de trabajo; /learn destila una corrección o flujo exitoso en una regla o habilidad permanente.',
      whenToUse: 'Usa /compact tras completar un módulo grande y /learn cuando corrijas un criterio que el agente nunca debe olvidar.',
      exampleCommand: '/learn Guarda como regla del proyecto que el margen bruto siempre se divide sobre el precio neto sin IVA.'
    },
    {
      id: 'tool-10', code: '@menciones', category: 'Contexto y Memoria',
      title: '10. Menciones @archivo y @carpeta (Verdad en Tierra)',
      summary: 'Conecta el prompt directamente con archivos reales de tu computador (.csv, .json, .txt, .md) evitando que el modelo invente datos o tarifas.',
      whenToUse: 'Siempre que el ejercicio involucre catálogos, listas de clientes, extractos bancarios o plantillas oficiales.',
      exampleCommand: 'Cruza las ventas de @conciliacion_ventas_banco.csv aplicando una tolerancia de 4 días.'
    },
    {
      id: 'tool-11', code: 'GEMINI.md / AI-PROJECT-MEMORY.md', category: 'Contexto y Memoria',
      title: '11. Memoria Multi-IDE (GEMINI.md, AGENTS.md y AI-PROJECT-MEMORY.md)',
      summary: 'Archivos en la raíz del proyecto que conservan la identidad, reglas de negocio, arquitectura y estado de avance entre sesiones y entre distintos editores.',
      whenToUse: 'Desde el día 1 de cualquier proyecto serio para evitar retrocesos cuando cambias de sesión o de herramienta.',
      exampleCommand: 'Lee @AI-PROJECT-MEMORY.md y @GEMINI.md antes de proponer cambios en este repositorio.'
    },
    {
      id: 'tool-12', code: 'Skills + MCP + Sandbox', category: 'Extensibilidad y Seguridad',
      title: '12. Skills (.agents/skills/), Conectores MCP y Terminal con Permisos',
      summary: 'Empaqueta procedimientos expertos en SKILL.md, conecta bases externas mediante Model Context Protocol (MCP) y controla permisos de terminal con seguridad.',
      whenToUse: 'Para estandarizar auditorías repetitivas de tu equipo y conectar fuentes de datos bajo el principio de menor privilegio.',
      exampleCommand: 'Aplica la habilidad @.agents/skills/auditoria-gastos/SKILL.md sobre la relación de gastos del mes.'
    }
  ];

  const PROTOCOL_6_STEPS = [
    { step: 1, cmd: '/grill-me', name: 'Descubrimiento de Reglas y Casos Borde', detail: 'Haz que el agente te pregunte qué pasa si un dato llega vacío, negativo o en otra moneda antes de diseñar.' },
    { step: 2, cmd: '/plan', name: 'Contrato de Arquitectura y Aprobación', detail: 'Exige un Implementation Plan modular (< 250 líneas por archivo) y coméntalo en línea antes de dar Proceed.' },
    { step: 3, cmd: '@archivos + GEMINI.md', name: 'Inyección de Datos Semilla y Memoria', detail: 'Conecta tus archivos @semilla (.csv/.json) y las reglas de GEMINI.md como única fuente de verdad.' },
    { step: 4, cmd: 'Tarea Conceptual + Caso Testigo', name: 'Cálculo Manual Independiente', detail: 'Mientras el agente construye, calcula en papel un Caso Testigo con respuesta exacta conocida.' },
    { step: 5, cmd: '/browser + 4 Estados', name: 'Verificación Determinista en Vivo', detail: 'Comprueba la aplicación con entrada válida (Caso Testigo), entrada inválida, campo vacío y botón Reset.' },
    { step: 6, cmd: 'Diffs + /learn', name: 'Auditoría de Cambios y Persistencia', detail: 'Revisa los diffs visuales, actualiza AI-PROJECT-MEMORY.md y persiste aprendizajes con /learn.' }
  ];

  const DIAGNOSTIC_MATRIX = [
    { symptom: 'La IA inventa precios, nombres de clientes o fórmulas que no pedí.', cause: 'Falta de contexto anclado en archivos locales.', solution: 'Descarga o crea el archivo de datos reales y referéncialo con @nombre_archivo junto con GEMINI.md.' },
    { symptom: 'Al pedir una mejora en el turno 3, la IA daña un botón que ya funcionaba en el turno 1.', cause: 'Archivo monolítico gigante o ausencia de memoria de invariantes.', solution: 'Exige arquitectura modular (< 250 líneas por archivo), revisa el Diff visual antes de aceptar y mantén AI-PROJECT-MEMORY.md.' },
    { symptom: 'La calculadora muestra "NaN" o "$undefined" cuando borro un número.', cause: 'No se especificaron los 4 estados obligatorios de interfaz.', solution: 'Exige en el prompt validación explícita para los 4 estados: válido, inválido, vacío y reinicio (reset).' },
    { symptom: 'No sé si el resultado financiero que muestra la pantalla está bien calculado.', cause: 'Validación pasiva ("se ve bonito") sin Caso Testigo previo.', solution: 'Realiza siempre la Tarea Conceptual en Paralelo y comprueba un Caso Testigo numérico antes de aprobar.' }
  ];

  return { ANTIGRAVITY_TOOLS, PROTOCOL_6_STEPS, DIAGNOSTIC_MATRIX };
});
