import { useDocumentTitle } from "@uidotdev/usehooks"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

import TwoLine from "@/components/generic/misc/TwoLine"
import PostSearch from "@/components/pages/posts/PostSearch"
import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useSearchPosts } from "@/hooks/useGetPosts"
import Loading from "@/components/generic/misc/Loading"
import NotFound from "@/components/generic/misc/NotFound"
import PaginationContextProps from "@/types/page/PaginationProps"
import { PaginationProvider } from "@/providers/PaginationProvider"
import PaginationRow from "@/components/generic/misc/pagination/PaginationRow"
import splitRequests from "@/utils/HelperFuncs"
import TakeButtons from "@/components/generic/misc/pagination/TakeButtons"

function PostSearchPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Search posts')

    const [searchParams, setSearchParams] = useSearchParams({
        page: '1', take: '5'
    })
    const query = searchParams.get('query') || ''

    const { data: searchedData } = useSearchPosts(splitRequests([
        { key: 'query', value: searchParams.get('query') || '' },
        { key: 'page', value: searchParams.get('page') },
        { key: 'take', value: searchParams.get("take") }
    ], '&'))

    useEffect(() => {
        const currentPage = searchParams.get('page') || '1'

        if (searchedData && (Number(currentPage) > searchedData.maxPage)) {
            setSearchParams({
                page: '1',
                take: searchParams.get('take') || '1',
                query
            })
        }
    }, [query, searchParams, setSearchParams, searchedData])

    const providerValue: PaginationContextProps = {
        page: searchedData?.page || 1,
        take: searchParams.get('take') || '5',
        query,
        maxPage: searchedData?.maxPage || 1,
        setSearchParams,
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
                <TwoLine title="Post search result" description={`Search query: ${query}`} enlargedDesc />
                <div className="flex flex-col space-y-4">
                    <PostSearch />
                    <TakeButtons searchParams={searchParams}
                        setSearchParams={setSearchParams} query={query} />
                </div>
            </div>
            { searchedData ? <>
                {searchedData.posts.length ? <>
                    <PaginationProvider value={providerValue}>
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-col space-y-4">
                                {searchedData.posts.map((post, i) => (
                                    <PostPreviewComp key={i} post={post} />
                                ))}
                            </div>
                            <PaginationRow />
                        </div>
                    </PaginationProvider>
                </> : <NotFound />}
            </> : <Loading /> }
        </div>
    )
}

export default PostSearchPage