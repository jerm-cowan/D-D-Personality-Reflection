import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets scroll position to the top on every route change. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // requestAnimationFrame lets the new page render first; the fallback
    // covers iOS Safari where window.scrollTo alone is unreliable.
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })
  }, [pathname])
  return null
}
