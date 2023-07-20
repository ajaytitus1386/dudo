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
import {
    endGame,
    playerMakesChallenge,
    readyUser,
    startNewGame,
    startNextRound,
    unreadyUser,
} from "lib/socket/emitters"
import { useSocketContext } from "context/socketContext"
import { useGameContext } from "context/gameContext"
import { Bid } from "../../../dudo_submodules/models/game"
import { toast } from "react-toastify"

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
                className={`relative m-auto text-md text-text-light-500 dark:text-text-dark-500 col-span-2 p-1`}
            >
                <Username username={playerName} />
                {isActive && (
                    <div
                        className={`absolute z-10 -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 animate-pulse`}
                    />
                )}
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
    const { room, isHost } = useRoomContext()
    const { username } = useAppContext()
    const { socket } = useSocketContext()
    const { game, currentHand, totalNumberOfDice } = useGameContext()

    /* -------------------------------- Stateful variables ------------------------------- */

    const isGame = room.roomState === "game"

    const otherRoomUsers = room.roomUsers
        ? room.roomUsers.filter((roomUser) => roomUser.name !== username)
        : []

    const currentPlayerIndex = game.currentRound?.playerHands.findIndex(
        (player) => player.name === username
    )

    const allPlayers = game.currentRound?.playerHands

    const sortedOtherPlayers = allPlayers
        ? // If the user is not in the game, no sorting needed
          currentPlayerIndex === -1
            ? allPlayers
            : // Sort the players relative to the current player turn index
              [
                  ...allPlayers.slice(currentPlayerIndex + 1),
                  ...allPlayers.slice(0, currentPlayerIndex),
              ]
        : []

    const numberOfPlayersReady = room.roomUsers?.filter(
        (roomUser) => roomUser.isReady
    ).length

    const numberOfColumns = 7

    const numberOfDice = 5

    const d6 = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix]

    const dieClassName = "w-8 h-8 m-1 inline-block"

    const emptyHand = Array.from(Array(numberOfDice).keys()).map(() => 0)

    const isReady = room.roomUsers?.find(
        (roomUser) => roomUser.name === username
    )?.isReady

    const isPlayerYou = (playerName: string) => playerName === username

    const showPlayersTurn =
        game?.currentRound?.currentPlayerTurn &&
        (game?.gamePhase === "round" || game?.gamePhase === "pre-round")

    const currentPlayerTurn = game?.currentRound?.currentPlayerTurn

    const latestBid = game.currentRound?.bids[game.currentRound.bids.length - 1]

    const isChallengeDisabled =
        game?.gamePhase !== "round" ||
        game?.currentRound?.currentPlayerTurn !== username

    const isChallengeOver =
        game?.currentRound?.hasChallengeBeenMade &&
        game?.currentRound?.winningPlayerId

    const showPostRoundActions =
        game?.gamePhase === "post-round" && username === room?.host?.id

    /* ----------------------------- Sub Components ----------------------------- */

    const Divider = () => (
        <div className="col-span-full w-full h-0.5 bg-background-light-500 dark:bg-background-dark-500 opacity-50" />
    )

    const CurrentPlayerTurn = ({
        currentPlayer,
    }: {
        currentPlayer: string
    }) => {
        return (
            <h3 className="text-text-light-500 dark:text-text-dark-500">
                Waiting on {currentPlayer} to make a bid
            </h3>
        )
    }

    const BidComponent = ({
        quantity,
        face,
    }: {
        quantity: number
        face: number
    }) => {
        const Die = d6[face - 1]
        return (
            <div className="whitespace- inline-block">
                {quantity} <Die className={dieClassName} />
            </div>
        )
    }

    const LatestBid = ({ latestBid }: { latestBid: Bid }) => {
        return (
            <h3 className="text-text-light-500 dark:text-text-dark-500">
                {isPlayerYou(latestBid.playerId) ? "You" : latestBid.playerId}{" "}
                {`bid${isPlayerYou(latestBid.playerId) ? "" : "s"}`}{" "}
                <BidComponent
                    face={latestBid.face}
                    quantity={latestBid.quantity}
                />
                {` out of ${totalNumberOfDice} dice`}
            </h3>
        )
    }

    const ChallengeButton = ({ isDisabled }: { isDisabled: boolean }) => {
        const handleChallenge = () => {
            if (!socket || !username) return

            playerMakesChallenge(socket!, username!, room.name)
        }

        return (
            <Button
                onClick={() => handleChallenge()}
                variant="primary"
                className="font-medium tracking-wide px-2 md:px-8"
                disabled={isDisabled}
            >
                Challenge
            </Button>
        )
    }

    const GameResult = ({ latestBid }: { latestBid: Bid }) => {
        const challengingPlayer = game.currentRound?.challengingPlayerId
        const challengedPlayer =
            game.currentRound?.bids[game.currentRound.bids.length - 1].playerId
        const winningPlayer = game.currentRound?.winningPlayerId

        // vars for each player name

        // conditional: did you win/lose
        // if you didnt lose, show who won
        // if you did lose, show you lost

        const didChallengerWin = challengingPlayer === winningPlayer

        const trueQuantity = game.currentRound?.playerHands.reduce(
            (acc, player) =>
                acc +
                player.hand.filter((face) => face === latestBid.face).length,
            0
        )

        return (
            <>
                <h3 className="text-text-light-500 dark:text-text-dark-500">
                    {challengingPlayer} challenged {challengedPlayer}
                </h3>
                <h3 className="text-text-light-500 dark:text-text-dark-500 font-medium">
                    {challengingPlayer}{" "}
                    <strong
                        className={
                            didChallengerWin
                                ? "text-positive-light dark:text-positive-dark"
                                : "text-negative-light dark:text-negative-dark"
                        }
                    >
                        {didChallengerWin ? "won" : "lost"}
                    </strong>{" "}
                    the round
                </h3>
                <h3 className="text-text-light-500 dark:text-text-dark-500">
                    In total, there are{" "}
                    <BidComponent
                        face={latestBid.face}
                        quantity={trueQuantity}
                    />
                </h3>
            </>
        )
    }

    const PostRoundActions = ({}) => {
        return (
            <div className="flex gap-2">
                <Button
                    onClick={() => handleEndGame()}
                    variant="none"
                    className="text-text-light-500 dark:text-text-dark-500 underline font-medium tracking-wide px-2 md:px-8"
                >
                    End Game
                </Button>
                <Button
                    onClick={() => handleNextRound()}
                    variant="none"
                    className="text-text-light-500 dark:text-text-dark-500 underline font-medium tracking-wide px-2 md:px-8"
                >
                    Next Round
                </Button>
            </div>
        )
    }

    /* ----------------------------- Event Handlers ----------------------------- */

    const handleReadyUp = () => {
        if (!socket || !username) return

        readyUser(socket!, room.name, username!)
    }

    const handleUnReady = () => {
        if (!socket || !username) return

        unreadyUser(socket!, room.name, username!)
    }

    const handleStartGame = () => {
        if (numberOfPlayersReady < 2) {
            toast.error(`You need at least 2 players "Ready" to start a game`)
            return
        }

        if (!socket || !username) return

        startNewGame(socket!, username!, room.name)
    }

    const handleNextRound = () => {
        if (!socket || !username) return

        startNextRound(socket!, room.name)
    }

    const handleEndGame = () => {
        if (!socket || !username) return

        endGame(socket!, username!, room.name)
    }

    return (
        <Hug className="flex flex-[3] flex-col items-center justify-start gap-y-4 px-8 py-8 md:flex-[4]">
            <div
                className={`grid px-1 gap-y-4 gap-x-2 w-full`}
                style={{
                    gridTemplateColumns: `repeat(${numberOfColumns},minmax(0,1fr))`,
                }}
            >
                {isGame ? (
                    <PlayerHand
                        playerName={username || "Me"}
                        playerHand={currentHand || emptyHand}
                        maxDice={numberOfDice}
                        highlightedFace={
                            game?.gamePhase === "post-round"
                                ? latestBid?.face
                                : undefined
                        }
                        isActive={currentPlayerTurn === username}
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
                {otherRoomUsers && otherRoomUsers.length === 0 && (
                    <h3 className="col-span-full flex items-center m-auto text-center text-text-light-500 dark:text-text-dark-500">
                        Invite other players to join the game!
                    </h3>
                )}

                {isGame
                    ? sortedOtherPlayers &&
                      sortedOtherPlayers.map((player) => (
                          <PlayerHand
                              key={`${player.id}_hand`}
                              playerName={player.name}
                              playerHand={player.hand}
                              maxDice={numberOfDice}
                              highlightedFace={
                                  game?.gamePhase === "post-round"
                                      ? latestBid?.face
                                      : undefined
                              }
                              isActive={currentPlayerTurn === player.name}
                          />
                      ))
                    : otherRoomUsers &&
                      otherRoomUsers.map((roomUser, i) => (
                          <PlayerStatus
                              key={`${roomUser.id}_hand`}
                              playerName={roomUser.name}
                              isReady={roomUser.isReady}
                              numberOfDice={numberOfDice}
                          />
                      ))}
            </div>
            <Divider />
            {/* Game Board */}
            {isGame ? (
                <div className="flex flex-1 w-full flex-col gap-y-2 items-center justify-center">
                    {showPlayersTurn && (
                        <CurrentPlayerTurn
                            currentPlayer={
                                game?.currentRound?.currentPlayerTurn ===
                                username
                                    ? "You"
                                    : game?.currentRound?.currentPlayerTurn
                            }
                        />
                    )}
                    {latestBid && <LatestBid latestBid={latestBid} />}
                    {isChallengeOver && <GameResult latestBid={latestBid} />}
                    <ChallengeButton isDisabled={isChallengeDisabled} />
                    {showPostRoundActions && <PostRoundActions />}
                </div>
            ) : (
                <div className="flex flex-col gap-y-2 justify-center items-center m-auto w-full">
                    {isHost ? (
                        <Button
                            className="m-auto button-primary-gradient button-gradient-ltr !w-3/4 font-bold px-2"
                            onClick={handleStartGame}
                        >
                            Start Game
                        </Button>
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
                    <span className="text-text-light-500 dark:text-text-dark-500 ">
                        Players Ready:{" "}
                        {`${numberOfPlayersReady}/${room.roomUsers?.length}`}
                    </span>
                </div>
            )}
        </Hug>
    )
}

export default DiceTable
