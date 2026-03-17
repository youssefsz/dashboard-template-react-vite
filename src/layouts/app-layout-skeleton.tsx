import { Skeleton } from "@/components/ui/skeleton"
import { 
  Squares2X2Icon as LayoutDashboardIcon, 
  Cog6ToothIcon as SettingsIcon, 
  Square3Stack3DIcon as LayersIcon, 
  Bars3Icon
} from "@heroicons/react/24/outline"

export function AppLayoutSkeleton() {
  const navigation = [
    { name: "Dashboard", icon: LayoutDashboardIcon },
    { name: "Products", icon: LayersIcon },
    { name: "Settings", icon: SettingsIcon },
  ]

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/20 hidden md:flex flex-col">
        <div className="h-14 flex items-center px-6 border-b">
          <Skeleton className="h-8 w-32" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-md opacity-40">
              <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2.5 w-32" />
            </div>
            <Skeleton className="size-6 rounded-md" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile header */}
        <header className="h-14 border-b flex items-center px-6 bg-background md:hidden gap-4">
          <Bars3Icon className="h-6 w-6 text-muted-foreground" />
          <Skeleton className="h-7 w-28" />
        </header>

        {/* Content area — intentionally blank.
            The correct per-page skeleton renders once auth resolves. */}
        <div className="flex-1 bg-muted/10" />
      </main>
    </div>
  )
}
