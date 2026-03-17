import { Link, Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background flex-col lg:flex-row">
      <div className="lg:hidden flex items-center justify-center p-6 border-b border-border bg-background">
        <Link to="/" className="inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
            DT
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">Dashboard Template</span>
        </Link>
      </div>

      <div className="hidden lg:flex w-1/2 flex-col justify-center bg-zinc-950 p-12 text-zinc-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -top-[500px] -right-[500px] w-[1000px] h-[1000px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="absolute top-12 left-12 z-10 flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-zinc-950">
              DT
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">Dashboard Template</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-semibold tracking-tight mb-6">
            Start new internal tools and admin panels without rebuilding the shell.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            The layout, protected routes, login screen, and responsive navigation are already wired. Replace the placeholders and keep shipping.
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-sm space-y-8 mt-4 lg:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
