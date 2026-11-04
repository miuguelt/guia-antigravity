/* Constructores puros de pestañas accesibles, lista de verificación de artefacto y guía de recuperación */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getExerciseMinutes(ex) {
    if (ex && typeof ex.minutes === 'number' && ex.minutes > 0) return ex.minutes;
    const raw = ex && ex.duration ? String(ex.duration) : '';
    const match = raw.match(/(\d+(?:\.\d+)?)\s*min/i);
    if (match) {
      const parsed = Math.round(Number(match[1]));
      if (parsed > 0) return parsed;
    }
    return 3;
  }

  function getArtifactChecklist(ex, spec) {
    const safeEx = ex || {};
    const safeSpec = spec || (safeEx.testCase || {});
    const mainFile = safeEx.kit && safeEx.kit.filename ? '@' + safeEx.kit.filename : 'los archivos del kit';
    const expected = safeSpec.expectedValue !== undefined ? safeSpec.expectedValue.toLocaleString('es-CO') + ' ' + (safeSpec.unit || '') : 'el valor esperado';
    const criteria = safeEx.professionalOutputCriteria || 'Interfaz clara, completa y sin errores en consola.';

    const statesItem = safeEx.hasUserInputs === false
      ? 'El agente ejecutó su propia verificación (pruebas o recorrido con /browser) y te mostró la evidencia en el Walkthrough.'
      : 'La interfaz responde bien en los 4 estados: entrada válida (calcula), entrada inválida (muestra un error claro), campo vacío (pide el dato) y botón de reinicio (limpia todo).';

    return [
      'El agente leyó ' + mainFile + ' y los demás archivos del kit sin inventar registros ni tarifas.',
      'Con los datos del kit, la herramienta generada muestra exactamente ' + expected.trim() + ' para el Caso Testigo.',
      statesItem,
      'Cumple el criterio profesional: ' + criteria
    ];
  }

  /* Orden pedagógico de la ruta: primero por nivel y, dentro del nivel, por número de ejercicio. */
  function sortExercisesForRoute(exercises) {
    return (Array.isArray(exercises) ? exercises.slice() : []).sort(function (a, b) {
      return (a.level - b.level) || (a.id - b.id);
    });
  }

  /* Devuelve el id vecino dentro de la lista visible (dir = 1 siguiente, -1 anterior) o null. */
  function getAdjacentExerciseId(list, currentId, dir) {
    const items = Array.isArray(list) ? list : [];
    const idx = items.findIndex(function (e) { return e.id === currentId; });
    if (idx === -1) return null;
    const next = items[idx + (dir < 0 ? -1 : 1)];
    return next ? next.id : null;
  }

  function getTroubleshootingTips(ex) {
    const safeEx = ex || {};
    const mainFile = safeEx.kit && safeEx.kit.filename ? '@' + safeEx.kit.filename : '@archivo_semilla';
    const hint = safeEx.testCase && safeEx.testCase.formulaHint ? safeEx.testCase.formulaHint : 'la fórmula oficial del ejercicio';

    return [
      {
        symptom: 'El agente inventó precios, nombres o columnas que no están en tu carpeta',
        fix: 'Escribe en el chat: "Detente: no uses datos de ejemplo. Lee únicamente ' + mainFile + ' y reconstruye la tabla con esos registros exactos."'
      },
      {
        symptom: 'El cálculo del artefacto no coincide con el Caso Testigo',
        fix: 'Comenta en el Implementation Plan o responde: "Ajusta la función matemática a ' + hint + ' y compruébala antes de entregar."'
      },
      {
        symptom: 'Un cambio nuevo dañó algo que ya funcionaba en el turno anterior',
        fix: 'En la vista de diferencias (Diff) haz clic en Reject sobre el bloque dañado, o usa el control Undo / Revert del paso en el Agent Manager.'
      }
    ];
  }

  function renderExerciseTabsNav(kitCount) {
    const count = Number(kitCount) || 1;
    const tabs = [
      { id: 'tab-kit', btnId: 'tabbtn-kit', label: '1. Kit Semilla (' + count + ')', active: true },
      { id: 'tab-prompt', btnId: 'tabbtn-prompt', label: '2. Flujo y Prompt', active: false },
      { id: 'tab-task', btnId: 'tabbtn-task', label: '3. Tarea Conceptual', active: false },
      { id: 'tab-witness', btnId: 'tabbtn-witness', label: '4. Verificar Resultado', active: false },
      { id: 'tab-refine', btnId: 'tabbtn-refine', label: '5. Refinamiento', active: false }
    ];

    const buttonsHtml = tabs.map(function (t) {
      return '<button type="button" id="' + t.btnId + '" role="tab" aria-selected="' + (t.active ? 'true' : 'false') + '" aria-controls="' + t.id + '" tabindex="' + (t.active ? '0' : '-1') + '" class="exercise-tab-btn' + (t.active ? ' is-active' : '') + '" data-tab="' + t.id + '">' + esc(t.label) + '</button>';
    }).join('');

    return '<nav class="exercise-tabs-nav" role="tablist" aria-label="Fases del ejercicio">' + buttonsHtml + '</nav>';
  }

  function renderArtifactVerificationCard(ex, spec, checkedIndices) {
    const items = getArtifactChecklist(ex, spec);
    const checked = Array.isArray(checkedIndices) ? checkedIndices : [];
    const listHtml = items.map(function (text, idx) {
      const isChecked = checked.includes(idx);
      return '<label style="display:flex;align-items:flex-start;gap:0.6rem;cursor:pointer;padding:0.35rem 0;">' +
        '<input type="checkbox" class="artifact-check-input" data-check-idx="' + idx + '"' + (isChecked ? ' checked' : '') + ' style="margin-top:0.25rem;">' +
        '<span class="prose-copy" style="margin:0;">' + esc(text) + '</span>' +
        '</label>';
    }).join('');

    return [
      '<div class="card-elevated stack-sm" style="margin-top:0.75rem;border-left:4px solid var(--accent-primary);">',
      '  <div class="flex-between"><strong>✅ Verifica lo que construyó el agente en tu carpeta</strong><span class="badge">' + checked.length + ' / ' + items.length + ' criterios</span></div>',
      '  <div class="stack-sm">' + listHtml + '</div>',
      '</div>'
    ].join('\n');
  }

  function renderTroubleshootingCard(ex) {
    const tips = getTroubleshootingTips(ex);
    const rowsHtml = tips.map(function (t) {
      return '<li><strong>' + esc(t.symptom) + ':</strong> ' + esc(t.fix) + '</li>';
    }).join('');

    return [
      '<details class="card-elevated" style="margin-top:0.5rem;padding:0.75rem;">',
      '  <summary style="cursor:pointer;font-weight:700;">🛠️ Si algo sale mal en Antigravity (Guía de recuperación rápida)</summary>',
      '  <ul class="stack-sm" style="margin-top:0.6rem;padding-left:1.25rem;">' + rowsHtml + '</ul>',
      '</details>'
    ].join('\n');
  }

  return {
    getExerciseMinutes: getExerciseMinutes,
    getArtifactChecklist: getArtifactChecklist,
    sortExercisesForRoute: sortExercisesForRoute,
    getAdjacentExerciseId: getAdjacentExerciseId,
    getTroubleshootingTips: getTroubleshootingTips,
    renderExerciseTabsNav: renderExerciseTabsNav,
    renderArtifactVerificationCard: renderArtifactVerificationCard,
    renderTroubleshootingCard: renderTroubleshootingCard
  };
});
