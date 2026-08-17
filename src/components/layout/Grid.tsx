import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

const colsClasses: Record<NonNullable<GridProps['cols']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const gapClasses: Record<NonNullable<GridProps['gap']>, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 2, gap = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid', colsClasses[cols], gapClasses[gap], className)}
      {...props}
    />
  ),
)
Grid.displayName = 'Grid'

export { Grid }
