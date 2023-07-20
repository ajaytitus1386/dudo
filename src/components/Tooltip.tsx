import { Placement } from "@popperjs/core"
import React, { useState } from "react"
import { usePopper } from "react-popper"

interface Props {
    children: React.ReactNode
    className?: string
    tooltipContent: React.ReactNode
    tooltipPosition?: Placement
}

const Tooltip: React.FC<Props> = ({
    children,
    tooltipContent,
    className,
    tooltipPosition,
}) => {
    const [showTooltip, setShowTooltip] = useState(false)

    const [childElement, setChildElement] = useState<HTMLDivElement | null>(
        null
    )
    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(
        null
    )
    const [tooltipArrowElement, setTooltipArrowElement] =
        useState<HTMLDivElement | null>(null)

    const { styles, attributes } = usePopper(childElement, tooltipElement, {
        placement: tooltipPosition || "bottom",
        modifiers: [
            {
                name: "arrow",
                options: { element: tooltipArrowElement },
            },
        ],
    })

    const handleShowTooltip = () => setShowTooltip(true)
    const handleHideTooltip = () => setShowTooltip(false)

    return (
        <>
            <div
                ref={setChildElement}
                onMouseEnter={handleShowTooltip}
                onMouseLeave={handleHideTooltip}
                onFocus={handleShowTooltip}
                onBlur={handleHideTooltip}
                className={className}
            >
                {children}
            </div>
            {showTooltip && (
                <div
                    ref={setTooltipElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="bg-background-light-500 dark:bg-background-dark-500 text-text-light-500 dark:text-text-dark-500 rounded-lg shadow-lg p-2"
                >
                    {tooltipContent}
                    <div
                        ref={setTooltipArrowElement}
                        style={styles.arrow}
                        className="bg-background-light-500 dark:bg-background-dark-500"
                    />
                </div>
            )}
        </>
    )
}

export default Tooltip
