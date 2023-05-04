import React, { useState } from "react"
import Hug from "../Hug"
import diceStyles from "./dice.module.css"
import DiceOne from "../icons/D6/DiceOne"
import DiceTwo from "../icons/D6/DiceTwo"
import DiceSix from "../icons/D6/DiceSix"
import DiceFive from "../icons/D6/DiceFive"
import DiceThree from "../icons/D6/DiceThree"
import DiceFour from "../icons/D6/DiceFour"

// The die styles are set in the dice.module.css file

const DicePicker = () => {
    const maxNumberOfDice = 10
    const minAmount = 1
    const minEyes = 1

    const [chosenEyes, setChosenEyes] = useState(1)
    const [chosenAmount, setChosenAmount] = useState(1)
    const faces = [
        "faceFront",
        "faceLeft",
        "faceTop",
        "faceBottom",
        "faceRight",
        "faceBack",
    ]
    const [diceFaceClass, setDiceFaceClass] = useState(diceStyles.faceFront)

    const increaseEyes = () => {
        setChosenEyes((prev) => (prev < 6 ? prev + 1 : 1))
        setDiceFaceClass(diceStyles[faces[chosenEyes - 1]])
    }

    const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (value < 1) {
            setChosenAmount(1)
        } else if (value > maxNumberOfDice) {
            setChosenAmount(maxNumberOfDice)
        } else {
            setChosenAmount(value)
        }
    }

    const incrementAmount = () => {
        setChosenAmount((prev) =>
            prev < maxNumberOfDice ? prev + 1 : maxNumberOfDice
        )
    }

    const decrementAmount = () => {
        setChosenAmount((prev) => (prev > minAmount ? prev - 1 : minAmount))
    }

    return (
        <Hug className={"grid grid-cols-2 px-4 y-6 gap-4"}>
            <h2 className="mx-4 order-1">Amount</h2>
            <div className="m-auto order-3">
                <div className="flex flex-row h-10 rounded-md">
                    <button
                        className=" text-gray-600 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
                        onClick={decrementAmount}
                    >
                        <span className="m-auto text-2xl">-</span>
                    </button>
                    <input
                        type="number"
                        className="custom-number-input text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none focus:outline-none "
                        name="amount-input-number"
                        value={chosenAmount}
                        onChange={changeAmount}
                    />
                    <button
                        className="text-gray-600 hover:text-gray-700  h-full w-20 rounded-r cursor-pointer outline-none"
                        onClick={incrementAmount}
                    >
                        <span className="m-auto text-2xl">+</span>
                    </button>
                </div>
            </div>

            <h2 className="mx-4 order-2 text-right">Eyes</h2>
            <div className="order-4">
                <div className={`${diceStyles.dieView}`}>
                    <div
                        className={`${diceStyles.die} ${diceFaceClass} cursor-pointer`}
                        onClick={increaseEyes}
                    >
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.front}`}
                        >
                            <DiceOne className={`${diceStyles.dieFaceIcon}`} />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.back}`}
                        >
                            <DiceSix className={`${diceStyles.dieFaceIcon}`} />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.left}`}
                        >
                            <DiceTwo className={`${diceStyles.dieFaceIcon}`} />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.right}`}
                        >
                            <DiceFive className={`${diceStyles.dieFaceIcon}`} />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.top}`}
                        >
                            <DiceThree
                                className={`${diceStyles.dieFaceIcon}`}
                            />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.bottom}`}
                        >
                            <DiceFour className={`${diceStyles.dieFaceIcon}`} />
                        </div>
                    </div>
                </div>
            </div>
        </Hug>
    )
}

export default DicePicker
