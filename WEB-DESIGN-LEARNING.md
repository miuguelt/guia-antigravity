# Aprendizajes de Diseño Web, Accesibilidad y Rendimiento (`WEB-DESIGN-LEARNING.md`)

## 1. Descanso Visual con Doble Tema Sereno (Claro y Oscuro)
- El archivo monolítico original solo ofrecía un fondo oscuro intenso (`#020617`) y dependía de un script externo por CDN.
- En la versión 2.0 se implementó en `css/main.css` un sistema de tokens CSS nativos con dos temas de descanso visual pensados para sesiones de estudio de 2 a 4 horas:
  - **Modo Claro «Brisa Nórdica / Verde Salvia» (`#F4F7FB` / `#FFFFFF`):** Contraste superior a `12:1` en texto principal y acentos en verde salvia profundo (`#0F766E`).
  - **Modo Oscuro Suave «Noche Apacible» (`#141923` / `#1D2432`):** Evita el negro puro que fatiga la vista y conserva legibilidad AAA.

## 2. Cumplimiento de la Regla 7.4 (Ancho y Legibilidad de Prosa)
- Ningún selector CSS utiliza `text-overflow: ellipsis`, `line-clamp` ni topes artificiales en caracteres (`65ch`) que desperdicien el ancho de lectura.
- Se integraron `devbrain-prose.css` y `devbrain-prose.js` en las 5 páginas HTML, garantizando justificación limpia en contenedores amplios (`>= 40rem`) y alineación inicial en pantallas móviles.

## 3. Compatibilidad Estricta con el Protocolo `file://` y Patrón UMD Dual
- Los módulos en `js/data/` y `js/core/` utilizan un envoltorio UMD ligero que expone sus funciones tanto en `window.AGPortal` (para ejecutarse directamente en el navegador vía `file://` sin servidores ni empaquetadores) como en `module.exports` (para ejecutarse en milisegundos dentro de la suite `node --test tests/portal-core.test.mjs`).
- El registro de evidencias se compila en `js/registro-entregables.js` mediante `Publish-GuideEvidenceRegistry.ps1` para evitar bloqueos CORS al abrir `index.html` localmente.
