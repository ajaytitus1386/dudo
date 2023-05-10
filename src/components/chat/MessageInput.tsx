import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const MessageInput = () => {
    return (
        <div className="flex flex-row gap-2 px-2 py-1 justify-between items-center">
            <input
                type="text"
                placeholder="Send a message to the room"
                className="w-full px-2 py-1 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 "
            />
            <button
                type="submit"
                className="p-1 rounded-full hover:-translate-y-1 transition-transform"
            >
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-primary-light-300"
                />
            </button>
        </div>
    )
}

export default MessageInput
