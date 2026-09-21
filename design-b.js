/* Design B: viewport-aware motion, accessible media viewer and a quiet reading indicator. */
(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const master = document.getElementById('motion-master');
  const dialog = document.getElementById('media-viewer');
  const viewerContent = document.getElementById('viewer-content');
  let globalPaused = reducedMotion.matches;
  let previousFocus = null;
  let viewerVersion = 0;

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
    return !item.failed && item.visible && !document.hidden && !dialog.open && !item.userPaused && (!globalPaused || item.manuallyPlaying);
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
    master.setAttribute('aria-label', globalPaused ? 'Play preview motion' : 'Pause all preview motion');
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
    updateMaster();
    syncAll();
  });
  reducedMotion.addEventListener('change', event => {
    globalPaused = event.matches;
    media.forEach(item => {item.manuallyPlaying = false;});
    updateMaster();
    syncAll();
  });
  document.addEventListener('visibilitychange', syncAll);

  const views = {
    library: {title: 'A quieter kind of magic', src: 'assets/timer-lab-review/05-final.mp4', poster: 'assets/design-b/library-1920.webp', description: 'Generated scene elements, carefully selected movement and compositing in After Effects. A classroom timer with atmosphere and a calm pace.'},
    robot: {title: 'Time to recharge', src: 'assets/timer-lab-review/06-robot-timer.mp4', poster: 'assets/design-b/robot-1280.webp', description: 'A sleeping loop, small character events and a final wake-up. Short pieces of motion form a longer, deliberately paced timer.'},
    weather: {title: 'A brighter forecast', image: 'assets/design-b/weather-1920.webp', description: 'Weather characters and a playful countdown. Illustrated assets made in Photoshop and Illustrator, with AI-assisted animation and finishing in After Effects.'},
    pelican: {title: 'A moment of calm', image: 'assets/design-b/pelican-1920.webp', description: 'A selected timer still: spare lines, a muted palette and a pelican above the water.'},
    plugin: {title: 'Build once. Keep creating.', src: 'assets/timer-lab-review/03-ae-plugin.mp4', poster: 'assets/timer-lab-review/03-ae-plugin.jpg', description: 'The custom After Effects tool creates the timer structure. Repetitive setup is automated while typography, colour, animation and effects remain editable.'},
    prototype: {title: 'A useful first attempt', src: 'assets/timer-lab-review/02-timer-app.mp4', poster: 'assets/timer-lab-review/02-timer-app.jpg', description: 'Using Claude, I built a browser tool that generated and exported a countdown. It worked, but limited the typography, animation and finish. That experiment led me to automate setup inside After Effects instead.', comparison: true},
    nodes: {title: 'Inside the node workflow', src: 'assets/timer-lab-review/05-node.mp4', poster: 'assets/timer-lab-review/05-node.jpg', description: 'Scene elements and motion tests organised before final assembly. The workflow made it possible to review the pieces separately and keep the useful results.'},
    context: {title: 'The timers in context', src: 'assets/portfolio.mp4', poster: 'assets/design-b/context-poster.webp', description: 'The supplied 11-second laptop/context clip. This shows the product setting; the final montage slot is reserved for a full-screen edit of the timer collection.', context: true}
  };

  function openViewer(key, trigger) {
    const view = views[key];
    if (!view) return;
    const version = ++viewerVersion;
    previousFocus = trigger;
    document.getElementById('viewer-title').textContent = view.title;
    document.getElementById('viewer-description').textContent = view.description;
    viewerContent.replaceChildren();
    if (view.image) {
      const image = document.createElement('img');
      image.src = view.image;
      image.alt = view.title;
      image.addEventListener('error', () => { image.replaceWith(document.createTextNode('This image is currently unavailable.')); });
      viewerContent.append(image);
    } else {
      const video = document.createElement('video');
      video.src = view.src;
      video.poster = view.poster;
      video.controls = true;
      video.playsInline = true;
      video.muted = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', view.title);
      video.addEventListener('error', () => {
        if (version !== viewerVersion) return;
        const notice = document.createElement('p');
        notice.textContent = 'This preview is currently unavailable.';
        viewerContent.append(notice);
      });
      viewerContent.append(video);
      // The source context clip has long black sections. Start on its visible scene,
      // with native controls so the complete original remains available.
      if (view.context) video.addEventListener('loadedmetadata', () => {video.currentTime = 2;}, {once: true});
    }
    if (view.comparison) {
      const pair = document.createElement('div'); pair.className = 'viewer-compare';
      for (const [image, caption] of [['basic-timer', 'The browser prototype'], ['designed-timer', 'The freedom to design in After Effects']]) {
        const figure = document.createElement('figure');
        const img = document.createElement('img'); img.src = `assets/design-b/${image}-1280.webp`; img.alt = caption;
        const label = document.createElement('figcaption'); label.textContent = caption;
        figure.append(img, label); pair.append(figure);
      }
      viewerContent.append(pair);
    }
    document.body.classList.add('viewer-open');
    dialog.showModal();
    syncAll();
    dialog.querySelector('.viewer-close').focus({preventScroll: true});
  }

  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => openViewer(button.dataset.view, button)));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    viewerVersion++;
    const video = viewerContent.querySelector('video');
    if (video) {video.pause(); video.removeAttribute('src'); video.load();}
    viewerContent.replaceChildren();
    document.body.classList.remove('viewer-open');
    previousFocus?.focus({preventScroll: true});
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
  document.querySelector('.generation-detail').addEventListener('toggle', requestScrollState);
  updateScrollState();
})();
