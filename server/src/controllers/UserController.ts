import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"
import { ApiError } from "../../utils/ApiError"

class UserController {
    async getUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getUsers()
            res.send(users)
        } catch(e) {
            res.send(e)
            next(e)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, emailAddress } = req.body
            const user = await UserService.create({
                username,
                password,
                emailAddress
            })
            res.send(user)
        } catch (e) {
            if (e instanceof ApiError) {
                res.status(e.status).json({
                    status: e.status,
                    message: e.message
                })
            }
        }
    }
}

export default new UserController()