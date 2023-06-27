import React, { useState } from "react"
import Hug from "../Hug"
import {
    faCircleInfo,
    faCrown,
    faEllipsisVertical,
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
import Tooltip from "components/Tooltip"

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
    <Hug className={["flex flex-col w-full", className].join(" ")}>
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

const TableHeadCell = ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-2">{children}</th>
)

const TableCell = ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2">{children}</td>
)

const RoomControls = () => {
    const [selectedTab, setSelectedTab] = useState(0)

    const defaultRoomLinkTooltipMessage = "Copy Room Link"
    const [roomLinkTooltipMessage, setRoomLinkTooltipMessage] = useState(
        defaultRoomLinkTooltipMessage
    )

    const onCopyRoomLink = () => {
        if (!navigator.clipboard) return

        navigator.clipboard.writeText(window.location.href)
        setRoomLinkTooltipMessage("Copied Link!")

        setTimeout(() => {
            setRoomLinkTooltipMessage(defaultRoomLinkTooltipMessage)
        }, 2000)
    }

    const { room, isHost } = useRoomContext()
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
            <div className="flex items-center justify-center cursor-pointer bg-background-light-200 dark:bg-background-dark-200 md:mx-4 md:rounded-lg">
                {tabs.map((tab, index) => (
                    <div
                        key={`tab_${tab.name}`}
                        className={`flex items-center justify-center w-full py-2 px-4 border-gray-400 dark:border-gray-600 hover:bg-gray-400 hover:dark:bg-gray-600 ${
                            index < tabs.length - 1 && "border-r-2"
                        } ${
                            selectedTab === index &&
                            "bg-gray-400 dark:bg-gray-600"
                        } ${index === 0 && "md:rounded-l-lg"} ${
                            index === tabs.length - 1 && "md:rounded-r-lg"
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
            <div className="flex flex-col gap-y-2 px-4 py-2 h-full max-h-full md:py-0">
                {/* Info */}
                {selectedTab === 0 && (
                    <RoomControlHug className="flex flex-col gap-y-2 overflow-y-auto">
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
                                    <TableHeadCell />
                                </tr>
                            </thead>
                            <tbody>
                                {room.roomUsers &&
                                    room.roomUsers.map((roomUser, index) => (
                                        <TableRow
                                            key={roomUser.name}
                                            index={index}
                                        >
                                            <TableCell>
                                                <Username
                                                    username={roomUser.name}
                                                />
                                            </TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell>
                                                {roomUser.name ===
                                                room.host?.name ? (
                                                    <FontAwesomeIcon
                                                        icon={faCrown}
                                                        className="m-auto w-full"
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faEllipsisVertical
                                                        }
                                                        className="m-auto w-full"
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </tbody>
                        </table>
                    </RoomControlHug>
                )}
                {/* Chat */}
                {selectedTab === 2 && (
                    <>
                        <Hug className="flex flex-col gap-y-1 h-full max-h-full overflow-y-auto md:h-[60vh]">
                            <MessageList />
                        </Hug>
                        <Hug>
                            <MessageInput />
                        </Hug>
                    </>
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
                    <RoomControlHug className="gap-4 py-4">
                        <Button
                            onClick={onLeaveRoom}
                            className="text-text-light-100 dark:text-text-dark-500"
                        >
                            Leave Room
                        </Button>

                        {isHost && (
                            <Button
                                onClick={onEndRoom}
                                variant="none"
                                className="text-text-light-100 dark:text-text-dark-500 bg-red-500 hover:bg-red-600 focus:bg-red-700"
                            >
                                End Room
                            </Button>
                        )}
                    </RoomControlHug>
                )}
            </div>
        </div>
    )
}

export default RoomControls
