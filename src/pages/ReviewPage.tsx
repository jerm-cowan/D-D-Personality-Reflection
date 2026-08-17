import { useNavigate } from 'react-router-dom'
import { questions } from '@/data/questions'
import { useAssessment } from '@/context/AssessmentContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout/Container'

const TOTAL = questions.length

export function ReviewPage() {
  const navigate = useNavigate()
  const { answers } = useAssessment()

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === TOTAL

  function getAnswerText(questionId: number): string | null {
    const optionId = answers[questionId]
    if (!optionId) return null
    const question = questions.find((q) => q.id === questionId)
    return question?.options.find((o) => o.id === optionId)?.text ?? null
  }

  function editQuestion(questionId: number) {
    navigate(`/assessment?q=${questionId}&from=review`)
  }

  return (
    <Container size="md" className="py-16 flex flex-col gap-10">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-display-sm text-[var(--color-foreground)]">
          Review Your Answers
        </h1>
        <p className="text-body-md text-muted">
          Confirm your responses before we generate your profile. You can edit any answer.
        </p>
        {!allAnswered && (
          <p className="text-body-sm text-[var(--color-warning)]">
            {TOTAL - answeredCount} question{TOTAL - answeredCount !== 1 ? 's' : ''} still unanswered.
          </p>
        )}
      </div>

      {/* Question list */}
      <div className="flex flex-col gap-4">
        {questions.map((question) => {
          const answerText = getAnswerText(question.id)
          return (
            <Card key={question.id}>
              <CardContent className="flex flex-col gap-2 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-label shrink-0">
                        {question.category}
                      </Badge>
                      <span className="text-body-sm text-muted shrink-0">
                        Q{question.id}
                      </span>
                    </div>
                    <p className="text-body-md text-[var(--color-foreground)]">
                      {question.text}
                    </p>
                    {answerText ? (
                      <p className="text-body-sm text-[var(--color-primary)] font-medium">
                        {answerText}
                      </p>
                    ) : (
                      <p className="text-body-sm text-[var(--color-warning)]">
                        Not answered
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editQuestion(question.id)}
                    aria-label={`Edit answer for question ${question.id}`}
                    className="shrink-0"
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer actions */}
      <div className="flex justify-between items-center pt-2">
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate(`/assessment?q=${TOTAL}`)}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={!allAnswered}
          onClick={() => navigate('/results')}
        >
          Reveal My Profile
        </Button>
      </div>
    </Container>
  )
}
