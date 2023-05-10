import React from "react"

//? Date FNS for time formatting

/**
 * @param sender - The name of the sender of the message
 * @param isSent - Whether the message is sent by the user or received by the user
 * @param isTail - Whether the message is the last message i.e chronologically newest in the list
 * @param isHead - Whether the message is the first message i.e chronologically oldest in the list
 */
const Message = ({
    isSent,
    message,
    isTail,
    isHead,
    timestamp,
    sender,
}: {
    isSent: boolean
    message: string
    isTail: boolean
    isHead: boolean
    timestamp?: string
    sender?: string
}) => {
    return (
        <div
            className={`flex flex-col gap-1 px-1 ${
                isSent ? "self-end items-end" : "self-start items-start"
            }`}
        >
            {isHead && <sub className="text-xs text-gray-500">{sender}</sub>}
            <div
                className={`px-2 py-1 
                ${
                    isSent
                        ? "bg-gray-400 text-black"
                        : "bg-primary-light-200 text-black"
                }
                 ${
                     isSent
                         ? `rounded-l-xl ${isHead ? "rounded-tr-xl" : ""} ${
                               isTail ? "rounded-br-xl" : ""
                           }`
                         : `rounded-r-xl ${isHead ? "rounded-tl-xl" : ""} ${
                               isTail ? "rounded-bl-xl" : ""
                           }`
                 }`}
            >
                {message}
            </div>
            {isTail && <sub className="text-xs text-gray-500">{timestamp}</sub>}
        </div>
    )
}

const MessageList = () => {
    return (
        <div className="flex flex-col gap-1 w-full h-full overflow-y-auto">
            <Message
                isSent={true}
                message="First Message"
                isTail={false}
                isHead={true}
            />
            <Message
                isSent={true}
                message="Second Message"
                isTail={false}
                isHead={false}
            />
            <Message
                isSent={true}
                message="Third Message"
                isTail={true}
                isHead={false}
                timestamp="Jun 18 16:02"
            />
            <Message
                isSent={false}
                message="First Message"
                isTail={true}
                isHead={true}
                sender="John Doe"
            />
            <Message
                isSent={true}
                message="Fourth Message"
                isTail={true}
                isHead={true}
                timestamp="Jun 18 16:02"
            />
            <Message
                isSent={false}
                message="Second Message"
                isTail={false}
                isHead={true}
                sender="John Doe"
            />
            <Message
                isSent={false}
                message="Third Message"
                isTail={true}
                isHead={false}
                sender="John Doe"
                timestamp="Jun 18 16:04"
            />
        </div>
    )
}

export default MessageList
