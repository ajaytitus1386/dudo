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

export const joinGameRoom = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    userName: string
) => {
    socket.emit("user_join_room", { roomName, userName })
}

export const leaveGameRoom = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    userName: string
) => {
    socket.emit("user_leave_room", { roomName, userName })
}

export const endGameRoom = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string
) => {
    socket.emit("end_room", { roomName })
}

export const readyUser = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    userName: string
) => {
    socket.emit("user_ready", { roomName, userName })
}

export const unreadyUser = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    userName: string
) => {
    socket.emit("user_unready", { roomName, userName })
}
