# Design B — a visual story

Preview `design-b.html`, or use the **B / Visual story** tab above the main navigation on the original portfolio. The existing case-study review also links to both designs. A remains the original; B has independent markup, styling and behaviour.

## The editorial change

The original featured project tells nine chronological chapters in about 743 words of narrative, before captions, metadata and supporting diagrams. It repeats the questions about automation and control, opens on a laptop image with an unfilled green screen, and puts much of the work in a narrow column. Its gallery and identity copy still include template placeholders.

B makes one argument: **the craft is knowing what to hand over.** It starts with the finished range, then demonstrates three decisions:

1. **Set the direction.** Original drawing → directed movement → finished scene. The three images form one visual explanation, with the finished result given twice the width.
2. **Know what to keep.** A large library scene leads with the result. The rejected generations sit in an expandable comparison, so the decision can be understood in a sentence or explored in detail.
3. **Make room for the craft.** A pair of panels connects a reusable After Effects tool with the robot's loop-and-event structure. The browser prototype explains the earlier trade-off on demand.

The ending returns to the central lesson. The language is intended for a curious reader, not a recruiter checklist. No name, contact details, client claims or unverified impact figures have been added.

The main narrative is 197 words. Captions, controls and the montage slot bring the default visible main page to 326 words. The 90-second path is an editorial target, not an enforced timer; opening comparisons or watching demonstrations adds optional depth. The separate detailed case study remains available at the end.

## Layout and assets

The design uses near-full-width media, up to 2240px on very large monitors, with quiet neutral surfaces, oversized typography and a dark chapter for the library scene. On phones, the opening becomes a large hero plus four smaller scenes, the drawing sequence stacks, and the system panels become a single column.

| Asset | Purpose in B |
| --- | --- |
| `07-timer-a/b/c/d.png` and `06-timer.png` | Five distinct worlds in the opening composition |
| `04-drawing.png`, `04-movement.mp4`, `04-final-timer.mp4` | Original artwork, motion test and final assembly |
| `05-final.mp4` | Large finished library scene |
| `05-owl-bad-1/2.mp4`, `05-owl-approved.mp4` | Rejected and accepted motion in the expandable comparison |
| `03-ae-plugin.mp4` | On-demand tool demonstration |
| `02-timer-app.mp4`, `02-compare1/2.png` | Optional prototype and design-control comparison |
| `06-robot-timer.mp4` | Loop-based production, paired with a simple sequence diagram |
| `05-node.mp4` | Optional production workflow detail |
| `07-timer-e.png` | The suggested final frame in the montage brief |
| `portfolio.mp4` | Existing context clip, available in a viewer |

`assets/design-b/` contains small WebP derivatives of the original stills. Source files are preserved. The context poster is a frame of the supplied video. Existing MP4 copies in `assets/timer-lab-review/` supply the previews; B does not load the heavyweight GIFs or icon sheets. Images use responsive sizes where useful. Videos load when visible, pause offscreen and pause while a viewer is open. Individual pause choices are preserved. Reduced-motion mode starts with still images and permits explicit playback.

The simple robot track is a conceptual diagram, not an exact timeline. It intentionally avoids unsupported timing claims.

## One missing media asset

The final montage has a single, deliberate placeholder, with its brief available under **What to put here**:

- A 15–20 second full-screen edit of the illustrated, weather, library and robot timers.
- Show the different pacing and character, then end on the supplied **Time’s up** typography.
- Include the intended music and sound; the current GIF-derived previews are silent.
- Export MP4 at 1920 × 1080 or higher, 16:9, with a clean opening/poster frame.

`portfolio.mp4` is an 11-second laptop/context clip, with substantial black sections. It is not a full-screen collection reel. The optional viewer starts on a visible scene at 2 seconds while retaining the complete source in native controls.

Some supplied motion previews and the illustrated still are only around 800px wide. They are sufficient for the exploration, but original 1080p/4K exports would sharpen the large-screen presentation. This is a quality upgrade to existing media, not an additional placeholder.

## Editing and checks

- `design-b.html`: copy, chapter order, asset paths and montage brief.
- `design-b.css`: independent responsive layout and visual design.
- `design-b.js`: motion controls, optional media views, navigation marker and reading progress.
- `design-switcher.css`: shared A/B tabs. Their short navigation markup is present in all three HTML pages.

No framework, install or build step is required. Serve this directory locally or open the HTML directly.

Browser validation covered 320, 375, 390, 768, 1024, 1512, 1920 and 2560px widths; no page-level horizontal overflow. Checked the original/B navigation, expandable generation comparison, individual/global motion controls, reduced-motion defaults and explicit playback, media viewer playback, Escape, focus return, and stopping media when the viewer closes. Referenced assets loaded without HTTP errors; no page script errors were reported.

All eight media viewers loaded successfully. Also checked pausing offscreen, preserving an individual pause after scrolling and global toggles, retaining the still image when a video fails, and reading the main story without JavaScript. B makes no external network requests.
