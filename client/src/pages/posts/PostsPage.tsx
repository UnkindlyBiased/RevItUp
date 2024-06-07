import { useDocumentTitle } from "@uidotdev/usehooks"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useGetPosts } from "@/hooks/useGetPosts"
import TopCategories from "@/components/pages/posts/TopCategories"
import PostSearch from "@/components/pages/posts/PostSearch"
import splitRequests from "@/utils/HelperFuncs"
import PaginationRow from "@/components/generic/misc/pagination/PaginationRow"
import Loading from "@/components/generic/misc/Loading"
import { PaginationProvider } from "@/providers/PaginationProvider"
import PaginationContextProps from "@/types/page/PaginationProps"
import TakeButtons from "@/components/generic/misc/pagination/TakeButtons"

/** 
 * Page for showing top-5 posts ordered by creation date (decreasing), 
 * new threads and posts search
 */
function PostsPage(): React.ReactNode {
    useDocumentTitle("REVITUP: Posts")
    
    const [searchParams, setSearchParams] = useSearchParams({
        page: '1', take: '5'
    })

    const { data: pagedData } = useGetPosts(splitRequests([
        { key: 'page', value: searchParams.get('page') },
        { key: 'take', value: searchParams.get("take") }
    ], '&'))

    useEffect(() => {
        const currentPage = searchParams.get('page') || '1'

        if (pagedData && (Number(currentPage) > pagedData.maxPage)) {
            setSearchParams({ 
                page: '1',
                take: searchParams.get('take') || '1'
            })
        }
    }, [searchParams, setSearchParams, pagedData])

    const providerValue: PaginationContextProps = {
        page: pagedData?.page || 1,
        take: searchParams.get('take') || '5',
        maxPage: pagedData?.maxPage || 1,
        setSearchParams
    }

    return (
        <PaginationProvider value={providerValue}>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between mb-3">
                    <TopCategories />
                    <div className="flex flex-col space-y-4">
                        <PostSearch />
                        <TakeButtons searchParams={searchParams} 
                            setSearchParams={setSearchParams} />
                    </div>
                </div>
                { pagedData ? (
                    <div className="space-y-2">
                        {pagedData.posts.map((post) => (
                            <PostPreviewComp key={post.id} post={post} />
                        ))}
                    </div>
                ) : <Loading /> }
                <PaginationRow />
            </div>
        </PaginationProvider>
    )
}

export default PostsPage