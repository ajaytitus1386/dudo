import React from "react"
import Hug from "../Hug"
import Button from "../Button"
import Modal from "../Modal"
import HowToPlay from "../content/HowToPlay"

const Hero = () => {
    return (
        <Hug className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-center">
                Dice, Deception and Deduction
            </h2>
            <p className="text-center text-sm">
                A simple game of bluff and tactic for 2-6 players.
            </p>
            <Modal
                invoker={
                    <Button className="w-fit px-4 py-1 text-white">
                        How to Play
                    </Button>
                }
            >
                <HowToPlay />
            </Modal>
        </Hug>
    )
}

export default Hero
