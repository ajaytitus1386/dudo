import React from "react"

const Username: React.FC<{ username: string; classname: string }> = ({
    username,
    classname,
}) => {
    return (
        <text
            className={[
                "block overflow-hidden text-ellipsis whitespace-nowrap max-w-[96px]",
                classname,
            ].join(" ")}
        >
            {username}
        </text>
    )
}

export default Username
