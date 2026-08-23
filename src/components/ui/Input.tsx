import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      hint,
      id,
      className = '',
      ...props
    },
    ref,
  ) {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${id}-error`
              : hint
                ? `${id}-hint`
                : undefined
          }
          className={[
            'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800',
            'outline-none transition placeholder:text-slate-400',
            'focus:border-violet-400 focus:ring-2 focus:ring-violet-100',
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-slate-200',
            className,
          ].join(' ')}
          {...props}
        />

        {error && (
          <p
            id={`${id}-error`}
            className="mt-1.5 text-xs text-red-600"
          >
            {error}
          </p>
        )}

        {!error && hint && (
          <p
            id={`${id}-hint`}
            className="mt-1.5 text-xs text-slate-400"
          >
            {hint}
          </p>
        )}
      </div>
    )
  },
)
