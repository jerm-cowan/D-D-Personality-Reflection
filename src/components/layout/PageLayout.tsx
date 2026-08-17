import { type ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ConstellationBackground } from '@/components/ui/ConstellationBackground'
import type { ConstellationVariant } from '@/components/ui/ConstellationBackground'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const { pathname } = useLocation()
  const [resultsRevealed, setResultsRevealed] = useState(false)

  const variant: ConstellationVariant =
    pathname === '/'        ? 'landing'  :
    pathname === '/results' ? 'results'  :
    'ambient'

  // Trigger the constellation reveal animation after a short delay on results
  useEffect(() => {
    if (pathname === '/results') {
      const t = setTimeout(() => setResultsRevealed(true), 1200)
      return () => clearTimeout(t)
    }
    setResultsRevealed(false)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <ConstellationBackground variant={variant} revealed={resultsRevealed} />
      <main className="relative flex-1 flex flex-col" id="main-content">
        {children}
      </main>
    </div>
  )
}
