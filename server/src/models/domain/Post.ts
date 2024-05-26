import CategoryShortDto from "../dto/categories/CategoryShortDto"
import UserShortDto from "../dto/users/UserShortDto"

export default interface PostModel {
    id: string
    postTitle: string
    previewText: string
    text: string
    imageLink: string
    postLink?: string
    creationDate: Date
    views: number
    author: UserShortDto
    category: CategoryShortDto
}