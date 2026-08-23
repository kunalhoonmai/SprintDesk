import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  CalendarDays,
  MessageCircle,
  Send,
  Trash2,
  UserRound,
} from 'lucide-react'

import type {
  Task,
  TaskPriority,
  TaskStatus,
  User,
} from '../../types/task.types'

import { useBoardStore } from '../../features/board/store/board.store'
import { useCommentsStore } from '../../features/comments/comments.store'

import { TaskDrawerHeader } from './TaskDrawerHeader'
import { TaskDrawerField } from './TaskDrawerField'

import { Select } from '../../components/ui/Select'

interface TaskDrawerProps {
  task: Task | null
  users: User[]
  onClose: () => void
}

const inputClasses =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100'

export function TaskDrawer({
  task,
  users,
  onClose,
}: TaskDrawerProps) {
  const updateTask = useBoardStore(
    (state) => state.updateTask,
  )

  const deleteTask = useBoardStore(
    (state) => state.deleteTask,
  )

  const comments = useCommentsStore(
    (state) => state.comments,
  )

  const addComment = useCommentsStore(
    (state) => state.addComment,
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] =
    useState<TaskStatus>('backlog')
  const [priority, setPriority] =
    useState<TaskPriority>('medium')
  const [assigneeId, setAssigneeId] = useState<number>(0)
  const [dueDate, setDueDate] = useState('')

  const [newComment, setNewComment] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false)

  useEffect(() => {
    if (!task) {
      return
    }

    setTitle(task.title)
    setDescription(task.description)
    setStatus(task.status)
    setPriority(task.priority)
    setAssigneeId(task.assigneeId)
    setDueDate(task.dueDate)
    setNewComment('')
    setShowDeleteConfirm(false)
  }, [task])

  const taskComments = useMemo(() => {
    if (!task) {
      return []
    }

    return comments
      .filter((comment) => comment.taskId === task.id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime(),
      )
  }, [comments, task])

  if (!task) {
    return null
  }

  function handleSave() {
    if (!task) {
        return
    }

    if (!title.trim()) {
        return
    }

    updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        assigneeId,
        dueDate,
    })

    onClose()
    }

  function handleDelete() {
    if (!task) {
        return
    }

    deleteTask(task.id)
    onClose()
    }

  function handleAddComment() {
    if (!task) {
        return
    }

    const message = newComment.trim()

    if (!message) {
        return
    }

    /*
    * Until authentication is implemented,
    * use the task assignee as the comment author.
    */
    const authorId = assigneeId

    if (!authorId) {
        return
    }

    addComment(
        task.id,
        authorId,
        message,
    )

    setNewComment('')
    }

  function formatCommentDate(
    date: string,
  ) {
    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return date
    }

    return parsedDate.toLocaleString(
      undefined,
      {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      },
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl">
        <TaskDrawerHeader onClose={onClose} />

        {/* Scrollable Content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <div className="space-y-7">

            {/* Title */}
            <TaskDrawerField label="Title">
              <input
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                className={inputClasses}
                placeholder="Enter task title"
              />
            </TaskDrawerField>

            {/* Description */}
            <TaskDrawerField label="Description">
              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={5}
                className={`${inputClasses} resize-none`}
                placeholder="Describe the task..."
              />
            </TaskDrawerField>

            {/* Status + Priority */}
            <div className="grid gap-5 sm:grid-cols-2">
              <TaskDrawerField label="Status">
                <Select
                  label="Status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as TaskStatus)
                  }
                  options={[
                    { label: 'Backlog', value: 'backlog' },
                    { label: 'In Progress', value: 'in-progress' },
                    { label: 'Review', value: 'review' },
                    { label: 'Done', value: 'done' },
                  ]}
                />
              </TaskDrawerField>

              <TaskDrawerField label="Priority">
                <Select
                  label="Priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value as TaskPriority)
                  }
                  options={[
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]}
                />
              </TaskDrawerField>
            </div>

            {/* Assignee */}
            <TaskDrawerField label="Assignee">
              <div className="relative">
                <UserRound
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Select
                  label="Assignee"
                  value={String(assigneeId)}
                  onChange={(event) =>
                    setAssigneeId(Number(event.target.value))
                  }
                  options={users.map((user) => ({
                    label: user.name,
                    value: String(user.id),
                  }))}
                />
              </div>
            </TaskDrawerField>

            {/* Due Date */}
            <TaskDrawerField label="Due date">
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </TaskDrawerField>

            {/* Comments */}
            <section className="border-t border-slate-200 pt-6">
              <div className="mb-4 flex items-center gap-2">
                <MessageCircle
                  size={17}
                  className="text-violet-600"
                />

                <h3 className="text-sm font-semibold text-slate-900">
                  Comments
                </h3>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                  {taskComments.length}
                </span>
              </div>

              {/* Existing comments */}
              <div className="space-y-4">
                {taskComments.length > 0 ? (
                  taskComments.map((comment) => {
                    const author = users.find(
                      (user) =>
                        user.id === comment.authorId,
                    )

                    const initials =
                      author?.name
                        ?.split(' ')
                        .map(
                          (part) => part[0],
                        )
                        .join('')
                        .slice(0, 2) ?? '?'

                    return (
                      <div
                        key={comment.id}
                        className="flex gap-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                          {initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="text-xs font-semibold text-slate-800">
                              {author?.name ??
                                'Unknown user'}
                            </span>

                            <span className="text-[10px] text-slate-400">
                              {formatCommentDate(
                                comment.createdAt,
                              )}
                            </span>
                          </div>

                          <p className="mt-1 rounded-xl rounded-tl-sm bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600">
                            {comment.message}
                          </p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center">
                    <MessageCircle
                      size={20}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      No comments yet.
                    </p>
                  </div>
                )}
              </div>

              {/* Add comment */}
              <div className="mt-5">
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(event) =>
                      setNewComment(
                        event.target.value,
                      )
                    }
                    rows={3}
                    maxLength={1000}
                    placeholder="Write a comment..."
                    className={`${inputClasses} resize-none pr-12`}
                  />

                  <button
                    type="button"
                    onClick={handleAddComment}
                    disabled={
                      !newComment.trim()
                    }
                    aria-label="Add comment"
                    className="
                      absolute bottom-3 right-3
                      flex h-8 w-8 items-center
                      justify-center rounded-lg
                      bg-violet-600 text-white
                      transition hover:bg-violet-700
                      disabled:cursor-not-allowed
                      disabled:bg-slate-200
                      disabled:text-slate-400
                    "
                  >
                    <Send size={14} />
                  </button>
                </div>

                <div className="mt-1 flex justify-end">
                  <span className="text-[10px] text-slate-400">
                    {newComment.length}/1000
                  </span>
                </div>
              </div>
            </section>

            {/* Task Metadata */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-400">
                    Task ID
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    #{task.id}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Sprint
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    Sprint {task.sprintId}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Created
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {task.createdAt}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Updated
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {task.updatedAt}
                  </p>
                </div>
              </div>
            </div>

            {/* Delete */}
            <div className="border-t border-slate-200 pt-5">
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowDeleteConfirm(true)
                  }
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700"
                >
                  <Trash2 size={16} />
                  Delete task
                </button>
              ) : (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex gap-3">
                    <AlertTriangle
                      size={18}
                      className="mt-0.5 shrink-0 text-red-500"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-800">
                        Delete this task?
                      </p>

                      <p className="mt-1 text-xs leading-5 text-red-600">
                        This action cannot be undone.
                      </p>

                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setShowDeleteConfirm(
                              false,
                            )
                          }
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={handleDelete}
                          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim()}
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save changes
          </button>
        </footer>
      </aside>
    </>
  )
}