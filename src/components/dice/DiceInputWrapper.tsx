import { faDiceD6, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "components/Button"
import Hug from "components/Hug"
import React, { useState } from "react"
import { Bid } from "../../../dudo_submodules/models/game"
import { useAppContext } from "context/appContext"
import DiceList from "./DiceList"
import DicePicker from "./DicePicker"

type Props = {
    setShowList: React.Dispatch<React.SetStateAction<boolean>>
    showList: boolean
}

const DiceInputWrapper: React.FC<Props> = ({ setShowList, showList }) => {
    const { username } = useAppContext()
    const [selectedBid, setSelectedBid] = useState({
        face: 1,
        quantity: 1,
        playerId: username,
    } as Bid)

    return (
        <Hug
            className={
                // NOTE:overflow-hidden has been addded allow the overflow-auto of DiceList to work responsively on the flexbox
                "flex-[2] flex flex-col px-4 py-2 h-full gap-4 overflow-hidden"
            }
        >
            {showList ? (
                <DiceList
                    selectedBid={selectedBid}
                    setSelectedBid={setSelectedBid}
                />
            ) : (
                <DicePicker />
            )}
            <div className="flex justify-center items-center gap-x-1 md:order-first">
                <Button
                    onClick={() => setShowList((prev) => !prev)}
                    className="px-2 py-1 font-bold"
                >
                    {showList ? (
                        <FontAwesomeIcon
                            icon={faDiceD6}
                            className="text-text-light-100 dark:text-text-dark-500"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faList}
                            className="text-text-light-100 dark:text-text-dark-500"
                        />
                    )}
                </Button>
                <Button className="px-2 py-1 text-text-light-100 dark:text-text-dark-500 font-medium">
                    Confirm
                </Button>
            </div>
        </Hug>
    )
}

export default DiceInputWrapper
