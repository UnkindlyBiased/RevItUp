import { Router } from "express";

import UserController from "../controllers/UserController";
import { userValidation } from "../../utils/middlewares/validation/UserValidation";
import validationResultMiddleware from "../../utils/middlewares/validation/ValidationResultMiddleware";

const AuthRouter = Router()

AuthRouter.post('/register', userValidation, validationResultMiddleware, UserController.create)
AuthRouter.post('/login', UserController.login)
AuthRouter.post('/logout', UserController.logout)
AuthRouter.get('/activate/:link', UserController.activate)
AuthRouter.post('/refresh', UserController.refresh)

export default AuthRouter