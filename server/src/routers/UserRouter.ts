import { Router } from 'express'
import UserController from '../controllers/UserController'

const UserRouter = Router()

// * CRUD routes
UserRouter.get('/', UserController.getUsers)
UserRouter.get('/detailed/:username', UserController.getUserByName)
UserRouter.post('/', UserController.create)
UserRouter.put('/', UserController.update)
UserRouter.delete('/', UserController.delete)

// * JWT routes
UserRouter.post('/login', UserController.login)
UserRouter.post('/logout', UserController.logout)
UserRouter.get('/activate/:link', UserController.activate)
UserRouter.get('/refresh', UserController.refresh)

export default UserRouter