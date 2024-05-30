import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

import PostPreview from "@/types/data/posts/PostPreview"
import MainTitle from "../MainTitle"
import CategoryWithLink from "@/components/generic/category/CategoryLink"
import PostStatistics from "../PostStatistics"
import SuspendedImage from "@/components/generic/misc/SuspendedImage"

function PostPreviewComp({ post }: { post: PostPreview }): React.ReactElement {
    return (
        <div className="flex items-center space-x-4 w-[75%] min-h-44">
            <SuspendedImage className="w-60 rounded-md" src={post.imageLink} loadingComp={
                <Skeleton className="w-96 rounded-md h-32 opacity-25" />
            } />
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4 size-fit">
                    <CategoryWithLink category={post.category} isLinkable />
                    <PostStatistics views={post.views} />
                </div>
                <Link to={`/news/${post.postLink}`}>
                    <MainTitle className="text-4xl" children={post.postTitle} />
                </Link>
                <span children={post.previewText} />
            </div>
        </div>
    )
}

export default PostPreviewComp