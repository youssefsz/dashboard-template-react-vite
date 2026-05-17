import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const navigationGroups = [
  { label: "Dashboard", state: "Visible" },
  { label: "Products", state: "Visible" },
  { label: "Settings", state: "Visible" },
  { label: "Reports", state: "Hidden" },
]

const alerts = [
  { title: "Daily summary", audience: "Operations", delivery: "Email" },
  { title: "Inventory threshold", audience: "Warehouse", delivery: "Slack" },
  { title: "Billing exceptions", audience: "Finance", delivery: "Email" },
]

export function SettingsPlaceholder() {
  return (
    <section className="page-reveal flex w-full max-w-none flex-col gap-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Settings</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage workspace configuration, navigation preferences, and notification settings.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Workspace profile</CardTitle>
            <CardDescription>Update your workspace identity, domain, and public-facing description.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">Workspace name</span>
                <Input defaultValue="Northwind Operations" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">Primary domain</span>
                <Input defaultValue="ops.northwind.dev" />
              </label>
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Description</span>
                <Textarea
                  rows={5}
                  defaultValue="Central operations dashboard for revenue tracking, product management, and team coordination."
                />
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center gap-2">
            <Button size="lg">Save changes</Button>
            <Button variant="outline" size="lg">Reset</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Navigation visibility</CardTitle>
            <CardDescription>Control which sections are visible to your team in the main navigation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {navigationGroups.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <Badge variant={item.state === "Visible" ? "secondary" : "outline"}>{item.state}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Notification routing</CardTitle>
            <CardDescription>Configure how alerts and notifications are routed to your teams.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border pt-2">
            {alerts.map((item) => (
              <div key={item.title} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1.2fr)_120px_100px] sm:items-center">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.audience}</p>
                </div>
                <div className="text-sm text-muted-foreground">{item.delivery}</div>
                <div className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Delivery preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm leading-6 text-muted-foreground">
            <p>Email summaries are batched and sent daily at 08:00 UTC.</p>
            <p>Slack alerts are pushed in real time for time-sensitive thresholds.</p>
            <p>Finance notifications require acknowledgment within 24 hours.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
