(() => {
  'use strict';
  const project = window.FEATURED_STORY;
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionEnabled = !reducedMotion.matches;
  const videos = new Set();
  const motionToggle = document.getElementById('motion-toggle');
  function updateMotionLabel() {
    motionToggle.textContent = motionEnabled ? 'Pause motion' : 'Play motion';
    motionToggle.setAttribute('aria-pressed', String(!motionEnabled));
    motionToggle.setAttribute('aria-label', motionEnabled ? 'Pause all animated previews' : 'Play animated previews while visible');
  }
  function sync(video) {
    const detail = video.closest('details');
    const visible = video.dataset.visible === 'true' && !document.hidden && (!detail || detail.open);
    if (!visible) { video.pause(); return; }
    if (video.dataset.playback !== 'preview') return;
    if (!motionEnabled || video.dataset.userPaused === 'true') video.pause();
    else video.play().catch(() => {});
  }
  const syncAll = () => videos.forEach(sync);
  const visibilityObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      target.dataset.visible = String(isIntersecting);
      if (isIntersecting && !target.getAttribute('src')) target.src = target.dataset.src;
      sync(target);
    });
  }, {threshold:0.25});
  motionToggle.addEventListener('click', () => {
    motionEnabled = !motionEnabled;
    if (motionEnabled) videos.forEach(video => { video.dataset.userPaused = 'false'; });
    updateMotionLabel(); syncAll();
  });
  reducedMotion.addEventListener('change', () => { motionEnabled = !reducedMotion.matches; updateMotionLabel(); syncAll(); });
  document.addEventListener('visibilitychange', syncAll);
  updateMotionLabel();

  function media(spec = {}) {
    const frame = make('div', 'media-frame');
    const ratio = spec.aspectRatio || '16 / 9';
    if (/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/.test(ratio)) frame.style.setProperty('--ratio',ratio);
    function fallback() {
      frame.querySelectorAll('video').forEach(video => { video.pause(); videos.delete(video); visibilityObserver.unobserve(video); });
      frame.replaceChildren(make('div','placeholder',spec.label || spec.alt || 'Media to be added'));
    }
    if (!spec.src) { fallback(); return frame; }
    if (spec.type !== 'video') {
      const image = document.createElement('img');
      image.src = spec.src; image.alt = spec.alt || spec.label || '';
      image.loading = 'lazy'; image.decoding = 'async';
      image.addEventListener('error',fallback,{once:true});
      frame.append(image);
      return frame;
    }
    const video = document.createElement('video');
    video.playsInline = true; video.preload = 'none';
    video.dataset.src = spec.src;
    video.dataset.playback = spec.playback || 'manual';
    video.dataset.visible = 'false'; video.dataset.userPaused = 'false';
    video.setAttribute('aria-label',spec.alt || spec.label || 'Project demonstration');
    if (spec.poster) video.poster = spec.poster;
    video.addEventListener('error',fallback,{once:true});
    frame.append(video);
    if (spec.playback === 'preview') {
      video.muted = true; video.loop = true;
      const button = make('button','preview-toggle','Play preview');
      button.type = 'button';
      const label = spec.label || spec.alt || 'animation';
      const update = () => {
        button.textContent = video.paused ? 'Play preview' : 'Pause preview';
        button.setAttribute('aria-label',`${video.paused ? 'Play' : 'Pause'} ${label}`);
      };
      button.addEventListener('click', () => {
        if (video.paused) {
          video.dataset.userPaused = 'false';
          if (!video.getAttribute('src')) video.src = video.dataset.src;
          video.play().catch(() => {});
        } else { video.dataset.userPaused = 'true'; video.pause(); }
      });
      video.addEventListener('play',update); video.addEventListener('pause',update); update();
      frame.append(button);
    } else video.controls = true;
    videos.add(video); visibilityObserver.observe(video);
    return frame;
  }
  function figure(spec) {
    const node = make('figure'); node.append(media(spec));
    if (spec.caption) node.append(make('figcaption','media-caption',spec.caption));
    return node;
  }
  function copy(text) {
    const block = make('div','story-copy');
    String(text || '').split(/\n\n+/).forEach(paragraph => {
      const p = make('p');
      paragraph.split(/(\*\*[^*]+\*\*)/g).forEach(part => {
        p.append(part.startsWith('**') && part.endsWith('**') ? make('strong','',part.slice(2,-2)) : document.createTextNode(part));
      });
      block.append(p);
    });
    return block;
  }
  function workflow(config, artwork = false) {
    const board = make('div',`workflow-board${artwork ? ' artwork-workflow' : ''}`);
    if (config.title) board.append(make('h3','workflow-title',config.title));
    const steps = make('div','workflow-steps');
    if (artwork) { steps.tabIndex = 0; steps.setAttribute('role','region'); steps.setAttribute('aria-label','Illustration, AI motion and final timer. Scroll horizontally on smaller screens.'); }
    (config.items || []).forEach(item => {
      const card = make('article','workflow-step'); card.append(make('h4','',item.label));
      if (artwork) card.append(media({...item,aspectRatio:item.type==='video' && item.src.includes('final') ? '16 / 9':'1 / 1'}));
      else {
        const image = document.createElement('img'); image.src = item.src; image.alt = item.alt || item.label; image.loading='lazy';
        image.addEventListener('error',()=>image.replaceWith(make('div','placeholder','Artwork to be added')),{once:true}); card.append(image);
      }
      steps.append(card);
    });
    if (config.footer) steps.append(make('p','workflow-footer',config.footer));
    board.append(steps);
    return board;
  }
  function comparison(config) {
    const board=make('div','comparison-board'), grid=make('div','comparison-grid');
    config.items.forEach(item => {
      const card=make('article','comparison-card');
      card.append(make('h3','',item.title),media(item.media));
      (item.notes || []).forEach(note => { const block=make('div','comparison-note');block.append(make('strong','',note.label),make('p','',note.text));card.append(block); });
      grid.append(card);
    });
    board.append(grid);return board;
  }
  function timeline(config) {
    const board=make('div','timeline-board');
    if (config.media) board.append(figure(config.media));
    const legend=make('ul','timeline-legend');
    config.legend.forEach(item=>{const entry=make('li'),swatch=make('span',`timeline-swatch ${item.kind}`);swatch.setAttribute('aria-hidden','true');entry.append(swatch,document.createTextNode(item.label));legend.append(entry);});
    board.append(legend);
    const track=make('div','timeline-track');track.tabIndex=0;track.setAttribute('role','region');track.setAttribute('aria-label','Timer sequence, with elapsed timestamps. Scroll horizontally on smaller screens.');
    const canvas=make('div','timeline-canvas'),line=make('div','timeline-line');
    config.events.forEach(event=>{const marker=make('div',`timeline-event ${event.kind}`);marker.style.setProperty('--position',`${event.position}%`);marker.append(make('span','timeline-event-label',event.label));line.append(marker);});
    canvas.append(line);
    const axis=make('div','timeline-axis');
    config.ticks.forEach(tick=>{const node=make('div','timeline-tick');node.style.setProperty('--position',`${tick.position}%`);node.append(make('span','',tick.label));axis.append(node);});
    canvas.append(axis);track.append(canvas);board.append(track);return board;
  }
  function toolSystems(config) {
    const board=make('div','tool-systems-board'),grid=make('div','tool-systems-grid');
    config.items.forEach(item=>{
      const card=make('article','tool-system-card');card.append(make('h3','',item.title),media(item.media),make('p','tool-description',item.description));
      const chain=make('div','tool-chain');
      item.steps.forEach((step,i)=>{
        const node=make('div','tool-chain-step');node.append(make('strong','tool-chain-label',step.label),make('span','tool-chain-sublabel',step.sublabel));
        const icons=make('div','tool-icons');
        step.tools.forEach(tool=>{const img=document.createElement('img');img.src=tool.src;img.alt='';img.loading='lazy';img.addEventListener('error',()=>img.remove(),{once:true});icons.append(img);});
        node.append(icons);chain.append(node);
        if(i<item.steps.length-1){const arrow=make('span','tool-chain-arrow','↓');arrow.setAttribute('aria-hidden','true');chain.append(arrow);}
      });
      card.append(chain);grid.append(card);
    });
    board.append(grid);return board;
  }
  const opening=document.getElementById('opening');
  const openingGrid=make('div','opening-grid'),openingCopy=make('div','opening-copy');
  const title=make('h1','',project.title);title.id='project-title';
  openingCopy.append(make('p','eyebrow',project.category),title,make('p','project-kicker',project.kicker),make('p','project-summary',project.summary));
  const metadata=make('dl','project-meta');
  project.metadata.forEach(item=>{const group=make('div');group.append(make('dt','',item.label),make('dd','',item.value));metadata.append(group);});
  openingCopy.append(metadata);openingGrid.append(openingCopy);
  const showcase=make('div','opening-showcase');
  project.showcase.forEach(item=>{const node=make('figure'),image=document.createElement('img');image.src=item.src;image.alt=item.alt;image.width=800;image.height=450;image.decoding='async';image.addEventListener('error',()=>image.replaceWith(make('div','placeholder','Artwork to be added')),{once:true});node.append(image,make('figcaption','',item.caption));showcase.append(node);});
  openingGrid.append(showcase);opening.append(openingGrid);
  const overview=make('div','outcome-overview');
  project.overview.forEach(item=>{const card=make('div','overview-item');card.append(make('h2','',item.title),make('p','',item.body));overview.append(card);});
  opening.append(overview);

  const story=document.getElementById('story');
  project.sections.forEach(section=>{
    const node=make('section','story-section');node.id=section.id;
    const title=make('h2','',section.title);title.id=`${section.id}-heading`;node.setAttribute('aria-labelledby',title.id);
    node.append(make('p','eyebrow',section.label),title);
    const inline=section.inlineMedia;
    if(inline){
      const paragraphs=section.body.split(/\n\n+/);
      node.append(copy(paragraphs.slice(0,inline.afterParagraph).join('\n\n')));
      const visual=inline.media?figure(inline.media):workflow(inline.workflow,true);visual.classList.add('inline-media');node.append(visual);
      const after=paragraphs.slice(inline.afterParagraph).join('\n\n');if(after)node.append(copy(after));
    }else node.append(copy(section.body));
    if(section.workflow)node.append(workflow(section.workflow));
    if(section.comparison)node.append(comparison(section.comparison));
    if(section.timeline)node.append(timeline(section.timeline));
    if(section.toolSystems)node.append(toolSystems(section.toolSystems));
    if(section.detailMedia){
      const detail=make('details','media-detail');detail.append(make('summary','',section.detailMedia.summary),figure(section.detailMedia.media));detail.addEventListener('toggle',syncAll);node.append(detail);
    }
    (section.mediaGroups || []).forEach(group=>{const grid=make('div',`media-group ${group.layout || 'stack'}`);group.items.forEach(spec=>grid.append(figure(spec)));node.append(grid);});
    if(section.caption)node.append(make('p','section-caption',section.caption));
    story.append(node);
  });

  const links=[...document.querySelectorAll('.section-links a')];
  const anchors=links.map(link=>document.querySelector(link.getAttribute('href')));
  let scheduled=false;
  function updateNavigation(){
    let active=-1;
    anchors.forEach((node,i)=>{if(node.getBoundingClientRect().top<=180)active=i;});
    links.forEach((link,i)=>{if(i===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    scheduled=false;
  }
  document.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateNavigation);}},{passive:true});
  updateNavigation();
})();
