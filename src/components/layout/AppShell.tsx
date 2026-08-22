import { useState } from 'react'
import type { ReactNode } from 'react'

import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

interface AppShellProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AppShell({
  children,
  title,
  subtitle,
}: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <div className="flex h-full">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setMobileSidebarOpen(true)}
          />

          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}