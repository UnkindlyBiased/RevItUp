import { Router } from 'express'
import CommentController from '../controllers/CommentController'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'
import { commentValidation } from '../../utils/middlewares/validation/CommentValidation'
import { cacheMiddleware } from '../../utils/middlewares/cache/CacheMiddleware'
import validationResultMiddleware from '../../utils/middlewares/validation/ValidationResultMiddleware'

const CommentRouter = Router()

CommentRouter.get('/', cacheMiddleware('comments-test'), CommentController.getComments)
CommentRouter.get("/post/:postId", CommentController.getCommentsForPost)
CommentRouter.post('/', authMiddleware, commentValidation, validationResultMiddleware, CommentController.create)

export default CommentRouter