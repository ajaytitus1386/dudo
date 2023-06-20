import { NextRouter } from "next/router"
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../../dudo_submodules/constants/serverEventInterfaces"
import { Socket } from "socket.io-client"
import { toast } from "react-toastify"

export const addSocketListeners = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
) => {
    socket.on("connect", () => {
        console.log("connected")
    })

    socket.on("disconnect", () => {
        console.log("disconnected")
    })

    socket.on("connect_error", (error: any) => {
        console.log("connect_error", error)
    })
}

export const addRoomEventListeners = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    router: NextRouter,
    setRoomName: (roomName: string) => void
) => {
    socket.on("start_room", ({ newRoom }) => {
        setRoomName(newRoom.name)
        router.push(`/${newRoom.name}`)
    })

    socket.on("room_already_exists", () => {
        toast.error("Room already exists")
    })
}
