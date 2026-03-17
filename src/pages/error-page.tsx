import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404
  const label = is404 ? "404" : "Error"

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] select-none overflow-hidden">
      {/* Giant watermark */}
      <span
        aria-hidden="true"
        className="absolute text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tighter text-foreground/[0.04] pointer-events-none"
      >
        {label}
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-sm">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">
          {label}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {is404 ? "Page not found" : "Something went wrong"}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {is404
            ? "The page you're looking for doesn't exist or may have been moved."
            : "We hit an unexpected snag. Please try again or head back to the dashboard."}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Link
            to="/"
            className="inline-flex items-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </Link>
          {is404 ? (
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              Go back
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
