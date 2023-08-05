import Input from "components/Input"
import React from "react"

const Comment: React.FC<{
    commentString: string
    setCommentString: React.Dispatch<React.SetStateAction<string>>
}> = ({ commentString, setCommentString }) => {
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
