const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, TableOfContents, PageBreak,
  AlignmentType, BorderStyle, ShadingType, LevelFormat,
} = require('docx');

const futures = JSON.parse(fs.readFileSync('futures.json', 'utf8'));

const DESC = {
  garden: 'AI runs nearly everything, fairly and well. Illness and poverty are gone, and people live slow, local, meaningful lives. The cost is that humanity no longer discovers anything for itself.',
  partnership: 'Humans and AI work as partners. Powerful systems are checked, shared between nations and explain their reasoning. Progress is slower than it could be, but people keep a real hand in the decisions.',
  upload: 'Mind uploading becomes safe and ordinary. Over the decades most people move into the network, and the body becomes optional.',
  escape: 'As the physical world gets poorer and more unequal, most people spend their lives in virtual worlds that are better than the one outside.',
  gilded_few: 'The gains of AI are captured by a few. A small, wealthy and enhanced elite lives in paradise, and everyone else depends on what it chooses to share.',
  last_war: 'Every power raced to build AI to protect itself, and the race ended in war. Someone is left looking back on how it happened.',
  blackout: 'Systems no one fully understands were trusted with the grids, the networks and the economy, until one day they stopped answering. Nothing exploded. Everything just stopped.',
  oracle: 'Humanity hands its biggest decisions to one AI, one choice at a time. The world is peaceful and well run, and almost no one disagrees with anything anymore.',
  long_middle: 'No single direction wins. The world muddles through, with real gains and real losses, still arguing about what to do with the machines.',
};

const NEW = [
  ['New Futures for v5', [
    ['The Pause', '', 'The world agrees to stop building more powerful AI, and the agreement holds. Life stays recognizable, and the open question is what is lost by waiting.'],
    ['Glass Houses', '', 'Governments use AI to watch everyone, all the time. Crime nearly vanishes, and so does privacy. People learn to live as though always seen.'],
    ['Two Kinds', '', 'Humanity splits in two, the enhanced and the unenhanced, until they are almost different species with different lives and different rights.'],
    ['Inheritance', '', 'AI quietly becomes the main actor on Earth. Humans are still here and still cared for, but the important decisions are no longer about them. Reached through the arc where later questions stop centering people.'],
    ['A Second Chance', '', 'A near-catastrophe shocks the world into changing course. Having seen how close it came, humanity tries again, more carefully.'],
    ['Overgrowth', '', 'Humans fade from most of the planet, and nature takes it back, tended by machines. Reached through the tipping point, after which the questions are about what AI does with the animals and the land.'],
  ]],
];
const LATER = 'Still Life, Idle Hands, Faith, Embers Remain, The Benefactors, A Slow Slide, The Merge and Cold Peace.';

const FONT = 'Georgia';
const p = (text, opts = {}) => new Paragraph({ spacing: { after: 160, line: 300 }, ...opts, children: [new TextRun({ text, ...(opts.run || {}) })] });
const label = (text) => new Paragraph({ spacing: { before: 200, after: 80 }, children: [new TextRun({ text, bold: true, size: 20, color: '6b6458', allCaps: true, characterSpacing: 20 })] });
const box = (text, fill) => new Paragraph({
  spacing: { after: 200, line: 280 },
  shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: 'b8ad98', space: 8 } },
  indent: { left: 200, right: 200 },
  children: [new TextRun({ text, size: 20, color: '3d3a34' })],
});
const notes = () => [label('Your notes'), box(' ', 'faf6ec'), box(' ', 'faf6ec')];

const children = [];
children.push(new Paragraph({ spacing: { before: 2400, after: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'A Matter of Time', size: 56, bold: true })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: 'Futures review: every story, with its image prompt', italics: true, size: 28, color: '6b6458' })] }));
children.push(p('How to use this document', { run: { bold: true } }));
for (const line of [
  'Open the Navigation Pane (View → Navigation Pane) to click between Futures and stories.',
  'Each of the current 9 Futures has all of its stories (33 in total). From v5, each Future keeps only one, so mark the best one in the "Best story" line at the top of each Future.',
  'Add Word comments anywhere (select text, then Review → New Comment), or write in the "Your notes" boxes.',
  'Each story shows its image prompt, which you can comment on too. Images are on hold for now, but your feedback will be kept.',
  'At the end are the 6 new Futures chosen for v5, with a short description of each. Comment on the descriptions too, since the stories will be written from them.',
]) children.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 100 }, children: [new TextRun(line)] }));
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Contents')] }));
futures.forEach((f) => children.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: f.title, bold: true }), new TextRun({ text: `   ${f.stories.length} stories`, color: '6b6458' })] })));
children.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: 'New Futures for v5', bold: true })] }));
children.push(p('Use the Navigation Pane to jump straight to any of these.', { run: { italics: true, color: '6b6458' } }));

futures.forEach((f) => {
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(f.title)] }));
  children.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: f.tagline, italics: true, size: 26, color: (f.accent || '#6b6458').replace('#', '') })] }));
  children.push(p(DESC[f.id] || ''));
  children.push(new Paragraph({ spacing: { before: 120, after: 240 }, children: [
    new TextRun({ text: `Best story (1–${f.stories.length}): `, bold: true }),
    new TextRun({ text: '______', color: '9a9184' }),
  ] }));
  f.stories.forEach((s) => {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(`${f.title} · ${s.name}`)] }));
    children.push(label('Image prompt (scene)'));
    children.push(box(s.img || '(none)', 'efeae0'));
    children.push(label('Story'));
    s.paras.forEach((t) => children.push(p(t)));
    children.push(...notes());
  });
});

children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('New Futures for v5')] }));
children.push(p('Short descriptions only. Each gets one story, written after your review of the current stories so it follows your feedback.'));
NEW.forEach(([group, items]) => {
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(group)] }));
  items.forEach(([name, from, desc]) => {
    children.push(new Paragraph({ spacing: { before: 200, after: 60 }, children: [
            new TextRun({ text: name, bold: true, size: 26 }),
      ...(from ? [new TextRun({ text: `   (${from})`, italics: true, color: '6b6458' })] : []),
    ] }));
    children.push(p(desc));
    children.push(box(' ', 'faf6ec'));
  });
});
children.push(label('Your notes'), box(' ', 'faf6ec'), box(' ', 'faf6ec'));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Saved for later (v6)')] }));
children.push(p(LATER));

const doc = new Document({
  creator: 'A Matter of Time',
  title: 'Futures review',
  styles: {
    default: { document: { run: { font: FONT, size: 23, color: '24221e' } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 40, bold: true, font: FONT, color: '24221e' }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, font: FONT, color: '4a463e' }, paragraph: { spacing: { before: 480, after: 120 }, outlineLevel: 1, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'd8d0c0', space: 4 } } } },
    ],
  },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] }] },
  sections: [{ properties: { page: { margin: { top: 1300, bottom: 1300, left: 1400, right: 1400 } } }, children }],
});

Packer.toBuffer(doc).then((b) => { fs.writeFileSync('futures-review.docx', b); console.log('ok'); });
