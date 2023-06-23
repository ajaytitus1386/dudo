import { type } from "os"
import React, { ReactNode } from "react"

type ButtonVariants = "primary" | "ghost" | "none"

interface Props {
    className?: string
    onClick?: () => void
    children: ReactNode
    variant?: ButtonVariants
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const Button: React.FC<Props> = ({
    className,
    onClick,
    children,
    variant = "primary",
    type = "button",
}) => {
    return (
        <button
            type={type}
            className={[
                "w-auto min-w-[4rem] h-8 rounded-lg px-1",
                variant === "primary" &&
                    "bg-primary-light-300 hover:bg-primary-light-400 dark:bg-primary-light-200 dark:hover:bg-primary-light-300 text-text-light-100 dark:text-text-dark-500",
                variant === "ghost" &&
                    "border-primary-light-300 hover:bg-primary-light-400 dark:bg-primary-light-200 dark:hover:bg-primary-light-300 border-2",
                className,
            ].join(" ")}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
