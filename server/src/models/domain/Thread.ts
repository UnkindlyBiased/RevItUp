import ThreadCategoryDto from "../dto/threads/ThreadCategoryDto"
import UserShortDto from "../dto/users/UserShortDto"

export default interface ThreadModel {
    id: string
    threadTitle: string
    threadText: string
    threadLink?: string
    creationDate: Date
    views: number
    author: UserShortDto
    threadCategory: ThreadCategoryDto
}