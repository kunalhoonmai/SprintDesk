import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../../../services/users/user.service'

export const userQueryKeys = {
  all: ['users'] as const,
  list: () => [...userQueryKeys.all, 'list'] as const,
}

export function useBoardUsers() {
  return useQuery({
    queryKey: userQueryKeys.list(),
    queryFn: getUsers,
  })
}