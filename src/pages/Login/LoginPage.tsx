import { LoginForm } from '../../features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-200">
              S
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
              Welcome to SprintDesk
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage your sprint workspace.
            </p>
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  )
}