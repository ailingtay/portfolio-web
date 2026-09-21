# Design B — the work and the thinking

Preview `design-b.html`, or choose **B / Visual story** in the global tabs above the main navigation.

## Standing content rule

**Keep meaningful content visible. Only hide or collapse it when the user explicitly requests that.** Do not move process explanations, comparisons, demonstrations or asset briefs into accordions, tabs, drawers or click-only dialogs to shorten the page.

B now contains no accordions or dialogs. The hero tiles and overview links jump to visible sections. Native video controls start playback within the page; they do not conceal the surrounding story.

## Two reading speeds, one open page

The opening is now an open-studio composition, led by “What happens if I try this?” Original artwork and a green-screen motion test sit beside their finished timer. A second branch shows the real connected canvas and an explicitly labelled owl-direction summary. This makes process, discovery and experimentation the first impression—not just a gallery of finished work.

The introduction, facts and four-discovery overview contain about 195 words, including navigation to all seven chapters, with short captions around the hero media. This supports a roughly 90-second orientation. The rest is a deliberately longer process story: approximately 1,730 words across the full main page including labels, captions, diagrams, tool names and controls. It is not presented as a complete 90-second read.

The editorial sequence is question → original character → generated misses and refinements → connected experiments and finished library → tooling rethink → longer sequences → varied workflows → collection and reflection. The tooling strand is explicitly introduced as a parallel enquiry; the layout does not invent a chronological cause-and-effect relationship between it and the motion tests.

The oversized plain-timer/designed-timer comparison has been folded into smaller evidence panels inside the two tool experiments. Both images and their meaning remain visible. The designed example is labelled as separately designed, not a one-click before/after transformation. The finished library now follows its tests and component development as the payoff. Its readable-prompt placeholder sits immediately beside the workflow explanation it would support.

The user’s earlier direction remains: desktop first, large media, an original cohesive narrative, short clear copy, and placeholders only for identified gaps. No identity, contact fields, client claims or unverified impact figures have been added.

## What returned from A

| Original material | Where it appears in B |
| --- | --- |
| The repetitive production challenge and five workflow stages | 01 / The question: five illustrated stages, with the AI exploration stages identified |
| The browser timer prototype and its limitations | 04 / Rethink the tool: inline recording and a clear explanation of the loss of creative control |
| The After Effects setup tool | Beside the prototype, with its own recording, lesson and editable-design rationale |
| Browser output versus designed output | Compact evidence within each tool experiment, not a standalone before/after spectacle |
| Original drawing → AI motion → finished timer | Hero and 02 / First, a character: a visual sequence with short explanatory captions |
| Owl reference, rejected generations and approved motion | 03 / Learn from the tests: four large, always-visible comparison panels, each explaining the decision |
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

The current playback implementation automatically plays muted, looping previews and the four inline recordings. Individual and global pause controls remain available; hidden-tab playback is paused. This narrative pass preserves the existing automatic-playback changes in `design-b.js` rather than restoring the earlier viewport-triggered policy. The hero reuses existing video files and requires no new media downloads from outside the project.

The main story, captions, diagrams and native recording controls are available without JavaScript. B makes no external network requests.

## Identified media gaps

The connected-motion section has one new, compact placeholder: a 1080p-or-higher RunwayML recording showing the character reference connection, readable prompt and generated motion. The existing 960px-wide canvas shows the structure, but its tiny prompt text cannot be reliably read. Do not transcribe or invent exact prompts from it.

No additional placeholders were introduced in this narrative pass. The two existing gaps are retained because they provide evidence missing from the inventory: readable instructions leading to generated motion, and a cohesive process-to-finish edit with sound. The montage brief is now:

- A 15–20 second edit from drawing → green-screen motion → connected tests → finished scene, then across the collection.
- Show their different pacing and character, ending on the supplied **Time’s up** typography.
- Include the intended music and sound; the GIF-derived previews are silent.
- Export 16:9 MP4 at 1920 × 1080 or higher.

The supplied `portfolio.mp4` is an 11-second laptop/context clip with black sections. It is shown inline as context, starting on its visible scene at two seconds. It does not replace the collection montage.

Some supplied previews and the illustrated character still are approximately 800px wide. Original 1080p or 4K exports would sharpen large-screen presentation; existing work is shown in the meantime.

## Files and verification

- `design-b.html`: the complete visible story, media and diagrams.
- `design-b.css`: the visual system, expanded process layouts and responsive rules.
- `design-b.js`: automatic playback, pause controls and navigation progress; unchanged in this narrative pass.
- `design-switcher.css`: the shared A/B navigation.

Browser checks passed at 320, 375, 390, 768, 1024, 1512, 1920 and 2560px without horizontal overflow. All three main navigation links stay available on phones. Verified that there are no accordions, dialogs or modal-only content triggers; all referenced images and anchors resolve.

The new narrative order, sequential chapter numbers, all anchor targets, hero automatic playback, individual/global pause, content visibility without JavaScript and A/B navigation were verified. No page script errors or missing assets were reported. Desktop and mobile hero, tooling and library-payoff screenshots were reviewed.
