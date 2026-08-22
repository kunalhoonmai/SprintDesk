import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type {
  AuthResponse,
  AuthState,
} from './auth.types'

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        initialized: false,

        setUser: (user) =>
            set({
                user,
                isAuthenticated: true,
            }),

        setTokens: (
            accessToken,
            refreshToken,
            ) =>
            set((state) => ({
                accessToken,
                refreshToken:
                refreshToken ?? state.refreshToken,
                isAuthenticated: true,
            })),

        setSession: (
          response: AuthResponse,
        ) =>
          set({
            user: {
              id: response.id,
              username:
                response.username,
              email: response.email,
              firstName:
                response.firstName,
              lastName:
                response.lastName,
              gender:
                response.gender,
              image:
                response.image,
            },

            accessToken:
              response.accessToken,

            refreshToken:
              response.refreshToken,

            isAuthenticated: true,
            initialized: true,
          }),

        setAccessToken: (
          accessToken,
        ) =>
          set({
            accessToken,
            isAuthenticated: true,
          }),

        clearSession: () =>
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            initialized: true,
          }),

        setInitialized: (
          initialized,
        ) =>
          set({
            initialized,
          }),
      }),
      {
        name: 'sprintdesk-auth',

        partialize: (state) => ({
          user: state.user,
          refreshToken:
            state.refreshToken,
          isAuthenticated:
            state.isAuthenticated,
        }),
      },
    ),
  )