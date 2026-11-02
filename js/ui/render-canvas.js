/* Renderizador de la Ruta Gemini Canvas (ruta-canvas.html) y Laboratorio de Prompts (laboratorio-prompts.html) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(root);
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory(root)); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  const AG = (root && root.AGPortal) || {};
  const esc = function (s) { return AG.escapeHtml ? AG.escapeHtml(s) : String(s || ''); };

  function getAllCanvasExercises() {
    const n12 = Array.isArray(AG.CANVAS_EXERCISES_N1_N2) ? AG.CANVAS_EXERCISES_N1_N2 : [];
    const n34 = Array.isArray(AG.CANVAS_EXERCISES_N3_N4) ? AG.CANVAS_EXERCISES_N3_N4 : [];
    return n12.concat(n34);
  }

  function renderCanvasSidebar(state, exercises) {
    const listEl = document.getElementById('canvas-list-container');
    if (!listEl) return;

    const filtered = AG.filterExercises(exercises, {
      levelFilter: state.canvasLevelFilter, statusFilter: state.canvasStatusFilter,
      searchQuery: state.canvasSearchQuery, completedIds: state.canvasCompletedIds
    });

    const stats = AG.getProgressStats(state, 20, 20);
    const barEl = document.getElementById('canvas-route-bar');
    const txtEl = document.getElementById('canvas-route-summary');
    if (barEl) barEl.style.width = stats.canvasPct + '%';
    if (txtEl) txtEl.textContent = stats.canvasDone + ' de 20 completados (' + stats.canvasPct + ' %)';

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="card-elevated"><p>No hay ejercicios que coincidan con la búsqueda.</p></div>';
      return;
    }

    if (!filtered.some(function (e) { return e.id === state.canvasSelectedId; })) state.canvasSelectedId = filtered[0].id;

    listEl.innerHTML = filtered.map(function (ex) {
      const selected = ex.id === state.canvasSelectedId, done = state.canvasCompletedIds.includes(ex.id);
      return '<button type="button" class="exercise-item-btn ' + (selected ? 'is-selected' : '') + '" data-cv-id="' + ex.id + '">' +
        '<span class="' + (AG.getLevelBadgeClass ? AG.getLevelBadgeClass(ex.level) : 'badge') + '">' + (done ? '✓ ' : '#') + ex.id + '</span>' +
        '<div class="stack-sm" style="flex:1;"><div><strong>' + esc(ex.title) + '</strong></div>' +
        '<small>' + esc(ex.levelName) + ' · ' + esc(ex.duration) + '</small></div></button>';
    }).join('\n');

    listEl.querySelectorAll('.exercise-item-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.canvasSelectedId = Number(btn.getAttribute('data-cv-id'));
        renderCanvasSidebar(state, exercises);
        renderCanvasDetail(state, exercises);
      });
    });
  }

  function renderCanvasDetail(state, exercises) {
    const detailEl = document.getElementById('canvas-detail-container');
    if (!detailEl) return;
    const ex = exercises.find(function (item) { return item.id === state.canvasSelectedId; }) || exercises[0];
    if (!ex) return;

    const isDone = state.canvasCompletedIds.includes(ex.id);
    const pointsHtml = (ex.studyKeyPoints || []).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
    const guideHtml = (ex.stepByStepGuide || []).map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('');

    detailEl.innerHTML = [
      '<article class="card stack-md">',
      '  <div class="flex-between"><div class="flex-row-wrap"><span class="' + (AG.getLevelBadgeClass ? AG.getLevelBadgeClass(ex.level) : 'badge') + '">' + esc(ex.levelName) + '</span><span class="badge">' + esc(ex.complexity) + '</span></div><button type="button" id="toggle-canvas-done-btn" class="btn ' + (isDone ? 'btn-primary' : 'btn-secondary') + '">' + (isDone ? '✓ Ejercicio Completado' : 'Marcar como Completado') + '</button></div>',
      '  <h2>Ejercicio Canvas ' + ex.id + ': ' + esc(ex.title) + '</h2>',
      '  <p class="prose-copy"><strong>Objetivo:</strong> ' + esc(ex.goal) + '</p>',
      '  <div class="notice-banner"><strong>Puente hacia Antigravity IDE:</strong><p class="prose-copy" style="margin:0.25rem 0 0;">' + esc(ex.antigravityBridge) + '</p></div>',
      '  <section class="stack-sm"><div class="flex-between"><h3>1. Prompt Inicial de Ingeniería</h3><button type="button" class="btn btn-secondary copy-cv-btn" data-target="cv-init-pre">Copiar Prompt</button></div><pre id="cv-init-pre" class="code-block">' + esc(ex.initialPrompt) + '</pre></section>',
      '  <section class="card-elevated stack-sm"><h3>2. Estudio Conceptual en Paralelo: ' + esc(ex.studyTopic) + '</h3><p class="prose-copy">' + esc(ex.studyExplanation) + '</p><ul class="stack-sm">' + pointsHtml + '</ul><div class="flex-between"><strong>Consulta de profundización:</strong><button type="button" class="btn btn-secondary copy-cv-btn" data-target="cv-study-pre">Copiar Consulta</button></div><pre id="cv-study-pre" class="code-block">' + esc(ex.parallelStudyPrompt) + '</pre></section>',
      '  <section class="stack-sm"><div class="flex-between"><h3>3. Prompt de Refinamiento Quirúrgico</h3><button type="button" class="btn btn-secondary copy-cv-btn" data-target="cv-ref-pre">Copiar Refinamiento</button></div><pre id="cv-ref-pre" class="code-block">' + esc(ex.refinementPrompt) + '</pre><h4>Guía de Buenas Prácticas</h4><ol class="stack-sm">' + guideHtml + '</ol></section>',
      '</article>'
    ].join('\n');

    const doneBtn = document.getElementById('toggle-canvas-done-btn');
    if (doneBtn) {
      doneBtn.addEventListener('click', function () {
        const res = AG.toggleExercise(state, 'canvas', ex.id);
        AG.updateHeaderProgressBadges(state);
        renderCanvasSidebar(state, exercises);
        renderCanvasDetail(state, exercises);
        AG.showToast(res.completed ? 'Ejercicio Canvas ' + ex.id + ' completado' : 'Ejercicio Canvas ' + ex.id + ' pendiente');
      });
    }

    detailEl.querySelectorAll('.copy-cv-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pre = document.getElementById(btn.getAttribute('data-target'));
        if (pre) AG.copyText(pre.textContent, 'Prompt copiado al portapapeles');
      });
    });
  }

  function initPromptLab(doc) {
    const d = doc || (typeof document !== 'undefined' ? document : null);
    if (!d) return null;

    const roleIn = d.getElementById('lab-role') || d.getElementById('role-input');
    if (!roleIn || !AG.scorePromptSpec) return null;

    const goalIn = d.getElementById('lab-goal') || d.getElementById('objective-input');
    const filesIn = d.getElementById('lab-files') || d.getElementById('files-input');
    const cmdIn = d.getElementById('lab-command') || d.getElementById('command-input');
    const constIn = d.getElementById('lab-constraints') || d.getElementById('constraints-input');
    const topicIn = d.getElementById('lab-topic') || d.getElementById('topic-input');
    const exSel = d.getElementById('lab-exercise-selector') || d.getElementById('exercise-selector');

    const getSpec = function () {
      return {
        role: roleIn.value,
        goal: goalIn ? goalIn.value : '',
        objective: goalIn ? goalIn.value : '',
        contextFiles: filesIn ? filesIn.value : '',
        atFiles: filesIn ? filesIn.value : '',
        command: cmdIn ? cmdIn.value : '/plan',
        constraints: constIn ? constIn.value : '',
        conceptualTopic: topicIn ? topicIn.value : '',
        conceptualTheme: topicIn ? topicIn.value : ''
      };
    };

    const updateOutputs = function () {
      const spec = getSpec();
      const scoreInfo = AG.scorePromptSpec(spec);
      const scoreBadge = d.getElementById('lab-score-badge');
      const checksList = d.getElementById('lab-checks-list');
      if (scoreBadge) scoreBadge.textContent = 'Calidad: ' + scoreInfo.score + ' % (' + scoreInfo.level + ')';
      if (checksList) {
        checksList.innerHTML = (scoreInfo.checks || []).map(function (c) {
          return '<li>' + (c.ok ? '✓ ' : '○ ') + esc(c.label) + '</li>';
        }).join('');
      }
      const setPre = function (id, txt) {
        const el = d.getElementById(id);
        if (el) el.textContent = txt;
      };
      if (AG.buildAntigravityPrompt) setPre('lab-out-prompt', AG.buildAntigravityPrompt(spec));
      if (AG.buildConceptualTaskGuide) setPre('lab-out-guide', AG.buildConceptualTaskGuide(spec));
      if (AG.buildGeminiMdTemplate) setPre('lab-out-gemini', AG.buildGeminiMdTemplate(spec));
      if (AG.buildSkillMdTemplate) setPre('lab-out-skill', AG.buildSkillMdTemplate(spec));
    };

    const applySpec = function (s) {
      if (!s) return;
      if (roleIn) roleIn.value = s.role || '';
      if (goalIn) goalIn.value = s.goal || s.objective || '';
      if (filesIn) filesIn.value = s.contextFiles || s.atFiles || '';
      if (cmdIn) cmdIn.value = s.command || '/plan';
      if (constIn) constIn.value = s.constraints || '';
      if (topicIn) topicIn.value = s.conceptualTopic || s.conceptualTheme || '';
      updateOutputs();
    };

    [roleIn, goalIn, filesIn, cmdIn, constIn, topicIn].forEach(function (el) {
      if (el) { el.addEventListener('input', updateOutputs); el.addEventListener('change', updateOutputs); }
    });

    const allAg = (AG.AG_EXERCISES_N1_N2 || []).concat(AG.AG_EXERCISES_N3_N4 || []);
    if (exSel && exSel.options && exSel.options.length <= 1 && allAg.length > 0 && d.createElement) {
      allAg.forEach(function (ex) {
        const opt = d.createElement('option');
        opt.value = ex.id;
        opt.textContent = 'Ej. ' + ex.id + ': ' + (ex.title.length > 45 ? ex.title.slice(0, 42) + '...' : ex.title);
        exSel.appendChild(opt);
      });
    }

    if (exSel) {
      exSel.addEventListener('change', function () {
        const id = Number(exSel.value);
        if (!id) return;
        const found = allAg.find(function (e) { return e.id === id; });
        if (!found) return;
        const spec = AG.exerciseToPromptSpec ? AG.exerciseToPromptSpec(found) : null;
        if (!spec) return;
        applySpec(spec);
        if (AG.showToast) AG.showToast('Ejercicio ' + id + ' cargado en el laboratorio');
      });
    }

    d.querySelectorAll('.preset-lab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-preset');
        const p = AG.PROMPT_PRESETS && AG.PROMPT_PRESETS[key];
        if (!p) return;
        applySpec(p);
        if (AG.showToast) AG.showToast('Plantilla "' + key + '" cargada en el constructor');
      });
    });

    d.querySelectorAll('.copy-lab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pre = d.getElementById(btn.getAttribute('data-target'));
        if (pre) AG.copyText(pre.textContent, 'Artefacto generado copiado al portapapeles');
      });
    });

    updateOutputs();
    return { updateOutputs, applySpec };
  }

  const initCanvas = initPromptLab;

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      const state = AG.initSharedShell ? AG.initSharedShell() : {};
      if (document.getElementById('canvas-list-container')) {
        const exercises = getAllCanvasExercises();
        const lvlSel = document.getElementById('canvas-level-filter');
        const stSel = document.getElementById('canvas-status-filter');
        const searchIn = document.getElementById('canvas-search-input');
        const refresh = function () {
          state.canvasLevelFilter = lvlSel ? lvlSel.value : 'all';
          state.canvasStatusFilter = stSel ? stSel.value : 'all';
          state.canvasSearchQuery = searchIn ? searchIn.value : '';
          renderCanvasSidebar(state, exercises);
          renderCanvasDetail(state, exercises);
        };
        if (lvlSel) lvlSel.addEventListener('change', refresh);
        if (stSel) stSel.addEventListener('change', refresh);
        if (searchIn) searchIn.addEventListener('input', refresh);
        refresh();
      }
      initPromptLab(document);
    });
  }

  return { getAllCanvasExercises, renderCanvasSidebar, renderCanvasDetail, initPromptLab, initCanvas };
});
