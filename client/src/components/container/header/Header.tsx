import { useColorMode } from "@/hooks/useColorMode"
import HeaderNavLink from "./inner/HeaderNavLink"
import Logo from "./inner/Logo"
import ThemeSwitch from "./inner/ThemeSwitch"
import { FaUser } from 'react-icons/fa6'

function Header(): React.ReactElement {  
    const bg = useColorMode() === 'light' ? 'bg-light-theme-header' : 'bg-dark-theme-header'

    return (
        <>
            <header className={`${bg} h-16 px-8 sticky top-0 text-white flex items-center justify-between space-x-8 transition-all`}>
                <div className="flex space-x-8 items-center">
                    <Logo />
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
                    <FaUser className=" size-6" />
                </div>
            </header>
        </>
    )
}

export default Header