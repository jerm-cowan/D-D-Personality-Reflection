import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  [
    'flex gap-3 p-4',
    'rounded-[var(--radius-medium)] border',
    'text-sm font-body leading-relaxed',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--color-surface-muted)]',
          'border-[var(--color-border)]',
          'text-[var(--color-foreground-muted)]',
        ],
        info: [
          'bg-[var(--color-accent)]/10',
          'border-[var(--color-accent)]/30',
          'text-[var(--color-foreground)]',
        ],
        success: [
          'bg-[var(--color-success)]/10',
          'border-[var(--color-success)]/30',
          'text-[var(--color-foreground)]',
        ],
        warning: [
          'bg-[var(--color-warning)]/10',
          'border-[var(--color-warning)]/30',
          'text-[var(--color-foreground)]',
        ],
        destructive: [
          'bg-[var(--color-destructive)]/10',
          'border-[var(--color-destructive)]/30',
          'text-[var(--color-destructive)]',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
}

function AlertTitle({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('font-display font-semibold leading-snug tracking-wide', className)} {...props} />
  )
}

function AlertDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm leading-relaxed', className)} {...props} />
  )
}

export { Alert, AlertTitle, AlertDescription }
