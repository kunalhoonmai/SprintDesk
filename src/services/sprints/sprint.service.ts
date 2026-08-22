import type { MockData, Sprint } from '../../types/task.types'

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

export async function getSprints(): Promise<Sprint[]> {
  const data = await getMockData()

  return data.sprints
}

export async function getSprintById(
  sprintId: number,
): Promise<Sprint | undefined> {
  const sprints = await getSprints()

  return sprints.find((sprint) => sprint.id === sprintId)
}