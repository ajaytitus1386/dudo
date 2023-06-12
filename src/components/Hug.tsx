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
            className={[
                "w-full shadow-lg rounded-md px-4 py-2 bg-background-light-200 dark:bg-background-dark-200",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    )
}

export default Hug
