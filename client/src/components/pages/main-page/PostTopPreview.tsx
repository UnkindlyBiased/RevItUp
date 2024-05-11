import { Link } from "react-router-dom";

import PostPreview from "@/types/data/posts/PostPreview";
import MainTitle from "../posts/MainTitle";
import CategoryWithLink from "@/components/generic/category/CategoryLink";

function PostTopPreview({ post }: { post: PostPreview }): React.ReactElement {
    return (
        <div className="flex flex-col space-y-2 w-[65%]">
            <img className="w-[75%] rounded-md" src={post.imageLink} />
            <CategoryWithLink category={post.category} isLinkable />
            <Link to={`/news/${post.postLink}`}>
                <MainTitle className="text-6xl">{post.postTitle}</MainTitle>
            </Link>
            <span className="text-lg">{post.previewText}</span>
        </div>
    )
}

export default PostTopPreview