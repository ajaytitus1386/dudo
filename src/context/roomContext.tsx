import { createContext, useContext, useEffect, useState } from "react"
import Room from "../../dudo_submodules/models/room"

const RoomContext = createContext({
    room: {
        name: "",
        host: {},
        id: "",
        players: [{}],
        roomState: "lobby",
    } as Room,
    setRoom: (() => {}) as React.Dispatch<React.SetStateAction<Room>>,
    setRoomName: (name: string) => {},
})

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const [room, setRoom] = useState({} as Room)

    const setRoomName = (name: string) => {
        setRoom((prevRoom) => {
            return { ...prevRoom, name }
        })
    }

    useEffect(() => {
        console.log(room)
    }, [room])

    return (
        <RoomContext.Provider value={{ room, setRoom, setRoomName }}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoomContext = () => {
    return useContext(RoomContext)
}
