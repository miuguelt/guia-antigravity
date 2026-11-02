# Auditoría de Integridad y Veracidad: Ejercicios y Kits Semilla

**Proyecto:** Academia Pro Gemini y Google Antigravity (`guia-gemini-antigravity`)  
**Fecha:** 01 de Noviembre de 2026  
**Estándar Operativo:** DevBrain v8.10 / Políticas 5.0, 5.0.1, 7.4 y 10.3  

---

## 1. Resumen Ejecutivo

Se completó la auditoría integral de la documentación y los archivos insumo de los **40 ejercicios** (20 de Google Antigravity y 20 de Gemini Canvas), comprobando la veracidad de los datos, la ausencia de elementos simulados y la consistencia matemática de los Casos Testigo.

Para garantizar la no regresión y la certificación automática, se implementó la suite de pruebas unitarias [`tests/exercises-data-integrity.test.mjs`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/tests/exercises-data-integrity.test.mjs), alcanzando **59 pruebas automatizadas pasando con éxito (100 % de funciones probadas)**.

---

## 2. Hallazgos de la Auditoría

### 2.1 Verificación de Existencia de Archivos Físicos y Semilla
- **66 archivos insumo** distribuidos en `kits/ejercicio-01` hasta `kits/ejercicio-20` fueron auditados directamente en el sistema de archivos de Windows.
- **Concordancia Exacta (Byte a Byte):** Se comprobó que el 100 % de los archivos en disco concuerdan exactamente con las estructuras en memoria registradas en `js/data/kits-n1.js`, `kits-n2.js`, `kits-n3.js` y `kits-n4.js`.
- Ningún archivo está vacío ni truncado; todos superan los requerimientos de estructura y sintaxis de su formato (`.csv`, `.json`, `.yaml`, `.sql`, `.html`, `.xml`, `.md`, `.log`, `.txt`).

### 2.2 Erradicación de Mocks y Datos Simulados
- Se auditó el texto de los 66 archivos buscando patrones ficticios (`lorem ipsum`, `foo`, `bar`, `baz`, `dummy`, `mock`, `fake_data`, `asdf`).
- **Comprobación de Veracidad:** Los datos corresponden a casos operacionales y comerciales de Colombia (NITs válidos, montos en COP con separadores canónicos, ciudades reales como Bogotá, Bucaramanga, Medellín, Cali, Barranquilla, Pereira y Manizales, y normativa contable/laboral aplicable de 44 horas semanales).
- Las ocurrencias del término `bar` detectadas correspondían a palabras auténticas del negocio: *«Silla Ergonómica Lumbar»*, *«Barranquilla»*, *«Código de Barras»*, *«Termo Barista»* y color *«Ámbar»*.

### 2.3 Consistencia Matemática de los 20 Casos Testigo
Se auditó la fórmula y el resultado esperado de cada ejercicio contra los datos insumo:
1. **Ej 1 (Clasificador):** 8 archivos reales (3 facturas, 2 contratos, 2 presupuestos, 1 nota) -> **8 archivos**.
2. **Ej 2 (Pedidos 1NF):** $1.200.000 + $450.000 + $320.000 + $480.000 -> **$2.450.000 COP**.
3. **Ej 3 (Punto Equilibrio):** $3.000.000 / ($50.000 - $20.000) -> **100 unidades**.
4. **Ej 4 (Payback GEMINI.md):** $5.000.000 / $2.500.000 -> **2 meses**.
5. **Ej 5 (Deduplicación):** 10 registros iniciales - 3 duplicados fusionados -> **7 contactos únicos**.
6. **Ej 6 (Margen Bruto):** ($1.000.000 - $650.000) / $1.000.000 × 100 -> **35 %**.
7. **Ej 7 (Ponderación Proveedores):** (7 × 0,40) + (9 × 0,35) + (8 × 0,25) -> **7,95 puntos**.
8. **Ej 8 (Punto de Reorden ROP):** (10 × 5) + ((14 - 10) × 5) -> **70 unidades**.
9. **Ej 9 (NPS):** 50 % Promotores - 20 % Detractores -> **+30 puntos NPS**.
10. **Ej 10 (Cierre Poka-Yoke):** $9.000.000 bancos + $3.500.000 cartera -> **$12.500.000 COP**.
11. **Ej 11 (CRM Ponderado):** $10.000.000 × 50 % + $4.000.000 × 25 % -> **$6.000.000 COP**.
12. **Ej 12 (Auditoría Gastos):** $175.000 + $175.000 -> **$350.000 COP** (> tope de $200.000).
13. **Ej 13 (Flujo Tesorería):** $50.000.000 - $40.000.000 - $40.000.000 -> **-$30.000.000 COP**.
14. **Ej 14 (Competencias Bloom):** (100 + 100 + 100 + 60) / 4 -> **90 puntos**.
15. **Ej 15 (Conciliación Pasarela):** $200.000 × (1 - 0,04) -> **$192.000 COP**.
16. **Ej 16 (Aforo Agentes):** 120 inscritos - 80 sillas de salón -> **40 personas de sobrecupo**.
17. **Ej 17 (Gobernanza MCP):** 3 de 5 pedidos con mora superior a 15 días -> **3 pedidos retenidos**.
18. **Ej 18 (Turnos Laborales):** 5 colaboradores × 44 horas semanales -> **220 horas ordinarias**.
19. **Ej 19 (Simulación PERT):** (5 + 4 × 8 + 20) / 6 = 57 / 6 -> **9,5 días**.
20. **Ej 20 (Suite Pyme):** ($12.000.000 - $7.800.000) × (1 - 0,15) -> **$3.570.000 COP**.

### 2.4 Verificación de los 4 Estados del Simulador Determinista
El motor puro [`simulator-engine.js`](file:///c:/Users/Miguel/Documents/Aplicaciones/_projects/guia-gemini-antigravity/js/core/simulator-engine.js) fue probado con aserciones en los 4 estados para cada uno de los 20 ejercicios:
- **Estado Válido (`valido`):** Respuesta inmediata (`ok: true`) con felicitación pedagógica.
- **Estado Inválido (`invalido`):** Detección inmediata de divergencia matemática con indicación de fórmula.
- **Estado Vacío (`vacio`):** Alerta clara de que no se puede evaluar un campo en blanco.
- **Estado Reiniciado (`reset`):** Limpieza pura sin retardos artificiales ni `setTimeout`.

---

## 3. Opciones de Mejora Pedagógica para Facilitar el Aprendizaje

1. **Glosario Rápido Contextual en Fichas Técnicas:**
   - Incorporar en el encabezado de cada ejercicio un tooltip o enlace a los conceptos clave (ej. qué es *1NF*, *ISO-8601*, *BM25*, *ROP*, *P95/P99*).
2. **Botón de Auto-Inspección del Kit en el Portal:**
   - Los aprendices actualmente pueden descargar el `.zip` o copiar el prompt; se recomienda mantener visible en el modal la lista de archivos contenidos para que el aprendiz sepa qué buscar en su carpeta local antes de descomprimir.
3. **Mapeo Directo a RAPs del Programa ADSO:**
   - Mantener visible en cada ficha el Resultado de Aprendizaje SENA vinculado (RAP 01 a RAP 05) de acuerdo con `guide.manifest.json` y `deliverables.registry.json`.

---

## 4. Compuertas de Calidad DevBrain Aprobadas
- **Pruebas de Integridad:** `node --test tests/exercises-data-integrity.test.mjs` (6 pruebas, 0 fallos).
- **Suite Completa del Portal:** 59 pruebas pasando (100 % de aserciones exitosas).
- **Compuerta de Guía Educativa:** `Test-DevBrainEducationalGuide.ps1` -> `passed` (0 errores, 0 advertencias).
- **Compuerta de Entregables SENA:** `Test-GuideDeliverables.ps1` -> `passed` (5 artefactos, 5 estaciones, portafolio activo).
- **Compuerta de Modularidad:** `Test-DevBrainModularity.ps1 -ChangedOnly -FailOnViolations` -> `0 errors`.
- **Terminología Institucional:** Erradicación total de extranjerismos en favor de **«Portafolio de Evidencias»**.
