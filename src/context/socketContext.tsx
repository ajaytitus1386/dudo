import {
    addChatEventListeners,
    addGameEventListeners,
    addRoomEventListeners,
    addSocketListeners,
} from "lib/socket/listeners"
import { WEBSOCKET_URL } from "../constants"
import { createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../dudo_submodules/constants/serverEventInterfaces"
import { useRoomContext } from "./roomContext"
import { useRouter } from "next/router"
import { useAppContext } from "./appContext"
import { useGameContext } from "./gameContext"
import { useChatContext } from "./chatContext"

const SocketContext = createContext({
    socket: null as Socket<ServerToClientEvents, ClientToServerEvents> | null,
})

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(
        null as Socket<ServerToClientEvents, ClientToServerEvents> | null
    )
    const { setRoomName, setRoom } = useRoomContext()
    const { username } = useAppContext()
    const { setGame, setCurrentHand } = useGameContext()
    const { setMessages } = useChatContext()
    const router = useRouter()

    useEffect(() => {
        // Initialize socket if not done
        if (socket !== null) return

        const newSocket = io(WEBSOCKET_URL, {
            transports: ["websocket"],
        })

        setSocket(newSocket)

        // return () => {
        //     newSocket.disconnect()
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Add listeners when socket is ready
        if (!socket) return

        // Remove all listeners before adding new ones
        socket.removeAllListeners()

        // Some listeners require context and state and so are in the useEffect dependency array
        addSocketListeners(socket)
        addRoomEventListeners(socket, router, setRoom, setRoomName, username)
        addGameEventListeners(
            socket,
            setRoom,
            setGame,
            setCurrentHand,
            username
        )
        addChatEventListeners(socket, setMessages)
    }, [
        router,
        setCurrentHand,
        setGame,
        setMessages,
        setRoom,
        setRoomName,
        socket,
        username,
    ])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => {
    return useContext(SocketContext)
}
