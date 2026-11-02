# Arquitectura de `guia-gemini-antigravity`

## 1. Fuerzas del Problema y Decisiones Clave

1. **Operación 100 % Offline-First (`file://`):** El portal debe abrirse directamente desde cualquier carpeta local o memoria USB en aulas del SENA sin requerir servidor Node.js, Python ni conexión a internet (cero CDNs externos).
2. **Extensión de 40 Ejercicios + Manual + Laboratorio + Portafolio SENA:** Un único archivo monolítico (como el antiguo prototipo de 3.177 líneas) violaba el presupuesto modular de DevBrain y dificultaba el mantenimiento por agentes de IA.
3. **Solución Arquitectónica (ver `ADR/ADR-001-portal-multipagina-offline.md`):**
   - Portal web multipágina de 5 superficies HTML (`index.html`, `ruta-antigravity.html`, `manual-antigravity.html`, `laboratorio-prompts.html`, `ruta-canvas.html`).
   - Separación en 3 capas de JavaScript (`js/data/`, `js/core/`, `js/ui/`) y 3 hojas de estilo (`css/main.css`, `css/components.css`, `css/print.css`), garantizando que **cada archivo mantenido tenga menos de 250 líneas físicas**.
   - Compatibilidad dual navegador/Node.js mediante UMD ligero (`window.AGPortal` en el navegador y `module.exports` en Node.js) para permitir pruebas unitarias directas con `node --test` al 100 % de cobertura de funciones sin requerir transpiladores.

## 2. Mapa de Módulos y Responsabilidades

| Capa | Archivo | Responsabilidad Pública Principal | Presupuesto |
|---|---|---|---|
| **Estilos** | `css/main.css` | Variables del Tema Dual (Brisa Nórdica / Noche Apacible), layout Bento Grid y estructura base | < 220 líneas |
| **Estilos** | `css/components.css` | Tarjetas, botones, badges, paneles de código y simuladores interactivos | < 220 líneas |
| **Estilos** | `css/print.css` | Reglas `@media print` tamaño carta SENA | < 120 líneas |
| **Datos** | `js/data/ag-exercises-n1-n2.js` | Catálogo de Ejercicios Antigravity 1 al 10 (Niveles 1 y 2) con Kits y Casos Testigo | < 245 líneas |
| **Datos** | `js/data/ag-exercises-n3-n4.js` | Catálogo de Ejercicios Antigravity 11 al 20 (Niveles 3 y 4) con Kits y Casos Testigo | < 245 líneas |
| **Datos** | `js/data/canvas-exercises-n1-n2.js` | Catálogo de Ejercicios Gemini Canvas 1 al 10 con puentes hacia Antigravity | < 245 líneas |
| **Datos** | `js/data/canvas-exercises-n3-n4.js` | Catálogo de Ejercicios Gemini Canvas 11 al 20 con puentes hacia Antigravity | < 245 líneas |
| **Datos** | `js/data/antigravity-tools-map.js` | Catálogo de las 12 herramientas, modalidades y comandos slash de Antigravity | < 180 líneas |
| **Core** | `js/core/store.js` | Gestión de estado en `localStorage` (progreso 40 ejercicios, tema, Casos Testigo, export/import) | < 180 líneas |
| **Core** | `js/core/simulator-engine.js` | Motor matemático determinista de los 20 Casos Testigo (4 estados: válido, inválido, vacío, reset) | < 210 líneas |
| **Core** | `js/core/kit-generator.js` | Generador de contenidos y descarga local de Kits Semilla (`.csv`, `.txt`, `.json`, `.md`) | < 190 líneas |
| **Core** | `js/core/prompt-builder.js` | Evaluador de calidad y ensamblador de prompts `/plan`, `GEMINI.md` y `SKILL.md` | < 180 líneas |
| **UI** | `js/ui/nav-theme.js` | Navegación compartida, conmutador de tema, reloj conceptual y notificaciones Toast | < 190 líneas |
| **UI** | `js/ui/render-dashboard.js` | Renderizador del Hub Principal (`index.html`) y Manual (`manual-antigravity.html`) | < 190 líneas |
| **UI** | `js/ui/render-antigravity.js` | Renderizador Maestro-Detalle de los 20 Ejercicios Antigravity y su laboratorio en vivo | < 230 líneas |
| **UI** | `js/ui/render-canvas.js` | Renderizador Maestro-Detalle de los 20 Ejercicios Canvas y del Constructor Live | < 210 líneas |

## 3. Compuertas de Verificación
- **Modularidad:** `Test-DevBrainModularity.ps1 -Path . -ChangedOnly -FailOnViolations`
- **Ancho y Legibilidad (Regla 7.4):** `node tools/text-layout/scripts/text-layout-audit.mjs .`
- **Pruebas Unitarias (100 % funciones):** `node --test tests/portal-core.test.mjs`
