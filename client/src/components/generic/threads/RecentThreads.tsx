import { useGetRecentThreads } from "@/hooks/useThreads"
import AppRoutes from "@/utils/enums/AppRoutes"
import { Link } from "react-router-dom"

function RecentThreads(): React.ReactNode {
    const { data } = useGetRecentThreads()
    
    return (
        <div className="flex flex-col w-[350px] space-y-3 h-fit">
            <div className="flex justify-end">
                <span className="text-xl font-medium" children='Recent threads' />
            </div>
            <div className="flex flex-col space-y-1">
                { data?.threads.length ? <>
                    { data.threads.map((thread, i) => (
                        <Link key={i} to={AppRoutes.OPENED_THREAD.replace(':link', thread.threadLink)} className="flex space-x-2 justify-end">
                            <span children={thread.threadTitle} />
                            <div className="w-[1px] h-6" style={{ backgroundColor: thread.threadCategory.threadCategoryColor }} />
                        </Link>
                    ))}
                </> : <span children='No threads are found' /> }
            </div>
        </div>
    )
}

export default RecentThreads