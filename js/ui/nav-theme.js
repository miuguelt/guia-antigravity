/* Navegación global, conmutador de tema claro/oscuro, portapapeles y avisos */
(function (root) {
  'use strict';

  const AG = (root.AGPortal = root.AGPortal || {});

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getLevelBadgeClass(level) {
    const n = Number(level);
    if (n === 1) return 'badge badge-l1';
    if (n === 2) return 'badge badge-l2';
    if (n === 3) return 'badge badge-l3';
    return 'badge badge-l4';
  }

  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-region';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    const item = document.createElement('div');
    item.className = 'card-elevated';
    item.style.borderLeft = '4px solid var(--accent-primary)';
    item.style.fontWeight = '600';
    item.textContent = message;
    container.appendChild(item);
    if (container.children.length > 3) {
      container.removeChild(container.firstChild);
    }
  }

  function copyText(text, label) {
    const msg = label || 'Texto copiado al portapapeles';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('✓ ' + msg);
      }).catch(function () {
        fallbackCopyText(text, msg);
      });
    } else {
      fallbackCopyText(text, msg);
    }
  }

  function fallbackCopyText(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('✓ ' + msg);
    } catch (_) {
      showToast('Selecciona el bloque y cópialo con Ctrl+C');
    }
    document.body.removeChild(ta);
  }

  function applyThemeToDom(themeName) {
    const mode = themeName === 'oscuro' ? 'oscuro' : 'claro';
    document.documentElement.setAttribute('data-theme', mode);
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.textContent = mode === 'oscuro' ? 'Modo Claro (Brisa Nórdica)' : 'Modo Oscuro (Noche Apacible)';
      toggleBtn.setAttribute('aria-pressed', mode === 'oscuro' ? 'true' : 'false');
    }
  }

  function updateHeaderProgressBadges(state) {
    if (!AG.getProgressStats) return;
    const stats = AG.getProgressStats(state, 26, 20);
    const agEl = document.getElementById('header-ag-count');
    const cvEl = document.getElementById('header-canvas-count');
    const totEl = document.getElementById('header-total-pct');
    if (agEl) agEl.textContent = stats.agDone + '/26';
    if (cvEl) cvEl.textContent = stats.canvasDone + '/20';
    if (totEl) totEl.textContent = stats.totalPct + ' %';
  }

  function initSharedShell() {
    const state = AG.loadState ? AG.loadState() : { theme: 'claro', agCompletedIds: [], canvasCompletedIds: [], witnessVerifiedIds: [] };
    AG.activeState = state;
    applyThemeToDom(state.theme);
    updateHeaderProgressBadges(state);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const next = state.theme === 'oscuro' ? 'claro' : 'oscuro';
        if (AG.setTheme) AG.setTheme(state, next);
        applyThemeToDom(next);
        showToast('Tema visual cambiado a ' + (next === 'oscuro' ? 'Noche Apacible' : 'Brisa Nórdica'));
      });
    }

    const printBtn = document.getElementById('print-page-btn');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    const shortcutsBtn = document.getElementById('shortcuts-help-btn');
    if (shortcutsBtn) {
      shortcutsBtn.addEventListener('click', function () {
        if (AG.openKeyboardShortcutsModal) AG.openKeyboardShortcutsModal(document);
      });
    }

    return state;
  }

  Object.assign(AG, {
    escapeHtml,
    getLevelBadgeClass,
    showToast,
    copyText,
    applyThemeToDom,
    updateHeaderProgressBadges,
    initSharedShell
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
