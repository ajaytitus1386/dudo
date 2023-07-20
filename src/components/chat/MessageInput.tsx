import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, {
    FormEvent,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import Input from "../Input"
import { useChatContext } from "context/chatContext"
import { Message } from "../../../dudo_submodules/models/chat"
import { useAppContext } from "context/appContext"
import { sendMessage } from "lib/socket/emitters"
import { useSocketContext } from "context/socketContext"
import { useRoomContext } from "context/roomContext"

const MessageInput = () => {
    const { username } = useAppContext()
    const { setMessages } = useChatContext()
    const { socket } = useSocketContext()
    const { room } = useRoomContext()
    const [messageString, setMessageString] = useState("")

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!inputRef.current) return
        inputRef.current.focus()
    }, [])

    const sendYourMessage = (e: FormEvent) => {
        e.preventDefault()

        if (!username || !room || !socket) return

        const newMessage: Message = {
            senderId: username,
            senderName: username,
            message: messageString,
            timestamp: Date.now(),
        }
        setMessages((prev) => {
            return [...prev, newMessage]
        })
        setMessageString("")

        sendMessage(socket, room.name, newMessage)
    }

    return (
        <form
            onSubmit={sendYourMessage}
            className="flex flex-row gap-x-2 px-2 justify-start items-start"
        >
            <Input
                ref={inputRef}
                placeholder="Send a message to the room"
                type="text"
                value={messageString}
                onChange={(e) => {
                    setMessageString(e.target.value)
                }}
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
        </form>
    )
}

export default MessageInput
