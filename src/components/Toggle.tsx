import React from "react"

interface Props {
    children: React.ReactNode
    checked: boolean
    onToggle: () => void
    disabled?: boolean
}

const Toggle: React.FC<Props> = ({ children, checked, onToggle, disabled }) => {
    return (
        <label
            className={[
                "relative inline-flex items-center cursor-pointer",
                disabled && "opacity-75",
            ].join(" ")}
        >
            <span
                className={"mr-3 text-text-light-500 dark:text-text-dark-500"}
            >
                {children}
            </span>
            <input
                type="checkbox"
                value=""
                checked={checked}
                disabled={disabled}
                className="sr-only peer"
                onClick={onToggle}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light-100 dark:peer-focus:ring-primary-light-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-light-400"></div>
        </label>
    )
}

export default Toggle
