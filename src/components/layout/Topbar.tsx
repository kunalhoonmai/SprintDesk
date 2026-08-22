import { Bell, Menu, Search } from 'lucide-react'

interface TopbarProps {
  onMenuClick: () => void
  title: string
  subtitle?: string
}

export function Topbar({
  onMenuClick,
  title,
  subtitle,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            {title}
          </h1>

          {subtitle && (
            <p className="hidden truncate text-xs text-slate-500 sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Search"
          className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-600 ring-2 ring-white" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          aria-label="Open profile menu"
          className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
            AJ
          </div>

          <span className="hidden text-sm font-medium text-slate-700 md:block">
            Alex
          </span>
        </button>
      </div>
    </header>
  )
}