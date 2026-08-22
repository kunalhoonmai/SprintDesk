import { useEffect } from 'react'

import { useComments } from './useComments'

import { useCommentsStore } from '../comments.store'

export function useBoardComments() {
  const query = useComments()

  const initializeComments =
    useCommentsStore(
      (state) => state.initializeComments,
    )

  const comments = useCommentsStore(
    (state) => state.comments,
  )

  useEffect(() => {
    if (
      query.data &&
      query.data.length > 0
    ) {
      initializeComments(query.data)
    }
  }, [
    query.data,
    initializeComments,
  ])

  return {
    ...query,
    comments,
  }
}