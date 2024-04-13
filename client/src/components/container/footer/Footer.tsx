import { cn } from "@/lib/utils"
import HeaderNavLink from "../header/inner/HeaderNavLink"
import { useGetSchema } from "@/hooks/useColorMode"

function Footer(): React.ReactElement {
    const schema = useGetSchema()

    return (
        <>
            <div className={cn("h-20 flex items-center text-white px-5", schema.headerColor)}>
                <HeaderNavLink>Hello</HeaderNavLink>
                <span className="ml-10 text-xl">This</span>
            </div>
        </>
    )
}

export default Footer