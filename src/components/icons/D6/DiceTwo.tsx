import React from "react"

const DiceTwo = ({ className }: { className: string }) => {
    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 448 448"
            className={[
                "fill-text-light-500 dark:fill-text-dark-500",
                className,
            ].join(" ")}
        >
            <path
                d="M0,448V0h448v448H0z M352,320c0-17.7-14.3-32-32-32s-32,14.3-32,32s14.3,32,32,32S352,337.7,352,320z M128,160
	c17.7,0,32-14.3,32-32s-14.3-32-32-32s-32,14.3-32,32S110.3,160,128,160z"
            />
        </svg>
    )
}

export default DiceTwo
