import React, { useState } from "react"
import Hug from "../Hug"
import {
    faCircleInfo,
    faGear,
    faLink,
    faMessage,
    faRightFromBracket,
    faUsers,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MessageList from "../chat/MessageList"
import MessageInput from "../chat/MessageInput"
import Button from "../Button"
import HowToPlay from "../content/HowToPlay"
import Username from "../Username"
import { useRoomContext } from "context/roomContext"
import { endGameRoom, leaveGameRoom } from "lib/socket/emitters"
import { useSocketContext } from "context/socketContext"
import { useAppContext } from "context/appContext"

const tabs = [
    {
        label: "Information",
        name: "info",
        tooltip: "Room Info",
        icon: faCircleInfo,
    },
    {
        label: "Players",
        name: "players",
        tooltip: "Players",
        icon: faUsers,
    },
    {
        label: "Chat",
        name: "chat",
        tooltip: "Chat",
        icon: faMessage,
    },
    {
        label: "Settings",
        name: "settings",
        tooltip: "Room Settings",
        icon: faGear,
    },
    {
        label: "Leave",
        name: "leave",
        tooltip: "Leave Room",
        icon: faRightFromBracket,
    },
]

const RoomControlHug = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => (
    <Hug
        className={["flex flex-col justify-between w-full", className].join(
            " "
        )}
    >
        {children}
    </Hug>
)

const TableRow = ({
    children,
    index,
}: {
    children: React.ReactNode
    index: number
}) =>
    index % 2 !== 0 ? (
        <tr className="bg-background-light-100 dark:bg-background-dark-100 text-text-light-500 dark:text-text-dark-500">
            {children}
        </tr>
    ) : (
        <tr className="bg-background-light-300 dark:bg-background-dark-300 text-text-light-500 dark:text-text-dark-500">
            {children}
        </tr>
    )

const TableHeadCell = ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-2">{children}</th>
)

const TableCell = ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2">{children}</td>
)

const RoomControls = () => {
    const [selectedTab, setSelectedTab] = useState(0)

    const { room } = useRoomContext()
    const { socket } = useSocketContext()
    const { username } = useAppContext()

    const onLeaveRoom = () => {
        if (!socket || !username) return

        leaveGameRoom(socket, room.name, username)
    }

    const onEndRoom = () => {
        if (!socket || !username) return

        endGameRoom(socket, room.name)
    }

    const changeTab = (index: number) => setSelectedTab(index)

    return (
        <div className="flex flex-col w-full h-full gap-y-2">
            {/* tabs - Full Width */}
            <div className="flex items-center justify-center bg-background-light-200 dark:bg-background-dark-200 md:mx-4 md:rounded-lg">
                {tabs.map((tab, index) => (
                    <div
                        key={`tab_${tab.name}`}
                        className={`flex items-center justify-center w-full py-2 px-4 border-gray-400 dark:border-gray-600 ${
                            index < tabs.length - 1 && "border-r-2"
                        } ${
                            selectedTab === index &&
                            "bg-gray-400 dark:bg-gray-600"
                        } ${
                            selectedTab === index &&
                            index === 0 &&
                            "rounded-l-lg"
                        } ${
                            selectedTab === index &&
                            index === tabs.length - 1 &&
                            "rounded-r-lg"
                        }`}
                        onClick={() => changeTab(index)}
                    >
                        <FontAwesomeIcon
                            icon={tab.icon}
                            className="text-text-light-500 dark:text-text-dark-500"
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-y-2 px-4 py-2 h-full md:py-0">
                <Hug className="flex flex-row items-center justify-center gap-x-2">
                    <h2 className="text-text-light-500 dark:text-text-dark-500 font-bold">
                        Room Name:
                    </h2>
                    <text className="text-text-light-500 dark:text-text-dark-500 select-all">
                        {room.name || "Room Name"}
                    </text>
                    <button>
                        <FontAwesomeIcon
                            icon={faLink}
                            className="text-text-light-500 dark:text-text-dark-500 text-lg"
                        />
                    </button>
                </Hug>
                {/* Info */}
                {selectedTab === 0 && (
                    <RoomControlHug className="h-auto flex flex-col gap-y-2 overflow-y-auto">
                        <HowToPlay />
                    </RoomControlHug>
                )}
                {/* Players */}
                {selectedTab === 1 && (
                    <RoomControlHug>
                        <table className="w-full">
                            <thead className="text-text-light-400 dark:text-text-dark-200 bg-background-light-100 dark:bg-background-dark-100 uppercase text-left border-b border-background-light-500 dark:border-background-dark-500">
                                <tr>
                                    <TableHeadCell>Player</TableHeadCell>
                                    <TableHeadCell>Win</TableHeadCell>
                                    <TableHeadCell>Loss</TableHeadCell>
                                </tr>
                            </thead>
                            <tbody>
                                {room.players &&
                                    room.players.map((player, index) => (
                                        <TableRow
                                            key={player.name}
                                            index={index}
                                        >
                                            <TableCell>
                                                <Username
                                                    username={player.name}
                                                />
                                            </TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell>0</TableCell>
                                        </TableRow>
                                    ))}
                            </tbody>
                        </table>
                    </RoomControlHug>
                )}
                {/* Chat */}
                {selectedTab === 2 && (
                    <RoomControlHug className="h-full max-h-[90%]">
                        <MessageList />
                        <MessageInput />
                    </RoomControlHug>
                )}
                {/* Settings */}
                {selectedTab === 3 && (
                    <RoomControlHug>
                        <h1 className="m-auto text-text-light-500 dark:text-text-dark-500">
                            Room Settings
                        </h1>
                    </RoomControlHug>
                )}
                {/* Exit */}
                {selectedTab === 4 && (
                    <RoomControlHug className="gap-4">
                        <Button
                            onClick={onLeaveRoom}
                            className="w-full text-text-light-100 dark:text-text-dark-500"
                        >
                            Leave Room
                        </Button>

                        <Button
                            onClick={onEndRoom}
                            className="w-full text-text-light-100 dark:text-text-dark-500 bg-red-500 hover:bg-red-600 focus:bg-red-700"
                        >
                            End Room
                        </Button>
                    </RoomControlHug>
                )}
            </div>
        </div>
    )
}

export default RoomControls
