import { faFaceFrown, faFaceSmile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { SetStateAction, useState } from "react"
import Slider from "components/Slider"

const Rating: React.FC<{
    rating: number
    setRating: React.Dispatch<SetStateAction<number>>
}> = ({ rating, setRating }) => {
    const [sliderFocused, setSliderFocused] = useState(false)

    const ratingPercentage = (rating / 10) * 100
    return (
        <div className="flex gap-x-2 justify-center items-center">
            <FontAwesomeIcon
                icon={faFaceFrown}
                className="text-negative-light dark:text-negative-dark text-lg"
            />
            <Slider
                value={rating}
                setValue={setRating}
                sliderFocused={sliderFocused}
                setSliderFocused={setSliderFocused}
                valueProgess={ratingPercentage}
                min={0}
                max={10}
                step={1}
            />
            <FontAwesomeIcon
                icon={faFaceSmile}
                className="text-positive-light dark:text-positive-dark text-lg"
            />
        </div>
    )
}

export default Rating
