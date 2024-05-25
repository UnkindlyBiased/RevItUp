import { useDocumentTitle } from "@uidotdev/usehooks"
import { useSearchParams } from "react-router-dom"

import TwoLine from "@/components/generic/TwoLine"
import PostSearch from "@/components/pages/posts/PostSearch"
import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useSearchPosts } from "@/hooks/useGetPosts"

// TODO: fix spacing between first post and title of the page
function PostSearchPage(): React.ReactElement {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query')

    const { data: searchedPosts } = useSearchPosts(query || '')

    useDocumentTitle('REVITUP: Search posts')

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <TwoLine title="Post search result" description={`Search query: ${query}`} enlargedDesc />
                <PostSearch />
            </div>
            <div className="flex flex-col space-y-4">
                {searchedPosts?.map((post) => (
                    <PostPreviewComp key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default PostSearchPage