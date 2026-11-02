# Bitácora de Iteraciones de la Guía (`GUIDE_ITERATION_LOG.md`)

## Iteración 2.1.0 — Extensiones Pedagógicas: Temporizador Conceptual, Atajos de Teclado, Pack Consolidado de Kits y Transferencia al Portafolio
- **Fecha:** 2026-11-01
- **Problema pedagógico abordado:**
  1. **Fricción en el ritmo de estudio:** Los aprendices requerían un mecanismo integrado de autorregulación del tiempo para alternar entre el estudio conceptual y la ejecución práctica en paralelo con agentes de IA.
  2. **Descarga repetitiva de archivos semilla:** Descargar individualmente los 20 kits de archivos `@semilla` generaba demoras operativas al configurar carpetas de trabajo completas para el proyecto formativo.
  3. **Brecha en la transferencia de evidencias:** Copiar manualmente los resultados del Caso Testigo hacia las estaciones formativas del SENA (`MG-A01` a `MG-A05`) propiciaba formatos heterogéneos y omisión de los 4 estados de prueba obligatorios.
  4. **Desconexión entre catálogo y laboratorio:** En `laboratorio-prompts.html`, los aprendices debían escribir desde cero o copiar manualmente los parámetros de los 20 ejercicios para analizar la calidad de sus especificaciones.
- **Decisiones de diseño tomadas:**
  1. **Temporizador de Estudio y Atajos (`js/ui/study-timer.js`):** Arquitectura desacoplada en 3 capas (máquina de estados pura determinista con `createTimerState`/`tickTimer`/`formatTime`, despachador de atajos `handleKeyboardShortcut` con protección estricta contra campos editables `INPUT`/`TEXTAREA`/`SELECT`, y controlador DOM `#study-timer-bar` con persistencia en `sessionStorage` y aviso Toast pedagógico).
  2. **Consolidación de Kits Semilla (`js/core/kit-generator.js`):** Implementación de `buildAllKitsBundle()` y `triggerAllKitsDownload()` para empaquetar los 20 kits en `todos_los_kits_semilla_antigravity.json` con soporte dual (Blob/URL virtual en navegador y JSON string en Node.js).
  3. **Generador de Snippet de Evidencias SENA (`js/core/kit-generator.js`):** Función pura `buildEvidenceSnippet(exerciseId, result)` que mapea canónicamente las estaciones `MG-A01` a `MG-A05`, documenta explícitamente los 4 estados del simulador (Válido, Inválido, Vacío, Reset) y garantiza el término canónico «Portafolio de Evidencias».
  4. **Adaptador Universal de Prompts (`js/core/prompt-builder.js`):** Función pura `exerciseToPromptSpec(ex)` que mapea rol, objetivo, archivos con `@`, comando `/plan`, invariantes y restricciones institucionales `es-CO`, alcanzando 100 puntos («Profesional Asertivo») en los 20 ejercicios.
  5. **Selector Universal en Laboratorio (`js/ui/render-canvas.js` y `laboratorio-prompts.html`):** Menú desplegable `#lab-exercise-selector` que sincroniza en tiempo real los campos del laboratorio con cualquiera de los 20 ejercicios.
  6. **Migas de Pan Semánticas (`.breadcrumbs`):** Inserción de navegación jerárquica clara en las 5 páginas web del portal.
- **Métricas y Resultados Alcanzados:**
  - **30 pruebas unitarias automatizadas con 0 fallos** (15 en `portal-core.test.mjs` + 15 en `portal-extensions.test.mjs`).
  - **100 % de cobertura de funciones** en los motores de lógica pura (`store.js`, `simulator-engine.js`, `kit-generator.js`, `prompt-builder.js`).
  - **Presupuesto modular estricto cumplido:** Todos los archivos propios en `css/` y `js/` se mantienen bajo 250 líneas físicas (ej. `study-timer.js`: 129 líneas, `kit-generator.js`: 234 líneas, `components.css`: 147 líneas).
  - **8 compuertas de aseguramiento de calidad DevBrain aprobadas con 0 errores** (pruebas base, pruebas extendidas, auditoría de texto 7.4, guía educativa, entregables SENA, calidad web, modularidad y léxico institucional).
- **Preservación de Invariantes:**
  - Compatibilidad estricta Offline-First (`file://`) sin llamadas a CDNs externos.
  - Cero temporizadores ficticios (`setTimeout`) en evaluación de reglas de negocio.
  - Léxico institucional respetado al 100 %: uso exclusivo de **«Portafolio de Evidencias»**.

---

## Iteración 2.0.0 — Refactorización Arquitectónica a Portal Multipágina Offline-First y Memoria Multi-IDE
- **Fecha:** 2026-11-01
- **Cambios realizados:**
  1. **Descomposición del monolito original:** Se migró el archivo único `CV-052_20_Ejercicios_Progresivos_con_Gemini_en_Antigravity.html` (3.177 líneas con dependencia de Tailwind CDN) hacia un portal modular de **5 páginas HTML** (`index.html`, `ruta-antigravity.html`, `manual-antigravity.html`, `laboratorio-prompts.html`, `ruta-canvas.html`), 3 hojas de estilo en `css/` y 13 módulos JavaScript en `js/data/`, `js/core/` y `js/ui/`, todos con menos de 250 líneas por archivo.
  2. **Kits de Contexto Semilla y Simulador Determinista:** Se incorporó `js/core/kit-generator.js` para descargar con un clic los 20 archivos `@semilla` y `js/core/simulator-engine.js` para comprobar matemáticamente el Caso Testigo de cada ejercicio en los 4 estados obligatorios (`válido`, `inválido`, `vacío` y `reset`).
  3. **Gobernanza y Memoria Multi-IDE:** Se limpiaron los directorios vacíos generados por el andamiaje inicial (`src/`), se sincronizaron `guide.manifest.json`, `deliverables.registry.json` y `js/registro-entregables.js`, y se crearon `AI-PROJECT-MEMORY.md`, `GEMINI.md`, `WEB-DESIGN-BRIEF.md`, `ADR-001` y la habilidad local `.agents/skills/auditar-guia-antigravity/SKILL.md`.
  4. **Suite de Pruebas Automatizadas:** Se implementó `tests/portal-core.test.mjs` con 15 pruebas automatizadas en `node:test` que certifican el 100 % de cobertura funcional de los motores puros.

---

## Iteración 1.0.0 — Andamiaje Base DevBrain y Prototipo Monolítico Inicial
- **Estado previo:** Archivo HTML monolítico de 3.177 líneas acompañado por el andamiaje base de `New-DevBrainProject.ps1` con plantillas pendientes de poblar.
