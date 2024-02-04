import PostService from "../services/PostService.ts"

class PostController {
    async getUsers(req: Request, res: Response) {
        const users = await PostService.getUsers()
        return res.json()
    }
}

export default new PostController()