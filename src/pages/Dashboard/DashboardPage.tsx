import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ListTodo,
  RotateCcw,
} from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppShell } from '../../components/layout/AppShell'
import { useBoardTasks } from '../../features/board/hooks/useBoardTasks'
import type { TaskStatus } from '../../types/task.types'

import { Button } from '../../components/ui/Button'
import { Skeleton } from '../../components/ui/Skeleton'

const statusLabels: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
}

const statusStyles: Record<TaskStatus, string> = {
  backlog: 'bg-slate-100 text-slate-600',
  'in-progress': 'bg-blue-50 text-blue-700',
  review: 'bg-amber-50 text-amber-700',
  done: 'bg-emerald-50 text-emerald-700',
}

const statusDotStyles: Record<TaskStatus, string> = {
  backlog: 'bg-slate-400',
  'in-progress': 'bg-blue-500',
  review: 'bg-amber-500',
  done: 'bg-emerald-500',
}

export function DashboardPage() {
  const navigate = useNavigate()

  const {
    tasks,
    isLoading,
    isError,
    error,
  } = useBoardTasks()

  const totalTasks = tasks.length

  const completedTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === 'done',
      ).length,
    [tasks],
  )

  const inProgressTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === 'in-progress',
      ).length,
    [tasks],
  )

  const reviewTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === 'review',
      ).length,
    [tasks],
  )

  const completionRate =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100,
        )
      : 0

  const statusCounts = useMemo(
    () => ({
      backlog: tasks.filter(
        (task) => task.status === 'backlog',
      ).length,

      'in-progress': tasks.filter(
        (task) => task.status === 'in-progress',
      ).length,

      review: tasks.filter(
        (task) => task.status === 'review',
      ).length,

      done: tasks.filter(
        (task) => task.status === 'done',
      ).length,
    }),
    [tasks],
  )

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime(),
        )
        .slice(0, 6),
    [tasks],
  )

  return (
    <AppShell
      title="Dashboard"
      subtitle="SprintDesk"
    >
      <div className="mx-auto w-full max-w-360 space-y-6 overflow-y-auto pb-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Sprint 3
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Sprint Overview
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Aug 17–28, 2026 · Track your team's
              sprint progress.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => navigate('/board')}
            size="md"
          >
            Open Sprint Board
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />

              <Skeleton
                variant="text"
                className="h-4 w-72"
              />

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Skeleton variant="card" className="h-32" />
                <Skeleton variant="card" className="h-32" />
                <Skeleton variant="card" className="h-32" />
                <Skeleton variant="card" className="h-32" />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Skeleton variant="card" className="h-64" />
                <Skeleton variant="card" className="h-64" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error instanceof Error
              ? error.message
              : 'Failed to load sprint data.'}
          </div>
        )}

        {/* Dashboard */}
        {!isLoading && !isError && (
          <>
            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="Total Tasks"
                value={totalTasks}
                description="Tasks in sprint"
                icon={ListTodo}
              />

              <MetricCard
                title="Completed"
                value={completedTasks}
                description="Tasks completed"
                icon={CheckCircle2}
              />

              <MetricCard
                title="In Progress"
                value={inProgressTasks}
                description="Currently being worked on"
                icon={Clock3}
              />

              <MetricCard
                title="In Review"
                value={reviewTasks}
                description="Awaiting review"
                icon={RotateCcw}
              />
            </div>

            {/* Progress + Status */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Sprint Progress */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Sprint Progress
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Overall completion of the current sprint.
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-violet-600">
                    {completionRate}%
                  </span>
                </div>

                <div className="mt-6">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-violet-600 transition-all duration-500"
                      style={{
                        width: `${completionRate}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {completedTasks} of {totalTasks} tasks
                    completed
                  </span>

                  <span className="font-medium text-slate-700">
                    {totalTasks - completedTasks} remaining
                  </span>
                </div>
              </section>

              {/* Status Breakdown */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Task Status
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Distribution across the sprint workflow.
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  {(
                    Object.keys(statusLabels) as TaskStatus[]
                  ).map((status) => {
                    const count = statusCounts[status]

                    const percentage =
                      totalTasks > 0
                        ? Math.round(
                            (count / totalTasks) * 100,
                          )
                        : 0

                    return (
                      <div key={status}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${statusDotStyles[status]}`}
                            />

                            <span className="text-xs font-medium text-slate-600">
                              {statusLabels[status]}
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-slate-700">
                            {count}
                          </span>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${statusDotStyles[status]}`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* Recent Tasks */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Recent Tasks
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Recently updated tasks in the sprint.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/board')}
                >
                  View all
                  <ArrowRight size={14} />
                </Button>
              </div>

              <div className="divide-y divide-slate-100">
                {recentTasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => navigate('/board')}
                    className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 sm:px-5"
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${statusDotStyles[task.status]}`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {task.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-400">
                        Task #{task.id}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[task.status]}`}
                    >
                      {statusLabels[task.status]}
                    </span>

                    <span className="hidden shrink-0 text-xs text-slate-400 sm:block">
                      {task.dueDate}
                    </span>
                  </button>
                ))}

                {recentTasks.length === 0 && (
                  <div className="p-8 text-center text-sm text-slate-400">
                    No tasks available.
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </AppShell>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ComponentType<{
    size?: number
    className?: string
  }>
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  )
}