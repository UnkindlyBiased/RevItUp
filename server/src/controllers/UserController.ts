import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes"

class UserController {
    async getUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getUsers()
            res.send(users)
        } catch(e) {
            next(e)
        }
    }
    async getUserByName(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.params
            const user = await UserService.getUserByName(username)
            res.send(user)
        } catch (e) {
            next(e)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, emailAddress, country } = req.body
            const user = await UserService.register({
                username,
                password,
                emailAddress,
                country
            })

            res.cookie('refreshToken', user.tokens.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true 
            })
            res.status(HttpStatusCodes.UPLOADED).send(user)
        } catch (e) {
            next(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
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
            next(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body
            const userToRemove = await UserService.delete(Number(id))
            res.status(HttpStatusCodes.SUCCESS).send(userToRemove)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()