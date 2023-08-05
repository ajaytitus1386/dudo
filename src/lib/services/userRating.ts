import { BACKEND_URL } from "../../constants/index"
import { USER_RATING_ROUTER } from "../../../dudo_submodules/constants/routes"

export const sendNewUserRating = async ({
    userId,
    rating,
    comment,
}: {
    userId: string
    rating: number
    comment: string | undefined
}) => {
    try {
        const res = await fetch(BACKEND_URL + USER_RATING_ROUTER.NEW, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, rating, comment }),
        })
        const msg = await res.json()
        return msg
    } catch (error) {
        return null
    }
}
