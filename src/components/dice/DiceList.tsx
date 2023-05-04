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

const DiceList = () => {
    const maxNumberOfDice = 10
    const minAmount = 1
    const minEyes = 1

    const dice = [
        faDiceOne,
        faDiceTwo,
        faDiceThree,
        faDiceFour,
        faDiceFive,
        faDiceSix,
    ]
    // const dice = {
    //     1: faDiceOne,
    //     2: faDiceTwo,
    //     3: faDiceThree,
    //     4: faDiceFour,
    //     5: faDiceFive,
    //     6: faDiceSix
    // }

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
                        <FontAwesomeIcon icon={Die} size="2xl" />
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
