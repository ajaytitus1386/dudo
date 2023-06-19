import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../../dudo_submodules/constants/serverEventInterfaces"
import { Socket } from "socket.io-client"

export const createGameRoom = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    hostName: string
) => {
    socket.emit("create_room", { roomName, hostName })
}
