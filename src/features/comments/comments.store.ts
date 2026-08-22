import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Comment } from '../../types/task.types'

interface CommentsState {
  comments: Comment[]
  initialized: boolean

  initializeComments: (
    comments: Comment[],
  ) => void

  addComment: (
    taskId: number,
    authorId: number,
    message: string,
  ) => void

  deleteComment: (
    commentId: number,
  ) => void
}

export const useCommentsStore =
  create<CommentsState>()(
    persist(
      (set) => ({
        comments: [],
        initialized: false,

        initializeComments: (
          initialComments,
        ) =>
          set((state) => {
            /*
             * Merge comments from mock-data.json
             * with comments already stored locally.
             *
             * This prevents:
             * - losing newly added comments
             * - duplicating server comments
             * - skipping initial comments after refresh
             */
            const commentsById =
              new Map<number, Comment>()

            initialComments.forEach(
              (comment) => {
                commentsById.set(
                  comment.id,
                  comment,
                )
              },
            )

            state.comments.forEach(
              (comment) => {
                commentsById.set(
                  comment.id,
                  comment,
                )
              },
            )

            return {
              comments: Array.from(
                commentsById.values(),
              ),
              initialized: true,
            }
          }),

        addComment: (
          taskId,
          authorId,
          message,
        ) =>
          set((state) => {
            const newComment: Comment = {
              id:
                Math.max(
                  0,
                  ...state.comments.map(
                    (comment) =>
                      comment.id,
                  ),
                ) + 1,

              taskId,

              authorId,

              message:
                message.trim(),

              createdAt:
                new Date().toISOString(),
            }

            return {
              comments: [
                ...state.comments,
                newComment,
              ],
            }
          }),

        deleteComment: (
          commentId,
        ) =>
          set((state) => ({
            comments:
              state.comments.filter(
                (comment) =>
                  comment.id !==
                  commentId,
              ),
          })),
      }),

      {
        name: 'sprintdesk-comments',

        partialize: (state) => ({
          comments: state.comments,
          initialized:
            state.initialized,
        }),
      },
    ),
  )