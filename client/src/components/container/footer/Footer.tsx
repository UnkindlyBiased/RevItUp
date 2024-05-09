import { cn } from "@/lib/utils"
import { Suspense } from "react"

import { useGetSchema } from "@/hooks/useColorMode"
import SocialLinks from "./inner/SocialLinks"

function Footer(): React.ReactElement {
    const schema = useGetSchema()

    return (
        <footer className={cn("h-20 flex items-center text-white px-7 sticky justify-between", schema.primaryBgColor)}>
            <div className="flex items-center space-x-3">
                <span className="font-medium text-lg">Created by:</span>
                <Suspense>
                    <img className="w-80" src="/unkindlybiased.png" />
                </Suspense>
                <span>(Taras Blyzniuk)</span>
            </div>
            <SocialLinks />
        </footer>
    )
}

export default Footer