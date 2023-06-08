import React, { ReactNode } from "react"

interface Props {
    className?: string
    onClick?: () => void
    children: ReactNode
}

const Button: React.FC<Props> = ({ className, onClick, children }) => {
    return (
        <button
            className={[
                "w-auto min-w-[4rem] h-8 bg-blue-400 rounded-md hover:bg-blue-600 text-white",
                className,
            ].join(" ")}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
