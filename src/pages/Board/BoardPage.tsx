import { AlertCircle, LoaderCircle } from 'lucide-react'

import { AppShell } from '../../components/layout/AppShell'
import { KanbanBoard } from '../../components/kanban/KanbanBoard'
import { useBoardTasks } from '../../features/board/hooks/useBoardTasks'
import { useBoardUsers } from '../../features/board/hooks/useBoardUsers'
import { useBoardComments } from '../../features/comments/hooks/useBoardComments'

export function BoardPage() {
  const {
    tasks,
    isLoading: tasksLoading,
    isError: tasksError,
    error: taskError,
  } = useBoardTasks()

  const {
    data: users = [],
    isLoading: usersLoading,
  } = useBoardUsers()

  const {
    isLoading: commentsLoading,
    } = useBoardComments()

  const isLoading =
  tasksLoading ||
  usersLoading ||
  commentsLoading

  return (
    <AppShell
      title="Sprint Board"
      subtitle="Sprint 3 · Aug 17–28, 2026"
    >
      <div className="mx-auto flex h-full max-w-360 min-h-0 flex-col">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Sprint Board
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage tasks across the sprint workflow.
          </p>
        </div>

        {isLoading && (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Loading sprint tasks...
            </div>
          </div>
        )}

        {tasksError && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            <AlertCircle size={20} />

            {taskError instanceof Error
              ? taskError.message
              : 'Failed to load sprint tasks.'}
          </div>
        )}

        {!isLoading && !tasksError && (
          <KanbanBoard
            tasks={tasks}
            users={users}
          />
        )}
      </div>
    </AppShell>
  )
}