# Academia Gemini & Google Antigravity v2.1 — Portal Educativo Multipágina (`guia-gemini-antigravity`)

Portal educativo interactivo 100 % **Offline-First (`file://`)** diseñado para que aprendices del SENA (Tecnología en Análisis y Desarrollo de Software — ADSO `228118`), profesionales no-desarrolladores y equipos técnicos dominen el flujo de trabajo con agentes en **Google Antigravity** y **Gemini Canvas** mediante **40 ejercicios progresivos**, **Kits de Contexto Semilla (`@archivos`)**, **Tareas Conceptuales en Paralelo**, **Simuladores Deterministas de Casos Testigo**, **Temporizador de Estudio con Atajos de Teclado** y **Memoria Persistente Multi-IDE**.

---

## 1. Novedades de la Versión 2.1

La versión 2.1 introduce mejoras pedagógicas y de accesibilidad centradas en la productividad del aprendiz y la gestión de evidencias:
1. **Barra de Temporizador de Estudio Conceptual (`#study-timer-bar`):** Barra fija/flotante accesible que permite ejecutar sesiones de estudio conceptual temporizadas (3 minutos por defecto o duración sugerida por ejercicio), con cuenta regresiva en vivo, controles de pausa, reanudación, reinicio y notificación Toast pedagógica al culminar.
2. **Atajos de Teclado Universales:** Accesibilidad rápida con protección contra campos de formulario (`INPUT`, `TEXTAREA`, `SELECT`):
   - `Alt + T`: Conmutar entre Modo Claro (*Brisa Nórdica*) y Modo Oscuro Suave (*Noche Apacible*).
   - `Alt + P`: Imprimir o exportar el Portafolio de Evidencias a PDF en hoja institucional carta.
   - `Alt + Flecha Derecha` / `Alt + Flecha Izquierda`: Navegar al ejercicio siguiente o anterior.
   - `/` o `Ctrl + K`: Enfocar la barra de búsqueda o filtro de ejercicios.
3. **Descarga Consolidada de Kits Semilla:** Botón para generar y descargar con un clic los **20 kits semilla unificados** en un solo archivo `todos_los_kits_semilla_antigravity.json`.
4. **Copia Rápida de Evidencias Markdown:** Botón «📋 Copiar Evidencia para Portafolio» en cada ejercicio de Antigravity, formateando automáticamente el bloque de entrega para las estaciones SENA `MG-A01` a `MG-A05` con verificación de los 4 estados (Válido, Inválido, Vacío, Reset).
5. **Selector Universal en el Laboratorio:** Menú desplegable `#lab-exercise-selector` en `laboratorio-prompts.html` que precarga cualquiera de los 20 ejercicios y genera en vivo especificaciones con 100 % de calidad («Profesional Asertivo»).
6. **Migas de Pan Semánticas:** Navegación jerárquica clara (`.breadcrumbs`) en la cabecera de las 5 páginas web.

---

## 2. Cómo abrir y utilizar el portal (Sin servidor requerido)

1. Abre directamente [index.html](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/index.html) con doble clic en cualquier navegador moderno (`file://`), o levanta un servidor estático opcional ejecutando `./start-windows.ps1`.
2. Recorre las **5 páginas interconectadas**:
   - **[index.html](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/index.html) (Hub Principal):** Tablero de progreso global, mapa de memoria multi-IDE, barra de temporizador, migas de pan y las 5 estaciones curriculares SENA (`MG-A01` a `MG-A05`) con el **Portafolio de Evidencias** integrado.
   - **[ruta-antigravity.html](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/ruta-antigravity.html) (Ruta Principal — 20 Ejercicios en Google Antigravity):** Va desde organizar documentos con ISO-8601 y limpiar notas con `@menciones` (Nivel 1), pasando por cotizadores con margen bruto, matrices ponderadas, inventario con punto de reorden (ROP), analizador NPS y cierres Poka-Yoke (Nivel 2), hasta un CRM relacional, habilidades en `.agents/skills/`, tesorería a 12 meses, conciliador bancario (Nivel 3) y un Sistema Operativo Pyme completo (Nivel 4). Incluye descarga de kits individuales, descarga consolidada, validador de Caso Testigo y copia de evidencias Markdown.
   - **[manual-antigravity.html](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/manual-antigravity.html) (Manual de Herramientas):** Catálogo de las 12 herramientas oficiales de Google Antigravity (*Agent Manager*, *Editor View* `Tab` / `Ctrl+I`, *Artifacts*, `/plan`, `/grill-me`, `/browser`, `/goal`, `/boost`, `/schedule`, `/compact`, `/learn`, `@menciones`, `GEMINI.md`, `Skills` y `MCP`), diagrama arquitectónico, protocolo de 6 pasos y matriz de diagnóstico.
   - **[laboratorio-prompts.html](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/laboratorio-prompts.html) (Laboratorio Constructor):** Comparativa guiada (enfoque improvisado vs. profesional), selector universal de ejercicios y generador interactivo en vivo de prompts estructurados, guías conceptuales, archivos `GEMINI.md` y habilidades `SKILL.md`.
   - **[ruta-canvas.html](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/ruta-canvas.html) (Ruta Complementaria — 20 Ejercicios en Gemini Canvas):** 20 retos progresivos de ingeniería de software con puente explícito para migrarlos y modularizarlos en Antigravity IDE.

---

## 3. Mapa de Arquitectura y Presupuesto Modular (< 250 líneas)

Todos los archivos de código propio en `css/` y `js/` cumplen estrictamente el límite de **menos de 250 líneas por archivo**:

| Ruta / Archivo | Líneas | Propósito y Rol en el Ecosistema Multi-IDE |
| :--- | :--- | :--- |
| `AI-PROJECT-MEMORY.md` | ~95 | Fuente de verdad sobre el estado construido, inventario de módulos e invariantes para cualquier IA. |
| `GEMINI.md` / `AGENTS.md` | ~25 | Reglas permanentes cargadas automáticamente por Google Antigravity y agentes compatibles. |
| `.cursorrules` / `.windsurfrules` | ~5 | Reglas espejadas para Cursor y Windsurf con puntero directo a `AI-PROJECT-MEMORY.md`. |
| `guide.manifest.json` | 174 | Alineación curricular SENA (`228118`), secuencia didáctica de 5 fases, puntos de control y glosario. |
| `deliverables.registry.json` | 359 | Contrato de los 5 artefactos evaluables (`MG-A01` a `MG-A05`) del Portafolio de Evidencias. |
| `js/registro-entregables.js` | 366 | Espejo JS autogenerado desde `deliverables.registry.json` para que el Portafolio funcione en `file://`. |
| `js/vendor/` y `css/vendor/` | Vendor | Motor oficial de persistencia y exportación (JSON/Markdown) del Portafolio de Evidencias. |
| `devbrain-prose.css` / `.js` | 17 / 63 | Auditoría Tipográfica 7.4 (ancho fluido de lectura, justificación adaptable y cero truncamiento). |
| `css/main.css`, `components.css`, `print.css` | 191 / 147 / 53 | Sistema visual dual (**Brisa Nórdica** claro y **Noche Apacible** oscuro), migas de pan y barra de temporizador. |
| `js/data/*.js` (5 módulos) | 117 a 237 | Catálogos de los 20 ejercicios Antigravity, 20 ejercicios Canvas y mapa de 12 herramientas. |
| `js/core/*.js` (4 motores puros) | 142 a 249 | `store.js`, `simulator-engine.js` (4 estados), `kit-generator.js` (bundle y evidencias) y `prompt-builder.js` (spec). |
| `js/ui/*.js` (5 controladores) | 124 a 233 | `nav-theme.js`, `study-timer.js` (129 lín), `render-dashboard.js`, `render-antigravity.js` y `render-canvas.js`. |
| `tests/portal-core.test.mjs` | 205 | Suite base con 15 pruebas cubriendo store, simulador matemático de 4 estados, kits y prompt builder. |
| `tests/portal-extensions.test.mjs` | 642 | Suite extendida con 15 pruebas cubriendo bundle de kits, evidencia SENA, temporizador y spec universal. |
| `.devbrain/invariants.json` | 15 | Candado (*ratchet*) que exige 100 % de cobertura de funciones sin pruebas omitidas (30 pruebas totales). |
| `Dockerfile` / `docker-compose.yml` | Despliegue | Configuración estática para despliegue remoto en VPS con Nginx (no se ejecuta Docker localmente). |

---

## 4. Comandos de Verificación y Compuertas de Calidad DevBrain

Ejecuta estos comandos desde la raíz del proyecto para validar el cumplimiento del 100 % de las reglas institucionales:

```powershell
# 1. Suite base de pruebas unitarias (15 pruebas en verde, 100 % funciones de js/core/)
node --test tests/portal-core.test.mjs

# 2. Suite extendida de pruebas unitarias (15 pruebas en verde, cubriendo bundle, evidencias y temporizador)
node --test tests/portal-extensions.test.mjs

# 3. Ejecución conjunta de ambas suites (30/30 pruebas aprobadas con cobertura funcional)
node --test --experimental-test-coverage tests/portal-core.test.mjs tests/portal-extensions.test.mjs

# 4. Auditoría estática de ancho y legibilidad del texto (Regla 7.4)
node tools/text-layout/scripts/text-layout-audit.mjs .

# 5. Compuertas pedagógicas de guía educativa y entregables SENA
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "C:\Users\Miguel\Documents\Aplicaciones\_infrastructure\devbraind\scripts\Test-DevBrainEducationalGuide.ps1" -Path . -Strict
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "C:\Users\Miguel\Documents\Aplicaciones\_infrastructure\devbraind\scripts\Test-GuideDeliverables.ps1" -Path . -Strict

# 6. Compuerta de aseguramiento de calidad web
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "C:\Users\Miguel\Documents\Aplicaciones\_core\skills\build-high-quality-web\scripts\Test-WebQuality.ps1" -Path . -FailOn Error

# 7. Compuerta de modularidad estricta (< 250 líneas por archivo)
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "C:\Users\Miguel\Documents\Aplicaciones\_infrastructure\devbraind\scripts\Test-DevBrainModularity.ps1" -Path . -ChangedOnly -FailOnViolations

# 8. Validador canónico de reglas de léxico colombiano es-CO y modularidad DevBrain
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "C:\Users\Miguel\Documents\Aplicaciones\validate-rules.ps1" -Path .
```
