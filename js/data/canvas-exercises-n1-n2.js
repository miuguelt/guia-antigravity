/* Datos de ejercicios Gemini Canvas — Niveles 1 y 2 (Ejercicios 1 al 10) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CANVAS_EXERCISES_N1_N2 = [
    {
      id: 1, level: 1, levelName: 'Nivel 1: Fundamentos',
      title: 'De Petición Ambigua a Especificación Estructurada de Runbook SRE (Rol + Contexto + Formato)',
      duration: '2 min de espera / lectura', complexity: 'Básico Inicial',
      goal: 'Transformar una solicitud genérica de una línea en una especificación técnica de diagnóstico minuto a minuto con percentiles P50, P95 y P99.',
      initialPrompt: 'Actúa como Ingeniero de Confiabilidad de Sitios (SRE) Senior y Mentor Técnico.\nElabora un Runbook Operativo de Respuesta a Incidentes para diagnosticar picos de latencia en una API REST de facturación electrónica durante los primeros 15 minutos de alerta.\n\n[ESTRUCTURA]\n1. Cronograma minuto a minuto (0-5 min telemetría, 5-10 min aislamiento, 10-15 min mitigación).\n2. Matriz de causas raíz (Pool saturado, Consultas N+1, Bloqueo de hilos, Pasarela externa) con Síntoma, Métrica P95/P99 y Mitigación.\n3. Plantilla de comunicación a interesados.\n\n[REGLAS]\nUsa lenguaje directo, métricas numéricas concretas (ms, 5xx) y cero ambigüedades.',
      studyTopic: 'Percentiles de Latencia (P50, P95, P99) vs. Promedios Simples en Sistemas Distribuidos',
      studyExplanation: 'En ingeniería nunca se mide la velocidad de un servidor usando solo el promedio: si 99 usuarios reciben respuesta en 20 ms pero 1 usuario tarda 10 segundos, el promedio oculta que el 1 % de los clientes críticos sufre caídas.',
      studyKeyPoints: [
        'P50 (Mediana): El 50 % de las peticiones son más rápidas que este valor.',
        'P95 y P99 (Tail Latency): Muestran la experiencia de los casos más lentos.',
        'Pool de Conexiones: Por qué abrir demasiadas conexiones simultáneas bloquea nuevas peticiones.'
      ],
      parallelStudyPrompt: 'Explícame con una analogía de filas en un banco por qué el promedio oculta caídas críticas y cómo los percentiles P95 y P99 revelan la experiencia real del usuario.',
      refinementPrompt: 'Agrega a la matriz una columna de "Falsos Positivos Comunes" y una regla determinista para aislar si el retraso ocurre en la base de datos local o en el microservicio externo mirando la correlación entre P95 y P99.',
      stepByStepGuide: [
        'Define siempre el perfil del experto (SRE Senior) y el público receptor (Desarrollador Junior).',
        'Exige formatos tabulares para comparar causas, síntomas y soluciones.',
        'Estudia los percentiles P95/P99 durante la espera para auditar las métricas sugeridas.'
      ],
      antigravityBridge: 'En Antigravity IDE: guarda este runbook en .agents/skills/sre-runbook/SKILL.md para que el agente audite automáticamente tus controladores y consultas SQL.'
    },
    {
      id: 2, level: 1, levelName: 'Nivel 1: Fundamentos',
      title: 'Restricciones Negativas y Registro de Decisión Arquitectónica (ADR)',
      duration: '2 min de espera / lectura', complexity: 'Básico',
      goal: 'Aplicar restricciones negativas estrictas para redactar un Architectural Decision Record (ADR) que justifique la migración a búsqueda híbrida (BM25 + Vectores) sin clichés corporativos.',
      initialPrompt: 'Actúa como Arquitecto de Software Principal y Evaluador Técnico.\nRedacta un Registro de Decisión Arquitectónica (ADR) de 1 página para incorporar búsqueda semántica híbrida (BM25 léxico + embeddings densos con Reciprocal Rank Fusion) en un catálogo de repuestos industriales.\n\n[SECCIONES]\n1. Contexto y Problema Cuantificado (fallos de búsqueda exacta).\n2. Decisión y Alternativas Evaluadas.\n3. Consecuencias Positivas y Negativas (costo de RAM y latencia).\n\n[RESTRICCIONES NEGATIVAS]\n- PROHIBIDO usar adjetivos vacíos ("revolucionario", "disruptivo", "sinérgico").\n- Máximo 4 líneas por párrafo.\n- Todos los costos y tiempos deben tener cifras explícitas.',
      studyTopic: 'Búsqueda Léxica (BM25) vs. Búsqueda Vectorial Semántica y Fusión RRF',
      studyExplanation: 'Un buscador tradicional por palabras exactas (BM25) es ideal para códigos SKU y referencias, mientras que los vectores capturan sinónimos e intención semántica. Combinar ambos con Reciprocal Rank Fusion (RRF) es el estándar profesional.',
      studyKeyPoints: [
        'BM25 (Léxico): Excelente para códigos exactos, referencias y siglas técnicas.',
        'Embeddings (Semántico): Captura intención ("calzado para lluvia" encuentra "botas impermeables").',
        'Reciprocal Rank Fusion (RRF): Combina los rankings de ambos motores sin calibrar pesos arbitrarios.'
      ],
      parallelStudyPrompt: 'Explícame la diferencia matemática entre el algoritmo BM25 y los embeddings vectoriales, y por qué Reciprocal Rank Fusion (RRF) evita calibrar pesos arbitrarios.',
      refinementPrompt: 'Incorpora la fórmula matemática de RRF: puntaje = sum(1 / (k + rank_i)) con k=60 y calcula la penalización de latencia estimada al consultar ambos índices en paralelo.',
      stepByStepGuide: [
        'Las restricciones negativas cortan de raíz el estilo genérico y obligan a usar argumentos verificables.',
        'Cuantifica siempre el costo de memoria y latencia al evaluar alternativas técnicas.',
        'Documenta las consecuencias negativas de cada decisión en el archivo ADR.'
      ],
      antigravityBridge: 'En Antigravity IDE: guarda este ADR en docs/architecture/ADR/ADR-002-busqueda-hibrida.md para que los agentes futuros no alteren la arquitectura sin justificación.'
    },
    {
      id: 3, level: 1, levelName: 'Nivel 1: Fundamentos',
      title: 'Few-Shot Prompting: Transformación de Historias de Usuario a Escenarios BDD / Gherkin',
      duration: '2 min de espera / lectura', complexity: 'Básico-Medio',
      goal: 'Usar la técnica Few-Shot con pares de entrada y salida para convertir requerimientos ambiguos en criterios Gherkin deterministas listos para pruebas automatizadas.',
      initialPrompt: 'Actúa como Analista de Requerimientos y Especialista en QA Automation.\nTransforma incidentes y solicitudes de usuarios en escenarios BDD Gherkin (Dado / Cuando / Entonces) con etiquetas de prioridad MoSCoW.\n\n[EJEMPLO BASE]\nEntrada: "Si le doy pagar varias veces seguidas me cobra doble."\nSalida:\n- ID: BDD-01 | Prioridad: MUST HAVE\n- Escenario: Cobro con clave de idempotencia\n  Dado que el usuario tiene un saldo de $50.000 COP y presiona el botón pagar dos veces en 300 ms,\n  Cuando el backend procesa la petición con el encabezado Idempotency-Key,\n  Entonces solo se debita una transacción de $50.000 COP y la segunda llamada retorna HTTP 200 con el recibo original.\n\nAhora procesa estos 3 casos reales:\n1. Búsqueda reactiva mientras el usuario escribe.\n2. Carga de archivo CSV con columnas faltantes.\n3. Pérdida de conexión mientras se llena un formulario.',
      studyTopic: 'Especificación por Ejemplo (BDD), Claves de Idempotencia y Debounce en Frontend',
      studyExplanation: 'Los criterios Gherkin definen estado inicial, acción y resultado observable sin ambigüedad, permitiendo automatizar las pruebas unitarias y de integración de inmediato.',
      studyKeyPoints: [
        'Gherkin (Dado/Cuando/Entonces): Estructura determinista lista para pruebas automatizadas.',
        'Idempotencia: Usar encabezado Idempotency-Key para que peticiones repetidas no causen cobros duplicados.',
        'Debounce: Esperar 300 ms tras la última tecla antes de lanzar consultas al backend.'
      ],
      parallelStudyPrompt: 'Explícame cómo funciona una clave de idempotencia en pagos electrónicos y por qué el debouncing evita sobrecargar servidores en campos de búsqueda.',
      refinementPrompt: 'Añade a cada escenario las aserciones técnicas verificables: tiempo de espera del debounce (300 ms), código HTTP esperado (422 para CSV inválido) y persistencia temporal local ante desconexión.',
      stepByStepGuide: [
        'Dar ejemplos concretos (Few-Shot) es mucho más efectivo que describir el formato en abstracto.',
        'Declara precondiciones observables y medibles en cada escenario.',
        'Convierte cada escenario Gherkin directamente en una prueba automatizada.'
      ],
      antigravityBridge: 'En Antigravity IDE: usa /plan y copia estos escenarios Gherkin en tests/ para diseñar primero las pruebas antes de escribir el código de la función.'
    },
    {
      id: 4, level: 1, levelName: 'Nivel 1: Fundamentos',
      title: 'Transformación de Minutas Desestructuradas a Esquemas JSON y Matriz RACI',
      duration: '2 min de espera / lectura', complexity: 'Básico-Medio',
      goal: 'Extraer compromisos, bloqueos técnicos y dependencias críticas de notas informales de reunión, estructurándolos en un contrato JSON Schema estricto y una matriz RACI.',
      initialPrompt: 'Actúa como Ingeniero de Datos y Gerente de Proyectos de Software.\nProcesa esta minuta desestructurada:\n"Laura de Seguridad advierte que el microservicio de autenticación expone tokens Bearer en los logs y bloquea el despliegue del viernes. Carlos de Backend necesita 2 días para implementar el sanitizador de logs, pero depende de que Mateo de Infraestructura actualice el agente de telemetría a más tardar el miércoles al mediodía. Sofía sugiere apagar clústeres de prueba fuera de horario laboral para recortar costos."\n\n[ENTREGABLES]\n1. Objeto JSON válido con: bloqueos_criticos, dependencias_cruzadas, fecha_limite_iso y responsables.\n2. Matriz RACI en Markdown (Responsible, Accountable, Consulted, Informed).\n3. Lista de riesgos no mitigados.',
      studyTopic: 'JSON Schema Estricto, Sanitización de Logs (PII y Tokens) y Gobernanza RACI',
      studyExplanation: 'Nunca deben registrarse tokens o datos personales en los archivos de log. Además, en una matriz RACI solo debe existir un único Aprobador (Accountable) por tarea.',
      studyKeyPoints: [
        'Enmascaramiento de Logs: Filtrar encabezados Authorization y tokens Bearer antes de escribir en disco.',
        'Matriz RACI: Un único Accountable (A) por fila evita que la responsabilidad técnica se diluya.',
        'Tipado en JSON: Fechas en formato estándar ISO-8601 (AAAA-MM-DD) y campos obligatorios validados.'
      ],
      parallelStudyPrompt: 'Explícame por qué una fila de RACI con dos personas en rol Accountable (A) diluye la responsabilidad técnica y cómo crear una expresión regular para ofuscar tokens Bearer en logs.',
      refinementPrompt: 'Agrega al JSON una regla de validación con regex para enmascarar encabezados Authorization Bearer y valida que en la matriz RACI exista un único responsable con rol "A" por entregable.',
      stepByStepGuide: [
        'Separa los datos crudos de las instrucciones de salida para evitar alucinaciones.',
        'Fuerza fechas en formato ISO-8601 (AAAA-MM-DD) y números limpios sin símbolos.',
        'Comprueba que cada entregable tenga asignado un único responsable de aprobación.'
      ],
      antigravityBridge: 'En Antigravity IDE: guarda el JSON generado como @compromisos_sprint.json y referéncialo para auditar automáticamente las tareas pendientes con /plan.'
    },
    {
      id: 5, level: 1, levelName: 'Nivel 1: Fundamentos',
      title: 'Calculadora y Auditor de Presupuesto de Rendimiento Web (Core Web Vitals & Bundle Budgeting)',
      duration: '2.5 min de espera / lectura', complexity: 'Básico Consolidado',
      goal: 'Construir una herramienta interactiva que audite el peso de paquetes JS/CSS y calcule el cumplimiento de los umbrales Core Web Vitals (LCP, TBT, CLS) para despliegues web continuos.',
      initialPrompt: 'Actúa como Especialista en Rendimiento Web y Front-End Architect.\nConstruye una aplicación web interactiva autocontenida (HTML, CSS y JS sin dependencias externas) para auditar presupuestos de rendimiento web (Performance Budgets).\n\n[FUNCIONALIDADES]\n1. Entradas numéricas para: Tamaño JS Comprimido (KB), Tamaño CSS (KB), Cantidad de Peticiones HTTP, Latencia de Red (ms) y Tiempo de Bloqueo Total (TBT ms).\n2. Semáforo determinista de Core Web Vitals:\n   - LCP (Largest Contentful Paint): Bueno <= 2.5 s, Requiere Mejora <= 4.0 s, Pobre > 4.0 s.\n   - TBT (Total Blocking Time): Bueno <= 200 ms, Pobre > 200 ms.\n   - Límite de Bundle: Alerta si JS + CSS > 150 KB.\n3. Panel de recomendaciones técnicas automáticas según el indicador degradado.',
      studyTopic: 'Presupuestos de Rendimiento Web (Performance Budgets), Core Web Vitals y Métricas de Carga',
      studyExplanation: 'Fijar un presupuesto de rendimiento web (ej. máximo 150 KB de JS/CSS comprimido) evita que una aplicación se degrade gradualmente con cada commit, asegurando que el LCP permanezca bajo 2.5 segundos.',
      studyKeyPoints: [
        'LCP (Largest Contentful Paint): Mide el tiempo en renderizar el bloque principal de contenido visible.',
        'TBT (Total Blocking Time): Mide la cantidad de tiempo entre FCP y TTI donde el hilo principal estuvo bloqueado.',
        'Bundle Budget: Límite estricto de peso en bytes que rompe el build de integración continua si se supera.'
      ],
      parallelStudyPrompt: 'Explícame qué es el Total Blocking Time (TBT), por qué 150 KB de JavaScript en un teléfono móvil demora más que 150 KB de imagen y cómo fijar límites en CI/CD.',
      refinementPrompt: 'Añade un simulador de red 3G móvil lenta (RTT 300 ms, 1.6 Mbps de bajada) que recalcule automáticamente el tiempo estimado de descarga y dibuje una barra comparativa de uso de cuota.',
      stepByStepGuide: [
        'Fija límites cuantitativos claros (umbrales de bytes y milisegundos) antes de codificar.',
        'Modela condiciones adversas de red móvil en lugar de probar solo en conexiones de fibra.',
        'Provee retroalimentación técnica accionable indicando qué recursos específicos optimizar.'
      ],
      antigravityBridge: 'En Antigravity IDE: extrae la lógica a js/core/performance-budget.js y agrégala a la compuerta de pruebas en tests/ para impedir que bundles pesados lleguen a producción.'
    },
    {
      id: 6, level: 2, levelName: 'Nivel 2: Razonamiento y Datos',
      title: 'Cadena de Pensamiento (Chain-of-Thought) para Arquitectura Offline-First',
      duration: '3 min de espera / lectura', complexity: 'Intermedio',
      goal: 'Guiar al modelo para que evalúe restricciones técnicas en conflicto mediante una matriz ponderada antes de recomendar una arquitectura de sincronización.',
      initialPrompt: 'Actúa como Arquitecto de Soluciones Cloud Principal.\nDiseña la arquitectura de persistencia y sincronización para una aplicación web educativa usada en 120 centros rurales de Colombia con cortes de internet frecuentes de 2 a 6 horas diarias.\n\n[RAZONAMIENTO PASO A PASO EXIGIDO]\n1. Analiza el almacenamiento en navegador: Compara IndexedDB nativo vs. SQLite WASM vs. LocalStorage considerando cuotas de espacio y atomicidad.\n2. Evalúa la sincronización al reconectar: Analiza Last-Write-Wins (LWW) vs. Append-Only Log con UUIDv7 vs. CRDTs.\n3. Construye una matriz de decisión ponderada con criterios: Confiabilidad Offline (40 %), Complejidad de Implementación (30 %), Sobrecarga de Datos (30 %).\n4. Emite la recomendación final con el esquema JSON del paquete de sincronización.',
      studyTopic: 'Arquitectura Offline-First, Registros Inmutables Append-Only y Resolución de Conflictos',
      studyExplanation: 'En registros de calificaciones o transacciones contables, la regla Last-Write-Wins (LWW) destruye información ante ediciones concurrentes desconectadas. Un modelo Append-Only registra cada cambio como un evento nuevo inmutable con identificador cronológico.',
      studyKeyPoints: [
        'Riesgo de Last-Write-Wins (LWW): Sobrescribe cambios concurrentes al reconectar.',
        'Modelo Append-Only: Cada registro se agrega como evento inmutable con marca temporal y UUIDv7.',
        'IndexedDB Nativo: Almacenamiento transaccional en el navegador sin dependencias externas.'
      ],
      parallelStudyPrompt: 'Explícame por qué el modelo Last-Write-Wins (LWW) destruye información en sistemas colaborativos desconectados y cómo un UUIDv7 garantiza orden cronológico sin reloj central.',
      refinementPrompt: 'Diseña el esquema JSON estricto del lote de sincronización Delta Sync (ID de dispositivo, secuencia, UUIDv7, operaciones, firma SHA-256) e incluye la estrategia de reintentos con Exponential Backoff.',
      stepByStepGuide: [
        'Exige el desglose analítico paso a paso antes de emitir la recomendación de arquitectura.',
        'Pondera criterios técnicos y operativos de forma explícita en una tabla matricial.',
        'Define esquemas de datos inmutables para garantizar trazabilidad y auditoría completa.'
      ],
      antigravityBridge: 'En Antigravity IDE: implementa esta sincronización en js/core/sync-engine.js garantizando soporte nativo para protocolo file:// y almacenamiento local transaccional.'
    },
    {
      id: 7, level: 2, levelName: 'Nivel 2: Razonamiento y Datos',
      title: 'Auditoría de Seguridad Aplicada y Refactorización Defensiva (OWASP Top 10)',
      duration: '3 min de espera / lectura', complexity: 'Intermedio',
      goal: 'Detectar vulnerabilidades críticas en un controlador de autenticación heredado (inyección SQL, contraseñas sin salt, fuga de secretos) y generar la refactorización blindada.',
      initialPrompt: 'Actúa como Ingeniero de Seguridad de Aplicaciones (AppSec) Senior.\nAudita este controlador de autenticación vulnerable:\n"SELECT * FROM usuarios WHERE correo = \'" + req.body.correo + "\' AND clave = \'" + md5(req.body.clave) + "\'"\nEl código además firma un JWT con la clave fija "secret123", almacena el token en localStorage y en caso de error 500 devuelve la traza completa con la IP de la base de datos.\n\n[ENTREGABLES]\n1. Lista de 5 vulnerabilidades clasificadas por OWASP Top 10 (A01, A02, A03, A05, A09) con vector de ataque.\n2. Explicación del impacto en producción.\n3. Código completamente refactorizado en JavaScript/Node.js usando consultas parametrizadas, hashing con Argon2id/bcrypt, cookies HttpOnly SameSite y sanitización estricta de errores.',
      studyTopic: 'Consultas Parametrizadas, Hashing Seguro con Salt (Argon2id) y Prevención de Enumeración',
      studyExplanation: 'Concatenar texto en SQL permite inyectar comandos lógicos arbitrarios, y usar MD5 permite descifrar claves en segundos mediante tablas arcoíris. Las consultas parametrizadas separan la instrucción de los datos.',
      studyKeyPoints: [
        'Consultas Parametrizadas: Separan la instrucción SQL de los datos enviados por el usuario.',
        'Argon2id / Bcrypt: Funciones de derivación de claves con factor de trabajo y Salt único por usuario.',
        'Mensajes Genéricos de Error: Evitan revelar si un correo existe y nunca exponen trazas internas.'
      ],
      parallelStudyPrompt: 'Explícame por qué las consultas parametrizadas eliminan de raíz la inyección SQL y qué es un Timing Attack durante la validación de correos electrónicos.',
      refinementPrompt: 'Agrega al código refactorizado un validador de esquemas de entrada con expresiones regulares seguras para correos y una función de comparación en tiempo constante (crypto.timingSafeEqual) para mitigar ataques de temporización.',
      stepByStepGuide: [
        'Clasifica cada fallo según estándares internacionales (OWASP Top 10).',
        'Nunca devuelvas trazas internas o datos de conexión al cliente en respuestas de error.',
        'Verifica que ningún secreto o credencial quede hardcodeado en el código fuente.'
      ],
      antigravityBridge: 'En Antigravity IDE: usa /browser y pruebas automatizadas en tests/ para verificar que el endpoint rechace entradas maliciosas (\' OR 1=1 --) con HTTP 400 sin exponer detalles del motor de base de datos.'
    },
    {
      id: 8, level: 2, levelName: 'Nivel 2: Razonamiento y Datos',
      title: 'Laboratorio Interactivo de Auditoría y Limpieza de CSV (Regla IQR de Tukey)',
      duration: '3 min de espera / lectura', complexity: 'Intermedio',
      goal: 'Construir una herramienta web en el navegador que cargue tablas CSV, audite registros incompletos, impute valores nulos con la mediana y detecte valores atípicos mediante el Rango Intercuartílico (IQR).',
      initialPrompt: 'Actúa como Ingeniero de Datos Senior.\nConstruye una aplicación web autocontenida para auditar y limpiar conjuntos de datos CSV en el navegador.\n\n[FUNCIONALIDADES]\n1. Carga de archivo CSV local mediante FileReader y botón para cargar un lote de prueba precargado con nulos, duplicados y valores atípicos.\n2. Módulo de limpieza determinista:\n   - Deduplicación basada en clave primaria compuesta.\n   - Imputación de nulos numéricos usando la Mediana (Q2) en lugar de la Media.\n   - Detección de atípicos con la Regla de Tukey: IQR = Q3 - Q1, límites [Q1 - 1.5*IQR, Q3 + 1.5*IQR].\n3. Tabla interactiva con filas anómalas resaltadas en amarillo y descarga del CSV limpio resultante.',
      studyTopic: 'Robustez de la Mediana frente a la Media, Cuartiles y Regla IQR de Tukey',
      studyExplanation: 'Un solo error de digitación o valor extremo distorsiona severamente el promedio aritmético (Media), mientras que la Mediana (Q2) y los cuartiles Q1 y Q3 permanecen robustos e inalterados.',
      studyKeyPoints: [
        'Sensibilidad de la Media: Se altera drásticamente ante un único valor anómalo extremo.',
        'Robustez de la Mediana (Q2): Representa el valor central ordenado sin sesgo por valores extremos.',
        'Regla IQR de Tukey: Marca como atípico cualquier dato fuera de [Q1 - 1.5*IQR, Q3 + 1.5*IQR].'
      ],
      parallelStudyPrompt: 'Explícame con un ejemplo de salarios por qué un multimillonario distorsiona la media aritmética pero deja intacta la mediana, y cómo calcular Q1 y Q3 a mano.',
      refinementPrompt: 'Añade un panel de telemetría estadística que muestre Media, Mediana, Q1, Q3, Mínimo, Máximo y Cantidad de nulos imputados por cada columna numérica analizada.',
      stepByStepGuide: [
        'Utiliza siempre la mediana cuando existan distribuciones sesgadas o datos atípicos.',
        'Informa explícitamente en la interfaz qué filas y celdas fueron modificadas durante la limpieza.',
        'Procesa todos los archivos en memoria del cliente sin transmitir información a servidores externos.'
      ],
      antigravityBridge: 'En Antigravity IDE: conecta esta lógica con los archivos semilla @contactos_duplicados.csv y verifica que los registros maestros coincidan con las pruebas unitarias.'
    },
    {
      id: 9, level: 2, levelName: 'Nivel 2: Razonamiento y Datos',
      title: 'Simulador Interactivo de Pruebas A/B, Z-Score y Significancia Estadística',
      duration: '3 min de espera / lectura', complexity: 'Intermedio-Avanzado',
      goal: 'Construir una calculadora visual de pruebas A/B que determine con rigor matemático si la diferencia de conversión entre una versión control y una variante es estadísticamente significativa.',
      initialPrompt: 'Actúa como Científico de Datos de Experimentación y Optimización de Producto.\nConstruye una calculadora interactiva de Pruebas A/B (Variante Control A vs. Variante B) en una página web autocontenida.\n\n[FUNCIONALIDADES]\n1. Cajas de entrada numéricas para: Visitantes de A, Conversiones de A, Visitantes de B, Conversiones de B y Nivel de Confianza deseado (90 %, 95 %, 99 %).\n2. Motor matemático determinista:\n   - Tasa de conversión de cada variante (% y ratio).\n   - Incremento relativo (Lift % = (CR_B - CR_A) / CR_A * 100).\n   - Estadístico Z de dos proporciones y cálculo del valor p (p-value) aproximado.\n3. Veredicto concluyente en español: "Resultado Significativo (Rechazar H0)" o "Diferencia no concluyente (Posible azar)".\n4. Gráfico SVG vectorial de las campanas de Gauss superpuestas.',
      studyTopic: 'Pruebas de Hipótesis A/B, Hipótesis Nula (H0), Estadístico Z y Error Tipo I / Tipo II',
      studyExplanation: 'Detener un experimento prematuramente con pocas visitas conduce a declarar victorias falsas. El estadístico Z y el valor p permiten calcular la probabilidad exacta de que la diferencia observada sea producto del azar.',
      studyKeyPoints: [
        'Hipótesis Nula (H0): Supuesto de que no existe diferencia real entre las variantes analizadas.',
        'Valor p (p-value): Si es menor a 0.05 (al 95 % de confianza), se rechaza la hipótesis nula.',
        'Efecto Mínimo Detectable (MDE): Tamaño de muestra mínimo necesario para detectar una mejora real.'
      ],
      parallelStudyPrompt: 'Explícame qué es el p-value, por qué evaluar un experimento con solo 50 visitas genera falsos positivos y qué representa el Error Tipo I en lanzamientos de software.',
      refinementPrompt: 'Incorpora una pestaña con la Calculadora de Tamaño Muestral Mínimo requerido (Sample Size Calculator) a partir de la tasa de conversión base y el Efecto Mínimo Detectable (MDE %).',
      stepByStepGuide: [
        'No declares victorias prematuras antes de alcanzar el tamaño de muestra planificado.',
        'Comunica el veredicto en lenguaje claro y accesible para todo el equipo de producto.',
        'Valida las fórmulas de proporciones contra tablas estadísticas de referencia conocidas.'
      ],
      antigravityBridge: 'En Antigravity IDE: encapsula las funciones matemáticas en js/core/ab-testing.js y bloquéalas con pruebas deterministas en tests/ para utilizarlas en pipelines de despliegue progresivo.'
    },
    {
      id: 10, level: 2, levelName: 'Nivel 2: Razonamiento y Datos',
      title: 'Laboratorio Visual de Expresiones Regulares (Regex) con Pruebas Unitarias en Vivo',
      duration: '3 min de espera / lectura', complexity: 'Intermedio-Avanzado',
      goal: 'Construir un entorno de prueba y validación de expresiones regulares en el navegador con ejecución segura en bloques try/catch, captura de grupos y detección de retroceso catastrófico (ReDoS).',
      initialPrompt: 'Actúa como Ingeniero de Compiladores y Desarrollador Front-End Senior.\nConstruye un Laboratorio Interactivo de Expresiones Regulares (Regex) en una aplicación web autocontenida sin librerías externas.\n\n[REQUERIMIENTOS]\n1. Campo para ingresar el patrón regex y selector de banderas (g, i, m), evaluado dentro de un bloque try/catch para evitar excepciones por sintaxis incompleta.\n2. Suite de 5 retos precargados con botones de carga rápida: Correo Institucional SENA, Contraseña Fuerte, Fecha ISO AAAA-MM-DD, UUIDv4 y Enmascaramiento de Tarjetas.\n3. Panel de pruebas unitarias en vivo: Lista de cadenas que DEBEN coincidir (verde) vs. cadenas que DEBEN rechazarse (rojo).\n4. Resaltado visual en el texto de las coincidencias y tabla desglosando los Grupos de Captura ($1, $2).',
      studyTopic: 'Motores de Expresiones Regulares, Grupos de Captura, Lookaheads y Retroceso Catastrófico (ReDoS)',
      studyExplanation: 'Al ingresar expresiones regulares dinámicas, el patrón pasa por estados transitorios inválidos. Envolver la instanciación en bloques try/catch protege la estabilidad de la aplicación frente a errores de sintaxis y ReDoS.',
      studyKeyPoints: [
        'Cuantificadores Codiciosos (.*) vs. Perezosos (.*?): Controlar el alcance de coincidencia en el texto.',
        'Positive Lookahead (?=...): Validar reglas de complejidad en contraseñas sin consumir caracteres.',
        'Retroceso Catastrófico (ReDoS): Evitar expresiones ambiguas con cuantificadores anidados tipo (a+)+$.'
      ],
      parallelStudyPrompt: 'Explícame la diferencia entre cuantificadores codiciosos (greedy .*) y perezosos (lazy .*?), cómo funciona un Lookahead positivo (?=.*[A-Z]) y cómo evitar que un regex congele el navegador por ReDoS.',
      refinementPrompt: 'Añade un analizador estático que detecte patrones propensos a ReDoS (como cuantificadores anidados (a+)+) y un campo de prueba de reemplazo con grupos $1-$2.',
      stepByStepGuide: [
        'Envuelve siempre la instanciación de expresiones regulares en bloques try/catch seguros.',
        'Evalúa casos positivos y casos negativos en paralelo para evitar validaciones permisivas.',
        'Verifica los grupos de captura con fechas en formato ISO-8601 (AAAA-MM-DD).'
      ],
      antigravityBridge: 'En Antigravity IDE: utiliza el atajo de edición en línea (Ctrl+I) para incrustar las expresiones regulares validadas directamente en los validadores de formularios de tu proyecto.'
    }
  ];

  return { CANVAS_EXERCISES_N1_N2 };
});
