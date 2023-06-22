import { NextRouter } from "next/router"
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../../dudo_submodules/constants/serverEventInterfaces"
import { Socket } from "socket.io-client"
import { toast } from "react-toastify"
import Room from "../../../dudo_submodules/models/room"

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
                players: [...prevRoom.players, user],
            }
        })
    })

    socket.on("user_left_room", ({ user }) => {
        setRoom((prevRoom) => {
            return {
                ...prevRoom,
                players: prevRoom.players.filter(
                    (player) => player.name !== user.name
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
                players: prevRoom.players.map((player) => {
                    if (player.name === username) {
                        return {
                            ...player,
                            isReady: true,
                        }
                    }
                    return player
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
                players: prevRoom.players.map((player) => {
                    if (player.name === username) {
                        return {
                            ...player,
                            isReady: false,
                        }
                    }
                    return player
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
                players: prevRoom.players.map((player) => {
                    if (player.name === user.name) {
                        return {
                            ...player,
                            isReady: true,
                        }
                    }
                    return player
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
                players: prevRoom.players.map((player) => {
                    if (player.name === user.name) {
                        return {
                            ...player,
                            isReady: false,
                        }
                    }
                    return player
                }),
            }
        })
    })
}
