import React from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

const ChatWindow = () => {
    return (
        <div className="w-1/3 h-full shadow-md">
            <MessageList />
            <MessageInput />
        </div>
    )
}

export default ChatWindow
