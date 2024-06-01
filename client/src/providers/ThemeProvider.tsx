import { createContext, useEffect, useState } from "react"

import { useColorModeStore } from "@/store/ColorModeStore"
import ColorMode from "@/types/page/style/ColorMode"

type Theme = "dark" | "light" | "system"
 
type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}
   
export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ 
    children,
    defaultTheme = "system",
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) {
    const setMode = useColorModeStore(state => state.setColorMode)
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)

        const storedValue = localStorage.getItem('vite-ui-theme')
        
        if (storedValue) {
            setMode(storedValue as ColorMode)
        } else {
            localStorage.setItem("vite-ui-theme", "light")
        }
    }, [theme, setMode])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        }
    }

    return <ThemeProviderContext.Provider {...props} value={value} children={children} />
}