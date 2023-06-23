import { faDiceD6, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "components/Button"
import Hug from "components/Hug"
import React from "react"

type Props = {
    children: React.ReactNode
    setShowList: React.Dispatch<React.SetStateAction<boolean>>
    showList: boolean
}

const DiceInputWrapper: React.FC<Props> = ({
    children,
    setShowList,
    showList,
}) => {
    return (
        <Hug
            className={
                "flex-[2] grid grid-cols-2 auto-rows-fr px-4 py-2 h-full gap-4"
            }
        >
            {children}
            <Button
                onClick={() => setShowList((prev) => !prev)}
                className="order-last px-2 py-1 col-span-1 ml-auto font-bold"
            >
                {showList ? (
                    <FontAwesomeIcon
                        icon={faDiceD6}
                        className="text-text-light-100 dark:text-text-dark-500"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faList}
                        className="text-text-light-100 dark:text-text-dark-500"
                    />
                )}
            </Button>
            <Button className="order-last px-2 py-1 col-span-1 mr-auto text-text-light-100 dark:text-text-dark-500 font-medium w-24">
                Confirm
            </Button>
        </Hug>
    )
}

export default DiceInputWrapper
