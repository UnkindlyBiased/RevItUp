import { cn } from "@/lib/utils"

import { useGetSchema } from "@/hooks/useColorMode"
import HeaderNavLink from "./inner/HeaderNavLink"
import Logo from "../../generic/misc/Logo"
import ThemeSwitch from "./inner/ThemeSwitch"
import UserDropdown from "./inner/DropdownMenu"
import useUserStore from "@/store/UserStore"

function Header(): React.ReactElement {  
    const schema = useGetSchema()
    const user = useUserStore(state => state.user)

    return (
        <header className={cn('h-16 px-8 sticky top-0 text-white flex items-center justify-between space-x-8', schema.primaryBgColor)}>
            <div className="flex space-x-8 items-center">
                <Logo className="w-48 md:w-52 md:hover:w-56 transition-all" />
                <div className="hidden lg:flex lg:items-center lg:space-x-7">
                    <HeaderNavLink link='/news'>News</HeaderNavLink>
                    <HeaderNavLink link='/sdfsdf'>Events</HeaderNavLink>
                    <HeaderNavLink link='/asdasd'>Threads</HeaderNavLink>
                    <HeaderNavLink link='/sdasd'>Drivers</HeaderNavLink>
                    <HeaderNavLink link='/categories'>Categories</HeaderNavLink>
                    { user?.role == 'admin' && <HeaderNavLink link='/admin'>Admin panel</HeaderNavLink> }
                </div>
            </div>
            <div className="flex items-center space-x-5">
                <ThemeSwitch />
                <UserDropdown />
            </div>
        </header>
    )
}

export default Header