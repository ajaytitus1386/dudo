import React from "react"

const DiceOne = ({ className }: { className: string }) => {
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
            <path d="M448,0H0v448h448V0z M224,192c17.7,0,32,14.3,32,32s-14.3,32-32,32s-32-14.3-32-32S206.3,192,224,192z" />
        </svg>
    )
}

export default DiceOne
