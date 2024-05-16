import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'
import writerMiddleware from '../../utils/middlewares/misc/WriterMiddleware'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'

const CategoryRouter = Router()

CategoryRouter.get('/', CategoryController.getCategories)
CategoryRouter.get('/sorted', CategoryController.getCategoriesByPostsLengthSorted)
CategoryRouter.get('/:code', CategoryController.getByCategoryCode)
CategoryRouter.post('/', authMiddleware, writerMiddleware, CategoryController.create)

export default CategoryRouter