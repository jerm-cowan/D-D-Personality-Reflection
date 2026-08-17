import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <Container size="sm" className="py-24 flex flex-col gap-10 items-center text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-display-lg text-[var(--color-foreground)]">
          D&amp;D Personality Reflection
        </h1>
        <p className="text-body-lg text-muted max-w-prose">
          Answer 12 questions and discover which Race, Class, Alignment, and Background
          best match your personality.
        </p>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <Button size="lg" variant="primary" onClick={() => navigate('/setup')}>
          Begin the Assessment
        </Button>
        <p className="text-body-sm text-muted">No D&amp;D experience required.</p>
      </div>
    </Container>
  )
}
