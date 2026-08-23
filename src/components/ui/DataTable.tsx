import type { ReactNode } from 'react'

export interface DataTableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  getRowKey: (row: T) => string | number
  emptyMessage?: string
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  emptyMessage = 'No data available.',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-160 border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={[
                  'px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500',
                  column.className ?? '',
                ].join(' ')}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={getRowKey(row)}
              className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={[
                    'px-5 py-4 text-sm text-slate-700',
                    column.className ?? '',
                  ].join(' ')}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
