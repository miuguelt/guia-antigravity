# AI-PROJECT-MEMORY — Fuente Única de Verdad (SSoT) Multi-IDE (`guia-gemini-antigravity`)

**Versión:** 2.1.0 · **Estado:** Activo y Sincronizado · **Estándar:** DevBrain v8.10 / SENA ADSO (228118)

> **Instrucción para cualquier Inteligencia Artificial o IDE (Google Antigravity, Cursor, Windsurf, Claude Code, VS Code, OpenCode):**
> Lee este archivo antes de proponer o ejecutar cualquier cambio en este repositorio. Su propósito es que tengas memoria inmediata de qué se ha construido, por qué existe cada archivo, cuáles son las reglas innegociables y hacia dónde evoluciona el proyecto sin causar regresiones.

---

## 1. Propósito del Proyecto

Este repositorio contiene el **Portal Educativo Oficial de Google Antigravity y Gemini Canvas** (`guia-gemini-antigravity`), diseñado para aprendices del SENA (Tecnólogo ADSO, Centro de Gestión Agroempresarial del Oriente - CGAO Subsede Vélez) y profesionales de cualquier disciplina.

El portal enseña de forma progresiva cómo dirigir agentes de IA para construir soluciones reales de software y automatización mediante **40 ejercicios prácticos divididos en dos rutas**:
1. **Ruta 1 · 20 Ejercicios Progresivos en Google Antigravity (`ruta-antigravity.html`):** Desde organización documental sin saber programar (Nivel 1), herramientas de negocio y `/browser` (Nivel 2), sistemas relacionales y `Skills` (Nivel 3), hasta orquestación multi-agente, conectores MCP, simulación de Monte Carlo y una Suite Operativa Integral ERP (Nivel 4). Cada ejercicio incluye:
   - **Kit de Archivos Semilla descargable al instante** (`@archivos` reales listos para colocar en la carpeta de trabajo), tanto de forma individual como mediante el paquete consolidado (`todos_los_kits_semilla_antigravity.json`).
   - **Simulador determinista del «Caso Testigo»** (evaluación matemática real en 4 estados: válido, inválido, vacío y reinicio).
   - **Botón de Tarea Conceptual** para iniciar el temporizador de estudio en paralelo.
   - **Copia de Evidencias Markdown** estructurada directamente para las estaciones `MG-A01` a `MG-A05` del Portafolio de Evidencias.
2. **Ruta 2 · 20 Ejercicios Progresivos de Ingeniería en Gemini Canvas (`ruta-canvas.html`):** Ingeniería de prompts, OWASP, estadística IQR, pruebas A/B, Regex, Kanban con Ley de Little, algoritmos Big-O, resiliencia con Circuit Breaker, accesibilidad WCAG 2.1, Unit Economics SaaS, física 2D, síntesis de audio DSP, consenso distribuido Raft, compilador Mini-SQL y centro de comando LLM, con **Puente de Transferencia hacia Antigravity IDE**.

---

## 2. Mapa de Arquitectura y Explicación de los Archivos Generados por DevBrain

Todos los archivos propios de código en `css/` y `js/` cumplen estrictamente el presupuesto modular de **menos de 250 líneas físicas por archivo**, con desacoplamiento entre motores puros (UMD dual para navegador y Node.js), controladores de interfaz y capas de datos.

### 2.1 Superficies Web del Portal (100 % Offline-First `file://`)
- `index.html` (285 líneas): Hub Principal, Caso Conductor Empresarial, Mapa de las 12 Herramientas de Antigravity, tablero de avance global, barra semántica fija de temporizador (`#study-timer-bar`), migas de pan y las **5 Estaciones del Portafolio de Evidencias SENA** (`MG-A01` a `MG-A05` + montaje `[data-db-evidence-dossier]`).
- `ruta-antigravity.html` (127 líneas): Entorno interactivo Maestro-Detalle de los **20 Ejercicios en Google Antigravity**, con barra de temporizador, migas de pan, descargador de kits individuales y consolidado, validador de Caso Testigo y botones de acción rápida.
- `manual-antigravity.html` (163 líneas): Manual técnico completo (Agent Manager vs. IDE, Tab/Supercomplete, Inline Edit `Ctrl+I`, Visual Diffs, Terminal Sandbox, comandos `/plan`, `/grill-me`, `/browser`, `/goal`, `/boost`, `/schedule`, `/compact`, `/learn`, `GEMINI.md`, `Skills` y `MCP`), protocolo de 6 pasos, barra de temporizador y migas de pan.
- `laboratorio-prompts.html` (230 líneas): Constructor en vivo de especificaciones para Antigravity, generador automático de `GEMINI.md` y `SKILL.md`, comparativa interactiva del Ejemplo Maestro Cotizador, barra de temporizador, migas de pan y **Selector Universal de los 20 Ejercicios (`#lab-exercise-selector`)** con autocompletado calificado al 100 % («Profesional Asertivo»).
- `ruta-canvas.html` (125 líneas): Entorno interactivo Maestro-Detalle de los **20 Ejercicios en Gemini Canvas** con notas de puente hacia Antigravity IDE, barra de temporizador y migas de pan.

### 2.2 Hojas de Estilo Modulares (`css/` — Límite < 250 líneas por archivo)
- `css/main.css` (195 líneas): Tokens semánticos del **Tema Dual de Serenidad Visual** (Modo Claro *Brisa Nórdica / Verde Salvia* `#F4F7FB` y Modo Oscuro Suave *Noche Apacible* `#141923`), tipografía fluida, cuadrícula Bento Grid y `:focus-visible` accesible.
- `css/components.css` (203 líneas): Tarjetas, pestañas, insignias de nivel, paneles de código copiables, simuladores de Caso Testigo, migas de pan semánticas (`.breadcrumbs`), barra de temporizador conceptual, diálogos modales difuminados (`.modal-backdrop`), previsualización de código (`.file-preview-content`) e indicadores hápticos de copia (`.btn-copied`).
- `css/print.css` (52 líneas): Reglas `@media print` para exportar el Portafolio de Evidencias SENA en hoja tamaño carta institucional blanca, ocultando elementos interactivos (`.no-print`).
- `css/vendor/`: Estilos oficiales de `DevBrainEvidence` (1070 líneas) y `devbrain-learner-sdk` (1815 líneas).

### 2.3 Módulos JavaScript (`js/` — Límite < 250 líneas por archivo)
- **Capa de Datos (`js/data/`):**
  - `ag-exercises-n1-n2.js` (235 líneas): Ejercicios Antigravity 1 al 10 enriquecidos con Kits Semilla multi-archivo y parámetros de Caso Testigo.
  - `ag-exercises-n3-n4.js` (232 líneas): Ejercicios Antigravity 11 al 20 enriquecidos con Kits Semilla multi-archivo y parámetros de Caso Testigo.
  - `kits-n1.js`, `kits-n2.js`, `kits-n3.js`, `kits-n4.js`: Catálogo de 66 archivos semilla reales y diversos (`.html`, `.xml`, `.sql`, `.yaml`, `.json`, `.csv`, `.md`, `.log`, `.txt`) para los 20 ejercicios de Antigravity.
  - `canvas-exercises-n1-n2.js` (236 líneas): Ejercicios Canvas 1 al 10 con puentes de transferencia a Antigravity.
  - `canvas-exercises-n3-n4.js` (236 líneas): Ejercicios Canvas 11 al 20 con puentes de transferencia a Antigravity.
  - `antigravity-tools-map.js` (116 líneas): Catálogo estructurado de las 12 herramientas, atajos y comandos slash de Antigravity.
- **Capa de Dominio / Motores Puros (`js/core/` — 100 % cubiertos por pruebas unitarias):**
  - `store.js` (248 líneas): Persistencia en `localStorage` del progreso (40 ejercicios), preferencia de tema visual, resultados de Casos Testigo verificados y exportación/importación JSON.
  - `simulator-engine.js` (141 líneas): Motor matemático determinista que evalúa los Casos Testigo de los 20 ejercicios de Antigravity en sus 4 estados obligatorios (`valido`, `invalido`, `vacio`, `reset`).
  - `zip-builder.js` (141 líneas): Micro-generador determinista de archivos PKZIP (`.zip`) con CRC-32 y soporte UTF-8 sin dependencias externas.
  - `kit-generator.js` (171 líneas): Orquestador de descarga individual por archivo, descarga de Kit Completo (`.zip`) por ejercicio, pack maestro de 20 kits y generador de bloque de evidencia (`buildEvidenceSnippet`).
  - `prompt-builder.js` (200 líneas): Evaluador de calidad (0 a 100), transformador universal de ejercicios a especificaciones de prompt (`exerciseToPromptSpec` con 100 pts garantizados) y ensamblador de prompts estructurados, plantillas `GEMINI.md` y `SKILL.md`.
- **Capa de Interfaz (`js/ui/`):**
  - `nav-theme.js` (135 líneas): Barra de navegación compartida, conmutador de tema Claro/Oscuro, atajos globales y notificaciones Toast.
  - `study-timer.js` (136 líneas): Máquina de estados determinista pura (`createTimerState`, `tickTimer`, `formatTime`, `resetTimer`), gestor de atajos de teclado accesibles (`Alt+T`, `Alt+P`, `Alt+Flechas`, `/`, `Ctrl+K`) y controlador DOM de la barra interactiva `#study-timer-bar`.
  - `ui-enhancements.js` (210 líneas): Diálogos modales accesibles, vista previa rápida in-situ de los 66 archivos del kit, modal de importación de progreso JSON con validación en vivo, guía de atajos de teclado (`F1` / `?`) y feedback háptico/visual en botones (`flashCopiedButton`).
  - `render-dashboard.js` (140 líneas): Renderizador del Hub Principal (`index.html`) con respaldo e importación de progreso JSON y catálogo de herramientas (`manual-antigravity.html`).
  - `render-antigravity.js` (249 líneas): Renderizador interactivo de `ruta-antigravity.html` (filtros, pasos, prompts copiables con feedback localizado, botones de inspección rápida "Ver", descarga ZIP y pulso de éxito en Caso Testigo).
  - `render-canvas.js` (232 líneas): Renderizador interactivo de `ruta-canvas.html` y controlador del constructor en `laboratorio-prompts.html`.
- **Artefactos Generados y Vendor (`js/`):**
  - `js/registro-entregables.js` (366 líneas): Generado automáticamente por `Publish-GuideEvidenceRegistry.ps1` a partir de `deliverables.registry.json` para que las estaciones funcionen con `file://`.
  - `js/vendor/`: Motor `devbrain-evidence.js` (2178 líneas) y `devbrain-learner-sdk.js` (6058 líneas).

### 2.4 Compuertas y Archivos de Infraestructura DevBrain
- `guide.manifest.json` (174 líneas) y `deliverables.registry.json` (359 líneas): Contratos curriculares SENA validados por `Test-DevBrainEducationalGuide.ps1` y `Test-GuideDeliverables.ps1`.
- `devbrain-prose.css` (17 líneas), `devbrain-prose.js` (63 líneas) y `tools/text-layout/`: Compuerta automática de la Regla 7.4 (ancho y legibilidad de prosa sin recortes ni `text-overflow: ellipsis`).
- `tests/portal-core.test.mjs` (205 líneas): Suite unitaria base con 15 pruebas cubriendo store, simulador matemático de 4 estados, kits y ensamblador de prompts.
- `tests/portal-extensions.test.mjs` (642 líneas): Suite unitaria extendida con 15 pruebas cubriendo consolidación de kits, descarga reactiva/Node, snippet de evidencias SENA, máquina de estados y atajos del temporizador de estudio y transformación universal de prompts con 100 % de calidad. Total del proyecto: **30 pruebas automatizadas sin fallos**.
- `.devbrain/invariants.json`: Trinquete (*ratchet*) que exige 100 % de cobertura de funciones en pruebas unitarias.
- `Dockerfile` y `docker-compose.yml`: Artefactos de despliegue remoto para Coolify en VPS (en desarrollo local en Windows no se ejecuta Docker; el portal se abre directamente o con servidor estático).

---

## 3. Invariantes Innegociables (Reglas para Evitar Retrocesos)

Cualquier agente de IA que modifique este proyecto **DEBE** respetar estas 6 reglas sin excepción:

1. **Presupuesto Modular Estricto (< 250 líneas):** Ningún archivo `.js` o `.css` propio puede superar las 250 líneas físicas (límite duro de bloqueo en 400 líneas). Si una funcionalidad crece, divídela en un nuevo módulo cohesivo.
2. **Compatibilidad 100 % Offline-First (`file://`):** Prohibido agregar `<script>` o `<link>` hacia CDNs externos (`cdn.tailwindcss.com`, `fonts.googleapis.com`, `unpkg`, etc.). Todo debe funcionar sin internet abriendo los archivos `.html` desde una memoria USB.
3. **Interactividad Determinista (Cero `setTimeout` de engaño):** Los simuladores de Caso Testigo evalúan fórmulas matemáticas reales de inmediato y soportan siempre los 4 estados: entrada válida, entrada inválida, entrada vacía y reinicio (`reset`).
4. **100 % de Cobertura de Funciones en Motores Core:** Toda función exportada en los motores de `js/core/` y `js/ui/study-timer.js` debe tener sus pruebas automatizadas con aserciones observables en `tests/portal-core.test.mjs` y `tests/portal-extensions.test.mjs`.
5. **Integridad del Portafolio de Evidencias SENA:** En `index.html` deben conservarse siempre las 5 secciones `id="m01-fundamentos"` a `id="m05-cierre"` con sus puntos de montaje `data-db-evidence="MG-A01"` a `"MG-A05"` y el atributo de montaje del portafolio final. En textos visibles al usuario se usa siempre el nombre institucional **«Portafolio de Evidencias»**.
6. **Español de Colombia (`es-CO`) y Aviso de Datos de Práctica:** Toda la interfaz y documentación se redacta en español de Colombia claro, profesional y cercano (`tú` para el aprendiz, `usted` para formatos dirigidos al instructor).

---

## 4. Estado Actual y Hoja de Ruta

| Componente / Fase | Estado | Verificación |
|---|---|---|
| **Fase 1 · Gobernanza Curricular y Memoria Multi-IDE** | ✅ Completado | `guide.manifest.json`, `deliverables.registry.json`, `AI-PROJECT-MEMORY.md`, `GEMINI.md`, `AGENTS.md`, `ADR-001` |
| **Fase 2 · Datos de los 40 Ejercicios, Kits y Motores Core** | ✅ Completado | `tests/portal-core.test.mjs` (15 pruebas, 100 % cobertura de funciones) |
| **Fase 3 · Diseño CSS Dual (Brisa Nórdica / Noche Apacible) y UI** | ✅ Completado | `< 250 líneas` por archivo CSS/JS |
| **Fase 4 · Las 5 Páginas HTML y Retiro del Monolito Antiguo** | ✅ Completado | Compatibilidad `file://` y estaciones SENA montadas |
| **Fase 5 · Extensiones v2.1 (Temporizador, Atajos, Bundle de Kits, Evidencias SENA)** | ✅ Completado | `study-timer.js`, `buildAllKitsBundle`, `buildEvidenceSnippet`, selector universal |
| **Fase 6 · Suite de Pruebas Extendida (30 Pruebas Totales)** | ✅ Completado | `tests/portal-extensions.test.mjs` (15 nuevas pruebas, 30/30 en verde) |
| **Fase 7 · Verificación Integral de Compuertas DevBrain** | ✅ Completado | 8 compuertas de aseguramiento de calidad aprobadas con 0 errores |

### Próximas Evoluciones Sugeridas (Backlog Futuro)
- Permitir que el aprendiz agregue sus propios ejercicios personalizados en `localStorage` desde `laboratorio-prompts.html` y los exporte junto con su paquete de progreso.
- Añadir generación de tarjetas de estudio imprimibles (flashcards) por cada uno de los 4 niveles.
