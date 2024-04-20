import PostPreview from "@/types/data/posts/PostPreview"
import PostTitle from "../PostTitle"
import { Link } from "react-router-dom"
import { Suspense } from "react"

type PostPreviewCompProps = {
    post: PostPreview
}

function PostPreviewComp({ post }: PostPreviewCompProps): React.ReactElement {
    return (
        <div className="flex items-center space-x-4 w-[75%]">
            <Suspense fallback={post.postTitle}>
                <img className="w-60 rounded-md" src={post.imageLink} />
            </Suspense>
            <div className="flex flex-col space-y-3">
                <Link to={`/news/${post.postLink}`}>
                    <PostTitle className="text-4xl">
                        {post.postTitle}
                    </PostTitle>
                </Link>
                <span>{post.previewText}</span>
            </div>
        </div>
    )
}

export default PostPreviewComp