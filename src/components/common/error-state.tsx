import { ExclamationTriangleIcon as AlertTriangleIcon } from "@heroicons/react/24/outline"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  message: string
  layout?: "page" | "inline"
  className?: string
  onRetry?: () => void
}

export function ErrorState({ title, message, layout = "page", className, onRetry }: ErrorStateProps) {
  const navigate = useNavigate()

  // Make the errors sound more friendly
  const isRateLimit = message?.toLowerCase().includes("rate limit") || message?.includes("429");
  const isNotFound = message?.toLowerCase().includes("not found") || message?.includes("404");
  
  let displayTitle = title || "Oops! Something went wrong";
  let displayMessage = message || "An unexpected error occurred. Please try again.";

  if (isRateLimit) {
    displayTitle = "Whoa, slow down!";
    displayMessage = "You've hit the rate limit. Please take a breather and try again in a little while.";
  } else if (isNotFound) {
    displayTitle = "Not Found";
    displayMessage = "We couldn't find what you were looking for. It may have been removed or the URL is incorrect.";
  }

  if (layout === "inline") {
    return (
      <Alert variant="destructive" className={className}>
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle>{displayTitle}</AlertTitle>
        <AlertDescription>{displayMessage}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className={cn("min-h-[400px] gap-6 w-full flex flex-col items-center justify-center text-center p-8 border border-border/40 rounded-xl bg-muted/10", className)}>
      <div className="flex items-center justify-center mb-2">
        <AlertTriangleIcon className="w-12 h-12 text-destructive/80" />
      </div>
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{displayTitle}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{displayMessage}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {onRetry ? (
          <Button onClick={onRetry} variant="default" className="h-9 px-4">
            Try Again
          </Button>
        ) : (
          <Button onClick={() => window.location.reload()} variant="default" className="h-9 px-4">
            Refresh Page
          </Button>
        )}
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="h-9 px-4 bg-transparent border-border/60">
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
