import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../../dudo_submodules/constants/serverEventInterfaces"
import { Socket } from "socket.io-client"

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
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
) => {
    socket.on("start_room", ({ newRoom }) => {
        console.log(newRoom)
    })
}
