import { AppShell } from '../../components/layout/AppShell'
import { useTasks } from '../../features/board/hooks/useTasks'

export function DashboardPage() {
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useTasks()

  return (
    <AppShell
      title="Dashboard"
      subtitle="SprintDesk"
    >
      <div className="mx-auto max-w-360 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Real Assignment Data
        </h2>

        {isLoading && (
          <p className="text-slate-500">
            Loading tasks...
          </p>
        )}

        {isError && (
          <p className="text-red-600">
            {error instanceof Error
              ? error.message
              : 'Failed to load tasks'}
          </p>
        )}

        {!isLoading && !isError && (
          <>
            <p className="text-slate-600">
              Loaded {tasks.length} tasks from mock-data.json
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.slice(0, 6).map((task) => (
                <article
                  key={task.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-medium uppercase text-slate-400">
                    {task.status}
                  </p>

                  <h3 className="mt-2 font-semibold text-slate-900">
                    {task.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {task.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-medium text-violet-600">
                      {task.priority}
                    </span>

                    <span className="text-slate-400">
                      Due {task.dueDate}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}