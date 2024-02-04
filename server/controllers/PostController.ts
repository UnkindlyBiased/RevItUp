import { it } from "node:test"
import { PostEntity } from "../models/PostEntity.ts"
import PostService from "../services/PostService.ts"
import { Request, Response } from 'express'

class PostController {
    async getPosts(req: Request, res: Response) {
        const users = await PostService.getPosts()
        res.json(users)
    }
    async getPostById(req: Request, res: Response) {
        const {id} = req.params
        const post = await PostService.getPostById(Number(id))
        res.json(post)
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