import { UserEntity } from "../UserEntity"
import { PostEntity } from "../PostEntity"
import UserService from "../../services/UserService"
import { UserPreviewDto, mapUserToPreviewDto } from "./UserDto"

export class PostPreviewDto {
    id: number
    title: string
    previewText: string
    imageLink: string
}

export class FullPostDto extends PostPreviewDto {
    postText: string
    authorInfo: UserPreviewDto
}

export function mapPostToPreviewDto(post: PostEntity) {
    const postInfo: PostPreviewDto = {
        id: post.id,
        title: post.title,
        previewText: post.previewText,
        imageLink: post.imageLink!
    }
    return postInfo
}

export async function mapPostToFullDto(post: PostEntity) {
    const info = await UserService.getUserById(post.id)
    const postDto: FullPostDto = {
        id: post.id,
        title: post.title,
        previewText: post.previewText,
        postText: post.postText,
        imageLink: post.imageLink!,
        authorInfo: mapUserToPreviewDto(info!)
    }
    return postDto
}