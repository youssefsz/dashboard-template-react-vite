import { useState } from "react"
import { useSession } from "./use-session"
import { useNavigate } from "react-router-dom"

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { logout } = useSession()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    navigate("/login")
  }

  return { isLoggingOut, handleLogout }
}
