import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import { readColorScheme, setColorScheme } from "../utils/functions"

const Context = createContext({
    theme: "light",
    setTheme: (theme: string) => {},
    toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        // Initialize theme
        const localColorScheme = readColorScheme()
        if (!localColorScheme) return
        setTheme(localColorScheme)
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        setColorScheme(newTheme)
    }

    return (
        <Context.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </Context.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(Context)
}
