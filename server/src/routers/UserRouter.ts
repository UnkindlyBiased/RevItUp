import { Router } from 'express'
import UserController from '../controllers/UserController'

const UserRouter = Router()

UserRouter.get('/', UserController.getUsers)

export default UserRouter