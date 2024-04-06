import { Router } from "express";
import UserController from "../controllers/UserController";

const AuthRouter = Router()

AuthRouter.post('/register', UserController.create)
AuthRouter.post('/login', UserController.login)
AuthRouter.post('/logout', UserController.logout)
AuthRouter.get('/activate/:link', UserController.activate)
AuthRouter.get('/refresh', UserController.refresh)

export default AuthRouter