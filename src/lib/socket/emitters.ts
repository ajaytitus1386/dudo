import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../../dudo_submodules/constants/serverEventInterfaces"
import { Socket } from "socket.io-client"
import { Bid } from "../../../dudo_submodules/models/game"

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

export const startNewGame = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    hostName: string,
    roomName: string
) => {
    socket.emit("start_game", { hostName, roomName })
}

export const playerMakesBid = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    bid: Bid
) => {
    socket.emit("player_makes_bid", { bid, roomName })
}
