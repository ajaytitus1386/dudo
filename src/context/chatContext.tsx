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
})

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState([] as AllMessages)
    const [latestTimestampViewed, setLatestTimestampViewed] = useState(0)

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                latestTimestampViewed,
                setLatestTimestampViewed,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    return useContext(ChatContext)
}
