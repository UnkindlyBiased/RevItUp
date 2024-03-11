import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"

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
}

export default new UserController()