import PostPreview from "@/types/data/posts/PostPreview";
import PostPreviewComp from "../preview/PostPreview";

function SavedPost({ post }: { post: PostPreview }): React.ReactElement {
    return (
        <div className="flex justify-between items-center">
            <PostPreviewComp post={post} />
            <span>Hello</span>
        </div>
    )
}

export default SavedPost