(function () {
  'use strict';

  function initialize(discovery) {
    if (discovery.dataset.researchInitialized === 'true') return;

    var tabs = Array.prototype.slice.call(discovery.querySelectorAll('[data-research-tab]'));
    var panels = Array.prototype.slice.call(discovery.querySelectorAll('[data-research-panel]'));
    var loop = discovery.querySelector('[data-research-loop]');
    var orbit = discovery.querySelector('[data-loop-orbit]');
    if (tabs.length !== 2 || panels.length !== 2 || !loop || !orbit) return;

    discovery.dataset.researchInitialized = 'true';
    var names = tabs.map(function (tab) { return tab.dataset.researchTab; });
    var initial = names.indexOf(discovery.dataset.active) !== -1 ? discovery.dataset.active : names[0];
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var marker = loop.querySelector('[data-loop-marker]');
    var halo = loop.querySelector('[data-loop-halo]');
    var trails = Array.prototype.slice.call(loop.querySelectorAll('[data-loop-trail]'));
    var orbitLength = orbit.getTotalLength();
    var cycleDuration = 24000;
    var halfDuration = cycleDuration / 2;
    var progress = names.indexOf(initial) * halfDuration;
    var active = null;
    var frame = null;
    var previousTime = null;
    var leavingTimer = null;
    var transitionVersion = 0;
    var hoveredTabs = new Set();
    var keyboardInput = true;
    var focused = discovery.contains(document.activeElement);
    var visible = false;
    var imagesRequested = false;

    function position(element, distance) {
      if (!element) return;
      var point = orbit.getPointAtLength((distance % orbitLength + orbitLength) % orbitLength);
      element.setAttribute('cx', point.x.toFixed(2));
      element.setAttribute('cy', point.y.toFixed(2));
    }

    function drawLoop() {
      var distance = progress / cycleDuration * orbitLength;
      position(marker, distance);
      position(halo, distance);
      trails.forEach(function (trail, index) {
        position(trail, distance - (trails.length - index) * orbitLength * 0.018);
      });
      var segment = progress < halfDuration ? 'outbound' : 'inbound';
      if (discovery.dataset.loopSegment !== segment) discovery.dataset.loopSegment = segment;
    }

    function select(name) {
      if (name === active || names.indexOf(name) === -1) return;
      var previous = active;
      active = name;
      discovery.dataset.active = name;
      discovery.dataset.direction = name === names[1] ? 'forward' : 'backward';
      window.clearTimeout(leavingTimer);
      leavingTimer = null;
      var version = ++transitionVersion;
      var leavingPanel = null;

      tabs.forEach(function (tab) {
        var selected = tab.dataset.researchTab === name;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        tab.classList.toggle('is-active', selected);
      });

      panels.forEach(function (panel) {
        var selected = panel.dataset.researchPanel === name;
        var leaving = panel.dataset.researchPanel === previous && !reducedMotion.matches;
        panel.setAttribute('aria-hidden', String(!selected));
        if (selected) panel.removeAttribute('inert');
        else panel.setAttribute('inert', '');
        panel.classList.toggle('is-active', selected);
        panel.classList.toggle('is-leaving', leaving);
        if (leaving) leavingPanel = panel;
      });

      if (leavingPanel) {
        leavingTimer = window.setTimeout(function () {
          if (version === transitionVersion) leavingPanel.classList.remove('is-leaving');
          leavingTimer = null;
        }, 760);
      }
    }

    function canRun() {
      return visible && !document.hidden && hoveredTabs.size === 0 && !focused && !reducedMotion.matches;
    }

    function playbackChanged() {
      var running = canRun();
      discovery.classList.toggle('is-cycling', running);
      loop.classList.toggle('is-running', running);
      if (running && frame === null) {
        previousTime = null;
        frame = window.requestAnimationFrame(animate);
      } else if (!running) {
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        previousTime = null;
      }
    }

    function animate(timestamp) {
      frame = null;
      if (!canRun()) {
        playbackChanged();
        return;
      }
      if (previousTime !== null) {
        progress = (progress + Math.max(0, timestamp - previousTime)) % cycleDuration;
      }
      previousTime = timestamp;
      // Reaching each node switches its panel; no separate carousel timer is used.
      select(names[progress < halfDuration ? 0 : 1]);
      drawLoop();
      frame = window.requestAnimationFrame(animate);
    }

    function jumpTo(name) {
      var index = names.indexOf(name);
      if (index === -1) return;
      progress = index * halfDuration;
      previousTime = null;
      select(name);
      drawLoop();
      playbackChanged();
    }

    tabs.forEach(function (tab, index) {
      if (tab.matches(':hover')) hoveredTabs.add(tab);
      tab.addEventListener('pointerenter', function (event) {
        if (event.pointerType === 'touch') return;
        hoveredTabs.add(tab);
        jumpTo(tab.dataset.researchTab);
      });
      tab.addEventListener('pointerleave', function (event) {
        if (event.pointerType === 'touch') return;
        hoveredTabs.delete(tab);
        playbackChanged();
      });
      tab.addEventListener('click', function () { jumpTo(tab.dataset.researchTab); });
      tab.addEventListener('keydown', function (event) {
        var destination;
        if (event.key === 'ArrowRight') destination = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') destination = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') destination = 0;
        else if (event.key === 'End') destination = tabs.length - 1;
        else return;
        event.preventDefault();
        jumpTo(names[destination]);
        tabs[destination].focus();
      });
    });

    discovery.addEventListener('focusin', function () {
      focused = keyboardInput;
      playbackChanged();
    });
    discovery.addEventListener('focusout', function (event) {
      focused = keyboardInput && discovery.contains(event.relatedTarget);
      playbackChanged();
    });
    function inputChanged(useKeyboard) {
      keyboardInput = useKeyboard;
      var nextFocused = keyboardInput && discovery.contains(document.activeElement);
      if (nextFocused !== focused) {
        focused = nextFocused;
        playbackChanged();
      }
    }
    document.addEventListener('keydown', function () { inputChanged(true); }, true);
    document.addEventListener('pointerdown', function () { inputChanged(false); }, true);
    document.addEventListener('visibilitychange', playbackChanged);

    function motionChanged() {
      discovery.classList.toggle('is-reduced-motion', reducedMotion.matches);
      if (reducedMotion.matches) {
        window.clearTimeout(leavingTimer);
        leavingTimer = null;
        transitionVersion += 1;
        panels.forEach(function (panel) { panel.classList.remove('is-leaving'); });
        progress = names.indexOf(active) * halfDuration;
        drawLoop();
      }
      playbackChanged();
    }
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', motionChanged);
    else reducedMotion.addListener(motionChanged);

    function requestImages() {
      if (imagesRequested) return;
      imagesRequested = true;
      discovery.querySelectorAll('img[loading="lazy"]').forEach(function (image) {
        image.loading = 'eager';
      });
    }

    discovery.classList.add('is-enhanced');
    panels.forEach(function (panel) { panel.hidden = false; });
    if (hoveredTabs.size) initial = hoveredTabs.values().next().value.dataset.researchTab;
    jumpTo(initial);
    motionChanged();

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) requestImages();
        playbackChanged();
      }, { threshold: 0 });
      observer.observe(discovery);
    } else {
      visible = true;
      requestImages();
      playbackChanged();
    }
  }

  function start() {
    document.querySelectorAll('[data-research-discovery]').forEach(initialize);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}());
