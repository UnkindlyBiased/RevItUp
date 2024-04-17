import { cn } from "@/lib/utils"
import { useGetSchema } from "@/hooks/useColorMode"
import { Suspense } from "react"

function Footer(): React.ReactElement {
    const schema = useGetSchema()

    return (
        <>
            <div className={cn("h-20 flex items-center text-white px-5", schema.headerColor)}>
                <div className="flex items-center space-x-3">
                    <span className="font-medium text-lg">Created by:</span>
                    <Suspense>
                        <img className="w-80" src="./unkindlybiased.png" />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default Footer