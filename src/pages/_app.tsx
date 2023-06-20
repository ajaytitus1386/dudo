import "../styles/globals.css"
import type { AppProps } from "next/app"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faPaperPlane,
    faArrowsRotate,
    faChevronDown,
    faMessage,
    faCircleInfo,
    faUsers,
    faGear,
    faRightFromBracket,
    faXmark,
    faSun,
    faMoon,
    faList,
    faDiceD6,
    faLink,
} from "@fortawesome/free-solid-svg-icons"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Layout from "../components/Layout"
import { ThemeProvider } from "../context/themeContext"
import { AppProvider } from "context/appContext"
import { RoomProvider } from "context/roomContext"
import { SocketProvider } from "context/socketContext"

library.add(
    faPaperPlane,
    faArrowsRotate,
    faChevronDown,
    faMessage,
    faCircleInfo,
    faUsers,
    faGear,
    faRightFromBracket,
    faXmark,
    faSun,
    faMoon,
    faList,
    faDiceD6,
    faLink
)

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <RoomProvider>
                <ThemeProvider>
                    <SocketProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                        <ToastContainer />
                    </SocketProvider>
                </ThemeProvider>
            </RoomProvider>
        </AppProvider>
    )
}
