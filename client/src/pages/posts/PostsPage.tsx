import { useDocumentTitle } from "@uidotdev/usehooks"

import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useGetPosts } from "@/hooks/useGetPosts"
import TopCategories from "@/components/pages/posts/TopCategories"

/** 
 * @description Page for showing top-5 posts ordered by creation date (decreasing), 
 * new threads and random post
 */
function PostsPage(): React.ReactNode {
    const { data: posts } = useGetPosts()

    useDocumentTitle("REVITUP: Posts")

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-center items-center mb-3">
                <TopCategories />
            </div>
            {posts?.map((post) => (
                <PostPreviewComp key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostsPage