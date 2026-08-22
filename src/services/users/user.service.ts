import type { MockData, User } from '../../types/task.types'

const MOCK_DATA_URL = '/mock-data.json'

async function getMockData(): Promise<MockData> {
  const response = await fetch(MOCK_DATA_URL)

  if (!response.ok) {
    throw new Error(
      `Failed to load mock data: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<MockData>
}

export async function getUsers(): Promise<User[]> {
  const data = await getMockData()

  return data.users
}

export async function getUserById(
  userId: number,
): Promise<User | undefined> {
  const users = await getUsers()

  return users.find((user) => user.id === userId)
}