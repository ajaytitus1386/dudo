import Link from "next/link"
import React from "react"

const FourOhFour = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
            <div className="flex px-8 py-4 gap-x-4 justify-center items-center">
                <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold text-2xl">
                    404
                </h1>
                <div className="w-px h-8 bg-background-dark dark:bg-background-light" />
                <h2 className="text-text-light-500 dark:text-text-dark-500 font-light text-sm">
                    This page could not be found
                </h2>
            </div>
            <Link
                href="/"
                className="text-text-light-500 dark:text-text-dark-500 font-medium text-base underline"
            >
                Go Home
            </Link>
        </div>
    )
}

export default FourOhFour
