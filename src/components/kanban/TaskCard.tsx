import { useDraggable } from '@dnd-kit/core'
import {
  CalendarDays,
  GripVertical,
} from 'lucide-react'

import type {
  Task,
  TaskPriority,
  User,
} from '../../types/task.types'

interface TaskCardProps {
  task: Task
  assignee?: User
  isDragging?: boolean
  onClick?: () => void
}

const priorityStyles: Record<
  TaskPriority,
  string
> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-red-50 text-red-700',
}

export function TaskCard({
  task,
  assignee,
  isDragging = false,
  onClick,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: dndDragging,
  } = useDraggable({
    id: task.id,
    data: {
      type: 'task',
      status: task.status,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <article
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={[
        'group rounded-xl border bg-white p-4 shadow-sm transition',
        'cursor-pointer',
        'border-slate-200 hover:-translate-y-0.5 hover:shadow-md',
        dndDragging || isDragging
          ? 'opacity-30'
          : 'opacity-100',
      ].join(' ')}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          {...listeners}
          {...attributes}
          aria-label="Drag task"
          onClick={(event) =>
            event.stopPropagation()
          }
          className="
            mt-0.5 shrink-0 touch-none
            cursor-grab text-slate-300
            transition hover:text-slate-500
            active:cursor-grabbing
          "
        >
          <GripVertical size={16} />
        </button>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-5 text-slate-900">
            {task.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
            {task.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={[
            'rounded-full px-2 py-1 text-[11px] font-semibold capitalize',
            priorityStyles[task.priority],
          ].join(' ')}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-2">
          {assignee && (
            <div
              title={assignee.name}
              className="
                flex h-7 w-7 items-center
                justify-center rounded-full
                bg-violet-100 text-[10px]
                font-bold text-violet-700
              "
            >
              {assignee.name
                .split(' ')
                .map(
                  (part) => part[0],
                )
                .join('')
                .slice(0, 2)}
            </div>
          )}

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <CalendarDays size={13} />

            <span>
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}