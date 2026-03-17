import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authService } from "../services/auth-service"
import { useSession } from "../hooks/use-session"

function SignInLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner ring */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-semibold text-foreground">Signing you in…</p>
          <p className="text-xs text-muted-foreground">Just a moment, please wait.</p>
        </div>
      </div>
    </div>
  )
}

export function GoogleLoginButton() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { refreshSession } = useSession()

  const handleSignIn = async () => {
    try {
      setError(null)
      setIsLoading(true)

      await authService.loginWithGoogle()
      await refreshSession()
      navigate("/", { replace: true })
    } catch (err) {
      setIsLoading(false)
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during sign in. Please try again."
      )
    }
  }

  return (
    <>
      {isLoading && <SignInLoadingOverlay />}

      <div className="w-full flex flex-col gap-3">
        <button
          type="button"
          onClick={handleSignIn}
          disabled={isLoading}
          className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M21.805 10.023h-9.81v3.955h5.627c-.242 1.27-.967 2.346-2.064 3.072v2.55h3.34c1.955-1.8 3.077-4.455 3.077-7.592 0-.66-.06-1.295-.17-1.985Z"
              fill="#4285F4"
            />
            <path
              d="M11.995 22c2.79 0 5.13-.925 6.84-2.5l-3.34-2.55c-.925.62-2.108.99-3.5.99-2.692 0-4.972-1.815-5.788-4.255H2.755v2.63A10.32 10.32 0 0 0 11.995 22Z"
              fill="#34A853"
            />
            <path
              d="M6.207 13.685a6.2 6.2 0 0 1-.323-1.985c0-.69.117-1.36.323-1.985v-2.63H2.755A10.315 10.315 0 0 0 1.67 11.7c0 1.655.395 3.223 1.085 4.615l3.452-2.63Z"
              fill="#FBBC05"
            />
            <path
              d="M11.995 5.46c1.52 0 2.885.523 3.96 1.55l2.97-2.97C17.12 2.37 14.78 1.4 11.995 1.4a10.32 10.32 0 0 0-9.24 5.685l3.452 2.63c.816-2.44 3.096-4.255 5.788-4.255Z"
              fill="#EA4335"
            />
          </svg>
          <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        {/* Real Google button kept for future restoration. */}
        {/*
        <div className="w-full h-11 flex justify-center [&>div]:w-full [&_iframe]:w-full">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              setIsLoading(false)
              setError("Google login failed. Please try again.")
            }}
            use_fedcm_for_button
            text="continue_with"
            logo_alignment="center"
            theme="outline"
            size="large"
            shape="rectangular"
            width="340"
          />
        </div>
        */}
        {error && (
          <p className="text-sm font-medium text-destructive text-center">{error}</p>
        )}
      </div>
    </>
  )
}
