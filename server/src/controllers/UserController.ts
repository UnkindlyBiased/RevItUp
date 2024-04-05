import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes"
import TokenHelper from "../../utils/helpers/TokenHelper";

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

            TokenHelper.putCookie(user.tokens.refreshToken, res)
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
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body
            const userData = await UserService.login(username, password)

            TokenHelper.putCookie(userData.tokens.refreshToken, res)
            res.send(userData)
        } catch(e) {
            next(e)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body
            await UserService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.json({
                message: "Token is cleared",
                refreshToken
            })
        } catch(e) {
            next(e)
        }
    }
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const { link } = req.params
            await UserService.activate(link)

            return res.redirect(process.env.CLIENT_URL as string)
        } catch(e) {
            next(e)
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const userData = await UserService.refresh(refreshToken)

            TokenHelper.putCookie(userData.tokens.refreshToken, res)
            res.send(userData)
        } catch(e) {
            next(e)
        }
    }
}

export default new UserController()