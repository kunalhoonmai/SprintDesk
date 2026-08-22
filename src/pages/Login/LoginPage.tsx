import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { LoginForm } from '../../features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <main className="min-h-screen overflow-y-auto bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left / Branding */}
        <section
          className="
            relative hidden
            overflow-hidden
            bg-slate-950
            lg:flex
          "
        >
          {/* Decorative shapes */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-950/40">
                <LayoutDashboard size={20} />
              </div>

              <div>
                <p className="text-base font-bold text-white">
                  SprintDesk
                </p>

                <p className="text-xs text-slate-400">
                  Agile project workspace
                </p>
              </div>
            </div>

            {/* Main message */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-violet-200">
                <Sparkles size={14} />

                Built for focused teams
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                Plan sprints.
                <br />
                Track progress.
                <br />
                <span className="text-violet-400">
                  Ship better.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-6 text-slate-400 xl:text-base">
                SprintDesk gives your team one focused
                workspace to manage tasks, monitor sprint
                progress, and keep delivery on track.
              </p>

              <div className="mt-8 space-y-4">
                <Feature
                  icon={CheckCircle2}
                  text="Manage your sprint workflow"
                />

                <Feature
                  icon={ShieldCheck}
                  text="Keep your team aligned"
                />

                <Feature
                  icon={ArrowRight}
                  text="Move from backlog to done"
                />
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-slate-500">
              SprintDesk · Sprint 3 · 2026
            </p>
          </div>
        </section>

        {/* Right / Login */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <LayoutDashboard size={20} />
              </div>

              <div>
                <p className="text-base font-bold text-slate-900">
                  SprintDesk
                </p>

                <p className="text-xs text-slate-400">
                  Agile project workspace
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-violet-600">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Sign in to SprintDesk
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access your
                workspace.
              </p>
            </div>

            {/* Login card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <LoginForm />
            </div>

            {/* Demo information */}
            <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50/70 p-4">
              <p className="text-xs font-semibold text-violet-800">
                Demo access
              </p>

              <p className="mt-1 text-xs leading-5 text-violet-700">
                Use the DummyJSON authentication credentials
                configured for this assignment.
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
              SprintDesk · Project management workspace
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

interface FeatureProps {
  icon: React.ComponentType<{
    size?: number
    className?: string
  }>
  text: string
}

function Feature({
  icon: Icon,
  text,
}: FeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-violet-400">
        <Icon size={16} />
      </div>

      <span className="text-sm text-slate-300">
        {text}
      </span>
    </div>
  )
}