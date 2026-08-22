import type {
  Task,
  TaskPriority,
  TaskStatus,
} from '../../../types/task.types'

export interface StatusChartData {
  name: string
  value: number
}

export interface PriorityChartData {
  priority: string
  low: number
  medium: number
  high: number
}

export interface CompletionTrendData {
  date: string
  completed: number
}

export interface VelocityData {
  sprint: string
  completed: number
}

const statusLabels: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
}

export function getStatusData(
  tasks: Task[],
): StatusChartData[] {
  const statuses: TaskStatus[] = [
    'backlog',
    'in-progress',
    'review',
    'done',
  ]

  return statuses.map((status) => ({
    name: statusLabels[status],
    value: tasks.filter(
      (task) => task.status === status,
    ).length,
  }))
}

export function getPriorityData(
  tasks: Task[],
): PriorityChartData[] {
  const priorities: TaskPriority[] = [
    'low',
    'medium',
    'high',
  ]

  return priorities.map((priority) => {
    const tasksByPriority = tasks.filter(
      (task) => task.priority === priority,
    )

    return {
      priority:
        priority.charAt(0).toUpperCase() +
        priority.slice(1),

      low: tasksByPriority.filter(
        (task) => task.status === 'backlog',
      ).length,

      medium: tasksByPriority.filter(
        (task) => task.status === 'in-progress',
      ).length,

      high: tasksByPriority.filter(
        (task) =>
          task.status === 'review' ||
          task.status === 'done',
      ).length,
    }
  })
}

export function getCompletionTrend(
  tasks: Task[],
): CompletionTrendData[] {
  const completedTasks = tasks
    .filter(
      (task) =>
        task.status === 'done' &&
        Boolean(task.completedAt),
    )
    .sort(
      (a, b) =>
        new Date(a.completedAt ?? '').getTime() -
        new Date(b.completedAt ?? '').getTime(),
    )

  const grouped = new Map<string, number>()

  completedTasks.forEach((task) => {
    if (!task.completedAt) {
      return
    }

    const date = new Date(
      task.completedAt,
    ).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    })

    grouped.set(
      date,
      (grouped.get(date) ?? 0) + 1,
    )
  })

  return Array.from(grouped.entries()).map(
    ([date, completed]) => ({
      date,
      completed,
    }),
  )
}

export function getVelocityData(
  tasks: Task[],
): VelocityData[] {
  const sprintMap = new Map<
    number,
    number
  >()

  tasks
    .filter((task) => task.status === 'done')
    .forEach((task) => {
      sprintMap.set(
        task.sprintId,
        (sprintMap.get(task.sprintId) ?? 0) + 1,
      )
    })

  return Array.from(sprintMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([sprint, completed]) => ({
      sprint: `Sprint ${sprint}`,
      completed,
    }))
}