import React, { HTMLProps, PropsWithChildren } from "react"

type Props = {
    className?: string
    id?: string
}

const Hug: React.FC<PropsWithChildren<Props>> = ({
    children,
    className,
    id,
}) => {
    return (
        <div
            id={id}
            className={["shadow-lg rounded-md px-4 py-2", className].join(" ")}
        >
            {children}
        </div>
    )
}

export default Hug
