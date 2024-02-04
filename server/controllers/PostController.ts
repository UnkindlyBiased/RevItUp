import PostService from "../services/PostService.ts"
import { Request, Response } from 'express'

class PostController {
    async getUsers(req: Request, res: Response) {
        const users = await PostService.getUsers()
        return res.json(users)
    }
}

export default new PostController()