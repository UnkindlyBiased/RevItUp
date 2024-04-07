import { Outlet } from "react-router-dom"
import Header from "./header/Header"

function Container(): React.ReactElement {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                    <Outlet />
                </div>
                <div className="bg-slate-300 h-40 flex items-center">
                    <span>Hello</span>
                </div>
            </div>
        </>
    )
}

export default Container