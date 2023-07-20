import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import Input from "../Input"

const MessageInput = () => {
    return (
        <div className="flex flex-row gap-x-2 px-2 justify-start items-start">
            <Input
                placeholder="Send a message to the room"
                type="text"
                value=""
                onChange={() => {}}
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
