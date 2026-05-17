import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
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
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Products</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage your product catalog, inventory levels, and performance metrics in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="lg">Export</Button>
          <Button size="lg">Add product</Button>
        </div>
      </header>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3">All products</Badge>
            <Badge variant="outline" className="rounded-full px-3">Active</Badge>
            <Badge variant="outline" className="rounded-full px-3">Draft</Badge>
            <Badge variant="outline" className="rounded-full px-3">Archived</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="hidden pt-2 md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-0">Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="pr-0 text-right">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="pl-0 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{product.category} product line</p>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell><StatusBadge value={product.status} /></TableCell>
                    <TableCell>{product.revenue}</TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell className="pr-0 text-right text-muted-foreground">{product.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="divide-y divide-border pt-2 md:hidden">
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
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Category structure</CardTitle>
            <CardDescription>Overview of product categories and their distribution across your catalog.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {categories.map((item) => (
              <div key={item.label} className="space-y-2 border-b border-dashed border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <span className="text-sm text-muted-foreground">{item.count} products</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Performance summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm leading-6 text-muted-foreground">
            <p>Total catalog value is currently trending upward with a 7% increase over the last quarter.</p>
            <p>Three products are flagged for review based on low inventory or delayed fulfillment.</p>
            <p>Commerce and Finance categories represent the highest revenue contribution this period.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
