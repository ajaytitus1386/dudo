import React from "react"

const DiceThree = ({ className }: { className: string }) => {
    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 448 448"
            className={className}
        >
            <path
                d="M448,0H0v448h448V0z M128,96c17.7,0,32,14.3,32,32s-14.3,32-32,32s-32-14.3-32-32S110.3,96,128,96z M192,224
	c0-17.7,14.3-32,32-32s32,14.3,32,32s-14.3,32-32,32S192,241.7,192,224z M320,288c17.7,0,32,14.3,32,32s-14.3,32-32,32
	s-32-14.3-32-32S302.3,288,320,288z"
            />
        </svg>
    )
}

export default DiceThree
