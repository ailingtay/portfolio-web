# Portfolio template

A local, responsive, single-page portfolio. No framework, build step, API, or account is required. The original `DESIGN.md`, `tokens.json`, `variables.css`, and `theme.css` are preserved. The page uses `variables.css`; `theme.css` remains a Tailwind reference and is not loaded.

## Preview

Open `index.html` in a browser, or run `python3 -m http.server 8000 --bind 127.0.0.1` from this folder and visit http://127.0.0.1:8000. Google Fonts supplies DM Sans and Inter when online; system fonts provide an offline fallback.

## Edit content

Edit `content.js`, or ask Codex to update it. It contains your display name, introduction, disciplines, hero media, featured project, ordered story sections, gallery, and about copy. Square-bracketed text is a writing prompt, not a claimed accomplishment. The introduction headline and section headings accept `\n` for intentional line breaks. Page styling lives in `styles.css`; rendering and viewer behavior live in `app.js`.

To add or reorder story sections, edit the `project.sections` array. Each section has a unique `id`, `label`, `title`, `body`, and optional `media` array. Keep an entry with `id: 'process'` for the navigation link, or update that link in `index.html`. `mediaLayout: 'pair'` places two media items side by side on larger screens and stacks them on phones. Gallery order follows the `gallery` array; the count and viewer navigation update automatically. Each gallery entry has a title, category, description, and media object.

## Replace grey media

Create an `assets` folder for your own files. Relative paths work locally and after static hosting. Replace an individual media object with one of these examples:

```js
{ type: 'image', src: 'assets/project.jpg', alt: 'Describe the artwork meaningfully',
  label: 'Project photograph', aspectRatio: '3 / 2', caption: 'Optional visible caption' }

{ type: 'video', src: 'assets/study.mp4', poster: 'assets/study-poster.jpg',
  label: 'Motion study', aspectRatio: '16 / 9', playback: 'preview' }

{ type: 'video', src: 'assets/process.mp4', poster: 'assets/process-poster.jpg',
  label: 'Process film', aspectRatio: '16 / 9', playback: 'manual',
  captions: 'assets/process.en.vtt', language: 'en' }
```

`type: 'placeholder'`, an empty `src`, or an image/video load failure displays a grey placeholder. `aspectRatio` reserves placeholder space. Loaded story images and videos retain their natural proportions. Thumbnails crop; the viewer shows the complete work. Video gallery thumbnails use `poster`; without one they stay grey until the viewer opens. Use widely supported MP4/H.264 video and JPG, PNG, WebP, or AVIF images. Export appropriately sized/compressed media before adding it; the template does not transcode files.

Preview videos loop muted when at least 25% visible, pause offscreen or when the tab is hidden, and have a play/pause button. A user pause is respected. Reduced-motion preferences prevent automatic playback; explicit playback is still available. Browsers that block autoplay leave a Play button. Manual videos use native controls and do not autoplay. Add caption files for spoken audio. Opening the viewer pauses background videos; closing it stops its video. Preview playback may resume in the page, while manual films remain paused.

## Responsive behavior and accessibility

The content is capped at 1200px. At 1024px and above, the work index sticks alongside the story. Below 1024px it becomes a horizontal strip before the story. Below 600px the hero and paired process media stack. The viewer supports previous/next buttons, arrow keys, Escape, focus containment, and return to the selected gallery card. Native video controls retain their own keyboard shortcuts.

No contact, résumé, analytics, publishing, search, or backend integration is included.
