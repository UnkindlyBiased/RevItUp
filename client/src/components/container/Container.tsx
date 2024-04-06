import { Outlet } from "react-router-dom"
import Header from "./header/Header"

function Container(): React.ReactElement {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Container