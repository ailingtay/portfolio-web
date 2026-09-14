(() => {
  'use strict';
  const content = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const previews = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      target.dataset.visible = String(isIntersecting);
      syncPreview(target);
    });
  }, { threshold: 0.25 });
  function syncPreview(video) {
    const blockedByViewer = $('viewer').open && !video.closest('#viewer');
    if (!video.isConnected || document.hidden || blockedByViewer || video.dataset.visible !== 'true' || video.dataset.userPaused === 'true' || (reducedMotion.matches && video.dataset.userStarted !== 'true')) video.pause();
    else video.play().catch(() => { /* A browser may require an explicit Play click. */ });
  }
  function syncAll() { previews.forEach(syncPreview); }
  reducedMotion.addEventListener('change', () => {
    previews.forEach(v => { v.dataset.userStarted = 'false'; });
    syncAll();
  });
  document.addEventListener('visibilitychange', syncAll);
  function disposeMedia(root) {
    root.querySelectorAll('video').forEach(video => {
      video.pause(); observer.unobserve(video); previews.delete(video);
    });
  }
  function mediaSlot(spec = {}, thumbnail = false) {
    const slot = el('div', 'media-slot');
    const ratio = String(spec.aspectRatio || '16 / 9');
    if (/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/.test(ratio)) slot.style.setProperty('--media-ratio', ratio);
    const placeholder = () => {
      disposeMedia(slot); slot.classList.remove('has-media'); slot.replaceChildren();
      const inner = el('div', 'placeholder-inner');
      const icon = el('span', 'placeholder-symbol'); icon.setAttribute('aria-hidden', 'true');
      inner.append(icon, el('span', 'placeholder-label', spec.label || 'Add your media here'));
      slot.append(inner, el('span', 'placeholder-kind', `${spec.type === 'video' || spec.playback ? 'Image / video' : 'Image'} placeholder`));
    };
    placeholder();
    if (!spec.src || !['image', 'video'].includes(spec.type)) return slot;
    if (spec.type === 'image' || thumbnail) {
      const src = thumbnail && spec.type === 'video' ? spec.poster : spec.src;
      if (!src) return slot;
      const image = document.createElement('img');
      image.alt = thumbnail ? '' : (spec.alt || spec.label || 'Portfolio artwork');
      image.loading = 'lazy'; image.decoding = 'async';
      image.addEventListener('load', () => { slot.classList.add('has-media'); slot.replaceChildren(image); });
      image.addEventListener('error', placeholder);
      image.src = src;
      return slot;
    }
    const video = document.createElement('video');
    video.playsInline = true; video.preload = 'metadata';
    video.setAttribute('aria-label', spec.alt || spec.label || 'Portfolio video');
    if (spec.poster) video.poster = spec.poster;
    video.addEventListener('error', placeholder);
    video.addEventListener('loadedmetadata', () => slot.classList.add('has-media'));
    slot.replaceChildren(video);
    if (spec.captions) {
      const track = document.createElement('track');
      track.kind = 'captions'; track.src = spec.captions; track.srclang = spec.language || 'en'; track.label = 'Captions'; video.append(track);
    }
    if (spec.playback === 'preview') {
      video.muted = true; video.loop = true;
      const toggle = el('button', 'preview-toggle', 'Play preview');
      toggle.type = 'button'; toggle.setAttribute('aria-label', 'Play video preview');
      video.addEventListener('play', () => { toggle.textContent = 'Pause preview'; toggle.setAttribute('aria-label', 'Pause video preview'); });
      video.addEventListener('pause', () => { toggle.textContent = 'Play preview'; toggle.setAttribute('aria-label', 'Play video preview'); });
      toggle.addEventListener('click', () => {
        if (video.paused) { video.dataset.userPaused = 'false'; video.dataset.userStarted = 'true'; video.play().catch(() => {}); }
        else { video.dataset.userPaused = 'true'; video.pause(); }
      });
      slot.append(toggle); previews.add(video); observer.observe(video);
    } else video.controls = true;
    video.src = spec.src;
    return slot;
  }
  function figure(spec) {
    const node = el('figure'); node.append(mediaSlot(spec));
    if (spec.caption) node.append(el('figcaption', 'media-caption', spec.caption));
    return node;
  }
  $('site-name').textContent = content.name;
  $('footer-name').textContent = content.name;
  document.title = `${content.name} — Selected work`;
  $('discipline').textContent = content.discipline;
  $('hero-title').textContent = content.headline;
  $('hero-description').textContent = content.introduction;
  $('hero-media').append(mediaSlot(content.hero));
  const symbols = ['↗', '◈', '◷', '✳'];
  content.disciplines.forEach((name, i) => {
    const item = el('div', 'discipline-item'); const icon = el('span', 'discipline-icon', symbols[i % symbols.length]);
    icon.setAttribute('aria-hidden', 'true'); item.append(icon, el('span', '', name)); $('disciplines').append(item);
  });
  const project = content.project;
  const heading = el('header', 'project-heading');
  heading.append(el('p', 'eyebrow', project.category), el('h2', '', project.title), el('p', 'project-summary', project.summary));
  const metadata = el('dl', 'project-meta');
  project.metadata.forEach(item => { const group = el('div'); group.append(el('dt', '', item.label), el('dd', '', item.value)); metadata.append(group); });
  heading.append(metadata);
  const cover = el('div', 'project-cover'); cover.append(figure(project.cover));
  $('story').append(heading, cover);
  project.sections.forEach(section => {
    const node = el('section', 'story-section'); node.id = section.id;
    node.append(el('p', 'eyebrow', section.label), el('h2', '', section.title), el('p', 'story-copy', section.body));
    if (section.media?.length) {
      const group = el('div', `media-group${section.mediaLayout === 'pair' ? ' pair' : ''}`);
      section.media.forEach(spec => group.append(figure(spec))); node.append(group);
    }
    $('story').append(node);
  });
  $('about-heading').textContent = content.about.title;
  $('about-copy').textContent = content.about.body;
  $('gallery-count').textContent = String(content.gallery.length).padStart(2, '0');
  let activeIndex = 0, opener = null;
  const dialog = $('viewer');
  function showItem(index) {
    activeIndex = (index + content.gallery.length) % content.gallery.length;
    const item = content.gallery[activeIndex];
    disposeMedia($('viewer-media'));
    $('viewer-media').replaceChildren(mediaSlot(item.media));
    $('viewer-title').textContent = item.title;
    $('viewer-category').textContent = item.category;
    $('viewer-description').textContent = item.description;
    $('viewer-position').textContent = `Work index / ${String(activeIndex + 1).padStart(2, '0')} of ${String(content.gallery.length).padStart(2, '0')}`;
    dialog.scrollTop = 0;
  }
  content.gallery.forEach((item, index) => {
    const button = el('button', 'gallery-card'); button.type = 'button';
    button.setAttribute('aria-label', `View ${item.title}`); button.setAttribute('aria-haspopup', 'dialog');
    const copy = el('span', 'gallery-copy'); copy.append(el('strong', '', item.title), el('small', '', item.category));
    button.append(mediaSlot(item.media, true), copy);
    button.addEventListener('click', () => {
      opener = button; showItem(index); dialog.showModal(); document.body.classList.add('viewer-open');
      document.querySelectorAll('main video').forEach(v => v.pause()); syncAll(); $('viewer-close').focus();
    });
    $('gallery').append(button);
  });
  $('viewer-close').addEventListener('click', () => dialog.close());
  $('viewer-prev').addEventListener('click', () => showItem(activeIndex - 1));
  $('viewer-next').addEventListener('click', () => showItem(activeIndex + 1));
  dialog.addEventListener('close', () => {
    disposeMedia($('viewer-media')); $('viewer-media').replaceChildren(); document.body.classList.remove('viewer-open');
    opener?.focus({ preventScroll: true }); syncAll();
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  } });
  dialog.addEventListener('keydown', event => {
    if (event.target.tagName === 'VIDEO') return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showItem(activeIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showItem(activeIndex + 1); }
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button, video[controls], [tabindex="0"]')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();
