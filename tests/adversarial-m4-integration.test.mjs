/**
 * tests/adversarial-m4-integration.test.mjs
 * 
 * Challenger 2 (challenger_2_v2) — Milestone 4 Integration Stress Harness
 * 
 * Verificación adversarial empírica de integración global de los 40 ejercicios:
 * 1. Validación exhaustiva de las 21 propiedades en los 20 ejercicios de Antigravity.
 * 2. Validación exhaustiva de las 11+ propiedades en los 20 ejercicios de Gemini Canvas.
 * 3. Integración y estrés de kitGenerator.buildAllKitsBundle() y buildEvidenceSnippet.
 * 4. Stress testing y mutaciones adversariales de los 20 prompts de Canvas contra promptBuilder.
 * 5. Consistencia cruzada con simulatorEngine (4 estados deterministas sin setTimeout).
 * 6. Erradicación total del extranjerismo «dossier» a favor de «Portafolio de Evidencias».
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

// Módulos bajo prueba
import agN1N2 from '../js/data/ag-exercises-n1-n2.js';
import agN3N4 from '../js/data/ag-exercises-n3-n4.js';
import canvasN1N2 from '../js/data/canvas-exercises-n1-n2.js';
import canvasN3N4 from '../js/data/canvas-exercises-n3-n4.js';
import kitGenerator from '../js/core/kit-generator.js';
import promptBuilder from '../js/core/prompt-builder.js';
import simulatorEngine from '../js/core/simulator-engine.js';

const ALL_AG_EXERCISES = [...(agN1N2.AG_EXERCISES_N1_N2 || []), ...(agN3N4.AG_EXERCISES_N3_N4 || [])];
const ALL_CANVAS_EXERCISES = [...(canvasN1N2.CANVAS_EXERCISES_N1_N2 || []), ...(canvasN3N4.CANVAS_EXERCISES_N3_N4 || [])];

/* ==========================================================================
   GRUPO 1: CONTRATO DE 21 PROPIEDADES EN LOS 20 EJERCICIOS DE ANTIGRAVITY
   ========================================================================== */

const REQUIRED_AG_PROPERTIES = [
  'id',
  'level',
  'levelName',
  'title',
  'duration',
  'complexity',
  'nonDevProfile',
  'goal',
  'businessChallenge',
  'agentRoleAction',
  'learnerParallelAction',
  'professionalOutputCriteria',
  'antigravitySteps',
  'initialPrompt',
  'conceptualTaskTitle',
  'conceptualTheory',
  'conceptualTaskSteps',
  'parallelToolPrompt',
  'refinementPrompt',
  'kit',
  'testCase'
];

const REQUIRED_TESTCASE_PROPERTIES = [
  'label',
  'sampleInput',
  'expectedValue',
  'tolerance',
  'unit',
  'formulaHint'
];

test('AG-M4-01: Los 20 ejercicios de Antigravity contienen estrictamente las 21 propiedades requeridas', () => {
  assert.equal(ALL_AG_EXERCISES.length, 20, 'Deben existir exactamente 20 ejercicios de Antigravity');

  ALL_AG_EXERCISES.forEach((ex, idx) => {
    const expectedId = idx + 1;
    assert.equal(ex.id, expectedId, `Ejercicio Antigravity #${expectedId}: ID correlativo esperado`);

    const keys = Object.keys(ex);
    assert.equal(keys.length, 21, `Ejercicio Antigravity #${expectedId}: debe contener exactamente 21 propiedades`);

    REQUIRED_AG_PROPERTIES.forEach(prop => {
      assert.ok(prop in ex, `Ejercicio Antigravity #${expectedId}: propiedad requerida faltante: "${prop}"`);
      assert.notEqual(ex[prop], null, `Ejercicio Antigravity #${expectedId}: propiedad "${prop}" no debe ser nula`);
      assert.notEqual(ex[prop], undefined, `Ejercicio Antigravity #${expectedId}: propiedad "${prop}" no debe ser indefinida`);
    });

    // Validar colecciones internas
    assert.ok(Array.isArray(ex.antigravitySteps) && ex.antigravitySteps.length >= 3,
      `Ejercicio #${expectedId}: antigravitySteps debe tener al menos 3 pasos guiados`);
    assert.ok(Array.isArray(ex.conceptualTaskSteps) && ex.conceptualTaskSteps.length >= 2,
      `Ejercicio #${expectedId}: conceptualTaskSteps debe tener al menos 2 pasos`);
    assert.ok(typeof ex.kit === 'object' && ex.kit.filename,
      `Ejercicio #${expectedId}: kit debe ser un objeto con filename definido`);
  });
});

test('AG-M4-02: Sub-estructura testCase y veracidad matemática determinista en los 20 ejercicios Antigravity', () => {
  ALL_AG_EXERCISES.forEach(ex => {
    const tc = ex.testCase;
    assert.ok(tc && typeof tc === 'object', `Ejercicio #${ex.id}: testCase debe ser un objeto`);

    REQUIRED_TESTCASE_PROPERTIES.forEach(prop => {
      assert.ok(prop in tc, `Ejercicio #${ex.id}: testCase debe incluir propiedad "${prop}"`);
    });

    assert.ok(typeof tc.expectedValue === 'number' && Number.isFinite(tc.expectedValue),
      `Ejercicio #${ex.id}: expectedValue debe ser un número finito (${tc.expectedValue})`);
    assert.ok(typeof tc.tolerance === 'number' && tc.tolerance >= 0,
      `Ejercicio #${ex.id}: tolerance debe ser un número no negativo`);
    assert.ok(typeof tc.sampleInput === 'string' && tc.sampleInput.trim().length > 0,
      `Ejercicio #${ex.id}: sampleInput debe ser una cadena no vacía`);
    assert.ok(typeof tc.formulaHint === 'string' && tc.formulaHint.trim().length > 10,
      `Ejercicio #${ex.id}: formulaHint debe ser descriptivo`);
  });
});

/* ==========================================================================
   GRUPO 2: CONTRATO DE PROPIEDADES EN LOS 20 EJERCICIOS DE GEMINI CANVAS
   ========================================================================== */

const REQUIRED_CANVAS_PROPERTIES = [
  'id',
  'level',
  'title',
  'goal',
  'initialPrompt',
  'studyTopic',
  'studyExplanation',
  'studyKeyPoints',
  'parallelStudyPrompt',
  'refinementPrompt',
  'stepByStepGuide',
  'antigravityBridge'
];

test('CANVAS-M4-01: Los 20 ejercicios de Gemini Canvas contienen las propiedades requeridas y tipado estricto', () => {
  assert.equal(ALL_CANVAS_EXERCISES.length, 20, 'Deben existir exactamente 20 ejercicios de Canvas');

  ALL_CANVAS_EXERCISES.forEach((ex, idx) => {
    const expectedId = idx + 1;
    assert.equal(ex.id, expectedId, `Ejercicio Canvas #${expectedId}: ID correlativo esperado`);

    REQUIRED_CANVAS_PROPERTIES.forEach(prop => {
      assert.ok(prop in ex, `Ejercicio Canvas #${expectedId}: falta propiedad obligatoria "${prop}"`);
      assert.notEqual(ex[prop], null, `Ejercicio Canvas #${expectedId}: "${prop}" es nulo`);
      assert.notEqual(ex[prop], undefined, `Ejercicio Canvas #${expectedId}: "${prop}" es indefinido`);
    });

    assert.ok(Array.isArray(ex.studyKeyPoints) && ex.studyKeyPoints.length >= 3,
      `Ejercicio Canvas #${expectedId}: studyKeyPoints debe contener al menos 3 puntos`);
    assert.ok(Array.isArray(ex.stepByStepGuide) && ex.stepByStepGuide.length >= 3,
      `Ejercicio Canvas #${expectedId}: stepByStepGuide debe contener al menos 3 pasos`);
    assert.ok(ex.antigravityBridge.includes('Antigravity'),
      `Ejercicio Canvas #${expectedId}: antigravityBridge debe referenciar a Antigravity`);
  });
});

/* ==========================================================================
   GRUPO 3: ERRADICACIÓN TOTAL DEL TÉRMINO «DOSSIER» EN AMBOS CATÁLOGOS
   ========================================================================== */

test('CANON-M4-01: Erradicación absoluta de la palabra «dossier» en los 40 ejercicios (Regla 10.3 / 7.3)', () => {
  const checkForbiddenWord = (obj, path) => {
    if (!obj) return;
    if (typeof obj === 'string') {
      assert.ok(!obj.toLowerCase().includes('dossier'),
        `Término prohibido «dossier» encontrado en ruta: ${path} ("${obj.substring(0, 50)}...")`);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, idx) => checkForbiddenWord(item, `${path}[${idx}]`));
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => checkForbiddenWord(obj[key], `${path}.${key}`));
    }
  };

  ALL_AG_EXERCISES.forEach((ex, i) => checkForbiddenWord(ex, `AG_EXERCISES[${i + 1}]`));
  ALL_CANVAS_EXERCISES.forEach((ex, i) => checkForbiddenWord(ex, `CANVAS_EXERCISES[${i + 1}]`));
});

/* ==========================================================================
   GRUPO 4: INTEGRACIÓN Y ESTRÉS DE KIT GENERATOR
   ========================================================================== */

test('KIT-M4-01: kitGenerator.buildAllKitsBundle genera exitosamente los 20 kits completos sin fallos', () => {
  const bundle = kitGenerator.buildAllKitsBundle();

  assert.ok(bundle && typeof bundle === 'object', 'buildAllKitsBundle debe retornar un objeto');
  assert.equal(bundle.version, '2.1', 'Bundle debe tener version 2.1');
  assert.equal(bundle.totalKits, 20, 'totalKits debe ser exactamente 20');
  assert.ok(Array.isArray(bundle.kits) && bundle.kits.length === 20, 'kits debe ser un arreglo de 20 elementos');

  // Validar cada kit generado en el bundle
  bundle.kits.forEach((k, idx) => {
    const expectedId = idx + 1;
    assert.equal(k.exerciseId, expectedId, `Kit #${expectedId}: exerciseId correlativo`);
    assert.equal(k.title, `Kit Ejercicio ${expectedId}`);
    assert.ok(typeof k.filename === 'string' && k.filename.length > 3, `Kit #${expectedId}: filename válido`);
    assert.ok(typeof k.mime === 'string' && k.mime.length > 5, `Kit #${expectedId}: mime válido`);
    assert.ok(typeof k.content === 'string' && k.content.length > 0, `Kit #${expectedId}: content no vacío`);
    assert.equal(k.sizeBytes, k.content.length, `Kit #${expectedId}: sizeBytes coincide con longitud de texto`);
  });

  // Prueba de serialización y deserialización sin pérdidas
  const jsonString = JSON.stringify(bundle);
  const parsed = JSON.parse(jsonString);
  assert.equal(parsed.kits.length, 20);
  assert.equal(parsed.kits[3].filename, 'GEMINI.md');
});

test('KIT-M4-02: kitGenerator.buildEvidenceSnippet produce formato canónico SENA con los nuevos casos testigo', () => {
  ALL_AG_EXERCISES.forEach(ex => {
    const evalResult = simulatorEngine.evaluateWitnessCase(ex.id, ex.testCase.sampleInput, ALL_AG_EXERCISES);
    const snippet = kitGenerator.buildEvidenceSnippet(ex.id, {
      enteredValue: ex.testCase.sampleInput,
      expectedValue: ex.testCase.expectedValue,
      formulaHint: ex.testCase.formulaHint,
      status: evalResult.status
    });

    assert.ok(typeof snippet === 'string' && snippet.length > 150, `Snippet del ejercicio ${ex.id} debe ser sustantivo`);
    assert.ok(snippet.includes('### Evidencia para el Portafolio de Evidencias (SENA ADSO)'),
      `Snippet del ejercicio ${ex.id} debe incluir encabezado canónico`);
    assert.ok(!snippet.toLowerCase().includes('dossier'),
      `Snippet del ejercicio ${ex.id} no debe contener «dossier»`);
    assert.ok(snippet.includes('- **Estación vinculada**: MG-A0'),
      `Snippet del ejercicio ${ex.id} debe incluir estación MG-A01 a MG-A05`);
    assert.ok(snippet.includes(String(ex.testCase.expectedValue)),
      `Snippet del ejercicio ${ex.id} debe incluir valor esperado ${ex.testCase.expectedValue}`);
    assert.ok(snippet.includes('1. **Estado Válido (Entrada Válida)**'),
      `Snippet del ejercicio ${ex.id} debe listar cobertura de los 4 estados`);
  });
});

/* ==========================================================================
   GRUPO 5: CALIFICACIÓN PERFECTA Y STRESS TESTING DE PROMPTS DE CANVAS
   ========================================================================== */

test('PROMPT-M4-01: Los 20 prompts de Canvas alcanzan calificación perfecta (100 pts) en promptBuilder', () => {
  ALL_CANVAS_EXERCISES.forEach(ex => {
    const spec = promptBuilder.exerciseToPromptSpec(ex);
    assert.ok(spec, `exerciseToPromptSpec debe retornar objeto para ejercicio Canvas #${ex.id}`);

    const evalResult = promptBuilder.scorePromptSpec(spec);
    assert.equal(evalResult.score, 100,
      `Ejercicio Canvas #${ex.id} (${ex.title}): puntaje obtenido ${evalResult.score}/100`);
    assert.equal(evalResult.level, 'Profesional Asertivo',
      `Ejercicio Canvas #${ex.id}: nivel obtenido "${evalResult.level}"`);
    assert.equal(evalResult.checks.length, 5, `Debe tener 5 verificaciones`);
    assert.ok(evalResult.checks.every(c => c.ok), `Todos los checks deben ser verdaderos para #${ex.id}`);
  });
});

test('PROMPT-M4-02: Stress testing y resiliencia ante mutaciones adversariales de prompts Canvas', () => {
  ALL_CANVAS_EXERCISES.forEach(ex => {
    const baseSpec = promptBuilder.exerciseToPromptSpec(ex);

    // Mutación 1: Espaciado agresivo y mayúsculas en el rol
    const mutatedRole = { ...baseSpec, role: `   ${baseSpec.role.toUpperCase()}   ` };
    assert.equal(promptBuilder.scorePromptSpec(mutatedRole).score, 100);

    // Mutación 2: Inyección de @archivos múltiples en contexto
    const mutatedFiles = { ...baseSpec, contextFiles: '@GEMINI.md, @runbook.md, @config.yaml' };
    assert.equal(promptBuilder.scorePromptSpec(mutatedFiles).score, 100);

    // Mutación 3: Reducción del rol a menos de 8 caracteres degrada exactamente 20 puntos (-20)
    const degradedRole = { ...baseSpec, role: 'SRE' };
    const scoreDegradedRole = promptBuilder.scorePromptSpec(degradedRole);
    assert.equal(scoreDegradedRole.score, 80);
    assert.equal(scoreDegradedRole.checks.find(c => !c.ok).label,
      'Falta definir el rol experto (ej. Auditor Financiero Senior)');

    // Mutación 4: Reducción del objetivo a menos de 15 caracteres degrada exactamente 20 puntos (-20)
    const degradedGoal = { ...baseSpec, goal: 'Hacer runbook' };
    const scoreDegradedGoal = promptBuilder.scorePromptSpec(degradedGoal);
    assert.equal(scoreDegradedGoal.score, 80);

    // Mutación 5: Eliminación de menciones con @ degrada exactamente 20 puntos (-20)
    const degradedFiles = { ...baseSpec, contextFiles: 'archivos_sin_arroba.csv' };
    const scoreDegradedFiles = promptBuilder.scorePromptSpec(degradedFiles);
    assert.equal(scoreDegradedFiles.score, 80);

    // Mutación 6: Comando sin barra slash degrada exactamente 20 puntos (-20)
    const degradedCommand = { ...baseSpec, command: 'planear' };
    const scoreDegradedCommand = promptBuilder.scorePromptSpec(degradedCommand);
    assert.equal(scoreDegradedCommand.score, 80);

    // Mutación 7: Restricciones vacías degradan exactamente 20 puntos (-20)
    const degradedConstraints = { ...baseSpec, constraints: 'Corta' };
    const scoreDegradedConstraints = promptBuilder.scorePromptSpec(degradedConstraints);
    assert.equal(scoreDegradedConstraints.score, 80);
  });
});

/* ==========================================================================
   GRUPO 6: INTEGRACIÓN CRUZADA CON SIMULATOR ENGINE (4 ESTADOS DETERMINISTAS)
   ========================================================================== */

test('SIM-M4-01: simulatorEngine evalúa deterministamente los 4 estados en los 20 ejercicios rediseñados', () => {
  ALL_AG_EXERCISES.forEach(ex => {
    // 1. Estado Válido
    const resValid = simulatorEngine.evaluateWitnessCase(ex.id, ex.testCase.sampleInput, ALL_AG_EXERCISES);
    assert.equal(resValid.status, 'valido', `Ejercicio #${ex.id} con input "${ex.testCase.sampleInput}" debe ser valido`);
    assert.equal(resValid.ok, true, `Ejercicio #${ex.id} ok debe ser true`);
    assert.ok(typeof resValid.message === 'string' && resValid.message.includes('exacto'),
      `Ejercicio #${ex.id} mensaje de validación formativo`);

    // 2. Estado Inválido
    const resInvalid = simulatorEngine.evaluateWitnessCase(ex.id, '-999999', ALL_AG_EXERCISES);
    assert.equal(resInvalid.status, 'invalido', `Ejercicio #${ex.id} con input erróneo debe ser invalido`);
    assert.equal(resInvalid.ok, false, `Ejercicio #${ex.id} ok debe ser false`);
    assert.ok(typeof resInvalid.message === 'string' && resInvalid.message.length > 10,
      `Ejercicio #${ex.id} mensaje de discrepancia formativa`);

    // 3. Estado Vacío
    const resEmpty = simulatorEngine.evaluateWitnessCase(ex.id, '   ', ALL_AG_EXERCISES);
    assert.equal(resEmpty.status, 'vacio', `Ejercicio #${ex.id} con input vacío debe ser vacio`);
    assert.equal(resEmpty.ok, false, `Ejercicio #${ex.id} ok debe ser false`);

    // 4. Estado Reinicio
    const resReset = simulatorEngine.resetWitnessCase(ex.id);
    assert.equal(resReset.status, 'reset', `Ejercicio #${ex.id} reset debe tener status reset`);
    assert.equal(resReset.ok, false, `Ejercicio #${ex.id} ok debe ser false`);
  });
});

test('SIM-M4-02: simulatorEngine robustez ante separadores colombianos de miles y decimales en casos rediseñados', () => {
  // Ejercicio 2: Suma de $2.450.000 COP
  const rMiles = simulatorEngine.evaluateWitnessCase(2, '2.450.000', ALL_AG_EXERCISES);
  assert.equal(rMiles.status, 'valido');

  const rComa = simulatorEngine.evaluateWitnessCase(2, '2450000,00', ALL_AG_EXERCISES);
  assert.equal(rComa.status, 'valido');

  const rCombinado = simulatorEngine.evaluateWitnessCase(2, '$ 2.450.000,00 COP', ALL_AG_EXERCISES);
  assert.equal(rCombinado.status, 'valido');

  // Ejercicio 4 (rediseñado: 2 fases bimestrales)
  const rFases = simulatorEngine.evaluateWitnessCase(4, '2', ALL_AG_EXERCISES);
  assert.equal(rFases.status, 'valido');
  const rFasesTexto = simulatorEngine.evaluateWitnessCase(4, '2,00 fases', ALL_AG_EXERCISES);
  assert.equal(rFasesTexto.status, 'valido');

  // Ejercicio 18 (rediseñado: 220 horas ordinarias semanales)
  const rHoras = simulatorEngine.evaluateWitnessCase(18, '220', ALL_AG_EXERCISES);
  assert.equal(rHoras.status, 'valido');
  const rHorasTexto = simulatorEngine.evaluateWitnessCase(18, '220 h ordinarias', ALL_AG_EXERCISES);
  assert.equal(rHorasTexto.status, 'valido');
});
