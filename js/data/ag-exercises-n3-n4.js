/* Datos de ejercicios Antigravity — Niveles 3 y 4 (Ejercicios 11 al 26) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    const ext = require('./ag-exercises-n4-plus.js');
    module.exports = factory(ext.AG_EXERCISES_N4_PLUS);
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory(root.AGPortal.AG_EXERCISES_N4_PLUS));
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (extList) {
  'use strict';

  const BASE_N3_N4 = [
    {
      id: 11,
      level: 3,
      levelName: 'Nivel 3: Sistemas y Skills en Antigravity',
      title: 'Construcción de un CRM Relacional con Embudo Ponderado y Alertas de Seguimiento',
      duration: '25 min de práctica guiada',
      complexity: 'Avanzado (Guiado para No-Desarrolladores)',
      nonDevProfile: 'Gerentes de Ventas, Consultoras, Inmobiliarias, B2B',
      goal: 'Construir en Antigravity un sistema CRM comercial completo con entidades conectadas (.json, .sql y .csv) y cálculo real del Valor Ponderado del Pipeline.',
      businessChallenge: 'Eliminar el desorden comercial conectando empresas, oportunidades y actividades con proyección ponderada real de ingresos.',
      agentRoleAction: 'El agente lee cartera, esquema SQL y actividades (@) para programar crm_empresarial.html con llaves foráneas y alertas de abandono.',
      learnerParallelAction: 'Tú revisas en el plan las llaves primarias y foráneas de las 3 tablas, y compruebas que la oportunidad cerrada no sume al embudo ni genere alerta.',
      professionalOutputCriteria: 'CRM relacional navegable con validación de llaves, embudo visual ponderado y semáforo de oportunidades sin seguimiento.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @cartera_crm_relacional.json, @schema_crm_relacional.sql y @actividades_seguimiento.csv.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Verifica que el plan respete las 3 tablas del SQL y la regla de embudo del JSON.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: dibuja el diagrama entidad-relación de las 3 tablas.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Arquitecto de Sistemas CRM.\nLee @cartera_crm_relacional.json, @schema_crm_relacional.sql y @actividades_seguimiento.csv y construye crm_empresarial.html con las 3 entidades del SQL: empresas, oportunidades y actividades.\n1. Valor Nominal y Valor Ponderado del embudo (Valor_COP × Probabilidad_Pct / 100), aplicando la regla de embudo del JSON.\n2. Alerta roja para oportunidades abiertas sin próximo seguimiento.\n3. Vista por empresa con sector, oportunidades y actividades relacionadas.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Bases de Datos Relacionales: Llaves Primarias, Foráneas y Valor Ponderado del Embudo',
      conceptualTheory: 'En un modelo relacional cada Empresa se guarda una sola vez con su Llave Primaria (EMP-01) y sus Oportunidades apuntan a ese código mediante una Llave Foránea. Para proyectar ingresos realistas se multiplica el valor de cada negocio por su probabilidad de cierre.',
      conceptualTaskSteps: [
        'Toma la empresa EMP-01 con dos negocios abiertos: OP-101 por $10.000.000 al 50 % y OP-102 por $4.000.000 al 25 %.',
        'Multiplica cada negocio por su probabilidad: ($10.000.000 * 0,50) + ($4.000.000 * 0,25) = $5.000.000 + $1.000.000.',
        'Suma ambos resultados: el Valor Ponderado esperado es exactamente $6.000.000 COP.'
      ],
      parallelToolPrompt: 'Explícame sin jerga técnica qué es una Llave Primaria y una Llave Foránea y por qué el Valor Ponderado del Pipeline es más confiable que sumar cotizaciones brutas.',
      refinementPrompt: 'Exige que al mover una oportunidad a "Negociación" sea obligatorio registrar la fecha y hora del próximo seguimiento.',
      kit: { filename: 'cartera_crm_relacional.json', type: 'zip', description: 'Cartera relacional (.json), esquema SQL con llaves primarias y foráneas (.sql) y actividades (.csv).' },
      testCase: { label: 'Valor Ponderado del Embudo ($10.000.000×50 % + $4.000.000×25 %)', sampleInput: '6000000', expectedValue: 6000000, tolerance: 1, unit: 'COP', formulaHint: '$5.000.000 + $1.000.000 = $6.000.000 COP' }
    },
    {
      id: 12,
      level: 3,
      levelName: 'Nivel 3: Sistemas y Skills en Antigravity',
      title: 'Creación de Habilidades Reutilizables (Skills en .agents/skills/) para Auditar Gastos',
      duration: '25 min de práctica guiada',
      complexity: 'Avanzado (Técnica Oficial Antigravity)',
      nonDevProfile: 'Auditores, Consultores, Analistas Financieros, Líderes de Equipo',
      goal: 'Empaquetar un procedimiento estándar dentro de .agents/skills/auditoria-gastos/SKILL.md para auditar recibos CSV y soportes XML detectando compras fraccionadas (Split Transactions).',
      businessChallenge: 'Convertir un procedimiento de auditoría financiera en una habilidad autónoma permanente (.agents/skills/) contra evasión de topes de gasto.',
      agentRoleAction: 'El agente crea la Skill en .agents/skills/auditoria-gastos/ y construye visor_auditoria_skill.html con reglas de fraccionamiento.',
      learnerParallelAction: 'Tú revisas la Skill instalada y compruebas que detecte un solo grupo fraccionado, sin marcar la compra de Laura (suma bajo el tope) ni las de Julián en proveedores distintos.',
      professionalOutputCriteria: 'Habilidad oficial SKILL.md con frontmatter YAML válido y visor web con marcado crítico de recibos sospechosos.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @SKILL.md, @relacion_gastos_viaticos.csv y @factura_electronica_fraccionada.xml.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Comprueba que el plan instale la Skill en .agents/skills/auditoria-gastos/SKILL.md y agrupe por Empleado + Fecha + NIT.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: explica por qué la Skill sirve para auditar cualquier semana futura sin repetir el prompt.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.',
        'Paso 6 (Reutilizar): Abre una conversación nueva y escribe solo: "Audita la relación de gastos de esta carpeta". Comprueba que el agente use la Skill sin que se la expliques.'
      ],
      initialPrompt: 'Actúa como Ingeniero de Automatización en Google Antigravity y Auditor Interno.\n1. Instala la habilidad en .agents/skills/auditoria-gastos/SKILL.md basándote en @SKILL.md.\n2. Aplícala a @relacion_gastos_viaticos.csv y al soporte @factura_electronica_fraccionada.xml para construir visor_auditoria_skill.html.\n3. El visor muestra los gastos que exceden el tope individual y los grupos fraccionados (mismo empleado, fecha y NIT, con 2 o más recibos y suma mayor a $200.000 COP), con las horas de emisión del XML.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Anatomía de una Skill (SOP) y Detección de Fraccionamiento de Compras',
      conceptualTheory: 'Una Skill en Antigravity convierte un Procedimiento Operativo Estándar (SOP) en una capacidad permanente del agente. En auditoría financiera, agrupar por (Empleado + Fecha + Proveedor) permite descubrir cuando una compra de $350.000 se divide en dos facturas de $175.000 para evadir el tope de autorización de $200.000.',
      conceptualTaskSteps: [
        'Agrupa los recibos por la llave compuesta: Empleado + Fecha + NIT_Proveedor.',
        'Suma los dos recibos de $175.000 COP emitidos el mismo día: $175.000 + $175.000 = $350.000 COP.',
        'Como $350.000 > $200.000 (tope autorizado) y hay 2 recibos, el motor marca alerta crítica de fraccionamiento.'
      ],
      parallelToolPrompt: 'Explícame cómo estructurar el encabezado YAML y las reglas de un archivo SKILL.md en Antigravity para que el agente ejecute auditorías sin ambigüedad.',
      refinementPrompt: 'Añade en la Skill y en visor_auditoria_skill.html la validación contra una lista blanca de NIT de proveedores autorizados.',
      kit: { filename: 'SKILL.md', type: 'zip', description: 'Plantilla oficial SKILL.md (.md), relación de gastos con viáticos (.csv) y soporte XML fraccionado (.xml).' },
      testCase: { label: 'Suma detectada en compra fraccionada (2 recibos de $175.000 el mismo día)', sampleInput: '350000', expectedValue: 350000, tolerance: 1, unit: 'COP', formulaHint: '$175.000 + $175.000 = $350.000 COP (> tope de $200.000)' }
    },
    {
      id: 13,
      level: 3,
      levelName: 'Nivel 3: Sistemas y Skills en Antigravity',
      title: 'Simulador de Tesorería a 12 Meses: Utilidad Contable vs. Dinero Real en Banco',
      duration: '25 min de práctica guiada',
      complexity: 'Avanzado',
      nonDevProfile: 'Dueños de Negocio, Directores Administrativos, Emprendedores',
      goal: 'Construir un modelo interactivo de flujo de caja alimentado por CSV, JSON y YAML que demuestre el desfase entre emitir una factura a crédito de 60 días y pagar costos fijos de contado.',
      businessChallenge: 'Prevenir la insolvencia proyectando la brecha entre facturación contable y liquidez real cuando se concede crédito a clientes.',
      agentRoleAction: 'El agente procesa bases contables (@), programa simulador_tesoreria_12m.html con alerta de iliquidez y selector de plazos.',
      learnerParallelAction: 'Tú cambias el plazo de cobro a 0, 30, 60 y 90 días y explicas por qué la utilidad contable no cambia, pero el saldo en banco sí.',
      professionalOutputCriteria: 'Simulador financiero interactivo con curvas de caja vs. utilidad y módulo de descuento por pronto pago.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @flujo_tesoreria_base.csv, @calendario_cartera_60dias.json y @obligaciones_fijas_contado.yaml.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Verifica que el plan calcule los cobros desplazando las ventas según el plazo y que no use saldos escritos a mano.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: identifica en qué mes la empresa necesitaría un crédito con cobro a 90 días.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Director de Tesorería Corporativa.\nCon @flujo_tesoreria_base.csv, @calendario_cartera_60dias.json y @obligaciones_fijas_contado.yaml construye simulador_tesoreria_12m.html.\n1. Vista Contable mes a mes: ventas facturadas menos pagos.\n2. Vista de Caja en Banco: parte del saldo inicial y cobra cada venta según el plazo elegido (0, 30, 60 o 90 días) y la regla de cobro del JSON.\n3. Alerta de brecha de liquidez en cada mes con saldo menor que $0 y el monto mínimo de crédito necesario.\n4. Comprueba que los pagos del CSV coincidan con el desglose del YAML, incluida la prima de junio y diciembre.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Ciclo de Conversión de Efectivo: Por Qué una Empresa Rentable en Papel Quiebra por Liquidez',
      conceptualTheory: 'Si vendes $60.000.000 en enero y febrero con $20.000.000 de ganancia contable mensual, pero tus clientes pagan a 60 días (marzo) mientras tú pagas $40.000.000 de nómina y proveedores de contado cada mes, en febrero tu banco quedará en -$30.000.000 aunque contablemente seas rentable.',
      conceptualTaskSteps: [
        'Saldo inicial en banco el 1 de enero = $50.000.000 COP. Pagos mensuales de contado = $40.000.000 COP.',
        'Fin de enero (ventas a 60 días -> cobro $0): $50.000.000 - $40.000.000 = $10.000.000 COP en banco.',
        'Fin de febrero (cobro $0): $10.000.000 - $40.000.000 = -$30.000.000 COP (déficit de caja a cubrir).'
      ],
      parallelToolPrompt: 'Explícame con un ejemplo claro qué es el Ciclo de Conversión de Efectivo y por qué crecer rápido vendiendo a 60 días consume el efectivo del negocio.',
      refinementPrompt: 'Agrega una calculadora de Descuento por Pronto Pago (3 % por pagar en Mes 0) vs. costo de crédito de capital de trabajo.',
      kit: { filename: 'flujo_tesoreria_base.csv', type: 'zip', description: 'Proyección de flujo (.csv), calendario de vencimientos a 60 días (.json) y obligaciones de contado (.yaml).' },
      testCase: { label: 'Saldo en banco al mes 2 vendiendo a 60 días (Inicio $50M - 2×$40M)', sampleInput: '-30000000', expectedValue: -30000000, tolerance: 1, unit: 'COP', formulaHint: '$50.000.000 - $40.000.000 (Ene) - $40.000.000 (Feb) = -$30.000.000 COP' }
    },
    {
      id: 14,
      level: 3,
      levelName: 'Nivel 3: Sistemas y Skills en Antigravity',
      title: 'Academia Interna y Evaluador de Competencias Basado en Escenarios Ramificados',
      duration: '25 min de práctica guiada',
      complexity: 'Avanzado',
      nonDevProfile: 'Recursos Humanos, Líderes de Área, Docentes, Capacitadores',
      goal: 'Construir una plataforma interactiva de entrenamiento basada en dilemas laborales reales (Taxonomía de Bloom) con rúbrica y cálculo de brechas por competencia.',
      businessChallenge: 'Evaluar competencias laborales reales mediante dilemas situacionales en lugar de exámenes memorísticos teóricos.',
      agentRoleAction: 'El agente estructura escenarios y rúbrica Bloom (@) para crear academia_evaluacion_equipos.html con puntuación ponderada y feedback.',
      learnerParallelAction: 'Tú escribes un escenario de tu área con sus 3 opciones y su nivel de Bloom, y compruebas que el agente aplique la regla de refuerzo a Vendedora_03.',
      professionalOutputCriteria: 'Plataforma de evaluación interactiva con retroalimentación inmediata por decisión y certificado imprimible.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @escenarios_competencias.json, @rubrica_competencias_bloom.md y @resultados_equipo_piloto.csv.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Revisa que el plan use el umbral y la regla de refuerzo de la rúbrica, no solo el promedio.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: diseña un dilema laboral propio con opción óptima, aceptable y riesgosa.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Diseñador Instruccional Senior.\nLee @escenarios_competencias.json, @rubrica_competencias_bloom.md y @resultados_equipo_piloto.csv y construye academia_evaluacion_equipos.html.\n1. Presenta cada escenario con su nivel de Bloom y 3 opciones en orden aleatorio; al elegir, muestra la consecuencia y el puntaje.\n2. Calcula el promedio final y el estado de certificación con las reglas de la rúbrica.\n3. Muestra un tablero con los resultados del equipo piloto.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Diseño de Evaluaciones Aplicadas: Taxonomía de Bloom y Distractores Plausibles',
      conceptualTheory: 'Evaluar memoria no predice el desempeño real en el puesto de trabajo. Al presentar un caso con restricciones reales y distractores basados en errores frecuentes (complacencia sin control o rigidez burocrática), mides criterio profesional verificable.',
      conceptualTaskSteps: [
        'Un participante responde 4 escenarios: en 3 elige la decisión Óptima (100 pts) y en 1 elige la decisión Aceptable (60 pts).',
        'Suma el puntaje obtenido: 100 + 100 + 100 + 60 = 360 puntos.',
        'Divide entre los 4 escenarios: 360 / 4 = 90 puntos de índice de competencia.'
      ],
      parallelToolPrompt: 'Explícame cómo redactar preguntas de nivel Analizar y Evaluar en la Taxonomía de Bloom usando distractores plausibles del trabajo diario.',
      refinementPrompt: 'Añade en academia_evaluacion_equipos.html un certificado imprimible en @media print cuando el promedio supere 85 puntos.',
      kit: { filename: 'escenarios_competencias.json', type: 'zip', description: 'Banco de 4 escenarios laborales (.json), rúbrica pedagógica Bloom (.md) y resultados piloto (.csv).' },
      testCase: { label: 'Promedio de competencia (3 decisiones de 100 pts y 1 de 60 pts)', sampleInput: '90', expectedValue: 90, tolerance: 0.1, unit: 'puntos', formulaHint: '(100 + 100 + 100 + 60) / 4 = 90 puntos' }
    },
    {
      id: 15,
      level: 3,
      levelName: 'Nivel 3: Sistemas y Skills en Antigravity',
      title: 'Motor de Conciliación Automática: Cruce de Libro de Ventas vs. Extracto Bancario con Pasarela',
      duration: '30 min de práctica guiada',
      complexity: 'Avanzado Consolidado',
      nonDevProfile: 'Contabilidad, Tesorería, Comercio Electrónico, Administración',
      goal: 'Construir un motor que empareje ventas internas contra el extracto bancario considerando desfases de fecha (1 a 4 días) y descuentos de comisión de pasarela.',
      businessChallenge: 'Automatizar la conciliación contable tolerando desfases de dispersión bancaria y deducciones de comisión de pasarela de pagos.',
      agentRoleAction: 'El agente programa conciliador_automatico.html con algoritmo de 3 pasadas (exacta, tolerante con comisión y partidas en tránsito).',
      learnerParallelAction: 'Tú revisas que el agente empareje el lote del 22 de octubre con las 2 ventas del 20 y que deje en tránsito la venta del 30 y como partida sin registrar la cuota de manejo.',
      professionalOutputCriteria: 'Motor de conciliación con acta de cierre formal, visualización de partidas conciliadas y pendientes de compensación.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @conciliacion_ventas_banco.csv, @extracto_bancario_octubre.csv y @reglas_pasarela_pagos.json.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Confirma que el plan tenga 3 pasadas y que contemple lotes que agrupan varias ventas del mismo día.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: explica por qué el extracto no trae el número de la venta.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Auditor Financiero Senior.\nProcesa @conciliacion_ventas_banco.csv, @extracto_bancario_octubre.csv y @reglas_pasarela_pagos.json y construye conciliador_automatico.html con emparejamiento en 3 pasadas:\n1. Monto neto exacto (aplicando la comisión del medio de pago) y fecha dentro de la ventana de compensación.\n2. Lotes: suma de ventas con tarjeta del mismo día que coincide con un solo abono.\n3. Partidas en tránsito y cargos bancarios no registrados.\nGenera un acta de conciliación imprimible.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Algoritmo de Emparejamiento Tolerante (Fuzzy Matching Financiero) en Conciliaciones',
      conceptualTheory: 'Un cruce rígido fracasa cuando la pasarela de pagos deposita 2 días después descontando su comisión. El motor evalúa si dentro de la ventana de compensación `[Fecha, Fecha + 4 días]` existe un abono igual a `Venta * (1 - Tasa_Comision)`.',
      conceptualTaskSteps: [
        'Venta registrada con tarjeta el 10 de octubre = $200.000 COP. Comisión pactada con pasarela = 4 % (0,04).',
        'Comisión descontada = $200.000 * 0,04 = $8.000 COP.',
        'Abono neto que debe aparecer en el extracto bancario = $200.000 - $8.000 = $192.000 COP.'
      ],
      parallelToolPrompt: 'Explícame los 4 componentes de una conciliación bancaria profesional y cómo cuadrar el saldo según libros contra el saldo según extracto.',
      refinementPrompt: 'Agrega en conciliador_automatico.html la carga de un segundo extracto (noviembre) para que la venta en tránsito de octubre se concilie automáticamente.',
      kit: { filename: 'conciliacion_ventas_banco.csv', type: 'zip', description: 'Libro de ventas (.csv), extracto bancario de octubre (.csv) y reglas de pasarela de pagos (.json).' },
      testCase: { label: 'Abono neto en banco tras comisión del 4 % sobre venta de $200.000', sampleInput: '192000', expectedValue: 192000, tolerance: 1, unit: 'COP', formulaHint: '$200.000 × (1 - 0,04) = $192.000 COP' }
    },
    {
      id: 16,
      level: 4,
      levelName: 'Nivel 4: Maestría en Antigravity',
      title: 'Orquestación de Múltiples Agentes en Paralelo desde el Agent Manager (Contratos de Datos)',
      duration: '35 min de práctica guiada',
      complexity: 'Extremo (Orquestación Multi-Agente)',
      nonDevProfile: 'Directores de Operaciones, Product Managers, Fundadores',
      goal: 'Coordinar varios agentes en paralelo desde el Agent Manager, cada uno con su propio archivo, unidos por el contrato de integración del JSON.',
      businessChallenge: 'Desacoplar subsistemas operativos mediante contratos de datos estrictos para coordinar agentes de IA concurrentes sin sobrescribir archivos.',
      agentRoleAction: 'Un agente diseña el plan de integración; otros 3 agentes construyen cada módulo en paralelo con sus pruebas, y el primero los une en sistema_eventos_integrado.html.',
      learnerParallelAction: 'Tú abres el Agent Manager, lanzas un agente por módulo y vigilas que ninguno modifique el archivo de otro; al final revisas que los 3 cumplan las firmas del contrato.',
      professionalOutputCriteria: 'Sistema integrado modular desacoplado con 3 módulos independientes, alerta de aforo crítico y cálculo de margen de evento en vivo.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el kit (@esquema_evento.json, @contrato_interfaz_modulos.sql y @asistentes_confirmados.csv), descomprímelo y abre la carpeta en Antigravity.',
        'Paso 2 (Planear): En modo Planning pega el Prompt Inicial y aprueba solo el plan de integración; no permitas que este agente escriba los módulos.',
        'Paso 3 (Paralelo): Abre el Agent Manager y crea 3 conversaciones, una por módulo: "Implementa solo modulo_registro.js según integracion.modulos de @esquema_evento.json, con sus pruebas node --test". Repite con salones y finanzas.',
        'Paso 4 (Integrar): Cuando los 3 terminen, pide al agente de integración que una los módulos en sistema_eventos_integrado.html, ejecute todas las pruebas y lo verifique con /browser.',
        'Paso 5 (Verificar): Revisa que el Salón B muestre el exceso de aforo contando solo los confirmados e ingresa ese valor en el simulador.'
      ],
      initialPrompt: 'Actúa como Arquitecto Principal de Sistemas en Google Antigravity.\nLee @esquema_evento.json, @contrato_interfaz_modulos.sql y @asistentes_confirmados.csv.\n1. Propón el plan de integración con 3 módulos independientes según integracion.modulos del JSON: modulo_registro.js, modulo_salones.js y modulo_finanzas.js.\n2. Define para cada módulo sus pruebas de aceptación con datos reales del CSV (por ejemplo, inscritos confirmados por salón).\n3. No implementes los módulos: otros agentes los harán en paralelo. Tu entrega es el plan y el archivo final sistema_eventos_integrado.html que los une cuando estén listos.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Desacoplamiento Modular y Contratos de Datos para Trabajo Multi-Agente sin Colisiones',
      conceptualTheory: 'Para que varios agentes trabajen en paralelo desde el Agent Manager sin pisarse el código, primero se fija un Contrato de Datos inmutable (`esquema_evento.json`) y se asigna un archivo distinto a cada subsistema.',
      conceptualTaskSteps: [
        'Revisa la capacidad del Salón B en el contrato: Capacidad_Maxima = 80 sillas.',
        'Inscritos actuales a la conferencia magistral en Salón B = 120 personas.',
        'Exceso de aforo detectado por el Subsistema B = 120 - 80 = 40 personas por reubicar.'
      ],
      parallelToolPrompt: 'Explícame con una analogía empresarial qué significa Bajo Acoplamiento y Alta Cohesión al dividir un proyecto entre varios agentes en el Agent Manager.',
      refinementPrompt: 'Añade en el Subsistema B un botón de Reasignación Inteligente que sugiera mover la charla a un salón con capacidad suficiente.',
      kit: { filename: 'esquema_evento.json', type: 'zip', description: 'Contrato JSON compartido (.json), esquema SQL de salones (.sql) y lista de asistentes (.csv).' },
      testCase: { label: 'Exceso de aforo detectado (120 inscritos en salón de 80 sillas)', sampleInput: '40', expectedValue: 40, tolerance: 0, unit: 'personas', formulaHint: '120 inscritos - 80 sillas de capacidad = 40 personas de sobrecupo' }
    },
    {
      id: 17,
      level: 4,
      levelName: 'Nivel 4: Maestría en Antigravity',
      title: 'Integración Segura de Fuentes de Datos y Gobernanza MCP (Model Context Protocol)',
      duration: '30 min de práctica guiada',
      complexity: 'Extremo (Conectores MCP)',
      nonDevProfile: 'Directores de Operaciones, Analistas de Negocio, Consultores',
      goal: 'Auditar una política de menor privilegio y confirmación humana (Human-in-the-Loop) para servidores MCP, contrastándola con la bitácora real de llamadas.',
      businessChallenge: 'Gobernar conexiones de agentes a bases de datos y APIs con políticas de menor privilegio y retención de pedidos para firma humana.',
      agentRoleAction: 'El agente aplica la política de @mcp_servers_config.yaml y las reglas de @mcp_politicas_seguridad.json, audita @bitacora_auditoria_mcp.log y construye centro_integracion_mcp.html.',
      learnerParallelAction: 'Tú auditas la bitácora contra la política y encuentras las 2 llamadas que la violaron; además, revisas que PED-904, con exactamente 15 días, no quede retenido.',
      professionalOutputCriteria: 'Panel de gobernanza MCP con cola de aprobación humana, retenciones por mora y reporte de violaciones encontradas en la bitácora.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @mcp_politicas_seguridad.json, @mcp_servers_config.yaml y @bitacora_auditoria_mcp.log.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Comprueba que el plan distinga la política interna (YAML) de la configuración real de servidores MCP de Antigravity.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: clasifica 5 acciones de tu trabajo en solo lectura, escritura controlada y confirmación humana.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.',
        'Paso 6 (MCP real): Abre el gestor de servidores MCP de Antigravity y revisa qué herramientas expone un servidor instalado. Compáralas con allowed_tools del YAML.'
      ],
      initialPrompt: 'Actúa como Arquitecto de Integración Empresarial y Especialista en MCP.\nCon @mcp_politicas_seguridad.json, @mcp_servers_config.yaml y @bitacora_auditoria_mcp.log construye centro_integracion_mcp.html que:\n1. Muestre por servidor su modo (read_only, controlled_write, human_in_the_loop) y sus herramientas permitidas.\n2. Retenga los pedidos con mora mayor que el umbral hasta aprobación humana.\n3. Audite cada línea de la bitácora contra la política y marque las violaciones con la regla incumplida.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Principio de Menor Privilegio y Confirmación Humana (Human-in-the-Loop) en MCP',
      conceptualTheory: 'Un agente conectado por MCP debe tener permiso de Solo Lectura para consultar y cruzar datos, pero cualquier acción que despache mercancía crítica, modifique saldos o envíe cobros externos debe exigir confirmación explícita del operador humano.',
      conceptualTaskSteps: [
        'Analiza los 5 pedidos listos en bodega cruzados con la cartera de clientes.',
        'Detecta cuántos pertenecen a clientes con mora superior a 15 días (3 pedidos).',
        'Verifica que esos 3 pedidos pasen a estado "Pendiente de Firma Humana" antes de despachar.'
      ],
      parallelToolPrompt: 'Explícame qué es el protocolo MCP y cómo aplicar el Principio de Menor Privilegio y Human-in-the-Loop en una empresa.',
      refinementPrompt: 'Añade en centro_integracion_mcp.html un validador interactivo de archivos mcp_servers_config.yaml que alerte si algún conector externo tiene permisos de escritura sin Human-in-the-Loop.',
      kit: { filename: 'mcp_politicas_seguridad.json', type: 'zip', description: 'Lote de pedidos y políticas MCP (.json), configuración de servidores (.yaml) y log de auditoría (.log).' },
      testCase: { label: 'Pedidos retenidos por regla Human-in-the-Loop (mora > 15 días)', sampleInput: '3', expectedValue: 3, tolerance: 0, unit: 'pedidos', formulaHint: 'De 5 pedidos en bodega, 3 superan los 15 días de mora y exigen firma humana' }
    },
    {
      id: 18,
      level: 4,
      levelName: 'Nivel 4: Maestría en Antigravity',
      title: 'Optimizador Inteligente de Turnos y Cobertura Laboral sin Infracciones de Descanso (Ley 2101 — 42 h)',
      duration: '35 min de práctica guiada',
      complexity: 'Extremo',
      nonDevProfile: 'Clínicas, Colegios, Restaurantes, Plantas, Logística',
      goal: 'Construir un planificador semanal de turnos que valide restricciones duras (tope legal de 42 horas semanales de la Ley 2101 vigente desde julio de 2026 y prohibición de turno Noche seguido de Mañana) garantizando un balance óptimo de cobertura.',
      businessChallenge: 'Optimizar la matriz semanal de turnos para 5 colaboradores cubriendo la demanda operativa sin violar la jornada máxima legal de 42 horas ni programar turnos continuos sin descanso obligatorio.',
      agentRoleAction: 'El agente programa optimizador_turnos.html validando restricciones duras (Hard Constraints), alertando turnos en conflicto y calculando el balance de cobertura semanal de 210 horas.',
      learnerParallelAction: 'Tú separas las restricciones duras de las blandas y revisas en la matriz que nadie tenga Mañana después de Noche y que cada turno tenga una persona de mando.',
      professionalOutputCriteria: 'Planificador visual de turnos con matriz de conflictos en vivo, validación de descansos legales según Ley 2101 (42 h) y balance de 210 horas de cobertura ordinaria sin recargos no autorizados.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @plantilla_turnos_equipo.csv, @normativa_jornada_laboral.md y @demanda_turnos_semanal.json.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Verifica que el plan explique cómo garantiza la cobertura de mando con 2 supervisoras y 1 especialista.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: propón una rotación para las 3 personas de mando que cumpla la regla Noche-Mañana.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Especialista en Investigación de Operaciones y Legislación Laboral Colombiana.\nCon @plantilla_turnos_equipo.csv, @normativa_jornada_laboral.md y @demanda_turnos_semanal.json construye optimizador_turnos.html que genere y audite la matriz semanal:\n1. Cubre las personas requeridas por franja y día de la demanda.\n2. Respeta todas las restricciones duras de la norma (42 h semanales, 1 turno por día, nada de Mañana después de Noche, mando en cada turno).\n3. Intenta cumplir las restricciones blandas y explica cuáles no pudo cumplir.\n4. Muestra horas por persona, horas totales programadas y costo de la nómina semanal.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Optimización de Turnos con Restricciones Duras (Hard Constraints) y Cumplimiento Legal (Ley 2101 — 42 h)',
      conceptualTheory: 'En la automatización de horarios laborales no basta con multiplicar empleados por horas nominales. Un algoritmo asertivo debe modelar restricciones duras vigentes: desde el 15 de julio de 2026 la Ley 2101 fija la jornada ordinaria máxima en 42 horas semanales en Colombia y exige descanso obligatorio entre turnos. La cobertura de 5 colaboradores debe cuadrar exactamente 210 horas ordinarias distribuidas sin fatiga ni sanciones.',
      conceptualTaskSteps: [
        'Plantilla activa: 5 colaboradores de tiempo completo con jornada ordinaria máxima legal de 42 horas semanales (Ley 2101).',
        'Auditoría de descansos: Verifica que ningún colaborador con turno Noche sea programado al día siguiente en turno Mañana.',
        'Balance de cobertura: Comprueba que la programación semanal balancee exactamente 5 × 42 = 210 horas de cobertura ordinaria sin incurrir en sobrecostos ni sanciones.'
      ],
      parallelToolPrompt: 'Explícame cómo formular un problema de asignación de turnos con restricciones duras (42h semanales de la Ley 2101 y descanso interjornada) y restricciones blandas sin recurrir a horas extras.',
      refinementPrompt: 'Añade en optimizador_turnos.html un detector de alertas en tiempo real que resalte en rojo cualquier intento de superar las 42 horas o asignar turno Mañana tras turno Noche.',
      kit: { filename: 'plantilla_turnos_equipo.csv', type: 'zip', description: 'Plantilla de colaboradores (.csv), normativa de jornada laboral 42h (.md) y demanda por turno (.json).' },
      testCase: { label: 'Horas ordinarias programadas en la semana para cubrir la demanda', sampleInput: '210', expectedValue: 210, tolerance: 0, unit: 'horas', formulaHint: '6 días × (2 personas × 7 h + 2 × 7 h + 1 × 7 h) = 210 horas = 5 colaboradores × 42 h' }
    },
    {
      id: 19,
      level: 4,
      levelName: 'Nivel 4: Maestría en Antigravity',
      title: 'Simulador de Riesgo de Proyectos por Método de Monte Carlo y Estimación PERT (3 Puntos)',
      duration: '30 min de práctica guiada',
      complexity: 'Extremo',
      nonDevProfile: 'Inversionistas, Gerentes de Proyecto, Estrategas, Ingenieros',
      goal: 'Construir un simulador estocástico que calcule la duración esperada PERT y ejecute escenarios de Monte Carlo para definir fechas y presupuestos con 85 % de certeza.',
      businessChallenge: 'Eliminar el sesgo optimista en la estimación de cronogramas y presupuestos modelando la incertidumbre probabilística (PERT / Monte Carlo).',
      agentRoleAction: 'El agente procesa estimaciones de 3 puntos (@), crea simulador_montecarlo.html y corre 5.000 iteraciones calculando P50, P85 y P90.',
      learnerParallelAction: 'Tú identificas la ruta crítica del grafo y explicas por qué el P85, y no el promedio, es la fecha que conviene prometer.',
      professionalOutputCriteria: 'Simulador estocástico con histograma de probabilidad acumulada, percentil P85 de compromiso y diagrama de Tornado.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @estimaciones_pert_proyecto.csv, @grafo_ruta_critica.json y @parametros_montecarlo.yaml.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Comprueba que el plan respete las dependencias del grafo (ET-02 y ET-03 en paralelo) y que use una semilla fija para que la simulación sea repetible.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: calcula la duración PERT de una etapa y compárala con la más probable.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Especialista en Análisis Cuantitativo de Riesgos.\nCon @estimaciones_pert_proyecto.csv, @grafo_ruta_critica.json y @parametros_montecarlo.yaml construye simulador_montecarlo.html.\n1. Calcula la duración PERT de cada etapa.\n2. Ejecuta las iteraciones del YAML con una semilla fija, respetando las dependencias del grafo, y muestra P50, P85 y P90 del proyecto.\n3. Calcula la probabilidad de superar el plazo de compromiso y la penalidad esperada.\n4. Dibuja un Gráfico de Tornado con el costo por día adicional de cada etapa.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'La Falacia de los Promedios y la Estimación Ponderada PERT de 3 Puntos',
      conceptualTheory: 'Los retrasos en proyectos reales son asimétricos: una etapa que suele tardar 8 días rara vez termina en menos de 5, pero un bloqueo puede llevarla a 20 días. La fórmula PERT `(Optimista + 4×Probable + Pesimista) / 6` captura esa asimetría.',
      conceptualTaskSteps: [
        'Toma la etapa de Permisos: Optimista (O) = 5 días | Más Probable (M) = 8 días | Pesimista (P) = 20 días.',
        'Multiplica el valor más probable por 4: 4 * 8 = 32.',
        'Suma y divide entre 6: (5 + 32 + 20) / 6 = 57 / 6 = 9,5 días esperados.'
      ],
      parallelToolPrompt: 'Explícame qué es la Falacia de los Promedios en gestión de proyectos y cómo leer los percentiles P50 y P85 en una simulación de Monte Carlo.',
      refinementPrompt: 'Añade en simulador_montecarlo.html un Gráfico de Tornado que ordene qué etapa aporta mayor incertidumbre al presupuesto total.',
      kit: { filename: 'estimaciones_pert_proyecto.csv', type: 'zip', description: 'Estimaciones PERT de 3 puntos (.csv), grafo de ruta crítica (.json) y configuración Monte Carlo (.yaml).' },
      testCase: { label: 'Duración esperada PERT en días (Optimista=5, Probable=8, Pesimista=20)', sampleInput: '9.5', expectedValue: 9.5, tolerance: 0.05, unit: 'días', formulaHint: '(5 + 4×8 + 20) / 6 = 57 / 6 = 9,5 días' }
    },
    {
      id: 20,
      level: 4,
      levelName: 'Nivel 4: Maestría en Antigravity',
      title: 'Proyecto Cumbre en Antigravity: Sistema Operativo Integral Pyme con Copiloto Auditor',
      duration: '40 min de práctica guiada',
      complexity: 'Maestría Total (Solución Integral End-to-End)',
      nonDevProfile: 'Cualquier Profesional, Emprendedor o Líder graduado de la ruta',
      goal: 'Integrar el modo Planning, GEMINI.md, Skills, datos relacionales (.json, .csv, .sql, .md) y /browser en una Suite Empresarial conectada (Ventas + Inventario + Tesorería + Copiloto Auditor).',
      businessChallenge: 'Consolidar la visión holística de una empresa integrando ventas, existencias de bodega y tesorería con un copiloto de decisiones directivas.',
      agentRoleAction: 'El agente integra todos los insumos (@) para programar suite_empresarial_antigravity.html conectando los 4 módulos operativos.',
      learnerParallelAction: 'Tú trazas la cadena Ventas → Bodega → Caja y desafías al Copiloto: le preguntas por qué el pedido por cobrar no aparece en el flujo de caja.',
      professionalOutputCriteria: 'ERP integral modular responsivo con tablero de mando gerencial, alertas cruzadas y copiloto auditor semanal.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @sistema_pyme_semilla.json, @catalogo_y_bodega_pyme.csv, @esquema_erp_pyme.sql y @reglas_copiloto_auditor.md.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Verifica que el plan use el esquema SQL como modelo de datos y que distinga caja (Cobrado) de cartera (Por cobrar).',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: dibuja el mapa de causa y efecto entre un pedido, el inventario y la caja.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y revisa el diff antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como CTO y Consultor Principal de Negocios.\nCon @sistema_pyme_semilla.json, @catalogo_y_bodega_pyme.csv, @esquema_erp_pyme.sql y @reglas_copiloto_auditor.md construye suite_empresarial_antigravity.html con:\n1. Módulo Comercial: pedidos con su estado de cobro.\n2. Módulo de Inventario: ROP de cada producto con la fórmula de las reglas.\n3. Módulo de Tesorería: utilidad operativa de caja, reserva y flujo neto disponible.\n4. Copiloto Auditor: las 3 decisiones prioritarias de la semana, cada una con el dato que la respalda.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Pensamiento Sistémico: Conexión en Cadena entre Ventas, Inventario y Flujo de Caja Neto',
      conceptualTheory: 'En un sistema empresarial integrado, cada pedido actualiza las existencias en bodega, las cuentas por cobrar y el flujo de caja neto después de separar la reserva impositiva.',
      conceptualTaskSteps: [
        'Ingresos cobrados del mes = $12.000.000 COP | Egresos operativos pagados = $7.800.000 COP.',
        'Utilidad Operativa antes de reserva = $12.000.000 - $7.800.000 = $4.200.000 COP.',
        'Reserva impositiva y de seguridad (15 % de $4.200.000) = $630.000 COP -> Flujo de Caja Neto Disponible = $4.200.000 - $630.000 = $3.570.000 COP.'
      ],
      parallelToolPrompt: 'Explícame cómo aplicar el Pensamiento Sistémico y el Balanced Scorecard para dirigir una Pyme apoyada por agentes en Google Antigravity.',
      refinementPrompt: 'Crea además el archivo .agents/skills/auditoria-integral/SKILL.md para que el agente audite semanalmente los datos de la Suite Operativa.',
      kit: { filename: 'sistema_pyme_semilla.json', type: 'zip', description: 'Estado maestro de la Pyme (.json), catálogo y bodega (.csv), esquema ERP (.sql) y reglas del Copiloto (.md).' },
      testCase: { label: 'Flujo de Caja Neto tras reserva del 15 % (Ingresos $12M, Egresos $7,8M)', sampleInput: '3570000', expectedValue: 3570000, tolerance: 1, unit: 'COP', formulaHint: '($12.000.000 - $7.800.000) × (1 - 0,15) = $4.200.000 × 0,85 = $3.570.000 COP' }
    }
  ];

  const AG_EXERCISES_N3_N4 = BASE_N3_N4.concat(Array.isArray(extList) ? extList : []);
  return { AG_EXERCISES_N3_N4: AG_EXERCISES_N3_N4 };
});
