import { useDocumentTitle } from "@uidotdev/usehooks"

import PostPreview from "@/components/pages/posts/preview/PostPreview"
import ContentBox from "@/hoc/ContentBox"
import { useGetPosts } from "@/hooks/useGetPosts"

function PostsPage(): React.ReactNode {
    const { data } = useGetPosts()

    useDocumentTitle("REVITUP: Posts")

    return (
        <ContentBox>
            <div className="flex justify-center items-center mb-3">
                <span className="text-xl">Place for top-rated categories</span>
            </div>
            {data?.map((post) => (
                <PostPreview key={post.id} post={post} />
            ))}
        </ContentBox>
    )
}

export default PostsPage