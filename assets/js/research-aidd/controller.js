/* Draw the scientific illustrations at the display's native pixel density. */
(function () {
  'use strict';

  function start() {
    var scenes = window.ResearchScenes;
    if (!scenes) return;
    var canvases = Array.prototype.slice.call(document.querySelectorAll('canvas[data-research-scene]'));
    var states = canvases.filter(function (canvas) {
      if (canvas.dataset.researchCanvasReady === 'true' || !scenes[canvas.dataset.researchScene]) return false;
      canvas.dataset.researchCanvasReady = 'true';
      return true;
    }).map(function (canvas) {
      return {canvas: canvas, context: canvas.getContext('2d'), scene: canvas.dataset.researchScene,
        panel: canvas.closest('[data-research-panel]'), visible: false, width: 0, height: 0, dpr: 1};
    }).filter(function (state) { return state.context; });
    if (!states.length) return;

    var palette = {ink: '#143047', muted: '#405b6d', blue: '#286fa9', teal: '#168178',
      violet: '#6b50a5', red: '#cf585f', line: '#c7d6df', paper: '#ffffff', typeScale: 1.08};
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var frame = null;
    var previous = null;
    var lastDraw = null;
    var seconds = 0;
    var dprQuery;
    var reducedFrame = 8.2;

    function isActive(state) {
      return !state.panel || (!state.panel.hidden && state.panel.getAttribute('aria-hidden') !== 'true');
    }

    function measure(state) {
      var rect = state.canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      state.width = rect.width;
      state.height = rect.height;
      state.dpr = Math.min(window.devicePixelRatio || 1, 3);
      var width = Math.round(rect.width * state.dpr);
      var height = Math.round(rect.height * state.dpr);
      if (state.canvas.width !== width || state.canvas.height !== height) {
        state.canvas.width = width;
        state.canvas.height = height;
      }
    }

    function draw(state) {
      if (!state.width || !state.height) return;
      var c = state.context;
      // Use the rounded bitmap's exact scale to avoid subpixel raster resampling.
      c.setTransform(state.canvas.width / state.width, 0, 0, state.canvas.height / state.height, 0, 0);
      c.clearRect(0, 0, state.width, state.height);
      c.fillStyle = palette.paper;
      c.fillRect(0, 0, state.width, state.height);
      scenes[state.scene](c, reduced.matches ? reducedFrame : seconds, state.width, state.height, palette);
    }

    function canRun() {
      return !document.hidden && !reduced.matches && states.some(function (state) {
        return state.visible && isActive(state);
      });
    }

    function refresh() {
      states.forEach(function (state) { measure(state); draw(state); });
      schedule();
    }

    function schedule() {
      if (canRun()) {
        if (frame === null) {
          previous = null;
          lastDraw = null;
          frame = requestAnimationFrame(animate);
        }
      } else {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previous = null;
      }
    }

    function animate(now) {
      frame = null;
      if (!canRun()) { schedule(); return; }
      if (previous !== null) seconds = (seconds + Math.min(0.1, Math.max(0, now - previous) / 1000)) % 12;
      previous = now;
      if (lastDraw === null || now - lastDraw >= 1000 / 30) {
        states.forEach(function (state) { if (state.visible && isActive(state)) draw(state); });
        lastDraw = now;
      }
      frame = requestAnimationFrame(animate);
    }

    var resize = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        var state = states.find(function (candidate) { return candidate.canvas === entry.target; });
        if (state) { measure(state); draw(state); }
      });
      schedule();
    });
    states.forEach(function (state) { resize.observe(state.canvas); measure(state); draw(state); });

    if ('IntersectionObserver' in window) {
      var intersection = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var state = states.find(function (candidate) { return candidate.canvas === entry.target; });
          if (state) {
            state.visible = entry.isIntersecting;
            if (state.visible) { measure(state); draw(state); }
          }
        });
        schedule();
      });
      states.forEach(function (state) { intersection.observe(state.canvas); });
    } else {
      states.forEach(function (state) { state.visible = true; });
    }

    var panelObserver = new MutationObserver(function () {
      states.forEach(function (state) { if (state.visible && isActive(state)) draw(state); });
      schedule();
    });
    Array.from(new Set(states.map(function (state) { return state.panel; }).filter(Boolean))).forEach(function (panel) {
      panelObserver.observe(panel, {attributes: true, attributeFilter: ['aria-hidden', 'hidden']});
    });

    function watchDpr() {
      if (dprQuery) {
        if (dprQuery.removeEventListener) dprQuery.removeEventListener('change', densityChanged);
        else dprQuery.removeListener(densityChanged);
      }
      dprQuery = window.matchMedia('(resolution: ' + (window.devicePixelRatio || 1) + 'dppx)');
      if (dprQuery.addEventListener) dprQuery.addEventListener('change', densityChanged);
      else dprQuery.addListener(densityChanged);
    }
    function densityChanged() { watchDpr(); refresh(); }
    if (reduced.addEventListener) reduced.addEventListener('change', refresh);
    else reduced.addListener(refresh);
    window.addEventListener('resize', refresh);
    document.addEventListener('visibilitychange', schedule);
    watchDpr();
    schedule();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
