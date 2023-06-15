import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "constants/events/serverEventInterfaces"
import { hostname } from "os"
import { Socket } from "socket.io-client"

export const createGameRoom = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    hostName: string
) => {
    socket.emit("create_room", { roomName, hostName })
}
