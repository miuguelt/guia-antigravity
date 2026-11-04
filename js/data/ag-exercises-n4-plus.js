/* Datos de ejercicios Antigravity — Extensión de Capacidades Completa (Ejercicios 21 al 26) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const AG_EXERCISES_N4_PLUS = [
    {
      id: 21,
      level: 1,
      levelName: 'Nivel 1: Fundamentos en Antigravity',
      title: 'Edición Quirúrgica en el Editor View: Supercomplete (Tab) y Transformación en Línea (Ctrl+I)',
      duration: '15 min de práctica guiada',
      complexity: 'Básico Aplicado (Editor View)',
      nonDevProfile: 'Facturación, Administración, Contabilidad, Analistas',
      goal: 'Alternar del Agent Manager al Editor View de Antigravity para corregir una fórmula tributaria directamente en el archivo usando selección en línea (Ctrl+I) y autocompletado predictivo (Tab).',
      businessChallenge: 'Actualizar en segundos una plantilla de liquidación que calcula el IVA antiguo del 16 % sin reconstruir todo el archivo ni depender de una conversación larga.',
      agentRoleAction: 'El agente genera la estructura base en modo Planning y luego, cuando seleccionas la función en el Editor View y presionas Ctrl+I, transforma únicamente las líneas seleccionadas.',
      learnerParallelAction: 'Tú haces la corrección con tus propias manos en el Editor View: sombreas el bloque que calcula el neto, presionas Ctrl+I, describes el cambio con tus palabras y aceptas o rechazas la comparación de antes y después.',
      professionalOutputCriteria: 'Liquidación exacta con IVA del 19 % y retención en la fuente del 2,5 % editada quirúrgicamente con Ctrl+I sin alterar el resto de la página.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el kit (@liquidacion_factura_borrador.html, @tarifas_retencion_vigentes.json y @orden_compra_cliente.csv) y ábrelo en el Editor View.',
        'Paso 2 (Ctrl+I): Sombrea con el mouse el bloque que empieza con la palabra calcularNetoFactura (es el que calcula el neto), presiona Ctrl+I y escribe: "Usa el IVA y la retención de @tarifas_retencion_vigentes.json; la retención va sobre el subtotal". Revisa la comparación de antes y después y acéptala.',
        'Paso 3 (Tab): Debajo de la función empieza a escribir function formatearCOP( y acepta con Tab la sugerencia que formatea en pesos colombianos.',
        'Paso 4 (Agente): En modo Planning pega el Prompt Inicial para que el agente arme la tabla de órdenes, escriba las pruebas y verifique con /browser.',
        'Paso 5 (Verificar): Ingresa en el simulador el neto de OC-701 que muestra la tabla.'
      ],
      initialPrompt: 'Actúa como Especialista en Facturación Electrónica y Desarrollo Frontend.\nYa corregí calcularNetoFactura en @liquidacion_factura_borrador.html con Ctrl+I. No reescribas esa función.\n1. Usa @tarifas_retencion_vigentes.json y @orden_compra_cliente.csv para mostrar una tabla con Subtotal, IVA, Retefuente y Neto a Pagar de cada orden.\n2. Agrega un formulario para liquidar un subtotal nuevo.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Cuándo Usar el Agent Manager vs. Edición en Línea (Ctrl+I) y Tab en el Editor View',
      conceptualTheory: 'El Agent Manager es ideal para crear módulos completos, pero cuando solo necesitas ajustar una tasa de impuesto, una fórmula o un texto puntual, abrir el Editor View, sombrear las 4 líneas exactas y presionar Ctrl+I es diez veces más rápido y evita que el agente modifique partes que ya funcionaban.',
      conceptualTaskSteps: [
        'Toma el Subtotal base del Caso Testigo: $2.000.000 COP.',
        'Suma el IVA vigente del 19 % (+$380.000 COP) y resta la Retención en la Fuente del 2,5 % (-$50.000 COP).',
        'Verifica el Neto a Pagar: $2.000.000 + $380.000 - $50.000 = $2.330.000 COP.'
      ],
      parallelToolPrompt: 'Explícame cuándo conviene usar Ctrl+I y Tab dentro del Editor View de Antigravity en lugar de pedir todo desde el chat principal, y cómo se calcula el neto de una factura con IVA y Retefuente.',
      refinementPrompt: 'En el Editor View selecciona la tabla de resultados, presiona Ctrl+I y pide una fila de totales al final. Compara los cambios con lo que habría hecho el agente en una conversación completa.',
      kit: { filename: 'liquidacion_factura_borrador.html', type: 'zip', description: 'Plantilla HTML con tasa por corregir (.html), tarifas vigentes (.json) y orden de compra (.csv).' },
      testCase: { label: 'Neto a pagar sobre base de $2.000.000 (+19 % IVA - 2,5 % Retefuente)', sampleInput: '2330000', expectedValue: 2330000, tolerance: 1, unit: 'COP', formulaHint: '$2.000.000 + $380.000 (IVA) - $50.000 (Retefuente) = $2.330.000 COP' }
    },
    {
      id: 22,
      level: 2,
      levelName: 'Nivel 2: Herramientas de Negocio',
      title: 'Entrevista de Descubrimiento con el Comando /grill-me: Motor de Comisiones Escalonadas sin Vacíos',
      duration: '25 min de práctica guiada',
      complexity: 'Intermedio (/grill-me + el modo Planning)',
      nonDevProfile: 'Directores Comerciales, Recursos Humanos, Gerentes de Ventas',
      goal: 'Usar el comando /grill-me antes del modo Planning para que el agente te entreviste, descubra casos borde (notas crédito por devolución y tramos de acelerador) y construya un liquidador de comisiones blindado.',
      businessChallenge: 'Evitar litigios y pagos en exceso por comisiones calculadas sobre ventas brutas sin descontar devoluciones ni separar los tramos de la escala.',
      agentRoleAction: 'Con /grill-me el agente te formula preguntas sobre devoluciones y topes; luego en modo Planning construye liquidador_comisiones.html aplicando la escala por tramos.',
      learnerParallelAction: 'Tú respondes las preguntas del agente usando el acta del comité que está en el JSON y anotas qué huecos del borrador descubrió por su cuenta.',
      professionalOutputCriteria: 'Liquidador comercial que descuenta devoluciones antes de aplicar el 5 % hasta la meta y el 8 % únicamente sobre el excedente.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el kit (@ventas_equipo_comercial.csv, @borrador_politica_comisiones.md y @metas_vendedores_trimestre.json) y abre la carpeta en Antigravity.',
        'Paso 2 (/grill-me): Pega el Prompt Inicial. El agente te entrevistará antes de programar. Responde cada pregunta con el acta del comité del JSON, sin adelantarte.',
        'Paso 3 (Revisar): Cuando termine la entrevista, pídele la política consolidada y compárala con el acta: ¿faltó alguna decisión?',
        'Paso 4 (Construir): Aprueba el plan y deja que el agente programe, pruebe y verifique con /browser.',
        'Paso 5 (Verificar): Ingresa en el simulador la comisión de VEN-01 que muestra la herramienta.'
      ],
      initialPrompt: '/grill-me Actúa como Especialista en Compensación Variable.\nAntes de escribir código, entrevístame hasta cerrar todos los huecos de @borrador_politica_comisiones.md usando los casos de @ventas_equipo_comercial.csv y los parámetros de @metas_vendedores_trimestre.json (tasas y meta). No leas el bloque actaComiteParaResponderAlAgente: esas respuestas te las daré yo.\nCuando la política esté completa, escríbela en politica_comisiones_final.md y construye liquidador_comisiones.html que liquide a los 4 vendedores.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Descubrimiento de Casos Borde con /grill-me y Escalas Marginales por Tramos',
      conceptualTheory: 'Cuando pides una herramienta sin usar /grill-me, suelen quedar vacíos: ¿la tasa del 8 % se aplica a toda la venta o solo al excedente? ¿Las devoluciones restan antes o después? En una escala marginal por tramos, los primeros $10.000.000 ganan el 5 % ($500.000) y solo los $5.000.000 adicionales ganan el 8 % ($400.000).',
      conceptualTaskSteps: [
        'Calcula la Venta Neta de Camila (VEN-01): $16.000.000 brutas - $1.000.000 en devoluciones = $15.000.000 COP.',
        'Comisión Tramo Base (primeros $10.000.000 al 5 %) = $500.000 COP.',
        'Comisión Excedente ($5.000.000 adicionales al 8 %) = $400.000 COP -> Total Comisión = $500.000 + $400.000 = $900.000 COP.'
      ],
      parallelToolPrompt: 'Explícame cómo funciona el comando /grill-me para descubrir vacíos en reglas de negocio y por qué una comisión marginal por tramos evita saltos desproporcionados en el pago.',
      refinementPrompt: 'Añade en liquidador_comisiones.html un simulador "¿Cuánto me falta para el acelerador?" por cada vendedor del equipo.',
      kit: { filename: 'ventas_equipo_comercial.csv', type: 'zip', description: 'Ventas y devoluciones (.csv), política de comisiones (.md) y metas trimestrales (.json).' },
      testCase: { label: 'Comisión escalonada total (Venta neta $15M: $10M×5 % + $5M×8 %)', sampleInput: '900000', expectedValue: 900000, tolerance: 1, unit: 'COP', formulaHint: 'Venta neta VEN-01 = $16.000.000 - $1.000.000 = $15.000.000 → ($10.000.000 × 5 %) + ($5.000.000 × 8 %) = $900.000 COP' }
    },
    {
      id: 23,
      level: 2,
      levelName: 'Nivel 2: Herramientas de Negocio',
      title: 'Terminal con Permisos y Sandbox: Auditoría Segura de Lotes de Nómina por Consola',
      duration: '25 min de práctica guiada',
      complexity: 'Intermedio (Terminal Sandbox)',
      nonDevProfile: 'Tesorería, Nómina, Talento Humano, Auditores Internos',
      goal: 'Aprender a inspeccionar, aprobar o rechazar comandos en la Terminal con Permisos (Sandbox) de Antigravity ejecutando un script verificador de dispersión de nómina.',
      businessChallenge: 'Detectar pagos duplicados a una misma cuenta bancaria dentro de un lote de nómina antes de subir el archivo plano al portal del banco.',
      agentRoleAction: 'El agente escribe auditar_nomina.mjs y monitor_nomina.html, y solicita permiso en la Terminal Sandbox para ejecutar el diagnóstico sobre el CSV.',
      learnerParallelAction: 'Tú decides en cada comando de la terminal si lo apruebas o lo rechazas según el protocolo, y explicas por qué.',
      professionalOutputCriteria: 'Script de auditoría local ejecutado de forma segura y tablero HTML que separa giros válidos ($16.000.000) de giros retenidos por duplicidad ($2.500.000).',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @dispersion_nomina_lote.csv, @reglas_control_dispersion.json y @protocolo_terminal_segura.md.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Revisa que el plan ejecute solo comandos de la lista permitida del protocolo.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: clasifica 5 comandos de terminal como seguros o peligrosos.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.',
        'Paso 6 (Sandbox): Cuando el agente pida ejecutar un comando, compáralo con el protocolo antes de aprobarlo. Si propone borrar archivos o conectarse a internet, recházalo y pídele otra forma.'
      ],
      initialPrompt: 'Actúa como Especialista en Seguridad Operativa y Tesorería de Nómina.\nCon @dispersion_nomina_lote.csv, @reglas_control_dispersion.json y @protocolo_terminal_segura.md:\n1. Crea auditar_nomina.mjs, que lea el lote y aplique la llave de unicidad y la regla de duplicado del JSON.\n2. Ejecútalo en la terminal y genera las salidas del JSON.\n3. Construye monitor_nomina.html con total bruto, giros rechazados y neto autorizado.\nAntes de cada comando, dime cuál vas a ejecutar y por qué.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Gobernanza de la Terminal con Permisos (Sandbox) y Llaves de Unicidad en Pagos',
      conceptualTheory: 'En Google Antigravity tú tienes el control de la terminal: antes de ejecutar cualquier comando, el agente muestra la instrucción exacta. Debes aprobar comandos de lectura o prueba local (`node auditar_nomina.mjs`) y rechazar comandos que borren archivos fuera del proyecto o envíen datos confidenciales a internet.',
      conceptualTaskSteps: [
        'Suma los 6 giros del archivo dispersion_nomina_lote.csv: total bruto = $18.500.000 COP.',
        'Detecta que la cuenta 0088331022 aparece dos veces en el periodo 2026-10 por $2.500.000 COP.',
        'Resta el giro duplicado: $18.500.000 - $2.500.000 = $16.000.000 COP autorizados para dispersión.'
      ],
      parallelToolPrompt: 'Explícame qué debo revisar antes de aprobar un comando de terminal en Google Antigravity y cómo prevenir pagos duplicados en archivos planos de nómina.',
      refinementPrompt: 'Agrega a auditar_nomina.mjs una validación que rechace cuentas con menos de 10 dígitos y vuelve a ejecutarlo en la terminal.',
      kit: { filename: 'dispersion_nomina_lote.csv', type: 'zip', description: 'Lote de nómina con giro duplicado (.csv), reglas de dispersión (.json) y protocolo de terminal (.md).' },
      testCase: { label: 'Total neto autorizado de nómina tras excluir giro duplicado ($18,5M - $2,5M)', sampleInput: '16000000', expectedValue: 16000000, tolerance: 1, unit: 'COP', formulaHint: '$18.500.000 lote bruto - $2.500.000 cuenta duplicada = $16.000.000 COP' }
    },
    {
      id: 24,
      level: 3,
      levelName: 'Nivel 3: Sistemas y Skills en Antigravity',
      title: 'Higiene de Contexto y Aprendizaje Persistente: Validador de Fletes con Resumen de Traspaso y Regla en GEMINI.md',
      duration: '25 min de práctica guiada',
      complexity: 'Avanzado (Contexto + GEMINI.md)',
      nonDevProfile: 'Logística, Comercio Electrónico, Operaciones, Despachos',
      goal: 'Mantener al agente enfocado en conversaciones largas: cerrar una conversación con un resumen de traspaso, continuar en una nueva y convertir una lección en una regla permanente de GEMINI.md.',
      businessChallenge: 'Impedir pérdidas logísticas por cobrar fletes según el peso en báscula cuando una mercancía liviana ocupa gran volumen en el camión (Peso Volumétrico).',
      agentRoleAction: 'El agente construye liquidador_fletes.html, redacta un resumen de traspaso cuando se lo pides y agrega a GEMINI.md la regla del Peso Facturable.',
      learnerParallelAction: 'Tú abres una conversación nueva solo con el resumen de traspaso y compruebas que el agente siga trabajando sin repetir errores.',
      professionalOutputCriteria: 'Liquidador que compara peso real y volumétrico de las 6 guías, regla registrada en GEMINI.md y continuidad comprobada en una conversación nueva.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el kit (@despachos_logistica_regional.csv, @tarifario_transporte_carga.json y @bitacora_errores_fletes.md) y abre la carpeta en Antigravity.',
        'Paso 2 (Construir): En modo Planning pega el Prompt Inicial, aprueba el plan y espera la primera entrega.',
        'Paso 3 (Regla permanente): Pide: "Agrega a GEMINI.md la lección de @bitacora_errores_fletes.md como regla del proyecto".',
        'Paso 4 (Traspaso): Pide: "Escribe resumen_traspaso.md con el estado del proyecto, las decisiones y lo pendiente". Cierra la conversación.',
        'Paso 5 (Continuar): Abre una conversación nueva, cita @resumen_traspaso.md y envía el Prompt de Refinamiento. Comprueba que el agente aplique la regla sin que se la recuerdes.'
      ],
      initialPrompt: 'Actúa como Ingeniero de Costos Logísticos.\nCon @despachos_logistica_regional.csv, @tarifario_transporte_carga.json y @bitacora_errores_fletes.md construye liquidador_fletes.html.\n1. Para cada guía calcula el peso volumétrico con el divisor del tarifario y el peso facturable como el mayor entre báscula y volumétrico.\n2. Liquida el flete con la tarifa por kilogramo facturable.\n3. Resalta las guías donde el peso volumétrico supera al de báscula.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Ventana de Contexto, Resumen de Traspaso y Peso Volumétrico',
      conceptualTheory: 'En una conversación larga el agente acumula instrucciones viejas y puede confundirse. Un resumen de traspaso guarda solo lo importante y permite continuar en una conversación limpia. Las reglas que nunca deben olvidarse van en GEMINI.md, que el agente lee en cada conversación. En logística, las transportadoras cobran por el mayor entre el peso real y el peso volumétrico, porque una caja grande y liviana ocupa el espacio de una pesada.',
      conceptualTaskSteps: [
        'Calcula el volumen de la Guía Testigo (GUIA-501): 100 cm × 50 cm × 50 cm = 250.000 cm³.',
        'Divide entre el factor volumétrico 2.500: 250.000 / 2.500 = 100 kg volumétricos (frente a 40 kg en báscula).',
        'Toma el mayor (100 kg) y multiplica por la tarifa ($4.000 COP/kg): 100 × $4.000 = $400.000 COP.'
      ],
      parallelToolPrompt: 'Explícame cuándo conviene abrir una conversación nueva con un resumen de traspaso en Google Antigravity, qué debe ir en GEMINI.md y por qué las transportadoras cobran por peso volumétrico.',
      refinementPrompt: 'Agrega en liquidador_fletes.html una alerta visual cuando el peso volumétrico duplique al de báscula y un total de fletes del día.',
      kit: { filename: 'despachos_logistica_regional.csv', type: 'zip', description: 'Guías de despacho (.csv), tarifario volumétrico (.json) y bitácora de errores (.md).' },
      testCase: { label: 'Flete liquidado por Peso Volumétrico (100×50×50 cm / 2500 = 100 kg × $4.000)', sampleInput: '400000', expectedValue: 400000, tolerance: 1, unit: 'COP', formulaHint: 'max(40 kg, 250.000 / 2.500 = 100 kg) × $4.000 = $400.000 COP' }
    },
    {
      id: 25,
      level: 4,
      levelName: 'Nivel 4: Maestría en Antigravity',
      title: 'Razonamiento Profundo y Multiperspectiva en Modo Planning: Valor Económico Agregado (EVA y WACC)',
      duration: '30 min de práctica guiada',
      complexity: 'Extremo (Planning + modelo de razonamiento)',
      nonDevProfile: 'Gerentes Generales, Directores Financieros, Evaluadores de Proyectos',
      goal: 'Aprovechar el modo Planning con el modelo de mayor razonamiento disponible para que el agente contraste varias perspectivas antes de programar un evaluador de Valor Económico Agregado.',
      businessChallenge: 'Identificar divisiones empresariales que aparentan ganancia contable pero en realidad destruyen valor porque no alcanzan a pagar el costo del capital invertido.',
      agentRoleAction: 'El agente analiza las perspectivas financiera, de riesgo y operativa que exige la junta, presenta sus conclusiones en el plan y construye evaluador_eva_wacc.html.',
      learnerParallelAction: 'Tú desafías el análisis del plan: preguntas qué palanca recomendaría para la unidad con EVA negativo y si la recomendación cambia en el escenario de subida de tasas.',
      professionalOutputCriteria: 'Tablero directivo con cálculo de WACC, comparación NOPAT vs. Cargo de Capital y árbol de sensibilidad ROIC vs. WACC.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el kit (@unidades_negocio_corporativo.json, @estructura_costo_capital_wacc.csv y @criterios_inversion_directiva.md) y abre la carpeta en Antigravity.',
        'Paso 2 (Modelo): En el selector de modelo elige la opción de mayor razonamiento disponible y activa el modo Planning.',
        'Paso 3 (Desafiar): Pega el Prompt Inicial. Antes de aprobar, comenta el plan con al menos una pregunta que obligue al agente a defender una conclusión.',
        'Paso 4 (Construir): Aprueba el plan y deja que el agente programe, pruebe y verifique con /browser.',
        'Paso 5 (Verificar): Ingresa en el simulador el EVA de UN-01 con el WACC base.'
      ],
      initialPrompt: 'Actúa como Director de Estrategia Corporativa y Finanzas.\nAntes de programar, analiza @unidades_negocio_corporativo.json, @estructura_costo_capital_wacc.csv y @criterios_inversion_directiva.md desde las 3 perspectivas del documento y escribe tus conclusiones en el plan.\nLuego construye evaluador_eva_wacc.html:\n1. WACC calculado desde las fuentes de financiación.\n2. Cargo de capital y EVA por unidad; clasificación Creadora o Destructora de valor.\n3. Comparación entre utilidad contable y EVA.\n4. Tabla de sensibilidad con los escenarios del JSON.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Cuándo Pedir Razonamiento Profundo y por qué la Utilidad Contable No Basta sin Restar el Costo del Capital (EVA)',
      conceptualTheory: 'Para decisiones con varias variables conviene que el agente razone antes de programar: el modo Planning y un modelo de mayor razonamiento le dan espacio para comparar hipótesis. En finanzas, una división puede reportar utilidad y aun así destruir valor si no cubre el costo del capital que usa. El EVA resta ese costo (capital invertido × WACC) al NOPAT.',
      conceptualTaskSteps: [
        'Datos de la División Agroexportadora (Testigo): NOPAT = $38.000.000 COP | Capital Invertido = $200.000.000 COP | WACC = 12 %.',
        'Calcula el Cargo de Capital anual: $200.000.000 × 0,12 = $24.000.000 COP.',
        'Resta NOPAT - Cargo de Capital: $38.000.000 - $24.000.000 = $14.000.000 COP de Valor Económico Agregado (EVA).'
      ],
      parallelToolPrompt: 'Explícame cuándo conviene usar el modo Planning con un modelo de mayor razonamiento en Google Antigravity y cómo interpretar el Valor Económico Agregado (EVA = NOPAT - Capital × WACC).',
      refinementPrompt: 'Agrega en evaluador_eva_wacc.html un deslizador de WACC y una recomendación por unidad que cite la perspectiva del análisis en la que se basa.',
      kit: { filename: 'unidades_negocio_corporativo.json', type: 'zip', description: 'Unidades de negocio (.json), estructura de capital WACC (.csv) y criterios directivos (.md).' },
      testCase: { label: 'Valor Económico Agregado EVA (NOPAT $38M - Capital $200M × WACC 12 %)', sampleInput: '14000000', expectedValue: 14000000, tolerance: 1, unit: 'COP', formulaHint: '$38.000.000 - ($200.000.000 × 12 %) = $38.000.000 - $24.000.000 = $14.000.000 COP' }
    },
    {
      id: 26,
      level: 4,
      levelName: 'Nivel 4: Maestría en Antigravity',
      title: 'Ejecución Autónoma con el Comando /goal: Auditoría End-to-End de Contratos y Pólizas',
      duration: '35 min de práctica guiada',
      complexity: 'Maestría Total (/goal + el modo Planning)',
      nonDevProfile: 'Contratación, Jurídica, Administración Pública, Interventoría',
      goal: 'Usar /goal para que el agente construya, pruebe, verifique con /browser y corrija por su cuenta un revisor de pólizas hasta cumplir todos los criterios de salida.',
      businessChallenge: 'Garantizar que ningún contrato inicie ejecución sin que sus pólizas de cumplimiento (30 %) y de salarios y prestaciones (20 %) cubran los montos mínimos legales.',
      agentRoleAction: 'Con /goal, el agente construye revisor_polizas.html, escribe y ejecuta sus pruebas y no se detiene hasta demostrar cada criterio de @criterios_aceptacion_goal.md.',
      learnerParallelAction: 'Tú no intervienes mientras el agente trabaja: al final revisas los 5 criterios de salida uno por uno y compruebas que el acta de rechazo cite los faltantes exactos de CTO-2026-091.',
      professionalOutputCriteria: 'Sistema de control de pólizas verificado de extremo a extremo por /goal, con acta de aprobación o rechazo para inicio contractual.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el kit (@contratos_estatales_activos.json, @anexo_garantias_exigidas.csv y @criterios_aceptacion_goal.md) y abre la carpeta en Antigravity.',
        'Paso 2 (/goal): Pega el Prompt Inicial. El agente trabajará solo hasta cumplir los criterios; no lo interrumpas.',
        'Paso 3 (Trabajo en paralelo): Mientras tanto, resuelve la Tarea Conceptual sobre garantías contractuales.',
        'Paso 4 (Auditar): Cuando termine, revisa cada criterio de @criterios_aceptacion_goal.md contra el Walkthrough. Si uno falla, dile cuál y deja que lo corrija.',
        'Paso 5 (Verificar): Ingresa en el simulador la cobertura total exigida para CTO-2026-088.'
      ],
      initialPrompt: '/goal Actúa como Interventor Contractual Senior.\nCon @contratos_estatales_activos.json y @anexo_garantias_exigidas.csv construye revisor_polizas.html.\nNo termines hasta cumplir y demostrar cada criterio de @criterios_aceptacion_goal.md. Verifica tu trabajo con pruebas node --test y con /browser, y lista en el Walkthrough la evidencia de cada criterio.',
      conceptualTaskTitle: 'Cómo Formular Criterios de Aceptación Observables para el Comando /goal',
      conceptualTheory: 'El comando `/goal` está diseñado para misiones largas o integrales: el agente no se detiene en el primer borrador, sino que revisa sus propios resultados contra los criterios de aceptación que le diste. Por eso, `/goal` funciona mejor cuando tus criterios son numéricos y verificables (como exigir que la suma de garantías sea exactamente el 50 % del contrato).',
      conceptualTaskSteps: [
        'Valor del Contrato Testigo (CTO-2026-088): $80.000.000 COP.',
        'Amparo de Cumplimiento exigido (30 %): $80.000.000 × 0,30 = $24.000.000 COP. Amparo de Salarios exigido (20 %): $80.000.000 × 0,20 = $16.000.000 COP.',
        'Cobertura Total Asegurada Exigida: $24.000.000 + $16.000.000 = $40.000.000 COP.'
      ],
      parallelToolPrompt: 'Explícame cómo redactar criterios de aceptación que cualquier persona pueda comprobar con un sí o un no al usar el comando /goal en Google Antigravity y cómo se calculan los amparos de una garantía única de cumplimiento.',
      refinementPrompt: 'Añade en revisor_polizas.html una alerta cuando falten menos de 30 días para que venza una póliza y vuelve a ejecutar las pruebas.',
      kit: { filename: 'contratos_estatales_activos.json', type: 'zip', description: 'Contratos activos (.json), anexo de garantías (.csv) y criterios de aceptación para /goal (.md).' },
      testCase: { label: 'Cobertura total asegurada en pólizas (Contrato $80M: 30 % Cumplimiento + 20 % Salarios)', sampleInput: '40000000', expectedValue: 40000000, tolerance: 1, unit: 'COP', formulaHint: '($80.000.000 × 30 %) + ($80.000.000 × 20 %) = $24.000.000 + $16.000.000 = $40.000.000 COP' }
    }
  ];

  return { AG_EXERCISES_N4_PLUS: AG_EXERCISES_N4_PLUS };
});
