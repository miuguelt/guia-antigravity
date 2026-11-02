# Estación 1 — Fundamentos: Despegue Sin Código y Contexto (`@`)

> **Aviso sobre los materiales de práctica:** Todos los casos, cifras, documentos y archivos semilla de esta guía fueron diseñados exclusivamente con fines de aprendizaje y no contienen datos personales ni registros empresariales reales.

## 1. Propósito de la estación

En esta primera estación aprenderás a operar el entorno **Google Antigravity** (tanto el *Agent Manager* como el *Editor View*) sin necesidad de conocimientos previos de programación. Dominarás la inyección de contexto mediante `@menciones` de archivos locales, el uso de comandos rápidos (`/`) y la técnica pedagógica de la **Tarea Conceptual en Paralelo** mientras el agente construye tus primeras herramientas web.

---

## 2. Ejercicios incluidos (Nivel 1: Ejercicios 01 al 05)

| # | Ejercicio | Perfil | Archivo Semilla (`@`) | Caso Testigo de Verificación |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Mi Tarjeta de Presentación Digital | Profesional Independiente | `mi_perfil.txt` | Conteo exacto de canales de contacto e integridad de enlaces |
| **02** | Calculadora de Gastos Compartidos | Organizador de Viajes / Hogar | `gastos_viaje.txt` | `$180.000 / 4 personas + 10 % propina = $49.500 COP/persona` |
| **03** | El Organizador de Recetas del Abuelo | Emprendedor Gastronómico | `recetas_abuelo.txt` | Escalado proporcional de ingredientes de `4` a `10` porciones (`x2.5`) |
| **04** | Tablero de Hábitos y Metas Semanales | Coach / Uso Personal | `habitos_metas.csv` | `5 días cumplidos de 7 = 71,4 %` de avance semanal |
| **05** | Generador de Cotizaciones Rápidas | Consultor / Freelancer | `tarifario_base.csv` | Subtotal `$1.000.000 - 10 % dcto ($900.000) + 19 % IVA = $1.071.000 COP` |

> En la página [Ruta Antigravity](../ruta-antigravity.html) puedes descargar con un clic el archivo semilla de cada ejercicio y comprobar tus cálculos en el simulador determinista antes de validar la entrega del agente.

---

## 3. Conceptos clave que debes dominar

1. **Agent Manager vs. Editor View:**
   - El **Agent Manager** (`Ctrl+E` o vista de misiones) es tu centro de mando para lanzar tareas completas y revisar artefactos.
   - El **Editor View** te permite inspeccionar archivos, usar autocompletado con `Tab` y hacer ajustes puntuales con edición en línea (`Ctrl+I`).
2. **Inyección de contexto con `@menciones`:**
   - En lugar de copiar y pegar textos largos dentro del chat, guarda tus datos en un archivo local (`.txt` o `.csv`) y escribe `@nombre_archivo` en tu prompt. Así evitas que la inteligencia artificial invente precios, nombres o reglas.
3. **La Tarea Conceptual en Paralelo:**
   - Mientras Gemini razona y escribe el código (30 a 90 segundos), nunca te quedes mirando la pantalla en blanco: diseña en papel tu **Caso Testigo** (un cálculo manual con respuesta conocida) y la lista de criterios de aceptación.

---

## 4. Entregable de la estación (`MG-A01`)

Para completar la **Estación 1** en el [Hub Principal](../index.html#m01-fundamentos), registra la siguiente evidencia:

- **Artefacto:** `MG-A01 — Kit de Contexto Semilla y Pruebas de Nivel 1 (Ejercicios 01 a 05)`.
- **Contenido mínimo requerido:**
  1. Descripción de los 5 archivos semilla (`@mi_perfil.txt`, `@gastos_viaje.txt`, `@recetas_abuelo.txt`, `@habitos_metas.csv`, `@tarifario_base.csv`) utilizados en tus pruebas.
  2. Resultado verificado de los 5 **Casos Testigo** (confirmando que la aplicación generada por Gemini arroja exactamente el mismo valor que tu cálculo manual).
  3. Tres aprendizajes sobre cómo las `@menciones` evitaron alucinaciones de datos.
