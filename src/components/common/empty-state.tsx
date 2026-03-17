import type { ReactNode } from "react"
import { Square3Stack3DIcon as LayersIcon } from "@heroicons/react/24/outline"

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title,
  description,
  icon = <LayersIcon className="h-10 w-10 text-muted-foreground/50" />,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed bg-muted/20 min-h-[300px]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  )
}
