export const CATEGORY_COLORS: Record<string, string> = {
  'Time & Nature':          '#6366F1',
  'Time & Calendar':        '#818CF8',
  'Elements & Nature':      '#10B981',
  'Body':                   '#F59E0B',
  'Numbers':                '#3B82F6',
  'Colors':                 '#EC4899',
  'Food & Drink':           '#F97316',
  'Verbs':                  '#84CC16',
  'Social & Relationships': '#EF4444',
  'Family & People':        '#06B6D4',
  'Abstract':               '#8B5CF6',
  'Emotions':               '#F43F5E',
  'Knowledge & Culture':    '#14B8A6',
  'Daily Life':             '#D97706',
}

// Hand-tuned node positions in an 820×580 canvas
export const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  // Time & Nature — top left
  night:  { x: 90,  y: 80  },
  day:    { x: 165, y: 60  },
  sun:    { x: 195, y: 130 },
  moon:   { x: 115, y: 145 },

  // Time & Calendar — center top-left
  month:  { x: 195, y: 215 },
  year:   { x: 135, y: 240 },

  // Elements & Nature — left
  water:  { x: 75,  y: 220 },
  fire:   { x: 75,  y: 300 },

  // Body — left-center
  heart:  { x: 80,  y: 390 },
  hand:   { x: 155, y: 350 },
  eye:    { x: 155, y: 430 },
  mouth:  { x: 80,  y: 460 },

  // Social & Relationships — bottom left
  friend: { x: 175, y: 520 },

  // Family & People — bottom center-left
  mother: { x: 270, y: 510 },
  child:  { x: 340, y: 540 },

  // Numbers — bottom center
  one:   { x: 370, y: 490 },
  two:   { x: 430, y: 515 },
  three: { x: 400, y: 455 },

  // Verbs — center (visual hub)
  eat:   { x: 310, y: 320 },
  speak: { x: 360, y: 280 },
  go:    { x: 425, y: 260 },
  give:  { x: 470, y: 300 },
  see:   { x: 465, y: 360 },
  know:  { x: 410, y: 390 },

  // Abstract / Emotions — center
  time:  { x: 320, y: 190 },
  love:  { x: 250, y: 390 },

  // Colors — right center
  red:   { x: 580, y: 390 },
  white: { x: 640, y: 430 },
  black: { x: 610, y: 480 },

  // Food & Drink — bottom right
  bread: { x: 570, y: 510 },
  wine:  { x: 650, y: 495 },
  fish:  { x: 700, y: 445 },

  // Daily Life — right
  house: { x: 710, y: 340 },
  door:  { x: 755, y: 400 },

  // Knowledge & Culture — top right
  book:   { x: 660, y: 130 },
  school: { x: 730, y: 190 },

  // Time & Nature (astronomical) — top right
  // sun & moon already placed top-left

  // Catch-all fallback handled in component
}

export const ETYMOLOGY_EDGES: Array<{ source: string; target: string; strength: 'strong' | 'medium' | 'weak' }> = [
  // Latin amare family
  { source: 'love', target: 'friend', strength: 'strong' },
  // Moon/month
  { source: 'moon', target: 'month', strength: 'strong' },
  // Sun/day
  { source: 'sun', target: 'day', strength: 'medium' },
  // Time cluster
  { source: 'time', target: 'year', strength: 'strong' },
  { source: 'time', target: 'month', strength: 'medium' },
  { source: 'time', target: 'day', strength: 'medium' },
  { source: 'time', target: 'night', strength: 'weak' },
  { source: 'day', target: 'night', strength: 'medium' },
  { source: 'year', target: 'month', strength: 'medium' },
  // Body/emotions
  { source: 'heart', target: 'love', strength: 'medium' },
  // Knowledge
  { source: 'book', target: 'school', strength: 'strong' },
  { source: 'book', target: 'know', strength: 'medium' },
  { source: 'school', target: 'know', strength: 'medium' },
  // PIE *weyd- see/know
  { source: 'see', target: 'know', strength: 'strong' },
  // House/door
  { source: 'house', target: 'door', strength: 'strong' },
  // Numbers
  { source: 'one', target: 'two', strength: 'medium' },
  { source: 'two', target: 'three', strength: 'medium' },
  { source: 'one', target: 'three', strength: 'weak' },
  // Colors
  { source: 'red', target: 'white', strength: 'medium' },
  { source: 'white', target: 'black', strength: 'medium' },
  { source: 'red', target: 'black', strength: 'weak' },
  // Food/eat
  { source: 'bread', target: 'eat', strength: 'strong' },
  { source: 'wine', target: 'eat', strength: 'medium' },
  { source: 'fish', target: 'eat', strength: 'medium' },
  { source: 'bread', target: 'wine', strength: 'medium' },
  // Water/fire/nature
  { source: 'water', target: 'fire', strength: 'weak' },
  { source: 'water', target: 'fish', strength: 'strong' },
  // Family
  { source: 'mother', target: 'child', strength: 'strong' },
  { source: 'mother', target: 'friend', strength: 'weak' },
  { source: 'child', target: 'friend', strength: 'weak' },
  // Speak/know/see (communication cluster)
  { source: 'speak', target: 'know', strength: 'weak' },
  { source: 'speak', target: 'see', strength: 'weak' },
  // Action cluster
  { source: 'go', target: 'give', strength: 'weak' },
  { source: 'eat', target: 'give', strength: 'weak' },
  // Social
  { source: 'friend', target: 'love', strength: 'medium' },
  { source: 'give', target: 'friend', strength: 'weak' },
  // Night/moon
  { source: 'night', target: 'moon', strength: 'medium' },
]
