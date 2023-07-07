import React from "react"
import Hug from "../Hug"
import Button from "../Button"
import Modal from "../Modal"
import HowToPlay from "../content/HowToPlay"

const Hero = () => {
    return (
        <Hug className="flex flex-col gap-2 justify-center items-center md:w-3/4 lg:w-1/2 xl:w-1/3">
            <h2 className="text-xl font-bold text-center text-text-light-500 dark:text-text-dark-500">
                Dice, Deception and Deduction
            </h2>
            <p className="text-center text-sm text-text-light-300 dark:text-text-dark-300">
                A simple game of bluff and tactic for 2-6 players.
            </p>
            <Modal
                invoker={
                    <Button className="w-fit button-gradient-ltr px-4 py-1 font-medium text-text-light-100 dark:text-text-dark-100">
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
