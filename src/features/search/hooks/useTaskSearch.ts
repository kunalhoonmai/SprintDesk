import { useMemo } from 'react'

import type { Task } from '../../../types/task.types'

interface UseTaskSearchOptions {
  tasks: Task[]
  query: string
}

export function useTaskSearch({
  tasks,
  query,
}: UseTaskSearchOptions) {
  const results = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase()

    if (!normalizedQuery) {
      return []
    }

    return tasks.filter((task) => {
      const searchableText = [
        task.title,
        task.description,
        task.status,
        task.priority,
        task.dueDate,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchableText.includes(
        normalizedQuery,
      )
    })
  }, [tasks, query])

  return {
    results,
    hasResults: results.length > 0,
  }
}