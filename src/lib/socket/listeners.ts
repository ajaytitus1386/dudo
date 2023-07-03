import { NextRouter } from "next/router"
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../../dudo_submodules/constants/serverEventInterfaces"
import { Socket } from "socket.io-client"
import { toast } from "react-toastify"
import Room from "../../../dudo_submodules/models/room"
import Game from "../../../dudo_submodules/models/game"

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
    setRoom: React.Dispatch<React.SetStateAction<Room>>,
    setRoomName: (roomName: string) => void,
    username: string | null
) => {
    socket.on("start_room", ({ newRoom }) => {
        setRoom(newRoom)
        router.push(`/${newRoom.name}`)
    })

    socket.on("room_already_exists", () => {
        toast.error("Room already exists")
    })
    socket.on("room_does_not_exist", () => {
        toast.error("Room does not exist")
    })

    socket.on("host_ends_room", () => {
        setRoom({} as Room)
        router.push("/")
    })

    socket.on("user_joined_room", ({ user }) => {
        setRoom((prevRoom) => {
            return {
                ...prevRoom,
                roomUsers: [...prevRoom.roomUsers, user],
            }
        })
    })

    socket.on("user_left_room", ({ user }) => {
        setRoom((prevRoom) => {
            return {
                ...prevRoom,
                roomUsers: prevRoom.roomUsers.filter(
                    (roomUser) => roomUser.name !== user.name
                ),
            }
        })
    })

    socket.on("user_already_in_room", () => {
        toast.warning("User already in room")
    })

    socket.on("join_room_success", ({ room }) => {
        setRoom(room)
        router.push(`/${room.name}`)
    })

    socket.on("leave_room_success", () => {
        setRoom({} as Room)
        router.push("/")
    })

    socket.on("user_not_in_room", () => {
        toast.warning("User not in room")
    })

    /**
     * Listener for when current user readys self
     */
    socket.on("ready_success", () => {
        setRoom((prevRoom) => {
            return {
                ...prevRoom,
                roomUsers: prevRoom.roomUsers.map((roomUser) => {
                    if (roomUser.name === username) {
                        return {
                            ...roomUser,
                            isReady: true,
                        }
                    }
                    return roomUser
                }),
            }
        })
    })

    /**
     * Listener for when current user unreadys self
     */
    socket.on("unready_success", () => {
        setRoom((prevRoom) => {
            return {
                ...prevRoom,
                roomUsers: prevRoom.roomUsers.map((roomUser) => {
                    if (roomUser.name === username) {
                        return {
                            ...roomUser,
                            isReady: false,
                        }
                    }
                    return roomUser
                }),
            }
        })
    })

    /**
     * Listener for when another user readys up
     */
    socket.on("user_ready", ({ user }) => {
        setRoom((prevRoom) => {
            return {
                ...prevRoom,
                roomUsers: prevRoom.roomUsers.map((roomUser) => {
                    if (roomUser.name === user.name) {
                        return {
                            ...roomUser,
                            isReady: true,
                        }
                    }
                    return roomUser
                }),
            }
        })
    })

    /**
     * Listener for when another user unreadys
     */
    socket.on("user_unready", ({ user }) => {
        setRoom((prevRoom) => {
            return {
                ...prevRoom,
                roomUsers: prevRoom.roomUsers.map((roomUser) => {
                    if (roomUser.name === user.name) {
                        return {
                            ...roomUser,
                            isReady: false,
                        }
                    }
                    return roomUser
                }),
            }
        })
    })
}

export const addGameEventListeners = (
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    setRoom: React.Dispatch<React.SetStateAction<Room>>,
    setGame: React.Dispatch<React.SetStateAction<Game>>,
    setCurrentHand: React.Dispatch<React.SetStateAction<number[]>>,
    username: string | null
) => {
    socket.on("host_starts_game", ({ game, room }) => {
        // roomState has changed to "game" from "lobby"
        setRoom(room)
        // Iniitialized game state
        setGame(game)
    })

    socket.on("deal_player_hand", ({ hand }) => {
        setCurrentHand(hand)
    })

    socket.on("player_bid_made", ({ bid }) => {
        setGame((prevGame) => {
            return {
                ...prevGame,
                currentRound: {
                    ...prevGame.currentRound,
                    bids: [...prevGame.currentRound.bids, bid],
                },
            }
        })
    })

    socket.on("next_player_turn", ({ playerId }) => {
        setGame((prevGame) => {
            return {
                ...prevGame,
                currentRound: {
                    ...prevGame.currentRound,
                    currentPlayerTurn: playerId,
                },
            }
        })
    })
}
