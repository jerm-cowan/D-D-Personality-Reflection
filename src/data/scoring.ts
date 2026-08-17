import type { Answers, AdventurerProfile, DndRace, DndClass, DndAlignment, DndBackground } from '@/types'
import {
  raceDescriptions,
  classDescriptions,
  alignmentDescriptions,
  backgroundDescriptions,
} from './recommendations'

type RaceScores      = Partial<Record<DndRace, number>>
type ClassScores     = Partial<Record<DndClass, number>>
type AlignmentScores = Partial<Record<DndAlignment, number>>
type BackgroundScores = Partial<Record<DndBackground, number>>

interface AnswerWeights {
  race?:       RaceScores
  class?:      ClassScores
  alignment?:  AlignmentScores
  background?: BackgroundScores
}

// Each answer option contributes points toward one or more recommendation categories.
// Weights: 3 = strong signal, 2 = moderate signal, 1 = weak signal.
// Moral Perspective (Q8, Q9) heavily influences Alignment.
// Relationship To Power (Q11) heavily influences Class.
// See BRIEF.md > Scoring Guidance for category intent.
const scoringMatrix: Record<string, AnswerWeights> = {
  // Q1 – Motivation: What would most likely convince you to begin an adventure?
  '1a': {
    class:      { Paladin: 3, Cleric: 2, Fighter: 1 },
    alignment:  { 'Lawful Good': 3, 'Neutral Good': 2, 'Chaotic Good': 1 },
    background: { 'Folk Hero': 3, Soldier: 2, Acolyte: 1 },
  },
  '1b': {
    race:       { Elf: 3, Gnome: 2 },
    class:      { Wizard: 3, Druid: 1 },
    alignment:  { 'True Neutral': 2, 'Lawful Neutral': 1 },
    background: { Scholar: 3, Hermit: 2 },
  },
  '1c': {
    race:       { Tiefling: 3, 'Half-Orc': 2 },
    class:      { Rogue: 3, Ranger: 2 },
    alignment:  { 'Chaotic Good': 3, 'Chaotic Neutral': 2 },
    background: { Outlander: 3, Criminal: 2 },
  },
  '1d': {
    race:       { Dragonborn: 3, Human: 2 },
    class:      { Bard: 3, Fighter: 2 },
    alignment:  { 'Lawful Good': 1, 'Chaotic Neutral': 1 },
    background: { Noble: 3, Entertainer: 2, Soldier: 1 },
  },

  // Q2 – Motivation: Which reward feels most meaningful?
  '2a': {
    race:       { Dragonborn: 3, Dwarf: 2 },
    class:      { Fighter: 2, Paladin: 3 },
    alignment:  { 'Lawful Good': 2, 'Lawful Neutral': 1 },
    background: { Noble: 3, Soldier: 2 },
  },
  '2b': {
    race:       { Elf: 3, Gnome: 2 },
    class:      { Wizard: 3, Druid: 1 },
    alignment:  { 'True Neutral': 2, 'Lawful Neutral': 1 },
    background: { Scholar: 3, Hermit: 2 },
  },
  '2c': {
    class:      { Cleric: 3, Paladin: 2, Druid: 1 },
    alignment:  { 'Neutral Good': 3, 'Chaotic Good': 2 },
    background: { 'Folk Hero': 3, Acolyte: 2 },
  },
  '2d': {
    race:       { 'Half-Orc': 3, Tiefling: 2, Human: 1 },
    class:      { Rogue: 3, Fighter: 2, Bard: 1 },
    background: { Outlander: 2, Criminal: 2, Entertainer: 1 },
  },

  // Q3 – Conflict Style: A dangerous situation suddenly appears. What is your first instinct?
  '3a': {
    race:       { Elf: 2, Human: 1 },
    class:      { Wizard: 3, Fighter: 2 },
    alignment:  { 'Lawful Neutral': 3, 'Lawful Good': 2 },
    background: { Scholar: 2, Soldier: 2 },
  },
  '3b': {
    race:       { 'Half-Elf': 3, Halfling: 2 },
    class:      { Bard: 3, Cleric: 1 },
    alignment:  { 'Neutral Good': 3, 'True Neutral': 2 },
    background: { 'Guild Artisan': 2, Entertainer: 1 },
  },
  '3c': {
    race:       { 'Half-Orc': 3, Dragonborn: 2, Human: 1 },
    class:      { Fighter: 3, Paladin: 2 },
    alignment:  { 'Chaotic Good': 2, 'Lawful Good': 1 },
    background: { Soldier: 3, 'Folk Hero': 1 },
  },
  '3d': {
    race:       { Gnome: 3, Tiefling: 2, Halfling: 1 },
    class:      { Rogue: 3, Ranger: 2 },
    alignment:  { 'Chaotic Neutral': 3, 'Chaotic Good': 1 },
    background: { Criminal: 2, Outlander: 1 },
  },

  // Q4 – Conflict Style: Two allies strongly disagree. You would most likely:
  '4a': {
    race:       { Dwarf: 2, Human: 1 },
    class:      { Fighter: 2, Paladin: 1 },
    alignment:  { 'Lawful Good': 3, 'Lawful Neutral': 3 },
    background: { Soldier: 3, Acolyte: 1 },
  },
  '4b': {
    race:       { 'Half-Elf': 3, Halfling: 2 },
    class:      { Bard: 3, Cleric: 2 },
    alignment:  { 'Neutral Good': 3, 'True Neutral': 3 },
    background: { 'Guild Artisan': 2, Entertainer: 1 },
  },
  '4c': {
    class:      { Paladin: 3, Cleric: 2, Ranger: 1 },
    alignment:  { 'Chaotic Good': 3, 'Neutral Good': 1 },
    background: { Acolyte: 2, 'Folk Hero': 2 },
  },
  '4d': {
    race:       { Tiefling: 3, Gnome: 2 },
    class:      { Rogue: 2, Wizard: 1 },
    alignment:  { 'Chaotic Neutral': 3, 'Chaotic Good': 1 },
    background: { Criminal: 1, Hermit: 2 },
  },

  // Q5 – Decision Making: When faced with a difficult decision, you trust:
  '5a': {
    race:       { Elf: 3, Gnome: 2 },
    class:      { Wizard: 3, Fighter: 1 },
    alignment:  { 'Lawful Neutral': 3, 'True Neutral': 2 },
    background: { Scholar: 3, 'Guild Artisan': 1 },
  },
  '5b': {
    race:       { 'Half-Elf': 2, Human: 1 },
    class:      { Druid: 3, Ranger: 2, Bard: 1 },
    alignment:  { 'Chaotic Neutral': 2, 'True Neutral': 1, 'Neutral Good': 1 },
    background: { Outlander: 3, Hermit: 2 },
  },
  '5c': {
    class:      { Paladin: 3, Cleric: 3, Ranger: 1 },
    alignment:  { 'Chaotic Good': 3, 'Neutral Good': 2, 'Lawful Good': 1 },
    background: { Acolyte: 3, 'Folk Hero': 2 },
  },
  '5d': {
    race:       { Dwarf: 3, Human: 1 },
    class:      { Fighter: 2, Paladin: 1 },
    alignment:  { 'Lawful Good': 3, 'Lawful Neutral': 3 },
    background: { Soldier: 3, Acolyte: 1 },
  },

  // Q6 – Social Behavior: In most groups, people naturally expect you to:
  '6a': {
    race:       { Dragonborn: 3, Human: 2, Dwarf: 1 },
    class:      { Fighter: 2, Paladin: 3 },
    alignment:  { 'Lawful Good': 3, 'Lawful Neutral': 1 },
    background: { Noble: 3, Soldier: 2 },
  },
  '6b': {
    race:       { 'Half-Elf': 3, Halfling: 2 },
    class:      { Cleric: 3, Druid: 2 },
    alignment:  { 'Neutral Good': 3, 'Lawful Good': 1 },
    background: { Acolyte: 3, 'Guild Artisan': 1 },
  },
  '6c': {
    race:       { Gnome: 3, Elf: 2 },
    class:      { Wizard: 3, Rogue: 2 },
    alignment:  { 'Lawful Neutral': 2, 'True Neutral': 1 },
    background: { Scholar: 3, 'Guild Artisan': 2 },
  },
  '6d': {
    race:       { Halfling: 3, Human: 2 },
    class:      { Bard: 3, Rogue: 2 },
    alignment:  { 'Chaotic Neutral': 3, 'Chaotic Good': 2 },
    background: { Entertainer: 3, Criminal: 1 },
  },

  // Q7 – Social Behavior: Which environment sounds most comfortable?
  '7a': {
    race:       { Halfling: 3, 'Half-Elf': 2, Human: 1 },
    class:      { Fighter: 2, Cleric: 2 },
    alignment:  { 'Lawful Good': 2, 'Neutral Good': 1 },
    background: { 'Guild Artisan': 3, Soldier: 2 },
  },
  '7b': {
    race:       { Tiefling: 3, 'Half-Orc': 2 },
    class:      { Ranger: 3, Rogue: 2 },
    alignment:  { 'Chaotic Neutral': 2, 'True Neutral': 1 },
    background: { Outlander: 3, Hermit: 2, Criminal: 1 },
  },
  '7c': {
    race:       { Human: 3, 'Half-Elf': 2 },
    class:      { Bard: 3, Ranger: 1 },
    alignment:  { 'Chaotic Neutral': 2, 'Neutral Good': 1 },
    background: { Entertainer: 2, Criminal: 2 },
  },
  '7d': {
    race:       { Halfling: 2, Dwarf: 1 },
    class:      { Cleric: 2, Fighter: 1 },
    alignment:  { 'Lawful Neutral': 3, 'Lawful Good': 2 },
    background: { Acolyte: 3, Soldier: 2 },
  },

  // Q8 – Moral Perspective (heavy alignment weight): A rule stands in the way of what feels right. What do you do?
  '8a': {
    race:       { Dwarf: 3, Human: 1 },
    class:      { Fighter: 2, Paladin: 1 },
    alignment:  { 'Lawful Good': 4, 'Lawful Neutral': 4 },
    background: { Soldier: 3, Acolyte: 2 },
  },
  '8b': {
    race:       { 'Half-Elf': 3, Human: 1 },
    class:      { Bard: 2, Cleric: 1 },
    alignment:  { 'Neutral Good': 4, 'True Neutral': 4 },
    background: { 'Guild Artisan': 3, 'Folk Hero': 1 },
  },
  '8c': {
    race:       { Tiefling: 3, 'Half-Elf': 1 },
    class:      { Rogue: 3, Ranger: 1 },
    alignment:  { 'Chaotic Good': 4, 'Neutral Good': 1 },
    background: { Criminal: 3, Outlander: 1 },
  },
  '8d': {
    race:       { 'Half-Orc': 3, Tiefling: 2 },
    class:      { Rogue: 2, Ranger: 1 },
    alignment:  { 'Chaotic Neutral': 4, 'Chaotic Good': 2 },
    background: { Outlander: 3, Criminal: 2 },
  },

  // Q9 – Moral Perspective (heavy alignment weight): Which statement feels most true?
  '9a': {
    race:       { Dwarf: 3, Human: 1 },
    class:      { Fighter: 2, Paladin: 2 },
    alignment:  { 'Lawful Good': 4, 'Lawful Neutral': 4 },
    background: { Soldier: 3, Acolyte: 1 },
  },
  '9b': {
    race:       { 'Half-Elf': 2, Halfling: 2 },
    class:      { Cleric: 3, Paladin: 2, Druid: 1 },
    alignment:  { 'Neutral Good': 4, 'Chaotic Good': 2 },
    background: { 'Folk Hero': 3, Acolyte: 2 },
  },
  '9c': {
    race:       { Tiefling: 3, 'Half-Orc': 2 },
    class:      { Rogue: 2, Ranger: 2 },
    alignment:  { 'Chaotic Good': 4, 'Chaotic Neutral': 3 },
    background: { Outlander: 3, Criminal: 2 },
  },
  '9d': {
    race:       { Elf: 2, Human: 1 },
    class:      { Druid: 3, Ranger: 2 },
    alignment:  { 'True Neutral': 4, 'Neutral Good': 1 },
    background: { Hermit: 3, Outlander: 1 },
  },

  // Q10 – Problem Solving: You discover a locked door blocking your path. What do you try first?
  '10a': {
    race:       { Elf: 3, Gnome: 2 },
    class:      { Wizard: 3, Druid: 1 },
    alignment:  { 'Lawful Neutral': 2, 'True Neutral': 1 },
    background: { Scholar: 3, Hermit: 2 },
  },
  '10b': {
    race:       { Tiefling: 2, Halfling: 1 },
    class:      { Rogue: 3, Ranger: 1 },
    alignment:  { 'Chaotic Neutral': 3, 'Chaotic Good': 1 },
    background: { Criminal: 3, Outlander: 1 },
  },
  '10c': {
    race:       { Halfling: 2, Gnome: 1 },
    class:      { Ranger: 3, Druid: 2 },
    alignment:  { 'True Neutral': 3, 'Neutral Good': 1 },
    background: { Outlander: 2, Hermit: 2 },
  },
  '10d': {
    race:       { 'Half-Orc': 3, Dwarf: 2, Dragonborn: 1 },
    class:      { Fighter: 3, Paladin: 1 },
    alignment:  { 'Lawful Neutral': 1, 'Chaotic Neutral': 1 },
    background: { Soldier: 3, 'Folk Hero': 1 },
  },

  // Q11 – Relationship To Power (heavy class weight): What do you admire most in others?
  '11a': {
    race:       { Elf: 3, Gnome: 2 },
    class:      { Wizard: 4, Druid: 1 },
    alignment:  { 'Lawful Neutral': 2, 'True Neutral': 1 },
    background: { Scholar: 3, Hermit: 2 },
  },
  '11b': {
    race:       { Dwarf: 3, Dragonborn: 2, Human: 1 },
    class:      { Fighter: 4, Paladin: 2 },
    alignment:  { 'Lawful Good': 3, 'Lawful Neutral': 2 },
    background: { Soldier: 3, 'Guild Artisan': 2 },
  },
  '11c': {
    race:       { Dragonborn: 3, 'Half-Orc': 1 },
    class:      { Paladin: 4, Cleric: 2 },
    alignment:  { 'Lawful Good': 2, 'Neutral Good': 1 },
    background: { Acolyte: 3, 'Folk Hero': 2 },
  },
  '11d': {
    race:       { Dragonborn: 2, Human: 2, 'Half-Elf': 1 },
    class:      { Bard: 4, Rogue: 1 },
    alignment:  { 'Chaotic Good': 1, 'Chaotic Neutral': 1 },
    background: { Noble: 3, Entertainer: 3 },
  },

  // Q12 – Story Preference: Which story would you most want to be part of?
  '12a': {
    race:       { Dragonborn: 3, Human: 2, Dwarf: 1 },
    class:      { Paladin: 3, Fighter: 2 },
    alignment:  { 'Lawful Good': 3, 'Neutral Good': 1 },
    background: { 'Folk Hero': 3, Soldier: 2, Noble: 1 },
  },
  '12b': {
    race:       { Elf: 3, Gnome: 2 },
    class:      { Wizard: 3, Druid: 1 },
    alignment:  { 'True Neutral': 2, 'Lawful Neutral': 1 },
    background: { Scholar: 3, Hermit: 2 },
  },
  '12c': {
    race:       { Tiefling: 3, 'Half-Orc': 2, 'Half-Elf': 1 },
    class:      { Rogue: 3, Ranger: 1 },
    alignment:  { 'Chaotic Good': 3, 'Chaotic Neutral': 2 },
    background: { Criminal: 3, Outlander: 2 },
  },
  '12d': {
    race:       { Human: 3, Halfling: 2 },
    class:      { Ranger: 3, Druid: 2, Bard: 1 },
    alignment:  { 'True Neutral': 2, 'Neutral Good': 1, 'Chaotic Neutral': 1 },
    background: { Hermit: 3, Outlander: 2 },
  },
}

function pickHighest<T extends string>(scores: Partial<Record<T, number>>): T {
  let best: T | undefined
  let bestScore = -1
  for (const [key, val] of Object.entries(scores) as [T, number][]) {
    if (val > bestScore) {
      bestScore = val
      best = key
    }
  }
  if (best === undefined) throw new Error('No scores available')
  return best
}

function buildRationale(
  race: DndRace,
  dndClass: DndClass,
  alignment: DndAlignment,
  background: DndBackground,
): string {
  return (
    `Your answers suggest a personality drawn toward ${race}-like adaptability and perspective. ` +
    `The patterns across your responses point to the ${dndClass} as a strong class match. ` +
    `Your moral and ethical leanings align most closely with ${alignment}. ` +
    `The experiences and origins of a ${background} reflect how you described your motivations and approach.`
  )
}

// Deterministic scoring: same answers always produce the same recommendations.
export function scoreAssessment(answers: Answers): AdventurerProfile {
  const raceScores:       Partial<Record<DndRace, number>>       = {}
  const classScores:      Partial<Record<DndClass, number>>      = {}
  const alignmentScores:  Partial<Record<DndAlignment, number>>  = {}
  const backgroundScores: Partial<Record<DndBackground, number>> = {}

  for (const answerId of Object.values(answers)) {
    const weights = scoringMatrix[answerId]
    if (!weights) continue

    for (const [key, val] of Object.entries(weights.race       ?? {}) as [DndRace, number][])       raceScores[key]       = (raceScores[key]       ?? 0) + val
    for (const [key, val] of Object.entries(weights.class      ?? {}) as [DndClass, number][])      classScores[key]      = (classScores[key]      ?? 0) + val
    for (const [key, val] of Object.entries(weights.alignment  ?? {}) as [DndAlignment, number][])  alignmentScores[key]  = (alignmentScores[key]  ?? 0) + val
    for (const [key, val] of Object.entries(weights.background ?? {}) as [DndBackground, number][]) backgroundScores[key] = (backgroundScores[key] ?? 0) + val
  }

  const race:       DndRace       = pickHighest(raceScores)
  const dndClass:   DndClass      = pickHighest(classScores)
  const alignment:  DndAlignment  = pickHighest(alignmentScores)
  const background: DndBackground = pickHighest(backgroundScores)

  return {
    race: {
      name:        race,
      explanation: raceDescriptions[race],
      rationale:   buildCategoryRationale('race', race, raceScores),
    },
    class: {
      name:        dndClass,
      explanation: classDescriptions[dndClass],
      rationale:   buildCategoryRationale('class', dndClass, classScores),
    },
    alignment: {
      name:        alignment,
      explanation: alignmentDescriptions[alignment],
      rationale:   buildCategoryRationale('alignment', alignment, alignmentScores),
    },
    background: {
      name:        background,
      explanation: backgroundDescriptions[background],
      rationale:   buildCategoryRationale('background', background, backgroundScores),
    },
    rationale: buildRationale(race, dndClass, alignment, background),
  }
}

// Generates a plain-language explanation of why a particular option scored highest.
function buildCategoryRationale(
  category: 'race' | 'class' | 'alignment' | 'background',
  winner: string,
  scores: Partial<Record<string, number>>,
): string {
  const total    = Object.values(scores).reduce<number>((a, b) => a + (b ?? 0), 0)
  const winScore = scores[winner] ?? 0
  const pct      = total > 0 ? Math.round((winScore / total) * 100) : 0

  const labels: Record<typeof category, string> = {
    race:       'Your personality and social tendencies',
    class:      'Your motivations and decision-making style',
    alignment:  'Your moral and ethical perspective',
    background: 'Your origins and approach to challenges',
  }

  return `${labels[category]} pointed toward ${winner} across your responses (${pct}% of ${category} signals).`
}
