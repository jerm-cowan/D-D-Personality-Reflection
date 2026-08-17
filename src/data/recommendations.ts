import type { DndRace, DndClass, DndAlignment, DndBackground } from '@/types'

// Static description catalog — used by the scoring engine to build explanations
// Scoring logic lives in scoring.ts; these are display-layer descriptions only

export const raceDescriptions: Record<DndRace, string> = {
  Human:      'Adaptable and ambitious, humans thrive in diverse roles.',
  Elf:        'Graceful and perceptive, elves value knowledge and tradition.',
  Dwarf:      'Steadfast and loyal, dwarves are defined by endurance.',
  Halfling:   'Resourceful and warm-hearted, halflings rely on luck and community.',
  Gnome:      'Curious and inventive, gnomes approach the world with wonder.',
  'Half-Elf': 'Versatile and empathetic, half-elves bridge different worlds.',
  'Half-Orc': 'Fierce and determined, half-orcs draw strength from hardship.',
  Tiefling:   'Resilient and independent, tieflings forge their own path.',
  Dragonborn: 'Proud and purposeful, dragonborn carry an innate sense of destiny.',
}

export const classDescriptions: Record<DndClass, string> = {
  Fighter: 'Disciplined combatants who master the art of physical conflict.',
  Rogue:   'Cunning operatives who rely on stealth, skill, and opportunity.',
  Wizard:  'Scholarly spellcasters who harness arcane knowledge.',
  Cleric:  'Devoted champions who draw power from faith and conviction.',
  Ranger:  'Self-reliant trackers equally at home in wilderness or society.',
  Bard:    'Inspiring performers who wield creativity and social influence.',
  Paladin: 'Oath-bound warriors who combine martial skill with spiritual purpose.',
  Druid:   'Naturalists who protect balance between civilization and the wild.',
}

export const alignmentDescriptions: Record<DndAlignment, string> = {
  'Lawful Good':    'You believe in justice, order, and protecting others.',
  'Neutral Good':   'You want to do what is right without being bound by rules.',
  'Chaotic Good':   'You prioritize helping others while valuing personal freedom.',
  'Lawful Neutral': 'You uphold structure and order as an end in itself.',
  'True Neutral':   'You seek balance and avoid extreme positions.',
  'Chaotic Neutral':'You value freedom and follow your own path above all.',
  'Lawful Evil':    'You pursue power and ambition within a structured framework.',
  'Neutral Evil':   'You act in self-interest without moral concern for others.',
  'Chaotic Evil':   'You act on impulse and desire, unconstrained by any code.',
}

export const backgroundDescriptions: Record<DndBackground, string> = {
  Scholar:        'Spent years in study, accumulating knowledge and insight.',
  Soldier:        'Trained for conflict, shaped by duty and discipline.',
  Outlander:      'Lived beyond civilization, relying on instinct and self-sufficiency.',
  Entertainer:    'Performed for crowds, honing expression and presence.',
  Acolyte:        'Served a religious institution, guided by faith and ritual.',
  Criminal:       'Operated outside the law, surviving by wit and nerve.',
  Noble:          'Born into privilege, accustomed to leadership and expectation.',
  'Folk Hero':    'Rose from humble origins to defend their community.',
  Hermit:         'Withdrew from society to seek answers through solitude.',
  'Guild Artisan':'Built a livelihood through craft, trade, and professional networks.',
}
