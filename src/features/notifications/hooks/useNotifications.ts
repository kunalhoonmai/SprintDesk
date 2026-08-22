import { useEffect } from 'react'

import { getNotifications } from '../notification.service'
import { useNotificationStore } from '../notification.store'

const POLLING_INTERVAL = 30_000

export function useNotifications() {
  const notifications =
    useNotificationStore(
      (state) => state.notifications,
    )

  const setNotifications =
    useNotificationStore(
      (state) => state.setNotifications,
    )

  const markAsRead =
    useNotificationStore(
      (state) => state.markAsRead,
    )

  const markAllAsRead =
    useNotificationStore(
      (state) => state.markAllAsRead,
    )

  useEffect(() => {
    let cancelled = false

    async function fetchNotifications() {
      if (
        document.visibilityState ===
        'hidden'
      ) {
        return
      }

      try {
        const data =
          await getNotifications()

        if (!cancelled) {
          setNotifications(data)
        }
      } catch (error) {
        console.error(
          'Notification polling failed:',
          error,
        )
      }
    }

    fetchNotifications()

    const interval = window.setInterval(
      fetchNotifications,
      POLLING_INTERVAL,
    )

    function handleVisibilityChange() {
      if (
        document.visibilityState ===
        'visible'
      ) {
        fetchNotifications()
      }
    }

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    )

    return () => {
      cancelled = true
      window.clearInterval(interval)

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      )
    }
  }, [setNotifications])

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read,
    ).length

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}