/* Motor puro de gestión de estado, progreso y persistencia local para el portal Antigravity */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const MAX_AG_ID = 26;
  const MAX_CANVAS_ID = 20;

  const STORAGE_KEYS = {
    agCompleted: 'gemini_antigravity_completed',
    canvasCompleted: 'gemini_pro_academy_completed',
    witnessVerified: 'gemini_antigravity_witness_verified',
    agChecklist: 'gemini_antigravity_artifact_checklist',
    theme: 'gemini_antigravity_theme'
  };

  function sanitizeIdArray(rawList, maxId) {
    if (!Array.isArray(rawList)) return [];
    const limit = typeof maxId === 'number' && maxId > 0 ? maxId : MAX_AG_ID;
    const unique = new Set();
    for (const item of rawList) {
      const n = Number(item);
      if (Number.isInteger(n) && n >= 1 && n <= limit) {
        unique.add(n);
      }
    }
    return Array.from(unique).sort((a, b) => a - b);
  }

  function createDefaultState() {
    return {
      agCompletedIds: [], canvasCompletedIds: [], witnessVerifiedIds: [], agChecklist: {},
      theme: 'claro', agSelectedId: 1, agLevelFilter: 'all', agStatusFilter: 'all',
      agSearchQuery: '', canvasSelectedId: 1, canvasLevelFilter: 'all',
      canvasStatusFilter: 'all', canvasSearchQuery: ''
    };
  }

  function loadState(storage) {
    const state = createDefaultState();
    const store = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
    if (!store) return state;
    try {
      const rawAg = store.getItem(STORAGE_KEYS.agCompleted);
      if (rawAg) state.agCompletedIds = sanitizeIdArray(JSON.parse(rawAg), MAX_AG_ID);
    } catch (_) { state.agCompletedIds = []; }
    try {
      const rawCanvas = store.getItem(STORAGE_KEYS.canvasCompleted);
      if (rawCanvas) state.canvasCompletedIds = sanitizeIdArray(JSON.parse(rawCanvas), MAX_CANVAS_ID);
    } catch (_) { state.canvasCompletedIds = []; }
    try {
      const rawWitness = store.getItem(STORAGE_KEYS.witnessVerified);
      if (rawWitness) state.witnessVerifiedIds = sanitizeIdArray(JSON.parse(rawWitness), MAX_AG_ID);
    } catch (_) { state.witnessVerifiedIds = []; }
    try {
      const rawCheck = store.getItem(STORAGE_KEYS.agChecklist);
      if (rawCheck) {
        const parsed = JSON.parse(rawCheck);
        if (parsed && typeof parsed === 'object') state.agChecklist = parsed;
      }
    } catch (_) { state.agChecklist = {}; }
    try {
      const savedTheme = store.getItem(STORAGE_KEYS.theme);
      if (savedTheme === 'oscuro' || savedTheme === 'claro') state.theme = savedTheme;
    } catch (_) { state.theme = 'claro'; }
    return state;
  }

  function saveState(state, storage) {
    const store = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
    if (!store || !state) return false;
    try {
      store.setItem(STORAGE_KEYS.agCompleted, JSON.stringify(sanitizeIdArray(state.agCompletedIds, MAX_AG_ID)));
      store.setItem(STORAGE_KEYS.canvasCompleted, JSON.stringify(sanitizeIdArray(state.canvasCompletedIds, MAX_CANVAS_ID)));
      store.setItem(STORAGE_KEYS.witnessVerified, JSON.stringify(sanitizeIdArray(state.witnessVerifiedIds, MAX_AG_ID)));
      store.setItem(STORAGE_KEYS.agChecklist, JSON.stringify(state.agChecklist || {}));
      store.setItem(STORAGE_KEYS.theme, state.theme === 'oscuro' ? 'oscuro' : 'claro');
      return true;
    } catch (_) {
      return false;
    }
  }

  function toggleExercise(state, route, exerciseId, storage) {
    const id = Number(exerciseId);
    const maxLimit = route === 'canvas' ? MAX_CANVAS_ID : MAX_AG_ID;
    if (!Number.isInteger(id) || id < 1 || id > maxLimit) {
      return { changed: false, completed: false, state };
    }
    const key = route === 'canvas' ? 'canvasCompletedIds' : 'agCompletedIds';
    const current = sanitizeIdArray(state[key], maxLimit);
    const exists = current.includes(id);
    const updated = exists ? current.filter((x) => x !== id) : sanitizeIdArray([...current, id], maxLimit);
    state[key] = updated;
    saveState(state, storage);
    return { changed: true, completed: !exists, state };
  }

  function recordTestCaseVerified(state, exerciseId, storage) {
    const id = Number(exerciseId);
    if (!Number.isInteger(id) || id < 1 || id > MAX_AG_ID) {
      return { recorded: false, state };
    }
    state.witnessVerifiedIds = sanitizeIdArray([...(state.witnessVerifiedIds || []), id], MAX_AG_ID);
    saveState(state, storage);
    return { recorded: true, state };
  }

  function toggleChecklistItem(state, exerciseId, itemIndex, storage) {
    const id = Number(exerciseId);
    const idx = Number(itemIndex);
    if (!state || !Number.isInteger(id) || id < 1 || id > MAX_AG_ID || !Number.isInteger(idx) || idx < 0) {
      return [];
    }
    state.agChecklist = state.agChecklist || {};
    const list = Array.isArray(state.agChecklist[id]) ? state.agChecklist[id].slice() : [];
    const pos = list.indexOf(idx);
    if (pos >= 0) list.splice(pos, 1);
    else list.push(idx);
    state.agChecklist[id] = list.sort((a, b) => a - b);
    saveState(state, storage);
    return state.agChecklist[id];
  }

  function setTheme(state, themeName, storage) {
    const normalized = themeName === 'oscuro' ? 'oscuro' : 'claro';
    state.theme = normalized;
    saveState(state, storage);
    return normalized;
  }

  function resetRouteProgress(state, route, storage) {
    if (route === 'canvas') {
      state.canvasCompletedIds = [];
    } else if (route === 'antigravity') {
      state.agCompletedIds = [];
      state.witnessVerifiedIds = [];
      state.agChecklist = {};
    } else {
      state.agCompletedIds = [];
      state.canvasCompletedIds = [];
      state.witnessVerifiedIds = [];
      state.agChecklist = {};
    }
    saveState(state, storage);
    return state;
  }

  function getProgressStats(state, totalAg, totalCanvas) {
    const maxAg = typeof totalAg === 'number' && totalAg > 0 ? totalAg : MAX_AG_ID;
    const maxCanvas = typeof totalCanvas === 'number' && totalCanvas > 0 ? totalCanvas : MAX_CANVAS_ID;
    const agDone = sanitizeIdArray(state && state.agCompletedIds, maxAg).length;
    const canvasDone = sanitizeIdArray(state && state.canvasCompletedIds, maxCanvas).length;
    const witnessDone = sanitizeIdArray(state && state.witnessVerifiedIds, maxAg).length;
    const totalDone = agDone + canvasDone;
    const totalAll = maxAg + maxCanvas;
    return {
      agDone, agTotal: maxAg, agPct: Math.round((agDone / maxAg) * 100),
      canvasDone, canvasTotal: maxCanvas, canvasPct: Math.round((canvasDone / maxCanvas) * 100),
      witnessDone, totalDone, totalAll, totalPct: Math.round((totalDone / totalAll) * 100)
    };
  }

  function filterExercises(exercises, options) {
    if (!Array.isArray(exercises)) return [];
    const opts = options || {};
    const levelFilter = opts.levelFilter || 'all';
    const statusFilter = opts.statusFilter || 'all';
    const searchQuery = String(opts.searchQuery || '').trim().toLowerCase();
    const completedIds = Array.isArray(opts.completedIds) ? opts.completedIds : [];

    return exercises.filter((ex) => {
      if (levelFilter !== 'all' && String(ex.level) !== String(levelFilter)) return false;
      const isDone = completedIds.includes(ex.id);
      if (statusFilter === 'done' && !isDone) return false;
      if (statusFilter === 'pending' && isDone) return false;
      if (searchQuery !== '') {
        const haystack = [
          ex.title, ex.goal, ex.conceptualTaskTitle, ex.studyTopic, ex.nonDevProfile,
          'ejercicio ' + ex.id, String(ex.id)
        ].filter(Boolean).join(' ').toLowerCase();
        return haystack.includes(searchQuery);
      }
      return true;
    });
  }

  function exportProgressJson(state) {
    const stats = getProgressStats(state, MAX_AG_ID, MAX_CANVAS_ID);
    return JSON.stringify({
      schema: 'guia-gemini-antigravity-progress-v2',
      exportedAt: new Date().toISOString(),
      theme: state.theme || 'claro',
      agCompletedIds: sanitizeIdArray(state.agCompletedIds, MAX_AG_ID),
      canvasCompletedIds: sanitizeIdArray(state.canvasCompletedIds, MAX_CANVAS_ID),
      witnessVerifiedIds: sanitizeIdArray(state.witnessVerifiedIds, MAX_AG_ID),
      agChecklist: state.agChecklist || {},
      stats
    }, null, 2);
  }

  function importProgressJson(state, rawJson, storage) {
    if (typeof rawJson !== 'string' || rawJson.trim() === '') {
      return { ok: false, error: 'El contenido JSON está vacío.', message: 'El contenido JSON está vacío.' };
    }
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed || typeof parsed !== 'object') {
        return { ok: false, error: 'Formato JSON inválido.', message: 'Formato JSON inválido.' };
      }
      state.agCompletedIds = sanitizeIdArray(parsed.agCompletedIds, MAX_AG_ID);
      state.canvasCompletedIds = sanitizeIdArray(parsed.canvasCompletedIds, MAX_CANVAS_ID);
      state.witnessVerifiedIds = sanitizeIdArray(parsed.witnessVerifiedIds, MAX_AG_ID);
      if (parsed.agChecklist && typeof parsed.agChecklist === 'object') state.agChecklist = parsed.agChecklist;
      if (parsed.theme === 'oscuro' || parsed.theme === 'claro') state.theme = parsed.theme;
      saveState(state, storage);
      return { ok: true, state, message: 'Progreso restaurado correctamente.' };
    } catch (_) {
      return { ok: false, error: 'No se pudo analizar el archivo JSON.', message: 'No se pudo analizar el archivo JSON.' };
    }
  }

  return {
    STORAGE_KEYS, sanitizeIdArray, createDefaultState, loadState, saveState,
    toggleExercise, recordTestCaseVerified, toggleChecklistItem, setTheme,
    resetRouteProgress, getProgressStats, filterExercises, exportProgressJson, importProgressJson
  };
});
