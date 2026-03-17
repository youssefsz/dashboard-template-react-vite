# AI Widget Platform Dashboard
## Frontend Implementation Spec

## 1. Purpose

This document defines the **frontend implementation plan** for the dashboard application of the AI Widget Platform.

This is **frontend only**.

The frontend is responsible for:

- login flow UI
- session handling on the client
- protected routes
- dashboard pages
- widget management UI
- context editing UI
- embed script copy UI
- account/logout UI
- clean architecture
- reusable components
- type-safe API integration

The frontend must **not contain backend business logic**.

---

# 2. Stack

## Required stack

- **Bun**
- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

## Rules

- Use **TypeScript strict mode**
- Use **shadcn-generated globals.css**
- Do not redesign the visual system outside the shadcn style base
- Keep the code modular and reusable
- Do not place fetch logic directly inside page components
- Do not place large logic blocks inside JSX

---

# 3. Main Frontend Scope

The dashboard frontend must implement the following functional areas:

1. **Auth pages**
2. **Session bootstrap**
3. **Protected app layout**
4. **Dashboard home**
5. **Widgets list page**
6. **Create widget flow**
7. **Edit widget flow**
8. **Delete widget flow**
9. **Widget context editor**
10. **Widget embed code section**
11. **Settings page**
12. **Logout flow**
13. **Global loading / error handling**

---

# 4. App Architecture

## Architecture goals

The frontend must be:

- clean
- modular
- strongly typed
- maintainable
- reusable
- easy to scale later

## Architectural rules

- UI components must stay mostly presentational
- Data fetching must be isolated in hooks or services
- Domain logic must be grouped by feature
- Shared layout and UI primitives must be separated
- Route protection must be centralized
- API response types must be explicit

---

# 5. Recommended Project Structure

```txt
src/
  app/
    router.tsx
    providers.tsx
    app.tsx

  pages/
    auth/
      login-page.tsx
    dashboard/
      dashboard-home-page.tsx
    widgets/
      widgets-page.tsx
      widget-create-page.tsx
      widget-details-page.tsx
      widget-edit-page.tsx
    settings/
      settings-page.tsx
    not-found-page.tsx

  layouts/
    auth-layout.tsx
    app-layout.tsx

  features/
    auth/
      components/
        login-card.tsx
        google-login-button.tsx
      hooks/
        use-session.ts
        use-require-auth.ts
        use-logout.ts
      services/
        auth-service.ts
      types/
        auth.types.ts

    widgets/
      components/
        widget-list.tsx
        widget-list-item.tsx
        widget-form.tsx
        widget-context-editor.tsx
        widget-embed-card.tsx
        delete-widget-dialog.tsx
        empty-widgets-state.tsx
      hooks/
        use-widgets.ts
        use-widget.ts
        use-create-widget.ts
        use-update-widget.ts
        use-delete-widget.ts
      services/
        widgets-service.ts
      schemas/
        widget-form.schema.ts
      types/
        widget.types.ts

    dashboard/
      components/
        dashboard-header.tsx
        dashboard-shell.tsx
        dashboard-sidebar.tsx
        topbar.tsx

    settings/
      components/
        account-card.tsx
        logout-card.tsx

  components/
    ui/
    common/
      app-logo.tsx
      page-header.tsx
      loading-screen.tsx
      error-state.tsx
      empty-state.tsx
      copy-button.tsx
      code-block.tsx
      confirm-dialog.tsx
    forms/
      form-field-wrapper.tsx
      textarea-field.tsx
      input-field.tsx

  services/
    api-client.ts

  lib/
    env.ts
    utils.ts
    cn.ts

  hooks/
    use-page-title.ts

  types/
    api.types.ts

  styles/
    globals.css

  main.tsx
6. Routing Structure
Public routes
/login
Protected routes
/dashboard
/widgets
/widgets/new
/widgets/:widgetId
/widgets/:widgetId/edit
/settings
Routing requirements

unauthenticated users visiting protected routes must be redirected to /login

authenticated users visiting /login should be redirected to /dashboard

loading state must be shown while session status is being resolved

7. Authentication Frontend Flow
MVP auth mode

Google Sign-In only

Frontend responsibilities

The frontend must implement:

login page

Google sign-in button

session check on app load

route protection

logout button

authenticated layout state

Assumed backend endpoints
GET  /api/v1/auth/session
POST /api/v1/auth/logout
GET  /api/v1/auth/google/start
GET  /api/v1/auth/google/callback

The frontend should treat Google login as backend-owned auth.

Recommended login flow
Option A

If backend returns a redirect URL:

User clicks "Continue with Google"

Frontend requests auth start endpoint or uses backend auth URL directly

Browser redirects to backend Google auth start

Backend completes auth

User returns to dashboard app

Frontend checks session

Frontend rule

The frontend must not implement OAuth logic manually.
It should only initiate the flow and then verify session state.

8. Session Model
Session state must support

loading

authenticated

unauthenticated

Suggested session type
type SessionUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
};

type SessionState =
  | { status: "loading" }
  | { status: "authenticated"; user: SessionUser }
  | { status: "unauthenticated" };
Session handling requirements

session is checked once on app bootstrap

session data should be accessible across protected screens

protected layouts depend on session state

logout clears local auth state and redirects to /login

9. Login Page Requirements
Purpose

Allow the user to enter the dashboard through Google authentication.

UI requirements

The login page must include:

product logo

clear title

short description

Google sign-in button

loading state while redirecting

error message area if auth bootstrap fails

Component breakdown

AuthLayout

LoginCard

GoogleLoginButton

UX rules

keep the page minimal

avoid clutter

use centered card layout

use shadcn button and card components

button text should clearly say "Continue with Google"

10. Protected App Layout
Purpose

Provide the shared UI shell for authenticated pages.

Layout must include

sidebar

topbar

user section

page content area

Sidebar items

Dashboard

Widgets

Settings

Topbar may include

page title

breadcrumb or page label

user avatar/name

optional quick action button

Requirements

reusable layout shell

sidebar must highlight active route

layout must be responsive

mobile support can be basic for MVP

11. Dashboard Home Page
Purpose

Give the user a quick overview after login.

MVP content

welcome section with user's name

card showing total widgets

shortcut button to create widget

shortcut button to view widgets

Data needed

current user session

widgets count

Components

DashboardHeader

StatsCard

QuickActionsCard

12. Widgets List Page
Purpose

Display all widgets owned by the user.

API assumption
GET /api/v1/widgets
Each widget item should display

widget name

short context preview

created date

updated date

actions menu

Actions

View

Edit

Delete

States to support

loading state

empty state

error state

populated list state

Components

WidgetList

WidgetListItem

EmptyWidgetsState

DeleteWidgetDialog

13. Create Widget Page
Purpose

Allow the user to create a widget.

API assumption
POST /api/v1/widgets
Form fields

name

context

Form requirements

validation required

submit button disabled while submitting

error message area

redirect to widget details page after success or widgets list depending on UX preference

Validation rules
Name

required

trimmed

minimum sensible length

Context

required

textarea input

must support large plain text content

Components

WidgetForm

WidgetContextEditor

Suggested form model
type CreateWidgetInput = {
  name: string;
  context: string;
};
14. Widget Details Page
Purpose

Allow the user to view one widget and access main actions.

API assumption
GET /api/v1/widgets/:widgetId
Page sections

widget meta info

context preview/editor entry point

embed code card

edit button

delete button

Must display

widget name

created date

updated date

full or previewed context

generated embed script

15. Edit Widget Page
Purpose

Allow the user to update widget name and context.

API assumption
PATCH /api/v1/widgets/:widgetId
Requirements

preload existing widget data

editable form

save changes

show success feedback

handle validation errors

disable button during save

Reuse rule

The create and edit pages must reuse the same base form component where possible.

Example:

WidgetForm handles shared fields

CreateWidgetPage and EditWidgetPage provide mode-specific behavior

16. Widget Context Editor Requirements
Purpose

Edit the plain text context used by the AI.

UI requirements

large textarea

label

helper text

optional character count

save action

UX requirements

easy to read and edit long text

preserve whitespace correctly in textarea

clear success/error states

Important rule

The context editor is frontend only.
The frontend only sends the value to backend and never decides AI behavior itself.

17. Embed Script Section
Purpose

Allow the user to copy the script needed to install the widget on their website.

Data source

Can come from backend response or generated on the frontend from trusted API data, depending on backend design.

UI requirements

readonly code block

copy button

success feedback like "Copied"

optional helper text like "Paste this before the closing body tag"

Example display
<script src="https://cdn.example.com/widget.js" data-widget-id="widget_123"></script>
Components

WidgetEmbedCard

CodeBlock

CopyButton

18. Delete Widget Flow
Purpose

Allow safe widget deletion.

API assumption
DELETE /api/v1/widgets/:widgetId
UX requirements

delete must require confirmation

use dialog

destructive styling

show loading state while deleting

redirect to widgets list after success

Component

DeleteWidgetDialog

19. Settings Page
Purpose

Provide basic account-level actions for MVP.

MVP sections

profile info card

email display

provider display if available

logout card/button

API assumptions

Profile data can come from session endpoint.

Logout behavior

user clicks logout

frontend calls logout endpoint

session state cleared

redirect to /login

20. API Layer Rules
Strict rule

Page components must not call fetch() directly.

All API communication must go through services

Example:

services/
  api-client.ts

features/auth/services/
  auth-service.ts

features/widgets/services/
  widgets-service.ts
api-client responsibilities

base URL handling

credentials handling

JSON parsing

common error formatting

widgets-service responsibilities

list widgets

get widget

create widget

update widget

delete widget

auth-service responsibilities

get session

logout

start login flow if needed

21. Type Safety Rules
Every endpoint must have explicit frontend types

Examples:

type Widget = {
  id: string;
  name: string;
  context: string;
  createdAt: string;
  updatedAt: string;
};

type GetWidgetsResponse = {
  data: Widget[];
};

type GetWidgetResponse = {
  data: Widget;
};
Rules

do not use any

define response types

define mutation input types

strongly type hooks and props

22. Form Validation
Recommended approach

Use a typed validation schema layer for forms.

Suggested stack:

react-hook-form

zod

Why

clean form state

reusable validation

strong TypeScript support

Example form schema areas

create widget form

edit widget form

23. State Management
Rule

Keep state management simple.

Use local component state for

dialogs

loading toggles

copy button temporary state

Use feature hooks for

fetching widget data

session state

mutations

Use context only for

session provider

app-wide UI state if needed

Do not add a large global state library unless the project actually needs it.

24. Data Fetching Strategy
Recommended

Use feature hooks to wrap service calls.

Examples:

useSession()

useWidgets()

useWidget(widgetId)

useCreateWidget()

useUpdateWidget(widgetId)

useDeleteWidget(widgetId)

Hook responsibilities

loading state

error state

success handling

data exposure

The UI should consume hooks, not raw services directly unless the case is very small.

25. Error Handling
The frontend must support

page-level loading

page-level error

empty state

form-level validation errors

request-level failure messages

Common error UI components

ErrorState

LoadingScreen

EmptyState

Requirements

user-facing messages should be simple

avoid raw backend error dumps in UI

destructive actions must show clear feedback

26. Loading States
Required loading states

initial session bootstrap

login redirect state

widgets list loading

widget detail loading

create widget submit loading

edit widget submit loading

delete widget loading

logout loading

UX rule

Every async action must have visible feedback.

27. Reusable UI Components

The following reusable components should exist early:

PageHeader

LoadingScreen

ErrorState

EmptyState

CodeBlock

CopyButton

ConfirmDialog

FormFieldWrapper

These should reduce duplication across pages.

28. Styling Rules
Use only

Tailwind utility classes

shadcn components

existing shadcn CSS variables / globals.css

Do not

create a separate random design system

add inconsistent button styles

manually style each page differently

override shadcn in messy ways

Visual direction

clean SaaS dashboard

simple spacing

calm surfaces

strong readability

minimal visual noise

29. Performance Rules
The frontend must

lazy load route pages where useful

avoid very large page components

memoize only where needed

avoid unnecessary rerenders from lifted state

Bundle hygiene

keep feature boundaries clean

do not import large utilities globally unless necessary

avoid dead code and duplicated helper logic

30. Accessibility

Minimum requirements:

semantic HTML

labels for inputs

keyboard-accessible dialogs

accessible buttons

visible focus states through shadcn styles

31. MVP Page Checklist
Login

 login page layout

 google login button

 redirect flow

 login loading state

Session

 session bootstrap

 protected routes

 unauthenticated redirect

 authenticated redirect from login

Dashboard

 app shell

 sidebar

 topbar

 dashboard home

Widgets

 widgets list

 empty state

 create widget page

 edit widget page

 widget details page

 delete widget dialog

 embed code copy UI

Settings

 account section

 logout button

32. Implementation Order

Recommended build order:

app setup

routing

shadcn base setup

auth layout and login page

session provider and route guards

protected app layout

dashboard home

widgets list page

create widget page

widget details page

edit widget page

delete flow

settings page

error and loading polish

33. Non-Goals for This Frontend Phase

The following are not included in this phase unless added later:

billing UI

analytics UI

chat logs UI

theme customization UI for widgets

advanced team management

backend auth implementation

backend business logic

AI behavior logic

34. Final Engineering Rule

The frontend must feel like a real production dashboard.

That means:

no messy giant components

no direct API calls inside pages

no weak typing

no duplicated form logic

no random styling outside the chosen system

The final result must be:

clean

modular

reusable

type-safe

easy to extend