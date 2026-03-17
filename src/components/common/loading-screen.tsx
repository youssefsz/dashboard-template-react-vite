import { ArrowPathIcon as LoaderIcon } from "@heroicons/react/24/outline"

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}
