import { useAuthStore } from './auth.store'
import { refreshAccessToken } from './services/auth.service'

const API_URL = 'https://dummyjson.com'

let refreshPromise: Promise<string> | null = null

async function refreshSession(): Promise<string> {
  const refreshToken =
    useAuthStore.getState().refreshToken

  if (!refreshToken) {
    throw new Error('No refresh token available.')
  }

  /*
   * Prevent multiple API requests from
   * triggering multiple refresh requests
   * at the same time.
   */
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(
      refreshToken,
    )
      .then((response) => {
        useAuthStore
          .getState()
          .setAccessToken(
            response.accessToken,
          )

        return response.accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

interface ApiRequestOptions
  extends RequestInit {
  retry?: boolean
}

export async function apiFetch(
  path: string,
  options: ApiRequestOptions = {},
): Promise<Response> {
  const {
    retry = true,
    ...requestOptions
  } = options

  const accessToken =
    useAuthStore.getState().accessToken

  const headers = new Headers(
    requestOptions.headers,
  )

  headers.set(
    'Content-Type',
    'application/json',
  )

  if (accessToken) {
    headers.set(
      'Authorization',
      `Bearer ${accessToken}`,
    )
  }

  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...requestOptions,
      headers,
    },
  )

  /*
   * If the access token expired,
   * refresh it and retry the original request once.
   */
  if (
    response.status === 401 &&
    retry
  ) {
    try {
      const newAccessToken =
        await refreshSession()

      const retryHeaders =
        new Headers(
          requestOptions.headers,
        )

      retryHeaders.set(
        'Content-Type',
        'application/json',
      )

      retryHeaders.set(
        'Authorization',
        `Bearer ${newAccessToken}`,
      )

      return fetch(
        `${API_URL}${path}`,
        {
          ...requestOptions,
          headers: retryHeaders,
        },
      )
    } catch {
      useAuthStore
        .getState()
        .clearSession()

      throw new Error(
        'Your session has expired. Please log in again.',
      )
    }
  }

  return response
}