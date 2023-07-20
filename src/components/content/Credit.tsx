import React from "react"

const Credit = () => {
    return (
        <>
            <text className="text-text-light-500 dark:text-text-dark-500 text-center">
                Made with Passion by{" "}
                <a
                    className="font-medium"
                    href="https://ajaytitus.com"
                    target="_blank"
                >
                    Ajay Titus.
                </a>
            </text>
            <text className="text-text-light-500 dark:text-text-dark-500 text-center">
                Feel free to send feedback to{" "}
                <a
                    href="mailto:ajaytitus1386@gmail.com"
                    className="font-medium"
                >
                    {"ajaytitus1386@gmail.com"}
                </a>
            </text>
            {/* <text>
                Consider filling out this survey to help me improve the game!
            </text> */}
        </>
    )
}

export default Credit
