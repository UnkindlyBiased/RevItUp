import { Router } from 'express'
import PostController from '../controllers/PostController'
import { cacheMiddleware } from '../../utils/middlewares/cache/TestCommentsCache'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'
import writerMiddleware from '../../utils/middlewares/misc/WriterMiddleware'

const PostRouter = Router()

PostRouter.get('/', cacheMiddleware('posts-all'), PostController.getPosts)
PostRouter.get("/random", PostController.getRandomPost)
PostRouter.get("/search", PostController.search)
PostRouter.get('/saved', authMiddleware, PostController.getSavedPosts)
PostRouter.get('/:link', PostController.getPostByLink)
PostRouter.get('/by-id/:id', PostController.getPostById)
PostRouter.get("/by-category/:code", PostController.getPostsByCategoryCode)
PostRouter.get('/by-auth/:authorId', PostController.getPostsByAuthorship)
PostRouter.post('/', authMiddleware, writerMiddleware, PostController.create)
PostRouter.put('/', authMiddleware,  PostController.update)
PostRouter.delete('/', authMiddleware, PostController.delete)

PostRouter.post('/saved', authMiddleware, PostController.savePost)
PostRouter.delete('/saved', authMiddleware, PostController.removeSavedPost)
PostRouter.post('/saved/check', authMiddleware, PostController.checkIfSaved)

export default PostRouter