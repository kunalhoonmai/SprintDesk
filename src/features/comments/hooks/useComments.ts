import { useQuery } from '@tanstack/react-query'

import {
  getComments,
  getCommentsByTask,
} from '../../../services/comments/comment.service'

export const commentQueryKeys = {
  all: ['comments'] as const,

  list: () =>
    [...commentQueryKeys.all, 'list'] as const,

  byTask: (taskId: number) =>
    [
      ...commentQueryKeys.all,
      'task',
      taskId,
    ] as const,
}

export function useComments() {
  return useQuery({
    queryKey: commentQueryKeys.list(),
    queryFn: getComments,
  })
}

export function useTaskComments(
  taskId: number,
) {
  return useQuery({
    queryKey:
      commentQueryKeys.byTask(taskId),

    queryFn: () =>
      getCommentsByTask(taskId),

    enabled: Boolean(taskId),
  })
}