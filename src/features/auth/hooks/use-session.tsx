import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { SessionState } from "../types/auth.types"
import { authService } from "../services/auth-service"

interface SessionContextValue {
  session: SessionState;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionState>({ status: "loading" })

  const fetchSession = async () => {
    try {
      const response = await authService.getSession()
      if (response.user) {
        setSession({ status: "authenticated", user: response.user })
      } else {
        setSession({ status: "unauthenticated" })
      }
    } catch {
      setSession({ status: "unauthenticated" })
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      setSession({ status: "unauthenticated" })
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return (
    <SessionContext.Provider value={{ session, refreshSession: fetchSession, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
