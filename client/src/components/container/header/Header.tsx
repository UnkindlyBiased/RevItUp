import HeaderNavLink from "./HeaderNavLink"
import Logo from "./Logo"

function Header(): React.ReactElement {
    return (
        <>
            <header className="bg-light-theme-header h-16 px-8 sticky top-0 text-white flex items-center space-x-8">
                <Logo />
                <div className="flex space-x-6 items-center">
                    <HeaderNavLink children={'News'} />
                    <HeaderNavLink children={'Events'} />
                    <HeaderNavLink children={'Threads'} />
                    <HeaderNavLink children={'Drivers'} />
                    <HeaderNavLink children={'Categories'} />
                    <HeaderNavLink children={'Admin panel'} />
                </div>
            </header>
        </>
    )
}

export default Header