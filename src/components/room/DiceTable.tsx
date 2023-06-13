import React from "react"
import Hug from "../Hug"
import DiceAny from "../icons/D6/DiceAny"
import DiceOne from "../icons/D6/DiceOne"
import DiceTwo from "../icons/D6/DiceTwo"
import DiceThree from "../icons/D6/DiceThree"
import DiceFour from "../icons/D6/DiceFour"
import DiceFive from "../icons/D6/DiceFive"
import DiceSix from "../icons/D6/DiceSix"

const PlayerHand = ({
    playerName,
    playerHand,
    maxDice = 5,
    highlightedFace,
    isActive = false,
}: {
    playerName: string
    playerHand: number[]
    maxDice: number
    highlightedFace?: number
    isActive?: boolean
}) => {
    const Dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix]
    return (
        <>
            <div
                className={`m-auto text-md text-text-light-500 dark:text-text-dark-500 col-span-2 rounded-md p-1 ${
                    isActive && "border-2 border-green-400"
                }`}
            >
                {playerName}
            </div>
            {Array.from(Array(maxDice).keys()).map((i) => {
                // Known Die
                if (
                    i < playerHand.length &&
                    i >= 0 &&
                    playerHand[i] > 0 &&
                    playerHand[i] <= 6 &&
                    Dice[playerHand[i] - 1]
                ) {
                    const Die = Dice[playerHand[i] - 1]
                    return (
                        <div
                            className={[
                                "m-auto",
                                highlightedFace === playerHand[i]
                                    ? "border-2 border-green-400 bg-green-400"
                                    : "",
                            ].join(" ")}
                            key={`cell_${i}_${playerName}`}
                        >
                            <Die className="w-8 h-8" />
                        </div>
                    )
                }
                // Unknown Die
                else if (playerHand[i] <= 0 || playerHand[i] > 6)
                    return (
                        <div className="m-auto" key={`cell_${i}_${playerName}`}>
                            <DiceAny className="w-8 h-8" />
                        </div>
                    )
                // Empty Die
                else return <div key={`empty_cell_${i}_${playerName}`} />
            })}
        </>
    )
}

const DiceTable = () => {
    const Divider = () => (
        <div className="col-span-full w-full h-0.5 bg-background-light-500 dark:bg-background-dark-500 opacity-50" />
    )

    return (
        <Hug className="flex flex-col h-full items-center justify-center gap-y-4 px-8 py-8">
            <div className="grid grid-cols-7 px-1 gap-y-4 gap-x-2 max-h-48 overflow-auto">
                <PlayerHand
                    playerName="Player 1"
                    playerHand={[3, 4, 5, 6, 6]}
                    maxDice={5}
                />
                <Divider />
                {Array.apply(null, Array(5)).map((_, i) => (
                    <PlayerHand
                        key={`robot_${i}`}
                        playerName="Robot"
                        playerHand={[0, 0, 0, 0, 0]}
                        maxDice={5}
                    />
                ))}
            </div>
            <Divider />
            <h3 className="col-span-full flex items-center m-auto text-text-light-500 dark:text-text-dark-500">
                Player 2 bids 3 <DiceFive className="w-8 h-8 m-1" /> out of 10
                dice
            </h3>
            {/* Results */}
        </Hug>
    )
}

export default DiceTable
