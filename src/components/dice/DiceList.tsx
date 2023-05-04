import {
    faDiceFive,
    faDiceFour,
    faDiceOne,
    faDiceSix,
    faDiceThree,
    faDiceTwo,
} from "@fortawesome/free-solid-svg-icons"
import React, { ReactNode } from "react"
import Hug from "../Hug"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DiceOne from "../icons/D6/DiceOne"
import DiceTwo from "../icons/D6/DiceTwo"
import DiceThree from "../icons/D6/DiceThree"
import DiceFour from "../icons/D6/DiceFour"
import DiceFive from "../icons/D6/DiceFive"
import DiceSix from "../icons/D6/DiceSix"

const DiceList = () => {
    const maxNumberOfDice = 10
    const minAmount = 1
    const minEyes = 1

    const dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix]

    const diceChoices = Array.from(Array(maxNumberOfDice).keys())
        .map((i) => i + 1)
        .reduce<Array<JSX.Element>>(
            (prev, amount) => [
                ...prev,
                ...dice.map((Die, eyes) => (
                    <Hug
                        className={
                            "flex flex-row justify-between items-center gap-2"
                        }
                        key={`bid-${amount}-${eyes}`}
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
