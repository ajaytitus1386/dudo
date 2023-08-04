import Input from "components/Input"
import React, { useState } from "react"

const Comment = () => {
    const [commentString, setCommentString] = useState("")
    return (
        <Input
            type="textarea"
            value={commentString}
            onChange={(e) => setCommentString(e.target.value)}
            placeholder="Suggestions please!"
        />
    )
}

export default Comment
