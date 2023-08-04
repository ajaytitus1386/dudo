import { faClipboardQuestion, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, { useEffect, useState } from "react"
import Rating from "./Rating"
import Comment from "./Comment"

const UserFeedback = () => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true)
        }, 2 * 60 * 1000)
    }, [])

    return (
        <div
            className={[
                `transition-[width_height] duration-500 ease-in-out`,
                isOpen
                    ? `flex flex-row justify-start items-start w-2/3 md:w-1/3 h-48 p-4`
                    : `flex justify-center items-center w-8 h-8`,
                `z-40 fixed gap-x-2 bottom-4 left-8 rounded bg-background-light-300 dark:bg-background-dark-300 shadow-md`,
            ].join(" ")}
        >
            {isOpen ? (
                <>
                    <button className="py-0.5" onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-text-light-500 dark:text-text-dark-500 text-lg"
                        />
                    </button>
                    <div className="flex flex-col justify-end items-start gap-y-2 w-full">
                        <p className="text-text-light-500 dark:text-text-dark-500">
                            How would you rate your overall experience?
                        </p>
                        <Rating />
                        <Comment />
                    </div>
                </>
            ) : (
                <>
                    <button className="py-0.5" onClick={() => setIsOpen(true)}>
                        <FontAwesomeIcon
                            icon={faClipboardQuestion}
                            className="text-primary-light-500 dark:text-text-dark-500 text-lg"
                        />
                    </button>
                </>
            )}
        </div>
    )
}

export default UserFeedback
