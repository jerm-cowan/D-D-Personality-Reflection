import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/layout/Container'

const CATEGORIES = ['Race', 'Class', 'Alignment', 'Background'] as const

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <Container
      size="lg"
      className="min-h-screen flex flex-col justify-center items-center text-center py-24 gap-14"
    >
      {/* Guild eyebrow */}
      <div className="flex items-center gap-3 text-[var(--color-foreground-muted)]">
        <span className="text-label tracking-widest">Adventurers Guild</span>
        <span className="text-[var(--color-primary)] text-xs" aria-hidden="true">✦</span>
        <span className="text-label tracking-widest">Character Discovery</span>
      </div>

      {/* Main title block */}
      <div className="flex flex-col gap-6 max-w-2xl">
        <h1 className="text-display-lg leading-tight text-[var(--color-foreground)]">
          D&amp;D Personality
          <br />
          <span className="text-[var(--color-primary)]">Reflection</span>
        </h1>
        <p className="text-body-lg text-[var(--color-foreground-muted)] leading-relaxed">
          Discover which Race, Class, Alignment, and Background resonate with
          your personality — through reflection, not rules.
        </p>
      </div>

      {/* Four pillars */}
      <div
        className="flex items-center gap-3 flex-wrap justify-center"
        aria-label="The four recommendations you will receive"
      >
        {CATEGORIES.map((cat, i) => (
          <span key={cat} className="flex items-center gap-3">
            <Badge variant="primary" className="text-label px-3 py-1">
              {cat}
            </Badge>
            {i < CATEGORIES.length - 1 && (
              <span
                className="text-[var(--color-border)] text-xs"
                aria-hidden="true"
              >
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Ornamental rule */}
      <div className="flex items-center gap-4 w-full max-w-xs" aria-hidden="true">
        <div className="flex-1 border-t border-[var(--color-border)]" />
        <span className="text-[var(--color-primary)] text-sm">✦</span>
        <div className="flex-1 border-t border-[var(--color-border)]" />
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-4 items-center">
        <Button size="lg" variant="primary" onClick={() => navigate('/setup')}>
          Begin the Assessment
        </Button>
        <p className="text-body-sm text-[var(--color-foreground-muted)]">
          12 questions &middot; No D&amp;D experience required
        </p>
      </div>
    </Container>
  )
}
