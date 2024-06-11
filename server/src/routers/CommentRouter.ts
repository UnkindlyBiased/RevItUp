import { Router } from 'express'

import CommentController from '../controllers/CommentController'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'
import { commentValidation } from '../../utils/middlewares/validation/CommentValidation'
import { cacheMiddleware } from '../../utils/middlewares/cache/CacheMiddleware'
import validationResultMiddleware from '../../utils/middlewares/validation/ValidationResultMiddleware'

const CommentRouter = Router()

CommentRouter.get('/', cacheMiddleware('comments-test'), CommentController.getComments)
CommentRouter.get("/post/:id", CommentController.getCommentsForPost)
CommentRouter.get('/thread/:id', CommentController.getCommentsForThread)
CommentRouter.post('/post', authMiddleware, commentValidation, validationResultMiddleware, CommentController.createPostComment)
CommentRouter.post('/thread', authMiddleware, commentValidation, validationResultMiddleware, CommentController.createThreadComment)
CommentRouter.delete('/', CommentController.delete)

export default CommentRouter