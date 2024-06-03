import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

import { useGetRandomPost } from "@/hooks/useGetPosts"
import Error from "@/components/generic/boundaries/Error"
import Loading from "@/components/generic/misc/Loading"
import { useGetSchema } from "@/hooks/useColorMode"

function RandomPostLogo() {
    const schema = useGetSchema()

    return (
        <svg className={cn("size-60 stroke-gray-500 stroke-[15px] fill-transparent", schema.randomLogo)} style={{ strokeLinejoin: 'bevel', fillRule: 'evenodd' }} 
            xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
            <path d="M398.251,825.59L367.884,1172.7H1801.7l30.37-347.11H398.251ZM628.236,150.066L411.029,374.351H1940.97L1973.91-2.127H184.972l67.263,1001.27L9.772,2000.41H1812.06L1845,1623.94H301.705l177.961,224.28L687.454,999.143Z"/>
        </svg>
    )
}

function RandomPost(): React.ReactNode {
    const { data: randomPost, isError } = useGetRandomPost()

    if (!randomPost) return <Loading />
    
    if (isError) return <Error />

    return (
        <div className="px-8 py-7 flex items-center justify-between space-x-3 rounded-xl border-2 border-gray-500 size-fit">
            <div className="flex flex-col space-y-5 opacity-85">
                <span className="font-space-grotesk text-7xl tracking-tight">
                    Don't know which post to choose?
                </span>
                <div className="font-space-grotesk font-medium space-x-5">
                    <span className="text-6xl">
                        Choose 
                        <Link to={`/news/${randomPost.postLink}`} className="hover:text-7xl px-3 transition-all">THIS</Link>
                        post 
                    </span>
                    <span className="text-xl opacity-45">("{randomPost.postTitle}")</span>
                </div>
            </div>
            <RandomPostLogo />
        </div>
    )
}

export default RandomPost