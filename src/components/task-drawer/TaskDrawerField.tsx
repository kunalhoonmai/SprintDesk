interface TaskDrawerFieldProps {
  label: string
  children: React.ReactNode
}

export function TaskDrawerField({
  label,
  children,
}: TaskDrawerFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      {children}
    </div>
  )
}