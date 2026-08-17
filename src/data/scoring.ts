import type { Answers, AdventurerProfile } from '@/types'

// Scoring logic placeholder — implementation deferred
// See BRIEF.md > Scoring Philosophy for constraints:
//   - Deterministic: same answers always produce same recommendations
//   - Explainable: recommendations map to observable answer patterns
//   - Consistent: no randomness or external state

export function scoreAssessment(_answers: Answers): AdventurerProfile {
  // TODO: implement deterministic scoring matrix
  throw new Error('Scoring not yet implemented')
}
