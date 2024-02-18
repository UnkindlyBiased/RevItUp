import { IUserPreviewDto } from "./UsersTypes"

export interface IPostPreviewDto {
    id: number,
    title: string,
    previewText: string,
    imageLink: string
}

export interface IFullPostDto extends IPostPreviewDto {
    postText: string,
    authorInfo: IUserPreviewDto
}