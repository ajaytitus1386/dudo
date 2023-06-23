import { createContext, useContext, useEffect, useState } from "react"
import Room from "../../dudo_submodules/models/room"
import { useAppContext } from "./appContext"

const RoomContext = createContext({
    room: {
        name: "",
        host: {},
        id: "",
        roomUsers: [{}],
        roomState: "lobby",
    } as Room,
    setRoom: (() => {}) as React.Dispatch<React.SetStateAction<Room>>,
    setRoomName: (name: string) => {},
    isHost: false,
})

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const { username } = useAppContext()
    const [room, setRoom] = useState({} as Room)
    const isHost = room.host?.name === username

    const setRoomName = (name: string) => {
        setRoom((prevRoom) => {
            return { ...prevRoom, name }
        })
    }

    useEffect(() => {
        console.log(room)
    }, [room])

    return (
        <RoomContext.Provider value={{ room, setRoom, setRoomName, isHost }}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoomContext = () => {
    return useContext(RoomContext)
}
