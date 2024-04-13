import { Router } from "express";
import UserController from "../controllers/UserController";
import { userValidation } from "../../utils/middlewares/validation/UserValidation";

const AuthRouter = Router()

AuthRouter.post('/register', userValidation, UserController.create)
AuthRouter.post('/login', UserController.login)
AuthRouter.post('/logout', UserController.logout)
AuthRouter.get('/activate/:link', UserController.activate)
AuthRouter.get('/refresh', UserController.refresh)

export default AuthRouter