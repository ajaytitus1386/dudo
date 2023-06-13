import React from "react"
import Navbar from "./Navbar"

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div
            id={"layout"}
            className="bg-background-light-100 dark:bg-background-dark-100"
        >
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
