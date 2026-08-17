import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1',
    'font-body text-xs font-medium uppercase tracking-widest',
    'rounded-[var(--radius-small)] px-2 py-0.5',
    'border',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--color-surface-muted)]',
          'text-[var(--color-foreground-muted)]',
          'border-[var(--color-border)]',
        ],
        primary: [
          'bg-[var(--color-primary)]/15',
          'text-[var(--color-primary)]',
          'border-[var(--color-primary)]/30',
        ],
        accent: [
          'bg-[var(--color-accent)]/15',
          'text-[var(--color-accent)]',
          'border-[var(--color-accent)]/30',
        ],
        success: [
          'bg-[var(--color-success)]/15',
          'text-[var(--color-success)]',
          'border-[var(--color-success)]/30',
        ],
        destructive: [
          'bg-[var(--color-destructive)]/15',
          'text-[var(--color-destructive)]',
          'border-[var(--color-destructive)]/30',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
