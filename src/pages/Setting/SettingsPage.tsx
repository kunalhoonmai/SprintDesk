import {
  Bell,
  Check,
  Lock,
  Palette,
  User,
} from 'lucide-react'

import { AppShell } from '../../components/layout/AppShell'
import { useAuth } from '../../features/auth/hooks/useAuth'

export function SettingsPage() {
  const { user } = useAuth()

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`
    : 'U'

  return (
    <AppShell
      title="Settings"
      subtitle="Manage your account and workspace preferences"
    >
      <div className="mx-auto w-full max-w-360 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your profile, notifications, and
            application preferences.
          </p>
        </div>

        {/* Profile */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Profile
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Your account information
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {user?.image ? (
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg font-bold text-violet-700">
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-base font-semibold text-slate-900">
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : 'User'}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {user?.email ?? ''}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                @{user?.username ?? ''}
              </p>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Account Preferences
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Configure how SprintDesk behaves for you.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <SettingRow
              icon={User}
              title="Profile information"
              description="Manage your personal account details."
              action="View profile"
            />

            <SettingRow
              icon={Bell}
              title="Notifications"
              description="Control how you receive workspace updates."
              action="Manage"
            />

            <SettingRow
              icon={Palette}
              title="Appearance"
              description="Customize the look and feel of SprintDesk."
              action="Default"
            />

            <SettingRow
              icon={Lock}
              title="Security"
              description="Manage your account security preferences."
              action="Protected"
            />
          </div>
        </section>

        {/* Application */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Check size={19} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Application status
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                SprintDesk is running normally and your
                workspace is ready to use.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

interface SettingRowProps {
  icon: React.ComponentType<{
    size?: number
    className?: string
  }>
  title: string
  description: string
  action: string
}

function SettingRow({
  icon: Icon,
  title,
  description,
  action,
}: SettingRowProps) {
  return (
    <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="w-fit rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
      >
        {action}
      </button>
    </div>
  )
}