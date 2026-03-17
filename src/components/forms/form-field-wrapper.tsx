import type { ReactNode } from "react"

interface FormFieldWrapperProps {
  label: string
  error?: string
  description?: string
  children: ReactNode
}

export function FormFieldWrapper({
  label,
  error,
  description,
  children,
}: FormFieldWrapperProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold tracking-tight text-foreground/80 ml-1">
        {label}
      </label>
      <div className="relative">
        {children}
      </div>
      {description && !error && (
        <p className="text-[0.8rem] text-muted-foreground/60 leading-relaxed ml-1">{description}</p>
      )}
      {error && (
        <p className="text-[0.8rem] font-medium text-destructive ml-1">{error}</p>
      )}
    </div>
  )
}
