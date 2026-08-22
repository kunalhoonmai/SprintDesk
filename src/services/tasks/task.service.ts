import type { Task } from '../../types/task.types'

import { getMockData } from '../mock/mock-data.service'

export async function getTasks(): Promise<Task[]> {
  const data = await getMockData()

  return data.tasks.slice(0, 30)
}

export async function getTasksBySprint(
  sprintId: number,
): Promise<Task[]> {
  const tasks = await getTasks()

  return tasks
    .filter(
      (task) => task.sprintId === sprintId,
    )
    .sort(
      (a, b) => a.order - b.order,
    )
}