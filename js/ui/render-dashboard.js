/* Renderizador del Hub Principal (index.html) y Manual de Antigravity (manual-antigravity.html) */
(function (root) {
  'use strict';

  const AG = (root.AGPortal = root.AGPortal || {});

  function renderDashboardKpis(state) {
    if (!AG.getProgressStats) return;
    const stats = AG.getProgressStats(state, 26, 20);
    const setEl = function (id, val) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setEl('kpi-ag-done', stats.agDone + ' / 26');
    setEl('kpi-ag-pct', stats.agPct + ' %');
    setEl('kpi-witness-done', stats.witnessDone + ' / 26');
    setEl('kpi-canvas-done', stats.canvasDone + ' / 20');
    setEl('kpi-total-done', stats.totalDone + ' / 46');
    setEl('kpi-total-pct', stats.totalPct + ' %');

    const barAg = document.getElementById('kpi-ag-bar');
    const barTotal = document.getElementById('kpi-total-bar');
    if (barAg) barAg.style.width = stats.agPct + '%';
    if (barTotal) barTotal.style.width = stats.totalPct + '%';
  }

  function renderToolsGrid(containerId, filterCategory) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(AG.ANTIGRAVITY_TOOLS)) return;
    const list = filterCategory && filterCategory !== 'all'
      ? AG.ANTIGRAVITY_TOOLS.filter(function (t) { return t.category === filterCategory; })
      : AG.ANTIGRAVITY_TOOLS;

    container.innerHTML = list.map(function (t) {
      const prac = Array.isArray(t.practicedIn) && t.practicedIn.length > 0
        ? '<p class="prose-copy" style="margin:0.25rem 0 0;font-size:0.86rem;"><strong>Se practica en Ruta Antigravity:</strong> ' +
          t.practicedIn.map(function (id) { return '<a href="ruta-antigravity.html">Ejercicio ' + id + '</a>'; }).join(', ') + '</p>'
        : '';
      return [
        '<article class="card stack-sm">',
        '  <div class="flex-between">',
        '    <span class="badge badge-l2">' + AG.escapeHtml(t.category) + '</span>',
        '    <code>' + AG.escapeHtml(t.code) + '</code>',
        '  </div>',
        '  <h3>' + AG.escapeHtml(t.title) + '</h3>',
        '  <p class="prose-copy">' + AG.escapeHtml(t.summary) + '</p>',
        '  <p class="prose-copy"><strong>Cuándo usarla:</strong> ' + AG.escapeHtml(t.whenToUse) + '</p>',
        prac,
        '  <div class="card-elevated stack-sm">',
        '    <div class="flex-between"><strong>Ejemplo práctico:</strong>',
        '      <button type="button" class="btn btn-secondary copy-cmd-btn" data-cmd="' + AG.escapeHtml(t.exampleCommand) + '">Copiar comando</button>',
        '    </div>',
        '    <pre class="code-block">' + AG.escapeHtml(t.exampleCommand) + '</pre>',
        '  </div>',
        '</article>'
      ].join('\n');
    }).join('\n');

    container.querySelectorAll('.copy-cmd-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        AG.copyText(btn.getAttribute('data-cmd') || '', 'Comando de ejemplo copiado');
      });
    });
  }

  function renderProtocolAndMatrix() {
    const protoContainer = document.getElementById('protocol-steps-grid');
    if (protoContainer && Array.isArray(AG.PROTOCOL_6_STEPS)) {
      protoContainer.innerHTML = AG.PROTOCOL_6_STEPS.map(function (p) {
        return [
          '<article class="card stack-sm">',
          '  <div class="flex-between"><span class="badge badge-l1">Paso ' + p.step + '</span><code>' + AG.escapeHtml(p.cmd) + '</code></div>',
          '  <h3>' + AG.escapeHtml(p.name) + '</h3>',
          '  <p class="prose-copy">' + AG.escapeHtml(p.detail) + '</p>',
          '</article>'
        ].join('\n');
      }).join('\n');
    }

    const matrixBody = document.getElementById('diagnostic-matrix-body');
    if (matrixBody && Array.isArray(AG.DIAGNOSTIC_MATRIX)) {
      matrixBody.innerHTML = AG.DIAGNOSTIC_MATRIX.map(function (row) {
        return [
          '<tr>',
          '  <td><strong>' + AG.escapeHtml(row.symptom) + '</strong></td>',
          '  <td>' + AG.escapeHtml(row.cause) + '</td>',
          '  <td>' + AG.escapeHtml(row.solution) + '</td>',
          '</tr>'
        ].join('\n');
      }).join('\n');
    }
  }

  function bindDashboardActions(state) {
    const exportBtn = document.getElementById('export-progress-btn');
    if (exportBtn && AG.exportProgressJson) {
      exportBtn.addEventListener('click', function () {
        const json = AG.exportProgressJson(state);
        AG.copyText(json, 'Respaldo JSON de progreso copiado al portapapeles');
        if (AG.flashCopiedButton) AG.flashCopiedButton(exportBtn);
      });
    }

    const importBtn = document.getElementById('import-progress-btn');
    if (importBtn && AG.openImportProgressModal) {
      importBtn.addEventListener('click', function () {
        AG.openImportProgressModal(state, function () {
          renderDashboardKpis(state);
        }, document);
      });
    }

    const shortcutsBtn = document.getElementById('shortcuts-help-btn');
    if (shortcutsBtn && AG.openKeyboardShortcutsModal) {
      shortcutsBtn.addEventListener('click', function () {
        AG.openKeyboardShortcutsModal(document);
      });
    }

    const resetBtn = document.getElementById('reset-all-progress-btn');
    if (resetBtn && AG.resetRouteProgress) {
      resetBtn.addEventListener('click', function () {
        AG.resetRouteProgress(state, 'all');
        renderDashboardKpis(state);
        AG.updateHeaderProgressBadges(state);
        AG.showToast('Progreso de ejercicios reiniciado a cero');
      });
    }

    const catSelect = document.getElementById('manual-category-filter');
    if (catSelect) {
      catSelect.addEventListener('change', function () {
        renderToolsGrid('manual-tools-grid', catSelect.value);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const state = AG.initSharedShell ? AG.initSharedShell() : {};
    renderDashboardKpis(state);
    renderToolsGrid('manual-tools-grid', 'all');
    renderProtocolAndMatrix();
    bindDashboardActions(state);
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
