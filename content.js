/* All portfolio copy and media live here. See README.md for editing examples. */
window.PORTFOLIO = {
  name: 'Your name',
  page: {
    headerNote: 'Independent perspective.', heroCaption: 'Motion. Image. Ideas.',
    workEyebrow: 'A closer look', workHeading: 'Selected work,\nand what went into it.',
    workIntro: 'One story in depth. A few more things in motion.',
    galleryHeading: 'Work index', galleryNote: 'A collection of explorations. Select a piece to take a look. ↗',
    aboutEyebrow: 'The person behind the work', aboutNote: 'Always curious. Always making.',
    footerNote: 'Selected work & creative process'
  },
  discipline: 'Motion & multidisciplinary design',
  headline: 'Ideas take shape.\nStories come alive.',
  introduction: '[Introduce yourself in one or two sentences. Describe what you create, what interests you, and the perspective you bring to your work.]',
  disciplines: ['Motion design', 'Art direction', 'Visual storytelling', 'Creative exploration'],
  hero: { type: 'image', src: 'assets/timer-lab/00-laptop.png', alt: 'The AI Timer Lab shown on a laptop', label: 'The AI Timer Lab', aspectRatio: '5 / 4' },
  project: {
    title: 'The AI Timer Lab',
    kicker: '45 classroom timers. 30 seconds to 60 minutes. One repetitive production challenge.',
    summary: 'I needed to create a full set of countdown timers for teachers, from quick transitions to longer independent work sessions.\n\nDoing all 45 manually in After Effects meant duplicating the same setup again and again.\n\nSo I used the project to test a different workflow:\n\n**Where could AI speed things up without making the work feel generic?**',
    category: 'Featured story',
    metadata: [
      { label: 'My role', value: 'Concept, visual design, motion design, AI experimentation and production' },
      { label: 'Disciplines', value: 'AI video · Motion design · Visual design · Creative tooling' },
      { label: 'Year', value: '2026' }
    ],
    lead: { type: 'image', src: 'assets/timer-lab/00-laptop.png', alt: 'Laptop interface reference for The AI Timer Lab', label: 'Laptop interface reference', aspectRatio: '1423 / 1024' },
    sections: [
      {
        id: 'context', label: '01 / The challenge', title: '45 Timers, One system',
        body: 'Each timer had the same basic production steps.\n\nAcross 45 timers, the repeated setup quickly started to add up.\n\nI didn’t want AI to make the whole thing for me, so I broke the process into stages and tested where it could actually save time.\n\nThe question became:\n\n**Where was AI genuinely useful, and where was it better to stay hands-on?**',
        workflow: {
          title: 'Production workflow', footer: 'AI tested here', testedCount: 4,
          items: [
            { label: '01 Ideation', src: 'assets/timer-lab/01-workflow-ideation.png', alt: 'Ideation lightbulb illustration' },
            { label: '02 Assets', src: 'assets/timer-lab/01-workflow-assets.png', alt: 'Stack of visual assets illustration' },
            { label: '03 Animation', src: 'assets/timer-lab/01-workflow-animation.png', alt: 'Animation film frame illustration' },
            { label: '04 Audio', src: 'assets/timer-lab/01-workflow-audio.png', alt: 'Audio music notes illustration' },
            { label: '05 Export', src: 'assets/timer-lab/01-workflow-export.png', alt: 'Export upload illustration' }
          ]
        }
      },
      {
        id: 'test-one', label: '02 / Test one', title: 'Could AI build the whole timer?',
        body: 'I started with the most repetitive part: the countdown itself.\n\nUsing Claude, I built a small browser-based tool that could generate and export a 16:9 timer in a few clicks.\n\nTechnically, it worked.\n\nCreatively, I lasted about five minutes before missing After Effects.\n\nThe app made the setup faster, but I lost too much control over typography, animation and the overall finish.\n\nThe first experiment gave me a useful answer:\n\n**Automating the entire workflow wasn’t actually the goal.**\n\nThe better question was what to automate inside the workflow I already liked.',
        inlineMedia: { afterParagraph: 2, fullWidth: true, media: { type: 'image', src: 'assets/timer-lab/02-timer-app.gif', alt: 'Claude timer generator app interface', label: 'Timer generator app', aspectRatio: '960 / 703' } },
        mediaGroups: [
          { layout: 'pair', items: [
            { type: 'image', src: 'assets/timer-lab/02-compare1.png', alt: 'Timer without After Effects', label: 'Timer without After Effects', caption: 'Timer without After Effects', aspectRatio: '16 / 9' },
            { type: 'image', src: 'assets/timer-lab/02-compare2.png', alt: 'Timer with After Effects', label: 'Timer with After Effects', caption: 'Timer with After Effects', aspectRatio: '16 / 9' }
          ] }
        ]
      },
      {
        id: 'test-two', label: '03 / Test two', title: 'Automate the boring part instead',
        body: 'Rather than replacing After Effects, I brought the automation into it.\n\nI built a plugin that automatically created the basic timer structure inside After Effects.\n\nThe repetitive setup became almost instant, while the parts I wanted to design stayed fully editable — typography, colour, animation and effects.\n\nThat worked much better as I could speed up the setup without changing the way I actually wanted to work.',
        inlineMedia: { afterParagraph: 2, fullWidth: true, media: { type: 'image', src: 'assets/timer-lab/03-AE-plugin.gif', alt: 'After Effects timer setup plugin', label: 'After Effects plugin in action', aspectRatio: '960 / 586' } }
      },
      {
        id: 'directing-motion', label: '04 / Directing AI motion', title: 'Could I animate artwork I had already designed?',
        body: 'Some of the timers were built around illustrated scenes.\n\nInstead of generating the whole visual from scratch, I created the artwork first and then used AI to explore movement.\n\nThis gave me much more control over the final result. The composition, palette and style were already locked in, so AI was helping with movement rather than making the visual decisions.',
        inlineMedia: { afterParagraph: 2, fullWidth: true, workflow: { items: [
          { label: 'Illustration', src: 'assets/timer-lab/04-drawing.png', alt: 'Illustration for the timer scene' },
          { label: 'AI motion', src: 'assets/timer-lab/04-movement.gif', alt: 'AI motion exploration' },
          { label: 'Final timer', src: 'assets/timer-lab/04-final-timer.gif', alt: 'Final timer result' }
        ] } }
      },
      {
        id: 'getting-movement-right', label: '05 / Getting the movement right', title: 'The first generation was rarely the final one',
        body: 'This became one of the most useful parts of the project.\n\nA generated clip could look impressive and still be completely wrong for the job.\n\nFor classroom timers, movement needed to feel alive without becoming distracting.\n\nSo I started judging outputs less on whether they looked “AI impressive” and more on whether they actually worked in context.\n\nI kept the process open and practical: test a prompt, review the movement, then adjust or reject it.',
        comparison: {
          items: [
            { title: 'Reference image', media: { type: 'image', src: 'assets/timer-lab/05-owl reference.png', alt: 'Owl reference image', label: 'Reference image', aspectRatio: '3381 / 1902' } },
            { title: 'Failed generation 01', media: { type: 'image', src: 'assets/timer-lab/05-owl-bad-1.gif', alt: 'Failed owl generation with an unwanted forest background', label: 'Failed generation 01', aspectRatio: '800 / 457', playback: 'preview' }, notes: [
              { label: 'Review', text: 'The motion worked, but the model introduced a forest background and changed the framing.' },
              { label: 'Next steps', text: 'Constrain framing, background and camera movement.' }
            ] },
            { title: 'Failed generation 02', media: { type: 'image', src: 'assets/timer-lab/05-owl-bad-2.gif', alt: 'Failed owl generation with extra books and unstable movement', label: 'Failed generation 02', aspectRatio: '800 / 457', playback: 'preview' }, notes: [
              { label: 'Review', text: 'The background stayed intact, but extra books appeared and the movement still felt unstable.' },
              { label: 'Next steps', text: 'Lock the object count and placement, and reduce the amount of movement.' }
            ] },
            { title: 'Approved generation', media: { type: 'image', src: 'assets/timer-lab/05-owl-approved.gif', alt: 'Approved owl generation controlled enough for the final timer', label: 'Approved generation', aspectRatio: '800 / 457', playback: 'preview' }, notes: [
              { label: 'Approved · Controlled enough to be used', text: 'The composition stayed close to the reference, while the movement was subtle enough to use in the final timer.' }
            ] }
          ]
        },
        mediaGroups: [{ layout: 'stack', items: [
          { type: 'image', src: 'assets/timer-lab/05-node.gif', alt: 'Node-based generation workflow', label: 'Node workflow', caption: 'Node based diagram', aspectRatio: '960 / 753', playback: 'preview' },
          { type: 'image', src: 'assets/timer-lab/05-final.gif', alt: 'Final AI motion result', label: 'Final result', caption: 'Final timer', aspectRatio: '16 / 9', playback: 'preview' }
        ] }]
      },
      {
        id: 'longer-timers', label: '06 / The five-second problem', title: 'Making a few seconds last much longer',
        body: 'AI video worked well for short moments, but even the more advanced models were limited to clips of around 30 seconds.\n\nIn practice, shorter generations often gave me better results anyway. The problem was that some of the timers needed to run for several minutes.\n\nGenerating the full duration would have taken more time, cost more, and given me less control over the final sequence.\n\nSo instead, I used short clips where they were most useful, then built the longer timers from loops and smaller events.\n\nFor the robot timer, the sleeping loop could carry most of the runtime, with dream doodles, small twitches and a final wake-up moment added at intervals.\n\nIt was a more practical way to build longer timers, and also gave me much more control over pacing.',
        timeline: {
          media: { type: 'image', src: 'assets/timer-lab/06-robot-timer.gif', alt: 'Robot timer loop with a fully charged in title card', label: 'Robot timer loop', aspectRatio: '16 / 9', playback: 'preview' },
          legend: [
            { label: 'Base sleeping loop', kind: 'loop' },
            { label: 'Ambient events', kind: 'dream' },
            { label: 'Smaller character events', kind: 'twitch' },
            { label: 'Larger character events', kind: 'wake' }
          ],
          ticks: [
            { label: '00:00', position: 0 },
            { label: '04:00', position: 19.4 },
            { label: '08:00', position: 39 },
            { label: '12:00', position: 59.5 },
            { label: '16:00', position: 81.2 },
            { label: 'End', position: 100 }
          ],
          events: [
            { label: 'Dream doodles A', position: 17, kind: 'dream' },
            { label: 'Twitch A', position: 28, kind: 'twitch' },
            { label: 'Dream doodles B', position: 39, kind: 'dream' },
            { label: 'Twitch B', position: 45, kind: 'twitch' },
            { label: 'Dream doodles C', position: 63, kind: 'dream' },
            { label: 'Twitch C', position: 75, kind: 'twitch' },
            { label: 'Dream doodles D', position: 85, kind: 'dream' },
            { label: 'Twitch D', position: 96.7, kind: 'twitch' },
            { label: 'Wake up', position: 100, kind: 'wake' }
          ]
        }
      },
      {
        id: 'different-tools', label: '07 / Different tools, different jobs', title: 'Finding the right tool for each part',
        body: 'By this point, I had stopped looking for one perfect workflow and realised that different timers needed different approaches.\n\nThere wasn’t one workflow that worked for everything. I used different tools depending on what each timer needed.',
        toolSystems: {
          items: [
            {
              title: 'Timer A', media: { type: 'image', src: 'assets/timer-lab/07-timer-a.png', alt: 'Timer A with a yellow illustrated character and colourful rays', label: 'Timer A', aspectRatio: '16 / 9' },
              steps: [
                { label: 'Assets', sublabel: 'Procreate', tools: [{ name: 'Procreate', src: 'assets/timer-lab/07-procreate.png' }] },
                { label: 'AI motion', sublabel: 'MiniMax H3 via RunwayML', tools: [{ name: 'MiniMax H3', src: 'assets/timer-lab/07-minimax.png' }] },
                { label: 'AI music', sublabel: 'ElevenLabs', tools: [{ name: 'ElevenLabs', src: 'assets/timer-lab/07-elevenlabs.png' }] },
                { label: 'Assembly', sublabel: 'After Effects', tools: [{ name: 'After Effects', src: 'assets/timer-lab/07-after-effects-icon.png' }] }
              ]
            },
            {
              title: 'Timer B', media: { type: 'image', src: 'assets/timer-lab/07-timer-b.png', alt: 'Timer B with illustrated weather characters', label: 'Timer B', aspectRatio: '16 / 9' },
              steps: [
                { label: 'Assets', sublabel: 'Photoshop + Illustrator', tools: [{ name: 'Photoshop', src: 'assets/timer-lab/07-photoshop.png' }, { name: 'Illustrator', src: 'assets/timer-lab/07-illustrator.png' }] },
                { label: 'AI animation', sublabel: 'Claude', tools: [{ name: 'Claude', src: 'assets/timer-lab/07-claude.png' }] },
                { label: 'AI music', sublabel: 'ElevenLabs', tools: [{ name: 'ElevenLabs', src: 'assets/timer-lab/07-elevenlabs.png' }] },
                { label: 'Assembly', sublabel: 'After Effects', tools: [{ name: 'After Effects', src: 'assets/timer-lab/07-after-effects-icon.png' }] }
              ]
            },
            {
              title: 'Timer C', media: { type: 'image', src: 'assets/timer-lab/07-timer-c.png', alt: 'Timer C with an owl and hourglass in a library', label: 'Timer C', aspectRatio: '16 / 9' },
              steps: [
                { label: 'Assets', sublabel: 'ChatGPT + Gemini Flow', tools: [{ name: 'ChatGPT', src: 'assets/timer-lab/07-chatGPT.png' }, { name: 'Gemini', src: 'assets/timer-lab/07-gemini.png' }] },
                { label: 'AI animation + motion', sublabel: 'Claude + MiniMax H3 via Elevenlabs', tools: [{ name: 'Claude', src: 'assets/timer-lab/07-claude.png' }, { name: 'MiniMax H3', src: 'assets/timer-lab/07-minimax.png' }] },
                { label: 'AI music', sublabel: 'ElevenLabs', tools: [{ name: 'ElevenLabs', src: 'assets/timer-lab/07-elevenlabs.png' }] },
                { label: 'Assembly', sublabel: 'After Effects', tools: [{ name: 'After Effects', src: 'assets/timer-lab/07-after-effects-icon.png' }] }
              ]
            },
            {
              title: 'Timer D', media: { type: 'image', src: 'assets/timer-lab/07-timer-e.png', alt: 'Timer D with colourful Time’s up lettering', label: 'Timer D', aspectRatio: '16 / 9' },
              steps: [
                { label: 'Assets', sublabel: 'Illustrator', tools: [{ name: 'Illustrator', src: 'assets/timer-lab/07-illustrator.png' }] },
                { label: 'Animation', sublabel: 'After Effects', tools: [{ name: 'After Effects', src: 'assets/timer-lab/07-after-effects-icon.png' }] },
                { label: 'AI music', sublabel: 'ElevenLabs', tools: [{ name: 'ElevenLabs', src: 'assets/timer-lab/07-elevenlabs.png' }] },
                { label: 'Assembly', sublabel: 'After Effects', tools: [{ name: 'After Effects', src: 'assets/timer-lab/07-after-effects-icon.png' }] }
              ]
            }
          ]
        }
      },
      {
        id: 'final-system', label: '08 / The final system', title: 'A system that kept the work varied',
        body: 'The project wasn’t about making one good AI clip. It was about finding a way to make 45 timers without everything feeling the same.\n\nBy the end, the workflow was a mix of reusable setup, AI-assisted motion, generated video, loops, manual animation and finishing in After Effects.\n\nThe goal was consistency without making everything identical. Each timer still had its own theme, pacing and personality, but the production system made the full set manageable.',
        mediaGroups: [{ layout: 'stack', items: [{ type: 'placeholder', label: 'Full-width video reel of the finished timers', aspectRatio: '16 / 9', playback: 'manual' }] }]
      },
      {
        id: 'reflection', label: '09 / What I took from it', title: 'Knowing what to hand over',
        body: 'I started out thinking this project was mostly about making things faster.\n\nBy the end, I was more interested in knowing what was actually worth handing over to AI.\n\nSome things it was great at. Some needed a few tries. Some were better turned into a reusable tool. And some were honestly quicker to just make myself.\n\nAcross 45 timers, the workflow changed a lot. The useful part was getting better at knowing when to use AI, when to step back in, and when not to use it at all.',
        media: []
      }
    ]
  },
  gallery: [
    { title: '[Motion study]', category: 'Motion design', description: '[Describe the idea, your role, and one detail worth noticing.]', media: { type: 'placeholder', label: 'Motion study', aspectRatio: '4 / 3', playback: 'preview' } },
    { title: '[Visual world]', category: 'Art direction', description: '[Add a short introduction to this piece and your contribution.]', media: { type: 'placeholder', label: 'Visual world', aspectRatio: '3 / 2' } },
    { title: '[In the frame]', category: 'Photography', description: '[Describe the subject, intention, and creative choices.]', media: { type: 'placeholder', label: 'In the frame', aspectRatio: '3 / 4' } },
    { title: '[An experiment]', category: 'Creative exploration', description: '[What were you testing, and what did you discover?]', media: { type: 'placeholder', label: 'An experiment', aspectRatio: '1 / 1', playback: 'preview' } },
    { title: '[Moving image]', category: 'Film & motion', description: '[Introduce the film and your role in its making.]', media: { type: 'placeholder', label: 'Moving image', aspectRatio: '16 / 9', playback: 'manual' } },
    { title: '[A different angle]', category: 'Multidisciplinary', description: '[Describe the connection between the media or techniques used.]', media: { type: 'placeholder', label: 'A different angle', aspectRatio: '4 / 3' } }
  ],
  about: { title: 'A little about\nmy perspective.', body: '[Share a little about your background, how you approach creative work, and the kinds of opportunities you want to explore next.]' }
};
