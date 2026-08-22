export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender?: string
  image?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender?: string
  image?: string
}

export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  initialized: boolean

  setTokens: (
    accessToken: string,
    refreshToken?: string,
    ) => void

  setSession: (
    response: AuthResponse,
  ) => void

  setUser: (user: AuthUser) => void

  setAccessToken: (
    accessToken: string,
  ) => void

  clearSession: () => void

  setInitialized: (
    initialized: boolean,
  ) => void
}