# Estación 4 — Validación: Sistemas Completos, `/goal`, `/boost`, `MCP` y Ruta Canvas

## 1. Propósito de la estación

En la cuarta estación alcanzarás el nivel más avanzado del portal: orquestarás sistemas completos que integran múltiples fuentes de datos, conexiones externas mediante **MCP (Model Context Protocol)**, metas autónomas con `/goal` y razonamiento profundo con `/boost`. Además, conectarás este aprendizaje con la **Ruta Gemini Canvas** (20 ejercicios adicionales de ingeniería de software) aprendiendo cómo migrar prototipos de Canvas hacia un repositorio profesional en Antigravity IDE.

---

## 2. Ejercicios incluidos (Nivel 4: Ejercicios 16 al 20 + Puente a Ruta Canvas)

| # | Ejercicio | Perfil | Archivo Semilla (`@`) | Caso Testigo de Verificación |
| :--- | :--- | :--- | :--- | :--- |
| **16** | Conexión a Fuentes Externas (`MCP`) | Analista de Inteligencia | `mcp_config_ejemplo.json` | Consulta cruzada de inventario + órdenes sin exponer llaves secretas |
| **17** | CRM Ligero de Seguimiento Comercial | Director Comercial | `cartera_clientes.csv` | Valor ponderado del embudo (`Pipeline = $14.500.000 COP`) según probabilidad |
| **18** | Auditoría de Contratos y Alertas de Vencimiento | Jurídico / Administrativo | `contratos_vigentes.json` | Clasificación por días restantes (`<= 15 días = Crítico`, `16–45 = Alerta`, `> 45 = Vigente`) |
| **19** | El Orquestador Nocturno con `/goal` y `/boost` | Gerente de Operaciones | `meta_auditoria_anual.md` | Consolidación de 3 sedes con detección automática de desviación `> 10 %` |
| **20** | Proyecto Graduación: Mi Sistema Operativo Pyme | Fundador / Intraemprendedor | `sistema_pyme_semilla.json` | Flujo de caja neto (`Ingresos $12.000.000 - Egresos $7.800.000 - Reserva 15 % = $3.570.000 COP`) |

---

## 3. Puente entre Gemini Canvas y Antigravity IDE

En la página [Ruta Gemini Canvas](../ruta-canvas.html) encontrarás 20 proyectos de ingeniería (desde conversores y simuladores físicos hasta tableros financieros y editores Markdown). Para llevar cualquier prototipo de Canvas a calidad de producción en Antigravity:

1. **Exporta el prototipo de Canvas** a tu carpeta de proyecto y divídelo en módulos (`index.html`, `css/`, `js/core/`, `js/ui/`) respetando el límite de **menos de 250 líneas por archivo**.
2. **Crea la memoria multi-IDE** (`AI-PROJECT-MEMORY.md` y `GEMINI.md`) para que cualquier agente comprenda la arquitectura.
3. **Extrae la lógica de negocio a funciones puras** y agrega pruebas unitarias automatizadas para asegurar que ninguna actualización futura rompa las fórmulas.

---

## 4. Entregable de la estación (`MG-A04`)

Para completar la **Estación 4** en el [Hub Principal](../index.html#m04-validacion), registra la siguiente evidencia:

- **Artefacto:** `MG-A04 — Verificación de Sistemas Integrados Nivel 4 y Puente Canvas (Ejercicios 16 a 20)`.
- **Contenido mínimo requerido:**
  1. Verificación del **Caso Testigo** del Ejercicio 17 (CRM embudo ponderado) y del Ejercicio 20 (Flujo de caja neto del Sistema Operativo Pyme).
  2. Explicación de cómo el protocolo de 6 pasos (`/grill-me` → `/plan` → `@archivos` + `GEMINI.md` → `/browser` → revisión de *diffs* → `/learn`) previno regresiones.
  3. Selección de al menos 2 ejercicios de la **Ruta Gemini Canvas** describiendo cómo los modularizarías en Antigravity IDE.
