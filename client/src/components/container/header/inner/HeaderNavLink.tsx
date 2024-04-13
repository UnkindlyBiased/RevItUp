type HeaderNavLinkProps = {
    children?: React.ReactNode
}

function HeaderNavLink({ children }: HeaderNavLinkProps) {
    return (
        <>
            <span className="font-bold text-lg cursor-pointer hover:text-xl transition-all">
                {children}
            </span>
        </>
    )
}

export default HeaderNavLink