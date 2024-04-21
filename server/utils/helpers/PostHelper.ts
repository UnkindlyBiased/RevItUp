import PostInputDto from "../../src/models/dto/posts/PostInputDto";
import PostUpdateDto from "../../src/models/dto/posts/PostUpdateDto";

class PostHelper {
    static trimPostData(postInput: PostInputDto | PostUpdateDto): void {
        postInput.postTitle = postInput.postTitle.trim()
        postInput.previewText = postInput.previewText.trim()
    }
    static putDashes(title: string) {
        const symbols = "!:,\"".split("")
        for (const symbol of symbols) {
            title = title.replace(symbol, "")
        }
        title = title.toLowerCase().split(" ").join('-')
        return title
    }
}

export default PostHelper