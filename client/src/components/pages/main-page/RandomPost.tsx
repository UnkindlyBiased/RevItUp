import { Link } from "react-router-dom"

import { useGetRandomPost } from "@/hooks/useGetPosts"
import Error from "@/components/generic/boundaries/Error"
import Loading from "@/components/generic/misc/Loading"
import RevitupLogo from "@/components/generic/misc/RevitupLogo"

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
            <RevitupLogo className="size-60" />
        </div>
    )
}

export default RandomPost