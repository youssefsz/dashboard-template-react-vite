import { z } from "zod"
import type { SessionUser } from "../types/auth.types"

const sessionUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().min(1),
  emailVerified: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

const SESSION_STORAGE_KEY = "app.session"

const mockUser: SessionUser = {
  id: "user_01",
  email: "alex.morgan@northwind.dev",
  name: "Alex Morgan",
  emailVerified: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

function readStoredSession() {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    return sessionUserSchema.parse(JSON.parse(raw))
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

function writeStoredSession(user: SessionUser | null) {
  if (typeof window === "undefined") {
    return
  }

  if (!user) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY)
    return
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export const authService = {
  // Demo credentials only. Replace with server-side authentication before
  // deployment. Never store real passwords in browser storage.
  async loginWithPassword({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    await wait(700)
    if (!username.trim() || !password) {
      throw new Error("Enter your username and password to continue.")
    }
    const user = { ...mockUser, updatedAt: new Date().toISOString() }
    writeStoredSession(user)
    return { user }
  },

  async getSession() {
    const user = readStoredSession()

    return {
      authenticated: !!user,
      user,
    }
  },

  async loginWithGoogle() {
    await wait(700)

    const user = {
      ...mockUser,
      updatedAt: new Date().toISOString(),
    }

    writeStoredSession(user)

    return { user }
  },

  async logout() {
    await wait(200)
    writeStoredSession(null)

    return { success: true }
  },
}
