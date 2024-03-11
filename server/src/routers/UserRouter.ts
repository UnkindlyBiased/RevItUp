import { Router } from 'express'
import UserController from '../controllers/UserController'

const UserRouter = Router()

UserRouter.get('/', UserController.getUsers)
UserRouter.post('/', UserController.create)

export default UserRouter