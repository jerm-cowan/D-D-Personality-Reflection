# D&D Personality Reflection

## Project Overview

D&D Personality Reflection is a fantasy-themed personality assessment that helps users discover which Dungeons & Dragons character options best align with their personality, worldview, motivations, and decision-making style.

The experience is intentionally focused on reducing overwhelm during the earliest stages of character creation.

Rather than generating a complete playable character, the application helps users make four foundational D&D decisions:

- Race
- Class
- Alignment
- Background

The application then explains why those recommendations were made.

The goal is to provide clarity, inspiration, and confidence while leaving room for the player to create their own story, backstory, abilities, equipment, and character details.

---

# Product Vision

Many potential D&D players become overwhelmed by the number of character creation options before they understand the kind of fantasy character they want to play.

This experience starts with personality rather than rules.

Instead of asking:

> What race should I choose?

It asks:

> What kind of person or character are you trying to be?

The assessment then maps those answers to recognizable D&D concepts and presents recommendations with clear explanations.

The experience should feel like:

> "That sounds like me."

or

> "That sounds like the character I want to play."

Not:

> "This is my finished character."

---

# Project Guardrails

## This Project IS

- A guided personality assessment
- A fantasy archetype matching experience
- A D&D-inspired decision support tool
- A web application
- A Protogen case study

## This Project IS NOT

- A character creator
- A character sheet generator
- A rules engine
- A combat simulator
- An inventory generator
- A spell builder
- A campaign manager
- A build optimizer
- A D&D Beyond replacement

Whenever scope decisions are unclear:

Choose the simpler implementation.

---

# Primary User Personas

## The Curious Newcomer

Someone with little or no D&D experience.

### Goals

- Learn D&D concepts
- Reduce character creation anxiety
- Discover what kind of adventurer they might enjoy playing

### Success

> "Now I understand where to start."

---

## The Inspired Player

A tabletop player looking for ideas.

### Goals

- Explore a new concept
- Generate inspiration
- Break out of familiar character patterns

### Success

> "I never would have picked that combination myself."

---

## The Roleplay Explorer

Someone answering as an imagined character rather than themselves.

### Goals

- Explore fictional personalities
- Shape a roleplay concept
- Discover archetypes

### Success

> "That feels like this character."

---

# Core User Value

The user wants answers to four questions:

## What D&D Race best matches me?

## What D&D Class best matches me?

## What D&D Alignment best matches me?

## What D&D Background best matches me?

These recommendations should feel thoughtful, understandable, and helpful.

The recommendations are intended to inspire future character creation rather than replace it.

---

# User Flow

```txt
Landing Page
    ↓
Assessment Setup
    ↓
Personality Assessment
    ↓
Review Answers
    ↓
Generate Results
    ↓
Recommendation Profile
    ↓
Retake Assessment
```

---

# Assessment Setup

Before beginning:

### Mode

- Answering as myself
- Answering as a fictional character

Optional:

### Adventurer Name

Allows personalization of results.

---

# Assessment

## Goal

Measure personality patterns and decision-making tendencies.

Not game knowledge.

Not rule familiarity.

---

## Assessment Length

12 Questions

---

## Format

- Multiple choice
- Single answer selection
- One question displayed at a time
- Visible progress indicator

---

# Assessment Questions

## Question Design Principles

Questions should:

- Be understandable without D&D knowledge
- Work whether answering as yourself or as a fictional character
- Measure motivations, preferences, and decision-making styles
- Avoid obvious "correct" answers
- Avoid directly mentioning races, classes, alignments, or backgrounds
- Support recommendation generation for:
  - Race
  - Class
  - Alignment
  - Background

Assessment length:

- 12 questions
- 4 answer options per question
- One question displayed at a time

---

## Motivation

### Question 1

**What would most likely convince you to begin an adventure?**

- Protecting people who need help
- Discovering forgotten knowledge
- Pursuing personal freedom
- Achieving recognition or success

---

### Question 2

**Which reward feels most meaningful?**

- The respect of others
- Learning something important
- Making a difference
- Proving what you're capable of

---

## Conflict Style

### Question 3

**A dangerous situation suddenly appears. What is your first instinct?**

- Create a plan
- Talk the situation through
- Take immediate action
- Find an unexpected solution

---

### Question 4

**Two allies strongly disagree about what to do next. You would most likely:**

- Support established leadership
- Help them find common ground
- Choose the side you believe is right
- Challenge both viewpoints

---

## Decision Making

### Question 5

**When faced with a difficult decision, you trust:**

- Logic
- Intuition
- Personal values
- Rules and tradition

---

## Social Behavior

### Question 6

**In most groups, people naturally expect you to:**

- Lead
- Support
- Solve problems
- Keep things interesting

---

### Question 7

**Which environment sounds most comfortable?**

- Working closely with a team
- Working independently
- Moving between both
- Following someone else's lead

---

## Moral Perspective

### Question 8

**A rule stands in the way of what feels right. What do you do?**

- Follow the rule
- Find a compromise
- Bend the rule
- Ignore the rule

---

### Question 9

**Which statement feels most true?**

- Order creates stability
- People matter more than systems
- Freedom is worth protecting
- Balance is most important

---

## Problem Solving

### Question 10

**You discover a locked door blocking your path. What do you try first?**

- Study how it works
- Pick the lock
- Find another route
- Force it open

---

## Relationship To Power

### Question 11

**What do you admire most in others?**

- Intelligence and knowledge
- Dedication and discipline
- Conviction and purpose
- Presence and influence

---

## Story Preference

### Question 12

**Which story would you most want to be part of?**

- A heroic quest
- An ancient mystery
- A rebellion against authority
- A journey of personal discovery

---

## Scoring Guidance

Questions should contribute points toward multiple recommendation categories.

The assessment should generate recommendations for:

- Race
- Class
- Alignment
- Background

Example:

- Motivation may influence Class and Background.
- Social Behavior may influence Race and Class.
- Moral Perspective should heavily influence Alignment.
- Relationship To Power should heavily influence Class.

Recommendations should emerge from patterns across multiple questions rather than any single answer.

The scoring model should remain:

- Deterministic
- Explainable
- Consistent

---

# Scoring Philosophy

The scoring system should be deterministic, explainable, and transparent.

The same answers should always produce the same recommendations.

The scoring system exists to create understandable recommendations rather than psychological analysis.

Avoid opaque AI-generated scoring.

---

# Recommendation Categories

## Race

Race is a primary recommendation.

### Supported MVP Races

- Human
- Elf
- Dwarf
- Halfling
- Gnome
- Half-Elf
- Half-Orc
- Tiefling
- Dragonborn

### Important

Race recommendations are thematic and personality-based.

The experience does not attempt to create a rules-valid character.

### Subrace Strategy

Subrace selection is out of scope for MVP.

Future versions may optionally suggest races worth exploring further, but the application should not recommend a specific subrace.

---

## Class

### Supported MVP Classes

- Fighter
- Rogue
- Wizard
- Cleric
- Ranger
- Bard
- Paladin
- Druid

---

## Alignment

Use canonical D&D alignments.

### Supported Alignments

- Lawful Good
- Neutral Good
- Chaotic Good
- Lawful Neutral
- True Neutral
- Chaotic Neutral
- Lawful Evil
- Neutral Evil
- Chaotic Evil

Alignment should always include a plain-language explanation.

---

## Background

### Supported MVP Backgrounds

- Scholar
- Soldier
- Outlander
- Entertainer
- Acolyte
- Criminal
- Noble
- Folk Hero
- Hermit
- Guild Artisan

---

# Results Experience

The results page is the centerpiece of the application.

The purpose of the screen is to present four recommended D&D character creation decisions and explain the reasoning behind them.

The purpose is not to generate a complete character.

---

# Results Structure

## Race

Display:

- Race Name
- Brief explanation
- Selection rationale

Example:

### Half-Elf

You appear comfortable adapting to different situations and connecting with people from different backgrounds.

---

## Class

Display:

- Class Name
- Brief explanation
- Selection rationale

Example:

### Bard

Your answers frequently emphasized communication, creativity, and influence.

---

## Alignment

Display:

- Alignment Name
- Plain-language interpretation
- Selection rationale

Example:

### Chaotic Good

You generally prioritize helping others but prefer flexibility over strict rules.

---

## Background

Display:

- Background Name
- Brief explanation
- Selection rationale

Example:

### Entertainer

Several answers reflected self-expression, storytelling, and connecting with others.

---

## Overall Rationale

Provide a concise explanation describing how the recommendations work together.

The rationale should summarize observable patterns from the assessment.

The rationale should not:

- Create a backstory
- Generate ability scores
- Generate equipment
- Generate a character sheet
- Invent character details
- Create strengths and weaknesses lists

The player remains responsible for creating the rest of their character.

---

# Result Model

```ts
type Recommendation = {
  name: string;
  explanation: string;
};

type AdventurerProfile = {
  race: Recommendation;
  class: Recommendation;
  alignment: Recommendation;
  background: Recommendation;
  rationale: string;
};
```

---

# Visual Direction

## Theme

Fantasy-inspired.

Should feel like:

- Adventurer Guild Records
- Arcane Archives
- Guild Registry
- Character Recommendation Dossier

Should NOT feel like:

- A character sheet
- A rules reference document
- A spreadsheet
- A generic personality quiz

---

## Design Keywords

- Fantasy
- Welcoming
- Reflective
- Mythic
- Polished
- Warm
- Adventurous

---
# Visual References

The application should draw inspiration from recognizable fantasy and D&D visual language while avoiding direct duplication of copyrighted artwork.

These references exist to guide styling, iconography, hierarchy, mood, and presentation.

Official D&D websites may be used as terminology and styling references, but all application iconography and visual assets should be original or appropriately licensed.

## Official D&D References

### D&D Beyond

Reference for race, class, background, and alignment terminology:

https://www.dndbeyond.com

### D&D Brand Style and Iconography

Reference for official class and game iconography:

https://dnd.wizards.com

### D&D 2024 Rules Glossary

Reference for modern terminology and category naming.

Use terminology consistently with official D&D concepts where appropriate.

---

## Fantasy UI Inspiration

### Guild Registry

Use the feeling of an official adventurers guild record.

### Arcane Archive

Use the feeling of a magical library, codex, or archive.

### Character Dossier

Present recommendations as findings rather than requirements.

---

## Iconography Guidelines

Use lightweight symbolic icons for:

- Race
- Class
- Alignment
- Background

Icons should:

- Be simple
- Be recognizable
- Work at small sizes
- Remain readable on mobile

Avoid:

- Detailed illustrations
- Copyrighted artwork
- Direct reproduction of official assets

Preference should be given to custom iconography inspired by fantasy themes.
---
# Design Principles

## Reduce Overwhelm

The application should simplify decisions.

Never introduce unnecessary complexity.

---

## Familiar D&D Language

Use standard D&D terminology:

- Race
- Class
- Alignment
- Background

Do not replace these concepts with alternative labels.

---

## Explanations Matter

Every recommendation should explain why it was selected.

Recommendations without rationale have little value.

---

## Leave Room For Imagination

Do not complete the user's character for them.

The player should still feel ownership over their story.

---

## No Empty Character Sheet UI

Never display blank character-sheet-like layouts.

Results should always feel complete.

---

# Technical Architecture

## Recommended Stack

- React
- Vite
- TypeScript

---

## Styling

Preferred:

- Tailwind CSS
- shadcn/ui

---

## Data Strategy

All content should be local.

Recommended structure:

```txt
data/
  questions.ts
  scoring.ts
  recommendations.ts
```

Do not use:

- External APIs
- Databases
- Authentication
- RAG
- Embeddings

---

# Design System

## Objective

Implement a lightweight, scalable design system optimized for a fantasy-themed web application while remaining achievable within a semester-length capstone project.

The goal is not to build a full enterprise design system.

The goal is to establish:

- Consistent visual language
- Reusable components
- Accessibility compliance
- Future extensibility

---

## Technical Foundation

### Frontend Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI primitives

### Design Philosophy

Use shadcn/ui as the component foundation and customize through:

- Design tokens
- Theming
- Typography
- Iconography
- Semantic styling

Avoid building custom component implementations unless functionality cannot be achieved through existing primitives.

---

## Theming Strategy

### Theme Direction

The interface should evoke:

- Ancient knowledge
- Adventure
- Exploration
- Arcane mystery

The aesthetic should feel fantasy-inspired rather than a game UI.

Prioritize readability and usability over decorative effects.

---

## Design Tokens

### Color Tokens

Required categories:

- background
- surface
- surface-muted
- foreground
- primary
- secondary
- accent
- success
- warning
- destructive
- border

Colors should be defined semantically rather than through hardcoded usage.

Example intent:

- primary = enchanted gold
- accent = arcane blue
- surface = dark parchment
- background = deep slate

---

### Typography Tokens

Use only two typefaces.

#### Display Font

Used for:

- Branding
- Titles
- Major headings

Characteristics:

- Fantasy-inspired
- Decorative
- Readable

#### Body Font

Used for:

- Content
- Questions
- Labels
- Navigation

Characteristics:

- Modern
- Legible
- Accessible

Never use decorative fonts for body content.

---

### Spacing Scale

Use:

- xs
- sm
- md
- lg
- xl
- 2xl

Avoid arbitrary spacing values.

---

### Radius Tokens

Use:

- small
- medium
- large

Use consistently throughout the application.

---

## Core Components

Required Components:

### Button

Variants:

- primary
- secondary
- ghost
- destructive

### Card

Used for:

- Question presentation
- Recommendations
- Information surfaces

### Input

Supports:

- Labels
- Helper text
- Validation states

### Select

Supports categorization and filtering.

### Dialog

Supports:

- Explanations
- Confirmations
- Additional information

### Tabs

Supports content organization.

### Badge

Supports:

- Recommendation labels
- Categories
- Archetype indicators

### Navigation

Supports:

- Desktop navigation
- Responsive navigation

### Tooltip

Provides contextual explanations.

### Alert

Provides feedback and status messaging.

---

## Accessibility Requirements

All components should support:

- WCAG AA contrast minimum
- Keyboard navigation
- Visible focus indicators
- Semantic HTML
- Accessible labels
- Screen reader compatibility

### Motion

Support:

- prefers-reduced-motion

Avoid:

- Flashing effects
- Excessive animation
- Motion-dependent interactions

---

## Component Architecture

### Rules

- Reuse shadcn/ui components whenever possible.
- Extend through composition rather than duplication.
- Centralize styling through tokens.
- Minimize one-off styling.

### Folder Structure

```txt
components/
  ui/
  layout/
  features/

tokens/
  colors/
  typography/
  spacing/
```

---

## Visual Guidelines

### Preferred

- Subtle texture
- Restrained ornamentation
- Parchment-inspired surfaces
- Metallic accent colors
- Clear information hierarchy

### Avoid

- Excessive visual clutter
- Unreadable fantasy fonts
- Low contrast text
- Decorative distractions
- Game HUD styling

---

## Success Criteria

The design system is successful when:

- All major screens use reusable components.
- Colors are controlled through tokens.
- Typography remains consistent.
- New features do not introduce new visual patterns.
- Accessibility requirements remain satisfied.
- Fantasy identity is communicated primarily through theming rather than custom component implementations.

---

# MVP Features

Required:

- Landing page
- Assessment setup
- 12-question assessment
- Progress indicator
- Review answers screen
- Race recommendation
- Class recommendation
- Alignment recommendation
- Background recommendation
- Explanation engine
- Overall rationale generation
- Responsive design
- Retake assessment flow

---

# AI Development Instructions

When implementing:

1. Prefer the simplest working solution.
2. Complete the entire user flow before polishing.
3. Use local data only.
4. Use deterministic scoring.
5. Build reusable components.
6. Keep recommendation logic understandable.
7. Follow the Design System.
8. Use shadcn/ui before building custom components.

Do not implement:

- Character sheets
- Ability scores
- Combat systems
- Spell systems
- Equipment generation
- Backstory generation
- Campaign management
- Authentication
- Databases
- External APIs
- RAG

IMPORTANT:

The application produces exactly:

- Race
- Class
- Alignment
- Background
- Overall Rationale

Do not invent additional recommendation categories.

The purpose of the application is to reduce decision overwhelm and help users make four foundational D&D character creation decisions.

---

# Definition of Done

The project is complete when:

- A user can complete the assessment.
- A user can review their answers.
- A user can generate recommendations for:
  - Race
  - Class
  - Alignment
  - Background
- Every recommendation includes an explanation.
- An overall rationale is generated.
- No character sheet elements exist.
- The experience works on desktop and mobile.
- The Design System is implemented consistently.
- The visual design clearly reflects a fantasy theme.
- The repository contains:
  - BRIEF.md
  - README.md
  - AI scaffolding/context files
- The deployed application clearly reflects this brief.