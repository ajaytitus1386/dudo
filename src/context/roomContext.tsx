import { createContext, useContext, useState } from "react"

const RoomContext = createContext({
    roomName: null as string | null,
    setRoomName: (roomName: string | null) => {},
    roomState: "lobby",
    setRoomState: (roomState: "lobby" | "game") => {},
})

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const [roomName, setRoomName] = useState(null as string | null)
    const [roomState, setRoomState] = useState("lobby")

    return (
        <RoomContext.Provider
            value={{ roomName, setRoomName, roomState, setRoomState }}
        >
            {children}
        </RoomContext.Provider>
    )
}

export const useRoomContext = () => {
    return useContext(RoomContext)
}
