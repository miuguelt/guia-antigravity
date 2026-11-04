# Revisión de Preparación Pedagógica y Técnica (`GUIDE_READINESS_REVIEW.md`)

**Proyecto:** `guia-gemini-antigravity`  
**Versión auditada:** `2.2.0`  
**Estado:** `APROBADA — LISTA PARA USO FORMATIVO Y SUSTENTACIÓN`

---

## 1. Lista de verificación pedagógica (SENA ADSO `228118`)

| Criterio de Preparación | Estado | Evidencia Verificable en el Repositorio |
| :--- | :--- | :--- |
| **Aviso único sobre materiales de práctica (Regla 5.0.1)** | Cumple | Incluido al inicio de `index.html` y `docs/01-fundamentos.md` aclarando que los casos y semillas son de aprendizaje. |
| **Progresión didáctica de los 46 ejercicios** | Cumple | 26 ejercicios Antigravity (cubriendo las 12 capacidades oficiales) + 20 ejercicios Gemini Canvas ordenados por complejidad creciente. |
| **Kits de Contexto Semilla (`@archivos`) descargables** | Cumple | `js/core/kit-generator.js` genera y descarga en 1 clic los 26 kits (84 archivos semilla físicos en `kits/`). |
| **Simulador determinista de Casos Testigo (4 estados)** | Cumple | `js/core/simulator-engine.js` evalúa sin `setTimeout` los estados `valido`, `invalido`, `vacio` y `reset` para los 26 ejercicios. |
| **5 Estaciones y Portafolio de Evidencias SENA** | Cumple | `index.html` integra `#m01-fundamentos` a `#m05-cierre` (`MG-A01` a `MG-A05`) y el **Portafolio de Evidencias** offline. |
| **Erradicación del extranjerismo prohibido** | Cumple | Toda la interfaz y documentación utiliza exclusivamente el término canónico **«Portafolio de Evidencias»**. |

---

## 2. Lista de verificación de arquitectura y memoria Multi-IDE

- **Compatibilidad Offline-First (`file://`):** Cero llamadas a CDNs externos. El archivo `js/registro-entregables.js` precarga el registro de evidencias en memoria sin requerir `fetch()` HTTP.
- **Modularidad estricta (`< 250 líneas`):** Todos los archivos en `css/` y `js/` se mantienen por debajo de las 250 líneas.
- **Memoria sincronizada entre IDEs:** `AI-PROJECT-MEMORY.md`, `GEMINI.md`, `AGENTS.md`, `.cursorrules`, `.windsurfrules` y `docs/architecture/ADR/ADR-001-portal-multipagina-offline.md` documentan la arquitectura y evitan regresiones.
- **Pruebas automatizadas al 100 %:** `tests/portal-core.test.mjs` ejecuta 15 pruebas unitarias sobre el 100 % de las funciones de `js/core/`.
