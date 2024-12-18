import React, { useState } from "react"
import diceStyles from "./dice.module.css"
import DiceOne from "../icons/D6/DiceOne"
import DiceTwo from "../icons/D6/DiceTwo"
import DiceSix from "../icons/D6/DiceSix"
import DiceFive from "../icons/D6/DiceFive"
import DiceThree from "../icons/D6/DiceThree"
import DiceFour from "../icons/D6/DiceFour"
import { useThemeContext } from "context/themeContext"

// The die styles are set in the dice.module.css file

const DicePicker = () => {
    const { theme } = useThemeContext()
    const isDark = theme === "dark"

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
        // The parent element should have display:grid and grid-template-columns: 1fr 1fr
        <div className="flex flex-col justify-center items-center gap-2 md: gap-y-4">
            {/* <h2 className="mx-4 order-1 text-center text-text-light-500 dark:text-text-dark-500">
                Amount
            </h2> */}
            <div className="flex items-center justify-center h-full w-min">
                <div className="flex flex-row items-center justify-center h-10 rounded-md">
                    <button
                        className="text-text-light-300 hover:text-text-light-400 dark:text-text-dark-300 dark:hover:text-text-dark-200 bg-background-light-300 dark:bg-background-dark-300 h-full w-20 rounded-l cursor-pointer outline-none"
                        onClick={decrementAmount}
                    >
                        <span className="m-auto align-middle text-2xl">-</span>
                    </button>
                    <input
                        type="number"
                        className="custom-number-input text-center h-full w-1/3 font-semibold text-md hover:text-text-light-500 focus:text-text-light-500 flex items-center text-text-light-300 dark:text-text-dark-300 bg-background-light-100 dark:bg-background-dark-100 outline-none focus:outline-none "
                        name="amount-input-number"
                        value={chosenAmount}
                        onChange={changeAmount}
                    />
                    <button
                        className="text-text-light-300 hover:text-text-light-400 dark:text-text-dark-300 dark:hover:text-text-dark-200 bg-background-light-300 dark:bg-background-dark-300 h-full w-20 rounded-r cursor-pointer outline-none"
                        onClick={incrementAmount}
                    >
                        <span className="m-auto text-2xl">+</span>
                    </button>
                </div>
            </div>

            {/* <h2 className="mx-4 order-2 text-center text-text-light-500 dark:text-text-dark-500">
                Face
            </h2> */}
            <div className="flex items-center gap-x-4 gap-y-4 flex-wrap justify-center h-full">
                <div className={`${diceStyles.dieView}`}>
                    <div
                        className={`${diceStyles.die} ${diceFaceClass} cursor-pointer`}
                        onClick={increaseEyes}
                    >
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.front}`}
                        >
                            <DiceOne
                                className={`${
                                    isDark
                                        ? diceStyles.dieFaceIconDark
                                        : diceStyles.dieFaceIcon
                                }`}
                            />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.back}`}
                        >
                            <DiceSix
                                className={`${
                                    isDark
                                        ? diceStyles.dieFaceIconDark
                                        : diceStyles.dieFaceIcon
                                }`}
                            />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.left}`}
                        >
                            <DiceTwo
                                className={`${
                                    isDark
                                        ? diceStyles.dieFaceIconDark
                                        : diceStyles.dieFaceIcon
                                }`}
                            />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.right}`}
                        >
                            <DiceFive
                                className={`${
                                    isDark
                                        ? diceStyles.dieFaceIconDark
                                        : diceStyles.dieFaceIcon
                                }`}
                            />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.top}`}
                        >
                            <DiceThree
                                className={`${
                                    isDark
                                        ? diceStyles.dieFaceIconDark
                                        : diceStyles.dieFaceIcon
                                }`}
                            />
                        </div>
                        <div
                            className={`${diceStyles.dieFace} ${diceStyles.bottom}`}
                        >
                            <DiceFour
                                className={`${
                                    isDark
                                        ? diceStyles.dieFaceIconDark
                                        : diceStyles.dieFaceIcon
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DicePicker
