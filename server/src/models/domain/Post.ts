import CategoryShortDto from "../dto/categories/CategoryShortDto"
import UserShortDto from "../dto/users/UserShortDto"
import CategoryModel from "./Category"

export default interface PostModel {
    id: string
    postTitle: string
    previewText: string
    text: string
    imageLink: string
    postLink: string
    creationDate: Date
    author: UserShortDto
    category: CategoryShortDto
}