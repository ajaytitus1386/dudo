import { faClipboardQuestion, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, { useEffect, useRef, useState } from "react"
import Rating from "./Rating"
import Comment from "./Comment"

const UserFeedback = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [hasBeenOpened, setHasBeenOpened] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) setHasBeenOpened(true)
    }, [isOpen])

    useEffect(() => {
        let endTimer: NodeJS.Timeout
        const beginTimer = setTimeout(() => {
            if (!hasBeenOpened && containerRef.current) {
                containerRef.current.classList.add("animate-bounce")
                endTimer = setTimeout(() => {
                    containerRef.current?.classList.remove("animate-bounce")
                }, 60 * 1000)
            }
        }, 60 * 1000)

        return () => {
            clearTimeout(beginTimer)
            clearTimeout(endTimer)
        }
    }, [])

    return (
        <div
            ref={containerRef}
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
