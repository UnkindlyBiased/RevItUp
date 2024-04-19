import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { Link } from "react-router-dom"

type LogoProps = {
    isDark?: boolean,
    className?: string
}

function Logo({ isDark, className }: LogoProps): React.ReactElement {
    return (
        <>
            <Link to={'/'} className={className}>
                <Suspense fallback={'REVITUP logo'}>
                    <img src="/REVITUP_logo.png" className={cn(isDark && 'invert')} />
                </Suspense>
            </Link>
        </>
    )
}

export default Logo