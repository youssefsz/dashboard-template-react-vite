/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

type Theme = "dark" | "light" | "system"


type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)



export function ThemeProvider({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultTheme: _defaultTheme,
  storageKey = "theme",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disableTransitionOnChange: _disableTransitionOnChange,
  ...props
}: ThemeProviderProps) {
  // Always enforce "dark" mode in state
  const [theme, setThemeState] = React.useState<Theme>("dark")

  const setTheme = React.useCallback(
    () => {
      // Intentionally ignore any request to change the theme, 
      // but keep the function signature intact for useTheme
      localStorage.setItem(storageKey, "dark")
      setThemeState("dark")
    },
    [storageKey]
  )

  React.useEffect(() => {
    const root = document.documentElement
    
    // Always apply dark class and remove light
    root.classList.remove("light")
    root.classList.add("dark")
    
    // Set local storage to always be dark
    try {
      localStorage.setItem(storageKey, "dark")
    } catch {
      // Ignore if localStorage is unavailable
    }
  }, [storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
