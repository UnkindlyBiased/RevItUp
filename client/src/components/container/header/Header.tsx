import { cn } from "@/lib/utils"

import { useGetSchema } from "@/hooks/useColorMode"
import HeaderNavLink from "./inner/HeaderNavLink"
import Logo from "../../generic/Logo"
import ThemeSwitch from "./inner/ThemeSwitch"
import UserDropdown from "./inner/DropdownMenu"

function Header(): React.ReactElement {  
    const schema = useGetSchema()

    return (
        <>
            <header className={cn('h-16 px-8 sticky top-0 text-white flex items-center justify-between space-x-8', schema.headerColor)}>
                <div className="flex space-x-8 items-center">
                    <Logo className="w-52 hover:w-56 transition-all" />
                    <div className="flex space-x-7">
                        <HeaderNavLink children={'News'} />
                        <HeaderNavLink children={'Events'} />
                        <HeaderNavLink children={'Threads'} />
                        <HeaderNavLink children={'Drivers'} />
                        <HeaderNavLink children={'Categories'} />
                        <HeaderNavLink children={'Admin panel'} />
                    </div>
                </div>
                <div className="flex items-center space-x-5">
                    <ThemeSwitch />
                    <UserDropdown />
                </div>
            </header>
        </>
    )
}

export default Header