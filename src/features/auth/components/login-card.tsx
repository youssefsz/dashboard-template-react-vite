import { GoogleLoginButton } from "./google-login-button"

export function LoginCard() {
  return (
    <div className="flex flex-col space-y-8 w-full">
      <div className="flex flex-col space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use the simulated Google sign-in to enter the dashboard template and test protected routes, redirects, and sign-out behavior.
        </p>
      </div>

      <div className="w-full">
        <GoogleLoginButton />
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        This template ships with a simulated Google login so the auth flow works before a real backend is connected.
      </p>
    </div>
  )
}
