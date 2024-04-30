import { Router } from 'express'
import PostController from '../controllers/PostController'
import { cacheMiddleware } from '../../utils/middlewares/cache/TestCommentsCache'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'
import writerMiddleware from '../../utils/middlewares/misc/WriterMiddleware'

const PostRouter = Router()

PostRouter.get('/', cacheMiddleware('posts-all'), PostController.getPosts)
PostRouter.get("/random", PostController.getRandomPost)
PostRouter.get("/search", PostController.search)
PostRouter.get('/:link', PostController.getPostByLink)
PostRouter.get('/by-id/:id', PostController.getPostById)
PostRouter.post('/', authMiddleware, writerMiddleware, PostController.create)
PostRouter.put('/', authMiddleware,  PostController.update)
PostRouter.delete('/', authMiddleware, PostController.delete)

export default PostRouter