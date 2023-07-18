import { createContext, useContext, useState } from "react"
import Game from "../../dudo_submodules/models/game"

const GameContext = createContext({
    game: {
        roomId: "",
        gamePhase: "pre-game",
        currentRound: {
            playerHands: [],
            bids: [],
            challengingPlayerId: "",
            currentPlayerTurn: "",
            hasChallengeBeenMade: false,
            winningPlayerId: "",
        },
        roundsPlayed: 0,
        playerStats: [],
    } as Game,
    setGame: (() => {}) as React.Dispatch<React.SetStateAction<Game>>,
    currentHand: [] as number[],
    setCurrentHand: (() => {}) as React.Dispatch<
        React.SetStateAction<number[]>
    >,
    totalNumberOfDice: 0,
    resetGameContext: (() => {}) as () => void,
})

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [game, setGame] = useState({} as Game)
    const [currentHand, setCurrentHand] = useState<number[]>([])

    const totalNumberOfDice = game.currentRound?.playerHands?.reduce(
        (acc, curr) => {
            return acc + curr.hand.length
        },
        0
    )

    const resetGameContext = () => {
        setGame({} as Game)
        setCurrentHand([])
    }

    return (
        <GameContext.Provider
            value={{
                game,
                setGame,
                currentHand,
                setCurrentHand,
                totalNumberOfDice,
                resetGameContext,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => {
    return useContext(GameContext)
}
