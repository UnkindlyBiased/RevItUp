import { Router } from 'express'
import PostController from '../controllers/PostController'
import { cacheMiddleware } from '../../utils/middlewares/cache/TestCommentsCache'

const PostRouter = Router()

PostRouter.get('/', cacheMiddleware('posts-all'), PostController.getPosts)
PostRouter.get('/:link', PostController.getPostByLink)
PostRouter.delete("/", PostController.delete)

export default PostRouter