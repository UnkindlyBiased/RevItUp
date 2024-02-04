import Router from 'express'
import PostController from '../controllers/PostController.ts'

const PostRouter = Router()

PostRouter.get('/', PostController.getPosts)
PostRouter.get('/:id', PostController.getPostById)
PostRouter.post('/', PostController.addPost)

export default PostRouter