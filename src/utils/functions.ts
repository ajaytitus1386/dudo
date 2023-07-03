import { Bid } from "../../dudo_submodules/models/game"

const readCookie = (name: string) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
    if (match) {
        return match[2]
    }
    return ""
}

const readColorScheme = () => {
    if (!localStorage) return

    let colorScheme = localStorage.getItem("color-scheme")

    if (!colorScheme) {
        if (!window) return
        if (!window.matchMedia) return

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            colorScheme = "dark"
            localStorage.setItem("color-scheme", "dark")
        } else {
            colorScheme = "light"
            localStorage.setItem("color-scheme", "light")
        }
    }

    return colorScheme
}

const setColorScheme = (colorScheme: string) => {
    if (!localStorage) return

    localStorage.setItem("color-scheme", colorScheme)
}

/**
 * Using the Ruleset given: Player can re-assert by bidding a higher quantity of any face value, or the same quantity of a higher face value.
 * https://en.wikipedia.org/wiki/Dudo#Rules
 * @param currentBid
 */
export const getMinimumBid = (currentBid: Bid | undefined | null) => {
    if (!currentBid) return { minFace: 0, minQuantity: 0 }
    return {
        minFace: currentBid.face,
        minQuantity: currentBid.quantity + 1,
    }
}

export { readCookie, readColorScheme, setColorScheme }
