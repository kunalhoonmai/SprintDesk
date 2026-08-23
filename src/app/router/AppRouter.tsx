import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'

import { BoardPage } from '../../pages/Board/BoardPage'
import { DashboardPage } from '../../pages/Dashboard/DashboardPage'
import { AnalyticsPage } from '../../pages/Analytics/AnalyticsPage'
import { NotificationsPage } from '../../pages/Notification/NotificationsPage'
import { SettingsPage } from '../../pages/Setting/SettingsPage'

import { LoginPage } from '../../pages/Login/LoginPage'

import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { LoaderCircle } from 'lucide-react'

function PublicRoute() {
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

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/board"
            element={<BoardPage />}
          />

          <Route
            path="/analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>

        {/* Default */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}