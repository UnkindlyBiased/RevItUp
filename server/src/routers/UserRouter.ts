import { Router } from 'express'
import UserController from '../controllers/UserController'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'

const UserRouter = Router()

// * CRUD routes
UserRouter.get('/', UserController.getUsers)
UserRouter.get("/by-id/:id", UserController.getUserById)
UserRouter.get('/:username', UserController.getUserByName)
UserRouter.put('/', UserController.update)
UserRouter.delete('/', authMiddleware, UserController.delete)

export default UserRouter