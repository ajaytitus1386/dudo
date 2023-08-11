import { createContext, useContext, useEffect, useState } from "react"
import useSound from "use-sound"
import { PlayFunction } from "use-sound/dist/types"

const Context = createContext({
    mute: false,
    toggleMute: () => {},
    // Value between 0 to 100
    volume: 50,
    setVolume: ((volume: number) => {}) as React.Dispatch<
        React.SetStateAction<number>
    >,
    playDiceRollSound: (() => {}) as PlayFunction,
    playEnterRoomSound: (() => {}) as PlayFunction,
})

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const [volume, setVolume] = useState(50)
    const [mute, setMute] = useState(false)

    const [playDiceRollSound] = useSound("/sounds/dice_roll.wav", {
        volume: volume / 100,
        soundEnabled: !mute,
    })
    const [playEnterRoomSound] = useSound("/sounds/enter_room.wav", {
        volume: volume / 100,
        soundEnabled: !mute,
    })

    useEffect(() => {
        const mutePreference = localStorage.getItem("mute")
        setMute(mutePreference === "true")
    }, [])

    const toggleMute = () => {
        setMute(!mute)
        localStorage.setItem("mute", (!mute).toString())
    }

    return (
        <Context.Provider
            value={{
                mute,
                toggleMute,
                volume,
                setVolume,
                playDiceRollSound,
                playEnterRoomSound,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useSoundContext = () => {
    return useContext(Context)
}
