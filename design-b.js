/* Design B: always-visible process and automatic media playback. */
(() => {
  'use strict';
  const master = document.getElementById('motion-master');
  const videos = [...document.querySelectorAll('video')];
  const autoPausing = new WeakSet();
  const playPending = new WeakSet();
  let globalPaused = false;

  const media = [...document.querySelectorAll('.motion-media')].map(container => ({
    container, video: container.querySelector('video'), button: container.querySelector('.media-toggle'),
    failed: false
  }));

  function updateButton(item) {
    const paused = item.video.paused;
    item.button.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
    item.button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} ${item.container.dataset.label.toLowerCase()}`);
  }

  function prepareVideo(video) {
    if (!video.src && video.dataset.src) video.src = video.dataset.src;
    video.autoplay = true;
    video.defaultMuted = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
  }

  function pauseVideo(video) {
    if (video.paused) return;
    autoPausing.add(video);
    video.pause();
    queueMicrotask(() => autoPausing.delete(video));
  }

  function syncVideo(video) {
    if (globalPaused || document.hidden || video.dataset.userPaused === 'true') {
      pauseVideo(video);
      return;
    }
    prepareVideo(video);
    if (!video.paused || playPending.has(video)) return;
    playPending.add(video);
    const attempt = video.play();
    if (attempt) attempt.catch(() => {
      // A first interaction below retries playback for unusually strict browsers.
    }).finally(() => playPending.delete(video));
    else playPending.delete(video);
  }

  function syncAll() { videos.forEach(syncVideo); }

  function updateMaster() {
    master.setAttribute('aria-pressed', String(globalPaused));
    master.querySelector('.control-label').textContent = globalPaused ? 'Play motion' : 'Pause motion';
    master.querySelector('.control-symbol').textContent = globalPaused ? '▶' : 'Ⅱ';
    master.setAttribute('aria-label', globalPaused ? 'Play preview motion' : 'Pause all motion');
  }

  for (const item of media) {
    item.button.hidden = false;
    item.video.addEventListener('loadeddata', () => item.container.classList.add('is-ready'));
    item.video.addEventListener('play', () => updateButton(item));
    item.video.addEventListener('pause', () => updateButton(item));
    item.video.addEventListener('error', () => {
      item.failed = true;
      item.container.classList.remove('is-ready');
      item.button.hidden = true;
      item.container.querySelector('.media-status').hidden = false;
    });
    item.button.addEventListener('click', () => {
      if (item.video.paused) {
        item.video.dataset.userPaused = 'false';
        syncVideo(item.video);
      } else {
        item.video.dataset.userPaused = 'true';
        pauseVideo(item.video);
      }
    });
    updateButton(item);
  }

  for (const video of videos) {
    prepareVideo(video);
    video.addEventListener('loadeddata', () => syncVideo(video));
    video.addEventListener('canplay', () => syncVideo(video));
    video.addEventListener('play', () => { video.dataset.userPaused = 'false'; });
    video.addEventListener('pause', () => {
      if (!autoPausing.has(video) && !globalPaused && !document.hidden) video.dataset.userPaused = 'true';
    });
    if (video.closest('.inline-film')) {
      video.addEventListener('error', () => {
        video.closest('.inline-film').querySelector('.film-error').hidden = false;
      });
    }
    if (video.dataset.start) video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(Number(video.dataset.start), video.duration || 0);
    }, {once: true});
  }

  master.hidden = false;
  updateMaster();
  master.addEventListener('click', () => {
    globalPaused = !globalPaused;
    updateMaster();
    syncAll();
  });
  document.addEventListener('visibilitychange', syncAll);
  addEventListener('pageshow', syncAll);
  for (const eventName of ['pointerdown', 'touchstart', 'keydown']) {
    addEventListener(eventName, syncAll, {once: true, passive: true});
  }
  syncAll();

  // Each section anchor remains a normal link; only its current marker is enhanced.
  const navLinks = [...document.querySelectorAll('.section-nav a')];
  const progress = document.querySelector('.reading-progress span');
  let frameRequested = false;
  function updateScrollState() {
    frameRequested = false;
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 1})`;
    let active = navLinks[0];
    for (const link of navLinks) if (document.querySelector(link.hash).getBoundingClientRect().top < 220) active = link;
    for (const link of navLinks) {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  function requestScrollState() {if (!frameRequested) {frameRequested = true; requestAnimationFrame(updateScrollState);}}
  addEventListener('scroll', requestScrollState, {passive: true});
  addEventListener('resize', requestScrollState);
  updateScrollState();
})();
