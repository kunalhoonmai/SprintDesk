import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  getCurrentUser,
  login as loginRequest,
  refreshAccessToken,
} from '../services/auth.service'

import { useAuthStore } from '../auth.store'

export function useAuth() {
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    initialized,
    setSession,
    setTokens,
    setUser,
    clearSession,
    setInitialized,
    } = useAuthStore()

  const [isLoading, setIsLoading] =
    useState(false)

  const login = useCallback(
    async (
      username: string,
      password: string,
    ) => {
      setIsLoading(true)

      try {
        const response =
          await loginRequest({
            username,
            password,
          })

        setSession(response)

        return response
      } finally {
        setIsLoading(false)
      }
    },
    [setSession],
  )

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  /*
   * Restore an existing session.
   *
   * We use the persisted refresh token
   * to obtain a fresh access token.
   */
  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
      if (initialized) {
        return
      }

      if (!refreshToken) {
        setInitialized(true)
        return
      }

      try {
        const response =
          await refreshAccessToken(
            refreshToken,
          )

        if (cancelled) {
          return
        }

        setTokens(
            response.accessToken,
            response.refreshToken,
        )

        const currentUser =
          await getCurrentUser(
            response.accessToken,
          )

        if (cancelled) {
          return
        }

        setUser(currentUser)
        setInitialized(true)
      } catch {
        if (!cancelled) {
          clearSession()
        }
      }
    }

    restoreSession()

    return () => {
      cancelled = true
    }
  }, [
    initialized,
    refreshToken,
    setTokens,
    setInitialized,
    clearSession,
  ])

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    initialized,
    isLoading,
    login,
    logout,
  }
}