import { Request, Response, NextFunction } from "express"
import PostService from "../services/PostService"

class PostController {
    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await PostService.getPosts()
            res.json(posts)
        } catch (e) {
            next(e)
        }
    }
}

export default new PostController()