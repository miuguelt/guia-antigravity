/* Archivo generado por Publish-GuideEvidenceRegistry.ps1. No editar a mano.
 *
 * Fuente única: deliverables.registry.json, en la raíz de esta guía. Esta copia
 * existe solo para que las estaciones de evidencia funcionen cuando la guía se
 * abre con file:// desde un USB, donde fetch está bloqueado. Si editas el JSON,
 * vuelve a ejecutar el script; el validador reporta la deriva.
 */
window.DevBrainRegistroEntregables = {
  "version": "2.4.0",
  "standard": "devbrain.educational-guide",
  "guideId": "adso-guia-gemini-antigravity-2026",
  "status": "active",
  "sourceStatus": "Alineado con el programa Tecnólogo en Análisis y Desarrollo de Software (ADSO - 228118), CGAO Subsede Vélez, Regional Santander. Nota pedagógica: todos los conjuntos de datos y casos de práctica fueron diseñados con fines académicos y no contienen datos personales reales.",
  "portfolioTemplate": "docs/evidencias-template.md",
  "submission": {
    "packageName": "EV-GUIA-GEMINI-ANTIGRAVITY-2026",
    "namingRule": "EV-GUIA-GEMINI-ANTIGRAVITY-<ficha>-<apellido><nombre>.zip",
    "format": "Paquete Markdown/JSON exportado desde el Portafolio de Evidencias o impreso en formato PDF tamaño carta institucional.",
    "where": "Plataforma LMS institucional indicada por el Instructor Técnico Líder.",
    "whatIsGraded": "Exactitud de los Casos Testigo calculados, uso correcto de comandos de Antigravity (/plan, @archivo, /browser, GEMINI.md, Skills) y trazabilidad de auditoría.",
    "approval": [
      "Las 5 estaciones de evidencia (MG-A01 a MG-A05) están completas con sus listas de autochequeo marcadas.",
      "Cada entrega incluye el cálculo del Caso Testigo contrastado contra el resultado real del agente.",
      "La bitácora de uso de IA y los límites de verificación están documentados con honestidad técnica."
    ],
    "competencyMap": [
      {
        "evidenceType": "conocimiento",
        "artifacts": [
          "MG-A01"
        ],
        "criterion": "Comprende y aplica el flujo de trabajo de Google Antigravity (/plan, @archivo, /browser, GEMINI.md), la norma ISO-8601, la separación de un dato por casilla al pasar notas a tablas y el cálculo de Punto de Equilibrio.",
        "instrument": "Lista de chequeo técnica de fundamentos (MG-A01)",
        "learningResult": "RAP-01"
      },
      {
        "evidenceType": "desempeño",
        "artifacts": [
          "MG-A02",
          "MG-A03",
          "MG-A04"
        ],
        "criterion": "Diseña, construye y audita herramientas de negocio (Pricing, ROP, NPS, Cierres Poka-Yoke), sistemas relacionales (CRM, Conciliación), Skills y flujos multi-agente / MCP.",
        "instrument": "Rúbrica de desempeño técnico y validación con Caso Testigo",
        "learningResult": "RAP-01"
      },
      {
        "evidenceType": "producto",
        "artifacts": [
          "MG-A05"
        ],
        "criterion": "Entrega la Suite Operativa Integral (ERP) sincronizada de extremo a extremo con memoria persistente Multi-IDE y pruebas verificadas en /browser.",
        "instrument": "Rúbrica de producto integrador y Portafolio de Evidencias",
        "learningResult": "RAP-02"
      }
    ]
  },
  "artifacts": [
    {
      "id": "MG-A01",
      "code": "AG-NIVEL-1",
      "name": "Estación 1 · Fundamentos de Antigravity, Notas Convertidas en Tablas y Punto de Equilibrio (Ejercicios 1 al 5)",
      "purpose": "Evidenciar el dominio de los cimientos de Google Antigravity: creación de proyectos en Agent Manager, revisión de Implementation Plans con /plan, lectura de archivos reales con @archivo, pruebas automáticas con /browser y configuración de memoria permanente en GEMINI.md.",
      "inputs": [
        "Ejercicios 1 al 5 de la Ruta Antigravity (ruta-antigravity.html)",
        "Kits Semilla descargables: notas_crudas_pedidos.txt y contactos_triples.csv",
        "Simulador de Caso Testigo de Punto de Equilibrio y Unión de Contactos Repetidos"
      ],
      "instructions": "Completa los ejercicios del Nivel 1 (1 al 5), verifica tus cálculos en el simulador de Caso Testigo y registra aquí la taxonomía ISO-8601 aplicada, el resultado de tu auditoría de Punto de Equilibrio en /browser y las reglas base de tu archivo GEMINI.md.",
      "example": "Taxonomía ISO-8601: 2026-11-01_Finanzas_ProveedorX_Pagado.pdf. Caso Testigo Ej. 3: Costos Fijos = $3.000, Costo Variable = $20, Precio = $50 -> Margen de Contribución = $30/ud -> Punto de Equilibrio = 100 unidades (confirmado con captura en el Walkthrough de /browser).",
      "station": {
        "sectionId": "m01-fundamentos",
        "order": 1,
        "phase": "reflexion",
        "minutes": 45
      },
      "evidenceType": "conocimiento",
      "fields": [
        {
          "key": "taxonomia_y_normalizacion",
          "label": "1. Regla ISO-8601 y notas convertidas en tabla, un dato por casilla (Ejercicios 1 y 2)",
          "type": "area",
          "placeholder": "Escribe tus 4 categorías documentales en formato AAAA-MM-DD y cómo separaste en columnas, un dato por casilla, los pedidos de @notas_crudas_pedidos.txt...",
          "hint": "Explica qué Dato_Faltante detectó el agente en los pedidos desordenados."
        },
        {
          "key": "auditoria_punto_equilibrio",
          "label": "2. Caso Testigo del Punto de Equilibrio y prueba en /browser (Ejercicio 3)",
          "type": "area",
          "placeholder": "Detalla tu cálculo manual de Margen de Contribución y Punto de Equilibrio y cómo coincidió con la prueba automática de /browser...",
          "hint": "Incluye las unidades requeridas para alcanzar la meta de utilidad neta."
        },
        {
          "key": "reglas_gemini_md",
          "label": "3. Reglas permanentes en GEMINI.md y Deduplicación (Ejercicios 4 y 5)",
          "type": "area",
          "placeholder": "Resume las reglas que dejaste en GEMINI.md (estructura SCQA) y la regla que usaste para decidir qué dato conservar al unir contactos repetidos...",
          "hint": "Indica cómo evitaste reemplazar un campo lleno por uno vacío al consolidar CSVs."
        }
      ],
      "checklist": [
        "Verifiqué que los nombres de archivo sigan estrictamente el patrón AAAA-MM-DD para garantizar orden cronológico real.",
        "Comprobé en papel y en el simulador que el Punto de Equilibrio es Costos Fijos / (Precio - Costo Variable) y lo validé con /browser.",
        "Configuré GEMINI.md en la raíz del proyecto y uní los contactos repetidos conservando el dato más completo y reciente, sin perder información."
      ],
      "criterion": "El aprendiz demuestra dominio operativo de /plan, @archivo, /browser y GEMINI.md, respaldado por cálculos exactos de su Caso Testigo.",
      "instrument": "Lista de chequeo técnica de fundamentos (MG-A01)",
      "evidence": "docs/01-fundamentos.md",
      "nextStep": "Avanza a la Estación 2 (Nivel 2: Herramientas de Negocio) para dominar cotizadores, inventarios ROP, NPS y tareas programadas con /schedule.",
      "aiAssist": {
        "prompt": "/plan Revisa mi evidencia de Nivel 1 y verifica que la fórmula de Punto de Equilibrio y la regla de un dato por casilla esté explicada con precisión sin inventar resultados.",
        "verify": "Contrasta que el Margen de Contribución sea (Precio - Costo Variable) y que cada casilla de la tabla contenga un solo dato.",
        "log": "Verificación de fundamentos Nivel 1 registrada en la bitácora del aprendiz."
      },
      "upload": {
        "fileName": "01-fundamentos.md",
        "format": "markdown"
      }
    },
    {
      "id": "MG-A02",
      "code": "AG-NIVEL-2",
      "name": "Estación 2 · Herramientas de Negocio: Pricing, ROP, NPS y /schedule (Ejercicios 6 al 10)",
      "purpose": "Demostrar la capacidad de traducir reglas operativas de negocio (márgenes comerciales, reabastecimiento logístico, satisfacción del cliente y cierres contables) en aplicaciones locales autoverificadas.",
      "inputs": [
        "Ejercicios 6 al 10 de la Ruta Antigravity (ruta-antigravity.html)",
        "Kits Semilla: catalogo_productos.csv, inventario_bodega.csv y encuestas_trimestre.csv",
        "Simuladores de Margen Bruto vs Markup, ROP y NPS"
      ],
      "instructions": "Ejecuta los ejercicios del Nivel 2 (6 al 10), valida sus Casos Testigo en el simulador y documenta la diferencia matemática entre Markup y Gross Margin, el cálculo de Punto de Reorden (ROP), el puntaje NPS y la validación Poka-Yoke de cierre semanal.",
      "example": "Ejercicio 6: Costo $100, Precio $130 -> Markup = 30%, pero Margen Bruto Real = ($130-$100)/$130 = 23.08%. Ejercicio 8: Venta normal 10/día, máx 14/día, entrega 5 días -> Stock Seguridad = 20, ROP = 70 unidades.",
      "station": {
        "sectionId": "m02-diseno",
        "order": 2,
        "phase": "contextualizacion",
        "minutes": 60
      },
      "evidenceType": "desempeño",
      "fields": [
        {
          "key": "pricing_y_matriz",
          "label": "1. Auditoría de Margen Bruto vs. Recargo y Matriz Ponderada (Ejercicios 6 y 7)",
          "type": "area",
          "placeholder": "Explica con tu Caso Testigo por qué un recargo del 30% no permite dar un descuento del 25% y cómo normalizaste criterios inversos en el comparador...",
          "hint": "Incluye los umbrales del semáforo de rentabilidad (Verde >=35%, Ámbar 25%-34.9%, Rojo <25%)."
        },
        {
          "key": "inventario_rop_y_nps",
          "label": "2. Cálculo de Punto de Reorden (ROP), Stock de Seguridad y NPS (Ejercicios 8 y 9)",
          "type": "area",
          "placeholder": "Registra el cálculo paso a paso del Stock de Seguridad, el ROP y el resultado del Net Promoter Score (% Promotores - % Detractores)...",
          "hint": "Explica por qué los clientes con calificación 7 y 8 (Pasivos) cuentan en el denominador pero no suman al NPS."
        },
        {
          "key": "cierre_poka_yoke",
          "label": "3. Automatización con /schedule, Control Poka-Yoke e Idempotencia (Ejercicio 10)",
          "type": "area",
          "placeholder": "Describe la llave única de período (ej. 2026-W44) y la regla de cuadre cruzado que impide cerrar la semana con descuadres o registros duplicados...",
          "hint": "Detalla qué ocurre cuando se intenta ejecutar dos veces el cierre de la misma semana."
        }
      ],
      "checklist": [
        "Comprobé que el cotizador calcula el Margen Bruto sobre el Precio Neto de Venta y oculta los costos internos en la vista de cliente.",
        "Verifiqué la fórmula ROP = (Venta Promedio × Tiempo de Entrega) + Stock de Seguridad y la clasificación ABC de Pareto.",
        "Validé que el control de cierres aplica una llave de idempotencia semanal y bloquea descuadres mayores a $1."
      ],
      "criterion": "Las herramientas de negocio creadas aplican las fórmulas financieras y logísticas exactas sin distorsiones y superan la verificación en /browser.",
      "instrument": "Rúbrica de validación de reglas de negocio y /browser (MG-A02)",
      "evidence": "docs/02-diseno.md",
      "nextStep": "Avanza a la Estación 3 (Nivel 3: Sistemas y Skills) para construir bases de datos relacionales, flujos de tesorería y habilidades reutilizables.",
      "aiAssist": {
        "prompt": "/plan Verifica que mis cálculos de Margen Bruto, Punto de Reorden (ROP), NPS e Idempotencia cumplan las fórmulas canónicas del Nivel 2.",
        "verify": "Comprueba que Gross Margin divida entre el Precio Neto (nunca entre el Costo) y que el Stock de Seguridad multiplique la variación máxima de demanda por el Lead Time.",
        "log": "Auditoría de herramientas de negocio Nivel 2 registrada."
      },
      "upload": {
        "fileName": "02-diseno.md",
        "format": "markdown"
      }
    },
    {
      "id": "MG-A03",
      "code": "AG-NIVEL-3",
      "name": "Estación 3 · Sistemas Relacionales, Skills (.agents/skills/) y Conciliación (Ejercicios 11 al 15)",
      "purpose": "Construir sistemas multi-entidad conectados por llaves primarias y foráneas, empaquetar Procedimientos Operativos Estándar en Skills de Antigravity y automatizar cruces contables con tolerancia.",
      "inputs": [
        "Ejercicios 11 al 15 de la Ruta Antigravity (ruta-antigravity.html)",
        "Kits Semilla: crm_datos_iniciales.json, gastos_mes_actual.csv, libro_ventas_interno.csv y extracto_bancario_mes.csv",
        "Plantilla oficial de .agents/skills/auditoria-gastos/SKILL.md"
      ],
      "instructions": "Desarrolla y audita los ejercicios del Nivel 3 (11 al 15). Documenta el modelo relacional del CRM y su Pipeline Ponderado, la estructura de tu SKILL.md para detectar fraccionamiento de gastos, el desfase entre Utilidad y Caja Real, y el resultado del Acta de Conciliación Bancaria.",
      "example": "Ejercicio 12 (Skill): Detecta Split Transactions agrupando por (Empleado + Fecha + Comercio) cuando hay >=2 recibos que suman >$200 USD. Ejercicio 15: Venta #101 de $200 el 10/Oct emparejada con abono de $192 el 12/Oct (+2 días, comisión 4% = $8).",
      "station": {
        "sectionId": "m03-implementacion",
        "order": 3,
        "phase": "apropiacion",
        "minutes": 75
      },
      "evidenceType": "desempeño",
      "fields": [
        {
          "key": "crm_relacional_y_tesoreria",
          "label": "1. Arquitectura Relacional del CRM y Desfase Utilidad vs. Caja (Ejercicios 11 y 13)",
          "type": "area",
          "placeholder": "Explica cómo se conectan Empresas -> Oportunidades -> Actividades mediante llaves, el cálculo del Pipeline Ponderado y por qué vender a 60 días puede generar saldo bancario negativo...",
          "hint": "Incluye el resultado del Caso Testigo de tesorería en el Mes 2 (-$30.000 en banco a pesar de tener utilidad contable)."
        },
        {
          "key": "skill_auditoria_gastos",
          "label": "2. Empaquetado de Habilidad en .agents/skills/auditoria-gastos/SKILL.md (Ejercicio 12)",
          "type": "area",
          "placeholder": "Copia la descripción y las reglas de detección de anomalías (incluyendo Fraccionamiento / Split Transactions) de tu SKILL.md...",
          "hint": "Indica cuántos recibos fraccionados o de fin de semana detectó la Skill sobre @gastos_mes_actual.csv."
        },
        {
          "key": "conciliacion_y_evaluacion",
          "label": "3. Conciliación Bancaria Tolerante en 3 Pasadas y Evaluador por Escenarios (Ejercicios 14 y 15)",
          "type": "area",
          "placeholder": "Documenta los emparejamientos por ventana de tolerancia (±4 días y % de comisión de pasarela) y las partidas conciliatorias encontradas...",
          "hint": "Verifica que Saldo según Libros + Abonos no registrados - Ventas en tránsito - Comisiones = Saldo Extracto Bancario."
        }
      ],
      "checklist": [
        "Verifiqué la integridad referencial entre Empresas, Oportunidades y Seguimientos y el cálculo del Valor Ponderado del embudo.",
        "Creé el archivo .agents/skills/auditoria-gastos/SKILL.md con su descripción y sus reglas, y detecté los casos de fraccionamiento de compras.",
        "Comprobé que el motor de conciliación bancaria cuadra al centavo las ventas con descuento de comisión de pasarela y las partidas en tránsito."
      ],
      "criterion": "El aprendiz implementa arquitecturas relacionales locales, empaqueta Skills reutilizables bajo el estándar de Antigravity y concilia fuentes dispares con precisión.",
      "instrument": "Rúbrica de validación de sistemas y Skills (MG-A03)",
      "evidence": "docs/03-implementacion.md",
      "nextStep": "Avanza a la Estación 4 (Nivel 4: Orquestación Multi-Agente, MCP y Simulación Estocástica).",
      "aiAssist": {
        "prompt": "/plan Audita mi definición de SKILL.md y mi algoritmo de conciliación bancaria en 3 pasadas para confirmar que cubren todos los casos borde.",
        "verify": "Confirma que la ventana de tolerancia evalúe tanto el rango de días [T, T+4] como la fórmula Neto = Bruto * (1 - %Comisión).",
        "log": "Implementación de Sistemas y Skills Nivel 3 registrada."
      },
      "upload": {
        "fileName": "03-implementacion.md",
        "format": "markdown"
      }
    },
    {
      "id": "MG-A04",
      "code": "AG-NIVEL-4",
      "name": "Estación 4 · Orquestación Multi-Agente, Gobernanza MCP, Turnos y Monte Carlo (Ejercicios 16 al 19)",
      "purpose": "Dominar las capacidades avanzadas de ingeniería y dirección en Google Antigravity: coordinación de subagentes en paralelo mediante contratos de datos, seguridad en conectores MCP, optimización combinatoria de turnos y simulación de riesgos por Método de Monte Carlo.",
      "inputs": [
        "Ejercicios 16 al 19 de la Ruta Antigravity (ruta-antigravity.html)",
        "Kits Semilla: esquema_evento.json, plantilla_turnos_personal.csv y etapas_proyecto_pert.csv",
        "Simuladores de Contratos Multi-Agente, Matriz MCP, Restricciones de Turnos y Estimación PERT / Monte Carlo"
      ],
      "instructions": "Realiza los ejercicios 16 al 19 y documenta el Contrato de Datos compartido que evita colisiones entre agentes paralelos, la matriz de permisos MCP (Principio de Menor Privilegio y Human-in-the-Loop), la separación de Restricciones Duras vs. Blandas en turnos y los percentiles P50/P80/P90 de tu simulación de Monte Carlo.",
      "example": "Ejercicio 19 (PERT / Monte Carlo): Etapa Permisos (Optimista=5, Probable=8, Pesimista=20) -> Esperanza PERT = (5 + 32 + 20)/6 = 9.5 días. El percentil P85 protege el cronograma frente a la asimetría del riesgo.",
      "station": {
        "sectionId": "m04-validacion",
        "order": 4,
        "phase": "apropiacion",
        "minutes": 75
      },
      "evidenceType": "desempeño",
      "fields": [
        {
          "key": "orquestacion_y_contratos",
          "label": "1. Contrato de Datos y Fronteras de Archivos para Agentes en Paralelo (Ejercicio 16)",
          "type": "area",
          "placeholder": "Define las llaves compartidas en esquema_evento.json y cómo dividiste el alcance entre los 3 subsistemas (Registro, Agenda, Finanzas) sin que dos agentes editen el mismo archivo...",
          "hint": "Explica cómo se dispara la alerta cuando Inscritos > Capacidad_Salon."
        },
        {
          "key": "gobernanza_mcp",
          "label": "2. Matriz de Seguridad MCP y Control Human-in-the-Loop (Ejercicio 17)",
          "type": "area",
          "placeholder": "Clasifica las operaciones en Nivel Verde (Solo Lectura), Nivel Ámbar (Borrador + Aprobación Humana) y Nivel Rojo (Bloqueado / Doble Firma)...",
          "hint": "Describe qué campos guarda el Registro de Auditoría Inmutable (Audit Log)."
        },
        {
          "key": "optimizacion_y_montecarlo",
          "label": "3. Restricciones Duras/Blandas en Turnos y Simulación PERT / Monte Carlo (Ejercicios 18 y 19)",
          "type": "area",
          "placeholder": "Lista las Restricciones Duras innegociables del optimizador de turnos y compara la suma ingenua de un proyecto frente al percentil P85/P90 de las 5.000 simulaciones...",
          "hint": "Incluye tu cálculo manual PERT = (Optimista + 4×Probable + Pesimista) / 6."
        }
      ],
      "checklist": [
        "Definí un contrato JSON compartido antes de lanzar tareas paralelas en el Agent Manager para garantizar cero colisiones de escritura.",
        "Apliqué el Principio de Menor Privilegio y pausa obligatoria Human-in-the-Loop para toda acción de escritura o envío externo en MCP.",
        "Comprobé que el optimizador de turnos bloquea transiciones prohibidas (Noche -> Mañana) y que el simulador Monte Carlo calcula correctamente P50, P80 y P90."
      ],
      "criterion": "El aprendiz diseña arquitecturas desacopladas para trabajo multi-agente seguro y valida modelos combinatorios y estocásticos con criterio técnico.",
      "instrument": "Rúbrica de arquitectura multi-agente y validación avanzada (MG-A04)",
      "evidence": "docs/04-validacion.md",
      "nextStep": "Avanza a la Estación 5 (Cierre y Proyecto Cumbre ERP) para integrar toda la suite y consolidar tu Portafolio de Evidencias.",
      "aiAssist": {
        "prompt": "/plan Revisa mi contrato de datos multi-agente, mi matriz de permisos MCP y mis cálculos PERT / Monte Carlo para verificar su consistencia técnica.",
        "verify": "Asegúrate de que ningún archivo sea modificado simultáneamente por dos subagentes y de que la desviación estándar PERT sea (Pesimista - Optimista) / 6.",
        "log": "Validación de maestría Nivel 4 registrada en bitácora."
      },
      "upload": {
        "fileName": "04-validacion.md",
        "format": "markdown"
      }
    },
    {
      "id": "MG-A05",
      "code": "AG-CUMBRE-ERP",
      "name": "Estación 5 · Proyecto Cumbre ERP, Memoria Multi-IDE y Transferencia a Ingeniería (Ejercicio 20 + Ruta Canvas)",
      "purpose": "Integrar extremo a extremo todas las herramientas de Google Antigravity y Gemini Canvas en una Suite Operativa Empresarial (ERP) sincronizada en tiempo real y respaldada por una Memoria Multi-IDE que impida retrocesos.",
      "inputs": [
        "Ejercicio 20 (Proyecto Cumbre ERP) en ruta-antigravity.html",
        "Ejercicios seleccionados de la Ruta Ingeniería en Gemini Canvas (ruta-canvas.html)",
        "Archivos de gobernanza: AI-PROJECT-MEMORY.md, GEMINI.md, AGENTS.md y .agents/skills/"
      ],
      "instructions": "Completa el Proyecto Cumbre (Ejercicio 20) y conecta al menos 2 componentes avanzados de la Ruta Canvas. Documenta el flujo en cadena de los 4 módulos (Comercial -> Inventario -> Tesorería -> Copiloto Auditor), la configuración de Memoria Multi-IDE de tu proyecto y el resultado de la prueba integral de extremo a extremo en /browser.",
      "example": "Flujo E2E verificado: Al registrar un pedido de 20 unidades a crédito de 30 días, el Módulo de Inventario descuenta 20 unidades y activa alerta ROP; Tesorería incrementa utilidad contable hoy pero agenda el recaudo en banco a +30 días; el Copiloto Auditor emite las 3 decisiones prioritarias de la semana.",
      "station": {
        "sectionId": "m05-cierre",
        "order": 5,
        "phase": "transferencia",
        "minutes": 90
      },
      "evidenceType": "producto",
      "fields": [
        {
          "key": "flujo_erp_end_to_end",
          "label": "1. Prueba End-to-End de los 4 Módulos Conectados de la Suite Operativa (Ejercicio 20)",
          "type": "area",
          "placeholder": "Describe el evento disparador (venta registrada) y cómo verificaste en /browser la actualización simultánea en Inventario, Cuentas por Cobrar, Flujo de Caja y Copiloto Auditor...",
          "hint": "Detalla las 3 decisiones prioritarias que emitió automáticamente el Copiloto Auditor."
        },
        {
          "key": "memoria_multi_ide",
          "label": "2. Arquitectura de Memoria Persistente Multi-IDE (AI-PROJECT-MEMORY.md + GEMINI.md + Skills)",
          "type": "area",
          "placeholder": "Explica cómo estructuraste la memoria de tu proyecto para que cualquier agente o IDE reconozca qué está construido, qué falta construir y qué invariantes no puede romper...",
          "hint": "Menciona cómo se conectan GEMINI.md, AGENTS.md, .cursorrules y la Skill de auditoría semanal."
        },
        {
          "key": "puente_canvas_antigravity",
          "label": "3. Transferencia y Puente desde Gemini Canvas hacia Antigravity IDE",
          "type": "area",
          "placeholder": "Indica qué prototipo o algoritmo de la Ruta Canvas (ej. Kanban WIP, Resiliencia Circuit Breaker, Accesibilidad WCAG o Simulador SaaS) integraste o llevaste a tu proyecto...",
          "hint": "Reflexiona sobre cómo cambiaron tus capacidades para resolver problemas complejos tras completar el recorrido."
        }
      ],
      "checklist": [
        "Comprobé en /browser que una transacción comercial actualiza en cadena el stock, el punto de reorden, las cuentas por cobrar y el diagnóstico ejecutivo.",
        "Dejé configurada la memoria persistente del proyecto (GEMINI.md / AI-PROJECT-MEMORY.md) y la Skill de auditoría integral.",
        "Revisé que las 5 estaciones del Portafolio de Evidencias estén en estado 'Lista para entregar' antes de exportar o imprimir el documento oficial SENA."
      ],
      "criterion": "La solución cumbre integra datos, reglas de negocio, autoverificación en navegador y memoria Multi-IDE sin regresiones ni dependencias rotas.",
      "instrument": "Rúbrica de producto integrador y Portafolio de Evidencias (MG-A05)",
      "evidence": "docs/05-cierre.md",
      "nextStep": "Revisa el bloque de consolidación del Portafolio de Evidencias más abajo y descarga tu paquete Markdown/JSON o imprímelo en PDF formato carta SENA.",
      "aiAssist": {
        "prompt": "/plan Realiza una auditoría integral de mi entrega final (MG-A05) verificando la trazabilidad entre los 4 módulos del ERP y la memoria Multi-IDE.",
        "verify": "Comprueba que todas las estaciones MG-A01 a MG-A05 tengan evidencias completas y verificables antes de generar el paquete final.",
        "log": "Cierre técnico y consolidación del Portafolio de Evidencias registrados."
      },
      "upload": {
        "fileName": "05-cierre.md",
        "format": "markdown"
      }
    }
  ]
};
