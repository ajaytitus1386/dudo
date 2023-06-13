import React, { useEffect, useState } from "react"
import DiceTable from "../components/room/DiceTable"
import DicePicker from "../components/dice/DicePicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faLink } from "@fortawesome/free-solid-svg-icons"
import RoomControls from "../components/room/RoomControls"
import DiceList from "components/dice/DiceList"
import DiceInputWrapper from "components/dice/DiceInputWrapper"
import Hug from "components/Hug"

const Room = () => {
    const [isHigh, setIsHigh] = useState(true)
    const [showDiceList, setShowDiceList] = useState(true)

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
                <Hug className="flex flex-row items-center justify-center gap-x-2">
                    <h2 className="text-text-light-500 dark:text-text-dark-500 font-bold">
                        Room Name:
                    </h2>
                    <text className="text-text-light-500 dark:text-text-dark-500 select-all">
                        room_name
                    </text>
                    <button>
                        <FontAwesomeIcon
                            icon={faLink}
                            className="text-text-light-500 dark:text-text-dark-500 text-lg"
                        />
                    </button>
                </Hug>
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
                className="flex flex-col py-16 min-h-screen w-full"
            >
                <RoomControls />
            </div>
        </div>
    )
}

export default Room
