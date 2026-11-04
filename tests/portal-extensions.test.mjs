import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { AG_EXERCISES_N1_N2 } = require('../js/data/ag-exercises-n1-n2.js');
const { AG_EXERCISES_N3_N4 } = require('../js/data/ag-exercises-n3-n4.js');

const kitGen = require('../js/core/kit-generator.js');
const studyTimer = require('../js/ui/study-timer.js');
const promptBuilder = require('../js/core/prompt-builder.js');

const ALL_AG_EXERCISES = [...AG_EXERCISES_N1_N2, ...AG_EXERCISES_N3_N4];

/* ==========================================================================
   1. kitGenerator.buildAllKitsBundle
   ========================================================================== */

test('1. kitGenerator.buildAllKitsBundle consolida exactamente los 26 kits semilla con metadatos correlativos', () => {
  const bundle = kitGen.buildAllKitsBundle();

  assert.equal(bundle.version, '2.1', 'La versión global del bundle debe ser 2.1');
  assert.equal(bundle.totalKits, 26, 'El total de kits debe ser exactamente 26');
  assert.ok(typeof bundle.generatedAt === 'string', 'generatedAt debe ser una cadena ISO');
  assert.ok(!Number.isNaN(Date.parse(bundle.generatedAt)), 'generatedAt debe representar una fecha ISO válida');
  assert.ok(Array.isArray(bundle.kits), 'bundle.kits debe ser un arreglo');
  assert.equal(bundle.kits.length, 26, 'El arreglo kits debe tener 26 elementos');

  bundle.kits.forEach((kit, idx) => {
    const expectedId = idx + 1;
    assert.equal(kit.exerciseId, expectedId, `Identificador correlativo incorrecto en kit ${expectedId}`);
    assert.equal(kit.title, `Kit Ejercicio ${expectedId}`, `Título inconsistente en kit ${expectedId}`);
    assert.ok(kit.filename && kit.filename.length > 3, `Nombre de archivo inválido en kit ${expectedId}`);
    assert.ok(kit.mimeType && (kit.mimeType.includes('text') || kit.mimeType.includes('json') || kit.mimeType.includes('csv')), `MIME type inválido en kit ${expectedId}`);
    assert.equal(kit.mime, kit.mimeType, `mime y mimeType deben ser idénticos en kit ${expectedId}`);
    assert.ok(typeof kit.content === 'string' && kit.content.length > 40, `El contenido del kit ${expectedId} no debe ser vacío`);
    assert.equal(kit.sizeBytes, kit.content.length, `sizeBytes debe coincidir con la longitud del contenido en kit ${expectedId}`);

    const singleKit = kitGen.buildKitContent(expectedId);
    assert.equal(kit.content, singleKit.content, `El contenido del bundle debe coincidir con buildKitContent(${expectedId})`);
  });
});

/* ==========================================================================
   2. kitGenerator.triggerAllKitsDownload
   ========================================================================== */

test('2. kitGenerator.triggerAllKitsDownload retorna JSON serializado en entorno Node.js sin DOM', () => {
  const rawStringNull = kitGen.triggerAllKitsDownload(null);
  assert.equal(typeof rawStringNull, 'string', 'Debe retornar un string JSON al recibir null');
  const parsedNull = JSON.parse(rawStringNull);
  assert.equal(parsedNull.version, '2.1');
  assert.equal(parsedNull.totalKits, 26);
  assert.equal(parsedNull.kits.length, 26);

  const rawStringNoArgs = kitGen.triggerAllKitsDownload();
  assert.equal(typeof rawStringNoArgs, 'string', 'Debe retornar un string JSON sin argumentos');

  const rawStringEmptyDoc = kitGen.triggerAllKitsDownload({});
  assert.equal(typeof rawStringEmptyDoc, 'string', 'Debe retornar string JSON cuando doc carece de createElement');
});

test('3. kitGenerator.triggerAllKitsDownload simula la descarga reactiva y revocación en entorno DOM mockeado', () => {
  let createdTag = null;
  let clicked = false;
  let appendedChild = null;
  let removedChild = null;
  let createdUrl = null;
  let revokedUrl = null;

  const mockLink = {
    href: '',
    download: '',
    click() {
      clicked = true;
    }
  };

  const mockDoc = {
    createElement(tag) {
      createdTag = tag;
      return mockLink;
    },
    body: {
      appendChild(child) {
        appendedChild = child;
      },
      removeChild(child) {
        removedChild = child;
      }
    }
  };

  const originalRevoke = URL.revokeObjectURL;
  const originalCreate = URL.createObjectURL;

  try {
    URL.createObjectURL = (blob) => {
      assert.ok(blob instanceof Blob, 'El objeto descargable debe ser una instancia de Blob');
      assert.equal(blob.type, 'application/json;charset=utf-8', 'El Blob debe tener codificación UTF-8');
      createdUrl = 'blob:mock-url-' + Date.now();
      return createdUrl;
    };
    URL.revokeObjectURL = (url) => {
      revokedUrl = url;
    };

    const result = kitGen.triggerAllKitsDownload(mockDoc);

    assert.equal(result.downloaded, true, 'El resultado debe reportar downloaded = true');
    assert.equal(result.filename, 'todos_los_kits_semilla_antigravity.json', 'Nombre de archivo descargado incorrecto');
    assert.equal(result.bundle.totalKits, 26, 'El bundle adjunto debe contener 26 kits');
    assert.equal(createdTag, 'a', 'Debe crear un elemento de enlace virtual <a>');
    assert.equal(mockLink.download, 'todos_los_kits_semilla_antigravity.json', 'El atributo download del enlace debe ser el esperado');
    assert.equal(mockLink.href, createdUrl, 'El atributo href debe vincularse al URL del Blob');
    assert.equal(clicked, true, 'Se debe invocar click() sobre el enlace virtual');
    assert.equal(appendedChild, mockLink, 'El enlace debe agregarse temporalmente a document.body');
    assert.equal(removedChild, mockLink, 'El enlace debe removerse de document.body');
    assert.equal(revokedUrl, createdUrl, 'Se debe revocar el ObjectURL correspondiente para liberar memoria');
  } finally {
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
  }
});

/* ==========================================================================
   3. kitGenerator.buildEvidenceSnippet
   ========================================================================== */

test('4. kitGenerator.buildEvidenceSnippet mapea canónicamente las 5 estaciones SENA ADSO (MG-A01 a MG-A05)', () => {
  const stationExpectations = [
    { id: 1, expectedStation: 'MG-A01', expectedTitle: 'Fundamentos de Antigravity (Nivel 1)' },
    { id: 5, expectedStation: 'MG-A01', expectedTitle: 'Fundamentos de Antigravity (Nivel 1)' },
    { id: 6, expectedStation: 'MG-A02', expectedTitle: 'Herramientas de Negocio (Nivel 2)' },
    { id: 7, expectedStation: 'MG-A02', expectedTitle: 'Herramientas de Negocio (Nivel 2)' },
    { id: 10, expectedStation: 'MG-A02', expectedTitle: 'Herramientas de Negocio (Nivel 2)' },
    { id: 11, expectedStation: 'MG-A03', expectedTitle: 'Sistemas Relacionales y Skills (Nivel 3)' },
    { id: 12, expectedStation: 'MG-A03', expectedTitle: 'Sistemas Relacionales y Skills (Nivel 3)' },
    { id: 15, expectedStation: 'MG-A03', expectedTitle: 'Sistemas Relacionales y Skills (Nivel 3)' },
    { id: 16, expectedStation: 'MG-A04', expectedTitle: 'Orquestación y MCP (Nivel 4)' },
    { id: 17, expectedStation: 'MG-A04', expectedTitle: 'Orquestación y MCP (Nivel 4)' },
    { id: 19, expectedStation: 'MG-A04', expectedTitle: 'Orquestación y MCP (Nivel 4)' },
    { id: 20, expectedStation: 'MG-A05', expectedTitle: 'Proyecto Cumbre ERP y Cierre (Nivel 4)' }
  ];

  stationExpectations.forEach(({ id, expectedStation, expectedTitle }) => {
    const snippet = kitGen.buildEvidenceSnippet(id, { enteredValue: 100, expectedValue: 100 });
    assert.ok(snippet.includes(expectedStation), `El ejercicio ${id} debe incluir la estación ${expectedStation}`);
    assert.ok(snippet.includes(expectedTitle), `El ejercicio ${id} debe incluir el título ${expectedTitle}`);
    assert.ok(snippet.includes(`(Ejercicio ${id})`), `El snippet debe referenciar explícitamente el ejercicio ${id}`);
  });
});

test('5. kitGenerator.buildEvidenceSnippet incluye taxativamente los 4 estados del simulador y estructura pedagógica', () => {
  const sampleResult = {
    enteredValue: '1200000',
    expectedValue: 1200000,
    formulaHint: 'Total = Subtotal * 1.19'
  };

  const snippet = kitGen.buildEvidenceSnippet(3, sampleResult);

  assert.ok(snippet.includes('### Evidencia para el Portafolio de Evidencias (SENA ADSO)'));
  assert.ok(snippet.includes('- **Estación vinculada**: MG-A01 — Fundamentos de Antigravity (Nivel 1) (Ejercicio 3)'));
  assert.ok(snippet.includes('- **Archivo semilla inyectado (@)**:'));
  assert.ok(snippet.includes('- **Caso Testigo auditado**: Total = Subtotal * 1.19'));
  assert.ok(snippet.includes('Entrada: 1200000 | Esperado: 1200000'));
  assert.ok(snippet.includes('#### Cobertura de los 4 Estados Obligatorios del Simulador'));
  assert.ok(snippet.includes('1. **Estado Válido (Entrada Válida)**:'));
  assert.ok(snippet.includes('2. **Estado Inválido (Entrada Inválida)**:'));
  assert.ok(snippet.includes('3. **Estado Vacío (Entrada Vacía)**:'));
  assert.ok(snippet.includes('4. **Estado Reinicio (Reset / Reinicio)**:'));
  assert.ok(snippet.includes('#### Registro Visual y Reflexión del Aprendiz'));
  assert.ok(snippet.includes('`[Pegar aquí evidencia o captura en /browser]`'));
  assert.ok(snippet.includes('`[Documentar hallazgos y trazabilidad de IA]`'));
});

test('6. kitGenerator.buildEvidenceSnippet respeta la regla anti-dossier y mantiene robustez ante entradas atípicas', () => {
  for (let id = 1; id <= 20; id++) {
    const snip = kitGen.buildEvidenceSnippet(id, { inputValue: 50 });
    assert.equal(/dossier/i.test(snip), false, `El snippet para el ejercicio ${id} no debe contener la palabra dossier`);
    assert.ok(snip.includes('Portafolio de Evidencias'), `El snippet para el ejercicio ${id} debe decir Portafolio de Evidencias`);
  }

  const snipNull = kitGen.buildEvidenceSnippet(null, null);
  assert.ok(snipNull.includes('MG-A01'), 'Entrada nula debe resolver al ejercicio 1 por defecto');
  assert.equal(/dossier/i.test(snipNull), false);

  const snipOutOfRangeHigh = kitGen.buildEvidenceSnippet(99, {});
  assert.ok(snipOutOfRangeHigh.includes('MG-A01'), 'ID fuera de rango superior debe aplicar fallback seguro al ejercicio 1');

  const snipOutOfRangeLow = kitGen.buildEvidenceSnippet(-3, {});
  assert.ok(snipOutOfRangeLow.includes('MG-A01'), 'ID negativo debe aplicar fallback seguro al ejercicio 1');

  const snipInvalidText = kitGen.buildEvidenceSnippet('invalido', {});
  assert.ok(snipInvalidText.includes('MG-A01'), 'ID no numérico debe aplicar fallback seguro al ejercicio 1');

  const snipInputValueFallback = kitGen.buildEvidenceSnippet(10, { inputValue: '45.5', expectedValue: 45.5 });
  assert.ok(snipInputValueFallback.includes('Entrada: 45.5 | Esperado: 45.5'), 'Debe aceptar inputValue cuando enteredValue es nulo');
});

/* ==========================================================================
   4. studyTimer (Máquina de estados determinista)
   ========================================================================== */

test('7. studyTimer.createTimerState inicializa el estado con valores por defecto, personalizados y límites', () => {
  const defaultState = studyTimer.createTimerState();
  assert.equal(defaultState.minutes, 3);
  assert.equal(defaultState.secondsLeft, 180);
  assert.equal(defaultState.totalSeconds, 180);
  assert.equal(defaultState.label, 'Estudio Conceptual');
  assert.equal(defaultState.isRunning, false);
  assert.equal(defaultState.isCompleted, false);

  const customState = studyTimer.createTimerState(5, 'Revisión de Arquitectura');
  assert.equal(customState.minutes, 5);
  assert.equal(customState.secondsLeft, 300);
  assert.equal(customState.totalSeconds, 300);
  assert.equal(customState.label, 'Revisión de Arquitectura');
  assert.equal(customState.isRunning, false);
  assert.equal(customState.isCompleted, false);

  const rawSecondsState = studyTimer.createTimerState(45, 'Micro-sprint');
  assert.equal(rawSecondsState.totalSeconds, 45, 'Valores numéricos > 30 deben interpretarse como segundos directos');
  assert.equal(rawSecondsState.secondsLeft, 45);
  assert.equal(rawSecondsState.minutes, 0.8);

  const zeroState = studyTimer.createTimerState(0, '');
  assert.equal(zeroState.totalSeconds >= 1, true, 'Cero minutos debe normalizarse al mínimo seguro de 1 segundo');
  assert.equal(zeroState.label, 'Estudio Conceptual', 'Label vacío debe adoptar el texto por defecto');
});

test('8. studyTimer.tickTimer es función pura, decrementa segundos y transiciona deterministamente a completado', () => {
  const sInit = {
    minutes: 3,
    secondsLeft: 10,
    totalSeconds: 180,
    label: 'Tarea A',
    isRunning: true,
    isCompleted: false
  };

  const sNext = studyTimer.tickTimer(sInit);

  assert.notEqual(sNext, sInit, 'tickTimer debe retornar un nuevo objeto sin mutar el original');
  assert.equal(sInit.secondsLeft, 10, 'El estado original no debe ser modificado');
  assert.equal(sNext.secondsLeft, 9, 'secondsLeft debe decrementar en 1');
  assert.equal(sNext.isRunning, true, 'isRunning debe mantenerse en true');
  assert.equal(sNext.isCompleted, false, 'isCompleted debe permanecer en false');

  const sNearEnd = {
    minutes: 3,
    secondsLeft: 1,
    totalSeconds: 180,
    label: 'Tarea A',
    isRunning: true,
    isCompleted: false
  };

  const sCompleted = studyTimer.tickTimer(sNearEnd);
  assert.equal(sCompleted.secondsLeft, 0, 'Al llegar a 0 los segundos restantes deben ser 0');
  assert.equal(sCompleted.isRunning, false, 'isRunning debe transicionar a false');
  assert.equal(sCompleted.isCompleted, true, 'isCompleted debe transicionar a true');

  const sAfterCompleted = studyTimer.tickTimer(sCompleted);
  assert.equal(sAfterCompleted.secondsLeft, 0);
  assert.equal(sAfterCompleted.isRunning, false);
  assert.equal(sAfterCompleted.isCompleted, true);

  assert.equal(studyTimer.tickTimer(null), null, 'tickTimer(null) debe retornar null con seguridad');
  assert.equal(studyTimer.tickTimer(undefined), undefined, 'tickTimer(undefined) debe retornar undefined con seguridad');
});

test('9. studyTimer.formatTime formatea segundos en formato MM:SS con precisión y soporte de límites', () => {
  assert.equal(studyTimer.formatTime(180), '03:00');
  assert.equal(studyTimer.formatTime(65), '01:05');
  assert.equal(studyTimer.formatTime(9), '00:09');
  assert.equal(studyTimer.formatTime(0), '00:00');

  assert.equal(studyTimer.formatTime(-15), '00:00', 'Segundos negativos deben normalizarse a 00:00');
  assert.equal(studyTimer.formatTime(3599), '59:59');
  assert.equal(studyTimer.formatTime(3665), '61:05', 'Tiempos superiores a 1 hora deben conservar minutos totales');
  assert.equal(studyTimer.formatTime(null), '00:00', 'null debe formatearse como 00:00');
  assert.equal(studyTimer.formatTime(undefined), '00:00', 'undefined debe formatearse como 00:00');
  assert.equal(studyTimer.formatTime('texto'), '00:00', 'Texto no numérico debe formatearse como 00:00');
  assert.equal(studyTimer.formatTime(59.9), '00:59', 'Decimales deben truncarse hacia abajo');
});

test('10. studyTimer.resetTimer restaura los segundos totales y limpia banderas de ejecución y completado', () => {
  const finishedState = {
    minutes: 3,
    secondsLeft: 0,
    totalSeconds: 180,
    label: 'Prueba Reset',
    isRunning: false,
    isCompleted: true
  };

  const resetState = studyTimer.resetTimer(finishedState);

  assert.notEqual(resetState, finishedState, 'resetTimer debe retornar un nuevo objeto');
  assert.equal(resetState.secondsLeft, 180, 'secondsLeft debe restablecerse al valor de totalSeconds');
  assert.equal(resetState.totalSeconds, 180);
  assert.equal(resetState.isRunning, false, 'isRunning debe quedar en false');
  assert.equal(resetState.isCompleted, false, 'isCompleted debe quedar en false');
  assert.equal(resetState.label, 'Prueba Reset', 'label debe conservarse');

  assert.equal(studyTimer.resetTimer(null), null, 'resetTimer(null) debe retornar null');
});

/* ==========================================================================
   5. studyTimer.handleKeyboardShortcut
   ========================================================================== */

test('11. studyTimer.handleKeyboardShortcut dispara las acciones correspondientes para los atajos válidos', () => {
  let invoked = null;
  let prevented = false;

  const actions = {
    toggleTheme: () => { invoked = 'toggleTheme'; },
    print: () => { invoked = 'print'; },
    nextExercise: () => { invoked = 'nextExercise'; },
    prevExercise: () => { invoked = 'prevExercise'; },
    focusSearch: () => { invoked = 'focusSearch'; }
  };

  const fakePrevent = () => { prevented = true; };

  invoked = null;
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, null), 'TOGGLE_THEME');
  assert.equal(invoked, 'toggleTheme');

  invoked = null;
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'T' }, actions, null), 'TOGGLE_THEME');
  assert.equal(invoked, 'toggleTheme');

  invoked = null;
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'p' }, actions, null), 'PRINT');
  assert.equal(invoked, 'print');

  invoked = null;
  prevented = false;
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'ArrowRight', preventDefault: fakePrevent }, actions, null), 'NEXT_EXERCISE');
  assert.equal(invoked, 'nextExercise');
  assert.equal(prevented, true, 'Alt+ArrowRight debe invocar preventDefault()');

  invoked = null;
  prevented = false;
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'ArrowLeft', preventDefault: fakePrevent }, actions, null), 'PREV_EXERCISE');
  assert.equal(invoked, 'prevExercise');
  assert.equal(prevented, true, 'Alt+ArrowLeft debe invocar preventDefault()');

  invoked = null;
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'ArrowRight' }, actions, null), 'NEXT_EXERCISE');
  assert.equal(invoked, 'nextExercise');

  invoked = null;
  prevented = false;
  assert.equal(studyTimer.handleKeyboardShortcut({ key: '/', preventDefault: fakePrevent }, actions, null), 'FOCUS_SEARCH');
  assert.equal(invoked, 'focusSearch');
  assert.equal(prevented, true, 'El atajo / debe invocar preventDefault()');

  invoked = null;
  prevented = false;
  assert.equal(studyTimer.handleKeyboardShortcut({ ctrlKey: true, key: 'k', preventDefault: fakePrevent }, actions, null), 'FOCUS_SEARCH');
  assert.equal(invoked, 'focusSearch');
  assert.equal(prevented, true, 'El atajo Ctrl+K debe invocar preventDefault()');

  let altInvoked = null;
  const altActions = {
    onToggleTheme: () => { altInvoked = 'onToggleTheme'; },
    onPrint: () => { altInvoked = 'onPrint'; },
    onNextExercise: () => { altInvoked = 'onNextExercise'; },
    onPrevExercise: () => { altInvoked = 'onPrevExercise'; },
    onFocusSearch: () => { altInvoked = 'onFocusSearch'; }
  };

  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, altActions, null), 'TOGGLE_THEME');
  assert.equal(altInvoked, 'onToggleTheme');

  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'z' }, actions, null), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ key: 'Enter' }, actions, null), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ ctrlKey: true, altKey: true, key: 't' }, actions, null), null);
  assert.equal(studyTimer.handleKeyboardShortcut(null, actions, null), null);
});

test('12. studyTimer.handleKeyboardShortcut respeta la protección contra campos editables e interactivos', () => {
  let invoked = false;
  const actions = {
    toggleTheme: () => { invoked = true; },
    focusSearch: () => { invoked = true; }
  };

  const inputEl = { tagName: 'INPUT' };
  const inputLowerEl = { tagName: 'input' };
  const textareaEl = { tagName: 'TEXTAREA' };
  const selectEl = { tagName: 'SELECT' };
  const contentEditableEl = { tagName: 'DIV', isContentEditable: true };

  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, inputEl), null);
  assert.equal(invoked, false, 'No debe disparar atajos cuando el elemento activo es INPUT');

  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, inputLowerEl), null);
  assert.equal(invoked, false, 'No debe disparar atajos cuando el tagName es en minúsculas');

  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, textareaEl), null);
  assert.equal(invoked, false, 'No debe disparar atajos cuando el elemento activo es TEXTAREA');

  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, selectEl), null);
  assert.equal(invoked, false, 'No debe disparar atajos cuando el elemento activo es SELECT');

  assert.equal(studyTimer.handleKeyboardShortcut({ key: '/' }, actions, contentEditableEl), null);
  assert.equal(invoked, false, 'No debe disparar atajos cuando el elemento activo tiene isContentEditable = true');

  const eventWithTarget = { altKey: true, key: 't', target: { tagName: 'INPUT' } };
  assert.equal(studyTimer.handleKeyboardShortcut(eventWithTarget, actions, null), null);
  assert.equal(invoked, false, 'Debe inferir el elemento activo desde event.target si no se pasa explícitamente');
});

test('13. studyTimer.initStudyTimerBar y startStudyTimer gestionan el ciclo de vida del controlador DOM y eventos de ventana', () => {
  const elements = {};
  function makeEl(id, tag = 'div') {
    elements[id] = {
      id,
      tagName: tag.toUpperCase(),
      textContent: '',
      attributes: {},
      clickedCount: 0,
      focused: false,
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); }
      },
      setAttribute(k, v) { this.attributes[k] = String(v); },
      getAttribute(k) { return this.attributes[k] || null; },
      listeners: {},
      addEventListener(evt, fn) { this.listeners[evt] = fn; },
      click() {
        this.clickedCount++;
        if (this.listeners.click) this.listeners.click();
      },
      focus() {
        this.focused = true;
      }
    };
    return elements[id];
  }

  makeEl('study-timer-bar');
  makeEl('study-timer-topic');
  makeEl('study-timer-display');
  makeEl('study-timer-toggle-btn', 'button');
  makeEl('study-timer-reset-btn', 'button');
  makeEl('study-timer-close-btn', 'button');
  makeEl('theme-toggle-btn', 'button');
  makeEl('next-exercise-btn', 'button');
  makeEl('prev-exercise-btn', 'button');
  makeEl('next-ag-btn', 'button');
  makeEl('prev-ag-btn', 'button');
  makeEl('search-input', 'input');

  const mockStorageMap = new Map();
  const mockStorage = {
    getItem: (k) => mockStorageMap.get(k) || null,
    setItem: (k, v) => mockStorageMap.set(k, String(v))
  };

  let winKeydownListener = null;
  let printed = false;
  const mockWin = {
    addEventListener(evt, fn) {
      if (evt === 'keydown') winKeydownListener = fn;
    },
    print() {
      printed = true;
    }
  };

  const mockDoc = {
    getElementById(id) { return elements[id] || null; },
    querySelector(sel) { return sel.includes('search') ? elements['search-input'] : null; },
    defaultView: mockWin,
    activeElement: null
  };

  let tickCallback = null;
  const origSetInterval = globalThis.setInterval;
  const origClearInterval = globalThis.clearInterval;
  let toastMessage = null;
  const origPortal = globalThis.AGPortal;

  try {
    globalThis.setInterval = (fn) => {
      tickCallback = fn;
      return 12345;
    };
    globalThis.clearInterval = () => {
      tickCallback = null;
    };
    globalThis.AGPortal = {
      showToast(msg) {
        toastMessage = msg;
      }
    };

    const controller = studyTimer.initStudyTimerBar(mockDoc, mockStorage);
    assert.ok(controller, 'initStudyTimerBar debe retornar un controlador activo');
    assert.equal(typeof controller.start, 'function');
    assert.equal(typeof controller.pause, 'function');
    assert.equal(typeof controller.reset, 'function');
    assert.equal(typeof controller.destroy, 'function');

    assert.equal(elements['study-timer-topic'].textContent, 'Estudio Conceptual');
    assert.equal(elements['study-timer-display'].textContent, '03:00');
    assert.equal(elements['study-timer-toggle-btn'].textContent, 'Reanudar');

    // Iniciar con 1/60 minutos (1 segundo) para probar tickTimer y transición de completado
    controller.start(1 / 60, 'Sprint Final');
    const runningState = controller.getState();
    assert.equal(runningState.label, 'Sprint Final');
    assert.equal(runningState.secondsLeft, 1);
    assert.equal(runningState.isRunning, true);
    assert.equal(elements['study-timer-display'].textContent, '00:01');
    assert.equal(elements['study-timer-toggle-btn'].textContent, 'Pausar');

    // Ejecutar el callback del temporizador deterministamente
    assert.ok(typeof tickCallback === 'function', 'setInterval debió registrar un callback');
    tickCallback();

    const completedState = controller.getState();
    assert.equal(completedState.secondsLeft, 0);
    assert.equal(completedState.isRunning, false);
    assert.equal(completedState.isCompleted, true);
    assert.equal(toastMessage, '¡Tiempo cumplido! Tarea: Sprint Final');

    // Pausa y reinicio
    controller.reset();
    assert.equal(controller.getState().secondsLeft, 1);
    assert.equal(controller.getState().isCompleted, false);

    // Conmutar mediante botón toggle (estando pausado, inicia)
    elements['study-timer-toggle-btn'].click();
    assert.equal(controller.getState().isRunning, true);
    // Conmutar nuevamente (estando en ejecución, pausa)
    elements['study-timer-toggle-btn'].click();
    assert.equal(controller.getState().isRunning, false);

    // Botón reset
    elements['study-timer-reset-btn'].click();
    assert.equal(controller.getState().isRunning, false);

    // Botón close oculta la barra
    elements['study-timer-close-btn'].click();
    assert.equal(elements['study-timer-bar'].classList.contains('hidden'), true);

    // Invocación a través de startStudyTimer global
    studyTimer.startStudyTimer(2, 'Vía Global');
    assert.equal(controller.getState().label, 'Vía Global');
    assert.equal(controller.getState().secondsLeft, 120);

    // Ejercitar atajos de teclado globales en mockWin
    assert.ok(typeof winKeydownListener === 'function', 'Se debió registrar un listener de keydown en window');
    winKeydownListener({ altKey: true, key: 't' });
    assert.equal(elements['theme-toggle-btn'].clickedCount, 1, 'Alt+T debe hacer click en #theme-toggle-btn');

    winKeydownListener({ altKey: true, key: 'p' });
    assert.equal(printed, true, 'Alt+P debe llamar a win.print()');

    winKeydownListener({ altKey: true, key: 'ArrowRight' });
    assert.equal(elements['next-exercise-btn'].clickedCount, 1, 'Alt+ArrowRight debe hacer click en #next-exercise-btn');

    winKeydownListener({ altKey: true, key: 'ArrowLeft' });
    assert.equal(elements['prev-exercise-btn'].clickedCount, 1, 'Alt+ArrowLeft debe hacer click en #prev-exercise-btn');

    // Fallback a #next-ag-btn y #prev-ag-btn cuando faltan #next-exercise-btn / #prev-exercise-btn
    delete elements['next-exercise-btn'];
    delete elements['prev-exercise-btn'];

    winKeydownListener({ altKey: true, key: 'ArrowRight' });
    assert.equal(elements['next-ag-btn'].clickedCount, 1, 'Alt+ArrowRight debe hacer fallback a #next-ag-btn');

    winKeydownListener({ altKey: true, key: 'ArrowLeft' });
    assert.equal(elements['prev-ag-btn'].clickedCount, 1, 'Alt+ArrowLeft debe hacer fallback a #prev-ag-btn');

    winKeydownListener({ key: '/', preventDefault() {} });
    assert.equal(elements['search-input'].focused, true, '/ debe hacer focus en #search-input');

    controller.destroy();
  } finally {
    globalThis.setInterval = origSetInterval;
    globalThis.clearInterval = origClearInterval;
    globalThis.AGPortal = origPortal;
  }
});

/* ==========================================================================
   6. promptBuilder.exerciseToPromptSpec
   ========================================================================== */

test('14. promptBuilder.exerciseToPromptSpec transforma los 26 ejercicios y todos alcanzan 100 puntos («Profesional Asertivo»)', () => {
  assert.equal(ALL_AG_EXERCISES.length, 26, 'Deben existir 26 ejercicios de Antigravity en el catálogo');

  ALL_AG_EXERCISES.forEach((ex) => {
    const spec = promptBuilder.exerciseToPromptSpec(ex);

    assert.ok(spec, `El ejercicio ${ex.id} debe producir una especificación no nula`);
    assert.ok(typeof spec.role === 'string' && spec.role.length >= 8, `El rol del ejercicio ${ex.id} debe tener al menos 8 caracteres`);
    assert.ok(typeof spec.goal === 'string' && spec.goal.length >= 15, `El objetivo del ejercicio ${ex.id} debe tener al menos 15 caracteres`);
    assert.equal(spec.objective, spec.goal, `objective y goal deben ser coherentes en el ejercicio ${ex.id}`);
    assert.ok(typeof spec.atFiles === 'string' && spec.atFiles.includes('@'), `atFiles del ejercicio ${ex.id} debe incluir al menos una mención @`);
    assert.ok(spec.atFiles.includes(ex.kit.filename), `atFiles del ejercicio ${ex.id} debe incluir su archivo semilla: ${ex.kit.filename}`);
    assert.equal(spec.contextFiles, spec.atFiles, `contextFiles y atFiles deben ser coherentes en el ejercicio ${ex.id}`);
    const expectedCmd = (ex.initialPrompt.match(/^\/(grill-me|goal)\b/) || [])[0] || 'planning';
    assert.equal(spec.command, expectedCmd, `El comando del ejercicio ${ex.id} debe ser ${expectedCmd}`);
    assert.ok(typeof spec.constraints === 'string' && spec.constraints.length >= 12, `Las restricciones del ejercicio ${ex.id} deben tener al menos 12 caracteres`);
    assert.ok(spec.constraints.includes('es-CO'), `Las restricciones del ejercicio ${ex.id} deben especificar español de Colombia`);
    assert.ok(spec.constraints.includes('4 estados'), `Las restricciones del ejercicio ${ex.id} deben requerir los 4 estados`);
    assert.ok(spec.formula && spec.formula.length > 5, `El ejercicio ${ex.id} debe conservar la fórmula o invariante`);
    assert.ok(spec.conceptualTheme && spec.conceptualTheme.length > 5, `El ejercicio ${ex.id} debe tener tema conceptual`);
    assert.equal(spec.conceptualTopic, spec.conceptualTheme, `conceptualTopic y conceptualTheme deben coincidir`);

    const evalResult = promptBuilder.scorePromptSpec(spec);
    assert.equal(evalResult.score, 100, `El ejercicio ${ex.id} (${ex.title}) debe calificar con exactamente 100 puntos`);
    assert.equal(evalResult.level, 'Profesional Asertivo', `El nivel del ejercicio ${ex.id} debe ser Profesional Asertivo`);
    assert.equal(evalResult.checks.length, 5, 'Deben evaluarse los 5 criterios de calidad');
    assert.ok(evalResult.checks.every(c => c.ok), `Todos los criterios de calidad deben ser aprobados en el ejercicio ${ex.id}`);
  });
});

test('15. promptBuilder.exerciseToPromptSpec maneja casos nulos y fallbacks con precisión determinista', () => {
  assert.equal(promptBuilder.exerciseToPromptSpec(null), null, 'exerciseToPromptSpec(null) debe retornar null');
  assert.equal(promptBuilder.exerciseToPromptSpec(undefined), null, 'exerciseToPromptSpec(undefined) debe retornar null');

  const syntheticWithoutPrompt = {
    id: 99,
    title: 'Automatización Sintética',
    nonDevProfile: 'Analista de Operaciones',
    goal: 'Verificar la consistencia del catálogo sintético.',
    kit: { filename: 'datos_sinteticos.csv' },
    testCase: { formulaHint: 'X = Y + Z', unit: 'COP' },
    conceptualTaskTitle: 'Flujo Operativo'
  };

  const specSynth = promptBuilder.exerciseToPromptSpec(syntheticWithoutPrompt);
  assert.equal(specSynth.role, 'Especialista en Analista de Operaciones');
  assert.ok(specSynth.atFiles.includes('@datos_sinteticos.csv'));
  const evalSynth = promptBuilder.scorePromptSpec(specSynth);
  assert.equal(evalSynth.score, 100);
  assert.equal(evalSynth.level, 'Profesional Asertivo');

  const minimalExercise = {
    id: 100,
    title: 'Ejercicio Mínimo'
  };
  const specMinimal = promptBuilder.exerciseToPromptSpec(minimalExercise);
  assert.equal(specMinimal.role, 'Consultor de Automatización Antigravity');
  assert.ok(specMinimal.atFiles.includes('@datos_semilla.csv'));
  assert.ok(specMinimal.constraints.includes('Regla: Validación matemática determinista'));
});
