import { Router } from 'express'
import CommentController from '../controllers/CommentController'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'
import { commentValidation } from '../../utils/middlewares/validation/CommentValidation'
import { testCommentsCache } from '../../utils/middlewares/cache/TestCommentsCache'

const CommentRouter = Router()

CommentRouter.get('/', testCommentsCache, CommentController.getComments)
CommentRouter.post('/', authMiddleware, commentValidation, CommentController.create)

export default CommentRouter