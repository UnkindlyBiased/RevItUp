import { Router } from 'express'
import UserController from '../controllers/UserController'

const UserRouter = Router()

// * CRUD routes
UserRouter.get('/', UserController.getUsers)
UserRouter.get('/:username', UserController.getUserByName)
UserRouter.put('/', UserController.update)
UserRouter.delete('/', UserController.delete)

export default UserRouter