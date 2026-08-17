import type { Question } from '@/types'

// 12 assessment questions — see BRIEF.md for full design rationale
export const questions: Question[] = [
  {
    id: 1,
    category: 'Motivation',
    text: 'What would most likely convince you to begin an adventure?',
    options: [
      { id: '1a', text: 'Protecting people who need help' },
      { id: '1b', text: 'Discovering forgotten knowledge' },
      { id: '1c', text: 'Pursuing personal freedom' },
      { id: '1d', text: 'Achieving recognition or success' },
    ],
  },
  {
    id: 2,
    category: 'Motivation',
    text: 'Which reward feels most meaningful?',
    options: [
      { id: '2a', text: 'The respect of others' },
      { id: '2b', text: 'Learning something important' },
      { id: '2c', text: 'Making a difference' },
      { id: '2d', text: 'Proving what you\'re capable of' },
    ],
  },
  {
    id: 3,
    category: 'Conflict Style',
    text: 'A dangerous situation suddenly appears. What is your first instinct?',
    options: [
      { id: '3a', text: 'Create a plan' },
      { id: '3b', text: 'Talk the situation through' },
      { id: '3c', text: 'Take immediate action' },
      { id: '3d', text: 'Find an unexpected solution' },
    ],
  },
  {
    id: 4,
    category: 'Conflict Style',
    text: 'Two allies strongly disagree about what to do next. You would most likely:',
    options: [
      { id: '4a', text: 'Support established leadership' },
      { id: '4b', text: 'Help them find common ground' },
      { id: '4c', text: 'Choose the side you believe is right' },
      { id: '4d', text: 'Challenge both viewpoints' },
    ],
  },
  {
    id: 5,
    category: 'Decision Making',
    text: 'When faced with a difficult decision, you trust:',
    options: [
      { id: '5a', text: 'Logic' },
      { id: '5b', text: 'Intuition' },
      { id: '5c', text: 'Personal values' },
      { id: '5d', text: 'Rules and tradition' },
    ],
  },
  {
    id: 6,
    category: 'Social Behavior',
    text: 'In most groups, people naturally expect you to:',
    options: [
      { id: '6a', text: 'Lead' },
      { id: '6b', text: 'Support' },
      { id: '6c', text: 'Solve problems' },
      { id: '6d', text: 'Keep things interesting' },
    ],
  },
  {
    id: 7,
    category: 'Social Behavior',
    text: 'Which environment sounds most comfortable?',
    options: [
      { id: '7a', text: 'Working closely with a team' },
      { id: '7b', text: 'Working independently' },
      { id: '7c', text: 'Moving between both' },
      { id: '7d', text: 'Following someone else\'s lead' },
    ],
  },
  {
    id: 8,
    category: 'Moral Perspective',
    text: 'A rule stands in the way of what feels right. What do you do?',
    options: [
      { id: '8a', text: 'Follow the rule' },
      { id: '8b', text: 'Find a compromise' },
      { id: '8c', text: 'Bend the rule' },
      { id: '8d', text: 'Ignore the rule' },
    ],
  },
  {
    id: 9,
    category: 'Moral Perspective',
    text: 'Which statement feels most true?',
    options: [
      { id: '9a', text: 'Order creates stability' },
      { id: '9b', text: 'People matter more than systems' },
      { id: '9c', text: 'Freedom is worth protecting' },
      { id: '9d', text: 'Balance is most important' },
    ],
  },
  {
    id: 10,
    category: 'Problem Solving',
    text: 'You discover a locked door blocking your path. What do you try first?',
    options: [
      { id: '10a', text: 'Study how it works' },
      { id: '10b', text: 'Pick the lock' },
      { id: '10c', text: 'Find another route' },
      { id: '10d', text: 'Force it open' },
    ],
  },
  {
    id: 11,
    category: 'Relationship To Power',
    text: 'What do you admire most in others?',
    options: [
      { id: '11a', text: 'Intelligence and knowledge' },
      { id: '11b', text: 'Dedication and discipline' },
      { id: '11c', text: 'Conviction and purpose' },
      { id: '11d', text: 'Presence and influence' },
    ],
  },
  {
    id: 12,
    category: 'Story Preference',
    text: 'Which story would you most want to be part of?',
    options: [
      { id: '12a', text: 'A heroic quest' },
      { id: '12b', text: 'An ancient mystery' },
      { id: '12c', text: 'A rebellion against authority' },
      { id: '12d', text: 'A journey of personal discovery' },
    ],
  },
]
