import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useThemeContext } from "context/themeContext"
import React from "react"

const Navbar = () => {
    const { theme, toggleTheme } = useThemeContext()

    return (
        <div className="w-full flex items-center justify-between fixed z-10 top-0 px-4 py-2 bg-background-light-200 dark:bg-background-dark-200 shadow-md">
            <h1 className="text-2xl tracking-wider font-bold text-primary-light-300 dark:text-text-dark-500">
                Liar&apos;s Dice
            </h1>
            <button
                type="button"
                onClick={() => toggleTheme()}
                className="relative flex flex-col items-center justify-center w-5 h-5 overflow-hidden"
            >
                <FontAwesomeIcon
                    icon={faSun}
                    className={[
                        "text-primary-light-300 dark:text-text-dark-500 text-xl transition-all duration-300",
                        theme === "light" ? "mt-5" : "mt-0",
                    ].join(" ")}
                />
                <FontAwesomeIcon
                    icon={faMoon}
                    className={[
                        "text-text-light-500 dark:text-text-dark-500 text-xl transition-all duration-300",
                        theme === "dark" ? "mb-5" : "mb-0",
                    ].join(" ")}
                />
            </button>
        </div>
    )
}

export default Navbar
