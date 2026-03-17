import { Skeleton } from "@/components/ui/skeleton"

export function LoginCardSkeleton() {
  return (
    <div className="flex flex-col space-y-8 w-full">
      <div className="flex flex-col space-y-2 text-center lg:text-left items-center lg:items-start">
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <div className="w-full flex justify-center lg:justify-start">
        <Skeleton className="h-10 w-full max-w-[400px]" />
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <Skeleton className="h-3 w-64 max-w-full" />
        <Skeleton className="h-3 w-48 max-w-full" />
      </div>
    </div>
  )
}
