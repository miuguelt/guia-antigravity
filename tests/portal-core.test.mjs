import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { AG_EXERCISES_N1_N2 } = require('../js/data/ag-exercises-n1-n2.js');
const { AG_EXERCISES_N3_N4 } = require('../js/data/ag-exercises-n3-n4.js');
const { CANVAS_EXERCISES_N1_N2 } = require('../js/data/canvas-exercises-n1-n2.js');
const { CANVAS_EXERCISES_N3_N4 } = require('../js/data/canvas-exercises-n3-n4.js');
const { ANTIGRAVITY_TOOLS, PROTOCOL_6_STEPS, DIAGNOSTIC_MATRIX } = require('../js/data/antigravity-tools-map.js');

const store = require('../js/core/store.js');
const simulator = require('../js/core/simulator-engine.js');
const zipBuilder = require('../js/core/zip-builder.js');
const kitGen = require('../js/core/kit-generator.js');
const promptBuilder = require('../js/core/prompt-builder.js');
const uiEnhancements = require('../js/ui/ui-enhancements.js');
const agTabs = require('../js/ui/render-ag-tabs.js');

function createMockStorage() {
  const map = new Map();
  return {
    getItem(k) { return map.has(k) ? map.get(k) : null; },
    setItem(k, v) { map.set(k, String(v)); }
  };
}

test('1. Catálogo de 26 ejercicios Antigravity está completo y progresivo (IDs 1..26)', () => {
  const allAg = [...AG_EXERCISES_N1_N2, ...AG_EXERCISES_N3_N4];
  assert.equal(allAg.length, 26);
  allAg.forEach((ex, idx) => {
    assert.equal(ex.id, idx + 1);
    assert.ok(ex.title && ex.title.length > 10);
    assert.ok([ex.initialPrompt, ...ex.antigravitySteps].join(' ').match(/Planning|\/grill-me|\/goal/), `Ejercicio ${ex.id}: debe planear en modo Planning, /grill-me o /goal`);
    assert.ok(ex.kit && ex.kit.filename);
    assert.ok(ex.testCase && typeof ex.testCase.expectedValue === 'number');
  });
});

test('2. Catálogo de 20 ejercicios Gemini Canvas está completo con puente Antigravity (IDs 1..20)', () => {
  const allCanvas = [...CANVAS_EXERCISES_N1_N2, ...CANVAS_EXERCISES_N3_N4];
  assert.equal(allCanvas.length, 20);
  allCanvas.forEach((ex, idx) => {
    assert.equal(ex.id, idx + 1);
    assert.ok(ex.title && ex.initialPrompt && ex.studyTopic);
    assert.ok(ex.antigravityBridge && ex.antigravityBridge.includes('Antigravity'));
  });
});

test('3. Mapa de 12 herramientas de Antigravity, protocolo de 6 pasos y matriz diagnóstica están completos', () => {
  assert.equal(ANTIGRAVITY_TOOLS.length, 12);
  assert.equal(PROTOCOL_6_STEPS.length, 6);
  assert.equal(DIAGNOSTIC_MATRIX.length, 4);
});

test('4. store.sanitizeIdArray y createDefaultState filtran duplicados y valores fuera de rango', () => {
  const clean = store.sanitizeIdArray([3, '1', 3, -5, 99, 'abc', 20], 20);
  assert.deepEqual(clean, [1, 3, 20]);
  const def = store.createDefaultState();
  assert.equal(def.theme, 'claro');
  assert.deepEqual(def.agCompletedIds, []);
});

test('5. store.loadState y saveState persisten progreso y tema en almacenamiento local', () => {
  const mock = createMockStorage();
  const st = store.loadState(mock);
  st.agCompletedIds = [1, 2];
  st.canvasCompletedIds = [5];
  st.witnessVerifiedIds = [1];
  store.setTheme(st, 'oscuro', mock);
  const ok = store.saveState(st, mock);
  assert.equal(ok, true);

  const loaded = store.loadState(mock);
  assert.deepEqual(loaded.agCompletedIds, [1, 2]);
  assert.deepEqual(loaded.canvasCompletedIds, [5]);
  assert.deepEqual(loaded.witnessVerifiedIds, [1]);
  assert.equal(loaded.theme, 'oscuro');
});

test('6. store.toggleExercise y recordTestCaseVerified conmutan estado y calculan estadísticas', () => {
  const mock = createMockStorage();
  const st = store.createDefaultState();
  const r1 = store.toggleExercise(st, 'antigravity', 4, mock);
  assert.equal(r1.completed, true);
  assert.deepEqual(st.agCompletedIds, [4]);

  const r2 = store.toggleExercise(st, 'antigravity', 4, mock);
  assert.equal(r2.completed, false);
  assert.deepEqual(st.agCompletedIds, []);

  const rec = store.recordTestCaseVerified(st, 6, mock);
  assert.equal(rec.recorded, true);
  assert.deepEqual(st.witnessVerifiedIds, [6]);

  const stats = store.getProgressStats(st, 20, 20);
  assert.equal(stats.witnessDone, 1);
  assert.equal(stats.totalAll, 40);
});

test('7. store.resetRouteProgress limpia cada ruta o ambas sin romper el esquema', () => {
  const mock = createMockStorage();
  const st = store.createDefaultState();
  store.toggleExercise(st, 'antigravity', 1, mock);
  store.toggleExercise(st, 'canvas', 2, mock);
  store.resetRouteProgress(st, 'canvas', mock);
  assert.deepEqual(st.canvasCompletedIds, []);
  assert.deepEqual(st.agCompletedIds, [1]);
  store.resetRouteProgress(st, 'all', mock);
  assert.deepEqual(st.agCompletedIds, []);
});

test('8. store.filterExercises filtra por nivel, estado y búsqueda textual', () => {
  const allAg = [...AG_EXERCISES_N1_N2, ...AG_EXERCISES_N3_N4];
  const level2 = store.filterExercises(allAg, { levelFilter: '2', statusFilter: 'all', searchQuery: '', completedIds: [6] });
  assert.equal(level2.length, 7);
  const doneOnly = store.filterExercises(allAg, { levelFilter: '2', statusFilter: 'done', searchQuery: '', completedIds: [6] });
  assert.equal(doneOnly.length, 1);
  assert.equal(doneOnly[0].id, 6);
  const queryMatch = store.filterExercises(allAg, { levelFilter: 'all', statusFilter: 'all', searchQuery: 'Monte Carlo', completedIds: [] });
  assert.equal(queryMatch.length, 1);
  assert.equal(queryMatch[0].id, 19);
});

test('9. store.exportProgressJson e importProgressJson exportan y restauran respaldos', () => {
  const mock = createMockStorage();
  const st = store.createDefaultState();
  store.toggleExercise(st, 'antigravity', 3, mock);
  const chk = store.toggleChecklistItem(st, 3, 1, mock);
  assert.deepEqual(chk, [1]);
  const chkRemoved = store.toggleChecklistItem(st, 3, 1, mock);
  assert.deepEqual(chkRemoved, []);
  store.toggleChecklistItem(st, 3, 2, mock);
  assert.deepEqual(store.toggleChecklistItem(null, 99, -1, mock), []);
  const exported = store.exportProgressJson(st);
  const fresh = store.createDefaultState();
  const imported = store.importProgressJson(fresh, exported, mock);
  assert.equal(imported.ok, true);
  assert.deepEqual(fresh.agCompletedIds, [3]);
  assert.deepEqual(fresh.agChecklist[3], [2]);
  assert.equal(store.importProgressJson(fresh, '', mock).ok, false);
});

test('10. simulator.evaluateWitnessCase valida Estado Válido en los 26 ejercicios Antigravity', () => {
  for (let id = 1; id <= 26; id++) {
    const spec = simulator.getWitnessSpec(id);
    const res = simulator.evaluateWitnessCase(id, spec.sampleInput);
    assert.equal(res.status, 'valido', `Fallo en ejercicio ${id}`);
    assert.equal(res.ok, true);
  }
});

test('11. simulator.evaluateWitnessCase cubre Estado Vacío, Estado Inválido y separadores es-CO', () => {
  const emptyRes = simulator.evaluateWitnessCase(3, '   ');
  assert.equal(emptyRes.status, 'vacio');
  assert.equal(emptyRes.ok, false);

  const nanRes = simulator.evaluateWitnessCase(3, 'texto_invalido');
  assert.equal(nanRes.status, 'invalido');

  const negRes = simulator.evaluateWitnessCase(3, '-50');
  assert.equal(negRes.status, 'invalido');

  const wrongRes = simulator.evaluateWitnessCase(3, '250');
  assert.equal(wrongRes.status, 'invalido');

  const formattedCop = simulator.evaluateWitnessCase(6, '35,0%');
  assert.equal(formattedCop.status, 'valido');

  // Cobertura de ramas de parseFlexibleNumber: separador de miles colombiano con puntos
  const parsedMiles = simulator.parseFlexibleNumber('2.450.000');
  assert.equal(parsedMiles.isEmpty, false);
  assert.equal(parsedMiles.value, 2450000);

  const parsedMonedaMiles = simulator.parseFlexibleNumber('$2.450.000 COP');
  assert.equal(parsedMonedaMiles.isEmpty, false);
  assert.equal(parsedMonedaMiles.value, 2450000);

  // Cobertura de rama: número mixto con separador de miles y coma decimal
  const parsedMixto = simulator.parseFlexibleNumber('1.200.000,50');
  assert.equal(parsedMixto.isEmpty, false);
  assert.equal(parsedMixto.value, 1200000.5);

  // Verificación en evaluateWitnessCase con formato de miles y negativos
  const resMiles = simulator.evaluateWitnessCase(2, '$2.450.000 COP');
  assert.equal(resMiles.status, 'valido');
  assert.equal(resMiles.ok, true);

  const resNegMiles = simulator.evaluateWitnessCase(13, '-$30.000.000 COP');
  assert.equal(resNegMiles.status, 'valido');
  assert.equal(resNegMiles.ok, true);

  // Diagnóstico formativo de discrepancia (sobredimensionamiento vs déficit en flujos de IA)
  const resOver = simulator.evaluateWitnessCase(1, '12');
  assert.equal(resOver.status, 'invalido');
  assert.equal(resOver.diff, 4);
  assert.ok(resOver.message.includes('Sobredimensionamiento'), 'Debe diagnosticar sobreconteo por archivos temporales u ocultos');

  const resUnder = simulator.evaluateWitnessCase(1, '4');
  assert.equal(resUnder.status, 'invalido');
  assert.equal(resUnder.diff, 4);
  assert.ok(resUnder.message.includes('Déficit'), 'Debe diagnosticar déficit por omisión de subcarpetas o filtros restrictivos');

  // Mensaje en estado válido y regla anti-dossier institucional
  const resValidMsg = simulator.evaluateWitnessCase(1, '8');
  assert.ok(resValidMsg.message.includes('Portafolio de Evidencias'), 'Debe usar exclusivamente Portafolio de Evidencias');
  assert.equal(/dossier/i.test(resValidMsg.message), false, 'Prohibido extranjerismo dossier');

  // Soporte de catálogo dinámico / customSpecs (array y objeto mapa)
  const customList = [{ id: 99, testCase: { expectedValue: 500, tolerance: 0, sampleInput: '500', expectedMetric: 'uds' } }];
  const resCustom = simulator.evaluateWitnessCase(99, '500', customList);
  assert.equal(resCustom.status, 'valido');
  assert.equal(resCustom.expectedValue, 500);

  const customMap = { 77: { expectedValue: 777, sampleInput: '777', tolerance: 0 } };
  const resCustomMap = simulator.evaluateWitnessCase(77, '777', customMap);
  assert.equal(resCustomMap.status, 'valido');
  assert.equal(resCustomMap.expectedValue, 777);

  const resCustomReset = simulator.resetWitnessCase(99, customList);
  assert.equal(resCustomReset.status, 'reset');
  assert.equal(resCustomReset.sampleInput, '500');
});

test('12. simulator.resetWitnessCase devuelve el Estado Reset determinista', () => {
  const rst = simulator.resetWitnessCase(8);
  assert.equal(rst.status, 'reset');
  assert.equal(rst.inputValue, '');
  assert.equal(rst.expectedValue, 70);
});

test('13. kitGen.getKitMetadata, getKitFiles y buildKitContent generan los 26 kits multi-archivo con variedad de formatos', () => {
  const extensions = new Set();
  for (let id = 1; id <= 26; id++) {
    const meta = kitGen.getKitMetadata(id);
    const files = kitGen.getKitFiles(id);
    const firstFile = kitGen.buildKitContent(id, 0);
    assert.equal(meta.exerciseId, id);
    assert.equal(meta.filename, firstFile.filename);
    assert.ok(files.length >= 2, `Ejercicio ${id} debe tener al menos 2 archivos`);
    files.forEach((f, idx) => {
      assert.ok(f.filename && f.content.length > 35, `Archivo ${idx} vacío en ejercicio ${id}`);
      extensions.add(f.ext);
    });
  }
  assert.equal(kitGen.getKitFiles(1).length, 8, 'El ejercicio 1 debe tener 8 archivos reales para clasificar');
  ['html', 'txt', 'csv', 'md', 'json', 'yaml', 'sql', 'xml', 'log'].forEach((ext) => {
    assert.ok(extensions.has(ext), `Falta extensión realista .${ext} en el catálogo de kits`);
  });
  const fallback = kitGen.triggerKitDownload(1, null, 0);
  assert.equal(fallback.downloaded, false);
});

test('14. promptBuilder.scorePromptSpec califica especificaciones completas e incompletas', () => {
  const fullScore = promptBuilder.scorePromptSpec(promptBuilder.PROMPT_PRESETS.cotizador);
  assert.equal(fullScore.score, 100);
  assert.equal(fullScore.level, 'Profesional Asertivo');

  const emptyScore = promptBuilder.scorePromptSpec({ role: '', goal: '', contextFiles: '', command: 'haz', constraints: '' });
  assert.equal(emptyScore.score, 0);
  assert.equal(emptyScore.level, 'Básico Ambiguo');
});

test('15. promptBuilder construye Prompt Antigravity, Guía Conceptual, GEMINI.md y SKILL.md', () => {
  const preset = promptBuilder.PROMPT_PRESETS.conciliador;
  const prompt = promptBuilder.buildAntigravityPrompt(preset);
  const guide = promptBuilder.buildConceptualTaskGuide(preset);
  const geminiMd = promptBuilder.buildGeminiMdTemplate(preset);
  const skillMd = promptBuilder.buildSkillMdTemplate(preset);

  assert.ok(prompt.includes('/plan Actúa como'));
  assert.ok(prompt.includes('@conciliacion_ventas_banco.csv'));
  assert.ok(guide.includes('TAREA CONCEPTUAL EN PARALELO'));
  assert.ok(geminiMd.includes('# GEMINI.md'));
  assert.ok(skillMd.includes('name:'));
});

test('16. zipBuilder.crc32, encodeUtf8 y createZipBuffer construyen archivos PKZIP válidos sin dependencias', () => {
  const bytes = zipBuilder.encodeUtf8('Hola SENA');
  assert.equal(bytes.length, 9);
  const crc = zipBuilder.crc32(bytes);
  assert.equal(typeof crc, 'number');
  assert.ok(crc > 0);

  const zip = zipBuilder.createZipBuffer([
    { filename: 'prueba.txt', content: 'Contenido de prueba 1' },
    { filename: 'datos.json', content: '{"ok":true}' }
  ]);
  assert.ok(zip instanceof Uint8Array);
  assert.equal(zip[0], 0x50);
  assert.equal(zip[1], 0x4b);
  assert.equal(zip[2], 0x03);
  assert.equal(zip[3], 0x04);
});

test('17. kitGen.buildExerciseZip, triggerKitZipDownload, triggerAllKitsDownload y buildEvidenceSnippet empaquetan kits y evidencias', () => {
  const z1 = kitGen.buildExerciseZip(1);
  assert.equal(z1.exerciseId, 1);
  assert.equal(z1.fileCount, 8);
  assert.ok(z1.bytes.length > 500);
  assert.equal(kitGen.triggerKitZipDownload(1, null).downloaded, false);
  const allKitsDl = kitGen.triggerAllKitsDownload(null);
  assert.ok(typeof allKitsDl === 'string' || allKitsDl.downloaded === false);
  const snip = kitGen.buildEvidenceSnippet(1, { ok: true, numericValue: 8, enteredValue: 8, expectedValue: 8 });
  assert.ok(snip.includes('MG-A01'));
  assert.ok(snip.includes('8'));
  assert.ok(snip.includes('@15-03-2026_factura_enel_energia.html'));
});

test('18. uiEnhancements gestiona microinteracciones de copia, modales accesibles y atajos de teclado', () => {
  const btn = {
    textContent: 'Copiar Prompt',
    dataset: {},
    className: 'btn',
    classList: {
      add(c) { btn.className += ' ' + c; },
      remove(c) { btn.className = btn.className.replace(c, '').trim(); }
    }
  };
  uiEnhancements.flashCopiedButton(btn);
  assert.equal(btn.textContent, '✓ ¡Copiado!');
  assert.ok(btn.className.includes('btn-copied'));
  assert.equal(btn.dataset.origText, 'Copiar Prompt');

  const mockDoc = {
    elements: new Map(),
    getElementById(id) { return this.elements.get(id) || null; },
    createElement(tag) {
      const el = {
        tagName: tag.toUpperCase(),
        className: '',
        innerHTML: '',
        parentElement: null,
        attributes: new Map(),
        setAttribute(k, v) { this.attributes.set(k, v); },
        getAttribute(k) { return this.attributes.get(k) || null; },
        querySelector() { return null; },
        querySelectorAll() { return []; },
        addEventListener() {}
      };
      return el;
    },
    body: {
      appendChild(ch) {
        ch.parentElement = mockDoc.body;
        mockDoc.elements.set(ch.id || 'body-child', ch);
        return ch;
      },
      removeChild(ch) {
        mockDoc.elements.delete(ch.id);
        ch.parentElement = null;
      }
    },
    addEventListener() {}
  };

  const modal = uiEnhancements.createModalShell('Prueba', '<p>Cuerpo</p>', '<button>OK</button>', mockDoc);
  assert.ok(modal);
  assert.equal(modal.id, 'ag-active-modal');
  assert.equal(modal.getAttribute('role'), 'dialog');

  const shortcuts = uiEnhancements.openKeyboardShortcutsModal(mockDoc);
  assert.ok(shortcuts);
  assert.ok(shortcuts.innerHTML.includes('Alt + T'));
  assert.ok(shortcuts.innerHTML.includes('Alt + P'));

  uiEnhancements.closeModal(mockDoc);
  assert.equal(mockDoc.getElementById('ag-active-modal'), null);
});

test('19. render-ag-tabs construye pestañas ARIA accesibles, lista de verificación de artefacto y guía de recuperación', () => {
  const ex = AG_EXERCISES_N1_N2[0];
  const spec = simulator.getWitnessSpec(1);

  assert.equal(agTabs.getExerciseMinutes({ duration: '20 min de práctica' }), 20);
  assert.equal(agTabs.getExerciseMinutes({}), 3);

  const checklist = agTabs.getArtifactChecklist(ex, spec);
  assert.equal(checklist.length, 4);
  assert.ok(checklist[0].includes('@15-03-2026_factura_enel_energia.html'));

  const tips = agTabs.getTroubleshootingTips(ex);
  assert.equal(tips.length, 3);

  const navHtml = agTabs.renderExerciseTabsNav(8);
  assert.ok(navHtml.includes('role="tablist"'));
  assert.ok(navHtml.includes('role="tab"'));
  assert.ok(navHtml.includes('aria-selected="true"'));
  assert.ok(navHtml.includes('aria-controls="tab-kit"'));

  const cardHtml = agTabs.renderArtifactVerificationCard(ex, spec, [0, 2]);
  assert.ok(cardHtml.includes('Verifica lo que construyó el agente'));
  assert.ok(cardHtml.includes('checked'));

  const troubleHtml = agTabs.renderTroubleshootingCard(ex);
  assert.ok(troubleHtml.includes('Si algo sale mal en Antigravity'));
});
