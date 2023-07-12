import React, { useEffect, useState } from "react"
import Hug from "../Hug"
import Input from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { useAppContext } from "context/appContext"
import { useRoomContext } from "context/roomContext"
import { useSocketContext } from "context/socketContext"
import { createGameRoom, joinGameRoom } from "lib/socket/emitters"
import { fetchRandomRoomName } from "lib/services/roomName"
import { toast } from "react-toastify"

const RoomTypeTab = ({
    label,
    isSelected,
    animateLeft = true,
    onClick,
}: {
    label: string
    isSelected: boolean
    animateLeft?: boolean
    onClick: () => void
}) => {
    return (
        <h2
            onClick={onClick}
            className={` cursor-pointer relative font-bold ${
                isSelected ? "opacity-100" : "opacity-50"
            } hover:opacity-100 
            after:content-[''] ${
                isSelected ? "after:w-full" : "after:w-0"
            } after:h-[4px] after:bg-primary-light-400 after:dark:bg-primary-light-200 after:absolute
            text-text-light-500 dark:text-text-dark-500
            after:bottom-0 after:transition-all after:duration-300 after:hover:w-full ${
                animateLeft ? "after:left-0" : "after:right-0"
            }`}
        >
            {label}
        </h2>
    )
}

const RoomDialogBox = () => {
    const { username, setUsername } = useAppContext()
    const { room, setRoom } = useRoomContext()
    const { socket } = useSocketContext()

    const defaultErrors = {
        username: "",
        roomName: "",
    }
    const [errors, setErrors] = useState(defaultErrors)

    const usernameInputRef = React.useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!usernameInputRef.current) return
        usernameInputRef.current.focus()
    }, [])

    const tabs = ["join_game", "create_game"]
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const isJoinGame = selectedTab === tabs[0]

    const changeTab = (tab: string) => {
        setSelectedTab(tab)
        if (!usernameInputRef.current) return
        usernameInputRef.current.focus()
    }

    const validateForm = () => {
        if (!username || !room.name) {
            setErrors({
                username: !username ? "Username is required" : "",
                roomName: !room.name ? "Room name is required" : "",
            })
            return false
        }

        const uriRoomName = encodeURIComponent(room.name)
        if (uriRoomName !== room.name) {
            setErrors((errors) => ({
                ...errors,
                roomName: "Room name cannot contain special characters",
            }))
            return false
        }

        setErrors(defaultErrors)

        return (
            username && room.name && username.length > 0 && room.name.length > 0
        )
    }

    const handleJoinGame = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return
        if (!socket) return

        joinGameRoom(socket, room.name!, username!)
    }

    const handleCreateGame = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return
        if (!socket) return

        createGameRoom(socket, room.name!, username!)
    }

    const handleGetRandomRoomName = async () => {
        const time = new Date().getTime()
        const randomName = await fetchRandomRoomName({
            seed: username + "_" + time.toString() || undefined,
        })
        if (!randomName) {
            toast.error(
                "Sorry, we couldn't generate a random room name. Try again later!"
            )
            return
        }
        setRoom({ ...room, name: randomName })
    }

    return (
        <Hug className="flex flex-col gap-4 w-[400px] px-8 py-8 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <div className="flex flex-row gap-4 justify-center items-center">
                <RoomTypeTab
                    label="Join Game"
                    isSelected={isJoinGame}
                    animateLeft={false}
                    onClick={() => changeTab(tabs[0])}
                />
                <RoomTypeTab
                    label="Create Game"
                    isSelected={!isJoinGame}
                    onClick={() => changeTab(tabs[1])}
                />
            </div>
            <form
                onSubmit={isJoinGame ? handleJoinGame : handleCreateGame}
                className="flex flex-col gap-2 justify-center items-center"
            >
                <h3 className="text-center text-gray-400 text-sm mb-4">
                    {isJoinGame
                        ? "Join an existing room with your friends"
                        : "Create a new room and invite your friends"}
                </h3>

                <Input
                    value={username || ""}
                    ref={usernameInputRef}
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors.username}
                />

                <Input
                    value={room.name || ""}
                    type="text"
                    placeholder={isJoinGame ? "Room Name" : "New Room Name"}
                    onChange={(e) => setRoom({ ...room, name: e.target.value })}
                    RightElement={
                        !isJoinGame && (
                            <FontAwesomeIcon
                                type="button"
                                className="cursor-pointer text-text-light-500 dark:text-text-dark-500 hover:rotate-180 transition-transform"
                                icon={faArrowsRotate}
                                onClick={handleGetRandomRoomName}
                            />
                        )
                    }
                    error={errors.roomName}
                />

                <button
                    type="submit"
                    className="px-4 py-2 button-primary-gradient button-gradient-ltr rounded-md text-white font-medium w-full"
                >
                    {isJoinGame ? "Join" : "Create"}
                </button>
            </form>
        </Hug>
    )
}

export default RoomDialogBox
