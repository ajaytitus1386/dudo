import React, { useEffect } from "react"
import Hug from "../Hug"
import DiceOne from "../icons/D6/DiceOne"
import DiceTwo from "../icons/D6/DiceTwo"
import DiceThree from "../icons/D6/DiceThree"
import DiceFour from "../icons/D6/DiceFour"
import DiceFive from "../icons/D6/DiceFive"
import DiceSix from "../icons/D6/DiceSix"
import { useGameContext } from "context/gameContext"
import { Bid } from "../../../dudo_submodules/models/game"
import { useAppContext } from "context/appContext"
import { isValidBid } from "utils/functions"

interface Props {
    selectedBid: Bid
    setSelectedBid: React.Dispatch<React.SetStateAction<Bid>>
}

const DiceList: React.FC<Props> = ({ selectedBid, setSelectedBid }) => {
    const { username } = useAppContext()
    const { game, totalNumberOfDice } = useGameContext()

    const { currentFace, currentQuantity } = game.currentRound?.bids?.length
        ? {
              currentFace:
                  game.currentRound.bids[game.currentRound.bids.length - 1]
                      .face,
              currentQuantity:
                  game.currentRound.bids[game.currentRound.bids.length - 1]
                      .quantity,
          }
        : { currentFace: 0, currentQuantity: 0 }

    const changeSelectedBid = (quantity: number, face: number) => {
        if (
            isValidBid({
                newQuantity: quantity,
                newFace: face,
                currentQuantity,
                currentFace,
            }) &&
            username
        ) {
            setSelectedBid({ quantity, face, playerId: username })
        }
    }

    useEffect(() => {
        if (!document) return
        const nextChoice = document.querySelector(
            `#bid-${currentQuantity}-${currentFace}`
        )
        if (!nextChoice) return
        nextChoice.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        })
    }, [currentFace, currentQuantity])

    const dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix]

    const isSelectedBid = (quantity: number, face: number) => {
        return quantity == selectedBid.quantity && face == selectedBid.face
    }

    return (
        // The parent element should have display:grid and grid-template-columns: 1fr 1fr
        <div className="relative flex flex-col items-center rounded-md h-full w-full max-h-full overflow-auto gap-y-2">
            {/* Iterate over the options of dice quantity */}
            {Array.from(Array(totalNumberOfDice).keys())
                // Add 1 to the index which starts at 0 to get the correct quantity range
                .map((quantity) => quantity + 1)
                // Each quantity is a grouping that has its own die
                .map((quantity) => (
                    <div
                        key={`dice-options-${quantity}`}
                        className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
                    >
                        {/* Map through the die faces and render options */}
                        {dice.map((Die, faceIndex) => (
                            <button
                                key={`bid-${quantity}-${faceIndex + 1}`}
                                type="button"
                                onClick={() =>
                                    changeSelectedBid(quantity, faceIndex + 1)
                                }
                            >
                                <Hug
                                    className={`flex flex-row justify-between items-center gap-2 ${
                                        !isValidBid({
                                            newQuantity: quantity,
                                            newFace: faceIndex + 1,
                                            currentQuantity,
                                            currentFace,
                                        })
                                            ? "opacity-50 bg-background-light-300 dark:bg-background-dark-300"
                                            : isSelectedBid(
                                                  quantity,
                                                  faceIndex + 1
                                              )
                                            ? "bg-primary-light-200 dark:bg-primary-light-200"
                                            : "bg-background-light-100 dark:bg-background-dark-500"
                                    }`}
                                    id={`bid-${quantity}-${faceIndex + 1}`}
                                >
                                    <b className="text-text-light-500 dark:text-text-dark-500">
                                        {quantity}
                                    </b>
                                    <Die className="w-8 h-8" />
                                </Hug>
                            </button>
                        ))}
                    </div>
                ))}
        </div>
    )
}

export default DiceList
