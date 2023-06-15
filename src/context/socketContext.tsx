import { addRoomEventListeners, addSocketListeners } from "lib/socket/listeners"
import { WEBSOCKET_URL } from "../constants"
import { createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

const SocketContext = createContext({
    socket: null as Socket | null,
})

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(null as Socket | null)

    useEffect(() => {
        // Initialize socket if not done
        if (socket !== null) return

        const newSocket = io(WEBSOCKET_URL, {
            transports: ["websocket"],
        })
        addSocketListeners(newSocket)
        addRoomEventListeners(newSocket)

        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => {
    return useContext(SocketContext)
}
