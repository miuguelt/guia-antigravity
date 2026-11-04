/* Datos de ejercicios Antigravity — Niveles 1 y 2 (Ejercicios 1 al 10) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const AG_EXERCISES_N1_N2 = [
    {
      id: 1,
      level: 1,
      levelName: 'Nivel 1: Fundamentos en Antigravity',
      title: 'Tu Primer Proyecto en Antigravity: Organizador y Clasificador Automático de Documentos Locales',
      duration: '15 min de práctica guiada',
      complexity: 'Básico Inicial (Cero Código)',
      nonDevProfile: 'Administración, Operaciones, Emprendedores, Estudiantes',
      goal: 'Crear tu primer proyecto en Antigravity, pedir un Implementation Plan en modo Planning y lograr que el agente clasifique, renombre y documente 8 archivos desordenados sin tocar uno solo a mano.',
      businessChallenge: 'Eliminar el caos documental operativo ordenando 8 archivos heterogéneos bajo el estándar internacional ISO-8601 sin perder trazabilidad.',
      agentRoleAction: 'El agente analiza los 8 archivos semilla (@), redacta el Implementation Plan, crea las 4 subcarpetas y genera indice_documentos.html.',
      learnerParallelAction: 'Tú revisas el plan antes de aprobarlo: compruebas que cada archivo quede en una categoría y que la fecha de los archivos sin fecha en el nombre se tome de su contenido.',
      professionalOutputCriteria: 'Buscador HTML accesible y responsive con tabla interactiva, conteo exacto por carpeta, exportación a CSV y cero colisiones de nombre.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @15-03-2026_factura_enel_energia.html y los otros 7 documentos.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Comprueba que el plan diga de dónde saca la fecha de los 5 archivos que no la traen en el nombre; si no lo dice, coméntalo en el plan antes de aprobar.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: diseña tu propia regla de nombres ISO-8601 para 3 documentos de tu trabajo.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Especialista en Gestión Documental y Automatización Operativa.\nNo soy programador; encárgate de toda la parte técnica en esta carpeta.\n\n[OBJETIVO]\nInspecciona los 8 documentos de esta carpeta (@15-03-2026_factura_enel_energia.html, @02-11-2025_factura_internet_fibra.xml, @28-01-2026_factura_papeleria_central.csv, @contrato_arrendamiento_local_2026.md, @contrato_mantenimiento_aires_2025.txt, @presupuesto_mercadeo_trimestre2.csv, @presupuesto_adecuacion_bodega.json y @nota_rapida_reunion_lunes.txt) y organízalos en subcarpetas 01_Facturas, 02_Contratos, 03_Presupuestos y 04_Otros con el formato AAAA-MM-DD_Categoria_NombreLimpio.ext.\n\n[REGLAS]\n- Si el nombre del archivo no trae fecha, usa la fecha de emisión, suscripción o planeación que aparece dentro del documento.\n- Nunca sobrescribas un archivo: si dos nombres coinciden, agrega _v2.\n- Genera indice_documentos.html con buscador, conteo por carpeta y exportación a CSV.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe un script de comprobación que cuente los archivos de cada carpeta y confirme que ningún nombre se repite; ejecútalo en la terminal. Luego abre el índice con /browser y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Taxonomía Documental y Norma Internacional de Fechas ISO-8601 (AAAA-MM-DD)',
      conceptualTheory: 'Los computadores ordenan texto carácter por carácter de izquierda a derecha. Si nombras un archivo 15-04-2026_Factura.pdf y otro 02-11-2025_Factura.pdf, el día 02 aparecerá antes aunque sea de otro año. La norma ISO-8601 (AAAA-MM-DD) ubica primero el año, luego el mes y luego el día, garantizando orden cronológico exacto.',
      conceptualTaskSteps: [
        'Toma 3 archivos de tu trabajo semanal (ej. recibo luz marzo.pdf).',
        'Conviértelos al estándar AAAA-MM-DD_Area_Proveedor_Estado.pdf (ej. 2026-03-15_Finanzas_Enel_Pagado.pdf).',
        'Define las 4 categorías máximas donde cabe el 100 % de tus documentos operativos.'
      ],
      parallelToolPrompt: 'Evalúa mis 4 categorías documentales y explícame con un ejemplo por qué el formato ISO-8601 (AAAA-MM-DD) garantiza el orden cronológico en cualquier sistema operativo.',
      refinementPrompt: 'Agrega una regla en el script para nunca sobrescribir archivos con el mismo nombre (añade sufijo _v2, _v3) e incluye tarjetas de resumen por categoría en indice_documentos.html.',
      kit: { filename: '15-03-2026_factura_enel_energia.html', type: 'zip', description: '8 documentos reales desordenados (.html, .xml, .csv, .md, .json, .txt) con fechas heterogéneas listos para clasificar.' },
      testCase: { label: 'Total de archivos válidos clasificados en las 4 carpetas ISO-8601', sampleInput: '8', expectedValue: 8, tolerance: 0, unit: 'archivos', formulaHint: 'Facturas (3) + Contratos (2) + Presupuestos (2) + Otros (1) = 8 archivos' },
      hasUserInputs: false
    },
    {
      id: 2,
      level: 1,
      levelName: 'Nivel 1: Fundamentos en Antigravity',
      title: 'Uso de Menciones @archivo: Transformar Notas Caóticas de Clientes en una Base de Datos Limpia',
      duration: '15 min de práctica guiada',
      complexity: 'Básico (Cero Código)',
      nonDevProfile: 'Ventas, Recursos Humanos, Consultores, Docentes',
      goal: 'Dominar el símbolo @ en Antigravity para señalarle múltiples archivos al agente (@notas_crudas_pedidos.txt, @correo_confirmacion_bodega.eml.txt y @catalogo_mobiliario_referencia.json) y extraer una tabla limpia con detección de datos faltantes.',
      businessChallenge: 'Convertir notas informales de pedidos en un registro de datos relacional y atómico, detectando omisiones críticas antes del despacho.',
      agentRoleAction: 'El agente procesa los 3 archivos (@), normaliza los atributos, valida precios del catálogo y genera pedidos_limpios.csv y visor_pedidos.html.',
      learnerParallelAction: 'Tú separas un mensaje de tu trabajo en columnas, con un solo dato por casilla, y revisas que el agente marque los 2 pedidos sin dirección (María y Jorge) en lugar de inventarla.',
      professionalOutputCriteria: 'Archivo CSV con encabezados canónicos, teléfonos a 10 dígitos, montos numéricos limpios y visor web con filtro de órdenes retenidas.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @notas_crudas_pedidos.txt, @correo_confirmacion_bodega.eml.txt y @catalogo_mobiliario_referencia.json.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Verifica que el plan cruce cada pedido con el SKU del catálogo y que use la regla del correo para Dato_Faltante.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: separa el mensaje de ejemplo en columnas, un dato por casilla, y detecta qué dato impide despacharlo.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Analista de Datos Senior.\nCruza @notas_crudas_pedidos.txt, las reglas de despacho de @correo_confirmacion_bodega.eml.txt y los precios de @catalogo_mobiliario_referencia.json para generar pedidos_limpios.csv y el panel visor_pedidos.html.\n\n[COLUMNAS OBLIGATORIAS]\nID_Pedido (PED-001), Cliente_Normalizado, Telefono_Estandar, SKU, Producto, Cantidad, Monto_Total (numérico en COP), Nivel_Urgencia (Alta/Media/Baja), Direccion_Entrega y Dato_Faltante.\n\n[REGLAS]\n- No inventes direcciones: si falta, aplica el texto exacto del correo de bodega.\n- Verifica que Cantidad × precio del catálogo coincida con el monto del chat y reporta cualquier diferencia.\n- El panel muestra el total de los 4 pedidos y, aparte, cuántos quedan retenidos.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Una Casilla, un Dato: Cómo Pasar un Mensaje de WhatsApp a una Tabla que se Pueda Sumar',
      conceptualTheory: 'Una tabla falla cuando mezclamos varios datos en una sola casilla (por ejemplo, escribir "3 cajas de café a $45.000 urgente"). Si cada columna guarda un solo dato y siempre del mismo tipo (un nombre, una cantidad, un precio o una fecha), Excel puede filtrar y sumar sin errores.',
      conceptualTaskSteps: [
        'Analiza el mensaje: "Hola soy María Gómez (tel 310-555-1234), necesito 4 sillas ergonómicas para el martes, pago $1.200.000".',
        'Sepáralo en 6 columnas con un solo dato cada una: Cliente, Teléfono solo con números, Producto, Cantidad, Monto sin símbolos y Urgencia.',
        'Identifica qué dato crítico falta para despachar (Dirección de entrega o NIT).'
      ],
      parallelToolPrompt: 'Explícame con el ejemplo de una lista de mercado por qué conviene escribir un solo dato por casilla al pasar notas de WhatsApp a Excel y por qué guardar "$1.200.000 aprox" como texto impide sumar.',
      refinementPrompt: 'Actualiza visor_pedidos.html para incluir un filtro rápido de pedidos con Dato_Faltante pendiente y un botón que redacte el mensaje de WhatsApp listo para solicitar el dato.',
      kit: { filename: 'notas_crudas_pedidos.txt', type: 'zip', description: 'Exportación de chat de WhatsApp (.txt), correo de reglas de bodega (.eml.txt) y catálogo de mobiliario (.json).' },
      testCase: { label: 'Suma de los 4 pedidos normalizados (incluye los 2 retenidos por falta de dirección)', sampleInput: '2450000', expectedValue: 2450000, tolerance: 1, unit: 'COP', formulaHint: '$1.200.000 + $450.000 + $320.000 + $480.000 = $2.450.000 COP' }
    },
    {
      id: 3,
      level: 1,
      levelName: 'Nivel 1: Fundamentos en Antigravity',
      title: 'Pruebas Automáticas con el Comando /browser: Calculadora de Precios y Punto de Equilibrio',
      duration: '15 min de práctica guiada',
      complexity: 'Básico-Medio (Cero Código)',
      nonDevProfile: 'Comerciantes, Emprendedores, Consultores Independientes',
      goal: 'Usar el subagente /browser de Antigravity para que el agente cree una calculadora financiera alimentada por CSV, JSON y YAML, la abra en el navegador y verifique el Punto de Equilibrio.',
      businessChallenge: 'Determinar el volumen exacto de ventas que cubre los costos operativos fijos antes de ofrecer descuentos que generen pérdidas.',
      agentRoleAction: 'El agente programa calculadora_equilibrio.html, lanza el subagente /browser para interactuar con los inputs y valida que el cálculo dé 100 unidades.',
      learnerParallelAction: 'Tú explicas con tus palabras qué es el margen de contribución y revisas en el Walkthrough que el agente haya probado la calculadora con /browser usando los valores del CSV.',
      professionalOutputCriteria: 'Aplicación web interactiva que recalcula al instante, gráfica dinámica del punto de equilibrio y verificación visual automática con /browser.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @costos_base_negocio.csv, @desglose_costo_unitario.json y @metas_rentabilidad.yaml.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Confirma que el plan sume los dos costos fijos del CSV y que compruebe que el costo variable coincide con la suma de componentes del JSON.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: calcula cuántas unidades necesitas para la meta de utilidad del YAML.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Consultor Financiero para PyMEs.\nCon @costos_base_negocio.csv, @desglose_costo_unitario.json y @metas_rentabilidad.yaml construye calculadora_equilibrio.html.\n\n[QUÉ DEBE HACER]\n1. Precargar Costos Fijos (suma de las filas Costo_Fijo_Mensual), Costo Variable, Precio y Meta de Utilidad desde los archivos.\n2. Calcular Margen de Contribución, Punto de Equilibrio en unidades y en pesos, y unidades para alcanzar la meta.\n3. Comprobar que el costo variable del CSV coincide con la suma de componentes del JSON; si no coincide, avisar.\n4. Mostrar una tabla con los escenarios de descuento del YAML.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Cálculo Manual del Margen de Contribución y Punto de Equilibrio Operativo',
      conceptualTheory: 'Cada unidad vendida debe pagar primero su propio Costo Variable (materiales, empaque, comisión). Lo que queda libre se llama Margen de Contribución Unitario (Precio - Costo Variable), porque es el dinero con el que cada unidad contribuye a pagar los Costos Fijos del mes.',
      conceptualTaskSteps: [
        'Toma los datos del Caso Testigo: Costos Fijos = $3.000.000 | Costo Variable = $20.000 | Precio = $50.000.',
        'Calcula el Margen de Contribución Unitario: $50.000 - $20.000 = $30.000 por unidad.',
        'Divide los Costos Fijos entre el margen unitario: $3.000.000 / $30.000 = 100 unidades para quedar en equilibrio.'
      ],
      parallelToolPrompt: 'Explícame por qué la fórmula del Punto de Equilibrio es Costos_Fijos / (Precio - Costo_Variable) y qué pasa en la gráfica cuando el precio se acerca demasiado al costo variable.',
      refinementPrompt: 'Agrega un Simulador de Descuentos Promocionales que muestre cuántas unidades extra debo vender si aplico un 10 % o 20 % de descuento, y verifícalo con /browser.',
      kit: { filename: 'costos_base_negocio.csv', type: 'zip', description: 'Estructura de costos fijos y variables (.csv), desglose de insumo unitario (.json) y metas de rentabilidad (.yaml).' },
      testCase: { label: 'Punto de Equilibrio en unidades (CF=$3.000.000, CV=$20.000, P=$50.000)', sampleInput: '100', expectedValue: 100, tolerance: 0, unit: 'unidades', formulaHint: '3.000.000 / (50.000 - 20.000) = 100 unidades exactas' }
    },
    {
      id: 4,
      level: 1,
      levelName: 'Nivel 1: Fundamentos en Antigravity',
      title: 'Memoria Permanente con GEMINI.md: Propuestas Contractuales de Software y Control de Hitos con SCQA',
      duration: '20 min de práctica guiada',
      complexity: 'Básico-Medio (Cero Código)',
      nonDevProfile: 'Consultores, Agencias, Abogados, Equipos Comerciales',
      goal: 'Usar GEMINI.md como memoria permanente del proyecto para que el agente respete estilo, moneda y estructura SCQA en cada entrega, sin repetir las reglas en cada prompt.',
      businessChallenge: 'Blindar las propuestas técnicas y contractuales de desarrollo de software bajo directrices inmutables de estilo, presupuesto por fases y estructura SCQA sin inventar métricas teóricas ni admitir marcadores vacíos.',
      agentRoleAction: 'El agente adopta las directrices de @GEMINI.md, lee @diagnostico_operativo_cliente.md y @parametros_propuesta_roi.json y construye generador_propuestas.html estructurando el proyecto en 2 fases contractuales bimestrales de implementación auditadas.',
      learnerParallelAction: 'Tú cambias una regla de GEMINI.md (por ejemplo, la paleta) y compruebas en la siguiente respuesta que el agente la aplica sin que se lo repitas.',
      professionalOutputCriteria: 'Propuesta técnica formal con hoja de estilos `@media print` tamaño carta impecable, matriz SCQA y cronograma de 2 fases bimestrales auditadas de entrega y garantía con acta de conformidad.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @GEMINI.md, @diagnostico_operativo_cliente.md y @parametros_propuesta_roi.json.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Comprueba que el plan cite las 4 reglas de GEMINI.md y que agrupe los entregables en las fases del JSON.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: redacta la Situación y la Complicación SCQA de un problema de tu área.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Director de Operaciones y Diseñador de Propuestas de Software.\n1. Lee y respeta las reglas permanentes de @GEMINI.md.\n2. Con @diagnostico_operativo_cliente.md y @parametros_propuesta_roi.json construye generador_propuestas.html con la propuesta SCQA del cliente.\n3. Agrupa los entregables por las fases del JSON, muestra el mes de entrega y el porcentaje de pago de cada fase.\n4. Calcula el tiempo de recuperación solo con la inversión y el ahorro mensual del diagnóstico; no agregues ahorros que no estén en los archivos.\n5. Incluye la hoja de impresión @media print tamaño carta.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Estructuración Contractual SCQA y Control de Hitos de Implementación (Fases Bimestrales)',
      conceptualTheory: 'En proyectos de software y automatización institucional, basar contratos en supuestos ahorros teóricos de productividad genera disputas y falsas expectativas. La Pirámide de Minto (Situación, Complicación, Pregunta, Respuesta) estructura la necesidad técnica real y define hitos observables con plazos de entrega firmes divididos en 2 fases bimestrales de auditoría y garantía con acta de entrega.',
      conceptualTaskSteps: [
        'Situación y Complicación: Analiza el diagnóstico operativo y formula la necesidad técnica del cliente sin especular con ahorros.',
        'Estructura de Hitos: Divide la inversión total ($5.000.000 COP) en entregables verificables para pagar por software en producción y no por horas teóricas.',
        'Plazo Contractual: Verifica que el cronograma técnico establezca exactamente 2 fases bimestrales de ejecución y entrega con acta de conformidad.'
      ],
      parallelToolPrompt: 'Explícame cómo aplicar el marco SCQA (Situación, Complicación, Pregunta, Respuesta) para fundamentar el alcance técnico de una propuesta de software en la primera página sin recurrir a cálculos abstractos de productividad.',
      refinementPrompt: 'Siguiendo las reglas de GEMINI.md, añade en generador_propuestas.html la matriz de aceptación de entregables por cada una de las 2 fases y el checklist de verificación previa a la firma del acta.',
      kit: { filename: 'GEMINI.md', type: 'zip', description: 'Reglas permanentes GEMINI.md (.md), diagnóstico operativo del cliente (.md) y parámetros contractuales (.json).' },
      testCase: { label: 'Número de fases contractuales de la propuesta', sampleInput: '2', expectedValue: 2, tolerance: 0.05, unit: 'fases', formulaHint: 'Fases distintas en parametros_propuesta_roi.json: Fase 1 — Captura y Fase 2 — Control = 2 fases' }
    },
    {
      id: 5,
      level: 1,
      levelName: 'Nivel 1: Fundamentos en Antigravity',
      title: 'Auditoría y Comentarios Inline sobre Artifacts: Limpiador y Unificador de Bases de Contactos',
      duration: '20 min de práctica guiada',
      complexity: 'Básico Consolidado (Cero Código)',
      nonDevProfile: 'Marketing, Atención al Cliente, Coordinadores Académicos',
      goal: 'Usar los comentarios directos sobre el Implementation Plan y la comparación de cambios de Antigravity para dirigir al agente al unir contactos repetidos de varias fuentes sin perder ningún dato útil.',
      businessChallenge: 'Unificar listas de contactos fragmentadas entre canales digitales y presenciales sin perder números de teléfono ni direcciones completas.',
      agentRoleAction: 'El agente normaliza correos y teléfonos, detecta duplicados exactos y aproximados con la clave de coincidencia del YAML y genera consolidador_contactos.html.',
      learnerParallelAction: 'Tú dejas comentarios en el Implementation Plan para afinar la regla de coincidencia y compruebas que el agente detecte el duplicado de Laura, cuyo correo está escrito distinto.',
      professionalOutputCriteria: 'Base maestra unificada libre de redundancias, con trazabilidad visual de los atributos rescatados de cada fuente secundaria y exportación CSV.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @contactos_duplicados.csv, @asistentes_rueda_negocios.json y @reglas_supervivencia_crm.yaml.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Selecciona en el plan la línea de la regla de coincidencia y comenta: "Usa también el teléfono normalizado como clave". Observa cómo el agente actualiza el plan.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: explica por qué el correo solo no basta para detectar duplicados.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Especialista en Calidad de Datos y CRM.\nProcesa @contactos_duplicados.csv con @asistentes_rueda_negocios.json según @reglas_supervivencia_crm.yaml y construye consolidador_contactos.html que:\n1. Normalice correo y teléfono como indica el YAML.\n2. Detecte duplicados exactos y aproximados con la clave de coincidencia del YAML.\n3. Aplique la regla de supervivencia y rescate ciudad y cargo desde el JSON de la feria.\n4. Genere contactos_unificados_limpios.csv y muestre qué campo vino de qué fuente.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Contactos Repetidos: Cómo Reconocerlos y Qué Dato Conservar al Unirlos',
      conceptualTheory: 'Al fusionar dos filas que pertenecen al mismo cliente (por ejemplo, una tiene la ciudad vacía pero el cargo lleno, y la otra tiene la ciudad llena pero el cargo vacío), una regla clara de qué conservar evita perder información: de cada columna se queda el valor más completo y más reciente.',
      conceptualTaskSteps: [
        'Revisa el archivo semilla: tiene 10 filas brutas donde 3 correos/teléfonos están repetidos con variaciones de mayúsculas o guiones.',
        'Normaliza correos a minúsculas y teléfonos a solo dígitos.',
        'Comprueba que al consolidar las 10 filas brutas con 3 duplicados queden exactamente 7 contactos únicos completos.'
      ],
      parallelToolPrompt: 'Explícame con un ejemplo de una lista de clientes cómo decidir qué dato conservar cuando dos filas son la misma persona y cómo reconocer un mismo correo escrito de dos formas distintas.',
      refinementPrompt: 'Muestra en color verde dentro de consolidador_contactos.html qué campos específicos fueron rescatados de cada archivo secundario durante la fusión.',
      kit: { filename: 'contactos_duplicados.csv', type: 'zip', description: '10 registros brutos (.csv), captura complementaria de rueda de negocios (.json) y reglas de supervivencia (.yaml).' },
      testCase: { label: 'Contactos únicos tras fusionar duplicados exactos y aproximados', sampleInput: '7', expectedValue: 7, tolerance: 0, unit: 'contactos únicos', formulaHint: '10 filas: Ana (2), Carlos (2), Laura (2, mismo teléfono y correo distinto) y 4 contactos sin duplicado = 7 registros maestros' }
    },
    {
      id: 6,
      level: 2,
      levelName: 'Nivel 2: Herramientas de Negocio',
      title: 'Cotizador Comercial Inteligente con Semáforo de Rentabilidad y Protección de Margen Bruto',
      duration: '20 min de práctica guiada',
      complexity: 'Intermedio (Cero Código)',
      nonDevProfile: 'Gerentes Comerciales, Vendedores B2B, Distribuidores',
      goal: 'Construir en Antigravity un cotizador conectado a un catálogo local, política comercial y reglas tributarias que bloquee descuentos que reduzcan el Margen Bruto Real por debajo del mínimo permitido.',
      businessChallenge: 'Evitar la destrucción de rentabilidad comercial bloqueando descuentos excesivos mediante cálculo en tiempo real de Margen Bruto.',
      agentRoleAction: 'El agente lee catálogo, política y reglas tributarias (@), y programa cotizador_inteligente.html con semáforo y vista interna/cliente.',
      learnerParallelAction: 'Tú explicas la diferencia entre margen y recargo con un ejemplo propio y revisas que el semáforo muestre verde, ámbar y rojo con los productos del catálogo.',
      professionalOutputCriteria: 'Cotizador web responsivo con cálculo exacto de IVA (19 %), semáforo tricolor y vista imprimible para cliente sin costos internos.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @catalogo_productos.csv, @politica_descuentos_y_margenes.md y @reglas_tributarias_cotizador.json.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Confirma que el plan calcule el margen sobre el precio neto sin IVA y que aplique la retención solo a las categorías del JSON.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: calcula el recargo (markup) equivalente a un margen del 35 %.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Director Comercial y Especialista en Precios.\nCon @catalogo_productos.csv, @politica_descuentos_y_margenes.md y @reglas_tributarias_cotizador.json construye cotizador_inteligente.html con:\n1. Armador de cotización con cantidad y descuento (%).\n2. Margen Bruto Real con la fórmula de la política, siempre sobre el precio neto sin IVA.\n3. Semáforo Verde, Ámbar y Rojo según la política, bloqueando el envío en rojo.\n4. IVA y retención en la fuente según el JSON, solo como información para el cliente.\n5. Interruptor Vista Cliente (oculta costos) y Vista Interna.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Diferencia Matemática entre Recargo sobre Costo (Markup) y Margen Bruto Real (Gross Margin)',
      conceptualTheory: 'Si compras un producto en $650.000 y lo vendes en $1.000.000 (antes de IVA), tu ganancia es $350.000. El Margen Bruto Real se divide sobre el Precio de Venta Neto ($350.000 / $1.000.000 = 35 %). Confundir el recargo sobre el costo con el margen sobre la venta lleva a otorgar descuentos que destruyen la rentabilidad.',
      conceptualTaskSteps: [
        'Toma un ítem con Costo Interno = $650.000 COP y Precio de Venta Neto = $1.000.000 COP.',
        'Resta Precio Neto - Costo = $350.000 COP de utilidad bruta.',
        'Divide $350.000 / $1.000.000 = 0,35 (35 % de Margen Bruto -> Semáforo Verde).'
      ],
      parallelToolPrompt: 'Muéstrame en una tabla comparativa por qué un recargo del 30 % sobre el costo solo genera un margen bruto del 23,07 % sobre el precio de venta.',
      refinementPrompt: 'Añade en cotizador_inteligente.html una calculadora inversa: dado el costo y el margen deseado (35 %) tras un descuento del 10 %, ¿qué precio de lista debo fijar?',
      kit: { filename: 'catalogo_productos.csv', type: 'zip', description: 'Catálogo de 6 productos B2B (.csv), política comercial de márgenes (.md) y parámetros tributarios (.json).' },
      testCase: { label: 'Porcentaje de Margen Bruto Real (Precio Neto $1.000.000, Costo $650.000)', sampleInput: '35', expectedValue: 35, tolerance: 0.1, unit: '%', formulaHint: '(1.000.000 - 650.000) / 1.000.000 * 100 = 35 %' }
    },
    {
      id: 7,
      level: 2,
      levelName: 'Nivel 2: Herramientas de Negocio',
      title: 'Comparador de Proveedores con Matriz Ponderada y Verificación con /browser',
      duration: '20 min de práctica guiada',
      complexity: 'Intermedio (Cero Código)',
      nonDevProfile: 'Analistas de Mercado, Compras, Emprendedores, Investigadores',
      goal: 'Construir una matriz de decisión multicriterio alimentada por JSON, Markdown y YAML y auditada con /browser para elegir la mejor alternativa costo-beneficio.',
      businessChallenge: 'Evaluar proveedores con rigor matemático ponderando precio, garantía y rapidez en lugar de guiarse solo por el precio nominal.',
      agentRoleAction: 'El agente lee pliego y propuestas (@), programa comparador_mercado.html con ponderadores dinámicos y valida la selección con /browser.',
      learnerParallelAction: 'Tú cambias los pesos en los deslizadores y compruebas si cambia el ganador; luego le pides al agente que lo explique.',
      professionalOutputCriteria: 'Matriz comparativa multicriterio interactiva con validación visual por /browser y exportación de recomendación de compra.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @matriz_proveedores.json, @resumen_propuestas_tecnicas.md y @pliego_ponderacion.yaml.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Comprueba que el plan tome los pesos de un solo archivo y que use la regla de empate del YAML.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: decide qué criterio subirías de peso si la entrega urgente fuera crítica.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Analista de Compras Estratégicas.\nLee @matriz_proveedores.json, @resumen_propuestas_tecnicas.md y @pliego_ponderacion.yaml y construye comparador_mercado.html.\n1. Deslizadores de peso para Precio, Calidad y Rapidez que siempre sumen 100 %.\n2. Puntaje ponderado de 1 a 10 por proveedor, recalculado en vivo.\n3. Destacar al ganador, aplicar la regla de empate y marcar a quien no alcance el puntaje mínimo.\n4. Mostrar junto a cada proveedor el resumen cualitativo del comité.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Toma de Decisiones Multicriterio: Matriz de Evaluación Ponderada (Weighted Scoring)',
      conceptualTheory: 'Elegir un proveedor mirando únicamente el precio más bajo suele salir caro en garantías o retrasos. Una Matriz Ponderada asigna un porcentaje de importancia a cada criterio (sumando 100 %) y multiplica la calificación (1 a 10) de cada proveedor por su peso respectivo.',
      conceptualTaskSteps: [
        'Define los pesos oficiales: Precio = 40 % (0,40), Calidad = 35 % (0,35), Rapidez = 25 % (0,25).',
        'Evalúa al Proveedor Equilibrado: Nota en Precio = 7, Nota en Calidad = 9, Nota en Rapidez = 8.',
        'Multiplica y suma: (7 * 0,40) + (9 * 0,35) + (8 * 0,25) = 2,80 + 3,15 + 2,00 = 7,95 puntos.'
      ],
      parallelToolPrompt: 'Explícame cómo normalizar variables en distintas unidades (precio en pesos donde menor es mejor vs. garantía en meses donde mayor es mejor) en una escala del 1 al 10.',
      refinementPrompt: 'Agrega en comparador_mercado.html la normalización automática para criterios donde menor valor es mejor vs. mayor valor es mejor.',
      kit: { filename: 'matriz_proveedores.json', type: 'zip', description: 'Matriz de proveedores (.json), evaluación técnica del comité (.md) y pliego de ponderación (.yaml).' },
      testCase: { label: 'Puntaje ponderado (Precio 7×40 % + Calidad 9×35 % + Rapidez 8×25 %)', sampleInput: '7.95', expectedValue: 7.95, tolerance: 0.05, unit: 'puntos', formulaHint: '2,80 + 3,15 + 2,00 = 7,95 sobre 10' }
    },
    {
      id: 8,
      level: 2,
      levelName: 'Nivel 2: Herramientas de Negocio',
      title: 'Control de Inventario con Cálculo Automático de Stock de Seguridad y Punto de Reorden (ROP)',
      duration: '20 min de práctica guiada',
      complexity: 'Intermedio',
      nonDevProfile: 'Logística, Restaurantes, Farmacias, Comercio Minorista',
      goal: 'Construir un sistema local de inventario que calcule el Stock de Seguridad y el Punto de Reorden (ROP) para saber exactamente cuándo emitir pedido al proveedor.',
      businessChallenge: 'Evitar la rotura de stock calculando cuándo ordenar insumos considerando el consumo diario y los días de entrega del camión.',
      agentRoleAction: 'El agente lee inventario, salidas y tiempos (@) para programar control_inventario.html con alerta roja automática "¡PEDIR HOY!".',
      learnerParallelAction: 'Tú revisas que el agente derive el promedio y el máximo del historial de 14 días, en lugar de pedirte esos datos, y decides qué referencia comprarías primero.',
      professionalOutputCriteria: 'Tablero de inventario con promedio y máximo derivados del historial, ROP por referencia, alertas priorizadas por valor y orden de compra imprimible.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @inventario_bodega.csv, @historial_salidas_almacen.json y @tiempos_entrega_proveedores.yaml.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Verifica que el plan calcule promedio y máximo desde salidasDiarias y que cruce el tiempo de entrega del CSV.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: explica qué pasa con el stock de seguridad si el proveedor tarda 2 días más.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Ingeniero de Cadena de Suministro.\nCon @inventario_bodega.csv, @historial_salidas_almacen.json y @tiempos_entrega_proveedores.yaml construye control_inventario.html.\n1. Para cada SKU, calcula Venta_Diaria_Promedio y Venta_Diaria_Maxima desde el historial de 14 días.\n2. Aplica las fórmulas del YAML: Stock de Seguridad y Punto de Reorden (ROP).\n3. Muestra la alerta "¡PEDIR HOY!" cuando Stock_Actual <= ROP y ordena las alertas por valor del pedido (cantidad × costo unitario).\n4. Grafica las salidas diarias de cada referencia.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Fórmula del Punto de Reorden (ROP) y Colchón de Stock de Seguridad',
      conceptualTheory: 'Pedir mercancía cuando el estante llega a cero garantiza perder ventas durante los días que tarda el camión del proveedor (Lead Time). El Punto de Reorden (ROP) suma el consumo normal durante la espera más un Stock de Seguridad para cubrir picos de demanda.',
      conceptualTaskSteps: [
        'Datos del Café Especial 500 g: Venta promedio = 10 bolsas/día | Venta máxima = 14 bolsas/día | Entrega del proveedor = 5 días.',
        'Consumo en entrega = 10 * 5 = 50 bolsas. Stock de Seguridad = (14 - 10) * 5 = 20 bolsas.',
        'Punto de Reorden (ROP) = 50 + 20 = 70 bolsas.'
      ],
      parallelToolPrompt: 'Explícame cómo funciona la Clasificación ABC de inventarios (Pareto 80/20) y por qué los artículos Clase A requieren revisión continua.',
      refinementPrompt: 'Añade en control_inventario.html un selector de tiempo de entrega para simular retrasos del proveedor y un botón que genere la Orden de Compra imprimible por SKU en alerta.',
      kit: { filename: 'inventario_bodega.csv', type: 'zip', description: 'Inventario de bodega (.csv), historial de salidas (.json) y acuerdos de tiempos de entrega (.yaml).' },
      testCase: { label: 'Punto de Reorden ROP (Venta prom 10, Venta máx 14, Entrega 5 días)', sampleInput: '70', expectedValue: 70, tolerance: 0, unit: 'unidades', formulaHint: '(10 × 5) + ((14 - 10) × 5) = 50 + 20 = 70 unidades' }
    },
    {
      id: 9,
      level: 2,
      levelName: 'Nivel 2: Herramientas de Negocio',
      title: 'Analizador Local de Encuestas de Satisfacción (NPS), Quejas Recurrentes y Plan de Mejora',
      duration: '20 min de práctica guiada',
      complexity: 'Intermedio',
      nonDevProfile: 'Servicio al Cliente, Hotelería, Salud, Educación, Producto',
      goal: 'Construir un tablero que cruce encuestas CSV con logs de soporte PQRS y diccionario JSON, calcule el Net Promoter Score oficial (-100 a +100) y priorice causas de insatisfacción con Pareto.',
      businessChallenge: 'Analizar la lealtad de los clientes con la fórmula oficial NPS y priorizar quejas sin sesgos aritméticos usando Pareto.',
      agentRoleAction: 'El agente cruza encuestas, bitácoras PQRS y diccionario (@), construye analizador_nps.html y grafica el velocímetro NPS.',
      learnerParallelAction: 'Tú comparas el motivo de cada detractor con su ticket del .log y confirmas si el agente detectó la encuesta 19, cuyo motivo está mal clasificado.',
      professionalOutputCriteria: 'Tablero CX con cálculo de NPS estricto (-100 a +100), gráfico Pareto de quejas y simulador de recuperación de clientes.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @encuestas_trimestre.csv, @transcripciones_pqrs_soporte.log y @diccionario_clasificacion_cx.json.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Revisa que el plan clasifique por rangos del diccionario y que audite el motivo contra el comentario y el ticket.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: explica por qué un pasivo no suma ni resta en el NPS.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.'
      ],
      initialPrompt: 'Actúa como Especialista en Experiencia del Cliente.\nLee @encuestas_trimestre.csv, @transcripciones_pqrs_soporte.log y @diccionario_clasificacion_cx.json para construir analizador_nps.html.\n1. Clasifica cada nota en Promotor, Pasivo o Detractor con los rangos del diccionario.\n2. Calcula el NPS con la fórmula del diccionario.\n3. Audita el motivo de cada detractor contra su comentario y su ticket; reclasifica si se contradicen y deja constancia del cambio.\n4. Dibuja el diagrama de Pareto de motivos antes y después de la auditoría.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Por Qué el Net Promoter Score (NPS) No es un Promedio Aritmético',
      conceptualTheory: 'En la metodología NPS, los clientes que califican 7 u 8 son Pasivos (entran en el total de encuestados pero no suman puntos) y quienes califican 0 a 6 son Detractores que restan directamente al porcentaje de Promotores (9 y 10).',
      conceptualTaskSteps: [
        'Total encuestados = 20 clientes.',
        'Promotores (9-10) = 10 clientes (10 / 20 = 50 %). Pasivos (7-8) = 6 clientes (30 %). Detractores (0-6) = 4 clientes (4 / 20 = 20 %).',
        'Cálculo oficial NPS = 50 % - 20 % = +30 puntos.'
      ],
      parallelToolPrompt: 'Explícame por qué las calificaciones de 7 y 8 se consideran Pasivas en NPS y cómo usar el principio de Pareto 80/20 para atacar las causas raíz de los detractores.',
      refinementPrompt: 'Añade en analizador_nps.html un Simulador de Recuperación que muestre a cuánto sube el NPS si convertimos a N detractores en promotores este mes.',
      kit: { filename: 'encuestas_trimestre.csv', type: 'zip', description: '20 respuestas de satisfacción (.csv), bitácora de tickets PQRS (.log) y diccionario CX (.json).' },
      testCase: { label: 'Puntaje NPS oficial (10 Promotores, 6 Pasivos y 4 Detractores de 20)', sampleInput: '30', expectedValue: 30, tolerance: 0, unit: 'puntos NPS', formulaHint: '% Promotores (50 %) - % Detractores (20 %) = +30' }
    },
    {
      id: 10,
      level: 2,
      levelName: 'Nivel 2: Herramientas de Negocio',
      title: 'Automatización de Rutinas Periódicas con el Comando /schedule y Control Poka-Yoke',
      duration: '25 min de práctica guiada',
      complexity: 'Intermedio Consolidado',
      nonDevProfile: 'Jefes de Proyecto, Contadores, Administradores, Analistas',
      goal: 'Aprender a programar revisiones periódicas con /schedule junto con un tablero de cierres semanales idempotente y con validaciones Poka-Yoke.',
      businessChallenge: 'Blindar el cierre financiero semanal contra duplicaciones y descuadres contables usando automatización programada e idempotente.',
      agentRoleAction: 'El agente programa control_cierres.html con bloqueo Poka-Yoke e idempotencia por clave de semana y deja configurada la rutina periódica con /schedule.',
      learnerParallelAction: 'Tú revisas que la semana 2026-W45 quede bloqueada con el faltante exacto y decides con qué frecuencia programar la revisión con /schedule.',
      professionalOutputCriteria: 'Control de cierres a prueba de fallos (Poka-Yoke), registro de auditoría semanal programado con /schedule y alertas por variación mayor al 25 %.',
      antigravitySteps: [
        'Paso 1 (Preparar): Descarga el Kit Completo (.zip), descomprímelo en una carpeta nueva y ábrela en Antigravity. Archivos: @bitacora_cierres.json, @auxiliar_bancos_y_cartera_w44.csv y @protocolo_cierre_poka_yoke.md.',
        'Paso 2 (Planear): En el panel del agente selecciona el modo Planning, pega el Prompt Inicial y lee el Implementation Plan. Comprueba que el plan cuadre cada semana por separado y que use la idempotencyKey para no duplicar cierres.',
        'Paso 3 (Trabajo en paralelo): Aprueba el plan. Mientras el agente construye, resuelve la Tarea Conceptual: diseña un Poka-Yoke para un cierre de tu área.',
        'Paso 4 (Verificar): Revisa el Walkthrough: las pruebas deben pasar y debe haber capturas de /browser. Luego ingresa en el simulador el resultado que muestra la herramienta para el Caso Testigo.',
        'Paso 5 (Refinar): Envía el Prompt de Refinamiento y compara el antes y el después que muestra Antigravity antes de aceptar el cambio.',
        'Paso 6 (Automatizar): Pide al agente con /schedule una revisión semanal de control_cierres.html cada lunes a las 7:00 y comprueba en la lista de tareas programadas que quedó creada.'
      ],
      initialPrompt: 'Actúa como Auditor Operativo Senior.\nCon @bitacora_cierres.json, @auxiliar_bancos_y_cartera_w44.csv y @protocolo_cierre_poka_yoke.md construye control_cierres.html.\n1. Para cada semana por cerrar, suma bancos y cartera del CSV y compárala con las ventas registradas.\n2. Bloquea el cierre de la semana que no cuadre y muestra el valor faltante.\n3. Aplica la regla de variación del protocolo frente a las semanas auditadas.\n4. Usa la idempotencyKey para que cerrar dos veces la misma semana no duplique saldos.\n\n[VERIFICACIÓN ANTES DE ENTREGAR]\nEscribe pruebas automáticas (node --test) para cada función de cálculo usando los datos de esta carpeta, ejecútalas en la terminal y corrige hasta que pasen. Luego abre el resultado con /browser, prueba una entrada válida, una inválida, el campo vacío y el botón Reiniciar, y resume la evidencia en el Walkthrough.',
      conceptualTaskTitle: 'Diseño de Procesos Poka-Yoke (A Prueba de Errores) e Idempotencia en Cierres',
      conceptualTheory: 'Un mecanismo Poka-Yoke impide cerrar un proceso si los datos de control no cuadran antes de guardar. Por su parte, la Idempotencia asegura que ejecutar dos veces la misma tarea programada (/schedule) actualice la semana actual en vez de duplicar los montos.',
      conceptualTaskSteps: [
        'Define la llave única del periodo: ID_Semana = "2026-W44".',
        'Verifica la ecuación de cuadre cruzado: Ventas Facturadas ($12.500.000) - (Recaudo en Bancos $9.000.000 + Cartera Nueva $3.500.000) = $0 de diferencia.',
        'Si la diferencia es mayor a $0, el botón de cierre semanal permanece bloqueado con aviso explicativo.'
      ],
      parallelToolPrompt: 'Explícame con ejemplos administrativos qué es un control Poka-Yoke y por qué la idempotencia es obligatoria en tareas programadas con /schedule.',
      refinementPrompt: 'Con /schedule programa una revisión semanal que vuelva a ejecutar las pruebas de control_cierres.html y deje un resumen en cierres_auditoria.md sin duplicar registros.',
      kit: { filename: 'bitacora_cierres.json', type: 'zip', description: 'Bitácora histórica de cierres (.json), auxiliar de bancos y cartera (.csv) y protocolo Poka-Yoke (.md).' },
      testCase: { label: 'Total cuadrado de Cierre Semanal (Bancos $9.000.000 + Cartera $3.500.000)', sampleInput: '12500000', expectedValue: 12500000, tolerance: 1, unit: 'COP', formulaHint: '$9.000.000 en bancos + $3.500.000 en cuentas por cobrar = $12.500.000 COP' }
    }
  ];

  return { AG_EXERCISES_N1_N2 };
});
