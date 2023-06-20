import { error } from "console"
import React, { FC } from "react"

type Props = {
    className?: string
    placeholder: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    RightElement?: React.ReactNode
    error?: string
    required?: boolean
}

const Input: FC<Props> = ({
    type = "text",
    value,
    placeholder,
    className,
    onChange,
    RightElement,
    error,
    required,
}) => {
    return (
        <span className="flex w-full relative mb-5">
            <input
                required={required}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={[
                    "w-full px-2 py-1 bg-gray-50 dark:bg-background-dark-100 border text-text-light-500 dark:text-text-dark-500 placeholder-gray-400 dark:placeholder-gray-600 rounded-md focus-visible:outline-none",
                    RightElement ? " rounded-r-none" : "",
                    error
                        ? `border-red-500 focus:ring-red-500 focus:border-red-500`
                        : "border-gray-300 dark:border-background-dark-300 focus:ring-blue-500 focus:border-blue-500",
                    className,
                ].join(" ")}
            />
            {RightElement && (
                <span className="flex items-center bg-gray-50 dark:bg-background-dark-100 border border-gray-300 dark:border-background-dark-300 rounded-md rounded-l-none border-l-0 px-2">
                    {RightElement}
                </span>
            )}
            {error && (
                <span className="absolute -bottom-5 left-1 text-sm text-red-500">
                    {error}
                </span>
            )}
        </span>
    )
}

export default Input
