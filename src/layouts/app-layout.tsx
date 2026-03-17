import { useState } from "react"
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom"
import {
  ArrowRightOnRectangleIcon as LogOutIcon,
  Cog6ToothIcon as SettingsIcon,
  Squares2X2Icon as LayoutDashboardIcon,
  Square3Stack3DIcon as LayersIcon,
} from "@heroicons/react/24/outline"

import { useSession } from "@/features/auth/hooks/use-session"
import { useRequireAuth } from "@/features/auth/hooks/use-require-auth"
import { SignOutDialog } from "@/features/auth/components/sign-out-dialog"
import { AppLogo } from "@/components/common/app-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppLayoutSkeleton } from "./app-layout-skeleton"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboardIcon },
  { name: "Products", href: "/products", icon: LayersIcon },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
] as const

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface UserSummaryProps {
  name: string
  email: string
  onSignOut: () => void
  mobile?: boolean
}

function UserSummary({ name, email, onSignOut, mobile = false }: UserSummaryProps) {
  return (
    <div className={`flex items-center ${mobile ? "gap-2" : "gap-3"}`}>
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground shadow-sm ring-2 ring-background ${
          mobile ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm"
        }`}
      >
        {getInitials(name)}
      </div>

      <div className="min-w-0 flex-1">
        <p className={`truncate font-semibold text-foreground ${mobile ? "text-[13px]" : "text-sm"}`}>
          {name}
        </p>
        <p className={`truncate leading-none text-muted-foreground ${mobile ? "text-[10px]" : "text-[11px]"}`}>
          {email}
        </p>
      </div>

      <button
        type="button"
        onClick={onSignOut}
        className="rounded-lg p-1.5 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
        title="Sign out"
        aria-label="Sign out"
      >
        <LogOutIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

function DesktopSidebar({
  name,
  email,
  onSignOut,
}: {
  name: string
  email: string
  onSignOut: () => void
}) {
  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/20 md:flex">
      <div className="flex h-14 items-center border-b px-6">
        <Link to="/" className="transition-transform hover:scale-105 active:scale-95">
          <AppLogo className="h-8 text-foreground" />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-4">
        <UserSummary name={name} email={email} onSignOut={onSignOut} />
      </div>
    </aside>
  )
}

function MobileHeader({
  name,
  email,
  onSignOut,
}: {
  name: string
  email: string
  onSignOut: () => void
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border/40 bg-background/70 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55 md:hidden">
      <div className="min-w-0">
        <Link to="/" className="transition-transform hover:scale-105 active:scale-95">
          <AppLogo compact className="h-8 text-foreground" />
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm ring-2 ring-background transition-transform active:scale-95 outline-none cursor-pointer"
          aria-label="Open account menu"
        >
          {getInitials(name)}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64 mt-1.5 overflow-hidden">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-3 py-3 border-b border-border/40 mb-1 bg-muted/5">
              <div className="space-y-1">
                <p className="truncate text-sm font-bold text-foreground leading-none">{name}</p>
                <p className="truncate text-[11px] font-medium text-muted-foreground">{email}</p>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onSignOut}
            className="cursor-pointer px-3 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive gap-2 font-medium"
          >
            <LogOutIcon className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

function MobileBottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/40 bg-background/70 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/55 md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-1 px-2 py-2">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white/40 hover:text-foreground dark:hover:bg-white/5"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export function AppLayout() {
  const session = useRequireAuth()
  const { logout } = useSession()
  const navigate = useNavigate()

  const [showSignOutDialog, setShowSignOutDialog] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await logout()
      navigate("/login", { replace: true })
    } finally {
      setIsSigningOut(false)
      setShowSignOutDialog(false)
    }
  }

  if (session.status === "loading" || session.status === "unauthenticated") {
    return <AppLayoutSkeleton />
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <DesktopSidebar
        name={session.user.name}
        email={session.user.email}
        onSignOut={() => setShowSignOutDialog(true)}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
        <MobileHeader
          name={session.user.name}
          email={session.user.email}
          onSignOut={() => setShowSignOutDialog(true)}
        />

        <div className="flex-1 overflow-auto bg-muted/10 p-4 pb-24 md:p-8 md:pb-8">
          <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col">
            <Outlet />
          </div>
        </div>
      </main>

      <MobileBottomNavigation />

      <SignOutDialog
        open={showSignOutDialog}
        onOpenChange={setShowSignOutDialog}
        onConfirm={handleSignOut}
        isPending={isSigningOut}
        mode="current"
      />
    </div>
  )
}
