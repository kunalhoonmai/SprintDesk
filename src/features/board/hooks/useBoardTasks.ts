import { useEffect } from 'react'

import { useTasks } from './useTasks'
import { useBoardStore } from '../store/board.store'

export function useBoardTasks() {
  const query = useTasks()

  const initializeTasks = useBoardStore(
    (state) => state.initializeTasks,
  )

  const tasks = useBoardStore((state) => state.tasks)

  useEffect(() => {
    if (query.data && query.data.length > 0) {
      initializeTasks(query.data)
    }
  }, [query.data, initializeTasks])

  return {
    ...query,
    tasks,
  }
}