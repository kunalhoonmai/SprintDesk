import {
  Bell,
  Check,
  CheckCheck,
  Circle,
} from 'lucide-react'

import { AppShell } from '../../components/layout/AppShell'
import { useNotifications } from '../../features/notifications/hooks/useNotifications'

import { Button } from '../../components/ui/Button'

export function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications()

  return (
    <AppShell
      title="Notifications"
      subtitle="Stay updated with your workspace activity"
    >
      <div className="mx-auto w-full max-w-360 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review recent activity and updates from
              your workspace.
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              type="button"
              onClick={markAllAsRead}
            >
              <CheckCheck size={16} />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2">
          <SummaryCard
            title="Total Notifications"
            value={notifications.length}
            description="All workspace notifications"
            icon={Bell}
          />

          <SummaryCard
            title="Unread"
            value={unreadCount}
            description={
              unreadCount > 0
                ? 'Notifications waiting for you'
                : 'You are all caught up'
            }
            icon={Circle}
          />
        </div>

        {/* Notification List */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Recent Notifications
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Your latest workspace activity
                </p>
              </div>

              {unreadCount > 0 && (
                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <EmptyNotifications />
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() =>
                    markAsRead(notification.id)
                  }
                  className={[
                    'flex w-full gap-4 px-5 py-4 text-left transition',
                    notification.read
                      ? 'bg-white hover:bg-slate-50'
                      : 'bg-violet-50/40 hover:bg-violet-50',
                  ].join(' ')}
                >
                  {/* Status */}
                  <div className="pt-1.5">
                    <span
                      className={[
                        'block h-2.5 w-2.5 rounded-full',
                        notification.read
                          ? 'bg-slate-200'
                          : 'bg-violet-600',
                      ].join(' ')}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p
                        className={[
                          'text-sm',
                          notification.read
                            ? 'font-medium text-slate-700'
                            : 'font-semibold text-slate-900',
                        ].join(' ')}
                      >
                        {notification.title}
                      </p>

                      <span className="shrink-0 text-[10px] text-slate-400">
                        {notification.createdAt}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {notification.message}
                    </p>
                  </div>

                  {/* Read Indicator */}
                  {notification.read && (
                    <div className="hidden pt-1 sm:block">
                      <Check
                        size={15}
                        className="text-emerald-500"
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  )
}

interface SummaryCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ComponentType<{
    size?: number
    className?: string
  }>
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  )
}

function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <Bell
          size={24}
          className="text-slate-400"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-700">
        No notifications
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
        You're all caught up. New workspace activity
        will appear here.
      </p>
    </div>
  )
}