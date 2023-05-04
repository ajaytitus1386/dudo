import React, { useEffect } from "react"
import Hug from "../Hug"
import DiceOne from "../icons/D6/DiceOne"
import DiceTwo from "../icons/D6/DiceTwo"
import DiceThree from "../icons/D6/DiceThree"
import DiceFour from "../icons/D6/DiceFour"
import DiceFive from "../icons/D6/DiceFive"
import DiceSix from "../icons/D6/DiceSix"

const DiceList = () => {
    const maxNumberOfDice = 10
    const minAmount = 2
    const minEyes = 3

    useEffect(() => {
        if (!document) return
        const nextChoice = document.querySelector(
            `#bid-${minAmount}-${minEyes}`
        )
        if (!nextChoice) return
        nextChoice.scrollIntoView({ behavior: "smooth" })
    }, [])

    const dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix]

    const isValidBid = (amount: number, eyes: number) => {
        return (
            (eyes > minEyes && amount >= minAmount) ||
            (eyes == minEyes && amount > minAmount) ||
            amount > minAmount
        )
    }

    const diceChoices = Array.from(Array(maxNumberOfDice).keys())
        .map((i) => i + 1)
        .reduce<Array<JSX.Element>>(
            (prev, amount) => [
                ...prev,
                ...dice.map((Die, eyes) => (
                    <Hug
                        className={`flex flex-row justify-between items-center gap-2 ${
                            !isValidBid(amount, eyes + 1)
                                ? "opacity-50 bg-gray-400 "
                                : ""
                        }`}
                        key={`bid-${amount}-${eyes}`}
                        id={`bid-${amount}-${eyes}`}
                    >
                        <b>{amount}</b>
                        <Die className="w-8 h-8" />
                    </Hug>
                )),
            ],
            []
        )

    return (
        <div className="flex flex-col p-8 items-center shadow-lg rounded-md w-full max-h-64 overflow-auto">
            <text className="text-primary ">Your bid</text>
            <div className="grid grid-cols-2 gap-2">{diceChoices}</div>
        </div>
    )
}

export default DiceList
