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
  function inlineMediaNode(inlineMedia) {
    if (!inlineMedia) return null;
    const node = inlineMedia.media ? figure(inlineMedia.media)
      : inlineMedia.workflow ? workflowBoard(inlineMedia.workflow) : null;
    if (node) node.classList.add('inline-media');
    return node;
  }
  function richCopy(className, text, inlineMedia) {
    const container = el('div', className);
    String(text || '').split(/\n\n+/).forEach((paragraph, index) => {
      const isHeading = paragraph.startsWith('### ');
      const p = el(isHeading ? 'h3' : 'p');
      const copy = isHeading ? paragraph.slice(4) : paragraph;
      copy.split(/(\*\*[^*]+\*\*)/g).forEach(part => {
        p.append(part.startsWith('**') && part.endsWith('**')
          ? el('strong', '', part.slice(2, -2)) : document.createTextNode(part));
      });
      container.append(p);
      if (inlineMedia?.afterParagraph === index + 1) {
        const node = inlineMediaNode(inlineMedia);
        if (node) container.append(node);
      }
    });
    return container;
  }
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
      image.loading = /\.gif(?:$|[?#])/i.test(src) ? 'eager' : 'lazy'; image.decoding = 'async';
      image.addEventListener('load', () => { slot.classList.add('has-media'); slot.replaceChildren(image); });
      image.addEventListener('error', placeholder);
      slot.replaceChildren(image);
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
  function workflowBoard(config = {}) {
    const board = el('div', 'workflow-board');
    if (config.testedCount) board.dataset.testedCount = String(config.testedCount);
    if (config.items?.length) board.dataset.itemCount = String(config.items.length);
    if (config.title) board.append(el('h3', 'workflow-title', config.title));
    const steps = el('div', 'workflow-steps');
    (config.items || []).forEach((item, index, items) => {
      const card = el('article', 'workflow-step');
      if (index < items.length - 1) card.classList.add('has-next');
      card.append(el('h4', 'workflow-step-label', item.label || 'Workflow stage'));
      if (item.src) {
        const image = document.createElement('img');
        image.src = item.src; image.alt = item.alt || item.label || 'Workflow stage';
        image.loading = /\.gif(?:$|[?#])/i.test(item.src) ? 'eager' : 'lazy'; image.decoding = 'async';
        image.addEventListener('error', () => {
          image.remove(); card.classList.add('workflow-step-missing');
          card.append(el('span', 'workflow-step-placeholder', 'Add artwork'));
        });
        card.append(image);
      } else {
        card.classList.add('workflow-step-missing');
        card.append(el('span', 'workflow-step-placeholder', 'Add artwork'));
      }
      steps.append(card);
    });
    board.append(steps);
    if (config.footer) board.append(el('div', 'workflow-footer', config.footer));
    return board;
  }
  function comparisonBoard(config = {}) {
    const board = el('div', 'comparison-board');
    const grid = el('div', 'comparison-grid');
    (config.items || []).forEach(item => {
      const card = el('article', 'comparison-card');
      card.append(el('h3', 'comparison-card-title', item.title || 'Generation test'));
      card.append(mediaSlot(item.media || { type: 'placeholder', label: 'Add comparison media', aspectRatio: '16 / 9' }));
      (item.notes || []).forEach(note => {
        const noteNode = el('div', 'comparison-note');
        noteNode.append(el('strong', '', note.label || 'Review'), el('p', '', note.text || ''));
        card.append(noteNode);
      });
      grid.append(card);
    });
    board.append(grid);
    return board;
  }
  function timelineBoard(config = {}) {
    const board = el('div', 'timeline-board');
    if (config.title) board.append(el('h3', 'timeline-title', config.title));
    if (config.media) {
      const visual = el('div', 'timeline-visual');
      visual.append(mediaSlot(config.media));
      board.append(visual);
    }
    if (config.legend?.length) {
      const legend = el('ul', 'timeline-legend');
      config.legend.forEach(item => {
        const entry = el('li');
        const swatch = el('span', `timeline-swatch ${item.kind || 'loop'}`);
        swatch.setAttribute('aria-hidden', 'true');
        entry.append(swatch, document.createTextNode(item.label));
        legend.append(entry);
      });
      board.append(legend);
    }
    const timeline = el('div', 'timeline-track');
    timeline.tabIndex = 0;
    timeline.setAttribute('role', 'region');
    timeline.setAttribute('aria-label', 'Timer sequence');
    const canvas = el('div', 'timeline-canvas');
    const line = el('div', 'timeline-line');
    (config.events || []).forEach(event => {
      const marker = el('div', `timeline-event ${event.kind || 'milestone'}`);
      marker.style.setProperty('--event-position', `${event.position || 0}%`);
      marker.append(el('span', 'timeline-event-label', event.label || 'Event'));
      line.append(marker);
    });
    canvas.append(line);
    if (config.ticks?.length) {
      const axis = el('div', 'timeline-axis');
      config.ticks.forEach(item => {
        const tick = el('div', 'timeline-tick');
        tick.style.setProperty('--tick-position', `${item.position || 0}%`);
        tick.append(el('span', 'timeline-tick-label', item.label));
        axis.append(tick);
      });
      canvas.append(axis);
    }
    if (config.start || config.end) {
      const labels = el('div', 'timeline-labels');
      labels.append(el('span', '', config.start || 'Start'), el('span', '', config.end || 'Finish'));
      canvas.append(labels);
    }
    timeline.append(canvas);
    board.append(timeline);
    return board;
  }
  function toolSystemsBoard(config = {}) {
    const board = el('div', 'tool-systems-board');
    const grid = el('div', 'tool-systems-grid');
    (config.items || []).forEach(item => {
      const card = el('article', 'tool-system-card');
      card.append(el('h3', 'tool-system-title', item.title || 'Timer system'));
      if (item.media) card.append(mediaSlot(item.media));
      const chain = el('div', 'tool-chain');
      (item.steps || []).forEach((step, index) => {
        const node = el('div', 'tool-chain-step');
        node.append(el('strong', 'tool-chain-label', step.label || 'Stage'));
        if (step.sublabel) node.append(el('span', 'tool-chain-sublabel', step.sublabel));
        if (step.tools?.length) {
          const tools = el('div', 'tool-icons');
          step.tools.forEach(tool => {
            if (tool.src) {
              const icon = document.createElement('img'); icon.src = tool.src; icon.alt = tool.name || 'Tool'; icon.loading = 'lazy'; icon.decoding = 'async';
              icon.addEventListener('error', () => icon.remove()); tools.append(icon);
            } else tools.append(el('span', 'tool-text', tool.name || 'Tool'));
          });
          node.append(tools);
        }
        chain.append(node);
        if (index < item.steps.length - 1) chain.append(el('span', 'tool-chain-arrow', '↓'));
      });
      card.append(chain); grid.append(card);
    });
    board.append(grid);
    return board;
  }
  function storyCopyNodes(section) {
    const inline = section.inlineMedia;
    if (!inline?.fullWidth || !inline.afterParagraph) return [richCopy('story-copy', section.body, inline)];
    const paragraphs = String(section.body || '').split(/\n\n+/);
    const before = paragraphs.slice(0, inline.afterParagraph).join('\n\n');
    const after = paragraphs.slice(inline.afterParagraph).join('\n\n');
    const nodes = [];
    if (before) nodes.push(richCopy('story-copy', before));
    const inlineNode = inlineMediaNode(inline);
    if (inlineNode) nodes.push(inlineNode);
    if (after) nodes.push(richCopy('story-copy', after));
    return nodes;
  }
  document.querySelectorAll('[data-copy]').forEach(node => {
    if (content.page?.[node.dataset.copy] !== undefined) node.textContent = content.page[node.dataset.copy];
  });
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
  heading.append(el('p', 'eyebrow', project.category), el('h2', '', project.title));
  if (project.kicker) heading.append(el('p', 'project-kicker', project.kicker));
  if (project.lead) {
    const lead = el('div', 'project-lead'); lead.append(figure(project.lead)); heading.append(lead);
  }
  heading.append(richCopy('project-summary', project.summary));
  const metadata = el('dl', 'project-meta');
  project.metadata.forEach(item => { const group = el('div'); group.append(el('dt', '', item.label), el('dd', '', item.value)); metadata.append(group); });
  heading.append(metadata);
  const cover = project.cover ? el('div', 'project-cover') : null;
  if (cover) cover.append(figure(project.cover));
  $('story').append(heading);
  if (cover) $('story').append(cover);
  project.sections.forEach(section => {
    const node = el('section', 'story-section'); node.id = section.id;
    node.append(el('p', 'eyebrow', section.label), el('h2', '', section.title));
    storyCopyNodes(section).forEach(child => node.append(child));
    const appendMediaGroup = (items, layout = 'stack') => {
      if (!items?.length) return;
      const group = el('div', `media-group ${layout}`);
      items.forEach(spec => group.append(figure(spec)));
      node.append(group);
    };
    if (section.workflow) node.append(workflowBoard(section.workflow));
    if (section.comparison) node.append(comparisonBoard(section.comparison));
    if (section.timeline) node.append(timelineBoard(section.timeline));
    if (section.toolSystems) node.append(toolSystemsBoard(section.toolSystems));
    if (section.mediaGroups?.length) section.mediaGroups.forEach(group => appendMediaGroup(group.items, group.layout));
    else if (section.media?.length) appendMediaGroup(section.media, section.mediaLayout || 'stack');
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
