import type {
  AuthResponse,
  AuthUser,
} from '../auth.types'

const API_URL = 'https://dummyjson.com'

interface LoginCredentials {
  username: string
  password: string
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify({
        username:
          credentials.username,
        password:
          credentials.password,
        expiresInMins: 30,
      }),
    },
  )

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null)

    throw new Error(
      errorData?.message ??
        'Invalid username or password.',
    )
  }

  return response.json()
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<{
  accessToken: string
  refreshToken?: string
}> {
  const response = await fetch(
    `${API_URL}/auth/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
    },
  )

  if (!response.ok) {
    throw new Error(
      'Unable to refresh authentication session.',
    )
  }

  return response.json()
}

export async function getCurrentUser(
  accessToken: string,
): Promise<AuthUser> {
  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      'Unable to restore authentication session.',
    )
  }

  return response.json()
}