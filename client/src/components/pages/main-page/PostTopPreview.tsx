import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

import PostPreview from "@/types/data/posts/PostPreview";
import MainTitle from "../posts/MainTitle";
import CategoryWithLink from "@/components/generic/category/CategoryLink";
import ReadableStats from "../../generic/misc/ReadableStats";
import SuspendedImage from "@/components/generic/misc/SuspendedImage";

function PostTopPreview({ post }: { post: PostPreview }): React.ReactElement {
    return (
        <div className="flex flex-col space-y-3 w-[65%]">
            <SuspendedImage className="w-[85%] h-max rounded-md" src={post.imageLink}
                loadingComp={
                    <Skeleton className="w-[85%] h-96 rounded-md" />
                } />
            <div className="flex items-center size-fit space-x-4">
                <CategoryWithLink category={post.category} isLinkable />
                <ReadableStats views={post.views} />
            </div>
            <Link to={`/news/${post.postLink}`}>
                <MainTitle className="text-6xl">{post.postTitle}</MainTitle>
            </Link>
            <span className="text-lg">{post.previewText}</span>
        </div>
    )
}

export default PostTopPreview