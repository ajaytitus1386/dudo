import React, { HTMLProps, PropsWithChildren } from "react"

type Props = React.HTMLProps<HTMLDivElement> & {
    className?: string
    id?: string
}

const Hug: React.FC<PropsWithChildren<Props>> = ({
    children,
    className,
    id,
    ...props
}) => {
    return (
        <div
            id={id}
            className={[
                "w-full shadow-lg rounded-md px-4 py-2 bg-background-light-200 dark:bg-background-dark-200",
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </div>
    )
}

export default Hug
