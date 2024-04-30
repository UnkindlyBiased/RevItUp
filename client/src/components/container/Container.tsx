import { Outlet } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

import Header from "./header/Header"
import Footer from "./footer/Footer"
import { useGetSchema } from "@/hooks/useColorMode"

function Container(): React.ReactElement {
    const schema = useGetSchema()

    const memoHeader = useMemo(() => <Header />, [])
    const memoFooter = useMemo(() => <Footer />, [])

    return (
        <div className={cn("flex flex-col min-h-screen transition", 
            schema.secondaryBgColor, schema.defaultFontColor
        )}>
            {memoHeader}
            <div className="flex-grow">
                <Outlet />
            </div>
            {memoFooter}
        </div>
    )
}

export default Container