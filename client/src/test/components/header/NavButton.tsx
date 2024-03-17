import { NavLink } from "react-router-dom"

type NavButtonProps = {
    children: React.ReactNode,
    link: string
}

function NavButton({ children, link }: NavButtonProps) {
    return (
        <NavLink to={link} className={"bg-black px-3 py-2 text-white rounded-lg"}>
            {children}
        </NavLink>
    )
}

export default NavButton