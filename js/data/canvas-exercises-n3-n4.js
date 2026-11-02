/* Datos de ejercicios Gemini Canvas — Niveles 3 y 4 (Ejercicios 11 al 20) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CANVAS_EXERCISES_N3_N4 = [
    {
      id: 11, level: 3, levelName: 'Nivel 3: Sistemas Complejos',
      title: 'Optimizador de Colas Asíncronas y Concurrencia de Workers (Async Queue Planner)',
      duration: '3.5 min de espera / lectura', complexity: 'Avanzado',
      goal: 'Construir un simulador interactivo para dimensionar colas de procesamiento asíncrono (ej. Redis / BullMQ / Celery), calculando la tasa de arribo de trabajos, tiempo de servicio y número óptimo de workers para evitar saturación de memoria.',
      initialPrompt: 'Actúa como Staff Backend Engineer y Arquitecto de Mensajería Asíncrona.\nConstruye una aplicación web interactiva autocontenida para modelar y dimensionar colas de tareas asíncronas y procesamiento por lotes (Workers).\n\n[FUNCIONALIDADES]\n1. Controles para: Tasa de Llegada de Tareas (jobs/segundo), Tiempo Medio de Procesamiento por Tarea (ms), Concurrencia de Workers Activos (1 a 32 workers) y Límite de Memoria Máxima en Cola (MB).\n2. Motor de cálculo determinista de teoría de colas (M/M/c):\n   - Factor de Utilización del Clúster (rho = Tasa_Llegada / (Workers * Capacidad_Worker)).\n   - Tiempo Medio de Residencia en Cola y Tiempo Total de Ciclo.\n   - Alerta roja si rho >= 1.0 (Cola Divergente / Riesgo de Caída por Out Of Memory).\n3. Gráfica en tiempo real del tamaño de la cola y semáforo de saturación con recomendación de autoescalado.',
      studyTopic: 'Teoría de Colas (Notación de Kendall M/M/c), Factor de Utilización y Manejo de Picos de Tráfico',
      studyExplanation: 'Cuando una cola opera con un factor de utilización cercano al 100 %, cualquier variación aleatoria en la llegada o duración de las tareas provoca que la cola crezca indefinidamente, agotando la memoria RAM del servidor.',
      studyKeyPoints: [
        'Factor de Utilización (rho): Relación entre el volumen de trabajo entrante y la capacidad total de procesamiento.',
        'Cola Divergente (rho >= 1.0): La tasa de entrada supera el drenaje y la cola colapsa por memoria (OOM).',
        'Margen de Seguridad: Operar por debajo del 80 % de utilización absorbe picos de demanda imprevistos.'
      ],
      parallelStudyPrompt: 'Explícame matemáticamente por qué una cola con factor de utilización del 99 % colapsa ante la menor variabilidad temporal y cómo dimensionar un pool de workers asíncronos.',
      refinementPrompt: 'Añade un simulador de ráfagas repentinas (Traffic Spikes) con un botón para inyectar 500 tareas simultáneas y calcular cuántos segundos tarda el clúster en drenar la cola por completo.',
      stepByStepGuide: [
        'Mantén la utilización de la infraestructura por debajo del 85 % para absorber variabilidad de tráfico.',
        'Implementa umbrales máximos de memoria y mecanismos de descarte controlado (Backpressure).',
        'Simula escenarios de ráfaga para verificar los tiempos de recuperación del clúster.'
      ],
      antigravityBridge: 'En Antigravity IDE: traslada este modelo a la configuración de tus workers en docker-compose.yml ajustando las variables de concurrencia y límites de memoria del contenedor.'
    },
    {
      id: 12, level: 3, levelName: 'Nivel 3: Sistemas Complejos',
      title: 'Visualizador Interactivo de Algoritmos de Ordenamiento y Complejidad Big-O',
      duration: '3.5 min de espera / lectura', complexity: 'Avanzado',
      goal: 'Construir un laboratorio algorítmico interactivo con visualización paso a paso que mida empíricamente comparaciones, intercambios y escrituras en memoria para comparar algoritmos cuadráticos vs. logarítmicos.',
      initialPrompt: 'Actúa como Profesor de Ciencias de la Computación e Ingeniero de Visualización.\nConstruye un Visualizador de Algoritmos de Ordenamiento en el navegador (Bubble Sort, Selection Sort, Insertion Sort, Quick Sort y Merge Sort) sin librerías externas.\n\n[REQUERIMIENTOS]\n1. Controles para: Tamaño del arreglo (10 a 60 elementos), Estado inicial (Aleatorio, Casi Ordenado, Orden Inverso) y Velocidad de animación.\n2. Telemetría determinista en vivo: Contador de comparaciones exactas, contador de intercambios (swaps) y cronómetro de ejecución.\n3. Panel con ficha teórica de complejidad temporal (Mejor, Promedio, Peor) y espacial para el algoritmo seleccionado.\n4. Botón de Pausa, Reanudar y Comparativa Simultánea en Memoria.',
      studyTopic: 'Notación Asintótica Big-O, Divide y Vencerás (O(n log n)) vs. Complejidad Cuadrática (O(n²))',
      studyExplanation: 'Cuando los datos se multiplican por 10, un algoritmo cuadrático O(n²) requiere 100 veces más operaciones, mientras que los algoritmos de tipo Divide y Vencerás como Merge Sort y Quick Sort escalan de forma eficiente dividiendo el problema.',
      studyKeyPoints: [
        'Complejidad Cuadrática O(n²): Algoritmos elementales que recorren arreglos anidados (Bubble, Selection).',
        'Divide y Vencerás O(n log n): Estrategias eficientes que particionan datos recurrentemente.',
        'Eficiencia de Insertion Sort: Rendimiento lineal cercano a O(n) sobre colecciones casi ordenadas.'
      ],
      parallelStudyPrompt: 'Explícame por qué Insertion Sort es sumamente eficiente en arreglos casi ordenados, cuándo Quick Sort cae en O(n²) y qué significa que un ordenamiento sea estable.',
      refinementPrompt: 'Agrega un modo de Auditoría de Rendimiento que ejecute los 5 algoritmos sobre un arreglo idéntico de 1.000 enteros en memoria sin animación y muestre una tabla comparativa con los milisegundos y operaciones de cada uno.',
      stepByStepGuide: [
        'Desacopla la lógica algorítmica de la capa de renderizado visual para facilitar pruebas puras.',
        'Provee datos con distintas distribuciones iniciales para evaluar casos favorables y desfavorables.',
        'Cuantifica comparaciones e intercambios antes de fiarte únicamente de los tiempos de CPU.'
      ],
      antigravityBridge: 'En Antigravity IDE: traslada las funciones de ordenamiento a js/core/sorting.js y escribe pruebas automatizadas en tests/ comprobando que el resultado cumpla la invariante de orden no decreciente.'
    },
    {
      id: 13, level: 3, levelName: 'Nivel 3: Sistemas Complejos',
      title: 'Simulador de Resiliencia de Microservicios: Circuit Breaker y Token Bucket',
      duration: '4 min de espera / lectura', complexity: 'Avanzado',
      goal: 'Construir un banco de pruebas interactivo que simule fallos en cascada en microservicios y demuestre cómo el patrón Circuit Breaker y el limitador Token Bucket protegen la disponibilidad del sistema.',
      initialPrompt: 'Actúa como Principal Distributed Systems Architect y Especialista en Confiabilidad.\nConstruye un Simulador Interactivo de Resiliencia de Microservicios en una aplicación web autocontenida.\n\n[ARQUITECTURA]\n1. Tres bloques visuales: Generador de Tráfico (peticiones/segundo), API Gateway con Rate Limiter (Token Bucket) y Servicio de Pagos con selector de estado de salud (Saludable 200 OK, Degradado con latencia de 2 s, Caído 500 Error).\n2. Máquina de estados finita del Circuit Breaker en vivo:\n   - CLOSED: Flujo normal; si la tasa de fallos supera el 50 % en 5 segundos, conmuta a OPEN.\n   - OPEN: Fallo rápido inmediato (HTTP 503 Fast-Fail en 1 ms) protegiendo el servicio durante una ventana de enfriamiento (cooldown).\n   - HALF-OPEN: Permite 3 peticiones de prueba controladas; si son exitosas vuelve a CLOSED; si una falla regresa a OPEN.\n3. Telemetría de latencia ahorrada y tasa de errores mitigados.',
      studyTopic: 'Patrón Circuit Breaker (Closed, Open, Half-Open), Token Bucket y Tormenta de Reintentos',
      studyExplanation: 'Continuar enviando peticiones a un servicio que ha colapsado satura los hilos y memoria del cliente. El Circuit Breaker bloquea peticiones en 1 ms (Fail-Fast) permitiendo que el servicio destino se recupere.',
      studyKeyPoints: [
        'Estados del Circuit Breaker: CLOSED (operación regular) -> OPEN (bloqueo protector) -> HALF-OPEN (sondeo controlado).',
        'Token Bucket: Regula ráfagas de tráfico recargando tokens a una tasa constante por segundo.',
        'Exponential Backoff con Jitter: Pausa progresiva con dispersión aleatoria para evitar sobrecargar servidores.'
      ],
      parallelStudyPrompt: 'Explícame por qué seguir enviando peticiones a un servicio caído consume los hilos y la memoria de todo el clúster, y cómo el algoritmo Token Bucket amortigua ráfagas sin bloquear tráfico legítimo.',
      refinementPrompt: 'Añade un selector de Estrategia de Reintentos en el cliente (Inmediata vs. Exponential Backoff con Jitter aleatorio) para demostrar visualmente cómo el backoff previene tumbar un servidor que está reiniciando.',
      stepByStepGuide: [
        'Modela la máquina de estados con transiciones explícitas, deterministas y testeables.',
        'Aísla las fallas en el perímetro del sistema antes de que se propaguen en cascada.',
        'Aplica siempre dispersión aleatoria (jitter) al implementar reintentos automáticos.'
      ],
      antigravityBridge: 'En Antigravity IDE: implementa la máquina del Circuit Breaker como una clase pura en js/core/circuit-breaker.js con pruebas unitarias que cubran los 3 estados y sus transiciones exactas.'
    },
    {
      id: 14, level: 3, levelName: 'Nivel 3: Sistemas Complejos',
      title: 'Estudio de Diseño Accesible: Calculadora de Luminancia WCAG 2.1 y Paletas Serenidad',
      duration: '3.5 min de espera / lectura', complexity: 'Avanzado',
      goal: 'Construir una herramienta web interactiva que calcule la luminancia relativa fotométrica sRGB, evalúe razones de contraste según WCAG 2.1 (AA y AAA), autoajuste colores deficientes y exporte variables CSS accesibles.',
      initialPrompt: 'Actúa como Principal Design Systems Engineer y Auditor de Accesibilidad WCAG 2.1.\nConstruye una Calculadora de Contraste y Estudio de Color Accesible en una aplicación web autocontenida conforme a la norma WCAG 2.1.\n\n[FUNCIONALIDADES]\n1. Selectores de color en formato HEX/RGB para: Fondo, Texto Principal, Texto Secundario y Acento Interactivo.\n2. Motor fotométrico determinista exacto según fórmula oficial del W3C:\n   - Conversión sRGB a espacio lineal: C_lineal = C_srgb <= 0.04045 ? C_srgb / 12.92 : Math.pow((C_srgb + 0.055) / 1.055, 2.4).\n   - Luminancia relativa: L = 0.2126 * R + 0.7152 * G + 0.0722 * B.\n   - Razón de Contraste: (L1 + 0.05) / (L2 + 0.05).\n3. Diagnóstico normativo con sellos: AA Texto Normal (>= 4.5:1), AA Texto Grande (>= 3.0:1) y AAA (>= 7.0:1).\n4. Botón de Auto-Ajuste que incremente o reduzca la luminosidad del texto hasta alcanzar 4.5:1 automáticamente.\n5. Exportador de bloque CSS con tokens variables :root con paletas de serenidad visual (Brisa Nórdica y Noche Apacible).',
      studyTopic: 'Fórmula de Luminancia Relativa sRGB, Estándares WCAG 2.1 AA/AAA y Regla 7.4 de Legibilidad',
      studyExplanation: 'El ojo humano percibe con mucha mayor luminosidad el canal verde (0.7152) que el azul (0.0722). Además, ningún estado o advertencia crítica debe comunicarse exclusivamente mediante el color sin texto ni íconos.',
      studyKeyPoints: [
        'Pesos Espectrales Fotométricos: Verde (0.7152), Rojo (0.2126) y Azul (0.0722).',
        'Umbrales Normativos WCAG: >= 4.5:1 para texto estándar (AA) y >= 7.0:1 para máxima legibilidad (AAA).',
        'Independencia Cromática: Acompañar siempre indicaciones de color con íconos o etiquetas textuales.'
      ],
      parallelStudyPrompt: 'Explícame por qué el ojo humano percibe con mucha mayor luminosidad el canal verde (0,7152) que el azul (0,0722) y qué es la independencia cromática en interfaces accesibles.',
      refinementPrompt: 'Agrega un simulador de visión daltónica (Protanomalía, Deuteranomalía y Acromatopsia) usando matrices de transformación SVG y una advertencia si alguna alerta crítica transmite información únicamente a través del color.',
      stepByStepGuide: [
        'Aplica la fórmula fotométrica oficial del W3C sin sustituciones ni aproximaciones lineales.',
        'Acompaña siempre el código de color con etiquetas legibles y patrones gráficos.',
        'Exporta las variables accesibles validadas en formato CSS nativo reutilizable.'
      ],
      antigravityBridge: 'En Antigravity IDE: copia los tokens CSS generados directamente en css/main.css y valida la conformidad del portal con la compuerta de legibilidad de la Regla 7.4.'
    },
    {
      id: 15, level: 3, levelName: 'Nivel 3: Sistemas Complejos',
      title: 'Dimensionador de Recursos Cloud y Capacidad de Tokens LLM (FinOps & Context Caching)',
      duration: '4 min de espera / lectura', complexity: 'Avanzado Consolidado',
      goal: 'Construir una calculadora interactiva para proyectar el consumo de memoria, CPU y costos de inferencia de modelos de lenguaje en producción, evaluando el impacto de Context Caching y enrutamiento híbrido de modelos.',
      initialPrompt: 'Actúa como AI Systems Architect y Especialista en FinOps Cloud.\nConstruye un Simulador y Dimensionador de Recursos Cloud y Costos de Inferencia de IA en una aplicación web interactiva.\n\n[PARÁMETROS Y FUNCIONALIDADES]\n1. Entradas configurables: Peticiones Diarias Estimadas (1.000 a 500.000), Longitud Media de Prompt (tokens), Longitud Media de Respuesta (tokens), Tasa de Acierto de Context Caching (% de 0 a 90 %) y Concurrencia Máxima en Hora Pico.\n2. Motor de cálculo determinista:\n   - Tokens mensuales de entrada, salida y tokens ahorrados gracias a caché de contexto.\n   - Comparativa de 3 escenarios de arquitectura:\n     a) Modelo Profundo para el 100 % del tráfico.\n     b) Modelo Rápido para el 100 % del tráfico.\n     c) Enrutamiento Híbrido 80/20 (80 % al modelo rápido, 20 % al modelo profundo + 75 % de Context Caching).\n   - Ahorro económico mensual y memoria RAM estimada para los contenedores de orquestación.\n3. Gráfico SVG interactivo comparando el costo total mensual entre los 3 enfoques.',
      studyTopic: 'FinOps para IA en Producción, Enrutamiento Híbrido de Modelos y Context Caching',
      studyExplanation: 'El 80 % de las peticiones en producción no requieren modelos de razonamiento profundo. Enrutar el tráfico rutinario a modelos livianos y aprovechar Context Caching para prompts de sistema reduce los costos hasta en un 70 %.',
      studyKeyPoints: [
        'Enrutamiento Híbrido (Model Routing): Dirige tareas según complejidad para optimizar costos y latencia.',
        'Context Caching: Almacena en memoria representaciones fijas (KV-cache) reduciendo costo de lectura.',
        'FinOps para IA: Cuantificar costo por llamada antes de desplegar agentes autónomos a escala.'
      ],
      parallelStudyPrompt: 'Explícame qué es el Context Caching en APIs de LLM, cómo reduce los costos de entrada y cómo funciona un clasificador de complejidad para enrutar el 80 % del tráfico al modelo liviano.',
      refinementPrompt: 'Añade un cálculo de Latencia Estimada al Primer Token (TTFT) y Throughput (Tokens por Segundo) promedio para cada escenario, mostrando el impacto en la experiencia del usuario final.',
      stepByStepGuide: [
        'Modela los costos de inferencia con volúmenes realistas antes de poner agentes en producción.',
        'Aprovecha el caché de contexto para prompts de sistema y documentos de referencia extensos.',
        'Reserva modelos pesados con razonamiento extendido exclusivamente para tareas complejas.'
      ],
      antigravityBridge: 'En Antigravity IDE: integra estos parámetros en GEMINI.md para guiar a los agentes en el uso eficiente de cuotas y prevenir errores de límite de tasa (HTTP 429).'
    },
    {
      id: 16, level: 4, levelName: 'Nivel 4: Maestría Extrema',
      title: 'Detector de Dependencias Circulares y Métricas de Acoplamiento (Software Architecture Analyzer)',
      duration: '4.5 min de espera / lectura', complexity: 'Extremo',
      goal: 'Construir una herramienta visual e interactiva que analice grafos de importación entre módulos de software, calcule métricas de acoplamiento de Robert C. Martin (Ca, Ce, Inestabilidad I) y detecte ciclos prohibidos que violen la arquitectura limpia.',
      initialPrompt: 'Actúa como Arquitecto de Software Principal e Ingeniero de Análisis Estático.\nConstruye una herramienta web interactiva para analizar dependencias de código y verificar la modularidad de un sistema de software.\n\n[FUNCIONALIDADES]\n1. Editor de matriz de importaciones (módulo origen -> módulo destino) y botón para precargar 3 arquitecturas modelo: Modular Limpia (Capas desacopladas), Espagueti con Ciclos y Hub Centralizado.\n2. Motor de cálculo determinista de métricas de acoplamiento de Robert C. Martin:\n   - Acoplamiento Aferente (Ca): Módulos externos que dependen de este módulo (Responsabilidad).\n   - Acoplamiento Eferente (Ce): Módulos de los cuales depende este módulo (Inestabilidad).\n   - Factor de Inestabilidad: I = Ce / (Ca + Ce), donde 0 es totalmente estable y 1 es totalmente inestable.\n3. Algoritmo de detección de ciclos de importación (búsqueda en profundidad DFS de componentes fuertemente conexos) con alerta roja sobre dependencias circulares.\n4. Visualización del grafo modular interactivo en SVG con código de colores según el factor I.',
      studyTopic: 'Principio de Dependencias Estables (SDP), Métricas de Acoplamiento de Martin y Detección de Ciclos',
      studyExplanation: 'Las dependencias entre módulos deben apuntar en la dirección de la estabilidad. Un módulo con alta inestabilidad no debe ser punto de partida de componentes críticos, y los ciclos circulares bloquean empaquetadores y pruebas aisladas.',
      studyKeyPoints: [
        'Acoplamiento Aferente (Ca): Cantidad de clases o módulos externos que dependen del componente evaluado.',
        'Acoplamiento Eferente (Ce): Cantidad de componentes externos de los que depende el módulo en estudio.',
        'Métrica de Inestabilidad (I): Rango de 0 (máxima estabilidad y responsabilidad) a 1 (máxima inestabilidad).'
      ],
      parallelStudyPrompt: 'Explícame qué es el Acoplamiento Eferente (Ce) y Aferente (Ca), por qué los módulos estables deben ser abstractos y cómo una dependencia circular rompe los empaquetadores de código.',
      refinementPrompt: 'Añade una función de refactorización automática sugerida que proponga la creación de una interfaz intermedia (Inversión de Dependencias DIP) para romper el ciclo detectado y recalcular las métricas instantáneamente.',
      stepByStepGuide: [
        'Asegura que el flujo de dependencias apunte siempre hacia módulos estables y declarativos.',
        'Prohíbe terminantemente ciclos circulares en el grafo de componentes de la arquitectura.',
        'Mantén la cohesión interna y limita el tamaño de los módulos a menos de 250 líneas físicas.'
      ],
      antigravityBridge: 'En Antigravity IDE: ejecuta Test-DevBrainModularity.ps1 en tu terminal local para comprobar que ningún archivo exceda el límite modular de 250 líneas y que no existan referencias circulares en js/core/.'
    },
    {
      id: 17, level: 4, levelName: 'Nivel 4: Maestría Extrema',
      title: 'Extractor y Validador Bidireccional de Contratos de API (OpenAPI 3.1 ↔ TypeScript DTOs & Zod)',
      duration: '4.5 min de espera / lectura', complexity: 'Extremo',
      goal: 'Construir una herramienta en el navegador que tome cargas útiles (payloads) JSON o especificaciones OpenAPI 3.1, infiera contratos tipados de TypeScript, genere esquemas de validación Zod y detecte discrepancias de tipos al instante.',
      initialPrompt: 'Actúa como Staff API Architect y Especialista en TypeScript Avanzado.\nConstruye una herramienta web autocontenida de ingeniería de contratos de API (OpenAPI 3.1 ↔ TypeScript ↔ Zod) en el navegador.\n\n[FUNCIONALIDADES]\n1. Panel de doble entrada: Carga de JSON crudo de ejemplo o especificación YAML/JSON de OpenAPI 3.1.\n2. Motor de inferencia y generación determinista de contratos:\n   - Inferencia de tipos de datos primitivos (string, number, boolean, null, arrays y objetos anidados).\n   - Detección de campos opcionales vs. obligatorios.\n   - Generación automática de Interfaces TypeScript fuertemente tipadas (usando readonly para inmutabilidad).\n   - Generación de esquemas de validación en tiempo de ejecución compatibles con Zod (z.object({...})).\n3. Validador en vivo: Un editor secundario donde el usuario ingresa un payload y el sistema resalta en rojo cualquier campo faltante o discrepancia de tipo.',
      studyTopic: 'Diseño de APIs First-Class (API-First), Tipado Estricto en TypeScript y Validación en Runtime con Zod',
      studyExplanation: 'Los tipos estáticos de TypeScript desaparecen tras la compilación (Type Erasure). Validar datos en el límite de la aplicación con esquemas en tiempo de ejecución (Zod) garantiza que peticiones maliciosas o corruptas sean rechazadas.',
      studyKeyPoints: [
        'Type Erasure: Los tipos estáticos de TypeScript no protegen la aplicación durante la ejecución.',
        'Esquemas en Tiempo de Ejecución (Zod): Validan que las cargas útiles HTTP coincidan con el contrato.',
        'Diseño Contract-First: Definir primero las interfaces y contratos antes de codificar endpoints o clientes.'
      ],
      parallelStudyPrompt: 'Explícame por qué los tipos de TypeScript desaparecen en tiempo de ejecución (Type Erasure) y por qué herramientas como Zod son necesarias para validar datos que llegan de la red.',
      refinementPrompt: 'Añade soporte para enumeraciones automáticas cuando un campo string tome solo 2 o 3 valores constantes (ej. "PENDIENTE", "PAGADO", "ANULADO") y exportación del contrato en formato .d.ts.',
      stepByStepGuide: [
        'Valida siempre las cargas útiles externas en la frontera del sistema con validadores de runtime.',
        'Establece contratos formales antes de iniciar la implementación del backend o el frontend.',
        'Mantén sincronizadas las interfaces de TypeScript con los esquemas de validación en ejecución.'
      ],
      antigravityBridge: 'En Antigravity IDE: utiliza los contratos generados para alimentar tus archivos de pruebas en tests/ y asegurar que las respuestas simuladas cumplan exactamente el contrato OpenAPI.'
    },
    {
      id: 18, level: 4, levelName: 'Nivel 4: Maestría Extrema',
      title: 'Simulador del Algoritmo de Consenso Distribuido Raft y Tolerancia a Particiones',
      duration: '5 min de espera / lectura', complexity: 'Extremo',
      goal: 'Construir un simulador interactivo donde 5 nodos distribuidos eligen un líder por mayoría, replican entradas de registro inmutables y previenen el problema de cerebro dividido (Split-Brain) ante particiones de red.',
      initialPrompt: 'Actúa como Investigador en Sistemas Distribuidos y Algoritmos de Consenso.\nConstruye un Simulador Visual e Interactivo del Algoritmo de Consenso Raft con un anillo de 5 nodos (S1 a S5) en una aplicación web autocontenida.\n\n[ARQUITECTURA]\n1. Panel por nodo mostrando: Rol (Follower, Candidate, Leader), Mandato Actual (Term), Registro de Entradas (Uncommitted vs. Committed) y Temporizador de Elección con cuenta regresiva aleatoria (150 a 300 ms).\n2. Botón para enviar un comando al Líder activo y visualizar cómo se replica en los seguidores hasta confirmar por quórum mayoritario ((N/2) + 1 = 3 de 5 nodos).\n3. Controles de inyección de fallos:\n   - Botón para apagar el líder actual y observar la elección automática del nuevo líder.\n   - Botón de Partición de Red (aislar 3 nodos de 2 nodos) demostrando que el subgrupo minoritario de 2 no puede alcanzar quórum y bloquea escrituras para evitar Split-Brain.\n4. Botón "Sanar Red" que muestre la reconciliación del registro hacia el líder con mandato superior.',
      studyTopic: 'Algoritmo de Consenso Raft, Quórum Mayoritario, Mandatos y Prevención de Split-Brain',
      studyExplanation: 'En un clúster distribuido de 5 servidores, cualquier decisión de escritura exige al menos 3 votos favorables (quórum mayoritario). Si la red se fragmenta, el subgrupo mayoritario mantiene la disponibilidad y el minoritario bloquea escrituras.',
      studyKeyPoints: [
        'Quórum Mayoritario ((N/2) + 1): 3 de 5 nodos deben confirmar antes de marcar una entrada como confirmada.',
        'Temporizadores de Elección Aleatorios: Evitan empates persistentes al dispersar las postulaciones.',
        'Prevención de Split-Brain: La partición minoritaria no puede confirmar comandos sin quórum.'
      ],
      parallelStudyPrompt: 'Explícame por qué los tiempos de elección en Raft deben ser aleatorios, qué es el quórum mayoritario y qué ocurriría en una base de datos distribuida si permitiera dos líderes simultáneos.',
      refinementPrompt: 'Incorpora una bitácora de eventos cronológica que registre en tiempo real cada mensaje RequestVote y AppendEntries con su número de mandato y estado de confirmación.',
      stepByStepGuide: [
        'La mayoría matemática estricta es la única garantía contra inconsistencias en sistemas distribuidos.',
        'Los temporizadores aleatorios evitan empates infinitos entre candidatos concurrentes.',
        'Al reconectar particiones de red, el mandato más alto prevalece para reconciliar los registros.'
      ],
      antigravityBridge: 'En Antigravity IDE: extrae la máquina de estados de Raft a un módulo puro en js/core/raft-state.js y escribe pruebas unitarias deterministas que verifiquen las transiciones sin depender de la interfaz gráfica.'
    },
    {
      id: 19, level: 4, levelName: 'Nivel 4: Maestría Extrema',
      title: 'Motor de Consultas Mini-SQL en el Navegador: Lexer, Parser AST y Ejecutor Relacional',
      duration: '5 min de espera / lectura', complexity: 'Extremo',
      goal: 'Construir un intérprete de consultas SQL en memoria que haga visible las 3 fases del pipeline de compilación: análisis léxico (Tokens), análisis sintáctico (Árbol AST) y ejecución sobre tablas relacionales.',
      initialPrompt: 'Actúa como Ingeniero Principal de Compiladores y Motores de Base de Datos.\nConstruye un Mini-Motor de Consultas SQL e Inspector de Compilación en una aplicación web interactiva autocontenida sin librerías externas.\n\n[ARQUITECTURA DEL MOTOR]\n1. Dos tablas relacionales precargadas en memoria (aprendices y fichas_adso).\n2. Editor de consultas SQL con soporte determinista para: SELECT, FROM, WHERE (=, >, <, !=, AND, OR), ORDER BY (ASC, DESC) y LIMIT.\n3. Panel de inspección en 3 pestañas sincronizadas:\n   - Pestaña 1 · Lexer: Muestra el arreglo de tokens identificados (KEYWORD, IDENTIFIER, LITERAL, OPERATOR).\n   - Pestaña 2 · Parser AST: Visualiza el Árbol de Sintaxis Abstracta en formato JSON estructurado.\n   - Pestaña 3 · Ejecutor: Muestra las filas escaneadas y la tabla HTML final resultante.\n4. Manejo de errores sintácticos con indicación visual del token o columna donde falló la consulta.',
      studyTopic: 'Pipeline de Compiladores: Análisis Léxico, Análisis Sintáctico (AST) y Álgebra Relacional',
      studyExplanation: 'Cualquier motor de base de datos divide el procesamiento en tres fases limpias: convertir caracteres en tokens, construir el Árbol de Sintaxis Abstracta (AST) para validar la gramática, y ejecutar el plan sobre los registros en memoria.',
      studyKeyPoints: [
        'Fase Léxica (Lexer): Agrupa secuencias de caracteres en unidades atómicas tipadas (Tokens).',
        'Fase Sintáctica (Parser): Valida la estructura gramatical y genera el Árbol de Sintaxis Abstracta (AST).',
        'Fase de Ejecución: Aplica operadores relacionales de selección (WHERE), ordenamiento y proyección.'
      ],
      parallelStudyPrompt: 'Explícame la diferencia entre un Lexer y un Parser sintáctico, cómo se construye un AST a partir de tokens y cómo se traduce la cláusula WHERE a una función de filtrado en memoria.',
      refinementPrompt: 'Añade soporte para la función de agregación COUNT(*) y soporte básico para INNER JOIN entre las dos tablas basándose en la clave foránea ficha_id.',
      stepByStepGuide: [
        'Separa estrictamente las 3 etapas del pipeline: análisis léxico, parseo sintáctico y ejecución.',
        'Valida la gramática en el parser antes de evaluar los registros de datos en memoria.',
        'Emite mensajes de error precisos señalando el token y la posición exacta donde falló la consulta.'
      ],
      antigravityBridge: 'En Antigravity IDE: divide este motor en tres archivos modulares (lexer.js, parser.js, executor.js) respetando el límite de 250 líneas y alcanzando el 100 % de cobertura de funciones en tests/.'
    },
    {
      id: 20, level: 4, levelName: 'Nivel 4: Maestría Extrema',
      title: 'Proyecto Cumbre Canvas: Centro de Comando de Ingeniería de IA y Orquestador de Prompts',
      duration: '5 min de espera / lectura', complexity: 'Maestría Total',
      goal: 'Construir una plataforma integral de ingeniería de IA que combine: simulador de costos con Context Caching y enrutamiento híbrido, evaluador automático de System Prompts contra rúbrica de 6 criterios y dimensionador de pipelines RAG.',
      initialPrompt: 'Actúa como Distinguished AI Systems Architect y Lead AI Engineer.\nConstruye el AI Engineering Command Center: una plataforma web interactiva autocontenida que integra 3 herramientas críticas de producción con IA:\n\n[MÓDULOS DE LA PLATAFORMA]\n1. Módulo 1 · Calculadora de Enrutamiento y FinOps: Modela el ahorro de un esquema Híbrido 80/20 (80 % modelo rápido, 20 % modelo profundo) sumado a un 80 % de acierto en Context Caching frente a inferencia monolítica.\n2. Módulo 2 · Evaluador Automático de System Prompts: Analiza un prompt ingresado y lo califica sobre 100 puntos evaluando 6 criterios: Rol Experto, Delimitadores Estrictos, Esquema de Salida, Restricciones Negativas, Casos Borde y Aislamiento contra Prompt Injection.\n3. Módulo 3 · Dimensionador de Pipeline RAG: Calcula el número de fragmentos (chunks), solapamiento (overlap) y memoria vectorial requerida según el volumen de documentos y tamaño de contexto.\n4. Botón para exportar el dictamen de arquitectura consolidado en JSON y Markdown.',
      studyTopic: 'Ingeniería de IA en Producción, Enrutamiento Híbrido, Context Caching, Rúbricas de Calidad de Prompts y Arquitectura RAG',
      studyExplanation: 'En entornos empresariales, el diseño de soluciones con IA exige combinar tres pilares: optimización de costos y latencia mediante enrutamiento inteligente, blindaje defensivo de prompts de sistema y dimensionamiento técnico de índices vectoriales.',
      studyKeyPoints: [
        'Enrutamiento Híbrido 80/20: Optimiza costos dirigiendo consultas estándar a modelos de baja latencia.',
        'Context Caching: Reduce costos de entrada almacenando prefijos de instrucciones reutilizables.',
        'Blindaje de System Prompts: Delimitadores estrictos y validación de casos borde contra inyecciones.'
      ],
      parallelStudyPrompt: 'Explícame cómo prevenir ataques de inyección indirecta de prompts en sistemas RAG y cómo dimensionar el tamaño de fragmentos (chunk size) para no diluir la atención del modelo.',
      refinementPrompt: 'Añade en el Módulo 2 un simulador de ciberseguridad con 3 vectores de inyección de prompts típicos (jailbreak, sobrescritura de instrucciones y exfiltración de contexto) para auditar la resistencia del prompt evaluado.',
      stepByStepGuide: [
        'Audita y califica los prompts de sistema con rúbricas cuantitativas y criterios objetivos.',
        'Aísla siempre los datos externos no confiables empleando delimitadores semánticos claros.',
        'Integra la economía de tokens y el dimensionamiento de recursos desde el inicio del proyecto.'
      ],
      antigravityBridge: 'En Antigravity IDE: este ejercicio cumbre se conecta directamente con el Laboratorio de Prompts (laboratorio-prompts.html), la memoria persistente GEMINI.md y la arquitectura multipágina offline-first de este portal.'
    }
  ];

  return { CANVAS_EXERCISES_N3_N4 };
});
