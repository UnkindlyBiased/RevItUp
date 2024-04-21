import { useGetSchema } from "@/hooks/useColorMode"
import { useGetRandomPost } from "@/hooks/useGetPosts"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { Link } from "react-router-dom"

function RandomPost(): React.ReactNode {
    const { data } = useGetRandomPost()
    const schema = useGetSchema()

    if (data) return (
        <div className={cn('px-8 py-7 flex items-center justify-between space-x-3 mx-12 mt-2 rounded-xl bg-gradient-to-r', schema.randomPostBgGradient)}>
            <div className="flex flex-col space-y-5">
                <span className="font-space-grotesk text-7xl opacity-85">
                    Don't know which post to choose?
                </span>
                <div className="font-space-grotesk font-medium">
                    <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500">
                        Choose 
                        <Link to={`/news/${data.postLink}`} className="hover:text-7xl px-3 transition-all">THIS</Link>
                        post 
                    </span>
                    <span className="text-xl pl-5 opacity-45">("{data.postTitle}")</span>
                </div>
            </div>
            <Suspense fallback={'Idk what to put here'}>
                <img src="/tonight.jpg" className="h-60 rounded-xl shadow-md"/>
            </Suspense>
        </div>
    )
}

export default RandomPost