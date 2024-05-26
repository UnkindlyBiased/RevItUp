import { Link } from "react-router-dom"
import { Suspense } from "react"

import PostPreview from "@/types/data/posts/PostPreview"
import MainTitle from "../MainTitle"
import CategoryWithLink from "@/components/generic/category/CategoryLink"
import PostStatistics from "../PostStatistics"

function PostPreviewComp({ post }: { post: PostPreview }): React.ReactElement {
    return (
        <div className="flex items-center space-x-4 w-[75%]">
            <Suspense fallback={post.postTitle}>
                <img className="w-60 rounded-md" src={post.imageLink} />
            </Suspense>
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4 size-fit">
                    <CategoryWithLink category={post.category} isLinkable />
                    <PostStatistics views={post.views} />
                </div>
                <Link to={`/news/${post.postLink}`}>
                    <MainTitle className="text-4xl">{post.postTitle}</MainTitle>
                </Link>
                <span>{post.previewText}</span>
            </div>
        </div>
    )
}

export default PostPreviewComp