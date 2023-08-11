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
    faCrown,
    faEllipsisVertical,
    faFaceSmile,
    faFaceFrown,
    faClipboardQuestion,
    faVolumeXmark,
    faVolumeLow,
    faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Layout from "../components/Layout"
import { ThemeProvider } from "../context/themeContext"
import { AppProvider } from "context/appContext"
import { RoomProvider } from "context/roomContext"
import { SocketProvider } from "context/socketContext"
import { GameProvider } from "context/gameContext"
import { ChatProvider } from "context/chatContext"
import { SoundProvider } from "context/soundContext"

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
    faLink,
    faCrown,
    faEllipsisVertical,
    faFaceSmile,
    faFaceFrown,
    faVolumeXmark,
    faVolumeLow,
    faVolumeHigh
)

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <RoomProvider>
                <SoundProvider>
                    <ChatProvider>
                        <GameProvider>
                            <ThemeProvider>
                                <SocketProvider>
                                    <Layout>
                                        <Component {...pageProps} />
                                    </Layout>
                                    <ToastContainer />
                                </SocketProvider>
                            </ThemeProvider>
                        </GameProvider>
                    </ChatProvider>
                </SoundProvider>
            </RoomProvider>
        </AppProvider>
    )
}
