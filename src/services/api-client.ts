import { API_BASE_URL } from "@/lib/env"

class APIError extends Error {
  status: number
  code?: string
  data?: unknown

  constructor(status: number, message: string, code?: string, data?: unknown) {
    super(message)
    this.name = "APIError"
    this.status = status
    this.code = code
    this.data = data
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // Send session cookies with every request
  })

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = null
    }
    // API returns { error: { code, message } }
    const code = errorData?.error?.code
    const message = errorData?.error?.message || "An unexpected error occurred"
    throw new APIError(response.status, message, code, errorData)
  }

  // Handle empty responses (e.g. 204 No Content)
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "POST", body: data ? JSON.stringify(data) : undefined }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "PUT", body: data ? JSON.stringify(data) : undefined }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "PATCH", body: data ? JSON.stringify(data) : undefined }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
}

export { APIError }
