import { Router } from 'express'

import UserController from '../controllers/UserController'
import authMiddleware from '../../utils/middlewares/misc/AuthMiddleware'
import imageUploadMiddleware from '../../utils/middlewares/misc/ImageUploadMiddleware'

const UserRouter = Router()

// * CRUD routes
UserRouter.get('/', UserController.getUsers)
UserRouter.get("/by-id/:id", UserController.getUserById)
UserRouter.get('/:link', UserController.getUserByLink)
UserRouter.put('/', authMiddleware, UserController.update)
UserRouter.put('/light', authMiddleware, UserController.updateLight)
UserRouter.patch('/pfp', authMiddleware, imageUploadMiddleware.single('pfp'), UserController.changePfp)
UserRouter.delete('/', authMiddleware, UserController.delete)

export default UserRouter