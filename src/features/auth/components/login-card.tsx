import { GoogleLoginButton } from "./google-login-button"

export function LoginCard() {
  return (
    <div className="flex flex-col space-y-8 w-full">
      <div className="flex flex-col space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sign in to access your dashboard and manage your workspace.
        </p>
      </div>

      <div className="w-full">
        <GoogleLoginButton />
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        By signing in, you agree to the Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
