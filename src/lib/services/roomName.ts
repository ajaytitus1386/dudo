import { BACKEND_URL } from "../../constants/index"
import { ROOM_NAME_ROUTER } from "../../../dudo_submodules/constants/routes"

export const fetchRandomRoomName = async ({
    seed,
}: {
    seed: string | undefined
}) => {
    try {
        const res = await fetch(BACKEND_URL + ROOM_NAME_ROUTER.RANDOM({ seed }))
        const data = await res.json()
        if (!data || !data.roomName) throw new Error("No room name")
        const roomName = data.roomName
        return roomName
    } catch (error) {
        return null
    }
}
