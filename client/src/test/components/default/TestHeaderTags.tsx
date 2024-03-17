type HeaderTextProps = {
    children: React.ReactNode,
    className?: string
}

function H1({children, className}: HeaderTextProps) {
    return (
        <h1 className={"font-bold text-3xl " + className}>
            {children}
        </h1>
    )
}

function H2({children, className}: HeaderTextProps) {
    return (
        <h2 className={"font-bold text-2xl " + className}>
            {children}
        </h2>
    )
}

function H3({children, className}: HeaderTextProps) {
    return (
        <h3 className={"font-bold text-xl " + className}>
            {children}
        </h3>
    )
}

export { H1, H2, H3 }