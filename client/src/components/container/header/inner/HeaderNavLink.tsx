import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"

type HeaderNavLinkProps = {
    children?: React.ReactNode,
    link: string
}

function HeaderNavLink({ children, link }: HeaderNavLinkProps) {
    return (
        <>
            <NavLink to={link} className={({ isActive }) => cn(
                'font-bold text-lg cursor-pointer hover:text-xl transition-all',
                isActive && 'text-xl'
            )}>
                <span>{children}</span>
            </NavLink>
        </>
    )
}

export default HeaderNavLink