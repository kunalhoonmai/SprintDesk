import {
  Navigate,
  Outlet,
} from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'

import { useAuth } from '../hooks/useAuth'

export function PublicRoute() {
  const {
    isAuthenticated,
    initialized,
  } = useAuth()

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <LoaderCircle
            size={18}
            className="animate-spin"
          />

          Restoring session...
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  return <Outlet />
}