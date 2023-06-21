import React, { useEffect, useState } from "react"
import DiceTable from "../components/room/DiceTable"
import DicePicker from "../components/dice/DicePicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import RoomControls from "../components/room/RoomControls"
import DiceList from "components/dice/DiceList"
import DiceInputWrapper from "components/dice/DiceInputWrapper"
import { useRouter } from "next/router"
import { useRoomContext } from "context/roomContext"
import { useAppContext } from "context/appContext"

const Room = () => {
    const { room, setRoomName } = useRoomContext()
    const { username } = useAppContext()

    const [isHigh, setIsHigh] = useState(true)
    const [showDiceList, setShowDiceList] = useState(true)

    const router = useRouter()
    const roomNameInPath = router.asPath.split("/").slice(-1)[0]
    useEffect(() => {
        // If roomName is not set, set it to the roomName in the path (so it auto-fills the room name field)
        if (!room.name && roomNameInPath !== "[room_name]")
            setRoomName(roomNameInPath)

        // If username is not set, redirect to home
        if (!username) router.push("/")
    }, [room.name, roomNameInPath, router, setRoomName, username])

    const onScroll = () => {
        if (!window) return

        const position = window.scrollY
        if (position > 0) setIsHigh(false)
        else setIsHigh(true)
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    const toggleView = () => {
        if (!document) return null

        if (
            !document.getElementById("table") ||
            !document.getElementById("controls")
        )
            return null

        setIsHigh((prev) => !prev)

        if (!isHigh) {
            document
                .getElementById("table")!
                .scrollIntoView({ behavior: "smooth", block: "start" })
        } else {
            document
                .getElementById("controls")!
                .scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    return (
        <div className="relative flex items-center justify-between min-h-screen h-[200vh] flex-col md:min-h-0 md:h-screen md:flex-row lg:px-16 xl:px-[10%]">
            <button
                className="fixed bottom-4 right-8 bg-blue-500 rounded-full w-8 h-8 md:hidden"
                onClick={toggleView}
            >
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-white ${
                        !isHigh && "rotate-180"
                    } transition-transform duration-300`}
                />
            </button>
            <div
                id="table"
                className="flex flex-col pt-20 pb-4 px-4 gap-y-2 h-screen min-h-screen md:w-1/2 md:gap-y-8"
            >
                <DiceTable />
                <DiceInputWrapper
                    showList={showDiceList}
                    setShowList={setShowDiceList}
                >
                    {showDiceList ? <DiceList /> : <DicePicker />}
                </DiceInputWrapper>
            </div>
            <div
                id="controls"
                className="flex flex-col py-16 min-h-screen w-full md:w-1/2 md:pt-20 md:pb-4 md:h-full"
            >
                <RoomControls />
            </div>
        </div>
    )
}

export default Room
