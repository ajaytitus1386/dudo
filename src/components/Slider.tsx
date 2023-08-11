import React from "react"
import sliderStyles from "../styles/slider.module.css"

interface Props extends React.HTMLProps<HTMLInputElement> {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    valueProgess: number
    sliderFocused: boolean
    setSliderFocused: React.Dispatch<React.SetStateAction<boolean>>
    valueLabel?: string
}

const Slider: React.FC<Props> = ({
    value,
    setValue,
    valueProgess,
    sliderFocused,
    setSliderFocused,
    valueLabel,
    min,
    max,
    step,
}) => {
    return (
        <div className="relative">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                step={step}
                onMouseOver={() => setSliderFocused(true)}
                onMouseOut={() => setSliderFocused(false)}
                onFocus={() => setSliderFocused(true)}
                onBlur={() => setSliderFocused(false)}
                onTouchStart={() => setSliderFocused(true)}
                onTouchEnd={() => setSliderFocused(false)}
                className={[
                    // The thumb is invisible and the label acts as the thumb
                    `${sliderStyles.sliderThumb}`,
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
                    left: `${valueProgess}%`,
                    transform: `translateY(-50%) translateX(-${valueProgess}%)`,
                }}
            >
                {valueLabel || value}
            </label>
        </div>
    )
}

export default Slider
