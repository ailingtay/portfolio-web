# Design C — media performance audit

23 September 2026. Scope: C only. Original media and versions A/B are preserved.

## What changed

- The initial page contains no active video URLs. HTML, styling and small nearby poster images load first.
- After the page load event and an idle opportunity, the first two previews warm up. Further previews queue as the reader approaches them, roughly two viewports ahead.
- A maximum of two video fetches run at once; constrained connections use one. Visible media takes priority. A section jump cancels obsolete speculative requests before opening replacements.
- A clip starts when at least 20% of its media frame is visible. It pauses offscreen and when the page is hidden. Manual pauses persist.
- Clips are fetched once per cached source and shared between repeated placements. The blob cache targets 20 MiB on desktop and 8 MiB on mobile; distant, unused entries are evicted first. Nearby or visible clips are protected, so the budget is a soft ceiling. Distant video elements release their attached source to reduce decoder use.
- Blob-backed playback supports precise scrubbing without a second full download or reliance on local server byte-range support.
- Poster images now use native lazy loading and responsive WebP candidates. Original-resolution evidence remains available through the existing image links.
- Reduced-motion and Save-Data preferences disable automatic speculative video downloads and playback. Explicit local play remains available. A poster and retry button remain usable if a request fails.

## Measured results

Local headless Chrome, 1440 × 1000, disabled HTTP cache, 5 Mbps download / 80 ms simulated latency. These are a single controlled comparison, not production field data or a guarantee for every connection. The page load event does not wait for later video prefetches.

| Measure | Before | After |
| --- | ---: | ---: |
| Page load event | 2.84 s | 0.37 s |
| Completed subresource transfer after 3.5 s at page top | 1.64 MB | 1.23 MB |
| First preview start after a 2.5 s approach pause | 375 ms | 18 ms |
| All 23 unique videos, desktop | 31.31 MB | 21.85 MB |
| All 23 unique videos, mobile | 31.31 MB | 14.52 MB |

Desktop video bytes are reduced by **30.2%**; mobile bytes by **53.6%**. The page has 25 video placements, with two clips reused. The totals describe the whole collection, not the initial page download. Transfer figures exclude the HTML navigation response; the after figure includes the first two background video fetches. Smaller mobile variants are selected on narrow viewports or constrained connections, not simply by device name.

Sudden jumps to an uncached section, very slow links and browser autoplay restrictions can still require a wait or explicit play. Posters stay visible during preparation; the page never waits for every video to download. The queue uses full-file preview fetches for predictable concurrency, caching and seeking, so the largest cold preview must complete before playback. Look-ahead loading is intended to complete that work before the section is reached.

## Quality decisions

- Original master/source files were not recompressed or replaced. C references separate selected derivatives.
- H.264 MP4 remains the broadly compatible presentation format. GIF sources are not served as animated image downloads.
- Retained original timing and duration. General animation keeps up to 24 fps; the character-grid recording uses 15 fps at 640px desktop / 480px mobile. That recording is the largest saving and a deliberate tradeoff: it is less smooth during rapid scrolling, but the character variations remain clear at their displayed size.
- Desktop re-encodes were rejected when savings were below 10%, or when larger than the existing file. Mobile re-encodes were rejected when the desktop/existing file was smaller. This avoids repeatedly degrading files that were already efficient.
- Browser-tool text and node diagrams were kept at their existing desktop quality where further compression offered little benefit.
- Representative character, owl and disco frames were inspected side by side. Matched-size spatial SSIM scores were 0.976, 0.973 and 0.979 respectively. This is a supporting signal, not proof of identical perceived quality or temporal smoothness. No universal “optimal” compression setting is claimed.

## File-by-file results

Sizes below use decimal MB. “Unchanged” means the existing desktop encode was retained.

| Preview | Before | Desktop | Mobile | Desktop change |
| --- | ---: | ---: | ---: | --- |
| animal-character-development | 7.84 MB | 2.68 MB | 1.69 MB | 66% smaller |
| dance | 2.87 MB | 2.16 MB | 1.28 MB | 25% smaller |
| seascape | 1.93 MB | 1.44 MB | 0.82 MB | 26% smaller |
| rocket | 1.92 MB | 1.60 MB | 1.06 MB | 17% smaller |
| dinosaurs | 1.81 MB | 1.81 MB | 1.27 MB | Unchanged |
| 06-robot-timer | 1.67 MB | 1.17 MB | 0.58 MB | 30% smaller |
| 05-owl-bad-1 | 1.65 MB | 0.89 MB | 0.62 MB | 46% smaller |
| cartoon | 1.29 MB | 1.29 MB | 0.76 MB | Unchanged |
| 05-final | 1.13 MB | 1.13 MB | 0.59 MB | Unchanged |
| 05-owl-bad-2 | 1.11 MB | 0.56 MB | 0.42 MB | 50% smaller |
| space | 1.04 MB | 0.81 MB | 0.44 MB | 22% smaller |
| medieval | 1.02 MB | 1.02 MB | 0.98 MB | Unchanged |
| 05-owl-approved | 0.99 MB | 0.50 MB | 0.36 MB | 50% smaller |
| animals | 0.89 MB | 0.89 MB | 0.89 MB | Unchanged |
| watercolour | 0.66 MB | 0.66 MB | 0.66 MB | Unchanged |
| dance-test | 0.66 MB | 0.48 MB | 0.26 MB | 27% smaller |
| seascape-process | 0.62 MB | 0.62 MB | 0.41 MB | Unchanged |
| 02-timer-app | 0.58 MB | 0.58 MB | 0.28 MB | Unchanged |
| 03-ae-plugin | 0.48 MB | 0.48 MB | 0.25 MB | Unchanged |
| sprite-prototype | 0.45 MB | 0.40 MB | 0.27 MB | 12% smaller |
| blocks | 0.35 MB | 0.35 MB | 0.35 MB | Unchanged |
| 05-node | 0.28 MB | 0.28 MB | 0.21 MB | Unchanged |
| animal-motion-workflow | 0.05 MB | 0.05 MB | 0.05 MB | Unchanged |

## Remaining opportunities

1. **Shorter, deliberately edited excerpts.** The character-grid recording and 24-second disco preview are the remaining largest files. A selected 6–12-second edit could reduce bytes further, but would change the content shown. Their full current sequences remain intact.
2. **Delivery caching when hosted.** Add explicit revalidation headers for the current filenames. Introduce content-hashed media URLs before applying long-lived immutable caching, so updates cannot remain stale. This is a hosting step, not a change made to a live service. See [MDN’s caching guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching).
3. **Archive unused production files separately if repository size becomes a concern.** They do not affect page loading unless referenced. Deleting unused originals would shrink storage, not the bytes needed to view C, so they were preserved.
4. **Measure on the eventual hosting service and representative phones.** Repeat the approach-scroll and rapid-jump tests there; this local test cannot establish production Core Web Vitals or Safari/iOS behaviour.

## Rebuilding and checks

- `assets/design-c/optimized/manifest.json`: source mappings, byte counts, dimensions, frame rates and CRF choices.
- `assets/design-c/optimized/images.json`: responsive still/poster mappings. Original evidence links remain separate.
- `assets/design-c/optimized/audit.csv`: sortable byte audit.
- `scripts/optimize-c-media.py`: repeat the selected encodes using an installed FFmpeg, plus Pillow for stills. Example: `python3 scripts/optimize-c-media.py --ffmpeg /path/to/ffmpeg`.
- `scripts/test-c-media.cjs`: Playwright regression checks against a running static preview. Set `C_PREVIEW_URL` to override the default local URL. Playwright is a test-time dependency only.

Checks cover the two-request limit, idle prefetching, approach readiness, visible-only playback, persistent manual pause, scrubbing, replay, shared duplicate clips, hidden-page pause, reduced motion, Save-Data, mobile source selection, no-JavaScript posters, HTTP failure/retry, and layout at five widths. No browser console exceptions were observed.

The implementation follows the separation of poster loading and video preparation described in [web.dev’s video-loading guidance](https://web.dev/articles/lazy-loading-video). Image selection uses [responsive-image markup](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images), with a JavaScript queue for more deliberate video prioritisation.
