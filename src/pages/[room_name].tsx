import React, { useEffect, useState } from "react"
import DiceTable from "../components/room/DiceTable"
import DicePicker from "../components/dice/DicePicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import RoomControls from "../components/room/RoomControls"

const Room = () => {
    const [isHigh, setIsHigh] = useState(true)

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
                .getElementById("table")
                .scrollIntoView({ behavior: "smooth", block: "start" })
        } else {
            document
                .getElementById("controls")
                .scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    return (
        <div className="relative flex min-h-screen h-[200vh] flex-col items-center justify-between">
            <button
                className="fixed bottom-4 right-8 bg-blue-500 rounded-full w-8 h-8"
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
                className="flex flex-col py-20 px-4 gap-y-2 min-h-screen"
            >
                <DiceTable />
                <DicePicker />
            </div>
            <div
                id="controls"
                className="flex flex-col py-16 min-h-screen w-full"
            >
                <RoomControls />
            </div>
        </div>
    )
}

export default Room
