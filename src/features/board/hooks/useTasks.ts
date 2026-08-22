import { useQuery } from '@tanstack/react-query'

import {
  getTasks,
  getTasksBySprint,
} from '../../../services/tasks/task.service'

export const taskQueryKeys = {
  all: ['tasks'] as const,

  list: () => [...taskQueryKeys.all, 'list'] as const,

  bySprint: (sprintId: number) =>
    [...taskQueryKeys.all, 'sprint', sprintId] as const,
}

export function useTasks() {
  return useQuery({
    queryKey: taskQueryKeys.list(),
    queryFn: getTasks,
  })
}

export function useSprintTasks(sprintId: number) {
  return useQuery({
    queryKey: taskQueryKeys.bySprint(sprintId),
    queryFn: () => getTasksBySprint(sprintId),
    enabled: Boolean(sprintId),
  })
}