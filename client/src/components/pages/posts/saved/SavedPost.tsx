import PostPreview from "@/types/data/posts/PostPreview";
import PostPreviewComp from "../preview/PostPreview";
import { RemoveSavedButton } from "./SaveButtons";

function SavedPost({ post }: { post: PostPreview }): React.ReactElement {
    return (
        <div className="flex justify-between items-center">
            <PostPreviewComp post={post} />
            <RemoveSavedButton postId={post.id} />
        </div>
    )
}

export default SavedPost