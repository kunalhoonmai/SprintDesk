import { useDroppable } from '@dnd-kit/core'

import type {
  Task,
  TaskStatus,
  User,
} from '../../types/task.types'

import { TaskCard } from './TaskCard'

interface KanbanColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
  users: User[]
  onTaskClick: (taskId: number) => void
}

const statusDotStyles: Record<
  TaskStatus,
  string
> = {
  backlog: 'bg-slate-400',
  'in-progress': 'bg-blue-500',
  review: 'bg-amber-500',
  done: 'bg-emerald-500',
}

export function KanbanColumn({
  title,
  status,
  tasks,
  users,
  onTaskClick,
}: KanbanColumnProps) {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: `column-${status}`,
    data: {
      type: 'column',
      status,
    },
  })

  return (
    <section
      ref={setNodeRef}
      className={[
        'flex min-h-0 flex-col rounded-2xl p-3 transition-colors',
        isOver
          ? 'bg-violet-50 ring-2 ring-violet-200'
          : 'bg-slate-100/70',
      ].join(' ')}
    >
      {/* Column Header */}
      <header className="mb-3 shrink-0 px-2 py-1">
        <div className="flex items-center gap-2">
          <span
            className={[
              'h-2 w-2 rounded-full',
              statusDotStyles[status],
            ].join(' ')}
          />

          <h2 className="text-sm font-semibold text-slate-800">
            {title}
          </h2>

          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-500 shadow-sm">
            {tasks.length}
          </span>
        </div>
      </header>

      {/* Scrollable Task Area */}
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {tasks.map((task) => {
          const assignee = users.find(
            (user) =>
              user.id === task.assigneeId,
          )

          return (
            <TaskCard
              key={task.id}
              task={task}
              assignee={assignee}
              onClick={() =>
                onTaskClick(task.id)
              }
            />
          )
        })}

        {tasks.length === 0 && (
          <div
            className={[
              'flex min-h-32 items-center justify-center rounded-xl border border-dashed text-xs transition-colors',
              isOver
                ? 'border-violet-300 bg-violet-50 text-violet-500'
                : 'border-slate-300 text-slate-400',
            ].join(' ')}
          >
            Drop task here
          </div>
        )}
      </div>
    </section>
  )
}