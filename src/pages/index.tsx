import Image from "next/image"
import { Inter } from "next/font/google"
import DicePicker from "../components/dice/DicePicker"
import DiceList from "../components/dice/DiceList"
import ChatWindow from "../components/chat/ChatWindow"
import RoomDialogBox from "../components/index/RoomDialogBox"
import DiceTable from "../components/room/DiceTable"
import Hero from "../components/index/Hero"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center px-2 gap-y-2 ${inter.className}`}
        >
            <Hero />
            <RoomDialogBox />
        </main>
    )
}
