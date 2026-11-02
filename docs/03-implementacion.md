# Estación 3 — Implementación: Automatización, Reglas `GEMINI.md` y `Skills`

## 1. Propósito de la estación

En la tercera estación aprenderás a transformar a Gemini en un equipo de ingeniería disciplinado que recuerda tus estándares sin que tengas que repetirlos en cada prompt. Configurarás el archivo `GEMINI.md` como memoria permanente del espacio de trabajo, empaquetarás flujos repetitivos en habilidades reutilizables (`.agents/skills/<nombre>/SKILL.md`) e inspeccionarás la interfaz viva con el subagente `/browser`.

---

## 2. Ejercicios incluidos (Nivel 3: Ejercicios 11 al 15)

| # | Ejercicio | Perfil | Archivo Semilla (`@`) | Caso Testigo de Verificación |
| :--- | :--- | :--- | :--- | :--- |
| **11** | Mi Manual de Marca y Reglas (`GEMINI.md`) | Director de Marca / Líder | `GEMINI.md` | Verificación de contraste accesible (`>= 4.5:1`), moneda `COP` y tono `es-CO` |
| **12** | Validador Automático con `/browser` | Auditor de Calidad / Operaciones | `casos_prueba_ui.json` | Detección de campos vacíos, precios negativos y desbordamiento móvil (`320px`) |
| **13** | Creador de Habilidades (`SKILL.md`) | Analista de Procesos | `SKILL.md` | Aplicación automática de estructura de informe ejecutivo con 4 secciones fijas |
| **14** | Asistente de Conciliación de Facturas vs. Bancos | Tesorería / Contabilidad | `extracto_vs_facturas.csv` | Detección exacta de diferencias: `3 conciliadas, 1 pendiente ($350.000), 1 sobrante` |
| **15** | Generador de Actas de Reunión y Compromisos | Gerencia de Proyectos | `transcripcion_reunion.txt` | Extracción de `4 compromisos` con responsable, fecha límite y semáforo de riesgo |

---

## 3. Cómo estructurar la memoria y las habilidades de la IA

### 3.1 Estructura recomendada de `GEMINI.md`
Todo proyecto profesional debe incluir en su raíz un archivo `GEMINI.md` con cuatro bloques claros:
1. **Identidad y propósito del proyecto:** Qué resuelve y para quién.
2. **Reglas de negocio innegociables:** Moneda (`COP`), idioma (`es-CO`), fórmulas oficiales y prohibición de datos inventados.
3. **Estándar visual y de accesibilidad:** Paleta de colores, tipografía legible, diseño adaptable y hoja de impresión `@media print`.
4. **Protocolo de verificación:** Obligación de probar los 4 estados (`válido`, `inválido`, `vacío`, `reset`) antes de dar por terminada una tarea.

### 3.2 Estructura de una habilidad (`.agents/skills/<nombre>/SKILL.md`)
Cuando descubras que pides el mismo tipo de análisis o reporte todas las semanas, conviértelo en una habilidad con:
- **Encabezado YAML (`frontmatter`):** `name` y `description` precisos para que Antigravity sepa cuándo activarla automáticamente.
- **Instrucciones paso a paso:** Entradas esperadas, reglas de transformación, formato de salida y lista de chequeo de calidad.

---

## 4. Entregable de la estación (`MG-A03`)

Para completar la **Estación 3** en el [Hub Principal](../index.html#m03-implementacion), registra la siguiente evidencia:

- **Artefacto:** `MG-A03 — Paquete de Reglas GEMINI.md, Habilidad SKILL.md y Auditoría /browser (Ejercicios 11 a 15)`.
- **Contenido mínimo requerido:**
  1. El contenido completo de tu archivo `GEMINI.md` personalizado (puedes generarlo en el [Laboratorio de Prompts](../laboratorio-prompts.html)).
  2. La definición de tu habilidad `SKILL.md` para automatizar una tarea frecuente de tu área.
  3. El resultado de la conciliación del Ejercicio 14 y la validación visual con `/browser`.
