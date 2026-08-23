import { forwardRef } from 'react'
import type {
  InputHTMLAttributes,
  ReactNode,
} from 'react'

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(function Input(
  {
    label,
    error,
    hint,
    id,
    className = '',
    leftIcon,
    rightIcon,
    ...props
  },
  ref,
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="
            mb-2 block
            text-sm font-semibold
            text-slate-700
            dark:text-slate-200
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span
            className="
              pointer-events-none
              absolute left-3.5 top-1/2
              z-10 -translate-y-1/2
              text-slate-400
              dark:text-slate-500
            "
          >
            {leftIcon}
          </span>
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
            `
              w-full rounded-xl border
              bg-white
              py-3
              text-sm text-slate-800
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-400
              focus:border-violet-400
              focus:ring-4
              focus:ring-violet-100/70
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-100
              dark:placeholder:text-slate-500
              dark:focus:border-violet-500
              dark:focus:ring-violet-500/10
            `,
            leftIcon ? 'pl-11' : 'px-4',
            rightIcon ? 'pr-11' : 'px-4',
            error
              ? `
                border-red-300
                focus:border-red-400
                focus:ring-red-100
                dark:border-red-700
                dark:focus:border-red-500
              `
              : 'border-slate-200',
            className,
          ].join(' ')}
          {...props}
        />

        {rightIcon && (
          <span
            className="
              absolute right-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
              dark:text-slate-500
            "
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="
            mt-1.5 text-xs
            text-red-600
            dark:text-red-400
          "
        >
          {error}
        </p>
      )}

      {!error && hint && (
        <p
          id={`${id}-hint`}
          className="
            mt-1.5 text-xs
            text-slate-400
            dark:text-slate-500
          "
        >
          {hint}
        </p>
      )}
    </div>
  )
})