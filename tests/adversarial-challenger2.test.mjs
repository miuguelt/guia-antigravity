import test from 'node:test';
import assert from 'node:assert/strict';

// Importar módulos bajo prueba
import studyTimer from '../js/ui/study-timer.js';
import promptBuilder from '../js/core/prompt-builder.js';
import agN1N2 from '../js/data/ag-exercises-n1-n2.js';
import agN3N4 from '../js/data/ag-exercises-n3-n4.js';

const ALL_AG_EXERCISES = [...(agN1N2.AG_EXERCISES_N1_N2 || []), ...(agN3N4.AG_EXERCISES_N3_N4 || [])];

/* ==========================================================================
   SECCIÓN 1: STRESS-TESTING studyTimer.handleKeyboardShortcut
   ========================================================================== */

test('CHALLENGER 2.1: studyTimer.handleKeyboardShortcut con eventos nulos, indefinidos y tipos primitivos falsos', () => {
  assert.equal(studyTimer.handleKeyboardShortcut(null), null);
  assert.equal(studyTimer.handleKeyboardShortcut(undefined), null);
  assert.equal(studyTimer.handleKeyboardShortcut(false), null);
  assert.equal(studyTimer.handleKeyboardShortcut(0), null);
  assert.equal(studyTimer.handleKeyboardShortcut(''), null);
  assert.equal(studyTimer.handleKeyboardShortcut(NaN), null);
  assert.equal(studyTimer.handleKeyboardShortcut({}), null);
});

test('CHALLENGER 2.2: studyTimer.handleKeyboardShortcut con teclas y modifiers anómalos', () => {
  let invoked = false;
  const actions = { toggleTheme: () => { invoked = true; } };

  // Tecla como número o null o undefined
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: null }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: undefined }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 123 }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: '' }, actions), null);
  assert.equal(invoked, false);

  // Teclas del sistema o composición IME
  const systemKeys = ['Dead', 'Process', 'Unidentified', 'CapsLock', 'Control', 'Shift', 'Alt', 'Meta', 'Escape', 'Enter', 'Tab', 'F1', 'F12'];
  for (const k of systemKeys) {
    assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: k }, actions), null);
    assert.equal(studyTimer.handleKeyboardShortcut({ key: k }, actions), null);
  }
  assert.equal(invoked, false);
});

test('CHALLENGER 2.3: studyTimer.handleKeyboardShortcut con combinaciones conflictivas de modificadores', () => {
  let count = 0;
  const actions = {
    toggleTheme: () => { count++; },
    print: () => { count++; },
    nextExercise: () => { count++; },
    prevExercise: () => { count++; },
    focusSearch: () => { count++; }
  };

  // Alt + Ctrl no debe disparar atajos basados en Alt (evitar choque con Ctrl+Alt+T o Ctrl+Alt en SO)
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, ctrlKey: true, key: 't' }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, ctrlKey: true, key: 'p' }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, ctrlKey: true, key: 'ArrowRight' }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, ctrlKey: true, key: 'ArrowLeft' }, actions), null);

  // Alt + Meta no debe disparar atajos (evitar choque en macOS con Cmd+Option)
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, metaKey: true, key: 't' }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, metaKey: true, key: 'p' }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, metaKey: true, key: 'ArrowRight' }, actions), null);

  // Ctrl + Alt para / o K debe retornar null
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, ctrlKey: true, key: 'k' }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, ctrlKey: false, key: '/' }, actions), null);
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: false, ctrlKey: true, key: '/' }, actions), null);

  // Todo lo anterior no debió ejecutar ninguna acción
  assert.equal(count, 0, 'Ninguna acción debió ejecutarse bajo combinaciones conflictivas de modificadores');

  // Atajos válidos sí deben responder
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions), 'TOGGLE_THEME');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'T' }, actions), 'TOGGLE_THEME');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'p' }, actions), 'PRINT');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'P' }, actions), 'PRINT');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'ArrowRight' }, actions), 'NEXT_EXERCISE');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'ArrowLeft' }, actions), 'PREV_EXERCISE');
  assert.equal(studyTimer.handleKeyboardShortcut({ key: '/' }, actions), 'FOCUS_SEARCH');
  assert.equal(studyTimer.handleKeyboardShortcut({ ctrlKey: true, key: 'k' }, actions), 'FOCUS_SEARCH');
  assert.equal(studyTimer.handleKeyboardShortcut({ ctrlKey: true, key: 'K' }, actions), 'FOCUS_SEARCH');
  assert.equal(count, 9, 'Los 9 atajos válidos debieron ejecutarse exactamente 1 vez cada uno');
});

test('CHALLENGER 2.4: studyTimer.handleKeyboardShortcut protección estricta de elementos editables y anidados', () => {
  let executed = false;
  const actions = { toggleTheme: () => { executed = true; }, focusSearch: () => { executed = true; } };

  // TagNames en minúsculas y mayúsculas
  const editableTags = ['INPUT', 'input', 'TEXTAREA', 'textarea', 'SELECT', 'select'];
  for (const t of editableTags) {
    executed = false;
    const res = studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, { tagName: t });
    assert.equal(res, null, `Tag ${t} no debe permitir atajos`);
    assert.equal(executed, false, `Tag ${t} no debió disparar acción`);
  }

  // Elementos con isContentEditable = true
  const contentEditables = [
    { tagName: 'DIV', isContentEditable: true },
    { tagName: 'SPAN', isContentEditable: true },
    { tagName: 'SECTION', isContentEditable: true },
    { tagName: 'P', isContentEditable: true }
  ];
  for (const el of contentEditables) {
    executed = false;
    assert.equal(studyTimer.handleKeyboardShortcut({ key: '/' }, actions, el), null);
    assert.equal(executed, false);
  }

  // Elementos que NO son editables deben permitir ejecución
  const normalElements = [
    { tagName: 'DIV', isContentEditable: false },
    { tagName: 'BUTTON', isContentEditable: false },
    { tagName: 'BODY', isContentEditable: false },
    { tagName: 'NAV', isContentEditable: false }
  ];
  for (const el of normalElements) {
    executed = false;
    assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, el), 'TOGGLE_THEME');
    assert.equal(executed, true);
  }

  // target en event si activeElement es null
  executed = false;
  const evtWithTarget = { altKey: true, key: 't', target: { tagName: 'input' } };
  assert.equal(studyTimer.handleKeyboardShortcut(evtWithTarget, actions, null), null);
  assert.equal(executed, false);

  // activeElement con propiedades nulas o ausentes
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, { tagName: null }), 'TOGGLE_THEME');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, {}), 'TOGGLE_THEME');

  // HALLAZGO OBSERVACIONAL: Si activeElement o event.target tiene tagName numérico no coercido, arroja TypeError
  assert.throws(() => {
    studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, actions, { tagName: 999 });
  }, /toUpperCase is not a function/);
});

test('CHALLENGER 2.5: studyTimer.handleKeyboardShortcut con actions corruptas o ausentes y preventDefault defectuoso', () => {
  // Actions ausentes o tipos inválidos
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, null), 'TOGGLE_THEME');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, undefined), 'TOGGLE_THEME');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, { toggleTheme: 'no soy funcion' }), 'TOGGLE_THEME');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, { toggleTheme: 42 }), 'TOGGLE_THEME');

  // Soporte alternativo onToggleTheme, onPrint, onNextExercise, etc.
  let onCount = 0;
  const altActions = {
    onToggleTheme: () => { onCount++; },
    onPrint: () => { onCount++; },
    onNextExercise: () => { onCount++; },
    onPrevExercise: () => { onCount++; },
    onFocusSearch: () => { onCount++; }
  };
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 't' }, altActions), 'TOGGLE_THEME');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'p' }, altActions), 'PRINT');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'ArrowRight' }, altActions), 'NEXT_EXERCISE');
  assert.equal(studyTimer.handleKeyboardShortcut({ altKey: true, key: 'ArrowLeft' }, altActions), 'PREV_EXERCISE');
  assert.equal(studyTimer.handleKeyboardShortcut({ key: '/' }, altActions), 'FOCUS_SEARCH');
  assert.equal(onCount, 5, 'Deben ejecutarse las variantes on[Action]');

  // preventDefault ausente o no-función
  assert.equal(studyTimer.handleKeyboardShortcut({ key: '/', preventDefault: 'no es funcion' }, altActions), 'FOCUS_SEARCH');
  assert.equal(studyTimer.handleKeyboardShortcut({ key: '/', preventDefault: null }, altActions), 'FOCUS_SEARCH');
});

/* ==========================================================================
   SECCIÓN 2: STRESS-TESTING promptBuilder.exerciseToPromptSpec
   ========================================================================== */

test('CHALLENGER 2.6: promptBuilder.exerciseToPromptSpec con entradas nulas y falsas retorna null; primitivos veraces generan fallback robusto', () => {
  // Valores falsy devuelven null
  assert.equal(promptBuilder.exerciseToPromptSpec(null), null);
  assert.equal(promptBuilder.exerciseToPromptSpec(undefined), null);
  assert.equal(promptBuilder.exerciseToPromptSpec(0), null);
  assert.equal(promptBuilder.exerciseToPromptSpec(''), null);
  assert.equal(promptBuilder.exerciseToPromptSpec(false), null);
  assert.equal(promptBuilder.exerciseToPromptSpec(NaN), null);

  // Valores primitivos truthy (ej. 12345 o "ejercicio") son procesados con fallbacks sin arrojar excepción
  const specNumber = promptBuilder.exerciseToPromptSpec(12345);
  assert.ok(specNumber, 'Primitivo truthy produce un objeto de especificación por defecto');
  assert.equal(specNumber.role, 'Consultor de Automatización Antigravity');
  assert.equal(specNumber.command, '/plan');
  const evalNumber = promptBuilder.scorePromptSpec(specNumber);
  assert.equal(evalNumber.score, 100);
});

test('CHALLENGER 2.7: promptBuilder.exerciseToPromptSpec con objeto vacío o campos faltantes genera especificación robusta', () => {
  const emptyEx = {};
  const spec = promptBuilder.exerciseToPromptSpec(emptyEx);

  assert.ok(spec, 'Debe devolver un objeto no nulo');
  assert.equal(spec.role, 'Consultor de Automatización Antigravity');
  assert.equal(spec.goal, 'Construir solución modular y verificada para el ejercicio.');
  assert.equal(spec.command, '/plan');
  assert.equal(spec.atFiles, '@datos_semilla.csv, @GEMINI.md');
  assert.equal(spec.formula, 'Validación matemática determinista');
  assert.ok(spec.constraints.includes('es-CO'));
  assert.ok(spec.constraints.includes('4 estados'));
  assert.equal(spec.conceptualTheme, 'Estudio Conceptual');
  assert.deepEqual(spec.testCase, { sampleInput: '100', expectedValue: 100 });

  // Verificar que una especificación con valores por defecto califica con 100 puntos
  const evaluation = promptBuilder.scorePromptSpec(spec);
  assert.equal(evaluation.score, 100);
  assert.equal(evaluation.level, 'Profesional Asertivo');
});

test('CHALLENGER 2.8: promptBuilder.exerciseToPromptSpec con fórmulas complejas, caracteres matemáticos y unicode', () => {
  const complexFormulas = [
    'Margen = (Precio_Neto - Costo) / Precio_Neto',
    '\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n - 1} \\ge 0.05',
    'Stock_Seguridad = Z \\times \\sqrt{L \\times \\sigma_D^2 + D^2 \\times \\sigma_L^2}',
    'VAN = \\sum_{t=1}^n \\frac{F_t}{(1 + k)^t} - I_0 > 0',
    'Simulación con emojis 🚀 💰 & caracteres reservados <script>"\'`'
  ];

  complexFormulas.forEach((formula, idx) => {
    const ex = {
      id: 200 + idx,
      title: 'Ejercicio Adversarial con Fórmula Compleja ' + idx,
      initialPrompt: 'Actúa como Matemático Cuantitativo y Especialista en Algoritmos.',
      kit: { filename: `modelo_matematico_${idx}.csv` },
      testCase: {
        formulaHint: formula,
        unit: 'COP'
      },
      conceptualTaskTitle: 'Verificación de Invariantes Matemáticos'
    };

    const spec = promptBuilder.exerciseToPromptSpec(ex);
    assert.equal(spec.formula, formula);
    assert.ok(spec.constraints.includes(formula));
    assert.equal(spec.role, 'Matemático Cuantitativo y Especialista en Algoritmos');
    assert.ok(spec.atFiles.includes(`modelo_matematico_${idx}.csv`));

    const evalResult = promptBuilder.scorePromptSpec(spec);
    assert.equal(evalResult.score, 100);
    assert.equal(evalResult.level, 'Profesional Asertivo');

    // Comprobar que no rompe los constructores secundarios
    const promptText = promptBuilder.buildAntigravityPrompt(spec);
    assert.ok(promptText.includes('/plan Actúa como Matemático Cuantitativo'));
    assert.ok(promptText.includes(formula));

    const guideText = promptBuilder.buildConceptualTaskGuide(spec);
    assert.ok(guideText.includes('Verificación de Invariantes Matemáticos'));

    const geminiText = promptBuilder.buildGeminiMdTemplate(spec);
    assert.ok(geminiText.includes('GEMINI.md'));

    const skillText = promptBuilder.buildSkillMdTemplate(spec);
    assert.ok(skillText.includes('name:'));
  });
});

test('CHALLENGER 2.9: promptBuilder.exerciseToPromptSpec con tipos corruptos en propiedades internas', () => {
  const corruptEx = {
    id: 'not-a-number',
    title: 12345, // número en title
    initialPrompt: 999999, // no es string
    kit: 'no-es-objeto-es-string', // kit corrupto
    testCase: 888888, // testCase corrupto
    conceptualTaskTitle: null
  };

  const spec = promptBuilder.exerciseToPromptSpec(corruptEx);
  assert.ok(spec);
  assert.equal(spec.role, 'Consultor de Automatización Antigravity');
  assert.equal(spec.goal, 'Construir solución modular y verificada para 12345.');
  assert.equal(spec.atFiles, '@datos_semilla.csv, @GEMINI.md');
  assert.equal(spec.formula, 'Validación matemática determinista');
  assert.equal(spec.conceptualTheme, 12345);

  const evalResult = promptBuilder.scorePromptSpec(spec);
  assert.equal(evalResult.score, 100);
  assert.equal(evalResult.level, 'Profesional Asertivo');
});

/* ==========================================================================
   SECCIÓN 3: VERIFICACIÓN EXHAUSTIVA DE LOS 20 EJERCICIOS ANTIGRAVITY
   ========================================================================== */

test('CHALLENGER 2.10: Los 20 ejercicios de Antigravity pasan scorePromptSpec con 100 puntos sin excepción', () => {
  assert.equal(ALL_AG_EXERCISES.length, 20, 'Deben existir exactamente 20 ejercicios de Antigravity');

  const scores = [];

  ALL_AG_EXERCISES.forEach((ex, index) => {
    assert.equal(ex.id, index + 1, `El ejercicio debe tener ID correlativo ${index + 1}`);
    assert.ok(ex.title && ex.title.trim().length > 5, `El ejercicio ${ex.id} debe tener título significativo`);
    assert.ok(ex.kit && ex.kit.filename, `El ejercicio ${ex.id} debe declarar su kit y filename`);
    assert.ok(ex.testCase, `El ejercicio ${ex.id} debe declarar su testCase`);

    const spec = promptBuilder.exerciseToPromptSpec(ex);
    assert.ok(spec, `exerciseToPromptSpec no debe retornar null para el ejercicio ${ex.id}`);

    // Asertos de integridad de la especificación
    assert.ok(typeof spec.role === 'string', `Role debe ser string en ejercicio ${ex.id}`);
    assert.ok(spec.role.length >= 8, `Role "${spec.role}" en ejercicio ${ex.id} tiene menos de 8 caracteres`);

    assert.ok(typeof spec.goal === 'string', `Goal debe ser string en ejercicio ${ex.id}`);
    assert.ok(spec.goal.length >= 15, `Goal "${spec.goal}" en ejercicio ${ex.id} tiene menos de 15 caracteres`);

    assert.ok(typeof spec.atFiles === 'string', `atFiles debe ser string en ejercicio ${ex.id}`);
    assert.ok(spec.atFiles.includes('@'), `atFiles debe contener @ en ejercicio ${ex.id}`);
    assert.ok(spec.atFiles.includes(ex.kit.filename), `atFiles debe contener ${ex.kit.filename} en ejercicio ${ex.id}`);

    assert.equal(spec.command, '/plan', `Command debe ser /plan en ejercicio ${ex.id}`);

    assert.ok(typeof spec.constraints === 'string', `Constraints debe ser string en ejercicio ${ex.id}`);
    assert.ok(spec.constraints.length >= 12, `Constraints en ejercicio ${ex.id} tiene menos de 12 caracteres`);
    assert.ok(spec.constraints.includes('es-CO'), `Constraints en ejercicio ${ex.id} debe declarar es-CO`);
    assert.ok(spec.constraints.includes('4 estados'), `Constraints en ejercicio ${ex.id} debe requerir los 4 estados`);

    const evalResult = promptBuilder.scorePromptSpec(spec);
    scores.push({ id: ex.id, title: ex.title, score: evalResult.score, level: evalResult.level });

    assert.equal(evalResult.score, 100, `El ejercicio ${ex.id} (${ex.title}) obtuvo ${evalResult.score} en vez de 100`);
    assert.equal(evalResult.level, 'Profesional Asertivo', `El ejercicio ${ex.id} tiene nivel ${evalResult.level}`);
    assert.equal(evalResult.checks.length, 5, `El ejercicio ${ex.id} debe tener 5 checks`);
    assert.ok(evalResult.checks.every(c => c.ok), `Todos los checks deben estar aprobados en ejercicio ${ex.id}`);
  });

  assert.equal(scores.length, 20);
  assert.ok(scores.every(s => s.score === 100), 'Los 20 ejercicios obtuvieron exactamente 100 puntos');
});
