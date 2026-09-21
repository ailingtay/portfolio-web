/* Design B: always-visible process, viewport-aware previews and inline recordings. */
(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const master = document.getElementById('motion-master');
  const films = [...document.querySelectorAll('.inline-film video')];
  let globalPaused = reducedMotion.matches;

  const media = [...document.querySelectorAll('.motion-media')].map(container => ({
    container, video: container.querySelector('video'), button: container.querySelector('.media-toggle'),
    visible: false, userPaused: false, manuallyPlaying: false, failed: false, playPending: false
  }));

  function updateButton(item) {
    const paused = item.video.paused;
    item.button.querySelector('span').textContent = paused ? '▶' : 'Ⅱ';
    item.button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} ${item.container.dataset.label.toLowerCase()}`);
  }

  function loadVideo(item) {
    if (!item.video.hasAttribute('src')) {
      item.video.src = item.video.dataset.src;
      item.video.load();
    }
  }

  function mayPlay(item) {
    return !item.failed && item.visible && !document.hidden && !item.userPaused && (!globalPaused || item.manuallyPlaying);
  }

  function syncVideo(item) {
    if (!mayPlay(item)) {
      item.video.pause();
      return;
    }
    if (item.playPending || !item.video.paused) return;
    loadVideo(item);
    item.playPending = true;
    const attempt = item.video.play();
    if (attempt) attempt.then(() => {
      if (!mayPlay(item)) item.video.pause();
    }).catch(() => {
      // Autoplay may be unavailable. The individual Play button stays usable.
      updateButton(item);
    }).finally(() => { item.playPending = false; });
    else item.playPending = false;
  }

  function syncAll() { media.forEach(syncVideo); }

  function updateMaster() {
    master.setAttribute('aria-pressed', String(globalPaused));
    master.querySelector('.control-label').textContent = globalPaused ? 'Play motion' : 'Pause motion';
    master.querySelector('.control-symbol').textContent = globalPaused ? '▶' : 'Ⅱ';
    master.setAttribute('aria-label', globalPaused ? 'Play preview motion' : 'Pause all motion');
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const item = media.find(item => item.container === entry.target);
      item.visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      if (!item.visible) item.manuallyPlaying = false;
      syncVideo(item);
    }
  }, {threshold: [0, 0.2, 0.5]});

  for (const item of media) {
    item.video.muted = true;
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
        item.userPaused = false;
        item.manuallyPlaying = true;
      } else {
        item.userPaused = true;
        item.manuallyPlaying = false;
      }
      syncVideo(item);
    });
    updateButton(item);
    observer.observe(item.container);
  }

  master.hidden = false;
  updateMaster();
  master.addEventListener('click', () => {
    globalPaused = !globalPaused;
    media.forEach(item => {item.manuallyPlaying = false;});
    if (globalPaused) films.forEach(video => video.pause());
    updateMaster();
    syncAll();
  });
  reducedMotion.addEventListener('change', event => {
    globalPaused = event.matches;
    media.forEach(item => {item.manuallyPlaying = false;});
    updateMaster();
    syncAll();
  });
  // Recordings stay on the page with native controls. They load near the viewport,
  // but play only when requested and never resume themselves after scrolling away.
  const filmObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
        if (!video.dataset.prepared) {
          video.dataset.prepared = 'true';
          video.preload = 'metadata';
          video.load();
        }
      } else video.pause();
    }
  }, {threshold: [0, 0.1]});
  for (const video of films) {
    video.addEventListener('play', () => {
      films.forEach(other => { if (other !== video) other.pause(); });
    });
    video.addEventListener('error', () => {
      video.closest('.inline-film').querySelector('.film-error').hidden = false;
    });
    if (video.dataset.start) video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(Number(video.dataset.start), video.duration || 0);
    }, {once: true});
    filmObserver.observe(video);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) films.forEach(video => video.pause());
    syncAll();
  });

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
