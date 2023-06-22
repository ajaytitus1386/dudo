import React from "react"
import Hug from "../Hug"
import DiceAny from "../icons/D6/DiceAny"
import DiceOne from "../icons/D6/DiceOne"
import DiceTwo from "../icons/D6/DiceTwo"
import DiceThree from "../icons/D6/DiceThree"
import DiceFour from "../icons/D6/DiceFour"
import DiceFive from "../icons/D6/DiceFive"
import DiceSix from "../icons/D6/DiceSix"
import Username from "components/Username"
import { useRoomContext } from "context/roomContext"
import { useAppContext } from "context/appContext"
import Button from "components/Button"
import { readyUser, unreadyUser } from "lib/socket/emitters"
import { useSocketContext } from "context/socketContext"

const PlayerStatus = ({
    playerName,
    isReady,
    toggleReady,
    numberOfDice,
}: {
    playerName: string
    isReady: boolean
    toggleReady?: () => void
    numberOfDice: number
}) => {
    return (
        <>
            <div
                className={`m-auto text-md text-text-light-500 dark:text-text-dark-500 col-span-2 rounded-md p-1 `}
            >
                <Username username={playerName} />
            </div>
            <div
                className={`flex items-center justify-center`}
                style={{
                    gridColumn: `span ${numberOfDice} / span ${numberOfDice}`,
                }}
            >
                {toggleReady ? (
                    <Button
                        onClick={() => toggleReady()}
                        variant="none"
                        className={`font-bold text-background-light-100 dark:text-background-dark-100 ${
                            isReady
                                ? "bg-positive-light dark:bg-positive-dark"
                                : "bg-negative-light dark:bg-negative-dark"
                        }`}
                    >
                        {isReady ? "Ready" : "Not Ready"}
                    </Button>
                ) : (
                    <h3
                        className={`font-bold ${
                            isReady
                                ? "text-positive-light dark:text-positive-dark"
                                : "text-negative-light dark:text-negative-dark"
                        }`}
                    >
                        {isReady ? "Ready" : "Not Ready"}
                    </h3>
                )}
            </div>
        </>
    )
}

const PlayerHand = ({
    playerName,
    playerHand,
    maxDice = 5,
    highlightedFace,
    isActive = false,
}: {
    playerName: string
    playerHand: number[]
    maxDice: number
    highlightedFace?: number
    isActive?: boolean
}) => {
    const Dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix]
    return (
        <>
            <div
                className={`m-auto text-md text-text-light-500 dark:text-text-dark-500 col-span-2 rounded-md p-1 ${
                    isActive && "border-2 border-green-400"
                }`}
            >
                <Username username={playerName} />
            </div>
            {Array.from(Array(maxDice).keys()).map((i) => {
                // Known Die
                if (
                    i < playerHand.length &&
                    i >= 0 &&
                    playerHand[i] > 0 &&
                    playerHand[i] <= 6 &&
                    Dice[playerHand[i] - 1]
                ) {
                    const Die = Dice[playerHand[i] - 1]
                    return (
                        <div
                            className={[
                                "m-auto",
                                highlightedFace === playerHand[i]
                                    ? "border-2 border-green-400 bg-green-400"
                                    : "",
                            ].join(" ")}
                            key={`cell_${i}_${playerName}`}
                        >
                            <Die className="w-8 h-8" />
                        </div>
                    )
                }
                // Unknown Die
                else if (playerHand[i] <= 0 || playerHand[i] > 6)
                    return (
                        <div className="m-auto" key={`cell_${i}_${playerName}`}>
                            <DiceAny className="w-8 h-8" />
                        </div>
                    )
                // Empty Die
                else return <div key={`empty_cell_${i}_${playerName}`} />
            })}
        </>
    )
}

const DiceTable = () => {
    const { room } = useRoomContext()
    const { username } = useAppContext()
    const { socket } = useSocketContext()

    const otherPlayers = room.players
        ? room.players.filter((player) => player.name !== username)
        : []

    const isGame = room.roomState === "game"

    const Divider = () => (
        <div className="col-span-full w-full h-0.5 bg-background-light-500 dark:bg-background-dark-500 opacity-50" />
    )

    const numberOfColumns = 7

    const numberOfDice = 5

    const handleReadyUp = () => {
        if (!socket || !username) return

        readyUser(socket!, room.name, username!)
    }

    const handleUnReady = () => {
        if (!socket || !username) return

        unreadyUser(socket!, room.name, username!)
    }

    const isReady = room.players?.find(
        (player) => player.name === username
    )?.isReady

    return (
        <Hug className="flex flex-[3] flex-col items-center justify-center gap-y-4 px-8 py-8 md:flex-[4]">
            <div
                className={`grid px-1 gap-y-4 gap-x-2 w-full`}
                style={{
                    gridTemplateColumns: `repeat(${numberOfColumns},minmax(0,1fr))`,
                }}
            >
                {isGame ? (
                    <PlayerHand
                        playerName={username || "Me"}
                        playerHand={[3, 4, 5, 6, 6]}
                        maxDice={5}
                    />
                ) : (
                    <PlayerStatus
                        playerName={username || "Me"}
                        isReady={isReady || false}
                        toggleReady={isReady ? handleUnReady : handleReadyUp}
                        numberOfDice={numberOfDice}
                    />
                )}
            </div>
            <Divider />
            <div
                className={`grid px-1 gap-y-4 gap-x-2 max-h-32 overflow-auto md:max-h-[50%] w-full`}
                style={{
                    gridTemplateColumns: `repeat(${numberOfColumns},minmax(0,1fr))`,
                }}
            >
                {otherPlayers && otherPlayers.length === 0 && (
                    <h3 className="col-span-full flex items-center m-auto text-text-light-500 dark:text-text-dark-500">
                        Invite other players to join the game!
                    </h3>
                )}
                {otherPlayers &&
                    otherPlayers.map((player, i) =>
                        isGame ? (
                            <PlayerHand
                                key={`${player.id}_hand`}
                                playerName={player.name}
                                playerHand={[0, 0, 0, 0, 0]}
                                maxDice={5}
                            />
                        ) : (
                            <PlayerStatus
                                key={`${player.id}_hand`}
                                playerName={player.name}
                                isReady={player.isReady}
                                numberOfDice={numberOfDice}
                            />
                        )
                    )}
            </div>
            <Divider />
            {/* Results */}
            {isGame ? (
                <>
                    <h3 className="col-span-full flex items-center m-auto text-text-light-500 dark:text-text-dark-500">
                        Player 2 bids 3 <DiceFive className="w-8 h-8 m-1" /> out
                        of 10 dice
                    </h3>
                </>
            ) : (
                <h3
                    className={[
                        "col-span-full m-auto text-lg text-text-light-500 dark:text-text-dark-500",
                        "after:content-['...'] after:absolute after:overflow-hidden after:animate-ellipsis after:inline-block after:align-bottom",
                    ].join(" ")}
                >
                    Waiting for the game to start
                </h3>
            )}
        </Hug>
    )
}

export default DiceTable
