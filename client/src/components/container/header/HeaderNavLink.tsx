type HeaderNavLinkProps = {
    children?: React.ReactNode
}

function HeaderNavLink({ children }: HeaderNavLinkProps) {
    return (
        <>
            <span className="font-manrope font-bold text-lg cursor-pointer">
                {children}
            </span>
        </>
    )
}

export default HeaderNavLink