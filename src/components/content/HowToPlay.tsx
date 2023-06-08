import React from "react"

const HowToPlay = () => {
    return (
        <>
            <h1 className="text-center text-xl font-bold">
                How to Play Liar&apos;s Dice
            </h1>
            <ol type="1" className="list-decimal px-4">
                <li>Each player has a set of dice known only to them</li>
                <li>
                    Players can take their turn to guess how many of a
                    particular die face that have been rolled by all the players
                    collectively. This is represented by an &quot;amount&quot;
                    and an number of &quot;eyes&quot;. (For Example: 3 sixes)
                </li>
                <li>
                    The guesses or &ldquo;bids&rdquo; keep rising each turn.
                </li>
                <li>
                    A Challenge can be made by any player against the latest
                    bid, claiming that it is false. At which point all the dice
                    are revealed a winner for the round is decided{" "}
                </li>
            </ol>
            <h2 className="text-center text-lg font-bold">Optional Rules</h2>
            <ul className="list-disc px-4">
                <li>Aces are wild and count for every face</li>
            </ul>
        </>
    )
}

export default HowToPlay
