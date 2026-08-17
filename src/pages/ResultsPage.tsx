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
    <div className="flex items-center gap-4 py-2" aria-hidden="true">
      <div className="flex-1 border-t border-[var(--color-border)]" />
      <span className="text-[var(--color-primary)] text-base">✦</span>
      <div className="flex-1 border-t border-[var(--color-border)]" />
    </div>
  )
}

function RecommendationCard({
  categoryKey,
  rec,
  entryNumber,
  animationDelay,
}: {
  categoryKey: CategoryKey
  rec: Recommendation
  entryNumber: number
  animationDelay: number
}) {
  const { label, icon: Icon } = CATEGORY_CONFIG[categoryKey]

  return (
    <Card
      className="relative overflow-hidden reveal-card"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Gold left accent bar */}
      <div
        className="absolute inset-y-0 left-0 w-1 rounded-l-[var(--radius-large)] bg-[var(--color-primary)]"
        aria-hidden="true"
      />

      <CardContent className="flex flex-col gap-5 py-7 pl-8 pr-7">
        {/* Category header */}
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-[var(--color-primary)] shrink-0" aria-hidden="true" />
          <Badge variant="primary" className="text-label">{label}</Badge>
          <span className="ml-auto text-body-sm text-[var(--color-foreground-muted)] tabular-nums">
            {String(entryNumber).padStart(2, '0')}
          </span>
        </div>

        {/* Recommendation name — the most prominent element */}
        <h2 className="text-display-sm text-[var(--color-foreground)]">{rec.name}</h2>

        <div className="border-t border-[var(--color-border-muted)]" aria-hidden="true" />

        {/* Explanation */}
        <p className="text-body-md text-[var(--color-foreground)] leading-relaxed">
          {rec.explanation}
        </p>

        {/* Per-category rationale */}
        <p className="text-body-sm text-[var(--color-foreground-muted)] leading-relaxed">
          {rec.rationale}
        </p>
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
      <Container size="md" className="py-16 flex flex-col gap-6">
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
    <Container size="md" className="py-16 flex flex-col gap-10">

      {/* Dossier header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="primary" className="text-label">Recommendation Dossier</Badge>
          {isCharacterMode && (
            <Badge variant="accent" className="text-label">Character Mode</Badge>
          )}
        </div>
        <h1 className="text-display-md text-[var(--color-foreground)]">
          {name ?? 'Adventurer Profile'}
        </h1>
        <p className="text-body-md text-[var(--color-foreground-muted)]">
          {name
            ? `Four foundational D&D character recommendations based on ${name}'s responses.`
            : 'Four foundational D&D character recommendations based on your responses.'}
        </p>
      </div>

      <OrnamentalDivider />

      {/* Recommendation cards with stagger */}
      <div className="flex flex-col gap-5">
        <RecommendationCard categoryKey="race"       rec={profile.race}       entryNumber={1} animationDelay={200}  />
        <RecommendationCard categoryKey="class"      rec={profile.class}      entryNumber={2} animationDelay={450}  />
        <RecommendationCard categoryKey="alignment"  rec={profile.alignment}  entryNumber={3} animationDelay={700}  />
        <RecommendationCard categoryKey="background" rec={profile.background} entryNumber={4} animationDelay={950}  />
      </div>

      <OrnamentalDivider />

      {/* Overall rationale panel */}
      <div
        className="reveal-card rounded-[var(--radius-large)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 flex flex-col gap-4"
        style={{ animationDelay: '1200ms' }}
      >
        <div className="flex items-center gap-2">
          <Scroll size={14} className="text-[var(--color-primary)] shrink-0" aria-hidden="true" />
          <span className="text-label text-[var(--color-primary)] tracking-widest">
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
