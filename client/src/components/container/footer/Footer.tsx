import { cn } from "@/lib/utils"
import { useGetSchema } from "@/hooks/useColorMode"
import { Suspense } from "react"
import SocialLinks from "./inner/SocialLinks"

function Footer(): React.ReactElement {
    const schema = useGetSchema()

    return (
        <>
            <div className={cn("h-20 flex items-center text-white px-7 sticky justify-between", schema.headerColor)}>
                <div className="flex items-center space-x-3">
                    <span className="font-medium text-lg">Created by:</span>
                    <Suspense>
                        <img className="w-80" src="/unkindlybiased.png" />
                    </Suspense>
                    <span>(Taras Blyznyuk)</span>
                </div>
                <SocialLinks />
            </div>
        </>
    )
}

export default Footer