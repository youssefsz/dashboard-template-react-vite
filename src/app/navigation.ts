import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  FingerPrintIcon,
  RectangleGroupIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  TrashIcon,
  UserGroupIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
} from "@heroicons/react/24/outline"

export const navigationGroups = [
  {
    label: "Workspace",
    icon: RectangleGroupIcon,
    items: [
      { label: "Dashboard", href: "/", icon: Squares2X2Icon },
      { label: "Operations", href: "/operations", icon: WrenchScrewdriverIcon },
      { label: "Users", href: "/users", icon: UsersIcon },
    ],
  },
  {
    label: "Analytics",
    icon: ChartBarIcon,
    items: [
      { label: "User analytics", href: "/analytics/users", icon: UsersIcon },
      {
        label: "Onboarding",
        href: "/analytics/onboarding",
        icon: ClipboardDocumentCheckIcon,
      },
      {
        label: "Subscriptions",
        href: "/analytics/subscriptions",
        icon: CreditCardIcon,
      },
      { label: "Processing", href: "/analytics/processing", icon: BoltIcon },
      {
        label: "Engagement",
        href: "/analytics/engagement",
        icon: DocumentChartBarIcon,
      },
    ],
  },
  {
    label: "Governance",
    icon: ShieldCheckIcon,
    items: [
      { label: "Administrators", href: "/administrators", icon: UserGroupIcon },
      { label: "Roles", href: "/roles", icon: ShieldCheckIcon },
      { label: "Audit log", href: "/audit", icon: ClockIcon },
      { label: "Deletion records", href: "/deletions", icon: TrashIcon },
    ],
  },
  {
    label: "Account",
    icon: Cog6ToothIcon,
    items: [
      { label: "Settings", href: "/settings", icon: Cog6ToothIcon },
      { label: "Security", href: "/account/security", icon: FingerPrintIcon },
    ],
  },
]

export function getNavigationTitle(pathname: string) {
  return (
    navigationGroups
      .flatMap((group) => group.items)
      .find((item) => item.href === pathname)?.label ?? "Workspace"
  )
}
