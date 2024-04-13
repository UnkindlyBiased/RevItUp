import { Outlet } from "react-router-dom"
import Header from "./header/Header"
import Footer from "./footer/Footer"
import { useGetSchema } from "@/hooks/useColorMode"
import { cn } from "@/lib/utils"

function Container(): React.ReactElement {
    const schema = useGetSchema()

    return (
        <>
            <div className={cn("flex flex-col min-h-screen transition", 
                schema.bgColor, schema.defaultFontColor
            )}>
                <Header />
                <div className="flex-grow">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Container