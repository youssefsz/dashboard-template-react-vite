function getRequiredEnv(name: string, fallback?: string) {
  const value = import.meta.env[name]

  if (typeof value === "string" && value.trim().length > 0) {
    return value
  }

  if (fallback) {
    return fallback
  }

  throw new Error(`Missing required environment variable: ${name}`)
}

export const API_BASE_URL = getRequiredEnv("VITE_API_BASE_URL", "http://localhost:3000/api")
