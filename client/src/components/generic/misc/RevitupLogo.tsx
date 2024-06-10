import { cn } from "@/lib/utils"

import { useGetSchema } from "@/hooks/useColorMode"

function RevitupLogo({ className, title }: { className?: string, title?: string }): React.ReactElement {
    const schema = useGetSchema()

    return (
        <div title={title}>
            <svg className={cn("stroke-gray-500 stroke-[15px] fill-transparent", schema.randomLogo, className)} style={{ strokeLinejoin: 'bevel', fillRule: 'evenodd' }} 
                xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
                <path d="M398.251,825.59L367.884,1172.7H1801.7l30.37-347.11H398.251ZM628.236,150.066L411.029,374.351H1940.97L1973.91-2.127H184.972l67.263,1001.27L9.772,2000.41H1812.06L1845,1623.94H301.705l177.961,224.28L687.454,999.143Z"/>
            </svg>
        </div>
    )
}

export default RevitupLogo