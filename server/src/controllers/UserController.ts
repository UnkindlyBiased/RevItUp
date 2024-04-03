import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"
import { ApiError } from "../../utils/errors/ApiError"
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes"

class UserController {
    async getUsers(_req: Request, res: Response, _next: NextFunction) {
        try {
            const users = await UserService.getUsers()
            res.status(HttpStatusCodes.SUCCESS).send(users)
        } catch(e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
    async getUserByName(req: Request, res: Response, _next: NextFunction) {
        try {
            const { username } = req.params
            const user = await UserService.getUserByName(username)
            res.status(HttpStatusCodes.SUCCESS).send(user)
        } catch (e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
    async create(req: Request, res: Response, _next: NextFunction) {
        try {
            const { username, password, emailAddress, country } = req.body
            const user = await UserService.register({
                username,
                password,
                emailAddress,
                country
            })
            res.status(HttpStatusCodes.UPLOADED).send(user)
        } catch (e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
    async update(req: Request, res: Response, _next: NextFunction) {
        try {
            const { id, username, password, biography, emailAddress } = req.body
            const updatedUser = await UserService.update(Number(id), {
                username,
                password,
                biography,
                emailAddress
            })
            res.status(HttpStatusCodes.UPLOADED).send(updatedUser)
        } catch(e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())
            }
        }
    }
    async delete(req: Request, res: Response, _next: NextFunction) {
        try {
            const { id } = req.body
            const userToRemove = await UserService.delete(Number(id))
            res.status(HttpStatusCodes.SUCCESS).send(userToRemove)
        } catch (e) {
            if (e instanceof ApiError) {
                res.status(e.status).send(e.showErrorData())    
            }
        }
    }
}

export default new UserController()