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
    faVolumeHigh,
    faVolumeLow,
    faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MessageList from "../chat/MessageList"
import MessageInput from "../chat/MessageInput"
import Button from "../Button"
import HowToPlay from "../content/HowToPlay"
import Username from "../Username"
import { useRoomContext } from "context/roomContext"
import {
    endGameRoom,
    leaveGameRoom,
    setOptionalRules,
} from "lib/socket/emitters"
import { useSocketContext } from "context/socketContext"
import { useAppContext } from "context/appContext"
import Tooltip from "components/Tooltip"
import { useGameContext } from "context/gameContext"
import Toggle from "components/Toggle"
import Credit from "components/content/Credit"
import DiceOne from "components/icons/D6/DiceOne"
import DiceSix from "components/icons/D6/DiceSix"
import { useChatContext } from "context/chatContext"
import { useSoundContext } from "context/soundContext"
import Slider from "components/Slider"

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

/* ----------------------------- Sub Components ----------------------------- */

const RoomControlHug = ({
    children,
    className,
    id,
}: {
    children: React.ReactNode
    className?: string
    id?: string
}) => (
    <Hug id={id} className={["flex flex-col w-full", className].join(" ")}>
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

const Divider: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={[
            className,
            "border-b border-background-light-500 dark:border-background-dark-500",
        ].join(" ")}
    />
)

const RoomSettings = ({
    goToOptionalRules,
}: {
    goToOptionalRules: () => void
}) => {
    const { room, setRoom, isHost } = useRoomContext()
    const { socket } = useSocketContext()
    const { setVolume, toggleMute, mute, volume } = useSoundContext()

    // Aces are wild
    const acesAreWild = room?.rules?.acesAreWild || false
    const setAcesAreWild = (value: boolean) => {
        if (!socket) return

        setRoom((prev) => ({
            ...prev,
            rules: {
                ...prev.rules,
                acesAreWild: value,
            },
        }))
        setOptionalRules(socket, room.name, {
            acesAreWild: value,
            winRoundDropDie: room.rules.winRoundDropDie,
        })
    }
    // Win a round, drop a die
    const wardad = room?.rules?.winRoundDropDie || false
    const setWardad = (value: boolean) => {
        if (!socket) return

        setRoom((prev) => ({
            ...prev,
            rules: {
                ...prev.rules,
                winRoundDropDie: value,
            },
        }))
        setOptionalRules(socket, room.name, {
            acesAreWild: room.rules.acesAreWild,
            winRoundDropDie: value,
        })
    }

    const disableRules = !isHost || room.roomState !== "lobby"

    const toggleAcesAreWild = () => {
        setAcesAreWild(!room.rules.acesAreWild)
    }

    const toggleWardad = () => setWardad(!room.rules.winRoundDropDie)

    // Your Settings
    const [volumeSliderFocused, setVolumeSliderFocused] = useState(false)

    return (
        <RoomControlHug className="py-4 gap-y-2 px-1 md:px-8">
            <h1 className="text-xl font-bold m-auto text-text-light-500 dark:text-text-dark-500">
                Settings
            </h1>
            <div className="grid grid-cols-[3fr_1fr] gap-y-1">
                <h2 className="col-span-2 text-lg font-medium text-text-light-500 dark:text-text-dark-500">
                    <FontAwesomeIcon icon={faCrown} className="mr-1" />
                    Optional Game Rules
                </h2>
                <sub
                    onClick={goToOptionalRules}
                    className="col-span-2 mb-1 w-fit text-left text-sm italic text-text-light-300 dark:text-text-dark-300 cursor-pointer"
                >
                    More about <u>Optional Rules</u>
                </sub>

                <label
                    className={
                        "mr-3 text-text-light-500 dark:text-text-dark-500"
                    }
                >
                    Aces are wild
                </label>
                <Toggle
                    checked={acesAreWild}
                    onToggle={toggleAcesAreWild}
                    disabled={disableRules}
                />
                <label
                    className={
                        "mr-3 text-text-light-500 dark:text-text-dark-500"
                    }
                >
                    Win a Round, Drop a Die
                </label>
                <Toggle
                    checked={wardad}
                    onToggle={toggleWardad}
                    disabled={disableRules}
                />

                <sub className="col-span-2 mb-1 w-fit text-left text-sm italic text-text-light-300 dark:text-text-dark-300">
                    Only the host can change these rules before the game starts
                </sub>
            </div>
            <Divider />
            <h2 className="text-lg font-medium text-text-light-500 dark:text-text-dark-500">
                Your Options
            </h2>
            <div className="flex gap-x-2 justify-start items-center">
                <button type="button" onClick={() => toggleMute()}>
                    <FontAwesomeIcon
                        icon={
                            mute || volume === 0
                                ? faVolumeXmark
                                : volume > 50
                                ? faVolumeHigh
                                : faVolumeLow
                        }
                        className="text-text-light-500 dark:text-text-dark-500 text-lg w-12"
                    />
                </button>
                <Slider
                    value={volume}
                    setValue={setVolume}
                    min={0}
                    max={100}
                    valueProgess={volume}
                    sliderFocused={volumeSliderFocused}
                    setSliderFocused={setVolumeSliderFocused}
                    valueLabel={String(volume)}
                />
            </div>
        </RoomControlHug>
    )
}

/* ---------------------------- Parent Component ---------------------------- */
const RoomControls = () => {
    const { room, isHost, resetRoomContext } = useRoomContext()
    const { socket } = useSocketContext()
    const { username } = useAppContext()
    const { game, resetGameContext } = useGameContext()
    const { messages, latestTimestampViewed, resetChatContext } =
        useChatContext()

    /* --------------------------- Stateful Variables --------------------------- */
    const [selectedTab, setSelectedTab] = useState(0)

    const defaultRoomLinkTooltipMessage = "Copy Room Link"
    const [roomLinkTooltipMessage, setRoomLinkTooltipMessage] = useState(
        defaultRoomLinkTooltipMessage
    )

    /* ------------------------- Functions and Handlers ------------------------- */

    const onCopyRoomLink = () => {
        if (!navigator.clipboard) return

        navigator.clipboard.writeText(window.location.href)
        setRoomLinkTooltipMessage("Copied Link!")

        setTimeout(() => {
            setRoomLinkTooltipMessage(defaultRoomLinkTooltipMessage)
        }, 2000)
    }

    const resetContexts = () => {
        resetChatContext()
        resetGameContext()
        resetRoomContext()
    }

    const onLeaveRoom = () => {
        if (!socket || !username) return

        resetContexts()
        leaveGameRoom(socket, room.name, username)
    }

    const onEndRoom = () => {
        if (!socket || !username) return

        resetContexts()
        endGameRoom(socket, room.name)
    }

    const changeTab = (index: number) => setSelectedTab(index)

    const goToSettings = () => setSelectedTab(3)

    const goToOptionalRules = () => {
        setSelectedTab(0)
        //TODO: Scroll to Optional Rules
        // const infoElement = document.getElementById("info")
        // const optionalRulesElement = document.getElementById("optional_rules")

        // if (!infoElement || !optionalRulesElement) return

        // infoElement.scrollTo({
        //     top: optionalRulesElement.offsetTop,
        //     behavior: "smooth",
        // })
    }

    return (
        <div className="flex flex-col w-full h-full gap-y-2">
            {/* tabs - Full Width */}
            <div className="flex items-center justify-center cursor-pointer bg-background-light-200 dark:bg-background-dark-200 md:mx-4 md:rounded-lg">
                {tabs.map((tab, index) => (
                    <div
                        key={`tab_${tab.name}`}
                        className={`flex items-center justify-center w-full py-1 px-2 border-gray-400 dark:border-gray-600 hover:bg-gray-400 hover:dark:bg-gray-600 ${
                            index < tabs.length - 1 && "border-r-2"
                        } ${
                            selectedTab === index &&
                            "bg-gray-400 dark:bg-gray-600"
                        } ${index === 0 && "md:rounded-l-lg"} ${
                            index === tabs.length - 1 && "md:rounded-r-lg"
                        }`}
                        onClick={() => changeTab(index)}
                    >
                        <div className="relative">
                            <FontAwesomeIcon
                                icon={tab.icon}
                                className={[
                                    "text-text-light-500 dark:text-text-dark-500",
                                    // For messages tab, show if unread messages
                                ].join(" ")}
                            />
                            {index == 2 &&
                                messages.length > 0 &&
                                latestTimestampViewed <
                                    messages[messages.length - 1].timestamp && (
                                    <div className="absolute animate-pulse -right-1 top-0 w-2 h-2 bg-negative-light dark:bg-negative-dark rounded-full" />
                                )}
                        </div>
                    </div>
                ))}
            </div>
            {/* overflow-hidden prevents the chat elements from overflowing the full height */}
            <div className="flex flex-col gap-y-2 px-4 py-2 h-full max-h-full md:py-0 overflow-hidden">
                <Hug className="flex justify-center items-center text-text-light-500 dark:text-text-dark-500">
                    <h2 className="whitespace-nowrap">Room Name:</h2>
                    <h3 className="select-all px-2 underline">
                        {room.name || "room_name"}
                    </h3>
                    <Tooltip tooltipContent={roomLinkTooltipMessage}>
                        <button type="button" onClick={onCopyRoomLink}>
                            <FontAwesomeIcon icon={faLink} />
                        </button>
                    </Tooltip>
                </Hug>
                {/* Info */}
                {selectedTab === 0 && (
                    <RoomControlHug
                        id="info"
                        className="flex flex-col gap-y-1 overflow-y-auto"
                    >
                        <HowToPlay />
                        <h2
                            id="optional_rules"
                            className="text-center text-lg font-bold text-text-light-500 dark:text-text-dark-500"
                        >
                            Optional Rules
                        </h2>
                        <sub
                            onClick={goToSettings}
                            className="text-center text-sm italic text-text-light-300 dark:text-text-dark-300 cursor-pointer"
                        >
                            Choose these options from <u>Room Settings</u>
                        </sub>
                        <ul className="list-disc px-4 text-text-light-500 dark:text-text-dark-500">
                            <li>
                                <b>Aces are wild</b>:{" "}
                                <DiceOne className="w-5 h-5 inline-block" />
                                &lsquo;s count for any face. So for example: 3{" "}
                                <DiceSix className="w-5 h-5 inline-block" /> and
                                2 <DiceOne className="w-5 h-5 inline-block" />{" "}
                                sum up to 5{" "}
                                <DiceSix className="w-5 h-5 inline-block" /> in
                                total.
                            </li>
                            <li>
                                <b>Win a round, drop a die</b>: The Winner of a
                                round removes 1 die from their set of dice. The
                                first Player to reach 0 dice wins the game.
                            </li>
                        </ul>
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
                                    room.roomUsers.map((roomUser, index) => {
                                        const playerStat =
                                            game?.playerStats?.find(
                                                (playerStat) =>
                                                    playerStat.name ===
                                                    roomUser.name
                                            )

                                        return (
                                            <TableRow
                                                key={roomUser.name}
                                                index={index}
                                            >
                                                <TableCell>
                                                    <Username
                                                        username={roomUser.name}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {playerStat?.wins || 0}
                                                </TableCell>
                                                <TableCell>
                                                    {playerStat?.losses || 0}
                                                </TableCell>
                                                <TableCell>
                                                    {roomUser.name ===
                                                        room.host?.name && (
                                                        <FontAwesomeIcon
                                                            icon={faCrown}
                                                            className="m-auto w-full text-primary-light-300 dark:text-text-dark-500"
                                                        />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </RoomControlHug>
                )}
                {/* Chat */}
                {selectedTab === 2 && (
                    <>
                        <MessageList />

                        <Hug>
                            <MessageInput />
                        </Hug>
                    </>
                )}
                {/* Settings */}
                {selectedTab === 3 && (
                    <RoomSettings goToOptionalRules={goToOptionalRules} />
                )}
                {/* Exit */}
                {selectedTab === 4 && (
                    <RoomControlHug className="gap-4 py-4">
                        <Button
                            onClick={onLeaveRoom}
                            className="text-text-light-100 dark:text-text-dark-500 button-primary-gradient button-gradient-ltr"
                        >
                            Leave Room
                        </Button>

                        {isHost && (
                            <Button
                                onClick={onEndRoom}
                                variant="none"
                                className="text-text-light-100 dark:text-text-dark-500 from-red-700 to-red-600 button-gradient-ltr"
                            >
                                End Room
                            </Button>
                        )}

                        <h2 className="text-center text-lg text-text-light-500 dark:text-text-dark-500">
                            Thanks for playing!
                        </h2>
                        <div className="flex flex-col gap-y-1 justify-center items-center">
                            <Credit />
                        </div>
                    </RoomControlHug>
                )}
            </div>
        </div>
    )
}

export default RoomControls
