# Design C — Serious play

Open `design-c.html` or choose **C / Process journal** in the version navigation. C has independent HTML, CSS and JavaScript. A, B and the featured-story review retain their content, styling and behaviour; their only change is a navigation link to C.

## Reading the new assets

The new `Timer related assets` directory contains 16 thematic folders, including working canvases, stills, generation comparisons, sprite development and timer animations. These substantially strengthen a process case study: the intermediate work explains decisions that a finished gallery cannot.

| Material | What it contributes | Placement in C |
| --- | --- | --- |
| 004 Disco dance | A direct connection between original drawing, generated movement and composition | First visual study, following the tools; original Procreate reference retained from B |
| 006 Colourful cartoon | Character sheets, Claude sprite development and a functioning animation prototype | First expanded process study |
| 035 Robots | Midjourney concept, illustration refinement and a connected generation canvas | Second three-stage study, followed by the actual canvas |
| 012 Seascape + 011 Watercolour | Different visual pacing; prepared assets and code-assisted animation | Dedicated quieter chapter |
| 023 Dinosaurs | Four explicitly selected/rejected image directions, asset isolation and failed motion attempts | Comparison followed by a three-stage process row |
| 040 Library | Existing owl failures, selected take, node workflow and final composite | Dark chapter preserves the useful evidence from B |
| 009 Space, 016 Rocket, 013 Animals, 020 Blocks, 030 Medieval | Diversity of theme and method | Large two-column animation collection |
| 003 Shapes, 018 Clouds, 036 Rain window, 043 Paper | Additional visual range | Clearly labelled still-study strip |
| Existing browser tool and After Effects tool | The first step: building tools for repeated countdown setup | Opening chapter, before animation experiments; robot sequence diagram stays with the robot study |

The new material replaces the need to lead with broad production claims. First-person copy focuses on trying, reviewing, preparing and learning. The project context remains 45 classroom timers for ClickView, with primary students as the audience, inherited from the user-confirmed A/B content. No measured outcomes, model rankings or client endorsements are added.

## Visual direction

A typographic editorial composition informed by Japanese graphic design: oversized tight-set typography, asymmetric title and description, numbered studies, strong rules, intentional paper/ink space and selective colour. Vermilion identifies the notebook voice; chartreuse introduces the brief; a muted green chapter changes the pacing; black gives the generation studies focus; cobalt distinguishes creative tooling. These are choices about composition and colour, rather than decorative Japanese text or invented cultural motifs.

Process rows remain visible in threes on desktop and stack in source order on mobile. Chapters use vertical space instead of accordions or click-only descriptions. The supporting context is compact. Tool-building introduces the project as its first step, followed by the drawing-to-animation row and the wider visual experiments.

## Attribution and editorial boundaries

- Original illustration, library and production-tool credits come from `content.js` and B.
- The new robot concept is labelled Midjourney because the source filename explicitly identifies it. The following pass is labelled illustration, without assuming a particular illustration application or motion model.
- The dinosaur tool names and selection statuses match the supplied filenames. They describe these individual studies, not comparative tool performance.
- Claude is named where the relevant source filenames or existing case study identify it.
- Unknown tools are described by process stage. No exact prompts are transcribed from small UI screenshots.
- Still-only treatments are identified as such. The collection does not pretend that every source folder contains a working animation export.

## Media preparation

The 91 new source files are Git LFS pointers in this checkout, totalling approximately 1.72 GB of referenced media. For review, selected original files were retrieved from this repository's public GitHub media endpoint into a temporary review directory and verified against their SHA-256 pointer values. Original pointers and A/B assets were left unchanged.

`assets/design-c/` contains 51 resized WebP stills, 13 silent H.264 preview clips with posters, and `media-manifest.json` mapping derivatives to source files. Motion exports are up to 24 seconds long and 960 pixels wide. Existing MP4s are reused for the robot, library and production-tool demonstrations. Preview clips derived from the supplied 5× GIFs retain that source timing and are labelled 5×. Other clips are labelled process recordings, tests or excerpts. These are presentation previews, not full-duration final exports.

Media below the viewport has no active video source until needed. Visible previews loop muted; leaving the viewport or hiding the tab pauses playback. Individual pause choices persist across scrolling. The master switch pauses all media, including locally started playback; reduced-motion preferences suppress automatic playback. Explicit local playback remains available. Failure states retain posters. Content and posters remain visible without JavaScript.

## Validation

Desktop and mobile browser checks cover layout overflow, media loading, section navigation, global and individual playback, reduced motion, and missing assets. A and B are compared with their tracked versions to confirm their only edits are C navigation links. C is a local iteration, not a deployed site.

## Animal character development addition

The animal folder now includes two additional files named `013-workflow 1 (image generation via midjourney)`, supplied as MP4 and WebM. The MP4 was retrieved and SHA-256 verified along with the previously unused `013-workflow.gif`. The WebM remains an alternative supplied file and was not needed for this addition.

The MP4 shows grids of animal musicians and dancers, with variations in costumes, instruments, poses and character design. The GIF shows isolated animal references connected to instructions and motion-generation steps. C now places these recordings beside the finished animal timer in a new three-stage study between the sprite and robot studies. This supports a distinct character-development example rather than another finished-output gallery entry.

Two full-length, silent H.264 derivatives and posters are saved in `assets/design-c/` with source mappings in the manifest. No motion model is inferred from the small canvas text; Midjourney attribution follows the supplied recording name. No individual concept is labelled selected or rejected without supporting evidence. A and B are unchanged by this addition.

## Learning and tool-recognition pass

C now makes the technical handoffs explicit without changing the order of the project: tools first, then character development and motion studies. A compact technique index points to timer tooling, character exploration, generated motion and compositing.

Eight always-visible “Under the hood” notes explain the input, handoff and review criteria for the corresponding evidence. Each has a small practice exercise. These exercises are new suggested learning activities, not quoted production prompts or claims about hidden implementation details. The sprite frame test and cast preview now remain visible as separate evidence images.

Tool names in stage labels, workflow chains, image comparisons and credits are paired with real brand artwork. Adobe, Procreate and Grok use assets from their official domains; other marks use established SVG brand reproductions from the LobeHub icon catalogue. Logos preserve their colours and proportions, with accessible names beside them. ByteDance's mark identifies the Seedance model family. Source URLs and checksums are recorded in `assets/design-c/logos/SOURCES.md`. No generated logo artwork or typed monogram substitutes are used.

All 25 motion instances now have replay, elapsed/duration display and keyboard-operable scrub controls. Scrubbing pauses the clip at the selected point; replay restarts it. A blob fallback on explicit seek supports simple local static servers that lack byte-range responses. Media still loads only when needed. Still evidence opens at the available image resolution in a new tab, with that behaviour included in its accessible label. Source 5× timing labels remain separate from playback controls.

Validation includes five viewport widths, logo/image loading, console errors, seek accuracy, replay and global pause, in addition to the earlier playback and reduced-motion checks. No changes to A or B were made in this pass.

## Quieter tool credits

Application badges now use smaller marks and plain inline labels without bordered white containers. Brand colours remain intact. User-confirmed correction: generated motion uses Runway and composition uses After Effects. The robot combined-stage label, animal motion/composition labels and routes, and library motion credit reflect this correction.

## Progressive media loading and size audit

C now warms the first two previews after the initial page load, then prepares approaching sections through a bounded priority queue. This supersedes the earlier just-in-time source hydration and seek-only blob fallback: a shared, size-budgeted blob cache now supports both instant reuse and reliable scrubbing. Posters are independent responsive lazy images. The queue caps fetches at two (one on constrained links), cancels obsolete speculative work, and preserves visible-only playback and user pauses.

Selected desktop encodes and smaller mobile variants live in `assets/design-c/optimized/`; source media stays intact. See `MEDIA-PERFORMANCE.md` for measured before/after results, per-file savings, quality tradeoffs, validation and remaining hosting/editing opportunities. Repeatable generation and browser checks are saved under `scripts/`.
