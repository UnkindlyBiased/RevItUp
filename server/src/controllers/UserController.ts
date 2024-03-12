import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"
import { ApiError } from "../../utils/ApiError"

class UserController {
    async getUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getUsers()
            res.send(users)
        } catch(e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
    async getUserByName(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.params
            const user = await UserService.getUserByName(username)
            res.send(user)
        } catch (e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
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
            res.status(201).send(user)
        } catch (e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, username, password, biography, emailAddress } = req.body
            const updatedUser = await UserService.update({
                id: Number(id),
                username,
                password,
                biography,
                emailAddress
            })
            res.status(201).send(updatedUser)
        } catch(e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
}

export default new UserController()