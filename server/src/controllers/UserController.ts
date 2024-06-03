import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes"
import TokenHelper from "../../utils/helpers/TokenHelper"
import { validationResult } from "express-validator"
import PgUserRepository from "../repositories/implemented/postgre/PgUserRepository"

class UserController {
    private readonly service: UserService

    constructor() {
        this.service = new UserService(new PgUserRepository())
    }

    getUsers = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.service.getUsers()
            return res.send(users)
        } catch(e) {
            next(e)
        }
    }
    getUserByName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username } = req.params
            const user = await this.service.getUserByName(username)

            return res.send(user)
        } catch (e) {
            next(e)
        }
    }
    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const user = await this.service.getUserById(Number(id))

            return res.send(user)
        } catch(e) {
            next(e)
        }
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return res.status(HttpStatusCodes.BAD_REQUEST).send({
                    message: "Validation of body has failed",
                    errorStack: result
                })
            }

            const { username, password, emailAddress, countryId } = req.body
            const user = await this.service.create({
                username,
                password,
                emailAddress,
                countryId: Number(countryId)
            })

            TokenHelper.putCookie(user.tokens.refreshToken, res)
            res.status(HttpStatusCodes.UPLOADED).send(user)
        } catch (e) {
            next(e)
        }
    }
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, username, password, biography, emailAddress } = req.body
            const updatedUser = await this.service.update(Number(id), {
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
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, password } = req.body
            const userToRemove = await this.service.delete(Number(id), password)

            res.send(userToRemove)
        } catch (e) {
            next(e)
        }
    }
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body
            const userData = await this.service.login(username, password)

            TokenHelper.putCookie(userData.tokens.refreshToken, res)
            res.send(userData)
        } catch(e) {
            next(e)
        }
    }
    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body
            await this.service.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.json({
                message: "Token is cleared",
                refreshToken
            })
        } catch(e) {
            next(e)
        }
    }
    activate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { link } = req.params
            await this.service.activate(link)

            return res.redirect(process.env.CLIENT_URL as string)
        } catch(e) {
            next(e)
        }
    }
    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies
            const userData = await this.service.refresh(refreshToken)

            TokenHelper.putCookie(userData.tokens.refreshToken, res)
            res.send(userData)
        } catch(e) {
            next(e)
        }
    }
}

export default new UserController()