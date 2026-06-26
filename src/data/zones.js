// Zone metadata + unlock order (example content pack).
//
// A "zone" is a topic/unit. This file is CONTENT, not engine: swap it (or
// provide a different content pack) to retarget the game to a new subject. The
// engine only needs `id` + order; screens use the name/theme/accent.
//
// `accent` is the design-token color family (see tailwind.config.js) so each
// zone can theme its accent. Names/themes are neutral placeholders — replace
// them with your subject's units.

export const ZONES = [
  {
    id: 'z1',
    name: 'The Wire',
    theme: 'Web and Virtualization',
    accent: 'zone1',
    order: 1,
    status: 'playable',
    concepts: ['Client/server', 'DNS and URLs', 'HTTP', 'web servers', 'virtualization'],
  },
  {
    id: 'z2',
    name: 'The Frontier',
    theme: 'Front End: Angular, React',
    accent: 'zone2',
    order: 2,
    status: 'playable',
    concepts: [
      'Components',
      'Angular bindings',
      'React hooks',
      'routing',
      'Virtual DOM',
    ],
  },
  {
    id: 'z3',
    name: 'The Engine Room',
    theme: 'Node JS',
    accent: 'zone3',
    order: 3,
    status: 'playable',
    concepts: [
      'Server-side scripting',
      'event loop',
      'modules',
      'NPM',
      'Express',
      'MVC',
    ],
  },
  {
    id: 'z4',
    name: 'The Vault',
    theme: 'Databases',
    accent: 'zone4',
    order: 4,
    status: 'locked-content',
    concepts: ['SQL', 'NoSQL', 'normalization', 'MongoDB', 'MVC'],
  },
  {
    id: 'z5',
    name: 'Checkpoint',
    theme: 'Web Security',
    accent: 'zone5',
    order: 5,
    status: 'placeholder',
    concepts: ['SKIP'],
  },
  {
    id: 'z6',
    name: 'Checkpoint',
    theme: 'Authentication and Authorization',
    accent: 'zone2',
    order: 6,
    status: 'placeholder',
    concepts: ['SKIP'],
  },
  {
    id: 'z7',
    name: 'Checkpoint',
    theme: 'Backend Frameworks',
    accent: 'zone3',
    order: 7,
    status: 'placeholder',
    concepts: ['SKIP'],
  },
  {
    id: 'z8',
    name: 'Checkpoint',
    theme: 'Application Programming Interface',
    accent: 'zone4',
    order: 8,
    status: 'placeholder',
    concepts: ['SKIP'],
  },
  {
    id: 'z9',
    name: 'Shipped',
    theme: 'Final full-stack delivery',
    accent: 'zone5',
    order: 9,
    status: 'placeholder',
    concepts: ['SKIP'],
  },
];

// Zone ids in unlock order.
export const ZONE_IDS = ZONES.map((z) => z.id);

// Look up a single zone's metadata by id (or null).
export function getZone(id) {
  return ZONES.find((z) => z.id === id) ?? null;
}
