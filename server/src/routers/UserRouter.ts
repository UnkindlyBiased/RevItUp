import { Router } from 'express'
import UserController from '../controllers/UserController'

const UserRouter = Router()

UserRouter.get('/', UserController.getUsers)
UserRouter.get('/:username', UserController.getUserByName)
UserRouter.post('/', UserController.create)
UserRouter.put('/', UserController.update)
UserRouter.delete('/', UserController.delete)

export default UserRouter