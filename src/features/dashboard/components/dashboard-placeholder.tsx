import { ArrowDownRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const summary = [
  { label: "Active accounts", value: "12,480", change: "+12.4%", direction: "up" as const },
  { label: "Net revenue", value: "$184,200", change: "+7.1%", direction: "up" as const },
  { label: "Open issues", value: "18", change: "-6.3%", direction: "down" as const },
  { label: "Fulfillment rate", value: "98.2%", change: "+1.8%", direction: "up" as const },
]

const trendData = [
  { month: "Jan", revenue: 142, orders: 86 },
  { month: "Feb", revenue: 156, orders: 92 },
  { month: "Mar", revenue: 168, orders: 101 },
  { month: "Apr", revenue: 162, orders: 96 },
  { month: "May", revenue: 181, orders: 108 },
  { month: "Jun", revenue: 194, orders: 116 },
]

const channelData = [
  { source: "Direct", share: 42 },
  { source: "Organic", share: 28 },
  { source: "Partners", share: 18 },
  { source: "Paid", share: 12 },
]

const pipeline = [
  { name: "Northwind Portal", owner: "Operations", status: "In review", target: "18 Apr" },
  { name: "Mercury Storefront", owner: "Commerce", status: "Ready", target: "22 Apr" },
  { name: "Summit Console", owner: "Platform", status: "Blocked", target: "29 Apr" },
]

const activity = [
  { title: "Pricing page updated", detail: "Content and plan ordering were revised for the Q2 launch." },
  { title: "Warehouse feed recovered", detail: "Product availability is back in sync after the overnight import." },
  { title: "Support queue stabilized", detail: "Response time is under fifteen minutes across priority accounts." },
]

const trendConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-2)" },
  orders: { label: "Orders", color: "var(--color-chart-1)" },
} satisfies ChartConfig

const channelConfig = {
  share: { label: "Share", color: "var(--color-chart-1)" },
} satisfies ChartConfig

function SummaryBand() {
  return (
    <section className="overflow-hidden rounded-[28px] border border-border/60 bg-background/80">
      <div className="grid divide-y divide-border/60 md:grid-cols-4 md:divide-y-0 md:divide-x">
        {summary.map((item) => (
          <div key={item.label} className="space-y-3 px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {item.label}
            </p>
            <div className="flex items-end justify-between gap-3">
              <p className="text-2xl font-semibold tracking-tight text-foreground">{item.value}</p>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium ${
                  item.direction === "up" ? "text-emerald-500" : "text-sky-500"
                }`}
              >
                {item.direction === "up" ? <ArrowUpRightIcon className="h-3.5 w-3.5" /> : <ArrowDownRightIcon className="h-3.5 w-3.5" />}
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function DashboardPlaceholder() {
  return (
    <section className="page-reveal flex w-full max-w-none flex-col gap-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dashboard</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              A neutral overview page for revenue, activity, and delivery trends. Replace the metrics and tables with
              data from your project when the template is wired to a real backend.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="lg">Export report</Button>
          <Button size="lg">Create view</Button>
        </div>
      </header>

      <SummaryBand />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <section className="min-w-0 rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-2 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Commercial trend</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Monthly performance across revenue and completed orders.
              </p>
            </div>
            <Badge variant="outline">Last 6 months</Badge>
          </div>

          <div className="pt-6">
            <ChartContainer config={trendConfig} className="aspect-auto h-[290px] w-full max-w-full overflow-hidden">
              <AreaChart data={trendData} margin={{ left: 8, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="var(--color-revenue)"
                  fillOpacity={0.14}
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
                <Area
                  dataKey="orders"
                  type="monotone"
                  fill="var(--color-orders)"
                  fillOpacity={0.12}
                  stroke="var(--color-orders)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </section>

        <section className="min-w-0 overflow-hidden rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6">
          <div className="border-b border-border/60 pb-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Acquisition mix</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Source contribution is shown here with a simple shadcn chart surface and a readable breakdown.
            </p>
          </div>

          <div className="pt-6">
            <ChartContainer config={channelConfig} className="aspect-auto h-[220px] w-full max-w-full overflow-hidden">
              <BarChart data={channelData} margin={{ left: 4, right: 4, top: 4 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="source"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  minTickGap={24}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="share" fill="var(--color-share)" radius={10} />
              </BarChart>
            </ChartContainer>

            <div className="mt-5 space-y-3">
              {channelData.map((item) => (
                <div key={item.source} className="flex items-center justify-between border-b border-dashed border-border/60 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-foreground">{item.source}</span>
                  <span className="text-sm text-muted-foreground">{item.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <section className="rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6">
          <div className="border-b border-border/60 pb-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Pipeline</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A simple operational table for launches, migrations, or internal delivery milestones.
            </p>
          </div>

          <div className="divide-y divide-border/60 pt-2">
            {pipeline.map((item) => (
              <div key={item.name} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1.2fr)_140px_120px_80px] sm:items-center sm:gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.owner}</p>
                </div>
                <div className="text-sm text-muted-foreground">{item.status}</div>
                <div className="text-sm text-muted-foreground">{item.target}</div>
                <div className="text-right">
                  <Button variant="ghost" size="sm">Open</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6">
          <div className="border-b border-border/60 pb-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Recent changes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use this area for notes, deployments, or workflow updates.
            </p>
          </div>

          <div className="space-y-4 pt-5">
            {activity.map((item) => (
              <div key={item.title} className="space-y-1 border-b border-dashed border-border/60 pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
