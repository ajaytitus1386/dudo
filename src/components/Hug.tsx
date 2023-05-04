import React, { HTMLProps, PropsWithChildren } from "react"

type Props = {
    className?: string
}

const Hug: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return (
        <div
            className={["shadow-lg rounded-md px-4 py-2", className].join(" ")}
        >
            {children}
        </div>
    )
}

export default Hug
