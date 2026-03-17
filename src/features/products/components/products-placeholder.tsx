import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const products = [
  { name: "Northwind Core", category: "Commerce", status: "Healthy", revenue: "$42,800", inventory: "In stock", updated: "2 hours ago" },
  { name: "Mercury POS", category: "Retail", status: "Review", revenue: "$18,400", inventory: "Low stock", updated: "Yesterday" },
  { name: "Kepler Billing", category: "Finance", status: "Healthy", revenue: "$27,100", inventory: "Service", updated: "4 hours ago" },
  { name: "Harbor Suite", category: "Operations", status: "Delayed", revenue: "$11,900", inventory: "Awaiting vendor", updated: "3 days ago" },
  { name: "Atlas Inventory", category: "Supply", status: "Healthy", revenue: "$22,600", inventory: "In stock", updated: "6 hours ago" },
]

const categories = [
  { label: "Commerce", count: 12, note: "Primary storefront and checkout surfaces." },
  { label: "Operations", count: 8, note: "Internal tooling for planning, delivery, and support." },
  { label: "Finance", count: 5, note: "Billing, invoicing, and recurring revenue reporting." },
]

function StatusBadge({ value }: { value: string }) {
  if (value === "Healthy") return <Badge variant="outline" className="border-emerald-500/40 text-emerald-500">{value}</Badge>
  if (value === "Review") return <Badge variant="outline" className="border-amber-500/40 text-amber-500">{value}</Badge>
  return <Badge variant="outline" className="border-rose-500/40 text-rose-500">{value}</Badge>
}

export function ProductsPlaceholder() {
  return (
    <section className="page-reveal flex w-full max-w-none flex-col gap-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Products</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              A clean listing page for catalog, plan, or inventory data. The layout avoids a stack of cards and keeps
              the main surface focused on a readable table.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="lg">Export</Button>
          <Button size="lg">Add product</Button>
        </div>
      </header>

      <section className="rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-5">
          <Badge variant="secondary" className="rounded-full px-3">All products</Badge>
          <Badge variant="outline" className="rounded-full px-3">Active</Badge>
          <Badge variant="outline" className="rounded-full px-3">Draft</Badge>
          <Badge variant="outline" className="rounded-full px-3">Archived</Badge>
        </div>

        <div className="hidden pt-4 md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-0">Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name} className="hover:bg-transparent">
                  <TableCell className="px-0 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{product.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">Template row with realistic product metadata.</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell><StatusBadge value={product.status} /></TableCell>
                  <TableCell>{product.revenue}</TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{product.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="divide-y divide-border/60 pt-2 md:hidden">
          {products.map((product) => (
            <div key={product.name} className="space-y-3 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                </div>
                <StatusBadge value={product.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Revenue</p>
                  <p className="mt-1 text-foreground">{product.revenue}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Availability</p>
                  <p className="mt-1 text-foreground">{product.inventory}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{product.updated}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[28px] border border-border/60 bg-background/80 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div className="space-y-4">
          <div className="border-b border-border/60 pb-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Category structure</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These grouped rows are useful when the products view needs a secondary summary without turning into a grid of cards.
            </p>
          </div>

          <div className="space-y-4">
            {categories.map((item) => (
              <div key={item.label} className="space-y-2 border-b border-dashed border-border/60 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <span className="text-sm text-muted-foreground">{item.count} products</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-border/60 pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
          <div className="border-b border-border/60 pb-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Notes for the template</h2>
          </div>
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Keep the primary table wide and readable on desktop.</p>
            <p>Use a stacked list on mobile instead of forcing horizontal scrolling when the domain data is dense.</p>
            <p>Reserve cards for true highlights, not every piece of information on the page.</p>
          </div>
        </div>
      </section>
    </section>
  )
}
