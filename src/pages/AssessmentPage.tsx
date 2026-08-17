import { useSearchParams, useNavigate } from 'react-router-dom'
import { questions } from '@/data/questions'
import { useAssessment } from '@/context/AssessmentContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

const TOTAL = questions.length

export function AssessmentPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { answers, setAnswer } = useAssessment()

  const qParam = parseInt(searchParams.get('q') ?? '1', 10)
  const fromReview = searchParams.get('from') === 'review'
  const index = Math.max(1, Math.min(qParam, TOTAL))
  const question = questions[index - 1]
  const selectedOptionId = answers[question.id] ?? null

  function selectOption(optionId: string) {
    setAnswer(question.id, optionId)
  }

  function goNext() {
    if (index < TOTAL) {
      setSearchParams({ q: String(index + 1), ...(fromReview ? { from: 'review' } : {}) })
    } else {
      navigate('/review')
    }
  }

  function goPrev() {
    if (fromReview && index > 1) {
      setSearchParams({ q: String(index - 1), from: 'review' })
    } else if (fromReview) {
      navigate('/review')
    } else if (index > 1) {
      setSearchParams({ q: String(index - 1) })
    } else {
      navigate('/setup')
    }
  }

  const isFirst = index === 1 && !fromReview
  const isLast = index === TOTAL
  const nextLabel = fromReview && isLast
    ? 'Back to Review'
    : isLast
    ? 'Review Answers'
    : 'Next'

  const progressPct = Math.round(((index - 1) / TOTAL) * 100)

  return (
    <Container size="md" className="py-16 flex flex-col gap-10">

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge variant="default" className="text-label">
            {question.category}
          </Badge>
          <span className="text-body-sm text-muted">
            {index} of {TOTAL}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={index}
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-label="Assessment progress"
          className="h-1.5 rounded-full bg-[var(--color-border)]"
        >
          <div
            className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-col gap-6">
        <h1 className="text-display-sm text-[var(--color-foreground)]">
          {question.text}
        </h1>

        <fieldset className="flex flex-col gap-4 border-none p-0 m-0">
          <legend className="sr-only">Choose one answer</legend>
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id
            return (
              <Card
                key={option.id}
                className={cn(
                  'cursor-pointer transition-colors duration-150 select-none',
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'hover:border-[var(--color-border-muted)] hover:bg-[var(--color-surface-muted)]',
                )}
                onClick={() => selectOption(option.id)}
              >
                <CardContent className="flex items-center gap-4 py-4">
                  {/* Custom radio indicator */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'shrink-0 w-4 h-4 rounded-full border-2 transition-colors duration-150',
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                        : 'border-[var(--color-border)]',
                    )}
                  />
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={isSelected}
                    onChange={() => selectOption(option.id)}
                    className="sr-only"
                    aria-label={option.text}
                  />
                  <span className="text-body-md text-[var(--color-foreground)]">
                    {option.text}
                  </span>
                </CardContent>
              </Card>
            )
          })}
        </fieldset>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2">
        <Button
          variant="secondary"
          size="md"
          onClick={goPrev}
          disabled={isFirst}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={goNext}
          disabled={selectedOptionId === null}
        >
          {nextLabel}
        </Button>
      </div>
    </Container>
  )
}
