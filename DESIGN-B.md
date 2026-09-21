# Design B — the work and the thinking

Preview `design-b.html`, or choose **B / Visual story** in the global tabs above the main navigation.

## Standing content rule

**Keep meaningful content visible. Only hide or collapse it when the user explicitly requests that.** Do not move process explanations, comparisons, demonstrations or asset briefs into accordions, tabs, drawers or click-only dialogs to shorten the page.

B now contains no accordions or dialogs. The hero tiles and overview links jump to visible sections. Native video controls start playback within the page; they do not conceal the surrounding story.

## Two reading speeds, one open page

The opening retains the large five-world composition and adds a compact four-part overview. The introduction, facts and overview contain about 180 words including navigation to all seven chapters. This provides the fast, roughly 90-second understanding: what the project is, what the designer contributed, and which skills it demonstrates.

The rest is a deliberately longer process story. Large headings, concise explanations, paired examples and visual sequences let a reader skim or follow the decisions in depth. The full visible main page contains approximately 1,550 words including captions, diagrams, tool names and controls. It is no longer presented as a complete 90-second read. The opening remains 177 words.

The user’s earlier direction remains: desktop first, large media, an original cohesive narrative, short clear copy, and placeholders only for identified gaps. No identity, contact fields, client claims or unverified impact figures have been added.

## What returned from A

| Original material | Where it appears in B |
| --- | --- |
| The repetitive production challenge and five workflow stages | 01 / The challenge: five illustrated stages, with the AI exploration stages identified |
| The browser timer prototype and its limitations | 02 / The experiments: inline recording and a clear explanation of the loss of creative control |
| The After Effects setup tool | Beside the prototype, with its own recording, lesson and editable-design rationale |
| Browser output versus designed output | Two large examples immediately below the experiments |
| Original drawing → AI motion → finished timer | 03 / The artwork: a visual sequence with short explanatory captions |
| Owl reference, rejected generations and approved motion | 04 / The judgment: four large, always-visible comparison panels, each explaining the decision |
| Node-based generation workflow | Wide inline recording with reference → prompt/motion → selection guide; three moving canvas close-ups paired with finished library details |
| Short clips, longer timers, loops and timed character events | 05 / The pacing: robot excerpt, three actual animation frames (rest → variation → recharged), and a four-track sequence diagram |
| Different tools for different visual worlds | 06 / The toolkit: four large examples with artwork, animation, music and assembly tool chains |
| A consistent system with varied outputs | 07 / The collection: context clip, collection narrative and final montage slot |
| Knowing what to hand over | Closing reflection and three practical takeaways |

The quiet pelican treatment is also shown at full width within a split composition, with its description visible. The toolkit retains the source’s specific tool attributions, including the distinct MiniMax routes, instead of inventing production details.

The robot sequence is a conceptual diagram, explicitly not to scale. Its sleeping loop, dream doodles, character twitches and final wake-up come from A; it does not invent a total duration or measured savings.

## Media and performance

### Development-media audit

The source `05-node.gif` contains the owl variants plus candle, hourglass, book, portrait and environment experiments. B now brings forward the candle, hourglass and book groups as animated crops of the existing `05-node.mp4`. They are paired with detail crops from frame 182 of the supplied `05-final.gif`. These show development elements in context, not a claim that every displayed candidate became the final selected take. The source footage and connectors are unmodified; no fake software interface or prompt text has been invented.

The RunwayML label follows the user's identification of this workflow. Original per-world model/tool credits remain unchanged. The owl direction is explicitly a summary from the existing case study, not a verbatim prompt.

Three additional WebP stills come from frames 0, 216 and 360 of `06-robot-timer.gif`. They demonstrate the finished sequence, not unsupported claims about separate robot source assets. Portrait and environment tests remain visible in the full canvas; they are not expanded into redundant extra case studies.

Six new WebP derivatives live in `assets/design-b/`: `library-candle`, `library-hourglass`, `library-book`, `robot-rest`, `robot-variation` and `robot-recharged`. The three cropped motion views share the already-used lightweight node MP4; no source GIFs or additional video exports are loaded. Their posters, copy and final stills remain visible without JavaScript.

Existing source assets remain intact. `assets/design-b/` contains WebP stills, including the newly restored owl reference. Existing lightweight MP4 previews in `assets/timer-lab-review/` provide the motion; the heavyweight source GIFs are not loaded.

Preview clips load when visible, pause offscreen and respect both individual pause choices and reduced-motion preferences. The four inline recordings—browser prototype, After Effects tool, node workflow and context clip—use native controls and do not autoplay. They prepare near the viewport, pause when scrolled away, and do not resume without a playback request. Starting one recording pauses another, and the global pause control stops recordings too.

The main story, captions, diagrams and native recording controls are available without JavaScript. B makes no external network requests.

## Identified media gaps

The connected-motion section has one new, compact placeholder: a 1080p-or-higher RunwayML recording showing the character reference connection, readable prompt and generated motion. The existing 960px-wide canvas shows the structure, but its tiny prompt text cannot be reliably read. Do not transcribe or invent exact prompts from it.

The existing final montage placeholder and its brief remain visible:

- A 15–20 second full-screen edit of the illustrated, weather, library and robot timers.
- Show their different pacing and character, ending on the supplied **Time’s up** typography.
- Include the intended music and sound; the GIF-derived previews are silent.
- Export 16:9 MP4 at 1920 × 1080 or higher.

The supplied `portfolio.mp4` is an 11-second laptop/context clip with black sections. It is shown inline as context, starting on its visible scene at two seconds. It does not replace the collection montage.

Some supplied previews and the illustrated character still are approximately 800px wide. Original 1080p or 4K exports would sharpen large-screen presentation; existing work is shown in the meantime.

## Files and verification

- `design-b.html`: the complete visible story, media and diagrams.
- `design-b.css`: the visual system, expanded process layouts and responsive rules.
- `design-b.js`: viewport-aware previews, inline recording behaviour and navigation progress.
- `design-switcher.css`: the shared A/B navigation.

Browser checks passed at 320, 375, 390, 768, 1024, 1512, 1920 and 2560px without horizontal overflow. All three main navigation links stay available on phones. Verified that there are no accordions, dialogs or modal-only content triggers; all referenced images and anchors resolve.

All four inline recordings play and pause offscreen. Global pause, persistent individual pause, reduced-motion defaults, content visibility without JavaScript and A/B navigation were verified. No page script errors or missing assets were reported.
