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

export { readCookie, readColorScheme, setColorScheme }
