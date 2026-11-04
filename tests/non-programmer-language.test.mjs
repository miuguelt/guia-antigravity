/**
 * tests/non-programmer-language.test.mjs
 *
 * La Ruta Antigravity está dirigida a aprendices que no programan.
 * Los textos que lee y ejecuta el aprendiz (título, objetivo, acción paralela,
 * tarea conceptual, pasos y prompt paralelo) no deben exigir vocabulario de
 * diseño de bases de datos ni de programación. Los nombres de archivo (@archivo)
 * se excluyen porque son identificadores del kit. Los prompts que recibe el
 * agente (initialPrompt, refinementPrompt) sí pueden usar términos técnicos.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const sources = ['ag-exercises-n1-n2', 'ag-exercises-n3-n4', 'ag-exercises-n4-plus'];
const exercises = new Map();
for (const s of sources) {
  const mod = require(`../js/data/${s}.js`);
  for (const value of Object.values(mod)) {
    if (!Array.isArray(value)) continue;
    for (const ex of value) if (ex && ex.id) exercises.set(ex.id, ex);
  }
}

const LEARNER_FIELDS = [
  'title', 'goal', 'learnerParallelAction', 'conceptualTaskTitle',
  'conceptualTheory', 'conceptualTaskSteps', 'parallelToolPrompt', 'antigravitySteps'
];

const BANNED = [
  /forma normal/i, /\b1NF\b/, /at[oó]mic/i, /levenshtein/i, /survivorship/i,
  /supervivencia/i, /llaves? (primaria|for[aá]nea|compuesta)/i, /encabezado YAML/i, /frontmatter/i,
  /acoplamiento/i, /cohesi[oó]n/i, /firmas del contrato/i, /determin[ií]stic/i,
  /deterministas?/i, /\bgrafo\b/i, /\bdiffs?\b/i, /selecciona(s)? la funci[oó]n/i,
  /diagrama entidad-relaci[oó]n/i
];

const stripFileRefs = (text) => text.replace(/@[\w.\-/]+/g, '@archivo');
const learnerText = (ex) => LEARNER_FIELDS
  .flatMap((f) => (Array.isArray(ex[f]) ? ex[f] : [ex[f] || '']))
  .map(stripFileRefs)
  .join('\n');

test('Se cargan los 26 ejercicios de la Ruta Antigravity', () => {
  assert.equal(exercises.size, 26);
});

test('Los textos del aprendiz no usan jerga de programador', () => {
  const hits = [];
  for (const ex of exercises.values()) {
    const text = learnerText(ex);
    for (const rx of BANNED) {
      const m = text.match(rx);
      if (m) hits.push(`#${ex.id}: «${m[0]}»`);
    }
  }
  assert.deepEqual(hits, [], `Jerga encontrada:\n${hits.join('\n')}`);
});

test('El ejercicio 2 conserva la idea de un dato por casilla y la detección de faltantes', () => {
  const ex = exercises.get(2);
  assert.match(ex.conceptualTaskTitle, /un dato/i);
  assert.match(ex.learnerParallelAction, /María y Jorge/);
  assert.match(ex.parallelToolPrompt, /\$1\.200\.000 aprox/);
});

test('El registro de entregables no pide jerga al aprendiz', () => {
  const files = ['deliverables.registry.json', 'js/registro-entregables.js'];
  for (const f of files) {
    const text = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
    for (const rx of [/1NF/, /Forma Normal/i, /Survivorship/i, /encabezado YAML/i, /frontmatter YAML/i]) {
      assert.doesNotMatch(text, rx, `${f} contiene ${rx}`);
    }
  }
});
