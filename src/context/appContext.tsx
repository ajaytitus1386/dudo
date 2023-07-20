import { createContext, useContext, useState } from "react"

const AppContext = createContext({
    username: null as string | null,
    setUsername: ((username: string | null) => {}) as React.Dispatch<
        React.SetStateAction<string | null>
    >,
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null)

    return (
        <AppContext.Provider value={{ username, setUsername }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
