import {
    faClipboardQuestion,
    faPaperPlane,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, { useEffect, useRef, useState } from "react"
import Rating from "./Rating"
import Comment from "./Comment"
import { sendNewUserRating } from "lib/services/userRating"
import { useAppContext } from "context/appContext"

const UserFeedback = () => {
    const { username } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)
    const [hasBeenOpened, setHasBeenOpened] = useState(false)
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)

    const [rating, setRating] = useState(5)
    const [commentString, setCommentString] = useState("")

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) setHasBeenOpened(true)
    }, [isOpen])

    const submitNewFeedback = async () => {
        if (!username) return

        await sendNewUserRating({
            userId: username,
            rating: rating,
            comment: commentString,
        })

        setHasBeenSubmitted(true)
    }

    return (
        <div
            ref={containerRef}
            className={[
                `transition-[width_height] duration-500 ease-in-out`,
                isOpen
                    ? `flex flex-row justify-start items-start w-2/3 md:w-1/3 h-48 p-4 border-2`
                    : `flex justify-center items-center w-8 h-8`,
                `z-40 fixed gap-x-2 bottom-4 left-8 rounded bg-background-light-200 dark:bg-background-dark-200 border-background-light-300 dark:border-background-dark-300 shadow-md`,
            ].join(" ")}
        >
            {isOpen ? (
                <>
                    <button
                        className="py-0.5"
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-text-light-500 dark:text-text-dark-500 text-lg"
                        />
                    </button>

                    <>
                        <div
                            className={`flex flex-col justify-end items-start gap-y-2 w-full`}
                        >
                            {hasBeenSubmitted ? (
                                <p className="text-text-light-500 dark:text-text-dark-500">
                                    Thank you for your feedback 🎉
                                </p>
                            ) : (
                                <p className="text-text-light-500 dark:text-text-dark-500">
                                    How would you rate your overall experience?
                                </p>
                            )}
                            <Rating rating={rating} setRating={setRating} />
                            <Comment
                                commentString={commentString}
                                setCommentString={setCommentString}
                            />
                        </div>
                        <button
                            className="py-0.5"
                            onClick={() => submitNewFeedback()}
                        >
                            <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="text-primary-light-500 dark:text-text-dark-500 text-lg"
                            />
                        </button>
                    </>
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
