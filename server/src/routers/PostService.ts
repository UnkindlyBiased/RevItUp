import { Router } from 'express'
import PostController from '../controllers/PostController'

const PostRouter = Router()

PostRouter.get('/', PostController.getPosts)
PostRouter.get('/:id', PostController.getPostById)
PostRouter.delete("/", PostController.delete)

export default PostRouter