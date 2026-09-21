# Featured story: alternate version

Open `http://127.0.0.1:8001/featured-story-review.html` while the existing preview server is running. This is a separate featured-project page; the original portfolio and its content are unchanged.

## Files

- `featured-story-review.html`: page shell and section navigation.
- `featured-story-review-content.js`: independent copy, media, captions, diagrams and sections. Edit this file for future copy or asset updates; reorder the `sections` array to reorder the story.
- `featured-story-review.css`: layout and typography for this version; it uses the existing `variables.css` design tokens.
- `featured-story-review.js`: renderer, media controls and navigation.
- `assets/timer-lab-review/`: optimised MP4 copies and static posters made from the existing GIFs. Source GIFs are preserved. These copies are silent because the source GIFs have no audio.

## What changed

Finished examples and the role summary appear at the top. The case study keeps all nine sections with shorter copy, larger supporting text, explanatory captions, section links, larger generation comparisons, and a collapsible node workflow. The final section shows existing timer excerpts in place of an empty reel placeholder. Timer A remains static in the tools comparison.

Short previews play muted while visible and have individual pause controls. A global motion button pauses or enables animated previews. Reduced-motion preferences disable automatic playback. App recordings and the node demonstration require a click and use native video controls. Missing media falls back to a grey box.

## Facts still to confirm

No project dates, client, team size, delivery status, measured savings or feedback were invented. Add these when confirmed:

- Whether 45 timers means distinct designs, duration variations or a mixture, and final delivery status.
- Project timeframe, collaborators and precise ownership of custom tool implementation.
- Any measured setup-time reduction or teacher feedback.
- What Claude contributed to the animation in the weather timer.
- The actual end time of the illustrated timeline; the supplied `End` label is preserved.

The opening stills and closing excerpts use available work. Replace or supplement the closing excerpts with a finished reel containing sound when available. To use one, set a media item to `type: 'video'`, provide `src`, `poster`, `caption` and `playback: 'manual'` in the content file. Use `playback: 'preview'` for a short muted looping clip.

## Validation

Checked the layout at 375, 768, 1024 and 1440px without page-level horizontal overflow. Workflow media keeps equal heights; its mobile strip and the timeline scroll within their own containers. Checked individual and global pause, section navigation, native video controls, offscreen pausing and the expandable node diagram. A temporary isolated fixture verified reduced-motion behaviour and the missing-image fallback, then was removed. All 42 referenced media paths exist. JavaScript syntax and whitespace checks pass. The original portfolio files were verified unchanged.

The ten converted video files total approximately 11.4MB, compared with 61.6MB for their source GIFs. Main narrative copy is approximately 402 words, excluding captions, metadata and diagram labels.
