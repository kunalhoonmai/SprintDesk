import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  Check,
  Menu,
  Search,
} from 'lucide-react'

import { useNotifications } from '../../features/notifications/hooks/useNotifications'

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
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications()

  const [notificationsOpen, setNotificationsOpen] =
    useState(false)

  const notificationRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent,
    ) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node,
        )
      ) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick,
      )
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
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

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Search size={19} />
        </button>

        {/* Notifications */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setNotificationsOpen(
                (open) => !open,
              )
            }
            aria-label="Open notifications"
            aria-expanded={
              notificationsOpen
            }
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Bell size={19} />

            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
                {unreadCount > 9
                  ? '9+'
                  : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Notifications
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread`
                      : 'All caught up'}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-violet-600 transition hover:text-violet-700"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length ===
                0 ? (
                  <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <Bell
                        size={20}
                        className="text-slate-400"
                      />
                    </div>

                    <p className="mt-3 text-sm font-medium text-slate-700">
                      No notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      You're all caught up.
                    </p>
                  </div>
                ) : (
                  notifications.map(
                    (notification) => (
                      <button
                        key={
                          notification.id
                        }
                        type="button"
                        onClick={() =>
                          markAsRead(
                            notification.id,
                          )
                        }
                        className={[
                          'flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0',
                          notification.read
                            ? 'bg-white hover:bg-slate-50'
                            : 'bg-violet-50/50 hover:bg-violet-50',
                        ].join(' ')}
                      >
                        {/* Status */}
                        <div className="pt-1.5">
                          <span
                            className={[
                              'block h-2 w-2 rounded-full',
                              notification.read
                                ? 'bg-transparent'
                                : 'bg-violet-600',
                            ].join(' ')}
                          />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={[
                              'text-sm leading-5',
                              notification.read
                                ? 'font-medium text-slate-700'
                                : 'font-semibold text-slate-900',
                            ].join(' ')}
                          >
                            {
                              notification.title
                            }
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                            {
                              notification.message
                            }
                          </p>

                          <p className="mt-1.5 text-[10px] text-slate-400">
                            {
                              notification.createdAt
                            }
                          </p>
                        </div>

                        {/* Read Icon */}
                        {notification.read && (
                          <div className="pt-1">
                            <Check
                              size={14}
                              className="text-emerald-500"
                            />
                          </div>
                        )}
                      </button>
                    ),
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Profile */}
        <button
          type="button"
          aria-label="Open profile menu"
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-xs font-bold text-violet-700">
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