import React, { useState } from "react"
import Hug from "../Hug"
import Input from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { useAppContext } from "context/appContext"
import { useRoomContext } from "context/roomContext"
import { useRouter } from "next/router"

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
    const { roomName, setRoomName } = useRoomContext()

    const router = useRouter()

    const tabs = ["join_game", "create_game"]
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const isJoinGame = selectedTab === tabs[0]

    const changeTab = (tab: string) => {
        setSelectedTab(tab)
    }

    const handleJoinGame = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/${roomName}`)
    }

    const handleCreateGame = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/${roomName}`)
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
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    value={roomName || ""}
                    type="text"
                    placeholder={isJoinGame ? "Room Name" : "New Room Name"}
                    onChange={(e) => setRoomName(e.target.value)}
                    RightElement={
                        !isJoinGame && (
                            <FontAwesomeIcon
                                className="cursor-pointer text-text-light-500 dark:text-text-dark-500 hover:rotate-180 transition-transform"
                                icon={faArrowsRotate}
                            />
                        )
                    }
                />

                <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-l from-primary-light-200 to-80% to-primary-light-300 bg-[length:200%_200%] hover:bg-right transition-all duration-500 rounded-md text-white font-medium w-full"
                >
                    {isJoinGame ? "Join" : "Create"}
                </button>
            </form>
        </Hug>
    )
}

export default RoomDialogBox
