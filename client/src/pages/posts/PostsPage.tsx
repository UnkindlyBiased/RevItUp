import { useDocumentTitle } from "@uidotdev/usehooks"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"

import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useGetPosts } from "@/hooks/useGetPosts"
import TopCategories from "@/components/pages/posts/TopCategories"
import PostSearch from "@/components/pages/posts/PostSearch"
import splitRequests from "@/utils/HelperFuncs"
import PaginationRow from "@/components/generic/misc/PaginationRow"
import Loading from "@/components/generic/misc/Loading"
import { PaginationProvider } from "@/providers/PaginationProvider"
import PaginationContextProps from "@/types/page/PaginationProps"

/** 
 * Page for showing top-5 posts ordered by creation date (decreasing), 
 * new threads and posts search
 */
function PostsPage(): React.ReactNode {
    useDocumentTitle("REVITUP: Posts")
    
    const [take] = useState('5')
    const [searchParams, setSearchParams] = useSearchParams({
        page: '1',
        take: '5'
    })
    const { data: pagedData } = useGetPosts(splitRequests([
        { key: 'page', value: searchParams.get('page') },
        { key: 'take', value: searchParams.get("take") }
    ], '&'))

    const providerValue: PaginationContextProps = {
        page: pagedData?.page || 1,
        take: Number(take),
        maxPage: pagedData?.maxPage || 1,
        setSearchParams,
    }

    return (
        <PaginationProvider value={providerValue}>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between mb-3">
                    <TopCategories />
                    <PostSearch />
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