import PostService from "../../services/PostService"
import { PostEntity } from "../PostEntity"
import { UserEntity } from "../UserEntity"
import { PostPreviewDto, mapPostToPreviewDto } from "./PostDto"

export class UserPreviewDto {
    userName: string
    fullName: string
}

export class UserInfoDto extends UserPreviewDto {
    biography: string
    registationDate: Date
    authoredPosts: PostPreviewDto[]
}

export function mapUserToPreviewDto(user: UserEntity) {
    const dto: UserPreviewDto = {
        userName: user.userName,
        fullName: user.fullName!
    }
    return dto
}

export async function mapUserToFullDto(user: UserEntity) {
    const dto: UserInfoDto = {
        userName: user.userName,
        fullName: user.fullName!,
        biography: user.biography!,
        registationDate: user.registrationDate!,
        authoredPosts: (await PostService.getPostsByAuthor(user.id)).map(post => mapPostToPreviewDto(post))
    }
    return dto
}