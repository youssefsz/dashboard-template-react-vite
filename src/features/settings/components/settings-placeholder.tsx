import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
      <header className="space-y-3">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Settings</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            A practical settings layout with broad sections, form controls, and clear hierarchy. It is intentionally
            neutral so teams can adapt it to profile, access, billing, or workspace preferences.
          </p>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <section className="space-y-6 rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6">
          <div className="border-b border-border/60 pb-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Workspace profile</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep top-level naming, metadata, and descriptive copy together in one main settings surface.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Workspace name</span>
              <Input defaultValue="Northwind Operations" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Primary domain</span>
              <Input defaultValue="dashboard-template-react-vite.youssef.tn" />
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-foreground">Description</span>
              <Textarea
                rows={5}
                defaultValue="Use this area for a concise description of the workspace, team ownership, and the scope of the dashboard."
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="lg">Save changes</Button>
            <Button variant="outline" size="lg">Reset</Button>
          </div>
        </section>

        <section className="space-y-6 rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6">
          <div className="border-b border-border/60 pb-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Navigation visibility</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This pattern works well for feature flags, nav ordering, or access-controlled sections.
            </p>
          </div>

          <div className="space-y-3">
            {navigationGroups.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 px-4 py-3">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <Badge variant={item.state === "Visible" ? "secondary" : "outline"}>{item.state}</Badge>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-6 rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
        <div className="space-y-4">
          <div className="border-b border-border/60 pb-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Notification routing</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A simple row-based pattern for alert policies, team routing, and delivery channels.
            </p>
          </div>

          <div className="divide-y divide-border/60">
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
          </div>
        </div>

        <div className="space-y-4 border-t border-border/60 pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
          <div className="border-b border-border/60 pb-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Implementation notes</h2>
          </div>
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Prefer broad sections with clear labels over stacks of tiny cards.</p>
            <p>Keep forms aligned to one or two columns so the page remains easy to scan on desktop and mobile.</p>
            <p>Dummy content should read like a real product workspace, not placeholder filler.</p>
          </div>
        </div>
      </section>
    </section>
  )
}
