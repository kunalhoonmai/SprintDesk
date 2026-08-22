import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type {
  Task,
  TaskStatus,
} from '../../../types/task.types'

interface BoardState {
  tasks: Task[]
  initialized: boolean

  initializeTasks: (tasks: Task[]) => void

  moveTask: (
    taskId: number,
    newStatus: TaskStatus,
    newOrder?: number,
  ) => void

  updateTask: (
    taskId: number,
    updates: Partial<Task>,
  ) => void

  deleteTask: (taskId: number) => void

  updateTaskOrder: (
    taskId: number,
    newOrder: number,
  ) => void

  resetBoard: () => void
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      tasks: [],
      initialized: false,

      initializeTasks: (tasks) =>
        set((state) => {
          if (
            state.initialized &&
            state.tasks.length > 0
          ) {
            return state
          }

          return {
            tasks,
            initialized: true,
          }
        }),

      moveTask: (
        taskId,
        newStatus,
        newOrder,
      ) =>
        set((state) => {
          const task = state.tasks.find(
            (item) => item.id === taskId,
          )

          if (!task) {
            return state
          }

          const targetOrder =
            newOrder ??
            state.tasks.filter(
              (item) =>
                item.status === newStatus &&
                item.id !== taskId,
            ).length + 1

          const nextTasks = state.tasks.map(
            (item) => {
              if (item.id === taskId) {
                return {
                  ...item,
                  status: newStatus,
                  order: targetOrder,
                  updatedAt:
                    new Date().toISOString(),
                  completedAt:
                    newStatus === 'done'
                      ? item.completedAt ??
                        new Date().toISOString()
                      : null,
                }
              }

              return item
            },
          )

          /*
           * Normalize ordering for every column.
           */
          const statuses: TaskStatus[] = [
            'backlog',
            'in-progress',
            'review',
            'done',
          ]

          const normalizedTasks =
            statuses.flatMap((status) => {
              const columnTasks =
                nextTasks
                  .filter(
                    (item) =>
                      item.status === status,
                  )
                  .sort(
                    (a, b) =>
                      a.order - b.order,
                  )

              return columnTasks.map(
                (item, index) => ({
                  ...item,
                  order: index + 1,
                }),
              )
            })

          return {
            tasks: normalizedTasks,
          }
        }),

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  ...updates,
                  updatedAt:
                    new Date().toISOString(),
                }
              : task,
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => {
          const remainingTasks =
            state.tasks.filter(
              (task) => task.id !== taskId,
            )

          const statuses: TaskStatus[] = [
            'backlog',
            'in-progress',
            'review',
            'done',
          ]

          const normalizedTasks =
            statuses.flatMap((status) =>
              remainingTasks
                .filter(
                  (task) =>
                    task.status === status,
                )
                .sort(
                  (a, b) =>
                    a.order - b.order,
                )
                .map((task, index) => ({
                  ...task,
                  order: index + 1,
                })),
            )

          return {
            tasks: normalizedTasks,
          }
        }),

      updateTaskOrder: (
        taskId,
        newOrder,
      ) =>
        set((state) => {
          const task = state.tasks.find(
            (item) => item.id === taskId,
          )

          if (!task) {
            return state
          }

          const columnTasks =
            state.tasks
              .filter(
                (item) =>
                  item.status === task.status &&
                  item.id !== taskId,
              )
              .sort(
                (a, b) =>
                  a.order - b.order,
              )

          const insertIndex = Math.max(
            0,
            Math.min(
              newOrder - 1,
              columnTasks.length,
            ),
          )

          columnTasks.splice(
            insertIndex,
            0,
            {
              ...task,
              updatedAt:
                new Date().toISOString(),
            },
          )

          const reorderedColumn =
            columnTasks.map(
              (item, index) => ({
                ...item,
                order: index + 1,
              }),
            )

          const otherTasks =
            state.tasks.filter(
              (item) =>
                item.status !== task.status,
            )

          return {
            tasks: [
              ...otherTasks,
              ...reorderedColumn,
            ],
          }
        }),

      resetBoard: () =>
        set({
          tasks: [],
          initialized: false,
        }),
    }),
    {
      name: 'sprintdesk-board',

      partialize: (state) => ({
        tasks: state.tasks,
        initialized:
          state.initialized,
      }),
    },
  ),
)