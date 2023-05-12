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
}: {
    playerName: string
    playerHand: number[]
    maxDice: number
    highlightedFace?: number
}) => {
    const Dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix]
    return (
        <>
            <div className="m-auto text-md text-black col-span-2">
                {playerName}
            </div>
            {Array.from(Array(maxDice).keys()).map((i) => {
                // Known Die
                if (i < playerHand.length && i >= 0 && playerHand[i] > 0) {
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
                else if (playerHand[i] === 0)
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
    return (
        <Hug className="grid grid-cols-7 gap-y-4 gap-x-2 px-8 py-8">
            <PlayerHand
                playerName="Player 1"
                playerHand={[3, 4, 5, 6, 6]}
                maxDice={5}
                highlightedFace={6}
            />
            <div className="col-span-full w-full h-0.5 bg-gray-400 opacity-50" />
            <PlayerHand
                playerName="Player 2"
                playerHand={[1, 2, 6]}
                maxDice={5}
            />
            <PlayerHand playerName="Robot" playerHand={[0, 0, 0]} maxDice={5} />
        </Hug>
    )
}

export default DiceTable
