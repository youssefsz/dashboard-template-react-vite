import type { SessionUser } from "../types/auth.types"

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
    return JSON.parse(raw) as SessionUser
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

    // Real Google implementation kept here for later restoration:
    // return apiClient.post<{ user: SessionUser }>("/v1/auth/google", { idToken })
  },

  async logout() {
    await wait(200)
    writeStoredSession(null)

    return { success: true }

    // Real backend implementation kept here for later restoration:
    // return apiClient.post<{ success: boolean }>("/v1/auth/logout")
  },
}
