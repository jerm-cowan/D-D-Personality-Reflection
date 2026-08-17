import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Answers, AssessmentSetup } from '@/types'

interface AssessmentContextValue {
  setup: AssessmentSetup | null
  setSetup: (setup: AssessmentSetup) => void
  answers: Answers
  setAnswer: (questionId: number, optionId: string) => void
  resetAssessment: () => void
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null)

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [setup, setSetup] = useState<AssessmentSetup | null>(null)
  const [answers, setAnswers] = useState<Answers>({})

  function setAnswer(questionId: number, optionId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  function resetAssessment() {
    setSetup(null)
    setAnswers({})
  }

  return (
    <AssessmentContext.Provider value={{ setup, setSetup, answers, setAnswer, resetAssessment }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext)
  if (!ctx) throw new Error('useAssessment must be used inside AssessmentProvider')
  return ctx
}
