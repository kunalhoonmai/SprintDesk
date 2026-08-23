import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useState } from 'react'

import { useBoardStore } from '../../features/board/store/board.store'
import { SwipeSectionIndicator } from '../../components/kanban/SwipeSectionIndicator'

import type {
  Task,
  TaskStatus,
  User,
} from '../../types/task.types'

import { TaskDrawer } from '../task-drawer/TaskDrawer'
import { KanbanColumn } from './KanbanColumn'
import { TaskCard } from './TaskCard'

interface KanbanBoardProps {
  tasks: Task[]
  users: User[]
}

const columns: {
  title: string
  status: TaskStatus
}[] = [
  {
    title: 'Backlog',
    status: 'backlog',
  },
  {
    title: 'In Progress',
    status: 'in-progress',
  },
  {
    title: 'Review',
    status: 'review',
  },
  {
    title: 'Done',
    status: 'done',
  },
]

export function KanbanBoard({
  tasks,
  users,
}: KanbanBoardProps) {
  const [activeTaskId, setActiveTaskId] =
    useState<number | null>(null)

  const [selectedTaskId, setSelectedTaskId] =
    useState<number | null>(null)

  const moveTask = useBoardStore(
    (state) => state.moveTask,
  )

  const updateTaskOrder = useBoardStore(
    (state) => state.updateTaskOrder,
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const activeTask =
    activeTaskId !== null
      ? tasks.find(
          (task) =>
            task.id === activeTaskId,
        )
      : undefined

  const selectedTask =
    selectedTaskId !== null
      ? tasks.find(
          (task) =>
            task.id === selectedTaskId,
        ) ?? null
      : null

  function handleDragStart(
    event: DragStartEvent,
  ) {
    setActiveTaskId(
      Number(event.active.id),
    )
  }

  function handleDragEnd(
    event: DragEndEvent,
  ) {
    const { active, over } = event

    setActiveTaskId(null)

    if (!over) {
      return
    }

    const taskId = Number(active.id)

    const currentTask = tasks.find(
      (task) => task.id === taskId,
    )

    if (!currentTask) {
      return
    }

    const overData = over.data.current

    /*
     * Dropped directly onto a column.
     */
    if (
      overData?.type === 'column'
    ) {
      const targetStatus =
        overData.status as TaskStatus

      const targetTasks = tasks
        .filter(
          (task) =>
            task.status === targetStatus &&
            task.id !== taskId,
        )
        .sort(
          (a, b) =>
            a.order - b.order,
        )

      const newOrder =
        targetTasks.length + 1

      if (
        currentTask.status ===
          targetStatus &&
        currentTask.order === newOrder
      ) {
        return
      }

      moveTask(
        taskId,
        targetStatus,
        newOrder,
      )

      return
    }

    /*
     * Dropped onto another task.
     */
    if (
      overData?.type === 'task'
    ) {
      const targetTaskId =
        Number(over.id)

      const targetTask =
        tasks.find(
          (task) =>
            task.id === targetTaskId,
        )

      if (!targetTask) {
        return
      }

      const targetStatus =
        targetTask.status

      let targetOrder =
        targetTask.order

      /*
       * When moving inside the same column,
       * account for the dragged task being
       * removed before insertion.
       */
      if (
        currentTask.status ===
        targetStatus
      ) {
        const currentTasks =
          tasks
            .filter(
              (task) =>
                task.status ===
                targetStatus &&
                task.id !== taskId,
            )
            .sort(
              (a, b) =>
                a.order - b.order,
            )

        const targetIndex =
          currentTasks.findIndex(
            (task) =>
              task.id === targetTaskId,
          )

        targetOrder =
          targetIndex + 1

        if (
          currentTask.order ===
          targetOrder
        ) {
          return
        }

        updateTaskOrder(
          taskId,
          targetOrder,
        )

        return
      }

      /*
       * Moving to another column.
       */
      moveTask(
        taskId,
        targetStatus,
        targetOrder,
      )
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >

        <div className="flex h-full min-h-0 flex-col">
          <div
            id="kanban-mobile-scroll"
            className="
              flex min-h-0 flex-1
              snap-x snap-mandatory
              gap-4 overflow-x-auto overflow-y-hidden
              scrollbar-none

              xl:grid
              xl:grid-cols-4
              xl:gap-4
              xl:overflow-visible
              xl:snap-none
            "
          >
            {columns.map((column) => {
              const columnTasks =
                tasks
                  .filter(
                    (task) =>
                      task.status ===
                      column.status,
                  )
                  .sort(
                    (a, b) =>
                      a.order - b.order,
                  )

              return (
                <KanbanColumn
                  key={column.status}
                  title={column.title}
                  status={column.status}
                  tasks={columnTasks}
                  users={users}
                  onTaskClick={(taskId) =>
                    setSelectedTaskId(taskId)
                  }
                />
              )
            })}
          </div>

          <SwipeSectionIndicator
            containerId="kanban-mobile-scroll"
            sections={[
              'Backlog',
              'In Progress',
              'Review',
              'Done',
            ]}
          />
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="w-70 rotate-2 opacity-95">
              <TaskCard
                task={activeTask}
                assignee={users.find(
                  (user) =>
                    user.id ===
                    activeTask.assigneeId,
                )}
                isDragging
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskDrawer
        task={selectedTask}
        users={users}
        onClose={() =>
          setSelectedTaskId(null)
        }
      />
    </>
  )
}