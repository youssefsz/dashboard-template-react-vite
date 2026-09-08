import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useSession } from "@/features/auth/hooks/use-session"
import { authService } from "@/features/auth/services/auth-service"
import { GoogleLoginButton } from "./google-login-button"
import { AccountHelpDialog } from "./AccountHelpDialog"

const loginSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
})

export function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [help, setHelp] = useState<"password" | "access" | null>(null)
  const { refreshSession } = useSession()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })
  const login = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema> | "google") => {
      if (values === "google") await authService.loginWithGoogle()
      else await authService.loginWithPassword(values)
      await refreshSession()
      navigate("/", { replace: true })
    },
  })
  const { errors } = form.formState

  return (
    <section
      className="page-reveal flex w-full flex-col gap-6"
      aria-labelledby="login-heading"
    >
      <div className="flex flex-col gap-2 text-center">
        <h1
          id="login-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Log in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your username and password to continue.
        </p>
      </div>
      <form
        noValidate
        onSubmit={form.handleSubmit((values) => login.mutate(values))}
      >
        <FieldGroup className="gap-5">
          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Your username"
              error={errors.username?.message}
              disabled={login.isPending}
              aria-invalid={!!errors.username}
              {...form.register("username")}
            />
          </Field>
          <Field data-invalid={!!errors.password}>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Button
                type="button"
                variant="link"
                size="xs"
                onClick={() => setHelp("password")}
              >
                Forgot your password?
              </Button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              disabled={login.isPending}
              error={errors.password?.message}
              {...form.register("password")}
              rightIcon={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </Button>
              }
            />
          </Field>
          {login.error && (
            <Alert variant="destructive">
              <AlertDescription>
                {login.error instanceof Error
                  ? login.error.message
                  : "Unable to sign in. Please try again."}
              </AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={login.isPending}
          >
            {login.isPending && login.variables !== "google" ? (
              <>
                <Spinner data-icon="inline-start" />
                Logging in…
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </FieldGroup>
      </form>
      <FieldSeparator>Or continue with</FieldSeparator>
      <GoogleLoginButton
        disabled={login.isPending}
        isLoading={login.isPending && login.variables === "google"}
        onClick={() => login.mutate("google")}
      />
      <p className="text-center text-sm text-muted-foreground">
        Don’t have an account?{" "}
        <Button variant="link" size="xs" onClick={() => setHelp("access")}>
          Get access
        </Button>
      </p>
      <AccountHelpDialog mode={help} onClose={() => setHelp(null)} />
    </section>
  )
}
