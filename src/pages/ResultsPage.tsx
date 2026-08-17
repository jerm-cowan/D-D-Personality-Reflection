import { useNavigate } from 'react-router-dom'
import { Shield, Sword, Scale, BookOpen, Scroll } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAssessment } from '@/context/AssessmentContext'
import { scoreAssessment } from '@/data/scoring'
import { questions } from '@/data/questions'
import { Container } from '@/components/layout/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Recommendation } from '@/types'

type CategoryKey = 'race' | 'class' | 'alignment' | 'background'

const CATEGORY_CONFIG: Record<CategoryKey, { label: string; icon: LucideIcon }> = {
  race:       { label: 'Race',       icon: Shield   },
  class:      { label: 'Class',      icon: Sword    },
  alignment:  { label: 'Alignment',  icon: Scale    },
  background: { label: 'Background', icon: BookOpen },
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center gap-3 py-1" aria-hidden="true">
      <div className="flex-1 border-t border-[var(--color-border)]" />
      <span className="text-[var(--color-primary)] text-xs">✦</span>
      <div className="flex-1 border-t border-[var(--color-border)]" />
    </div>
  )
}

function RecommendationCard({
  categoryKey,
  rec,
  entryNumber,
}: {
  categoryKey: CategoryKey
  rec: Recommendation
  entryNumber: number
}) {
  const { label, icon: Icon } = CATEGORY_CONFIG[categoryKey]

  return (
    <Card className="relative overflow-hidden">
      {/* Gold left accent bar */}
      <div
        className="absolute inset-y-0 left-0 w-1 rounded-l-[var(--radius-large)] bg-[var(--color-primary)]"
        aria-hidden="true"
      />

      <CardContent className="flex flex-col gap-4 py-6 pl-8">
        {/* Category header */}
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-[var(--color-primary)] shrink-0" aria-hidden="true" />
          <Badge variant="primary" className="text-label">{label}</Badge>
          <span className="ml-auto text-body-sm text-muted tabular-nums">
            {String(entryNumber).padStart(2, '0')}
          </span>
        </div>

        {/* Recommendation name */}
        <h2 className="text-display-sm text-[var(--color-foreground)]">{rec.name}</h2>

        <div className="border-t border-[var(--color-border-muted)]" aria-hidden="true" />

        {/* Explanation */}
        <p className="text-body-md text-[var(--color-foreground)]">{rec.explanation}</p>

        {/* Per-category rationale */}
        <p className="text-body-sm text-muted">{rec.rationale}</p>
      </CardContent>
    </Card>
  )
}

export function ResultsPage() {
  const navigate = useNavigate()
  const { answers, setup, resetAssessment } = useAssessment()

  const answeredCount = Object.keys(answers).length
  if (answeredCount < questions.length) {
    return (
      <Container size="sm" className="py-12 flex flex-col gap-6">
        <p className="text-body-md text-[var(--color-warning)]">
          Your assessment is incomplete. Please finish all questions before viewing results.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/assessment')}>
          Return to Assessment
        </Button>
      </Container>
    )
  }

  const profile = scoreAssessment(answers)
  const name = setup?.adventurerName?.trim()
  const isCharacterMode = setup?.mode === 'character'

  function handleRetake() {
    resetAssessment()
    navigate('/')
  }

  return (
    <Container size="sm" className="py-12 flex flex-col gap-8">

      {/* Dossier header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="primary" className="text-label">Recommendation Dossier</Badge>
          {isCharacterMode && (
            <Badge variant="accent" className="text-label">Character Mode</Badge>
          )}
        </div>
        <h1 className="text-display-md text-[var(--color-foreground)]">
          {name ?? 'Adventurer Profile'}
        </h1>
        <p className="text-body-md text-muted">
          {name
            ? `Four foundational D&D character recommendations based on ${name}'s responses.`
            : 'Four foundational D&D character recommendations based on your responses.'}
        </p>
      </div>

      <OrnamentalDivider />

      {/* Recommendation cards */}
      <div className="flex flex-col gap-4">
        <RecommendationCard categoryKey="race"       rec={profile.race}       entryNumber={1} />
        <RecommendationCard categoryKey="class"      rec={profile.class}      entryNumber={2} />
        <RecommendationCard categoryKey="alignment"  rec={profile.alignment}  entryNumber={3} />
        <RecommendationCard categoryKey="background" rec={profile.background} entryNumber={4} />
      </div>

      <OrnamentalDivider />

      {/* Overall rationale — surface-muted panel, not a fifth recommendation card */}
      <div className="rounded-[var(--radius-large)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Scroll size={14} className="text-[var(--color-primary)] shrink-0" aria-hidden="true" />
          <span className="text-label text-[var(--color-primary)] uppercase tracking-widest">
            Why These Recommendations Work Together
          </span>
        </div>
        <p className="text-body-md text-[var(--color-foreground-muted)] leading-relaxed">
          {profile.rationale}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-2">
        <Button variant="secondary" size="md" onClick={() => navigate('/review')}>
          Back to Review
        </Button>
        <Button variant="primary" size="md" onClick={handleRetake}>
          Retake Assessment
        </Button>
      </div>

    </Container>
  )
}
