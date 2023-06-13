import React, { useRef, useState } from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

type Props = {
    invoker: React.ReactNode
    children: React.ReactNode
    className?: string
    heading?: string
}

const Modal: React.FC<Props> = ({ children, invoker, className, heading }) => {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)

    const detectDisclosure = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!modalRef.current?.contains(e.target as Node)) {
            // Clicked outside
            onClose()
        }
    }

    return (
        <>
            <div onClick={onOpen}>{invoker}</div>
            <div
                onClick={(e) => detectDisclosure(e)}
                className={`${
                    isOpen ? "flex" : "hidden"
                } fixed top-0 left-0 right-0 z-50 flex-col items-center justify-center overflow-y-auto h-full max-h-full bg-opacity-40 bg-black`}
            >
                {/* Modal Body */}
                <div
                    ref={modalRef}
                    className="flex flex-col gap-4 w-[90%] max-h-[75%] m-auto py-8 px-4 bg-background-light-200 dark:bg-background-dark-200 rounded-md"
                >
                    {/* Modal Header */}
                    <div className="flex flex-row items-center justify-between">
                        <div />

                        <h2 className="font-bold text-2xl text-text-light-500 dark:text-text-dark-500">
                            {heading}
                        </h2>

                        <button onClick={onClose}>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="text-text-light-500 dark:text-text-dark-500"
                            />
                        </button>
                    </div>
                    {/* Modal Content */}
                    <div className="overflow-y-auto px-1 gap-2">{children}</div>
                </div>
            </div>
        </>
    )
}

export default Modal
