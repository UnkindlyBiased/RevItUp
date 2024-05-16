import { useDocumentTitle } from "@uidotdev/usehooks"

import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useGetPosts } from "@/hooks/useGetPosts"
import TopCategories from "@/components/pages/posts/TopCategories"
import PostSearch from "@/components/pages/posts/PostSearch"

/** 
 * @description Page for showing top-5 posts ordered by creation date (decreasing), 
 * new threads and posts search
 */
function PostsPage(): React.ReactNode {
    const { data: posts } = useGetPosts()

    useDocumentTitle("REVITUP: Posts")

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-between mb-3">
                <TopCategories />
                <PostSearch />
            </div>
            {posts?.map((post) => (
                <PostPreviewComp key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostsPage