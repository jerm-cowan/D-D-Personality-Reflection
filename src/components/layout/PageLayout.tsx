import { type ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ConstellationBackground } from '@/components/ui/ConstellationBackground'
import type { ConstellationVariant } from '@/components/ui/ConstellationBackground'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const { pathname } = useLocation()
  const [d20Pulsing,  setD20Pulsing]  = useState(false)
  const [revealed,    setRevealed]    = useState(false)
  const [faded,       setFaded]       = useState(false)

  const variant: ConstellationVariant =
    pathname === '/'        ? 'landing'  :
    pathname === '/results' ? 'results'  :
    'ambient'

  useEffect(() => {
    if (pathname === '/results') {
      // Phase 1 (0 ms):   D20 glows and pulses through constellation lines
      // Phase 2 (1400 ms): D20 dims, corner icons illuminate
      // Phase 3 (2500 ms): constellation fades back as cards emerge
      setD20Pulsing(true)
      setRevealed(false)
      setFaded(false)
      const t1 = setTimeout(() => { setD20Pulsing(false); setRevealed(true) }, 1600)
      const t2 = setTimeout(() => setFaded(true), 3900)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    setD20Pulsing(false)
    setRevealed(false)
    setFaded(false)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <ConstellationBackground
        variant={variant}
        revealed={revealed}
        d20Pulsing={d20Pulsing}
        faded={faded}
      />
      <main className="relative flex-1 flex flex-col" id="main-content">
        {children}
      </main>
    </div>
  )
}
