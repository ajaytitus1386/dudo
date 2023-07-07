import DiceFour from "components/icons/D6/DiceFour"
import DiceSix from "components/icons/D6/DiceSix"
import DiceTwo from "components/icons/D6/DiceTwo"
import React from "react"

const HowToPlay = () => {
    return (
        <>
            <h1 className="text-center text-xl font-bold text-text-light-500 dark:text-text-dark-500">
                How to Play Liar&apos;s Dice
            </h1>
            <ol
                type="1"
                className="list-decimal px-4 text-text-light-500 dark:text-text-dark-500"
            >
                <li>
                    Each player has a set of dice known only to them that is
                    rolled at start of a round.
                </li>
                <li>
                    Players in order take their turn to guess a <u>minimum</u>{" "}
                    number particular die face that have been rolled by all the
                    players collectively. This is represented by an
                    &quot;amount&quot; and an &quot;face&quot;. (for example: 3
                    fours i.e 3 <DiceFour className="w-5 h-5 inline-block" />)
                </li>
                <li>
                    The guesses or &ldquo;bids&rdquo; keep rising each turn in
                    one following manners:
                </li>
                <sub className="ml-1 mb-1 text-sm block">
                    a) A Player can bid a higher amount of any face (example: 4
                    sixes i.e 4 <DiceSix className="w-5 h-5 inline-block" /> or
                    4 twos i.e 4 <DiceTwo className="w-5 h-5 inline-block" />)
                </sub>
                <sub className="ml-1 mb-1 text-sm block">
                    b) A Player can bid the same amount of a higher face
                    (example: 3 sixes i.e 3{" "}
                    <DiceSix className="w-5 h-5 inline-block" />)
                </sub>
                <li>
                    A Challenge can be made by any player against the latest
                    bid, claiming that it is false. At which point all the dice
                    are revealed a winner for the round is decided{" "}
                </li>
            </ol>
        </>
    )
}

export default HowToPlay
