# ADR-001: Arquitectura de Portal Educativo Multipágina Offline-First y Memoria Multi-IDE

- **Fecha:** 2026-11-01
- **Estado:** Aprobado e Implementado
- **Contexto:** Proyecto `guia-gemini-antigravity` (SENA ADSO 228118 — DevBrain v8.10)

## 1. Contexto y Problema
El proyecto contaba inicialmente con dos realidades desconectadas:
1. Un archivo `index.html` autogenerado de 31 líneas con esqueleto vacío.
2. Un archivo monolítico `CV-052_20_Ejercicios_Progresivos_con_Gemini_en_Antigravity.html` de 3.177 líneas que dependía del CDN externo de Tailwind CSS y concentraba en un solo archivo HTML+JS los 40 ejercicios (20 de Antigravity y 20 de Canvas), el manual y el constructor de prompts.
3. Carpetas vacías (`src/features`, `src/shared`, `src/styles`) creadas por la plantilla genérica de proyectos estáticos que confundían a los agentes de IA sobre dónde ubicar el código.

## 2. Decisión
1. **Arquitectura Multipágina Offline-First (`file://`):** Descomponer el monolito en 5 páginas HTML semánticas (`index.html`, `ruta-antigravity.html`, `manual-antigravity.html`, `laboratorio-prompts.html`, `ruta-canvas.html`) libres de CDNs externos.
2. **Modularización Estricta (< 250 líneas por archivo):** Dividir los datos en `js/data/`, la lógica pura en `js/core/` y los renderizadores en `js/ui/`, usando un patrón UMD ligero compatible tanto con `<script>` directo en `file://` como con `node --test` en integración continua.
3. **Veracidad Determinista y Kits Semilla:** Incorporar `simulator-engine.js` para validar matemáticamente los Casos Testigo de los 20 ejercicios de Antigravity en 4 estados (válido, inválido, vacío, reset) y `kit-generator.js` para descargar instantáneamente los archivos de práctica (`@archivos`).
4. **Memoria Persistente Multi-IDE:** Establecer `AI-PROJECT-MEMORY.md` sincronizado con `GEMINI.md`, `AGENTS.md`, `.cursorrules` y `.windsurfrules`, y retirar las carpetas vacías (`src/*`) y el monolito antiguo.

## 3. Alternativas Descartadas
- **Mantener el archivo único de 3.177 líneas:** Descartado porque incumple el presupuesto modular de DevBrain (máximo 250/400 líneas), agota la ventana de contexto de los agentes al editar y depende de CDN externo.
- **Usar un empaquetador con servidor Node/Vite:** Descartado por la Regla 10.3 de DevBrain, que prohíbe herramientas de compilación que impidan abrir la guía directamente con doble clic (`file://`) en aulas sin conectividad.

## 4. Consecuencias
- **Positivas:** Carga instantánea offline, cumplimiento del 100 % de las compuertas de modularidad, legibilidad (Regla 7.4) y pruebas unitarias al 100 % de cobertura de funciones en `js/core/`.
- **Mantenimiento:** Cualquier cambio en `deliverables.registry.json` debe publicarse hacia `js/registro-entregables.js` ejecutando `Publish-GuideEvidenceRegistry.ps1 -Path . -Apply`.
