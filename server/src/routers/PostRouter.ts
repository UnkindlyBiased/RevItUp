import { Router } from 'express'
import PostController from '../controllers/PostController'
import { cacheMiddleware } from '../../utils/middlewares/cache/TestCommentsCache'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'

const PostRouter = Router()

PostRouter.get('/', cacheMiddleware('posts-all'), PostController.getPosts)
PostRouter.get("/random", PostController.getRandomPost)
PostRouter.get('/:link', PostController.getPostByLink)
PostRouter.get('/by-id/:id', PostController.getPostById)
PostRouter.post('/', authMiddleware, PostController.create)
PostRouter.delete('/', PostController.delete)

export default PostRouter