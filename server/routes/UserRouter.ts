import Router from 'express'
import UserController from '../controllers/UserController'

export const UserRouter = Router()

UserRouter.get('/', UserController.getUsers)
UserRouter.get('/:id', UserController.getUserById)

UserRouter.post('/', UserController.addUser)