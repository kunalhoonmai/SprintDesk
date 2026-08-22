import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'

import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const {
    isAuthenticated,
    initialized,
  } = useAuth()

  const location =
    useLocation()

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

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  return <Outlet />
}