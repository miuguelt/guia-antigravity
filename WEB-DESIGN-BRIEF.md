# WEB-DESIGN-BRIEF — Contrato de Diseño Visual y Experiencia Pedagógica (`guia-gemini-antigravity`)

## 1. Intención Pedagógica y Confort Visual
El portal está diseñado para sesiones de estudio prolongadas (24 horas curriculares a través de 40 ejercicios prácticos). Para evitar la fatiga ocular y cumplir con el estándar DevBrain §5.7 y §10.3, implementa un **Conmutador de Tema Dual de Serenidad Visual** persistente en `localStorage`:

### Paleta A · Modo Claro «Brisa Nórdica y Verde Salvia» (Estudio Diurno / Aula)
- **Fondo Principal (`--bg-primary`):** `#F4F7FB` (Blanco azulado nórdico descansado, sin el deslumbramiento de `#FFFFFF` puro).
- **Superficie de Tarjetas (`--bg-card`):** `#FFFFFF` con borde sutil `#D8E2EE`.
- **Superficie Secundaria / Código (`--bg-secondary`):** `#EBF1F8`.
- **Texto Principal (`--text-primary`):** `#0F172A` (Contraste > 13:1 AAA).
- **Texto Secundario (`--text-secondary`):** `#334155` (Contraste > 7.5:1 AAA).
- **Acento Primario (`--accent-primary`):** `#2563EB` (Azul Ingeniería Nórdico).
- **Acento SENA / Éxito (`--accent-success`):** `#2E7D32` / `#39A900` (Verde Salvia / Institucional SENA).
- **Acento Tarea Conceptual (`--accent-warning`):** `#B45309` sobre fondo `#FEF3C7`.

### Paleta B · Modo Oscuro Suave «Noche Apacible» (Concentración Nocturna)
- **Fondo Principal (`--bg-primary`):** `#141923` (Azul carbón profundo templado, evitando el negro absoluto `#000000`).
- **Superficie de Tarjetas (`--bg-card`):** `#1C2433` con borde `#2D3A4F`.
- **Superficie Secundaria / Código (`--bg-secondary`):** `#0F141D`.
- **Texto Principal (`--text-primary`):** `#F1F5F9` (Blanco cálido).
- **Texto Secundario (`--text-secondary`):** `#CBD5E1`.
- **Acento Primario (`--accent-primary`):** `#38BDF8` (Cian sereno).
- **Acento Éxito (`--accent-success`):** `#34D399`.
- **Acento Tarea Conceptual (`--accent-warning`):** `#FBBF24`.

## 2. Tipografía y Regla 7.4 de Ancho y Legibilidad
- **Fuente Principal (`--font-sans`):** Pila nativa de alta legibilidad offline (`'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif`).
- **Fuente de Código (`--font-mono`):** `'JetBrains Mono', 'Cascadia Code', Consolas, monospace`.
- **Composición de Prosa (Regla 7.4):**
  - Todo bloque de lectura ocupa el 100 % del ancho interno de su columna (`inline-size: 100%; max-inline-size: 100%`), sin topes arbitrarios en `ch`.
  - Justificación adaptativa (`text-align: justify; text-align-last: start`) en regiones de lectura $\ge 40\text{rem}$, gestionada en conjunto con `devbrain-prose.css` y `devbrain-prose.js`.
  - Prohibido el uso de `text-overflow: ellipsis` o truncamiento de líneas (`line-clamp`) sobre contenido formativo.

## 3. Arquitectura de Componentes (Bento Grid y Maestro-Detalle)
- **Primer Viewport (Anti-Lienzo Desértico):** El Hub Principal (`index.html`) abre con un Bento Grid que presenta el Caso Conductor, los KPIs de avance en ambas rutas (Antigravity 20 y Canvas 20), el acceso directo a las 5 páginas y las 5 Estaciones del Portafolio de Evidencias.
- **Vista Maestro-Detalle de Ejercicios:** Lista lateral filtrable por nivel (Niveles 1 a 4), estado y búsqueda instantánea, junto a un panel de detalle con:
  1. Guía operativa en 4 fases.
  2. Kit Semilla descargable con 1 clic (`@archivo`).
  3. Prompt Inicial copiable con `/plan`.
  4. Tarea Conceptual Activa + **Simulador Determinista del Caso Testigo** (4 estados).
  5. Prompt de Refinamiento y Auditoría con `/browser`.

## 4. Impresión Institucional SENA (`css/print.css`)
- Formato carta vertical (`size: letter portrait; margin: 10mm 12mm`), fondo blanco `#FFFFFF` forzado, ocultamiento de barras de navegación y controles interactivos (`.no-print`), conservando íntegro el Portafolio de Evidencias y sus tablas de criterios.
