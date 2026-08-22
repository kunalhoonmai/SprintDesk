import {
  BarChart3,
  Bell,
  Columns3,
  LayoutDashboard,
  Settings,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
  mobileOpen?: boolean
  onClose?: () => void
}

const navigation = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
  label: 'Sprint Board',
  path: '/board',
  icon: Columns3,
},
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
]

const secondaryNavigation = [
  {
    label: 'Notifications',
    path: '/notifications',
    icon: Bell,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col',
          'border-r border-slate-200 bg-white',
          'transition-transform duration-200',
          'lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
              S
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">
                SprintDesk
              </p>
              <p className="text-[11px] text-slate-500">
                Project workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-xl px-3 py-2.5',
                      'text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-violet-50 text-violet-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  <Icon size={18} strokeWidth={1.9} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>

          <p className="px-3 pb-2 pt-7 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            General
          </p>

          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-xl px-3 py-2.5',
                      'text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-violet-50 text-violet-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  <Icon size={18} strokeWidth={1.9} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
              AJ
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Alex Johnson
              </p>
              <p className="truncate text-xs text-slate-500">
                Product Manager
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}