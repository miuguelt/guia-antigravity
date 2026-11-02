import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const simulator = require('../js/core/simulator-engine.js');
const { AG_EXERCISES_N1_N2 } = require('../js/data/ag-exercises-n1-n2.js');
const { AG_EXERCISES_N3_N4 } = require('../js/data/ag-exercises-n3-n4.js');

const ALL_AG_EXERCISES = [...AG_EXERCISES_N1_N2, ...AG_EXERCISES_N3_N4];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ==========================================================================
   SUITE 1: Adversarial Fuzzing & Boundary Testing en parseFlexibleNumber
   ========================================================================== */

test('M4-ADV-01: parseFlexibleNumber maneja separadores colombianos, monedas y porcentajes', () => {
  const cases = [
    { input: '2.450.000', expected: 2450000, desc: 'Punto de miles colombiano' },
    { input: '$ 2.450.000 COP', expected: 2450000, desc: 'Punto de miles con $ y COP' },
    { input: '12.500.000', expected: 12500000, desc: 'Ocho dígitos con miles' },
    { input: '1.200.000,50', expected: 1200000.5, desc: 'Mixto: miles punto y decimal coma' },
    { input: '2.450.000,00', expected: 2450000, desc: 'Miles punto con decimales ceros' },
    { input: '35,0%', expected: 35.0, desc: 'Porcentaje con coma' },
    { input: '35 %', expected: 35.0, desc: 'Porcentaje con espacio' },
    { input: '4 %', expected: 4.0, desc: 'Porcentaje simple' },
    { input: '7,95', expected: 7.95, desc: 'Decimal con coma' },
    { input: '7.95', expected: 7.95, desc: 'Decimal con punto (no miles)' },
    { input: '9.5', expected: 9.5, desc: 'Decimal con un dígito' },
    { input: '9,5', expected: 9.5, desc: 'Decimal con coma un dígito' },
    { input: '-30000000', expected: -30000000, desc: 'Entero negativo plano' },
    { input: '-30.000.000', expected: -30000000, desc: 'Negativo con miles colombiano' },
    { input: '-$ 30.000.000 COP', expected: -30000000, desc: 'Negativo con símbolo y moneda' },
    { input: '100 unidades', expected: 100, desc: 'Texto de unidad al final' },
    { input: '220 horas', expected: 220, desc: 'Texto plural' },
    { input: '40 personas', expected: 40, desc: 'Texto descriptivo' },
    { input: '1.000', expected: 1000, desc: 'Exactamente 1.000 con miles' }
  ];

  for (const c of cases) {
    const res = simulator.parseFlexibleNumber(c.input);
    assert.equal(res.isEmpty, false, `isEmpty debió ser false para ${c.desc}`);
    assert.equal(res.value, c.expected, `Valor incorrecto para ${c.desc} (entrada: "${c.input}")`);
  }
});

test('M4-ADV-02: parseFlexibleNumber detecta entradas vacías y espacios de forma determinista', () => {
  const emptyInputs = [
    '',
    '   ',
    '\t',
    '\n',
    '\r\n',
    ' \t \n \r ',
    null,
    undefined,
    [] // Coerción de array vacío en JS: String([]) === ''
  ];

  for (const input of emptyInputs) {
    const res = simulator.parseFlexibleNumber(input);
    assert.equal(res.isEmpty, true, `Debe detectar entrada vacía para: ${JSON.stringify(input)}`);
    assert.ok(Number.isNaN(res.value), `Valor debe ser NaN para entrada vacía`);
  }
});

test('M4-ADV-03: parseFlexibleNumber resiliencia ante inputs adversos, inyecciones y no numéricos', () => {
  const malformedInputs = [
    'texto_plano',
    'NaN',
    'Infinity',
    '-Infinity',
    '..',
    '1..2',
    '1,,2',
    '1.2.3.4',
    '--5',
    '+-10',
    '+100', // Signo positivo explícito no está soportado en regex ^-?\d+
    '<script>alert("xss")</script>',
    'SELECT * FROM users;',
    '{{7*7}}',
    '${process.exit(1)}',
    {},
    [1, 2, 3],
    { value: 100 },
    () => 42
  ];

  for (const input of malformedInputs) {
    let res = null;
    assert.doesNotThrow(() => {
      res = simulator.parseFlexibleNumber(input);
    }, `Lanzó excepción con entrada adversa: ${String(input)}`);

    assert.equal(res.isEmpty, false, `No debe marcarse como vacía una entrada malformada: ${String(input)}`);
    assert.ok(Number.isNaN(res.value), `Debe devolver NaN para entrada malformada: ${String(input)}`);
  }
});

test('M4-ADV-04: Fuzzing masivo de parseFlexibleNumber (10.000 iteraciones aleatorias sin crash)', () => {
  const alphabet = '0123456789.,-+$%COP abcdefghijklmnopqrstuvwxyz\t\n ';
  for (let i = 0; i < 10000; i++) {
    const len = Math.floor(Math.random() * 25);
    let str = '';
    for (let j = 0; j < len; j++) {
      str += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    assert.doesNotThrow(() => {
      const res = simulator.parseFlexibleNumber(str);
      assert.ok(typeof res === 'object' && res !== null);
      assert.ok(typeof res.isEmpty === 'boolean');
      assert.ok(typeof res.value === 'number');
    }, `Fuzzing falló en iteración ${i} con payload: "${str}"`);
  }
});

/* ==========================================================================
   SUITE 2: Verificación Empírica de los 4 Estados Deterministas (20 Ejercicios)
   ========================================================================== */

test('M4-ADV-05: Estado Válido en los 20 ejercicios y ausencia estricta de "dossier"', () => {
  assert.equal(ALL_AG_EXERCISES.length, 20, 'Deben existir 20 ejercicios Antigravity');

  for (let id = 1; id <= 20; id++) {
    const spec = simulator.getWitnessSpec(id);
    assert.ok(spec, `Spec debe existir para ejercicio ${id}`);

    // Probar con sampleInput canónico
    const resSample = simulator.evaluateWitnessCase(id, spec.sampleInput);
    assert.equal(resSample.status, 'valido', `SampleInput debe ser valido en ejercicio ${id}`);
    assert.equal(resSample.ok, true);
    assert.equal(resSample.exerciseId, id);
    assert.equal(resSample.expectedValue, spec.expectedValue);
    assert.ok(resSample.diff <= spec.tolerance, `Diferencia ${resSample.diff} excede tolerancia ${spec.tolerance}`);
    assert.ok(resSample.message.includes('Estado Válido'));
    assert.ok(resSample.message.includes('Portafolio de Evidencias'));
    assert.equal(/dossier/i.test(resSample.message), false, `Palabra vetada dossier detectada en ejercicio ${id}`);

    // Probar con expectedValue exacto en string
    const resExact = simulator.evaluateWitnessCase(id, String(spec.expectedValue));
    assert.equal(resExact.status, 'valido');
    assert.equal(resExact.ok, true);
  }
});

test('M4-ADV-05b: Mitigación verificada — precisión flotante IEEE-754 en límites decimales con épsilon', () => {
  // Ejercicios con tolerancia entera verifican sus límites superior e inferior perfectamente
  const integerToleranceExercises = [2, 10, 11, 12, 13, 15, 20];
  for (const id of integerToleranceExercises) {
    const spec = simulator.getWitnessSpec(id);
    const upper = spec.expectedValue + spec.tolerance;
    const lower = spec.expectedValue - spec.tolerance;
    assert.equal(simulator.evaluateWitnessCase(id, String(upper)).status, 'valido');
    assert.equal(simulator.evaluateWitnessCase(id, String(lower)).status, 'valido');
  }

  // Comprobación de la mitigación de punto flotante en tolerancias decimales (con epsilon 1e-9):
  // En Ejercicio 4: expectedValue 2, tolerancia 0.05.
  // 2 - 0.05 = 1.95. Con epsilon 1e-9, evaluateWitnessCase retorna 'valido'.
  const resEj4Lower = simulator.evaluateWitnessCase(4, '1.95');
  assert.equal(resEj4Lower.status, 'valido', 'Empíricamente se confirma que 1.95 es válido gracias al épsilon');
  assert.ok(resEj4Lower.diff <= 0.05 + 1e-9);

  // En Ejercicio 6: expectedValue 35, tolerancia 0.1.
  // 35 + 0.1 = 35.1. Con epsilon 1e-9, evaluateWitnessCase retorna 'valido'.
  const resEj6Upper = simulator.evaluateWitnessCase(6, '35.1');
  assert.equal(resEj6Upper.status, 'valido', 'Empíricamente se confirma que 35.1 es válido gracias al épsilon');

  // En Ejercicio 19: expectedValue 9.5, tolerancia 0.05.
  // 9.5 - 0.05 = 9.45. Con epsilon 1e-9, evaluateWitnessCase retorna 'valido'.
  const resEj19Lower = simulator.evaluateWitnessCase(19, '9.45');
  assert.equal(resEj19Lower.status, 'valido', 'Empíricamente se confirma que 9.45 es válido gracias al épsilon');

  // Demostración de mitigación: con epsilon (diff <= spec.tolerance + 1e-9) todos pasan válidos
  const epsilon = 1e-9;
  assert.ok(Math.abs(1.95 - 2) <= 0.05 + epsilon, 'Mitigación demostrada con epsilon para Ejercicio 4');
  assert.ok(Math.abs(35.1 - 35) <= 0.1 + epsilon, 'Mitigación demostrada con epsilon para Ejercicio 6');
  assert.ok(Math.abs(9.45 - 9.5) <= 0.05 + epsilon, 'Mitigación demostrada con epsilon para Ejercicio 19');
});

test('M4-ADV-06: Estado Inválido por discrepancia matemática diferenciando sobrepaso vs déficit', () => {
  for (let id = 1; id <= 20; id++) {
    const spec = simulator.getWitnessSpec(id);
    const delta = spec.tolerance > 0 ? spec.tolerance * 5 + 1 : 10;

    // Caso Sobrepaso (Over)
    const overValue = spec.expectedValue + delta;
    const resOver = simulator.evaluateWitnessCase(id, String(overValue));
    assert.equal(resOver.status, 'invalido', `Sobrepaso debe ser inválido en ejercicio ${id}`);
    assert.equal(resOver.ok, false);
    assert.ok(resOver.diff > spec.tolerance);
    assert.ok(resOver.message.includes('Estado Inválido (Diferencia matemática)'));
    assert.ok(resOver.message.includes('Diagnóstico:'), `Debe incluir diagnóstico en ejercicio ${id}`);

    // Caso Déficit (Under)
    const underValue = spec.allowNegative
      ? spec.expectedValue - delta
      : Math.max(0, spec.expectedValue - delta);

    if (underValue !== spec.expectedValue) {
      const resUnder = simulator.evaluateWitnessCase(id, String(underValue));
      assert.equal(resUnder.status, 'invalido', `Déficit debe ser inválido en ejercicio ${id}`);
      assert.equal(resUnder.ok, false);
      assert.ok(resUnder.diff > spec.tolerance);
      assert.ok(resUnder.message.includes('Diagnóstico:'));
    }
  }
});

test('M4-ADV-07: Estado Inválido por restricción de valores negativos', () => {
  for (let id = 1; id <= 20; id++) {
    const spec = simulator.getWitnessSpec(id);
    const resNeg = simulator.evaluateWitnessCase(id, '-999');

    if (!spec.allowNegative) {
      assert.equal(resNeg.status, 'invalido', `Negativo en ej ${id} debe ser invalido`);
      assert.ok(resNeg.message.includes('este indicador no admite cantidades negativas'));
    } else {
      // Ejercicio 9 y 13 admiten negativos
      assert.ok(resNeg.status === 'invalido' || resNeg.status === 'valido');
      assert.equal(resNeg.message.includes('no admite cantidades negativas'), false);
    }
  }
});

test('M4-ADV-08: Estado Vacío en los 20 ejercicios ante inputs vacíos', () => {
  for (let id = 1; id <= 20; id++) {
    const empty1 = simulator.evaluateWitnessCase(id, '');
    assert.equal(empty1.status, 'vacio');
    assert.equal(empty1.ok, false);
    assert.ok(empty1.message.includes('Estado Vacío'));

    const empty2 = simulator.evaluateWitnessCase(id, '   ');
    assert.equal(empty2.status, 'vacio');

    const empty3 = simulator.evaluateWitnessCase(id, null);
    assert.equal(empty3.status, 'vacio');

    const empty4 = simulator.evaluateWitnessCase(id, undefined);
    assert.equal(empty4.status, 'vacio');
  }
});

test('M4-ADV-09: Estado Reset determinista y síncrono en los 20 ejercicios', () => {
  for (let id = 1; id <= 20; id++) {
    const spec = simulator.getWitnessSpec(id);
    const rst = simulator.resetWitnessCase(id);

    assert.equal(rst.status, 'reset', `Reset status erróneo en ejercicio ${id}`);
    assert.equal(rst.ok, false);
    assert.equal(rst.exerciseId, id);
    assert.equal(rst.inputValue, '');
    assert.equal(rst.sampleInput, spec.sampleInput);
    assert.equal(rst.expectedValue, spec.expectedValue);
    assert.ok(rst.message.includes('Estado Reiniciado (Reset)'));
    assert.ok(rst.message.includes(spec.sampleInput));
    assert.equal(rst.formulaHint, spec.formulaHint);
  }
});

/* ==========================================================================
   SUITE 3: getWitnessSpec y customSpecs Robustez
   ========================================================================== */

test('M4-ADV-10: getWitnessSpec maneja IDs fuera de rango con fallback seguro', () => {
  const edgeIds = [0, -1, 21, 999, 'abc', null, undefined, NaN, {}, []];

  for (const edgeId of edgeIds) {
    let spec = null;
    assert.doesNotThrow(() => {
      spec = simulator.getWitnessSpec(edgeId);
    }, `Lanzó excepción con ID fuera de rango: ${String(edgeId)}`);

    assert.ok(spec, `Debe devolver un spec fallback para ID: ${String(edgeId)}`);
    assert.equal(spec.id, 1, `Debe hacer fallback a spec 1 para ID anómalo: ${String(edgeId)}`);
  }
});

test('M4-ADV-11: getWitnessSpec y evaluateWitnessCase con customSpecs dinámicos', () => {
  // Lista array con testCase
  const customArray = [
    { id: 101, title: 'Prueba Custom 101', testCase: { expectedValue: 42, tolerance: 0, sampleInput: '42', formulaHint: 'Hint 101' } },
    { id: 102, title: 'Prueba Custom 102' } // Sin testCase
  ];

  const res101 = simulator.evaluateWitnessCase(101, '42', customArray);
  assert.equal(res101.status, 'valido');
  assert.equal(res101.expectedValue, 42);

  // ID inexistente en array hace fallback
  const resFallback = simulator.evaluateWitnessCase(999, '8', customArray);
  assert.equal(resFallback.status, 'valido'); // Fallback a spec 1 (expectedValue 8)

  // Mapa de objetos
  const customMap = {
    55: { expectedValue: 555, tolerance: 0.5, sampleInput: '555' }
  };
  const resMap = simulator.evaluateWitnessCase(55, '555', customMap);
  assert.equal(resMap.status, 'valido');
  assert.equal(resMap.expectedValue, 555);

  // customSpecs malformado (null, undefined, string, número) no debe romper
  assert.doesNotThrow(() => {
    simulator.evaluateWitnessCase(1, '8', null);
    simulator.evaluateWitnessCase(1, '8', undefined);
    simulator.evaluateWitnessCase(1, '8', 'cadena');
    simulator.evaluateWitnessCase(1, '8', 123);
  });
});

test('M4-ADV-11b: Resiliencia en customSpecs array con elementos null/undefined', () => {
  // Verificación de mitigación: customSpecs con null/undefined no arroja excepción y hace fallback seguro
  let spec = null;
  assert.doesNotThrow(() => {
    spec = simulator.getWitnessSpec(1, [null, undefined]);
  });
  assert.ok(spec, 'Debe devolver un spec válido');
  assert.equal(spec.id, 1, 'Debe hacer fallback al spec correspondiente');
});

/* ==========================================================================
   SUITE 4: Verificación de Cero setTimeout y Rendimiento de 1.000+ Iteraciones
   ========================================================================== */

test('M4-ADV-12: Verificación estática y dinámica de estrictamente cero setTimeout', () => {
  const enginePath = path.resolve(__dirname, '../js/core/simulator-engine.js');
  const code = fs.readFileSync(enginePath, 'utf8');

  // 1. Análisis estático: prohibidos temporizadores
  assert.equal(/setTimeout\s*\(/.test(code), false, 'simulator-engine.js no debe contener setTimeout()');
  assert.equal(/setInterval\s*\(/.test(code), false, 'simulator-engine.js no debe contener setInterval()');
  assert.equal(/setImmediate\s*\(/.test(code), false, 'simulator-engine.js no debe contener setImmediate()');

  // 2. Trampa dinámica: intercepción de temporizadores
  const originalSetTimeout = globalThis.setTimeout;
  let timerTrapTriggered = false;
  globalThis.setTimeout = function () {
    timerTrapTriggered = true;
    throw new Error('VIOLACIÓN: setTimeout llamado durante simulación');
  };

  try {
    for (let id = 1; id <= 20; id++) {
      simulator.evaluateWitnessCase(id, '100');
      simulator.resetWitnessCase(id);
    }
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }

  assert.equal(timerTrapTriggered, false, 'No se debe haber disparado ninguna llamada a setTimeout');
});

test('M4-ADV-13: Prueba de rendimiento en ráfaga (1.000 evaluaciones en < 50 ms)', () => {
  const iterations = 1000;
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    const id = (i % 20) + 1;
    simulator.evaluateWitnessCase(id, String(i));
  }

  const durationMs = performance.now() - start;
  assert.ok(
    durationMs < 50,
    `1.000 evaluaciones deterministas deben ejecutarse en < 50 ms. Duración real: ${durationMs.toFixed(2)} ms`
  );
});

test('M4-ADV-14: Determinismo e idempotencia estricta en 5.000 iteraciones', () => {
  for (let id = 1; id <= 20; id++) {
    const spec = simulator.getWitnessSpec(id);
    const firstValid = simulator.evaluateWitnessCase(id, spec.sampleInput);
    const firstInvalid = simulator.evaluateWitnessCase(id, '999999999');
    const firstEmpty = simulator.evaluateWitnessCase(id, '');
    const firstReset = simulator.resetWitnessCase(id);

    for (let j = 0; j < 50; j++) {
      const v = simulator.evaluateWitnessCase(id, spec.sampleInput);
      const inv = simulator.evaluateWitnessCase(id, '999999999');
      const emp = simulator.evaluateWitnessCase(id, '');
      const rst = simulator.resetWitnessCase(id);

      assert.deepEqual(v, firstValid, `Determinismo roto en estado valido ej ${id}`);
      assert.deepEqual(inv, firstInvalid, `Determinismo roto en estado invalido ej ${id}`);
      assert.deepEqual(emp, firstEmpty, `Determinismo roto en estado vacio ej ${id}`);
      assert.deepEqual(rst, firstReset, `Determinismo roto en estado reset ej ${id}`);
    }
  }
});

/* ==========================================================================
   SUITE 5: Presupuesto Modular y Coherencia con Catálogos de Ejercicios
   ========================================================================== */

test('M4-ADV-15: simulator-engine.js cumple estrictamente presupuesto modular (< 250 líneas)', () => {
  const enginePath = path.resolve(__dirname, '../js/core/simulator-engine.js');
  const content = fs.readFileSync(enginePath, 'utf8');
  const lineCount = content.split(/\r?\n/).length;

  assert.ok(
    lineCount <= 250,
    `simulator-engine.js tiene ${lineCount} líneas, superando el límite modular de 250 líneas`
  );
});

test('M4-ADV-16: Sincronización exacta entre testCase de los 20 ejercicios y WITNESS_SPECS', () => {
  for (let i = 0; i < 20; i++) {
    const ex = ALL_AG_EXERCISES[i];
    const id = i + 1;
    assert.equal(ex.id, id, `Ejercicio en índice ${i} debe tener id ${id}`);
    assert.ok(ex.testCase, `Ejercicio ${id} debe tener testCase`);

    const spec = simulator.getWitnessSpec(id);
    assert.equal(
      ex.testCase.expectedValue,
      spec.expectedValue,
      `expectedValue no coincide en ejercicio ${id}: catálogo=${ex.testCase.expectedValue}, spec=${spec.expectedValue}`
    );
    assert.equal(
      ex.testCase.tolerance,
      spec.tolerance,
      `tolerance no coincide en ejercicio ${id}: catálogo=${ex.testCase.tolerance}, spec=${spec.tolerance}`
    );

    // Probar sampleInput del catálogo en evaluateWitnessCase
    const evalRes = simulator.evaluateWitnessCase(id, ex.testCase.sampleInput);
    assert.equal(
      evalRes.status,
      'valido',
      `sampleInput "${ex.testCase.sampleInput}" del catálogo falló en ejercicio ${id}`
    );
    assert.equal(evalRes.ok, true);

    // Erradicación de dossier en datos del ejercicio
    const jsonStr = JSON.stringify(ex.testCase);
    assert.equal(/dossier/i.test(jsonStr), false, `testCase de ejercicio ${id} contiene "dossier"`);
  }
});
