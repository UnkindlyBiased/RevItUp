import CategoryShortDto from "../categories/CategoryShortDto"

export default interface PostPreviewDto {
    id: string
    postTitle: string
    previewText: string
    imageLink: string
    postLink: string
    category: CategoryShortDto
}