import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'

const CategoryRouter = Router()

CategoryRouter.get('/', CategoryController.getCategories)
CategoryRouter.get('/:code', CategoryController.getByCategoryCode)

export default CategoryRouter