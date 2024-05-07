import { useDocumentTitle } from "@uidotdev/usehooks"

import PostPreviewComp from "@/components/pages/posts/preview/PostPreview"
import { useGetPosts } from "@/hooks/useGetPosts"

function PostsPage(): React.ReactNode {
    const { data: posts } = useGetPosts()

    useDocumentTitle("REVITUP: Posts")

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-center items-center mb-3">
                <span className="text-xl">Place for top-rated categories</span>
            </div>
            {posts?.map((post) => (
                <PostPreviewComp key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostsPage