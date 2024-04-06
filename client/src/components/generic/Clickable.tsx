import React from "react"

type ClickableProps = {
    children?: React.ReactNode,
    onClick?: () => void
}

function Clickable({ children, onClick }: ClickableProps): React.ReactElement {
    return (
        <>
            <div onClick={onClick} className="cursor-pointer">
                {children}
            </div>
        </>
    )
}

export default Clickable