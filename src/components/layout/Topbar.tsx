import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  Check,
  LogOut,
  Menu,
  Search,
} from 'lucide-react'

import { useNotifications } from '../../features/notifications/hooks/useNotifications'
import { useBoardStore } from '../../features/board/store/board.store'
import { useTaskSearch } from '../../features/search/hooks/useTaskSearch'
import { useAuth } from '../../features/auth/hooks/useAuth'

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

  const {
    user,
    logout,
  } = useAuth()

  const [profileOpen, setProfileOpen] =
    useState(false)

  const profileRef =
    useRef<HTMLDivElement>(null)

  const tasks = useBoardStore(
    (state) => state.tasks,
  )

  const [searchOpen, setSearchOpen] =
    useState(false)

  const [searchQuery, setSearchQuery] =
    useState('')

  const searchInputRef =
    useRef<HTMLInputElement>(null)

  const { results, hasResults } =
    useTaskSearch({
      tasks,
      query: searchQuery,
    })

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [])

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

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent,
    ) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node,
        )
      ) {
        setProfileOpen(false)
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
    <header
  className="
    sticky top-0 z-30
    flex h-16 shrink-0
    items-center justify-between
    border-b
    border-slate-200/70
    bg-white/85
    px-4
    backdrop-blur-xl
    transition-colors
    duration-200

    dark:border-slate-800/70
    dark:bg-slate-950/85

    sm:px-6
    lg:px-8
  "
>
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
            {title}
          </h1>

          {subtitle && (
            <p className="hidden truncate text-[11px] text-slate-500 dark:text-slate-400 sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {searchOpen && (
      <div className="absolute right-4 top-14 z-40 w-[calc(100vw-2rem)] max-w-md sm:right-6 sm:w-96 lg:right-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">

          {/* Search input */}
          <div className="p-3">
            <div
              className="
                flex items-center gap-2
                rounded-xl
                border border-violet-300
                bg-white
                px-3 py-2.5
                ring-2 ring-violet-100

                dark:border-violet-500/40
                dark:bg-slate-800
                dark:ring-violet-500/10
              "
            >
              <Search
                size={18}
                className="shrink-0 text-slate-400"
              />

              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search tasks..."
                autoFocus
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="shrink-0 text-xs font-medium text-slate-400 transition hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {searchQuery.trim() && (
            <div
              className="
                max-h-80
                overflow-y-auto
                border-t border-slate-100
                dark:border-slate-800
              "
            >
              {!hasResults ? (
                <div className="px-4 py-8 text-center">
                  <Search
                    size={24}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    No tasks found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try a different search term.
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {results.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery('')
                      }}
                      className="
                        w-full rounded-xl
                        px-3 py-3
                        text-left
                        transition

                        hover:bg-slate-50

                        dark:hover:bg-slate-800
                      "
                    >
                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {task.title}
                      </p>

                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold capitalize text-violet-600">
                          {task.status}
                        </span>

                        <span className="text-[11px] capitalize text-slate-400">
                          {task.priority}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}

      {/* Right */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search */}
        <button
          type="button"
          onClick={() =>
            setSearchOpen((open) => !open)
          }
          aria-label="Search tasks"
          className={[
            'flex h-10 w-10 items-center justify-center rounded-xl border transition-all',
            searchOpen
              ? 'border-violet-200 bg-violet-50 text-violet-600 shadow-sm dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-400'
              : 'border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-white',
          ].join(' ')}
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
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-white"
          >
            <Bell size={19} />

            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white dark:ring-slate-950">
                {unreadCount > 9
                  ? '9+'
                  : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationsOpen && (
            <div
              className="
                absolute right-0 top-12 z-50
                w-[calc(100vw-2rem)]
                max-w-96
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-xl
                shadow-slate-900/10

                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/30
              "
            >
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
                            ? 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800'
                            : 'bg-violet-50/50 hover:bg-violet-50 dark:bg-violet-500/10 dark:hover:bg-violet-500/15',
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
                                ? 'font-medium text-slate-700 dark:text-slate-300'
                                : 'font-semibold text-slate-900 dark:text-white',
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
        <div className="mx-1 hidden h-7 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

        {/* Profile */}
        <div
          ref={profileRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (open) => !open,
              )
            }
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-2 rounded-xl border border-transparent p-1.5 transition-all hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-800 dark:hover:bg-slate-900"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                {user?.firstName?.[0] ?? 'U'}
                {user?.lastName?.[0] ?? ''}
              </div>
            )}

            <span className="hidden max-w-32 truncate text-sm font-semibold text-slate-700 dark:text-slate-200 md:block">
              {user
                ? `${user.firstName} ${user.lastName}`
                : 'User'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
              {/* User information */}
              <div className="border-b border-slate-100 px-4 py-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                      {user?.firstName?.[0] ?? 'U'}
                      {user?.lastName?.[0] ?? ''}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : 'User'}
                    </p>

                    <p className="truncate text-xs text-slate-400">
                      {user?.email ?? ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false)
                    logout()
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />

                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}