import { useMemo } from 'react'
import {
  Activity,
  CheckCircle2,
  CircleDashed,
  Clock3,
  ListTodo,
} from 'lucide-react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { AppShell } from '../../components/layout/AppShell'
import { useBoardTasks } from '../../features/board/hooks/useBoardTasks'

import {
  getCompletionTrend,
  getPriorityData,
  getStatusData,
  getVelocityData,
} from '../../features/analytics/utils/analytics.utils'

const statusChartColors = [
  '#94a3b8',
  '#3b82f6',
  '#f59e0b',
  '#10b981',
]

export function AnalyticsPage() {
  const {
    tasks,
    isLoading,
    isError,
  } = useBoardTasks()

  const statusData = useMemo(
    () => getStatusData(tasks),
    [tasks],
  )

  const priorityData = useMemo(
    () => getPriorityData(tasks),
    [tasks],
  )

  const completionTrend = useMemo(
    () => getCompletionTrend(tasks),
    [tasks],
  )

  const velocityData = useMemo(
    () => getVelocityData(tasks),
    [tasks],
  )

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.status === 'done',
  ).length

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in-progress',
  ).length

  const completionRate =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100,
        )
      : 0

  if (isLoading) {
    return (
      <AppShell
        title="Analytics"
        subtitle="Sprint performance and insights"
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-sm text-slate-500">
            Loading analytics...
          </div>
        </div>
      </AppShell>
    )
  }

  if (isError) {
    return (
      <AppShell
        title="Analytics"
        subtitle="Sprint performance and insights"
      >
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Failed to load analytics data.
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell
      title="Analytics"
      subtitle="Sprint performance and insights"
    >
      <div className="mx-auto w-full max-w-360 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Sprint Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track sprint progress, workload, and
            completion trends.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Tasks"
            value={totalTasks}
            description="Tasks in current sprint"
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
            title="Completion Rate"
            value={`${completionRate}%`}
            description="Sprint completion"
            icon={Activity}
          />
        </div>

        {/* Main charts */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Sprint Velocity */}
          <ChartCard
            title="Sprint Velocity"
            description="Completed tasks per sprint"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={velocityData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="sprint"
                  tick={{
                    fontSize: 11,
                    fill: '#64748b',
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 11,
                    fill: '#64748b',
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#7c3aed"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Task Status */}
          <ChartCard
            title="Task Status"
            description="Current distribution across workflow"
          >
            <div className="flex h-full flex-col items-center justify-center gap-5 sm:flex-row">
              <div className="h-55 w-55">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={62}
                      outerRadius={88}
                      paddingAngle={3}
                    >
                      {statusData.map(
                        (_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              statusChartColors[
                                index
                              ]
                            }
                          />
                        ),
                      )}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {statusData.map(
                  (item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            statusChartColors[
                              index
                            ],
                        }}
                      />

                      <span className="w-24 text-xs text-slate-500">
                        {item.name}
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {item.value}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </ChartCard>

          {/* Priority Breakdown */}
          <ChartCard
            title="Priority Breakdown"
            description="Priority distribution across tasks"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={priorityData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="priority"
                  tick={{
                    fontSize: 11,
                    fill: '#64748b',
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 11,
                    fill: '#64748b',
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="low"
                  stackId="priority"
                  name="Backlog"
                  fill="#94a3b8"
                />

                <Bar
                  dataKey="medium"
                  stackId="priority"
                  name="In Progress"
                  fill="#3b82f6"
                />

                <Bar
                  dataKey="high"
                  stackId="priority"
                  name="Review / Done"
                  fill="#f59e0b"
                  radius={[
                    5,
                    5,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Completion Trend */}
          <ChartCard
            title="Completion Trend"
            description="Tasks completed over time"
          >
            {completionTrend.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={completionTrend}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="date"
                    tick={{
                      fontSize: 11,
                      fill: '#64748b',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fontSize: 11,
                      fill: '#64748b',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="completed"
                    name="Completed"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <CircleDashed
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm text-slate-400">
                    No completed tasks yet.
                  </p>
                </div>
              </div>
            )}
          </ChartCard>
        </div>
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
      <div className="flex items-start justify-between">
        <div>
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

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  )
}

interface ChartCardProps {
  title: string
  description: string
  children: React.ReactNode
}

function ChartCard({
  title,
  description,
  children,
}: ChartCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>

      <div className="h-72 w-full">
        {children}
      </div>
    </section>
  )
}