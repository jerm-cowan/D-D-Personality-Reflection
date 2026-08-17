import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '@/context/AssessmentContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'
import type { AssessmentMode } from '@/types'

const MODES: { value: AssessmentMode; label: string; description: string }[] = [
  {
    value: 'self',
    label: 'As Myself',
    description: 'Answer based on your own personality and values.',
  },
  {
    value: 'character',
    label: 'As a Character',
    description: 'Answer as a fictional character you have in mind.',
  },
]

export function SetupPage() {
  const navigate = useNavigate()
  const { setSetup } = useAssessment()
  const [mode, setMode] = useState<AssessmentMode>('self')
  const [name, setName] = useState('')

  function handleBegin() {
    setSetup({ mode, adventurerName: name.trim() || undefined })
    navigate('/assessment')
  }

  return (
    <Container size="md" className="py-16 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-display-sm text-[var(--color-foreground)]">Assessment Setup</h1>
        <p className="text-body-md text-muted">Choose how you want to answer before we begin.</p>
      </div>

      {/* Mode selection */}
      <div className="flex flex-col gap-3">
        <p className="text-label text-muted">I am answering&hellip;</p>
        <div className="flex flex-col gap-3">
          {MODES.map((m) => {
            const selected = mode === m.value
            return (
              <Card
                key={m.value}
                className={cn(
                  'cursor-pointer transition-colors duration-150',
                  selected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'hover:bg-[var(--color-surface-muted)]',
                )}
                onClick={() => setMode(m.value)}
              >
                <CardContent className="flex items-center gap-4 py-4">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'shrink-0 w-4 h-4 rounded-full border-2 transition-colors duration-150',
                      selected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                        : 'border-[var(--color-border)]',
                    )}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-body-md font-medium text-[var(--color-foreground)]">
                      {m.label}
                    </span>
                    <span className="text-body-sm text-muted">{m.description}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Optional name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="adventurer-name" className="text-label text-muted">
          Adventurer Name <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          id="adventurer-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name…"
          maxLength={60}
          className={cn(
            'w-full h-10 rounded-[var(--radius-medium)] px-3',
            'bg-[var(--color-surface)] border border-[var(--color-border)]',
            'text-body-md text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)]',
            'focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2',
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-2">
        <Button variant="secondary" size="md" onClick={() => navigate('/')}>
          Back
        </Button>
        <Button variant="primary" size="md" onClick={handleBegin}>
          Begin Assessment
        </Button>
      </div>
    </Container>
  )
}
