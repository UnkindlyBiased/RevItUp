import Router from 'express'
import PostController from '../controllers/PostController.ts'

const PostRouter = Router()

PostRouter.get('/', PostController.getUsers)

export default PostRouter