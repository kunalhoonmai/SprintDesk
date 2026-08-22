import type { MockData } from '../../types/task.types'

const MOCK_DATA_URL = '/mock-data.json'

export async function getMockData(): Promise<MockData> {
  const response = await fetch(MOCK_DATA_URL)

  if (!response.ok) {
    throw new Error(
      `Failed to load mock data: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<MockData>
}