import type { Comment } from '../../types/task.types'

import { getMockData } from '../mock/mock-data.service'

export async function getComments(): Promise<Comment[]> {
  const data = await getMockData()

  return data.comments
}

export async function getCommentsByTask(
  taskId: number,
): Promise<Comment[]> {
  const comments = await getComments()

  return comments
    .filter(
      (comment) => comment.taskId === taskId,
    )
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime(),
    )
}