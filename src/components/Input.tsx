import React, { FC } from "react"

type Props = {
    className?: string
    placeholder: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    RightElement?: React.ReactNode
}

const Input: FC<Props> = ({
    type = "text",
    value,
    placeholder,
    className,
    onChange,
    RightElement,
}) => {
    return (
        <span className="flex w-full">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={[
                    "w-full px-2 py-1 bg-gray-50 dark:bg-background-dark-100 border border-gray-300 dark:border-background-dark-300 text-text-light-500 dark:text-text-dark-500 placeholder-gray-400 dark:placeholder-gray-600 rounded-md focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500",
                    RightElement ? " rounded-r-none" : "",
                    className,
                ].join(" ")}
            />
            {RightElement && (
                <span className="flex items-center bg-gray-50 dark:bg-background-dark-100 border border-gray-300 dark:border-background-dark-300 rounded-md rounded-l-none border-l-0 px-2">
                    {RightElement}
                </span>
            )}
        </span>
    )
}

export default Input
