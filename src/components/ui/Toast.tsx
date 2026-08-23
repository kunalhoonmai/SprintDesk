import type { ReactNode } from 'react'
import {
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from 'lucide-react'

export type ToastVariant =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'

interface ToastProps {
  title: string
  message?: string
  variant?: ToastVariant
  onClose?: () => void
}

const icons = {
  success: CheckCircle2,
  error: TriangleAlert,
  warning: TriangleAlert,
  info: Info,
}

const styles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  error: 'border-red-200 bg-red-50 text-red-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  info: 'border-blue-200 bg-blue-50 text-blue-700',
}

export function Toast({
  title,
  message,
  variant = 'info',
  onClose,
}: ToastProps) {
  const Icon = icons[variant]

  return (
    <div
      role="status"
      className={[
        'flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg',
        styles[variant],
      ].join(' ')}
    >
      <Icon
        size={19}
        className="mt-0.5 shrink-0"
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        {message && (
          <p className="mt-1 text-xs opacity-80">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="rounded-lg p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}

interface ToastContainerProps {
  children: ReactNode
}

export function ToastContainer({
  children,
}: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-200 flex flex-col items-end gap-2 sm:left-auto sm:w-auto">
      <div className="pointer-events-auto flex w-full flex-col items-end gap-2">
        {children}
      </div>
    </div>
  )
}
