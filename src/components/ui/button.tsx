import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-body text-sm font-medium',
    'transition-colors duration-150',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
    'disabled:pointer-events-none disabled:opacity-40',
    'cursor-pointer select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-primary)] text-[var(--color-background)]',
          'hover:bg-[var(--color-primary-hover)]',
          'rounded-[var(--radius-medium)]',
        ],
        secondary: [
          'bg-[var(--color-surface)] text-[var(--color-foreground)]',
          'border border-[var(--color-border)]',
          'hover:bg-[var(--color-surface-muted)]',
          'rounded-[var(--radius-medium)]',
        ],
        ghost: [
          'text-[var(--color-foreground-muted)]',
          'hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface-muted)]',
          'rounded-[var(--radius-medium)]',
        ],
        destructive: [
          'bg-[var(--color-destructive)] text-white',
          'hover:opacity-90',
          'rounded-[var(--radius-medium)]',
        ],
      },
      size: {
        sm: 'h-8  px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
