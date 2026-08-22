import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Notification } from './notification.types'

interface NotificationState {
  notifications: Notification[]

  setNotifications: (
    notifications: Notification[],
  ) => void

  markAsRead: (
    notificationId: number,
  ) => void

  markAllAsRead: () => void

  unreadCount: () => number
}

export const useNotificationStore =
  create<NotificationState>()(
    persist(
      (set, get) => ({
        notifications: [],

        setNotifications: (
          incomingNotifications,
        ) =>
          set((state) => {
            const existingReadState =
              new Map(
                state.notifications.map(
                  (notification) => [
                    notification.id,
                    notification.read,
                  ],
                ),
              )

            return {
              notifications:
                incomingNotifications.map(
                  (notification) => ({
                    ...notification,
                    read:
                      existingReadState.get(
                        notification.id,
                      ) ??
                      notification.read,
                  }),
                ),
            }
          }),

        markAsRead: (
          notificationId,
        ) =>
          set((state) => ({
            notifications:
              state.notifications.map(
                (notification) =>
                  notification.id ===
                  notificationId
                    ? {
                        ...notification,
                        read: true,
                      }
                    : notification,
              ),
          })),

        markAllAsRead: () =>
          set((state) => ({
            notifications:
              state.notifications.map(
                (notification) => ({
                  ...notification,
                  read: true,
                }),
              ),
          })),

        unreadCount: () =>
          get().notifications.filter(
            (notification) =>
              !notification.read,
          ).length,
      }),
      {
        name: 'sprintdesk-notifications',
      },
    ),
  )