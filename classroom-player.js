/* Hero-only playback: one selected or randomly chosen visible room at a time. */
(() => {
  const rooms = [...document.querySelectorAll('.classroom')];
  const master = document.querySelector('#motion-master');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = null, mode = '', pinned = null, hovered = null, focused = null;
  let idleTimer = 0, turnTimer = 0, loadTimer = 0, request = 0, last = null;
  const failed = new Set();
  const visible = room => {
    const r = room.getBoundingClientRect();
    const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
    return r.bottom > header + 50 && r.top < innerHeight - 70 && r.right > 0 && r.left < innerWidth;
  };
  const automatic = () => !document.hidden && !reduced.matches && !navigator.connection?.saveData && master.getAttribute('aria-pressed') !== 'true';
  function label(room, playing) {
    room.setAttribute('aria-pressed', String(room === pinned));
    room.setAttribute('aria-label', `${room === pinned ? 'Pause' : 'Play'} ${room.dataset.title} inline preview`);
    room.querySelector('.room-play').textContent = playing ? 'Ⅱ' : '▶';
  }
  function stop() {
    ++request;
    clearTimeout(turnTimer); clearTimeout(loadTimer);
    if (active) {
      const room = active;
      active = null;
      room.querySelector('video').pause();
      room.classList.remove('is-playing', 'is-loading');
      label(room, false);
    }
    mode = '';
  }
  function preferred() {
    return [pinned, hovered, focused].find(room => room && visible(room));
  }
  function schedule(delay = 1400) {
    clearTimeout(idleTimer);
    if (active || preferred() || !automatic()) return;
    idleTimer = setTimeout(() => {
      idleTimer = 0;
      if (active || preferred() || !automatic()) return;
      let candidates = rooms.filter(room => visible(room) && !failed.has(room));
      if (candidates.length > 1) candidates = candidates.filter(room => room !== last);
      if (candidates.length) {
        const room = candidates[Math.floor(Math.random() * candidates.length)];
        last = room;
        play(room, 'auto');
      }
    }, delay);
  }
  function play(room, nextMode) {
    if (document.hidden || !visible(room)) return;
    clearTimeout(idleTimer);
    if (active === room) {
      if (nextMode !== 'auto') { clearTimeout(turnTimer); mode = nextMode; }
      return;
    }
    stop();
    active = room; mode = nextMode;
    const token = request;
    const video = room.querySelector('video');
    video.muted = true; video.defaultMuted = true; video.playsInline = true; video.loop = true;
    room.classList.remove('has-playback-error');
    room.classList.add('is-loading');
    if (!video.hasAttribute('src') || video.error) {
      video.src = matchMedia('(max-width:760px)').matches || navigator.connection?.saveData ? room.dataset.mobile : room.dataset.video;
      video.load();
    }
    const failure = () => {
      if (active !== room || request !== token) return;
      failed.add(room);
      stop();
      room.classList.add('has-playback-error');
      room.querySelector('.room-live').textContent = 'Click to retry';
      if (pinned === room) pinned = null;
      label(room, false);
      schedule(1600);
    };
    loadTimer = setTimeout(failure, 15000);
    // Call play within the click itself, preserving the browser's user gesture.
    video.play().then(() => {
      if (active !== room || request !== token) return;
      clearTimeout(loadTimer);
      room.classList.remove('is-loading');
      room.classList.add('is-playing');
      room.querySelector('.room-live').textContent = 'Playing preview';
      label(room, true);
      if (mode === 'auto') turnTimer = setTimeout(() => { stop(); schedule(1400); }, 5000);
    }).catch(failure);
  }
  function interact() {
    const room = preferred();
    if (room) play(room, room === pinned ? 'pinned' : 'hover');
    else { stop(); schedule(); }
  }
  for (const room of rooms) {
    label(room, false);
    room.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hovered = room;
      if (!pinned) interact();
    });
    room.addEventListener('pointerleave', () => {
      if (hovered === room) hovered = null;
      if (!pinned) interact();
    });
    room.addEventListener('focus', () => {
      if (room.matches(':focus-visible')) { focused = room; if (!pinned) interact(); }
    });
    room.addEventListener('blur', () => {
      if (focused === room) focused = null;
      if (!pinned) interact();
    });
    room.addEventListener('click', () => {
      const previous = pinned;
      if (pinned === room) {
        pinned = null; hovered = null; focused = null;
        stop(); label(room, false); schedule(2500);
      } else {
        pinned = room;
        if (previous) label(previous, false);
        failed.delete(room);
        if (active === room) { clearTimeout(turnTimer); mode = 'pinned'; label(room, true); }
        else play(room, 'pinned');
      }
    });
    room.querySelector('video').addEventListener('error', () => {
      if (active !== room) return;
      failed.add(room); stop();
      if (pinned === room) pinned = null;
      room.classList.add('has-playback-error');
      room.querySelector('.room-live').textContent = 'Click to retry';
      schedule();
    });
  }
  function viewportChanged() {
    if (pinned && !visible(pinned)) { const previous = pinned; pinned = null; label(previous, false); }
    if (hovered && !visible(hovered)) hovered = null;
    if (focused && !visible(focused)) focused = null;
    if (active && !visible(active)) stop();
    if (!active) schedule();
  }
  addEventListener('scroll', viewportChanged, {passive: true});
  addEventListener('resize', viewportChanged);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(idleTimer); stop(); }
    else interact();
  });
  master.addEventListener('click', () => {
    if (master.getAttribute('aria-pressed') === 'true') {
      const previous = pinned;
      pinned = hovered = focused = null;
      clearTimeout(idleTimer); stop();
      if (previous) label(previous, false);
    } else schedule();
  });
  reduced.addEventListener('change', () => { if (mode === 'auto') stop(); schedule(); });
  addEventListener('pagehide', () => { clearTimeout(idleTimer); stop(); });
  addEventListener('pageshow', () => schedule());
  schedule();
})();
