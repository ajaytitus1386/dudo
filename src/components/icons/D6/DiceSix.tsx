import React from "react"

const DiceSix = ({ className }: { className: string }) => {
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
                d="M0,448V0h448v448H0z M160,128c0-17.7-14.3-32-32-32s-32,14.3-32,32s14.3,32,32,32S160,145.7,160,128z M128,256
	c17.7,0,32-14.3,32-32s-14.3-32-32-32s-32,14.3-32,32S110.3,256,128,256z M160,320c0-17.7-14.3-32-32-32s-32,14.3-32,32
	s14.3,32,32,32S160,337.7,160,320z M320,160c17.7,0,32-14.3,32-32s-14.3-32-32-32s-32,14.3-32,32S302.3,160,320,160z M352,224
	c0-17.7-14.3-32-32-32s-32,14.3-32,32s14.3,32,32,32S352,241.7,352,224z M320,352c17.7,0,32-14.3,32-32s-14.3-32-32-32
	s-32,14.3-32,32S302.3,352,320,352z"
            />
        </svg>
    )
}

export default DiceSix
