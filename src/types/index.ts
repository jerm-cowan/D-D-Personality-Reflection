// Core domain types derived from BRIEF.md

export type DndRace =
  | 'Human'
  | 'Elf'
  | 'Dwarf'
  | 'Halfling'
  | 'Gnome'
  | 'Half-Elf'
  | 'Half-Orc'
  | 'Tiefling'
  | 'Dragonborn';

export type DndClass =
  | 'Fighter'
  | 'Rogue'
  | 'Wizard'
  | 'Cleric'
  | 'Ranger'
  | 'Bard'
  | 'Paladin'
  | 'Druid';

export type DndAlignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export type DndBackground =
  | 'Scholar'
  | 'Soldier'
  | 'Outlander'
  | 'Entertainer'
  | 'Acolyte'
  | 'Criminal'
  | 'Noble'
  | 'Folk Hero'
  | 'Hermit'
  | 'Guild Artisan';

export type AssessmentMode = 'self' | 'character';

export interface Recommendation {
  name: string;
  explanation: string;
}

export interface AdventurerProfile {
  race: Recommendation;
  class: Recommendation;
  alignment: Recommendation;
  background: Recommendation;
  rationale: string;
}

export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  category: string;
  text: string;
  options: AnswerOption[];
}

export interface AssessmentSetup {
  mode: AssessmentMode;
  adventurerName?: string;
}

export type Answers = Record<number, string>;
