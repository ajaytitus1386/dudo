import React from "react"
import Navbar from "./Navbar"

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div id={"layout"} className="bg-teal-50">
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
