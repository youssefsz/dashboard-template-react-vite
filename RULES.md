# Project Rules

These rules are mandatory for anyone contributing code to this project. They keep the UI consistent, the code maintainable, and the team aligned.

---

## 1. Design System — Use It or Lose It

**Every surface must use the established shadcn/ui component system.** No exceptions.

### 1.1 Components

- **Always prefer shadcn/ui primitives.** Use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`, `Button`, `Badge`, `Table`, `Input`, `Textarea`, `Dialog`, `DropdownMenu`, `Alert`, `Skeleton`, `ChartContainer`, etc.
- **Never build custom card-like surfaces from scratch.** Do not use `rounded-[28px]`, `border-border/60`, `bg-background/80`, or any other arbitrary-value hack to approximate a card. Use the `Card` component.
- **Never override component border-radius with arbitrary values.** Use the design-token radii (`rounded-lg`, `rounded-xl`, `rounded-md`, `rounded-sm`).
- **Never override component backgrounds with arbitrary opacity hacks.** Use `bg-card`, `bg-muted`, `bg-background`, `bg-popover`, `bg-primary`, etc. as defined in the theme.

### 1.2 Colors & Typography

- **Only use CSS custom properties / Tailwind theme tokens.**
  - `text-foreground`, `text-muted-foreground`, `text-primary`, `text-primary-foreground`, `text-destructive`, `text-card-foreground`
  - `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `bg-secondary`, `bg-destructive`
  - `border-border`, `border-input`, `border-ring`
- **No raw hex, rgb, or oklch values in component code.** If a new color is needed, add it to the theme in `src/styles/globals.css` first.
- **Use the standard typography scale.** `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`.
- **Use standard font-weight tokens.** `font-normal`, `font-medium`, `font-semibold`, `font-bold`.
- **Use standard spacing tokens.** `p-4`, `gap-6`, `space-y-3`, etc. Avoid arbitrary spacing like `gap-[17px]` unless absolutely necessary for a specific layout edge case.

### 1.3 Shadows & Borders

- **Use the theme shadow tokens.** `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-xs`.
- **Use standard border tokens.** `border`, `border-2`, `border-t`, `border-b`, `border-dashed`.
- **No custom box-shadow or border-color overrides** unless explicitly approved.

---

## 2. No Placeholder, Template, or Dummy Language

- **All UI copy must read like a real product.** Never use words like "template", "placeholder", "dummy", "simulated", "wired to a real backend", "replace this later", "example data", or "mock content" in visible UI text.
- **Auth flows must feel real.** Login screens, error messages, empty states, and onboarding copy must sound like they belong to a production product.
- **Realistic data only.** Use believable names, numbers, dates, and domain language. If the product is for operations, use operations language. If it's for finance, use finance language.

---

## 3. Clean, Maintainable Code

### 3.1 Component Structure

- **One component per file.** Export the component as the default or a named export. Avoid multiple unrelated components in one file.
- **Co-locate related sub-components.** If a page has small, single-use sub-components (like `StatusBadge`), keep them in the same file. If a sub-component is reused across features, extract it to `src/components/common/` or the appropriate shared directory.
- **Keep components small.** If a component exceeds ~150 lines, split it. Extract tables, lists, charts, and forms into their own sub-components.

### 3.2 Naming

- **Use PascalCase for components.** `DashboardPage.tsx`, `ProductCard.tsx`, `EmptyState.tsx`.
- **Use camelCase for hooks.** `useSession.ts`, `useRequireAuth.ts`.
- **Use kebab-case for directories.** `src/features/settings/components/`, `src/components/ui/`.
- **Name files after their default export.** If the file exports `DashboardPage`, the file should be `DashboardPage.tsx`.

### 3.3 Imports

- **Use path aliases.** Import from `@/components/ui/card`, not `../../../../components/ui/card`.
- **Group imports:**
  1. React / framework imports
  2. Third-party library imports
  3. Absolute project imports (`@/...`)
  4. Relative sibling imports (`./...`)
- **Remove unused imports.** Keep the import block clean.

### 3.4 Types

- **Always use TypeScript.** No `.js` or `.jsx` files.
- **Prefer `interface` for object shapes.** Use `type` for unions, mapped types, and utility types.
- **Explicitly type function props.** Do not rely on implicit `any`.
- **Use `satisfies` for config objects** (e.g., `ChartConfig`) to get inferred types with excess property checking.

### 3.5 Hooks & Logic

- **Extract reusable logic into custom hooks.** Keep UI components focused on rendering.
- **Use TanStack Query for server state.** Do not manually manage `fetch`, `useEffect`, and local state for API calls. Use `useQuery`, `useMutation`, `useInfiniteQuery`.
- **Use React Hook Form + Zod for forms.** Do not build custom form validation logic. Define a Zod schema and pass it to `useForm` via `resolver: zodResolver(schema)`.
- **Use React Router v7 data APIs** where appropriate (`loader`, `action`, `useLoaderData`, `useActionData`) for route-level data fetching.

---

## 4. Tailwind CSS Rules

- **Use Tailwind v4 syntax.** `@import "tailwindcss"` and `@theme inline`. Do not use the old `@tailwind base; @tailwind components; @tailwind utilities;` syntax.
- **Do not use arbitrary values for common properties.** If you need a custom value, add it to the theme first.
- **Use `@layer base` and `@layer components` sparingly.** Prefer component-level Tailwind classes over global CSS.
- **Keep Tailwind classes readable.** Use `cn()` from `@/lib/utils` for conditional class merging. Do not concatenate class strings manually.
- **Use `dark:` variants** for dark mode, not separate CSS files.

---

## 5. Best Practices — Always Check Current Standards

**Before implementing any new feature, pattern, or dependency:**

- **Check the official docs for the current version** of each library in use.
  - [React 19 Docs](https://react.dev/)
  - [Tailwind CSS v4 Docs](https://tailwindcss.com/)
  - [shadcn/ui Docs](https://ui.shadcn.com/)
  - [Base UI Docs](https://base-ui.com/)
  - [TanStack Query v5 Docs](https://tanstack.com/query/latest/)
  - [React Router v7 Docs](https://reactrouter.com/)
  - [React Hook Form Docs](https://react-hook-form.com/)
  - [Zod Docs](https://zod.dev/)
  - [Vite Docs](https://vitejs.dev/)
- **Search for the latest recommended patterns.** Do not copy-paste old v3 / v4 / v5 patterns if the library is now on a newer major version.
- **Prefer the library's own primitives over wrappers.** If Base UI or shadcn/ui already exports a component, use it directly. Do not re-wrap it unless you are adding behavior.
- **Prefer composition over configuration.** shadcn/ui and Base UI are compositional by design. Use `CardHeader`, `CardContent`, etc., rather than passing a giant `config` object to a monolithic component.

---

## 6. Layout & Spacing Consistency

- **Use the app's layout system.** All authenticated pages render inside `AppLayout` via `<Outlet />`. Do not add extra outer padding, margins, or background colors that fight the layout.
- **Use `page-reveal` for page-level animation.** Apply the class to the top-level `<section>` of every page for consistent entrance animation.
- **Standard page header pattern:**
  ```tsx
  <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Page Title</h1>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">Description of what this page does.</p>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="lg">Secondary Action</Button>
      <Button size="lg">Primary Action</Button>
    </div>
  </header>
  ```
- **Use `gap-6` between major sections.** Use `space-y-4` or `space-y-3` inside cards for vertical rhythm.

---

## 7. Accessibility

- **All interactive elements must have visible focus states.** The design system already handles this via `focus-visible:ring-3 focus-visible:ring-ring/50`.
- **All buttons must have accessible text.** If an icon-only button is used, it must have an `aria-label`.
- **Form inputs must have associated labels.** Use `<label>` with a matching `htmlFor`, or wrap the input inside the label.
- **Do not disable color contrast.** The theme tokens are chosen to meet WCAG AA. Do not override them to make text lighter or borders subtler.

---

## 8. Performance

- **Lazy-load routes.** Use `React.lazy()` or route-level code splitting for heavy pages.
- **Memoize expensive computations.** Use `useMemo` for derived data and `useCallback` for event handlers passed to child components.
- **Avoid unnecessary re-renders.** Keep state as local as possible. Do not lift state higher than it needs to be.
- **Use TanStack Query caching.** Do not refetch data on every mount if the data is already fresh.

---

## 9. Enforcement

- **Run checks before committing:**
  ```bash
  npm run typecheck   # TypeScript must pass
  npm run lint        # ESLint must pass (zero errors)
  npm run build       # Production build must succeed
  ```
- **If the design system does not support what you need, extend it.** Add the new token to `src/styles/globals.css` or the new component to `src/components/ui/`. Do not bypass the system with one-off arbitrary values.

---

**Bottom line:** Build like this is a production product, not a prototype. Every pixel, every word, and every line of code should look like it belongs.
