import { UserEntity } from "../UserEntity"
import { PostEntity } from "../PostEntity"
import UserService from "../../services/UserService"

export class PostPreviewDto {
    title: string
    previewText: string
    imageLink: string
}

export class FullPostDto extends PostPreviewDto {
    postText: string
    authorInfo: UserEntity
}

export function mapPostToPreviewDto(post: PostEntity) {
    const postInfo: PostPreviewDto = {
        title: post.title,
        previewText: post.previewText,
        imageLink: post.imageLink!
    }
    return postInfo
}

export async function mapPostToFullDto(post: PostEntity) {
    const info = await UserService.getUserById(post.id)
    const postDto: FullPostDto = {
        title: post.title,
        previewText: post.previewText,
        postText: post.postText,
        imageLink: post.imageLink!,
        authorInfo: info!
    }
    return postDto
}