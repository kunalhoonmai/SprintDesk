import { X } from 'lucide-react'

interface TaskDrawerHeaderProps {
  onClose: () => void
}

export function TaskDrawerHeader({
  onClose,
}: TaskDrawerHeaderProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
          Task details
        </p>

        <h2 className="mt-1 text-lg font-bold text-slate-900">
          Edit Task
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close task drawer"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <X size={19} />
      </button>
    </div>
  )
}