import { useState } from 'react'
import type { FormEvent } from 'react'

import {
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

export function LoginForm() {
  const navigate = useNavigate()

  const {
    login,
    isLoading,
  } = useAuth()

  const [username, setUsername] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

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
      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Username
        </label>

        <div className="relative">
          <UserRound
            size={17}
            className="
              pointer-events-none
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <Input
            id="username"
            name="username"
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700"
          >
            Password
          </label>
        </div>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="
              pointer-events-none
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (value) => !value,
              )
            }
            disabled={isLoading}
            aria-label={
              showPassword
                ? 'Hide password'
                : 'Show password'
            }
            className="
              absolute right-3
              top-1/2
              flex h-8 w-8
              -translate-y-1/2
              items-center justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-600
            "
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="
            rounded-xl
            border border-red-200
            bg-red-50
            px-4 py-3
            text-sm text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}