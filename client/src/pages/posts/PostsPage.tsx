import { useDocumentTitle } from "@uidotdev/usehooks"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useGetPosts } from "@/hooks/useGetPosts"
import TopCategories from "@/components/pages/posts/TopCategories"
import PostSearch from "@/components/pages/posts/PostSearch"
import splitRequests from "@/utils/HelperFuncs"
import PaginationRow from "@/components/generic/misc/PaginationRow"
import Loading from "@/components/generic/misc/Loading"
import { PaginationProvider } from "@/providers/PaginationProvider"
import PaginationContextProps from "@/types/page/PaginationProps"
import TakeButton from "@/components/generic/misc/input/TakeButton"

/** 
 * Page for showing top-5 posts ordered by creation date (decreasing), 
 * new threads and posts search
 */
function PostsPage(): React.ReactNode {
    useDocumentTitle("REVITUP: Posts")
    
    const [take, setTake] = useState('5')
    const takeArr = ['5', '10', '15']

    const [searchParams, setSearchParams] = useSearchParams({
        page: '1', take
    })

    const { data: pagedData } = useGetPosts(splitRequests([
        { key: 'page', value: searchParams.get('page') },
        { key: 'take', value: searchParams.get("take") }
    ], '&'))

    useEffect(() => {
        const currentPage = searchParams.get('page') || '1';

        if (take !== searchParams.get('take')) {
            setSearchParams({ page: '1', take });
        } else if (currentPage !== '1') {
            setSearchParams({ page: currentPage, take });
        }
    }, [take, setSearchParams, searchParams]);

    const providerValue: PaginationContextProps = {
        page: pagedData?.page || 1,
        take: Number(searchParams.get('take') || take),
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
                        <div className="flex space-x-2 justify-between items-center">
                            <span className="text-lg" children='Take amount ->' />
                            <div className="space-x-3">
                                {takeArr.map((takeNum, i) => (
                                    <TakeButton 
                                        className="size-10 rounded-md"
                                        children={takeNum}
                                        isChosen={take === takeNum}
                                        key={i}
                                        onClick={() => setTake(takeNum)} />
                                ))}
                            </div>
                        </div>
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