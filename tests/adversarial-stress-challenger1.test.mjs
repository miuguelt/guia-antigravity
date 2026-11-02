import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const kitGen = require('../js/core/kit-generator.js');
const studyTimer = require('../js/ui/study-timer.js');

/* ==========================================================================
   SUITE 1: kitGenerator.buildAllKitsBundle() — Integridad y No Corrupción
   ========================================================================== */

test('ADV-01: buildAllKitsBundle integridad estructural, orden correlativo y unicidad estricta', () => {
  const bundle = kitGen.buildAllKitsBundle();

  assert.equal(bundle.version, '2.1', 'La versión canónica del bundle debe ser 2.1');
  assert.equal(bundle.totalKits, 20, 'El total registrado debe ser exactamente 20');
  assert.equal(bundle.kits.length, 20, 'El array de kits debe contener 20 elementos');

  const seenIds = new Set();
  const seenFilenames = new Set();

  bundle.kits.forEach((kit, index) => {
    const expectedId = index + 1;
    assert.equal(kit.exerciseId, expectedId, `El kit en índice ${index} debe tener exerciseId ${expectedId}`);
    assert.equal(kit.title, `Kit Ejercicio ${expectedId}`, `Título erróneo en kit ${expectedId}`);
    assert.ok(kit.filename && kit.filename.trim().length > 3, `Nombre de archivo no válido en kit ${expectedId}`);
    assert.ok(kit.mimeType && kit.mimeType.includes('charset=utf-8'), `MIME type sin UTF-8 en kit ${expectedId}`);
    assert.equal(kit.sizeBytes, kit.content.length, `sizeBytes no coincide con content.length en kit ${expectedId}`);

    // Unicidad
    assert.ok(!seenIds.has(kit.exerciseId), `ID duplicado detectado: ${kit.exerciseId}`);
    seenIds.add(kit.exerciseId);

    // Contenido no nulo ni corrompido
    assert.ok(typeof kit.content === 'string' && kit.content.length > 30, `Contenido vacío o corrupto en kit ${expectedId}`);
    assert.equal(kit.content.includes('undefined'), false, `Kit ${expectedId} contiene "undefined" textual`);
    assert.equal(kit.content.includes('[object Object]'), false, `Kit ${expectedId} contiene "[object Object]"`);
    assert.equal(kit.content.includes('NaN'), false, `Kit ${expectedId} contiene "NaN"`);

    // Validación de integridad por tipo de archivo
    if (kit.filename.endsWith('.json')) {
      assert.doesNotThrow(() => {
        const parsed = JSON.parse(kit.content);
        assert.ok(typeof parsed === 'object' && parsed !== null, `JSON no válido en kit ${expectedId}`);
      }, `Error de parseo JSON en kit ${expectedId} (${kit.filename})`);
    } else if (kit.filename.endsWith('.csv')) {
      const lines = kit.content.trim().split('\n');
      assert.ok(lines.length >= 2, `CSV con menos de 2 líneas en kit ${expectedId}`);
      assert.ok(lines[0].includes(','), `Cabecera CSV sin coma en kit ${expectedId}`);
    }
  });

  assert.equal(seenIds.size, 20, 'Deben existir exactamente 20 IDs únicos');
});

test('ADV-02: buildAllKitsBundle idempotencia, serialización y estrés en ráfaga (1.000 ciclos)', () => {
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
    const b = kitGen.buildAllKitsBundle();
    assert.equal(b.totalKits, 20);
    assert.equal(b.kits.length, 20);
  }
  const duration = Date.now() - start;
  assert.ok(duration < 2000, `1.000 ciclos deben ejecutarse en menos de 2.000 ms (duró ${duration} ms)`);

  // Round-trip de serialización profunda JSON
  const bundle = kitGen.buildAllKitsBundle();
  const serialized = JSON.stringify(bundle);
  const deserialized = JSON.parse(serialized);
  assert.deepEqual(deserialized.totalKits, bundle.totalKits);
  assert.equal(deserialized.kits.length, 20);
  assert.equal(deserialized.kits[19].exerciseId, 20);
});

/* ==========================================================================
   SUITE 2: kitGenerator.buildEvidenceSnippet() — Entradas Límite y Anti-Dossier
   ========================================================================== */

test('ADV-03: buildEvidenceSnippet entradas límite numéricas y no numéricas (0, -1, 999, strings, null, undefined)', () => {
  const boundaryExerciseIds = [
    0, -1, -999, 999, 21, 1000000, 2.7, 19.9, Number.MAX_SAFE_INTEGER,
    '0', '-1', '999', '21', '1', '20', 'abc', '', '   ', 'null', 'undefined', '{}', '[]',
    null, undefined, NaN, Infinity, -Infinity, {}, [], true, false
  ];

  boundaryExerciseIds.forEach((input) => {
    let snippet = null;
    assert.doesNotThrow(() => {
      snippet = kitGen.buildEvidenceSnippet(input, {});
    }, `buildEvidenceSnippet arrojó excepción con entrada de ejercicio: ${String(input)}`);

    assert.ok(typeof snippet === 'string' && snippet.length > 100, `Debe generar un string no vacío con entrada ${String(input)}`);
    assert.equal(/dossier/i.test(snippet), false, `Snippet contiene la palabra vetada "dossier" con ID: ${String(input)}`);
    assert.ok(snippet.includes('### Evidencia para el Portafolio de Evidencias (SENA ADSO)'));
    assert.ok(snippet.includes('#### Cobertura de los 4 Estados Obligatorios del Simulador'));
  });
});

test('ADV-04: buildEvidenceSnippet robustez extrema ante payloads adversos de result', () => {
  const adverseResults = [
    null,
    undefined,
    {},
    0,
    12345,
    '',
    'resultado en texto plano',
    false,
    true,
    [],
    [1, 2, 3],
    { enteredValue: null, expectedValue: undefined, formulaHint: null },
    { enteredValue: '', expectedValue: 0, formulaHint: '' },
    { enteredValue: '<script>alert("xss")</script>', expectedValue: '"; DROP TABLE users; --', formulaHint: '{{7*7}}' },
    { enteredValue: '¡@#$%^&*()_+{}[]:;"\'<>?,./|\\~`', expectedValue: '\u0000\uFFFF\u2714\uFE0F', formulaHint: 'Fórmula con símbolos' },
    { enteredValue: 'A'.repeat(50000), expectedValue: 'B'.repeat(50000), formulaHint: 'C'.repeat(5000) }
  ];

  for (let exerciseId = 1; exerciseId <= 20; exerciseId++) {
    adverseResults.forEach((res, idx) => {
      let snippet = null;
      assert.doesNotThrow(() => {
        snippet = kitGen.buildEvidenceSnippet(exerciseId, res);
      }, `Excepción arrojada para ejercicio ${exerciseId} con payload ${idx}`);

      assert.ok(typeof snippet === 'string' && snippet.length > 50);
      assert.equal(/dossier/i.test(snippet), false, `Palabra vetada "dossier" detectada en ejercicio ${exerciseId}, payload ${idx}`);
      assert.ok(snippet.includes('Portafolio de Evidencias'), `Debe contener "Portafolio de Evidencias" en ejercicio ${exerciseId}`);
    });
  }
});

test('ADV-05: buildEvidenceSnippet prueba de fuzzer masivo (5.000 iteraciones aleatorias)', () => {
  const randomSeeds = [
    0, -1, 1, 2, 5, 10, 15, 20, 21, 999, '1', '20', 'invalid', '', null, undefined,
    { foo: 'bar' }, [1], 42.5, -0.001, '0', '9999'
  ];

  for (let i = 0; i < 5000; i++) {
    const randomId = randomSeeds[Math.floor(Math.random() * randomSeeds.length)];
    const randomResult = {
      inputValue: Math.random() > 0.5 ? Math.random() * 1000 : null,
      enteredValue: Math.random() > 0.5 ? 'Val_' + i : undefined,
      expectedValue: Math.random() > 0.5 ? i * 2 : null,
      formulaHint: Math.random() > 0.5 ? 'Hint_' + i : ''
    };

    const snippet = kitGen.buildEvidenceSnippet(randomId, randomResult);
    assert.ok(typeof snippet === 'string');
    assert.equal(/dossier/i.test(snippet), false, `Fuzzer detectó palabra vetada "dossier" en ciclo ${i}`);
    assert.ok(snippet.includes('Portafolio de Evidencias'));
  }
});

/* ==========================================================================
   SUITE 3: studyTimer — Simulación Masiva y Resiliencia de la Máquina de Estados
   ========================================================================== */

test('ADV-06: studyTimer.formatTime cobertura de rango masivo (-1.000.000 a +1.000.000 s) y casos extremos', () => {
  assert.equal(studyTimer.formatTime(0), '00:00');
  assert.equal(studyTimer.formatTime(1), '00:01');
  assert.equal(studyTimer.formatTime(59), '00:59');
  assert.equal(studyTimer.formatTime(60), '01:00');
  assert.equal(studyTimer.formatTime(3599), '59:59');
  assert.equal(studyTimer.formatTime(3600), '60:00');
  assert.equal(studyTimer.formatTime(7200), '120:00');
  assert.equal(studyTimer.formatTime(1000000), '16666:40');

  // Valores negativos
  assert.equal(studyTimer.formatTime(-1), '00:00');
  assert.equal(studyTimer.formatTime(-500), '00:00');
  assert.equal(studyTimer.formatTime(-1000000), '00:00');

  // Valores flotantes
  assert.equal(studyTimer.formatTime(0.999), '00:00');
  assert.equal(studyTimer.formatTime(59.9), '00:59');
  assert.equal(studyTimer.formatTime(120.5), '02:00');

  // Tipos anormales
  const oddValues = [null, undefined, NaN, 'texto', '', '   ', {}, [], false, true];
  oddValues.forEach((val) => {
    const formatted = studyTimer.formatTime(val);
    assert.ok(typeof formatted === 'string');
    assert.ok(/^\d+:\d{2}$/.test(formatted), `Formato inválido para ${String(val)}: ${formatted}`);
  });

  // Bucle masivo de 100.000 segundos consecutivos
  for (let s = 0; s <= 100000; s += 13) {
    const res = studyTimer.formatTime(s);
    assert.ok(/^\d+:\d{2}$/.test(res), `Falla de formato regex en segundo ${s}: ${res}`);
  }
});

test('ADV-07: studyTimer.createTimerState valores límite, conversiones de minutos y rótulos', () => {
  // Minutos estándar
  const s1 = studyTimer.createTimerState(3, 'Test');
  assert.equal(s1.minutes, 3);
  assert.equal(s1.secondsLeft, 180);
  assert.equal(s1.totalSeconds, 180);
  assert.equal(s1.label, 'Test');
  assert.equal(s1.isRunning, false);
  assert.equal(s1.isCompleted, false);

  // Minutos > 30 se interpretan como segundos directos
  const s2 = studyTimer.createTimerState(45, 'Micro-sprint');
  assert.equal(s2.totalSeconds, 45);
  assert.equal(s2.secondsLeft, 45);
  assert.equal(s2.minutes, 0.8);

  // Comportamiento empírico de valores límite:
  // Minutos 0 es falsy, por lo que (raw || 3) adopta 3 minutos (180s)
  const s3 = studyTimer.createTimerState(0, '');
  assert.equal(s3.totalSeconds, 180, '0 minutos cae en el fallback falsy (raw || 3) produciendo 180s');
  assert.equal(s3.label, 'Estudio Conceptual', 'Label vacío debe adoptar el texto por defecto');

  // Minutos negativos son truthy, por lo que Math.max(1, -600) lo acota a 1 segundo
  const s4 = studyTimer.createTimerState(-10, null);
  assert.equal(s4.totalSeconds, 1, 'Minutos negativos son acotados a 1 segundo por Math.max');
  assert.equal(s4.label, 'Estudio Conceptual');

  // Entradas no numéricas
  const s5 = studyTimer.createTimerState('no-numero', undefined);
  assert.equal(s5.totalSeconds, 180);
  assert.equal(s5.label, 'Estudio Conceptual');
});

test('ADV-08: studyTimer.tickTimer inmutabilidad estricta y prueba de cuenta regresiva continua (5.000 ticks)', () => {
  const initial = studyTimer.createTimerState(5000, 'Larga Duración');
  assert.equal(initial.secondsLeft, 5000);

  // Inmutabilidad (con Object.freeze)
  let currentState = Object.assign({}, initial, { isRunning: true });
  Object.freeze(currentState);

  const nextState = studyTimer.tickTimer(currentState);
  assert.notEqual(nextState, currentState, 'tickTimer debe devolver un nuevo objeto');
  assert.equal(currentState.secondsLeft, 5000, 'El objeto original congelado no debe mutar');
  assert.equal(nextState.secondsLeft, 4999);

  // Simulación continua de 5.000 ticks hasta el agotamiento
  let state = Object.assign({}, initial, { isRunning: true });
  for (let i = 0; i < 5000; i++) {
    state = studyTimer.tickTimer(state);
  }

  // Exactamente en el tick 5000 debe completarse
  assert.equal(state.secondsLeft, 0, 'Al finalizar los 5.000 ticks debe estar en 0');
  assert.equal(state.isRunning, false, 'isRunning debe ser false al terminar');
  assert.equal(state.isCompleted, true, 'isCompleted debe ser true al terminar');

  // Sobre-ejecución (500 ticks adicionales pasados cero)
  for (let i = 0; i < 500; i++) {
    state = studyTimer.tickTimer(state);
    assert.equal(state.secondsLeft, 0, 'No debe volverse negativo tras rebasar cero');
    assert.equal(state.isRunning, false);
    assert.equal(state.isCompleted, true);
  }
});

test('ADV-09: studyTimer.tickTimer y resetTimer resiliencia ante estados anómalos y congelados', () => {
  // Estado ya corrupto con segundos negativos
  const corruptState = {
    minutes: 3,
    secondsLeft: -50,
    totalSeconds: 180,
    label: 'Corrupto',
    isRunning: true,
    isCompleted: false
  };

  const fixed = studyTimer.tickTimer(corruptState);
  assert.equal(fixed.secondsLeft, 0, 'Debe corregir segundos negativos a 0');
  assert.equal(fixed.isRunning, false);
  assert.equal(fixed.isCompleted, true);

  // Reset sobre estado congelado
  const completedState = Object.freeze({
    minutes: 3,
    secondsLeft: 0,
    totalSeconds: 180,
    label: 'Finalizado',
    isRunning: false,
    isCompleted: true
  });

  const resetState = studyTimer.resetTimer(completedState);
  assert.notEqual(resetState, completedState);
  assert.equal(resetState.secondsLeft, 180);
  assert.equal(resetState.isRunning, false);
  assert.equal(resetState.isCompleted, false);
  assert.equal(resetState.label, 'Finalizado');

  // Invocaciones seguras con null y undefined
  assert.equal(studyTimer.tickTimer(null), null);
  assert.equal(studyTimer.tickTimer(undefined), undefined);
  assert.equal(studyTimer.resetTimer(null), null);
  assert.equal(studyTimer.resetTimer(undefined), undefined);
});

/* ==========================================================================
   SUITE 4: Pipeline Integral Multi-Motor (Ciclo de Vida del Aprendiz)
   ========================================================================== */

test('ADV-10: Pipeline end-to-end de los 20 ejercicios (Temporizador + Kit Semilla + Evidencia SENA)', () => {
  for (let id = 1; id <= 20; id++) {
    // 1. Temporizador iniciado para la tarea conceptual
    let tState = studyTimer.createTimerState(35, `Ejercicio ${id}`); // 35 segundos
    tState.isRunning = true;
    for (let t = 0; t < 35; t++) {
      tState = studyTimer.tickTimer(tState);
    }
    assert.equal(tState.isCompleted, true);
    assert.equal(studyTimer.formatTime(tState.secondsLeft), '00:00');

    // 2. Extracción de metadatos del kit
    const kitMeta = kitGen.getKitMetadata(id);
    assert.equal(kitMeta.exerciseId, id);
    assert.ok(kitMeta.filename.length > 3);

    // 3. Generación de evidencia Markdown para el Portafolio
    const snippet = kitGen.buildEvidenceSnippet(id, {
      enteredValue: 100 * id,
      expectedValue: 100 * id,
      formulaHint: `Invariante Ejercicio ${id}`
    });

    assert.ok(snippet.includes(`(Ejercicio ${id})`));
    assert.ok(snippet.includes(kitMeta.filename));
    assert.equal(/dossier/i.test(snippet), false, `Palabra vetada "dossier" en pipeline de ejercicio ${id}`);
    assert.ok(snippet.includes('Portafolio de Evidencias'));
    assert.ok(snippet.includes('Estado Válido'));
    assert.ok(snippet.includes('Estado Inválido'));
    assert.ok(snippet.includes('Estado Vacío'));
    assert.ok(snippet.includes('Estado Reinicio'));
  }
});
