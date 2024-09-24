import { Router } from 'express'
import PostController from '../controllers/PostController'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'
import writerMiddleware from '../../utils/middlewares/misc/WriterMiddleware'
import imageUploadMiddleware from '../../utils/middlewares/misc/ImageUploadMiddleware'

const PostRouter = Router()

PostRouter.get('/', PostController.getPosts)
PostRouter.get("/random", PostController.getRandomPost)
PostRouter.get("/search", PostController.search)
PostRouter.get('/saved', authMiddleware, PostController.getSavedPosts)
PostRouter.post('/exists', PostController.checkIfExistsByTitle)

PostRouter.get('/:link', PostController.getPostByLink)
PostRouter.get('/by-id/:id', PostController.getPostById)
PostRouter.get("/by-category/:code", PostController.getPostsByCategoryCode)
PostRouter.get('/by-auth/:authorId', PostController.getPostsByAuthorship)
PostRouter.post('/', authMiddleware, writerMiddleware, imageUploadMiddleware.single('postImage'), PostController.create)
PostRouter.put('/', authMiddleware, writerMiddleware, imageUploadMiddleware.single('postImage'),  PostController.update)
PostRouter.patch('/add-view', PostController.registerView)
PostRouter.delete('/', authMiddleware, PostController.delete)

PostRouter.post('/saved', authMiddleware, PostController.savePost)
PostRouter.delete('/saved', authMiddleware, PostController.removeSavedPost)
PostRouter.post('/saved/check', authMiddleware, PostController.checkIfSaved)

export default PostRouter