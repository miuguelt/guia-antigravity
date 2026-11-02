/* Módulo de temporizador de estudio conceptual y atajos de teclado accesibles */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  let activeController = null;

  function createTimerState(minutes = 3, label = 'Estudio Conceptual') {
    const raw = Number(minutes), isSec = raw > 30;
    const total = isSec ? raw : Math.max(1, Math.round((raw || 3) * 60));
    return {
      minutes: isSec ? Number((raw / 60).toFixed(1)) : (raw || 3),
      secondsLeft: total, totalSeconds: total,
      label: String(label || 'Estudio Conceptual'),
      isRunning: false, isCompleted: false
    };
  }

  function tickTimer(state) {
    if (!state) return state;
    if (state.secondsLeft <= 0 || state.isCompleted) {
      return Object.assign({}, state, { secondsLeft: 0, isRunning: false, isCompleted: true });
    }
    const next = state.secondsLeft - 1, done = next === 0;
    return Object.assign({}, state, { secondsLeft: next, isRunning: done ? false : state.isRunning, isCompleted: done });
  }

  function formatTime(seconds) {
    const s = Math.max(0, Math.floor(Number(seconds) || 0)), m = Math.floor(s / 60), sec = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function resetTimer(state) {
    if (!state) return state;
    return Object.assign({}, state, { secondsLeft: state.totalSeconds, isRunning: false, isCompleted: false });
  }

  function handleKeyboardShortcut(event, actions, activeElement) {
    if (!event) return null;
    const acts = actions || {}, el = activeElement || (event.target && event.target.tagName ? event.target : null);
    const tag = (el && el.tagName ? el.tagName : '').toUpperCase();
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (el && el.isContentEditable)) return null;

    const k = event.key || '', alt = Boolean(event.altKey), ctrl = Boolean(event.ctrlKey || event.metaKey);
    const run = (f1, f2) => { if (typeof f1 === 'function') f1(); else if (typeof f2 === 'function') f2(); };

    if (alt && !ctrl && (k === 't' || k === 'T')) { run(acts.toggleTheme, acts.onToggleTheme); return 'TOGGLE_THEME'; }
    if (alt && !ctrl && (k === 'p' || k === 'P')) { run(acts.print, acts.onPrint); return 'PRINT'; }
    if (alt && !ctrl && k === 'ArrowRight') {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      run(acts.nextExercise, acts.onNextExercise);
      return 'NEXT_EXERCISE';
    }
    if (alt && !ctrl && k === 'ArrowLeft') {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      run(acts.prevExercise, acts.onPrevExercise);
      return 'PREV_EXERCISE';
    }
    if ((!alt && !ctrl && k === '/') || (ctrl && !alt && (k === 'k' || k === 'K'))) {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      run(acts.focusSearch, acts.onFocusSearch);
      return 'FOCUS_SEARCH';
    }
    return null;
  }

  function initStudyTimerBar(doc, storage) {
    const d = doc || (typeof document !== 'undefined' ? document : null);
    if (!d) return null;
    const store = storage || (typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    let state = createTimerState(3, 'Estudio Conceptual');
    if (store) { try { const s = store.getItem('ag_study_timer'); if (s) state = JSON.parse(s); } catch (_) {} }

    const bar = d.getElementById('study-timer-bar'), topicEl = d.getElementById('study-timer-topic');
    const displayEl = d.getElementById('study-timer-display'), toggleBtn = d.getElementById('study-timer-toggle-btn');
    const resetBtn = d.getElementById('study-timer-reset-btn'), closeBtn = d.getElementById('study-timer-close-btn');
    let timerId = null;

    function persist() { if (store) { try { store.setItem('ag_study_timer', JSON.stringify(state)); } catch (_) {} } }
    function updateUI() {
      if (topicEl) topicEl.textContent = state.label;
      if (displayEl) { displayEl.textContent = formatTime(state.secondsLeft); displayEl.setAttribute('aria-valuenow', String(state.secondsLeft)); }
      if (toggleBtn) { toggleBtn.textContent = state.isRunning ? 'Pausar' : 'Reanudar'; toggleBtn.disabled = state.isCompleted; }
      persist();
    }
    function stop() { if (timerId) { clearInterval(timerId); timerId = null; } state.isRunning = false; updateUI(); }
    function start(mins, label) {
      if (mins != null) state = createTimerState(mins, label || state.label);
      if (bar) bar.classList.remove('hidden');
      if (timerId) clearInterval(timerId);
      state.isRunning = true;
      updateUI();
      timerId = setInterval(function () {
        state = tickTimer(state);
        updateUI();
        if (state.isCompleted) {
          stop();
          const p = typeof globalThis !== 'undefined' && globalThis.AGPortal;
          if (p && typeof p.showToast === 'function') p.showToast('¡Tiempo cumplido! Tarea: ' + state.label);
        }
      }, 1000);
    }

    if (toggleBtn) toggleBtn.addEventListener('click', function () { if (state.isRunning) stop(); else start(); });
    if (resetBtn) resetBtn.addEventListener('click', function () { stop(); state = resetTimer(state); updateUI(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { stop(); if (bar) bar.classList.add('hidden'); });

    const win = d.defaultView || (typeof window !== 'undefined' ? window : null);
    if (win && win.addEventListener) {
      win.addEventListener('keydown', function (e) {
        handleKeyboardShortcut(e, {
          toggleTheme: function () { const b = d.getElementById('theme-toggle-btn'); if (b) b.click(); },
          print: function () { if (typeof win.print === 'function') win.print(); },
          nextExercise: function () { const b = d.getElementById('next-exercise-btn') || d.getElementById('next-ag-btn'); if (b) b.click(); },
          prevExercise: function () { const b = d.getElementById('prev-exercise-btn') || d.getElementById('prev-ag-btn'); if (b) b.click(); },
          focusSearch: function () { const s = d.getElementById('search-input') || d.querySelector('input[type="search"]'); if (s) s.focus(); }
        }, d.activeElement);
      });
    }

    updateUI();
    activeController = { getState: () => state, start, pause: stop, reset: () => { stop(); state = resetTimer(state); updateUI(); }, destroy: stop };
    return activeController;
  }

  function startStudyTimer(mins, label) { return activeController ? activeController.start(mins, label) : null; }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initStudyTimerBar(document));
    else initStudyTimerBar(document);
  }

  return { createTimerState, tickTimer, formatTime, resetTimer, handleKeyboardShortcut, initStudyTimerBar, startStudyTimer };
});
