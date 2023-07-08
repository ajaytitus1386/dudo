import React, { useEffect, useState } from "react"
import Username from "../Username"
import { useChatContext } from "context/chatContext"
import { useAppContext } from "context/appContext"
import { Message, SystemMessage } from "../../../dudo_submodules/models/chat"
import { formatDistance } from "date-fns"

//? Date FNS for time formatting

/**
 * @param sender - The name of the sender of the message
 * @param isSent - Whether the message is sent by the user or received by the user
 * @param isTail - Whether the message is the last message i.e chronologically newest in the list
 * @param isHead - Whether the message is the first message i.e chronologically oldest in the list
 */
const MessageComponent = ({
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
            {isHead && sender && (
                <Username
                    className="text-sm text-text-light-300 dark:text-text-dark-300 mt-1"
                    username={sender}
                />
            )}
            <div
                className={`px-2 py-1 
                ${
                    isSent
                        ? "bg-background-light-500 dark:bg-background-dark-500 text-text-light-500 dark:text-text-dark-500"
                        : "bg-primary-light-200 dark:bg-primary-light-500 text-text-light-500 dark:text-text-dark-500"
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
            {isTail && (
                <sub className="text-xs text-text-light-300 dark:text-text-dark-300">
                    {timestamp}
                </sub>
            )}
        </div>
    )
}

const SystemMessage = ({ message }: { message: string }) => {
    return (
        <div className="mx-auto">
            <p className="text-sm text-center font-light text-text-light-300 dark:text-text-dark-300">
                {message}
            </p>
        </div>
    )
}

const MessageList = () => {
    const { messages, latestTimestampViewed, setLatestTimestampViewed } =
        useChatContext()
    const { username } = useAppContext()

    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const isChatMessage = (
        message: Message | SystemMessage
    ): message is Message => !!(message as Message)?.senderId
    const isSystemMessage = (
        message: Message | SystemMessage
    ): message is SystemMessage => !!(message as SystemMessage)?.message

    return (
        <>
            <SystemMessage message="Welcome to the chat!" />
            {/* <pre>{JSON.stringify(messages)}</pre> */}

            {messages.map((message, index) => {
                // const chatMessage = message as Message
                // const systemMessage = message as SystemMessage
                const nextMessage = messages[index + 1]
                const isNextMessageChatMessage = isChatMessage(nextMessage)

                const previousMessage = messages[index - 1]
                const isPreviousMessageChatMessage =
                    isChatMessage(previousMessage)

                if (isChatMessage(message)) {
                    return (
                        <MessageComponent
                            key={message.timestamp}
                            isSent={message.senderId === username}
                            message={message.message}
                            isTail={
                                index === messages.length - 1 ||
                                (isNextMessageChatMessage &&
                                    nextMessage.senderId !== message.senderId)
                            }
                            isHead={
                                index === 0 ||
                                !isPreviousMessageChatMessage ||
                                (isPreviousMessageChatMessage &&
                                    previousMessage.senderId !==
                                        message.senderId)
                            }
                            sender={
                                message.senderId === username
                                    ? ""
                                    : message.senderId
                            }
                            timestamp={formatDistance(
                                message.timestamp,
                                currentDate,
                                { addSuffix: true }
                            )}
                        />
                    )
                } else if (isSystemMessage(message)) {
                    return (
                        <SystemMessage
                            key={message.message}
                            message={message.message}
                        />
                    )
                }
            })}
        </>
    )
}

export default MessageList
