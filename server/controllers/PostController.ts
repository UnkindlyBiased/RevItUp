import PostService from "../services/PostService.ts"
import { Request, Response } from 'express'
import { mapPostToFullDto, mapPostToPreviewDto } from "../models/dto/PostDto.ts"

class PostController {
    async getPosts(req: Request, res: Response) {
        let posts = (await PostService.getPosts()).map(post => mapPostToPreviewDto(post))
        res.send(posts)
    }
    async getPostById(req: Request, res: Response) {
        const {id} = req.params
        const post = await PostService.getPostById(Number(id))
        const dto = await mapPostToFullDto(post!)
        res.json(dto)
    }
    async addPost(req: Request, res: Response) {
        let newPost = null 
        try {
            newPost = await PostService.addPost(req.body)
            res.json(newPost)
        } catch(e) {
            res.json(e)
        }
    }
}

export default new PostController()