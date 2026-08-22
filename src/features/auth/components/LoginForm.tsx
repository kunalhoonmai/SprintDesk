import { useState } from 'react'
import type { FormEvent } from 'react'

import { LoaderCircle } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

export function LoginForm() {
  const navigate =
    useNavigate()

  const {
    login,
    isLoading,
  } = useAuth()

  const [username, setUsername] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')

    if (!username.trim()) {
      setError(
        'Please enter your username.',
      )

      return
    }

    if (!password) {
      setError(
        'Please enter your password.',
      )

      return
    }

    try {
      await login(
        username.trim(),
        password,
      )

      navigate('/dashboard', {
        replace: true,
      })
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to sign in.',
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Username
        </label>

        <input
          id="username"
          value={username}
          onChange={(event) =>
            setUsername(
              event.target.value,
            )
          }
          autoComplete="username"
          placeholder="Enter username"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value,
            )
          }
          autoComplete="current-password"
          placeholder="Enter password"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading && (
          <LoaderCircle
            size={17}
            className="animate-spin"
          />
        )}

        {isLoading
          ? 'Signing in...'
          : 'Sign in'}
      </button>
    </form>
  )
}