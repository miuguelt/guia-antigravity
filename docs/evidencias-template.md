# Plantilla Maestra para el Portafolio de Evidencias

Usa esta estructura como guía para redactar cada una de las 5 entregas (`MG-A01` a `MG-A05`) dentro del [Hub Principal](../index.html#portafolio-evidencias). Escribir con este formato garantiza que tanto tu instructor como cualquier auditoría técnica puedan verificar de inmediato qué construiste, con qué datos lo probaste y qué aprendiste.

---

## Formato recomendado para cada estación

```markdown
### 1. Contexto y Archivos Semilla Utilizados
- **Estación / Nivel:** [Ej: Estación 1 — Nivel 1 (Ejercicios 01 a 05)]
- **Archivos `@` inyectados:** [Ej: @mi_perfil.txt, @gastos_viaje.txt, @tarifario_base.csv]
- **Comandos de Antigravity aplicados:** [Ej: /grill-me, /plan, /browser, Tab, Ctrl+I]

### 2. Verificación Matemática con Caso Testigo
- **Ejercicio auditado:** [Ej: Ejercicio 05 — Generador de Cotizaciones Rápidas]
- **Datos de entrada:** [Ej: Subtotal = $1.000.000 COP | Descuento = 10 % | IVA = 19 %]
- **Cálculo manual esperado:** [Ej: $1.000.000 * 0.90 = $900.000 -> * 1.19 = $1.071.000 COP]
- **Resultado arrojado por la aplicación:** [Ej: $1.071.000 COP — Coincidencia exacta 100 %]

### 3. Pruebas de los 4 Estados Obligatorios
1. **Estado Válido:** [Confirmado con el Caso Testigo anterior]
2. **Estado Inválido:** [Ej: Al ingresar cantidad -5, la app muestra alerta clara y bloquea el cálculo]
3. **Estado Vacío:** [Ej: Al dejar el campo en blanco, solicita completar los datos sin mostrar NaN]
4. **Estado Reinicio (Reset):** [Ej: El botón Limpiar restaura los valores de demostración iniciales]

### 4. Aprendizaje de la Tarea Conceptual en Paralelo
- [Explica en 2 o 3 oraciones qué regla de negocio o concepto técnico comprendiste mientras el agente generaba el código y cómo evitarías errores futuros].
```

---

## Tabla de referencia rápida de los 5 entregables

| Código | Estación | Nombre del Entregable | Ejercicios Cubiertos |
| :--- | :--- | :--- | :--- |
| **MG-A01** | `m01-fundamentos` | Kit de Contexto Semilla y Pruebas de Nivel 1 | Antigravity 01 al 05 |
| **MG-A02** | `m02-diseno` | Matriz de Especificación Funcional y Flujos Nivel 2 | Antigravity 06 al 10 |
| **MG-A03** | `m03-implementacion` | Paquete de Reglas `GEMINI.md`, `SKILL.md` y Auditoría `/browser` | Antigravity 11 al 15 |
| **MG-A04** | `m04-validacion` | Verificación de Sistemas Nivel 4 y Puente Ruta Canvas | Antigravity 16 al 20 + Canvas 01 al 20 |
| **MG-A05** | `m05-cierre` | Proyecto Graduación Pyme, Memoria Multi-IDE y Sustentación | Integración Total + Memoria Multi-IDE |
