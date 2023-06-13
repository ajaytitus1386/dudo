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
        nextChoice.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        })
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
                                ? "opacity-50 bg-background-light-300 dark:bg-background-dark-300"
                                : "bg-background-light-100 dark:bg-background-dark-500"
                        }`}
                        key={`bid-${amount}-${eyes}`}
                        id={`bid-${amount}-${eyes}`}
                    >
                        <b className="text-text-light-500 dark:text-text-dark-500">
                            {amount}
                        </b>
                        <Die className="w-8 h-8" />
                    </Hug>
                )),
            ],
            []
        )

    return (
        // The parent element should have display:grid and grid-template-columns: 1fr 1fr
        <div className="relative col-span-2 row-span-2 flex flex-col items-center rounded-md h-full w-full">
            <div className="absolute grid grid-cols-2 gap-2 max-h-full overflow-auto md:grid-cols-3 lg:grid-cols-4">
                {diceChoices}
            </div>
        </div>
    )
}

export default DiceList
