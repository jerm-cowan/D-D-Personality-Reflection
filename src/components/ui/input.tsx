import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label text-[var(--color-foreground-muted)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-10 w-full px-3',
            'bg-[var(--color-surface)] text-[var(--color-foreground)]',
            'border border-[var(--color-border)] rounded-[var(--radius-medium)]',
            'placeholder:text-[var(--color-foreground-muted)]',
            'text-sm font-body',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-background)]',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error && 'border-[var(--color-destructive)]',
            className,
          )}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[var(--color-destructive)]" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-[var(--color-foreground-muted)]">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
