/**
 * tests/exercises-data-integrity.test.mjs
 * 
 * Suite de Verificación Rigurosa de Integridad de Datos, Consistencia Matemática
 * y Veracidad de Archivos para los 46 Ejercicios de la Academia Antigravity & Canvas.
 * 
 * Valida:
 * 1. Que los 46 ejercicios (26 Antigravity + 20 Canvas) tengan documentación completa y pedagógica.
 * 2. Que todos los archivos de kits requeridos existan físicamente en el disco (kits/ejercicio-XX).
 * 3. Que el contenido de los archivos en disco coincida byte a byte con los generadores de memoria.
 * 4. Que los datos de los 26 kits de Antigravity sean consistentes, no tengan textos simulados/dummy.
 * 5. Que las fórmulas de los 26 Casos Testigo cuadren (el recálculo desde los kits vive en exercises-pedagogy.test.mjs).
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Importar módulos de datos de la aplicación
import agN1N2 from '../js/data/ag-exercises-n1-n2.js';
import agN3N4 from '../js/data/ag-exercises-n3-n4.js';
import canvasN1N2 from '../js/data/canvas-exercises-n1-n2.js';
import canvasN3N4 from '../js/data/canvas-exercises-n3-n4.js';

import kitsN1 from '../js/data/kits-n1.js';
import kitsN2 from '../js/data/kits-n2.js';
import kitsN3 from '../js/data/kits-n3.js';
import kitsN4 from '../js/data/kits-n4.js';
import kitsN5 from '../js/data/kits-n5.js';
import toolsMap from '../js/data/antigravity-tools-map.js';

import simEngine from '../js/core/simulator-engine.js';

const allAgExercises = [...agN1N2.AG_EXERCISES_N1_N2, ...agN3N4.AG_EXERCISES_N3_N4];
const allCanvasExercises = [...canvasN1N2.CANVAS_EXERCISES_N1_N2, ...canvasN3N4.CANVAS_EXERCISES_N3_N4];
const allKits = {
  ...kitsN1.KITS_N1,
  ...kitsN2.KITS_N2,
  ...kitsN3.KITS_N3,
  ...kitsN4.KITS_N4,
  ...(kitsN5 ? kitsN5.KITS_N5 : {})
};

test('1. Documentación pedagógica completa en los 26 ejercicios de Antigravity', () => {
  assert.equal(allAgExercises.length, 26, 'Deben existir exactamente 26 ejercicios de Antigravity');

  allAgExercises.forEach((ex, idx) => {
    const id = idx + 1;
    assert.equal(ex.id, id, `Ejercicio ${id} debe tener ID correlativo`);
    assert.ok(ex.title && ex.title.trim().length > 10, `Ejercicio ${id}: título descriptivo`);
    assert.ok(ex.level >= 1 && ex.level <= 4, `Ejercicio ${id}: nivel entre 1 y 4`);
    assert.ok(ex.goal && ex.goal.trim().length > 20, `Ejercicio ${id}: objetivo formativo claro`);
    assert.ok(ex.businessChallenge && ex.businessChallenge.trim().length > 20, `Ejercicio ${id}: reto de negocio real`);
    assert.ok(ex.agentRoleAction && ex.agentRoleAction.trim().length > 15, `Ejercicio ${id}: rol del agente`);
    assert.ok(ex.learnerParallelAction && ex.learnerParallelAction.trim().length > 15, `Ejercicio ${id}: acción paralela del aprendiz`);
    assert.ok(ex.professionalOutputCriteria && ex.professionalOutputCriteria.trim().length > 20, `Ejercicio ${id}: criterio de entrega profesional`);
    assert.ok(Array.isArray(ex.antigravitySteps) && ex.antigravitySteps.length >= 3, `Ejercicio ${id}: al menos 3 pasos guiados`);
    assert.ok([ex.initialPrompt, ...ex.antigravitySteps].join(' ').match(/Planning|\/grill-me|\/goal/), `Ejercicio ${id}: planea en modo Planning, /grill-me o /goal`);
    assert.ok(ex.conceptualTaskTitle && ex.conceptualTaskTitle.length > 5, `Ejercicio ${id}: título de tarea conceptual`);
    assert.ok(ex.conceptualTheory && ex.conceptualTheory.length > 30, `Ejercicio ${id}: fundamentación teórica`);
    assert.ok(Array.isArray(ex.conceptualTaskSteps) && ex.conceptualTaskSteps.length >= 2, `Ejercicio ${id}: pasos de tarea conceptual`);
    assert.ok(ex.parallelToolPrompt && ex.parallelToolPrompt.length > 15, `Ejercicio ${id}: prompt para indagar conceptos`);
    assert.ok(ex.refinementPrompt && ex.refinementPrompt.length > 15, `Ejercicio ${id}: prompt de refinamiento`);
    assert.ok(ex.kit && ex.kit.filename, `Ejercicio ${id}: definición de kit insumo`);
    assert.ok(ex.testCase && typeof ex.testCase.expectedValue === 'number', `Ejercicio ${id}: caso testigo numérico`);
  });
});

test('2. Documentación pedagógica completa en los 20 ejercicios de Gemini Canvas', () => {
  assert.equal(allCanvasExercises.length, 20, 'Deben existir exactamente 20 ejercicios de Canvas');

  allCanvasExercises.forEach((ex, idx) => {
    const id = idx + 1;
    assert.equal(ex.id, id, `Ejercicio Canvas ${id} debe tener ID correlativo`);
    assert.ok(ex.title && ex.title.trim().length > 10, `Ejercicio Canvas ${id}: título descriptivo`);
    assert.ok(ex.level >= 1 && ex.level <= 4, `Ejercicio Canvas ${id}: nivel entre 1 y 4`);
    assert.ok(ex.goal && ex.goal.trim().length > 20, `Ejercicio Canvas ${id}: objetivo formativo`);
    assert.ok(ex.initialPrompt && ex.initialPrompt.length > 30, `Ejercicio Canvas ${id}: prompt inicial`);
    assert.ok(ex.studyTopic && ex.studyTopic.length > 5, `Ejercicio Canvas ${id}: tema de estudio en paralelo`);
    assert.ok(ex.studyExplanation && ex.studyExplanation.length > 25, `Ejercicio Canvas ${id}: explicación de estudio`);
    assert.ok(Array.isArray(ex.studyKeyPoints) && ex.studyKeyPoints.length >= 2, `Ejercicio Canvas ${id}: puntos clave`);
    assert.ok(ex.parallelStudyPrompt && ex.parallelStudyPrompt.length > 15, `Ejercicio Canvas ${id}: prompt de estudio`);
    assert.ok(ex.refinementPrompt && ex.refinementPrompt.length > 15, `Ejercicio Canvas ${id}: prompt de refinamiento`);
    assert.ok(Array.isArray(ex.stepByStepGuide) && ex.stepByStepGuide.length >= 2, `Ejercicio Canvas ${id}: guía paso a paso`);
    assert.ok(ex.antigravityBridge && ex.antigravityBridge.length > 20, `Ejercicio Canvas ${id}: puente hacia Antigravity IDE`);
  });
});

test('3. Verificación de existencia de todos los archivos de kits en disco (kits/ejercicio-XX)', () => {
  assert.equal(Object.keys(allKits).length, 26, 'Deben existir 26 kits registrados');

  let totalFilesChecked = 0;
  for (let id = 1; id <= 26; id++) {
    const kit = allKits[id];
    assert.ok(kit, `Kit ${id} debe existir en el registro`);
    assert.ok(kit.folderName, `Kit ${id} debe especificar folderName`);
    const kitPath = path.join(process.cwd(), 'kits', kit.folderName);
    assert.ok(fs.existsSync(kitPath), `Directorio del kit debe existir en disco: ${kitPath}`);

    assert.ok(Array.isArray(kit.files) && kit.files.length >= 3, `Kit ${id} debe tener al menos 3 archivos insumo`);

    kit.files.forEach(f => {
      totalFilesChecked++;
      const filePath = path.join(kitPath, f.filename);
      assert.ok(fs.existsSync(filePath), `Archivo debe existir en disco: ${filePath}`);

      // Comprobar que no esté vacío
      const stat = fs.statSync(filePath);
      assert.ok(stat.size > 20, `Archivo ${f.filename} en Kit ${id} no debe estar vacío (${stat.size} bytes)`);

      // Comprobar concordancia exacta de contenido
      const diskContent = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
      const memContent = f.content.replace(/\r\n/g, '\n');
      assert.equal(diskContent, memContent, `Contenido de ${f.filename} en Kit ${id} coincide exactamente con la memoria`);
    });
  }

  assert.equal(totalFilesChecked, 84, 'Se validaron exactamente 84 archivos insumo reales en disco');
});

test('4. Ausencia de datos simulados, textos falsos o placeholders dummy en los 84 archivos', () => {
  const dummyIndicators = ['lorem ipsum', 'dolor sit amet', 'foo bar', 'placeholder', 'asdf', 'fake_data'];

  for (let id = 1; id <= 26; id++) {
    const kit = allKits[id];
    kit.files.forEach(f => {
      const lower = f.content.toLowerCase();
      dummyIndicators.forEach(indicator => {
        assert.ok(
          !lower.includes(indicator),
          `El archivo ${f.filename} del Kit ${id} no debe contener texto dummy: "${indicator}"`
        );
      });
    });
  }
});

test('5. Auditoría de Veracidad y Coherencia Matemática de los 26 Casos Testigo', () => {
  // Ejercicio 1: Conteo de archivos clasificados (8 archivos en 4 carpetas)
  assert.equal(allKits[1].files.length, 8);
  assert.equal(allAgExercises[0].testCase.expectedValue, 8);

  // Ejercicio 2: Suma de pedidos normalizados
  // $1.200.000 + $450.000 + $320.000 + $480.000 = $2.450.000 COP
  const sum2 = 1200000 + 450000 + 320000 + 480000;
  assert.equal(sum2, 2450000);
  assert.equal(allAgExercises[1].testCase.expectedValue, sum2);

  // Ejercicio 3: Punto de Equilibrio Operativo
  // Costos Fijos = $3.000.000, Costo Variable = $20.000, Precio = $50.000
  // PE = 3.000.000 / (50.000 - 20.000) = 100 unidades
  const pe3 = 3000000 / (50000 - 20000);
  assert.equal(pe3, 100);
  assert.equal(allAgExercises[2].testCase.expectedValue, pe3);

  // Ejercicio 4: Fases contractuales auditadas de implementación y garantía (SCQA bimestral)
  // Inversión $5.000.000 COP estructurada en 2 fases de entrega bimestral con acta de conformidad
  const fases4 = 2;
  assert.equal(fases4, 2);
  assert.equal(allAgExercises[3].testCase.expectedValue, fases4);
  assert.equal(allAgExercises[3].testCase.unit, 'fases');

  // Ejercicio 5: Registros únicos tras deduplicación exacta y aproximada (10 filas brutas -> 7 únicos)
  const rows5 = allKits[5].files.find(f => f.filename === 'contactos_duplicados.csv').content.trim().split('\n').slice(1);
  assert.equal(rows5.length, 10);
  assert.equal(allAgExercises[4].testCase.expectedValue, 7);

  // Ejercicio 6: Margen Bruto Real
  // (Precio $1.000.000 - Costo $650.000) / $1.000.000 * 100 = 35 %
  const m6 = ((1000000 - 650000) / 1000000) * 100;
  assert.equal(m6, 35);
  assert.equal(allAgExercises[5].testCase.expectedValue, m6);

  // Ejercicio 7: Evaluación de Proveedores Ponderada
  // Precio: 7 * 0.40 = 2.80; Calidad: 9 * 0.35 = 3.15; Rapidez: 8 * 0.25 = 2.00; Suma = 7.95
  const score7 = (7 * 0.40) + (9 * 0.35) + (8 * 0.25);
  assert.equal(Math.round(score7 * 100) / 100, 7.95);
  assert.equal(allAgExercises[6].testCase.expectedValue, 7.95);

  // Ejercicio 8: Punto de Reorden ROP
  // (Demanda Prom 10 * Plazo 5) + ((Demanda Max 14 - Demanda Prom 10) * Plazo 5) = 50 + 20 = 70 unidades
  const rop8 = (10 * 5) + ((14 - 10) * 5);
  assert.equal(rop8, 70);
  assert.equal(allAgExercises[7].testCase.expectedValue, rop8);

  // Ejercicio 9: NPS (Net Promoter Score)
  // 10 Promotores (50 %), 6 Pasivos (30 %), 4 Detractores (20 %) sobre 20 encuestas
  // NPS = 50 - 20 = +30 puntos
  const nps9 = ((10 / 20) * 100) - ((4 / 20) * 100);
  assert.equal(nps9, 30);
  assert.equal(allAgExercises[8].testCase.expectedValue, nps9);

  // Ejercicio 10: Cuadre de Caja de Cierre Semanal
  // Bancos ($9.000.000) + Cartera pendiente ($3.500.000) = $12.500.000 COP
  const sum10 = 9000000 + 3500000;
  assert.equal(sum10, 12500000);
  assert.equal(allAgExercises[9].testCase.expectedValue, sum10);

  // Ejercicio 11: Valor Ponderado del Pipeline CRM
  // Negocio A ($10.000.000 al 50 %) + Negocio B ($4.000.000 al 25 %) = $5.000.000 + $1.000.000 = $6.000.000 COP
  const crm11 = (10000000 * 0.50) + (4000000 * 0.25);
  assert.equal(crm11, 6000000);
  assert.equal(allAgExercises[10].testCase.expectedValue, crm11);

  // Ejercicio 12: Detección de Gasto Fraccionado
  // Dos recibos el mismo día de $175.000 c/u = $350.000 COP (supera tope de $200.000)
  const g12 = 175000 + 175000;
  assert.equal(g12, 350000);
  assert.equal(allAgExercises[11].testCase.expectedValue, g12);

  // Ejercicio 13: Saldo de Tesorería al Mes 2 con Venta a 60 días
  // Saldo inicial ($50.000.000) - Pagos Enero ($40.000.000) - Pagos Febrero ($40.000.000) = -$30.000.000 COP
  const saldo13 = 50000000 - 40000000 - 40000000;
  assert.equal(saldo13, -30000000);
  assert.equal(allAgExercises[12].testCase.expectedValue, saldo13);

  // Ejercicio 14: Calificación Media de Competencias
  // (100 + 100 + 100 + 60) / 4 = 90 puntos
  const avg14 = (100 + 100 + 100 + 60) / 4;
  assert.equal(avg14, 90);
  assert.equal(allAgExercises[13].testCase.expectedValue, avg14);

  // Ejercicio 15: Conciliación Pasarela
  // Venta $200.000 * (1 - 0.04 comisión) = $192.000 COP
  const conc15 = 200000 * (1 - 0.04);
  assert.equal(conc15, 192000);
  assert.equal(allAgExercises[14].testCase.expectedValue, conc15);

  // Ejercicio 16: Sobrecupo en Salón
  // 120 inscritos - 80 sillas de aforo = 40 personas de sobrecupo
  const aforo16 = 120 - 80;
  assert.equal(aforo16, 40);
  assert.equal(allAgExercises[15].testCase.expectedValue, aforo16);

  // Ejercicio 17: Retenciones de Pedidos en Cartera por regla > 15 días
  // En mcp_politicas_seguridad.json hay 5 pedidos: mora de 22, 0, 30, 5, 19 días -> 3 retenciones
  const k17 = allKits[17].files.find(f => f.filename === 'mcp_politicas_seguridad.json');
  const data17 = JSON.parse(k17.content);
  const moraOver15 = data17.lotePedidosBodega.filter(p => p.diasMora > 15).length;
  assert.equal(moraOver15, 3);
  assert.equal(allAgExercises[16].testCase.expectedValue, moraOver15);

  // Ejercicio 18: Horas Ordinarias Semanales Disponibles (Ley 2101 vigente desde julio 2026: 42 h)
  // 5 colaboradores * 42 horas semanales = 210 horas
  const h18 = 5 * 42;
  assert.equal(h18, 210);
  assert.equal(allAgExercises[17].testCase.expectedValue, h18);

  // Ejercicio 19: Duración Esperada PERT
  // (O + 4*M + P) / 6 = (5 + 4*8 + 20) / 6 = 57 / 6 = 9.5 días
  const pert19 = (5 + 4 * 8 + 20) / 6;
  assert.equal(pert19, 9.5);
  assert.equal(allAgExercises[18].testCase.expectedValue, pert19);

  // Ejercicio 20: Flujo de Caja Neto Disponible Pyme
  // ($12.000.000 ingresos - $7.800.000 egresos) = $4.200.000 utilidad * (1 - 0.15 reserva) = $3.570.000 COP
  const net20 = (12000000 - 7800000) * (1 - 0.15);
  assert.equal(net20, 3570000);
  assert.equal(allAgExercises[19].testCase.expectedValue, net20);

  // Ejercicio 21: Edición en línea (Ctrl+I y Tab) - Factura neta con IVA 19 % y Retefuente 2,5 %
  // Base $2.000.000 + IVA $380.000 - Retefuente $50.000 = $2.330.000 COP
  const net21 = 2000000 + (2000000 * 0.19) - (2000000 * 0.025);
  assert.equal(net21, 2330000);
  assert.equal(allAgExercises[20].testCase.expectedValue, net21);

  // Ejercicio 22: Descubrimiento con /grill-me - Comisiones escalonadas sobre venta neta
  // Venta neta $15M ($16M - $1M dev): 5 % sobre meta ($10M) = $500k + 8 % sobre excedente ($5M) = $400k -> $900.000 COP
  const com22 = (10000000 * 0.05) + ((15000000 - 10000000) * 0.08);
  assert.equal(com22, 900000);
  assert.equal(allAgExercises[21].testCase.expectedValue, com22);

  // Ejercicio 23: Terminal con permisos (Sandbox) - Lote de nómina sin cuenta duplicada
  // Lote bruto $18.500.000 - pago duplicado $2.500.000 = $16.000.000 COP
  const nom23 = 18500000 - 2500000;
  assert.equal(nom23, 16000000);
  assert.equal(allAgExercises[22].testCase.expectedValue, nom23);

  // Ejercicio 24: Resumen de traspaso y regla en GEMINI.md - Flete por peso volumétrico
  // Volumétrico (100*50*50)/2500 = 100 kg vs 40 kg real -> 100 kg * $4.000 = $400.000 COP
  const flete24 = Math.max(40, (100 * 50 * 50) / 2500) * 4000;
  assert.equal(flete24, 400000);
  assert.equal(allAgExercises[23].testCase.expectedValue, flete24);

  // Ejercicio 25: Razonamiento profundo en modo Planning - Valor Económico Agregado (EVA)
  // NOPAT $38.000.000 - (Capital $200.000.000 * WACC 12 %) = $38M - $24M = $14.000.000 COP
  const eva25 = 38000000 - (200000000 * 0.12);
  assert.equal(eva25, 14000000);
  assert.equal(allAgExercises[24].testCase.expectedValue, eva25);

  // Ejercicio 26: Ejecución autónoma con /goal - Cobertura total de pólizas contractuales
  // Contrato $80.000.000 * (30 % cumplimiento + 20 % salarios) = $40.000.000 COP
  const pol26 = 80000000 * (0.30 + 0.20);
  assert.equal(pol26, 40000000);
  assert.equal(allAgExercises[25].testCase.expectedValue, pol26);
});

test('6. Verificación de evaluación inmediata determinista en simulator-engine para los 26 ejercicios', () => {
  for (let id = 1; id <= 26; id++) {
    const ex = allAgExercises[id - 1];
    
    // Estado Válido ('valido')
    const resValid = simEngine.evaluateWitnessCase(id, ex.testCase.sampleInput, allAgExercises);
    assert.equal(resValid.status, 'valido', `Ejercicio ${id} debe ser válido con sampleInput`);
    assert.equal(resValid.ok, true, `Ejercicio ${id} debe dar ok: true con sampleInput`);

    // Estado Inválido ('invalido')
    const resInvalid = simEngine.evaluateWitnessCase(id, '99999999', allAgExercises);
    assert.equal(resInvalid.status, 'invalido', `Ejercicio ${id} debe fallar con 99999999`);
    assert.equal(resInvalid.ok, false, `Ejercicio ${id} debe dar ok: false con valor erróneo`);

    // Estado Vacío ('vacio')
    const resEmpty = simEngine.evaluateWitnessCase(id, '', allAgExercises);
    assert.equal(resEmpty.status, 'vacio', `Ejercicio ${id} debe retornar vacio`);
    assert.equal(resEmpty.ok, false, `Ejercicio ${id} debe dar ok: false con input vacío`);

    // Estado Reset ('reset')
    const resReset = simEngine.resetWitnessCase(id);
    assert.equal(resReset.status, 'reset', `Ejercicio ${id} debe retornar reset`);
    assert.equal(resReset.ok, false, `Ejercicio ${id} debe dar ok: false en reset`);
  }
});

test('7. Cobertura pedagógica de las 12 herramientas de Google Antigravity en los ejercicios', () => {
  const fullCorpus = allAgExercises.map(ex => [
    ex.title, ex.goal, ex.initialPrompt, ex.refinementPrompt, ...(ex.antigravitySteps || [])
  ].join(' ')).join('\n');

  const requiredCapabilities = [
    'Planning', '/grill-me', '/browser', '/goal', '/schedule', 'Agent Manager', 'resumen de traspaso', 'Ctrl+I', 'SKILL.md', 'MCP', 'GEMINI.md'
  ];
  requiredCapabilities.forEach(cap => {
    assert.ok(fullCorpus.includes(cap), `El corpus de ejercicios debe practicar explícitamente la capacidad: ${cap}`);
  });

  toolsMap.ANTIGRAVITY_TOOLS.forEach(tool => {
    assert.ok(Array.isArray(tool.practicedIn) && tool.practicedIn.length >= 1, `La herramienta ${tool.id} debe declarar practicedIn`);
  });
});
