# Estación 2 — Diseño: Flujo Operativo, Entrevistas `/grill-me` y Planes `/plan`

## 1. Propósito de la estación

En la segunda estación pasarás de crear herramientas individuales a diseñar aplicaciones operativas con múltiples estados, tableros Kanban, lectura de archivos CSV reales y persistencia en el navegador (`localStorage`). Aprenderás a usar `/grill-me` para que el agente te haga preguntas de descubrimiento antes de programar y `/plan` para revisar y aprobar el diseño arquitectónico antes de tocar una sola línea de código.

---

## 2. Ejercicios incluidos (Nivel 2: Ejercicios 06 al 10)

| # | Ejercicio | Perfil | Archivo Semilla (`@`) | Caso Testigo de Verificación |
| :--- | :--- | :--- | :--- | :--- |
| **06** | Semáforo de Tareas Pendientes (Kanban) | Coordinador de Equipos | `tareas_equipo.csv` | Conteo por columna (`3 Pendientes, 2 En Curso, 5 Listas = 50 % avance`) |
| **07** | Lector Visual de Ventas en Excel/CSV | Comerciante / Analista | `ventas_trimestre.csv` | Suma exacta de ventas del trimestre (`$4.850.000 COP`) y ticket promedio |
| **08** | Directorio Interactivo de Proveedores | Compras / Logística | `proveedores_locales.csv` | Filtro combinado por ciudad (`Bogotá`) + categoría (`Insumos`) = `3 registros` |
| **09** | Simulador de Préstamos y Cuotas | Asesor Financiero / Pyme | `tasas_referencia.json` | Cuota fija mensual para `$10.000.000` a `12 meses` al `1,5 % MV` = `$916.800 COP` |
| **10** | Creador de Encuestas de Satisfacción (NPS) | Servicio al Cliente | `respuestas_nps.csv` | `% Promotores (60 %) - % Detractores (20 %) = NPS +40` |

---

## 3. Protocolo de diseño antes de implementar

1. **Entrevista de descubrimiento con `/grill-me`:**
   - Cuando tengas una idea de negocio pero no estés seguro de todos los casos borde (por ejemplo, ¿qué pasa si la tasa de interés es `0 %` o si el CSV viene con punto y coma `;` en vez de coma `,`?), inicia tu solicitud con `/grill-me`.
   - El agente te formulará preguntas concretas para cerrar vacíos antes de proponer código.
2. **Aprobación de arquitectura con `/plan`:**
   - Pide siempre `/plan` en proyectos de Nivel 2 o superior. Revisa el artefacto `implementation_plan.md` que genera Antigravity y deja comentarios directamente sobre las líneas del plan si deseas ajustar una fórmula o una columna antes de dar clic en aprobar.
3. **Persistencia local (`localStorage`) y estados vacíos:**
   - Toda aplicación operativa debe conservar sus datos al recargar la página (`F5`) y ofrecer un botón de **Restablecer datos de demostración** (`reset`).

---

## 4. Entregable de la estación (`MG-A02`)

Para completar la **Estación 2** en el [Hub Principal](../index.html#m02-diseno), registra la siguiente evidencia:

- **Artefacto:** `MG-A02 — Matriz de Especificación Funcional y Flujos Operativos Nivel 2 (Ejercicios 06 a 10)`.
- **Contenido mínimo requerido:**
  1. Resumen de las decisiones tomadas con `/grill-me` y `/plan` para al menos dos ejercicios del Nivel 2.
  2. Especificación de las fórmulas matemáticas verificadas en el simulador de Casos Testigo (especialmente el cálculo de cuota francesa del Ejercicio 09 y el NPS del Ejercicio 10).
  3. Verificación de los 4 estados obligatorios en cada interfaz: **entrada válida**, **entrada inválida**, **entrada vacía** y **reinicio (`reset`)**.
