import { cn } from "@/lib/utils"
import { useState } from "react"

type SuspendedImageProps = Partial<{
    className: string
    src: string
    loadingComp: React.ReactNode
}>

function SuspendedImage({ className, src, loadingComp }: SuspendedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <>
            {!isLoaded && loadingComp}
            <img 
                className={cn(className, !isLoaded && 'hidden')} 
                src={src}
                onLoad={() => setIsLoaded(true)} />
        </>
    )
}

export default SuspendedImage