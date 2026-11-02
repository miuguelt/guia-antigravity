/* Módulo de Mejoras UX/UI: Modales accesibles, vista previa de kits, importación y feedback táctil */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function flashCopiedButton(btn, customLabel) {
    if (!btn) return;
    const original = btn.dataset.origText || btn.textContent;
    btn.dataset.origText = original;
    btn.textContent = customLabel || '✓ ¡Copiado!';
    btn.classList.add('btn-copied');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('btn-copied');
    }, 1800);
  }

  function closeModal(doc) {
    const d = doc || (typeof document !== 'undefined' ? document : null);
    if (!d) return;
    const existing = d.getElementById('ag-active-modal');
    if (existing) {
      if (existing.parentElement && typeof existing.parentElement.removeChild === 'function') {
        existing.parentElement.removeChild(existing);
      } else if (typeof existing.remove === 'function') {
        existing.remove();
      }
    }
  }

  function createModalShell(title, bodyHtml, footerHtml, doc) {
    const d = doc || (typeof document !== 'undefined' ? document : null);
    if (!d) return null;
    closeModal(d);

    const backdrop = d.createElement('div');
    backdrop.id = 'ag-active-modal';
    backdrop.className = 'modal-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', title);

    backdrop.innerHTML = [
      '<div class="modal-card stack-md">',
      '  <div class="flex-between">',
      '    <h2 style="margin:0;">' + title + '</h2>',
      '    <button type="button" class="btn btn-secondary modal-close-btn" aria-label="Cerrar ventana modal">✕</button>',
      '  </div>',
      '  <div class="modal-body stack-sm">' + bodyHtml + '</div>',
      footerHtml ? ('  <div class="flex-between flex-row-wrap" style="gap:0.5rem;padding-top:0.5rem;border-top:1px solid var(--border-subtle);">' + footerHtml + '</div>') : '',
      '</div>'
    ].join('\n');

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal(d);
    });

    backdrop.querySelectorAll('.modal-close-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModal(d); });
    });

    d.body.appendChild(backdrop);
    const closeBtn = backdrop.querySelector('.modal-close-btn');
    if (closeBtn && typeof closeBtn.focus === 'function') closeBtn.focus();
    return backdrop;
  }

  function openFilePreviewModal(exerciseId, fileIndex, doc) {
    const p = typeof globalThis !== 'undefined' && globalThis.AGPortal;
    if (!p || !p.buildKitContent) return null;
    const file = p.buildKitContent(exerciseId, fileIndex);
    const d = doc || (typeof document !== 'undefined' ? document : null);
    const ext = p.escapeHtml ? p.escapeHtml(file.ext) : file.ext;
    const name = p.escapeHtml ? p.escapeHtml(file.filename) : file.filename;
    const role = p.escapeHtml ? p.escapeHtml(file.role || '') : (file.role || '');

    const bodyHtml = [
      '<div class="flex-row-wrap"><span class="ext-badge ext-' + ext + '">.' + ext + '</span><strong>@' + name + '</strong></div>',
      role ? ('<p class="prose-copy" style="margin:0.25rem 0;">' + role + '</p>') : '',
      '<pre class="file-preview-content">' + (p.escapeHtml ? p.escapeHtml(file.content) : file.content) + '</pre>'
    ].join('\n');

    const footerHtml = [
      '<div class="flex-row-wrap" style="gap:0.5rem;">',
      '  <button type="button" id="preview-copy-btn" class="btn btn-primary">Copiar Contenido</button>',
      '  <button type="button" id="preview-download-btn" class="btn btn-secondary">Descargar Archivo</button>',
      '</div>',
      '<button type="button" class="btn modal-close-btn">Cerrar</button>'
    ].join('\n');

    const modal = createModalShell('Vista Previa: ' + file.filename, bodyHtml, footerHtml, d);
    if (!modal) return null;

    const copyBtn = modal.querySelector('#preview-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (p.copyText) p.copyText(file.content, 'Contenido de ' + file.filename + ' copiado');
        flashCopiedButton(copyBtn);
      });
    }

    const dlBtn = modal.querySelector('#preview-download-btn');
    if (dlBtn) {
      dlBtn.addEventListener('click', function () {
        if (p.triggerKitDownload) p.triggerKitDownload(exerciseId, d, fileIndex);
      });
    }

    return modal;
  }

  function openImportProgressModal(state, onUpdated, doc) {
    const p = typeof globalThis !== 'undefined' && globalThis.AGPortal;
    const d = doc || (typeof document !== 'undefined' ? document : null);

    const bodyHtml = [
      '<p class="prose-copy">Pega aquí el texto JSON de un respaldo de progreso previo para sincronizar tus ejercicios y casos testigo verificados:</p>',
      '<textarea id="import-progress-area" class="textarea-control" rows="8" placeholder=\'{"version":1,"agCompletedIds":[1,2],"witnessVerifiedIds":[1],...}\'></textarea>',
      '<div id="import-feedback" class="status-box status-reset" style="display:none;" role="status"></div>'
    ].join('\n');

    const footerHtml = [
      '<button type="button" id="run-import-btn" class="btn btn-primary">Validar y Restaurar Progreso</button>',
      '<button type="button" class="btn modal-close-btn">Cancelar</button>'
    ].join('\n');

    const modal = createModalShell('Restaurar Respaldo de Progreso (JSON)', bodyHtml, footerHtml, d);
    if (!modal) return null;

    const runBtn = modal.querySelector('#run-import-btn');
    const area = modal.querySelector('#import-progress-area');
    const fb = modal.querySelector('#import-feedback');

    if (runBtn && area) {
      runBtn.addEventListener('click', function () {
        const raw = area.value.trim();
        if (!p || !p.importProgressJson) return;
        const res = p.importProgressJson(state, raw);
        if (fb) {
          fb.style.display = 'block';
          fb.className = 'status-box ' + (res.ok ? 'status-valido' : 'status-invalido');
          fb.textContent = res.message;
        }
        if (res.ok) {
          if (p.updateHeaderProgressBadges) p.updateHeaderProgressBadges(state);
          if (typeof onUpdated === 'function') onUpdated(state);
          if (p.showToast) p.showToast('Progreso restaurado correctamente');
          setTimeout(function () { closeModal(d); }, 1400);
        }
      });
    }

    return modal;
  }

  function openKeyboardShortcutsModal(doc) {
    const d = doc || (typeof document !== 'undefined' ? document : null);
    const bodyHtml = [
      '<p class="prose-copy">Usa estos atajos de teclado accesibles para navegar y operar el portal con total rapidez:</p>',
      '<div class="table-scroll"><table class="data-table">',
      '  <thead><tr><th>Atajo</th><th>Acción</th><th>Ámbito</th></tr></thead>',
      '  <tbody>',
      '    <tr><td><span class="kbd-badge">Alt + T</span></td><td>Iniciar, pausar o reanudar Tarea Conceptual Activa</td><td>Global</td></tr>',
      '    <tr><td><span class="kbd-badge">Alt + P</span></td><td>Imprimir página actual en formato institucional</td><td>Global</td></tr>',
      '    <tr><td><span class="kbd-badge">Alt + →</span></td><td>Avanzar al siguiente ejercicio progresivo</td><td>Rutas 1 y 2</td></tr>',
      '    <tr><td><span class="kbd-badge">Alt + ←</span></td><td>Retroceder al ejercicio anterior</td><td>Rutas 1 y 2</td></tr>',
      '    <tr><td><span class="kbd-badge">/</span> o <span class="kbd-badge">Ctrl + K</span></td><td>Enfocar caja de búsqueda de ejercicios</td><td>Rutas y Hub</td></tr>',
      '    <tr><td><span class="kbd-badge">F1</span> o <span class="kbd-badge">?</span></td><td>Abrir esta guía de atajos de teclado</td><td>Global</td></tr>',
      '    <tr><td><span class="kbd-badge">Esc</span></td><td>Cerrar ventana modal o vista previa activa</td><td>Global</td></tr>',
      '  </tbody>',
      '</table></div>'
    ].join('\n');

    return createModalShell('Atajos de Teclado del Portal', bodyHtml, '<button type="button" class="btn btn-primary modal-close-btn">Entendido</button>', d);
  }

  function initGlobalShortcuts(doc) {
    const d = doc || (typeof document !== 'undefined' ? document : null);
    if (!d || !d.addEventListener) return;
    d.addEventListener('keydown', function (e) {
      const tag = (d.activeElement && d.activeElement.tagName ? d.activeElement.tagName : '').toUpperCase();
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (e.key === 'Escape') {
        closeModal(d);
        return;
      }
      if (!inInput && (e.key === 'F1' || e.key === '?')) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        openKeyboardShortcutsModal(d);
      }
    });
  }

  if (typeof document !== 'undefined') {
    initGlobalShortcuts(document);
  }

  return {
    flashCopiedButton: flashCopiedButton,
    closeModal: closeModal,
    createModalShell: createModalShell,
    openFilePreviewModal: openFilePreviewModal,
    openImportProgressModal: openImportProgressModal,
    openKeyboardShortcutsModal: openKeyboardShortcutsModal,
    initGlobalShortcuts: initGlobalShortcuts
  };
});
