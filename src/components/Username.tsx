import React from "react"

const Username: React.FC<{ username: string; className: string }> = ({
    username,
    className,
}) => {
    return (
        <text
            className={[
                "block overflow-hidden text-ellipsis whitespace-nowrap max-w-[96px]",
                className,
            ].join(" ")}
        >
            {username}
        </text>
    )
}

export default Username
