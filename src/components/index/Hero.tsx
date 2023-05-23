import React from "react"
import Hug from "../Hug"
import Button from "../Button"

const Hero = () => {
    return (
        <Hug className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-center">
                Dice, Deception and Deduction
            </h2>
            <p className="text-center text-sm">
                A simple game of bluff and tactic for 2-10 players.
            </p>
            <Button className="w-fit px-4 py-1">How to Play</Button>
        </Hug>
    )
}

export default Hero
