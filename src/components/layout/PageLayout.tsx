import { type ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <main className="flex-1 flex flex-col" id="main-content">
        {children}
      </main>
    </div>
  )
}
