/* Design C: bounded look-ahead downloads, shared media cache and viewport playback. */
(() => {
  'use strict';
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const master = document.querySelector('#motion-master');
  const constrained = () => Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType || '');
  let paused = motionPreference.matches || Boolean(connection?.saveData);
  let started = false;
  let suspended = false;
  let activeDownloads = 0;
  let settleUntil = 0;
  let queueTimer = null;
  let direction = 1;
  let lastY = scrollY;
  let scrollFrame = 0;
  let explored = scrollY > 100 || Boolean(location.hash);
  const cache = new Map();
  const MAX_CACHE_BYTES = (matchMedia('(max-width: 760px)').matches ? 8 : 20) * 1024 * 1024;
  const items = [...document.querySelectorAll('.motion')].map((el, index) => {
    const video = el.querySelector('video');
    return {el, video, index, button: el.querySelector('.play-control'), status: el.querySelector('.media-error'),
      visible: false, near: false, warm: index < 2, userPaused: false, manual: false,
      failed: false, savedTime: 0, seekTarget: null, request: 0, playPending: false, resource: null};
  });
  const byElement = new Map(items.map(item => [item.el, item]));
  document.body.classList.add('has-clip-tools');

  function sourceFor(item) {
    // Select once per resource attachment; never switch quality mid-playback.
    const small = matchMedia('(max-width: 760px)').matches || constrained();
    return (small && item.video.dataset.srcMobile) || item.video.dataset.src;
  }
  function resourceFor(item) {
    if (item.resource) return item.resource;
    const src = sourceFor(item);
    if (!cache.has(src)) cache.set(src, {src, state: 'idle', blobUrl: null, bytes: 0,
      used: performance.now(), controller: null, priority: Infinity, retries: 0});
    return item.resource = cache.get(src);
  }
  function wantsPlayback(item) {
    return item.visible && !document.hidden && !item.userPaused && (!paused || item.manual) && !item.failed;
  }
  function needsResource(item) {
    if (item.failed || document.hidden || suspended) return false;
    if (item.manual) return true;
    if (paused) return false;
    if (constrained()) return item.visible;
    return item.visible || (item.near && explored) || item.warm;
  }
  function priority(item) {
    if (item.manual) return -200000 + item.index;
    if (item.visible) return -100000 + item.index;
    const top = item.el.getBoundingClientRect().top;
    const ahead = direction > 0 ? top >= 0 : top < 0;
    return Math.abs(top) + (ahead ? 0 : innerHeight * 2);
  }
  function showState(item) {
    item.button.hidden = false;
    if (item.failed) {
      item.button.textContent = '↻ Retry';
      item.button.setAttribute('aria-label', `Retry ${item.el.dataset.label}`);
      item.status.textContent = 'Preview unavailable. Still image shown.';
      item.status.hidden = false;
      return;
    }
    const playing = !item.video.paused;
    item.button.textContent = playing ? 'Ⅱ Pause' : 'Play ↗';
    item.button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${item.el.dataset.label}`);
    item.status.hidden = true;
  }
  function pauseItem(item) {
    ++item.request;
    item.video.pause();
    clearTimeout(item.loadingTimer);
    item.loadingTimer = null;
    item.el.classList.remove('is-loading');
  }
  function markWaiting(item) {
    if (item.loadingTimer || item.el.classList.contains('is-ready')) return;
    item.loadingTimer = setTimeout(() => {
      item.loadingTimer = null;
      if (wantsPlayback(item) && !item.el.classList.contains('is-ready')) item.el.classList.add('is-loading');
    }, 650);
  }
  function attach(item, resource) {
    if (item.video.getAttribute('src') === resource.blobUrl) return;
    resource.used = performance.now();
    item.video.preload = 'auto';
    item.video.src = resource.blobUrl;
    item.video.load();
  }
  function sync(item) {
    if (!wantsPlayback(item)) { pauseItem(item); return; }
    const resource = resourceFor(item);
    if (resource.state !== 'ready') { markWaiting(item); return; }
    attach(item, resource);
    if (!item.video.paused || item.playPending) return;
    const request = ++item.request;
    item.playPending = true;
    item.video.play().then(() => {
      if (request !== item.request && !wantsPlayback(item)) item.video.pause();
    }).catch(() => {
      // Autoplay restrictions are recoverable through the explicit play control.
    }).finally(() => { item.playPending = false; showState(item); });
  }
  function detach(item) {
    if (!item.video.hasAttribute('src')) return;
    pauseItem(item);
    item.savedTime = item.video.currentTime;
    item.video.removeAttribute('src');
    item.video.preload = 'none';
    item.video.load();
    item.el.classList.remove('is-ready');
  }
  function trimCache() {
    let bytes = [...cache.values()].reduce((total, resource) => total + resource.bytes, 0);
    if (bytes <= MAX_CACHE_BYTES) return;
    const candidates = [...cache.values()].filter(resource => resource.state === 'ready' &&
      !items.some(item => item.resource === resource && (item.near || item.visible || item.manual)))
      .sort((a, b) => a.used - b.used);
    for (const resource of candidates) {
      if (bytes <= MAX_CACHE_BYTES) break;
      for (const item of items) if (item.resource === resource) detach(item);
      URL.revokeObjectURL(resource.blobUrl);
      bytes -= resource.bytes;
      resource.blobUrl = null;
      resource.bytes = 0;
      resource.state = 'idle';
    }
  }
  async function download(resource) {
    resource.state = 'loading';
    const controller = new AbortController();
    resource.controller = controller;
    ++activeDownloads;
    const timeout = setTimeout(() => controller.abort('timeout'), 45000);
    try {
      const response = await fetch(resource.src, {signal: controller.signal, cache: 'default'});
      if (!response.ok) throw new Error(`Media HTTP ${response.status}`);
      const blob = await response.blob();
      if (controller.signal.aborted) return;
      resource.blobUrl = URL.createObjectURL(blob);
      resource.bytes = blob.size;
      resource.used = performance.now();
      resource.state = 'ready';
      for (const item of items) {
        if (item.resource !== resource) continue;
        item.failed = false;
        // Download ahead; only attach nearby media to avoid retaining distant decoders.
        if (item.near || item.visible || item.manual) attach(item, resource);
        sync(item);
      }
      trimCache();
    } catch (error) {
      resource.state = 'idle';
      if (controller.signal.aborted && controller.signal.reason !== 'timeout') return;
      resource.state = 'failed';
      for (const item of items) if (item.resource === resource) {
        item.failed = true;
        pauseItem(item);
        showState(item);
      }
    } finally {
      clearTimeout(timeout);
      resource.controller = null;
      if (resource.state === 'loading') resource.state = 'idle';
      --activeDownloads;
      // Allow the browser to close aborted transports before opening replacements.
      if (controller.signal.aborted) settleUntil = performance.now() + 120;
      pump();
    }
  }
  function pump() {
    if (!started) return;
    for (const resource of cache.values()) resource.priority = Infinity;
    for (const item of items) {
      if (!needsResource(item)) continue;
      const resource = resourceFor(item);
      resource.priority = Math.min(resource.priority, priority(item));
      if (resource.state === 'ready') {
        resource.used = performance.now();
        if (item.near || item.visible || item.manual) attach(item, resource);
      }
    }
    // Cancel speculative work after a jump to another section or a hidden tab.
    for (const resource of cache.values()) {
      if (resource.state === 'loading' && !Number.isFinite(resource.priority)) resource.controller?.abort('out-of-range');
    }
    const limit = constrained() ? 1 : 2;
    const candidates = [...cache.values()].filter(resource => resource.state === 'idle' && Number.isFinite(resource.priority))
      .sort((a, b) => a.priority - b.priority);
    // A visible target can pre-empt a still-loading offscreen look-ahead request.
    if (activeDownloads >= limit && candidates[0]?.priority < 0) {
      const speculative = [...cache.values()].filter(resource => resource.state === 'loading' && resource.priority >= 0)
        .sort((a, b) => b.priority - a.priority)[0];
      speculative?.controller?.abort('visible-priority');
    }
    if (performance.now() < settleUntil) {
      if (!queueTimer) queueTimer = setTimeout(() => {queueTimer = null; pump();}, settleUntil - performance.now());
    } else {
      for (const resource of candidates) {
        if (activeDownloads >= limit) break;
        void download(resource);
      }
    }
    for (const item of items) sync(item);
  }
  function updateMaster() {
    master.textContent = paused ? 'Play motion ↗' : 'Ⅱ Pause motion';
    master.setAttribute('aria-pressed', String(paused));
    master.setAttribute('aria-label', paused ? 'Play visible animations' : 'Pause all animations');
  }
  function requestPlay(item, restart = false) {
    const resource = resourceFor(item);
    if (resource.state === 'failed') resource.state = 'idle';
    item.failed = false;
    item.manual = true;
    item.userPaused = false;
    if (restart) {item.savedTime = 0; item.seekTarget = 0; if (item.video.readyState) item.video.currentTime = 0;}
    showState(item);
    started = true;
    pump();
  }
  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const item = byElement.get(entry.target);
      item.visible = entry.isIntersecting && entry.intersectionRatio >= .2;
      if (!item.visible) item.manual = false;
      sync(item);
    }
    pump();
  }, {threshold: [0, .2, .5]});
  const lookAhead = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const item = byElement.get(entry.target);
      item.near = entry.isIntersecting;
      if (!item.near && !item.visible) detach(item);
    }
    pump();
  }, {rootMargin: `${Math.round(innerHeight * 1.5)}px 0px ${Math.round(innerHeight * 2)}px 0px`});

  const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  for (const item of items) {
    item.video.muted = true;
    item.video.defaultMuted = true;
    // The static HTML contains poster images but no active video URLs.
    item.video.preload = 'none';
    const loading = document.createElement('span');
    loading.className = 'preview-loading';
    loading.textContent = 'Preparing preview…';
    loading.setAttribute('aria-hidden', 'true');
    item.el.append(loading);
    const strip = document.createElement('div');
    strip.className = 'clip-tools';
    const replay = document.createElement('button');
    replay.type = 'button';
    replay.textContent = '↺ Replay';
    replay.setAttribute('aria-label', `Replay ${item.el.dataset.label}`);
    const scrubber = document.createElement('input');
    scrubber.type = 'range';
    scrubber.min = '0'; scrubber.max = '0'; scrubber.step = '.04'; scrubber.value = '0'; scrubber.disabled = true;
    scrubber.setAttribute('aria-label', `Scrub ${item.el.dataset.label}`);
    const time = document.createElement('output');
    time.textContent = '0:00 / —';
    function updateTime() {
      const duration = Number.isFinite(item.video.duration) ? item.video.duration : 0;
      scrubber.max = String(duration);
      scrubber.disabled = !duration || item.failed;
      scrubber.value = String(item.video.currentTime);
      time.textContent = `${formatTime(item.video.currentTime)} / ${duration ? formatTime(duration) : '—'}`;
      scrubber.setAttribute('aria-valuetext', `${formatTime(item.video.currentTime)} of ${formatTime(duration)}`);
    }
    strip.append(replay, scrubber, time);
    item.el.after(strip);
    item.video.addEventListener('loadedmetadata', () => {
      const target = item.seekTarget ?? item.savedTime;
      if (target > 0 && target < item.video.duration) item.video.currentTime = target;
      item.seekTarget = null;
      updateTime();
    });
    item.video.addEventListener('loadeddata', () => {
      item.el.classList.add('is-ready');
      item.el.classList.remove('is-loading');
      clearTimeout(item.loadingTimer);
      item.loadingTimer = null;
      updateTime();
      sync(item);
    });
    item.video.addEventListener('timeupdate', updateTime);
    item.video.addEventListener('play', () => showState(item));
    item.video.addEventListener('pause', () => showState(item));
    item.video.addEventListener('error', () => {
      if (!item.video.hasAttribute('src')) return;
      item.failed = true;
      pauseItem(item);
      item.el.classList.remove('is-ready');
      scrubber.disabled = true;
      showState(item);
    });
    item.button.addEventListener('click', () => {
      if (item.video.paused || item.failed) requestPlay(item);
      else {item.userPaused = true; item.manual = false; pauseItem(item); showState(item);}
    });
    replay.addEventListener('click', () => requestPlay(item, true));
    scrubber.addEventListener('input', () => {
      const target = Number(scrubber.value);
      item.userPaused = true;
      item.manual = false;
      pauseItem(item);
      item.video.currentTime = target;
      item.savedTime = target;
      updateTime();
    });
    showState(item);
    visibility.observe(item.el);
    lookAhead.observe(item.el);
  }
  master.hidden = false;
  updateMaster();
  master.addEventListener('click', () => {
    paused = !paused;
    for (const item of items) item.manual = false;
    updateMaster();
    pump();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) for (const item of items) pauseItem(item);
    pump();
  });
  motionPreference.addEventListener('change', event => {
    paused = event.matches || Boolean(connection?.saveData);
    for (const item of items) item.manual = false;
    updateMaster();
    pump();
  });
  connection?.addEventListener('change', () => {
    if (connection.saveData) {paused = true; updateMaster();}
    pump();
  });
  addEventListener('online', () => {
    for (const item of items) if (item.failed) {
      item.failed = false;
      if (item.resource?.state === 'failed') item.resource.state = 'idle';
      showState(item);
    }
    pump();
  });
  // Give HTML, styles and nearby posters the network first. Then warm the first
  // pair and the approaching sections, never the entire long page at once.
  function begin() {
    const start = () => { started = true; pump(); };
    if ('requestIdleCallback' in window) requestIdleCallback(start, {timeout: 1200});
    else setTimeout(start, 200);
  }
  if (document.readyState === 'complete') begin();
  else addEventListener('load', begin, {once: true});
  const links = [...document.querySelectorAll('.site-header nav a')];
  function updateScroll() {
    scrollFrame = 0;
    direction = scrollY >= lastY ? 1 : -1;
    lastY = scrollY;
    if (scrollY > 100) explored = true;
    if (scrollY > 300) for (const item of items) item.warm = false;
    let active;
    for (const link of links) if (document.querySelector(link.hash).getBoundingClientRect().top < 200) active = link;
    links.forEach(link => link === active ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
    pump();
  }
  addEventListener('scroll', () => {if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);}, {passive: true});
  addEventListener('pagehide', event => {
    suspended = true;
    for (const resource of cache.values()) {
      resource.controller?.abort('page-hidden');
      if (!event.persisted && resource.blobUrl) URL.revokeObjectURL(resource.blobUrl);
    }
  });
  addEventListener('pageshow', () => {suspended = false; if (started) pump();});
})();
