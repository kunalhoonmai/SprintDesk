import type { Notification } from './notification.types'

const MOCK_DATA_URL = '/mock-data.json'

interface MockNotification {
  id: number
  title: string
  message: string
  createdAt?: string
  read?: boolean
}

interface MockData {
  notifications?: MockNotification[]
}

export async function getNotifications(): Promise<
  Notification[]
> {
  const response = await fetch(MOCK_DATA_URL)

  if (!response.ok) {
    throw new Error(
      'Failed to load notifications.',
    )
  }

  const data =
    (await response.json()) as MockData

  if (!Array.isArray(data.notifications)) {
    return []
  }

  return data.notifications.map(
    (notification) => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      createdAt:
        notification.createdAt ??
        new Date().toISOString(),
      read: notification.read ?? false,
    }),
  )
}