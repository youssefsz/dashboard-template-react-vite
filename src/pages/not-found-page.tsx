import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] select-none overflow-hidden">
      {/* Giant watermark */}
      <span
        aria-hidden="true"
        className="absolute text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tighter text-foreground/[0.04] pointer-events-none"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-sm">

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Link
            to="/"
            className="inline-flex items-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}
