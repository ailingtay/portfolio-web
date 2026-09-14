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
  hero: { type: 'placeholder', label: 'Your showreel or signature image', aspectRatio: '5 / 4', playback: 'preview' },
  project: {
    title: '[Your featured project]',
    summary: '[Introduce the project: what it is, who it was for, and the idea at its heart.]',
    category: 'Featured story',
    metadata: [
      { label: 'My role', value: '[Your contribution]' },
      { label: 'Discipline', value: '[Creative disciplines]' },
      { label: 'Year', value: '[Project year]' }
    ],
    cover: { type: 'placeholder', label: 'Project opening image or film', aspectRatio: '16 / 10', playback: 'manual' },
    sections: [
      { id: 'context', label: '01 / The starting point', title: 'Every project starts\nwith a question.', body: '[Describe the brief, audience, and challenge. What needed to change, and what made this problem interesting? Make your responsibility within the team clear.]', media: [] },
      { id: 'approach', label: '02 / Creative approach', title: 'Finding the thread.', body: '[Explain the central idea and why you chose it. Share the references, constraints, and creative decisions that shaped the direction.]', media: [{ type: 'placeholder', label: 'References, sketches or an early direction', aspectRatio: '4 / 3' }] },
      { id: 'process', label: '03 / Behind the scenes', title: 'Make. Test.\nMake it better.', body: '[Walk through a meaningful experiment or iteration. Show what you tried, what you learned, and how that changed the work.]', mediaLayout: 'pair', media: [{ type: 'placeholder', label: 'Process study 01', aspectRatio: '4 / 5', playback: 'preview' }, { type: 'placeholder', label: 'Process study 02', aspectRatio: '4 / 5', playback: 'preview' }] },
      { id: 'final-work', label: '04 / The final work', title: 'The idea, brought to life.', body: '[Introduce the finished piece. Highlight the details that best demonstrate your craft and how the result answers the original brief.]', media: [{ type: 'placeholder', label: 'Final film or large-format photograph', aspectRatio: '16 / 9', playback: 'manual' }] },
      { id: 'reflection', label: '05 / Looking back', title: 'What stayed with me.', body: '[Share an outcome you can substantiate, feedback you received, or a lesson you took forward. Explain what you would explore next.]', media: [] }
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
