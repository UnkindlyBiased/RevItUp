import { Outlet } from "react-router-dom"
import NavButton from "./NavButton"

function TestHeader() {
    return (
        <>
            <header className="bg-white h-16 sticky top-0 shadow-lg">
                <div className="flex items-center w-full h-full px-6 space-x-6">
                    <NavButton link={'/'}>Default link</NavButton>
                    <NavButton link={'/users'}>Users</NavButton>
                </div>
            </header>
            <div className=" p-3">
                <Outlet />
            </div>
        </>
    )
}

export default TestHeader