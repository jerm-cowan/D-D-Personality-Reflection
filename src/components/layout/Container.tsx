import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Constrain width. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const sizeClasses: Record<NonNullable<ContainerProps['size']>, string> = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-7xl',
  full: 'max-w-none',
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}
      {...props}
    />
  ),
)
Container.displayName = 'Container'

export { Container }
