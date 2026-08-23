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
  medium: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  high: 'bg-red-50 text-red-700 ring-1 ring-red-100',
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
        `
          group rounded-xl border
          bg-white p-4
          shadow-sm
          transition-all duration-200
          cursor-pointer
        `,
        `
          border-slate-200/80
          hover:-translate-y-0.5
          hover:border-violet-200
          hover:shadow-md
        `,
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
            mt-0.5 flex h-7 w-6 shrink-0
            touch-none cursor-grab
            items-center justify-center
            rounded-md
            text-slate-300
            transition
            hover:bg-slate-100
            hover:text-slate-500
            active:cursor-grabbing
          "
        >
          <GripVertical size={16} />
        </button>

        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-bold leading-5 text-slate-900">
            {task.title}
          </h3>

          <p className="mt-2.5 line-clamp-3 text-xs leading-5 text-slate-500">
            {task.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
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
                bg-violet-100
                text-[10px] font-bold
                text-violet-700
                ring-2 ring-white
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

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <CalendarDays size={13} />
            <span>{task.dueDate}</span>
          </div>
        </div>
      </div>
    </article>
  )
}