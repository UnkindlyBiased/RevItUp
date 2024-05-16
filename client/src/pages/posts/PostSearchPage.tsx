import MainTitle from "@/components/pages/posts/MainTitle"
import PostSearch from "@/components/pages/posts/PostSearch"
import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useSearchPosts } from "@/hooks/useGetPosts"
import { useDocumentTitle } from "@uidotdev/usehooks"
import { useSearchParams } from "react-router-dom"

// TODO: fix spacing between first post and title of the page
function PostSearchPage(): React.ReactElement {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query')

    const { data: searchedPosts } = useSearchPosts(query || '')

    useDocumentTitle('REVITUP: Search posts')

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <div className="flex flex-col space-y-2">
                    <MainTitle className=" text-6xl">Post search result</MainTitle>
                    <span className="text-xl">Searched query: {searchParams.get('query')}</span>
                </div>
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