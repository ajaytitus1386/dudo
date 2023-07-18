import { createContext, useContext, useState } from "react"
import { Message, SystemMessage } from "../../dudo_submodules/models/chat"

export type AllMessages = Message[] | SystemMessage[]

const ChatContext = createContext({
    messages: [] as AllMessages,
    setMessages: (() => {}) as React.Dispatch<
        React.SetStateAction<AllMessages>
    >,
    latestTimestampViewed: 0,
    setLatestTimestampViewed: ((timestamp: number) => {}) as React.Dispatch<
        React.SetStateAction<number>
    >,
    resetChatContext: (() => {}) as () => void,
})

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState([] as AllMessages)
    const [latestTimestampViewed, setLatestTimestampViewed] = useState(
        new Date().getTime()
    )

    const resetChatContext = () => {
        setMessages([] as AllMessages)
        setLatestTimestampViewed(new Date().getTime())
    }

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                latestTimestampViewed,
                setLatestTimestampViewed,
                resetChatContext,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    return useContext(ChatContext)
}
