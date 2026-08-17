import { type ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}
