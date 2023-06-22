import React, { ReactNode } from "react"

type ButtonVariants = "primary" | "ghost" | "none"

interface Props {
    className?: string
    onClick?: () => void
    children: ReactNode
    variant?: ButtonVariants
}

const Button: React.FC<Props> = ({
    className,
    onClick,
    children,
    variant = "primary",
}) => {
    return (
        <button
            className={[
                "w-auto min-w-[4rem] h-8 rounded-lg px-1",
                variant === "primary" &&
                    "bg-primary-light-100 rounded-md hover:bg-primary-light-300 text-text-light-100 dark:text-text-dark-100",
                variant === "ghost" &&
                    "border-primary-light-100 hover:border-primary-light-300 border-2",
                className,
            ].join(" ")}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
