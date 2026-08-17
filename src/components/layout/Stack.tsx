import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

const gapClasses: Record<NonNullable<StackProps['gap']>, string> = {
  xs:  'gap-1',
  sm:  'gap-2',
  md:  'gap-4',
  lg:  'gap-6',
  xl:  'gap-8',
  '2xl': 'gap-12',
}

const alignClasses: Record<NonNullable<StackProps['align']>, string> = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = 'md', align = 'stretch', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col', gapClasses[gap], alignClasses[align], className)}
      {...props}
    />
  ),
)
Stack.displayName = 'Stack'

export { Stack }
