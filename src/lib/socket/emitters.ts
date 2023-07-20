import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../../dudo_submodules/constants/serverEventInterfaces"
import { Socket } from "socket.io-client"
import { Bid } from "../../../dudo_submodules/models/game"
import { Message } from "../../../dudo_submodules/models/chat"

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

export const playerMakesChallenge = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    userName: string,
    roomName: string
) => {
    socket.emit("player_makes_challenge", { playerName: userName, roomName })
}

export const startNextRound = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string
) => {
    socket.emit("start_next_round", { roomName })
}

export const endGame = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    userName: string,
    roomName: string
) => {
    socket.emit("end_game", { hostName: userName, roomName })
}

/* ------------------------------- Chat Emits ------------------------------- */
export const sendMessage = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    roomName: string,
    message: Message
) => {
    socket.emit("send_chat_message", { roomName, message })
}
