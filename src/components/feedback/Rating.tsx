import { faFaceFrown, faFaceSmile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import ratingStyles from "../../styles/rating.module.css"

const Rating = () => {
    const [rating, setRating] = useState(5)
    const [sliderFocused, setSliderFocused] = useState(false)

    const ratingPercentage = (rating / 10) * 100
    return (
        <div className="flex gap-x-2 justify-center items-center">
            <FontAwesomeIcon
                icon={faFaceFrown}
                className="text-negative-light dark:text-negative-dark text-lg"
            />
            <div className="relative">
                <input
                    type="range"
                    min={0}
                    max={10}
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    step={1}
                    onMouseOver={() => setSliderFocused(true)}
                    onMouseOut={() => setSliderFocused(false)}
                    onFocus={() => setSliderFocused(true)}
                    onBlur={() => setSliderFocused(false)}
                    onTouchStart={() => setSliderFocused(true)}
                    onTouchEnd={() => setSliderFocused(false)}
                    className={[
                        // The thumb is invisible and the label acts as the thumb
                        `${ratingStyles.ratingSliderThumb}`,
                        `w-full h-2 transition-colors duration-300 ease-in-out rounded-lg appearance-none cursor-pointer`,
                        `bg-background-light-500 dark:bg-background-dark-500`,
                    ].join(" ")}
                />
                <label
                    className={[
                        `absolute top-1/2 text-center rounded-full pointer-events-none text-text-dark-500 dark:text-primary-light-500 bg-primary-light-500 dark:bg-background-light-100`,
                        sliderFocused ? "text-sm" : "text-[0]",
                        sliderFocused ? "w-6 h-6" : "w-5 h-5",
                        `transition-all duration-200 ease-in-out`,
                    ].join(" ")}
                    style={{
                        left: `${ratingPercentage}%`,
                        transform: `translateY(-50%) translateX(-${ratingPercentage}%)`,
                    }}
                >
                    {rating}
                </label>
            </div>
            <FontAwesomeIcon
                icon={faFaceSmile}
                className="text-positive-light dark:text-positive-dark text-lg"
            />
        </div>
    )
}

export default Rating
