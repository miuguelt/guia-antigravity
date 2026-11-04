/* Renderizador Master-Detail de los 26 ejercicios de Antigravity, Kit Semilla Multi-Archivo y Simulador */
(function (root) {
  'use strict';

  const AG = (root.AGPortal = root.AGPortal || {});
  const TOTAL_AG = 26;

  function getAllAgExercises() {
    const all = (AG.AG_EXERCISES_N1_N2 || []).concat(AG.AG_EXERCISES_N3_N4 || []);
    return AG.sortExercisesForRoute ? AG.sortExercisesForRoute(all) : all;
  }

  const toLi = function (arr) {
    return (arr || []).map(function (s) { return '<li>' + AG.escapeHtml(s) + '</li>'; }).join('');
  };

  function renderKitFilesHtml(kitMeta) {
    const files = Array.isArray(kitMeta.files) ? kitMeta.files : [];
    return files.map(function (f) {
      const ext = AG.escapeHtml(f.ext || 'txt');
      return '<div class="kit-file-card">' +
        '<div class="kit-file-header"><span class="ext-badge ext-' + ext + '">.' + ext + '</span><div class="kit-file-name">@' + AG.escapeHtml(f.filename) + '</div></div>' +
        '<p class="kit-file-desc">' + AG.escapeHtml(f.role || 'Documento didáctico del kit') + '</p>' +
        '<div class="kit-file-actions">' +
        '<button type="button" class="btn btn-secondary preview-single-file-btn" data-file-index="' + f.index + '" title="Ver contenido de ' + AG.escapeHtml(f.filename) + '">👁️ Ver</button>' +
        '<button type="button" class="btn download-single-file-btn" data-file-index="' + f.index + '" title="Descargar ' + AG.escapeHtml(f.filename) + '">⬇️ Descargar</button>' +
        '</div></div>';
    }).join('');
  }

  function getVisibleExercises(state, exercises) {
    return AG.filterExercises(exercises, {
      levelFilter: state.agLevelFilter, statusFilter: state.agStatusFilter,
      searchQuery: state.agSearchQuery, completedIds: state.agCompletedIds
    });
  }

  function renderAgSidebar(state, exercises) {
    const listEl = document.getElementById('ag-list-container');
    if (!listEl) return;

    const filtered = getVisibleExercises(state, exercises);

    const stats = AG.getProgressStats(state, TOTAL_AG, 20);
    const barEl = document.getElementById('ag-route-bar');
    const txtEl = document.getElementById('ag-route-summary');
    if (barEl) barEl.style.width = stats.agPct + '%';
    if (txtEl) txtEl.textContent = stats.agDone + ' de ' + TOTAL_AG + ' completados (' + stats.agPct + ' %) · ' + stats.witnessDone + ' Casos Testigo verificados';

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="card-elevated"><p>No hay ejercicios que coincidan con el filtro actual.</p></div>';
      return;
    }

    if (!filtered.some(function (e) { return e.id === state.agSelectedId; })) state.agSelectedId = filtered[0].id;

    listEl.innerHTML = filtered.map(function (ex) {
      const selected = ex.id === state.agSelectedId, done = state.agCompletedIds.includes(ex.id), verified = state.witnessVerifiedIds.includes(ex.id);
      return '<button type="button" class="exercise-item-btn ' + (selected ? 'is-selected' : '') + '" data-ex-id="' + ex.id + '">' +
        '<span class="' + AG.getLevelBadgeClass(ex.level) + '">' + (done ? '✓ ' : '#') + ex.id + '</span>' +
        '<div class="stack-sm" style="flex:1;"><div><strong>' + AG.escapeHtml(ex.title) + '</strong></div>' +
        '<div class="flex-row-wrap"><small>Nivel ' + ex.level + ' · ' + AG.escapeHtml(ex.duration) + '</small>' + (verified ? '<span class="badge badge-l2">Testigo verificado</span>' : '') + '</div>' +
        '</div></button>';
    }).join('\n');

    listEl.querySelectorAll('.exercise-item-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.agSelectedId = Number(btn.getAttribute('data-ex-id'));
        renderAgSidebar(state, exercises);
        renderAgDetail(state, exercises);
      });
    });
  }

  function renderAgDetail(state, exercises) {
    const detailEl = document.getElementById('ag-detail-container');
    if (!detailEl) return;
    const ex = exercises.find(function (item) { return item.id === state.agSelectedId; }) || exercises[0];
    if (!ex) return;

    const isDone = state.agCompletedIds.includes(ex.id);
    const isVerified = state.witnessVerifiedIds.includes(ex.id);
    const spec = AG.getWitnessSpec ? AG.getWitnessSpec(ex.id) : ex.testCase;
    const kitMeta = AG.getKitMetadata ? AG.getKitMetadata(ex.id) : { filename: ex.kit.filename, fileCount: 1, folderName: 'ejercicio-' + ex.id, summary: ex.kit.description, files: [] };
    const visibleList = getVisibleExercises(state, exercises);
    const prevId = AG.getAdjacentExerciseId ? AG.getAdjacentExerciseId(visibleList, ex.id, -1) : null;
    const nextId = AG.getAdjacentExerciseId ? AG.getAdjacentExerciseId(visibleList, ex.id, 1) : null;
    const checkedList = (state.agChecklist && Array.isArray(state.agChecklist[ex.id])) ? state.agChecklist[ex.id] : [];

    const tabsNavHtml = AG.renderExerciseTabsNav ? AG.renderExerciseTabsNav(kitMeta.fileCount) : '';
    const verifyCardHtml = AG.renderArtifactVerificationCard ? AG.renderArtifactVerificationCard(ex, spec, checkedList) : '';
    const troubleHtml = AG.renderTroubleshootingCard ? AG.renderTroubleshootingCard(ex) : '';
    const stepByStepHtml = spec.stepByStep ? '<div class="card-elevated" style="margin-top:0.5rem;padding:0.75rem;font-size:0.875rem;"><strong>🔍 Explicación Paso a Paso del Caso Testigo:</strong><pre style="white-space:pre-wrap;font-family:inherit;margin:0.25rem 0 0;color:var(--color-text-muted);">' + AG.escapeHtml(spec.stepByStep) + '</pre></div>' : '';

    const roleCardHtml = ex.businessChallenge ? [
      '<div class="card-elevated stack-sm" style="background:var(--color-surface);border-left:4px solid var(--color-primary);">',
      '  <div><strong>🎯 Reto del Negocio:</strong> ' + AG.escapeHtml(ex.businessChallenge) + '</div>',
      '  <div class="grid-2col" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:0.75rem;margin-top:0.5rem;">',
      '    <div class="card" style="margin:0;padding:0.75rem;border-color:var(--color-primary);"><strong style="color:var(--color-primary);">🤖 Lo que hace el Agente (IA):</strong><p class="prose-copy" style="margin:0.25rem 0 0;font-size:0.9rem;">' + AG.escapeHtml(ex.agentRoleAction || '') + '</p></div>',
      '    <div class="card" style="margin:0;padding:0.75rem;border-color:var(--color-accent);"><strong style="color:var(--color-accent);">👤 Lo que haces tú (Ejercicio Paralelo):</strong><p class="prose-copy" style="margin:0.25rem 0 0;font-size:0.9rem;">' + AG.escapeHtml(ex.learnerParallelAction || '') + '</p></div>',
      '  </div>',
      '  ' + (ex.professionalOutputCriteria ? '<div style="margin-top:0.5rem;font-size:0.875rem;"><strong>💎 Criterio de Resultado Profesional:</strong> ' + AG.escapeHtml(ex.professionalOutputCriteria) + '</div>' : ''),
      '</div>'
    ].join('\n') : '';

    detailEl.innerHTML = [
      '<article class="card stack-md">',
      '  <div class="flex-between"><div class="flex-row-wrap"><span class="' + AG.getLevelBadgeClass(ex.level) + '">' + AG.escapeHtml(ex.levelName) + '</span><span class="badge">' + AG.escapeHtml(ex.complexity) + '</span><span class="badge">Perfil: ' + AG.escapeHtml(ex.nonDevProfile) + '</span></div><button type="button" id="toggle-ag-done-btn" class="btn ' + (isDone ? 'btn-primary' : 'btn-secondary') + '">' + (isDone ? '✓ Ejercicio Completado' : 'Marcar como Completado') + '</button></div>',
      '  <h2>Ejercicio ' + ex.id + ': ' + AG.escapeHtml(ex.title) + '</h2>',
      '  <p class="prose-copy"><strong>Objetivo práctico:</strong> ' + AG.escapeHtml(ex.goal) + '</p>',
      roleCardHtml,
      tabsNavHtml,
      '  <div id="tab-kit" role="tabpanel" aria-labelledby="tabbtn-kit" class="exercise-tab-panel is-active card-elevated stack-sm"><div class="flex-between"><div><strong>Kit de Archivos Semilla (' + kitMeta.fileCount + ' documentos reales listos · Carpeta: <code>kits/' + AG.escapeHtml(kitMeta.folderName) + '/</code>):</strong><p class="prose-copy" style="margin:0.25rem 0 0;">' + AG.escapeHtml(kitMeta.summary || ex.kit.description) + '</p></div><button type="button" id="download-kit-btn" class="btn btn-primary">📦 Descargar Kit Completo (.zip)</button></div><div class="kit-files-grid">' + renderKitFilesHtml(kitMeta) + '</div></div>',
      '  <div id="tab-prompt" role="tabpanel" aria-labelledby="tabbtn-prompt" class="exercise-tab-panel stack-sm"><div class="card-elevated stack-sm"><h3>Secuencia Guiada en Google Antigravity</h3><ol class="stack-sm">' + toLi(ex.antigravitySteps) + '</ol></div><div class="stack-sm"><div class="flex-between"><h3>Prompt Inicial Estructurado (pégalo en modo Planning)</h3><button type="button" class="btn btn-secondary copy-block-btn" data-target="initial-prompt-pre">Copiar Prompt Inicial</button></div><pre id="initial-prompt-pre" class="code-block">' + AG.escapeHtml(ex.initialPrompt) + '</pre></div>' + troubleHtml + '</div>',
      '  <div id="tab-task" role="tabpanel" aria-labelledby="tabbtn-task" class="exercise-tab-panel card-elevated stack-sm"><div class="flex-between"><h3>Tarea Conceptual en Paralelo: ' + AG.escapeHtml(ex.conceptualTaskTitle) + '</h3><button type="button" id="start-task-timer-btn" class="btn btn-secondary">⏱️ Iniciar Temporizador</button></div><p class="prose-copy">' + AG.escapeHtml(ex.conceptualTheory) + '</p><ol class="stack-sm">' + toLi(ex.conceptualTaskSteps) + '</ol><div class="flex-between"><strong>Prompt de profundización conceptual:</strong><button type="button" class="btn btn-secondary copy-block-btn" data-target="parallel-prompt-pre">Copiar Consulta</button></div><pre id="parallel-prompt-pre" class="code-block">' + AG.escapeHtml(ex.parallelToolPrompt) + '</pre></div>',
      '  <div id="tab-witness" role="tabpanel" aria-labelledby="tabbtn-witness" class="exercise-tab-panel card stack-sm"><div class="flex-between"><h3 id="sim-title">Simulador Determinista de Caso Testigo (4 Estados)</h3><span id="witness-badge" class="badge ' + (isVerified ? 'badge-l2' : '') + '">' + (isVerified ? '✓ Caso Testigo Verificado' : 'Pendiente de verificar') + '</span></div><p class="prose-copy"><strong>Indicador a comprobar:</strong> ' + AG.escapeHtml(spec.label) + ' (' + AG.escapeHtml(spec.unit) + '). Fórmula: <code>' + AG.escapeHtml(spec.formulaHint) + '</code></p>' + stepByStepHtml + '<div class="flex-row-wrap"><label for="witness-input" style="font-weight:600;">Tu resultado calculado:</label><input id="witness-input" type="text" class="input-control" style="max-width:16rem;" placeholder="Escribe tu cálculo numérico" value="' + (isVerified ? AG.escapeHtml(spec.sampleInput) : '') + '"><button type="button" id="eval-valid-btn" class="btn btn-primary">Verificar Cálculo</button><button type="button" id="eval-invalid-btn" class="btn">Probar Inválido</button><button type="button" id="eval-empty-btn" class="btn">Probar Vacío</button><button type="button" id="eval-reset-btn" class="btn">Reiniciar (Reset)</button><button type="button" id="copy-evidence-btn" class="btn btn-secondary">📋 Copiar Evidencia para Portafolio</button></div><div id="witness-feedback" class="status-box status-reset" role="status">Calcula el resultado con los pasos de la Tarea Conceptual e ingrésalo arriba para validar los 4 estados deterministas.</div>' + verifyCardHtml + '</div>',
      '  <div id="tab-refine" role="tabpanel" aria-labelledby="tabbtn-refine" class="exercise-tab-panel stack-sm"><div class="flex-between"><h3>Prompt de Refinamiento e Iteración</h3><button type="button" class="btn btn-secondary copy-block-btn" data-target="refine-prompt-pre">Copiar Refinamiento</button></div><pre id="refine-prompt-pre" class="code-block">' + AG.escapeHtml(ex.refinementPrompt) + '</pre></div>',
      '  <div class="flex-between"><button type="button" id="prev-ag-btn" class="btn"' + (prevId === null ? ' disabled' : '') + '>← Ejercicio Anterior</button><button type="button" id="next-ag-btn" class="btn btn-primary"' + (nextId === null ? ' disabled' : '') + '>Siguiente Ejercicio →</button></div>',
      '</article>'
    ].join('\n');

    bindAgDetailEvents(state, exercises, ex, spec);
  }

  function bindAgDetailEvents(state, exercises, ex, spec) {
    const detailEl = document.getElementById('ag-detail-container');
    if (!detailEl) return;
    const setEvt = function (id, fn) { const b = document.getElementById(id); if (b) b.addEventListener('click', fn); };

    const tabBtns = Array.from(detailEl.querySelectorAll('.exercise-tab-btn'));
    const activateTab = function (tBtn, focusIt) {
      const targetId = tBtn.getAttribute('data-tab');
      tabBtns.forEach(function (b) {
        const active = b === tBtn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
        b.setAttribute('tabindex', active ? '0' : '-1');
      });
      detailEl.querySelectorAll('.exercise-tab-panel').forEach(function (p) { p.classList.toggle('is-active', p.id === targetId); });
      if (focusIt && typeof tBtn.focus === 'function') tBtn.focus();
    };

    tabBtns.forEach(function (tBtn, idx) {
      tBtn.addEventListener('click', function () { activateTab(tBtn, false); });
      tBtn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const nextIdx = (idx + (e.key === 'ArrowRight' ? 1 : tabBtns.length - 1)) % tabBtns.length;
          activateTab(tabBtns[nextIdx], true);
        }
      });
    });

    detailEl.querySelectorAll('.artifact-check-input').forEach(function (chk) {
      chk.addEventListener('change', function () {
        if (AG.toggleChecklistItem) AG.toggleChecklistItem(state, ex.id, Number(chk.getAttribute('data-check-idx')));
      });
    });

    setEvt('toggle-ag-done-btn', function () {
      const res = AG.toggleExercise(state, 'antigravity', ex.id);
      AG.updateHeaderProgressBadges(state); renderAgSidebar(state, exercises); renderAgDetail(state, exercises);
      AG.showToast(res.completed ? 'Ejercicio ' + ex.id + ' marcado como completado' : 'Ejercicio ' + ex.id + ' marcado como pendiente');
    });

    setEvt('download-kit-btn', function () {
      if (AG.triggerKitZipDownload) {
        const out = AG.triggerKitZipDownload(ex.id, document);
        AG.showToast('Kit ZIP (' + out.pack.zipName + ') descargado (' + out.pack.fileCount + ' archivos)');
      }
    });

    detailEl.querySelectorAll('.preview-single-file-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { if (AG.openFilePreviewModal) AG.openFilePreviewModal(ex.id, Number(btn.getAttribute('data-file-index') || 0), document); });
    });
    detailEl.querySelectorAll('.download-single-file-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (AG.triggerKitDownload) {
          const out = AG.triggerKitDownload(ex.id, document, Number(btn.getAttribute('data-file-index') || 0));
          AG.showToast('Archivo @' + out.kit.filename + ' descargado');
        }
      });
    });
    detailEl.querySelectorAll('.copy-block-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = document.getElementById(btn.getAttribute('data-target'));
        if (target) { AG.copyText(target.textContent, 'Prompt copiado al portapapeles'); if (AG.flashCopiedButton) AG.flashCopiedButton(btn); }
      });
    });

    const inputEl = document.getElementById('witness-input'), feedbackEl = document.getElementById('witness-feedback');
    let lastResult = null;
    const runEval = function (rawVal) {
      const result = AG.evaluateWitnessCase(ex.id, rawVal);
      lastResult = result;
      if (feedbackEl) { feedbackEl.className = 'status-box status-' + result.status; feedbackEl.textContent = result.message; }
      if (result.ok) {
        AG.recordTestCaseVerified(state, ex.id); renderAgSidebar(state, exercises);
        const badge = document.getElementById('witness-badge');
        if (badge) { badge.className = 'badge badge-l2 badge-witness-success'; badge.textContent = '✓ Caso Testigo Verificado'; }
      }
    };

    if (inputEl) {
      setEvt('eval-valid-btn', function () { runEval(inputEl.value); });
      setEvt('eval-invalid-btn', function () { inputEl.value = '-999999'; runEval(inputEl.value); });
      setEvt('eval-empty-btn', function () { inputEl.value = ''; runEval(''); });
      setEvt('eval-reset-btn', function () {
        const r = AG.resetWitnessCase(ex.id);
        lastResult = r; inputEl.value = r.inputValue;
        if (feedbackEl) { feedbackEl.className = 'status-box status-reset'; feedbackEl.textContent = r.message; }
      });
    }

    const mins = AG.getExerciseMinutes ? AG.getExerciseMinutes(ex) : 3;
    setEvt('start-task-timer-btn', function () { if (AG.startStudyTimer) AG.startStudyTimer(mins, ex.title); });
    setEvt('copy-evidence-btn', function () {
      const btn = document.getElementById('copy-evidence-btn');
      const snip = AG.buildEvidenceSnippet ? AG.buildEvidenceSnippet(ex.id, lastResult) : '';
      if (AG.copyText) AG.copyText(snip, 'Evidencia copiada para tu Portafolio');
      if (AG.flashCopiedButton && btn) AG.flashCopiedButton(btn);
    });
    const visible = getVisibleExercises(state, exercises);
    const goTo = function (dir) {
      const target = AG.getAdjacentExerciseId(visible, ex.id, dir);
      if (target === null) return;
      state.agSelectedId = target; renderAgSidebar(state, exercises); renderAgDetail(state, exercises);
    };
    setEvt('prev-ag-btn', function () { goTo(-1); });
    setEvt('next-ag-btn', function () { goTo(1); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const state = AG.initSharedShell ? AG.initSharedShell() : {};
    const exercises = getAllAgExercises();
    if (!document.getElementById('ag-list-container')) return;

    const lvlSel = document.getElementById('ag-level-filter'), stSel = document.getElementById('ag-status-filter'), searchIn = document.getElementById('ag-search-input');
    const refresh = function () {
      state.agLevelFilter = lvlSel ? lvlSel.value : 'all';
      state.agStatusFilter = stSel ? stSel.value : 'all';
      state.agSearchQuery = searchIn ? searchIn.value : '';
      renderAgSidebar(state, exercises); renderAgDetail(state, exercises);
    };
    if (lvlSel) lvlSel.addEventListener('change', refresh);
    if (stSel) stSel.addEventListener('change', refresh);
    if (searchIn) searchIn.addEventListener('input', refresh);
    refresh();
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
