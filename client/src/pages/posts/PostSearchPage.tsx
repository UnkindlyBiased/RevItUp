import { useDocumentTitle } from "@uidotdev/usehooks"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import TwoLine from "@/components/generic/misc/TwoLine"
import PostSearch from "@/components/pages/posts/PostSearch"
import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useSearchPosts } from "@/hooks/useGetPosts"
import Loading from "@/components/generic/misc/Loading"
import NotFound from "@/components/generic/misc/NotFound"
import PaginationContextProps from "@/types/page/PaginationProps"
import { PaginationProvider } from "@/providers/PaginationProvider"
import PaginationRow from "@/components/generic/misc/PaginationRow"
import splitRequests from "@/utils/HelperFuncs"
import TakeButton from "@/components/generic/misc/input/TakeButton"

function PostSearchPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Search posts')

    const [take, setTake] = useState('5')
    const takeArr = ['5', '10', '15']

    const [searchParams, setSearchParams] = useSearchParams({
        page: '1',
        take
    })
    const query = searchParams.get('query') || ''

    const { data: searchedData } = useSearchPosts(splitRequests([
        { key: 'query', value: searchParams.get('query') || '' },
        { key: 'page', value: searchParams.get('page') },
        { key: 'take', value: searchParams.get("take") }
    ], '&'))

    useEffect(() => {
        const currentPage = searchParams.get('page') || '1';

        if ((searchedData && Number(currentPage) > searchedData.maxPage) || 
                (take !== searchParams.get('take'))) {
            setSearchParams({ page: '1', take, query })
        }
    }, [take, query, setSearchParams, searchParams, searchedData])

    const providerValue: PaginationContextProps = {
        page: searchedData?.page || 1,
        take: Number(searchParams.get('take') || take),
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