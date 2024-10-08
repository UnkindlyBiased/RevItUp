import { Request, Response, NextFunction } from "express"

import UserService from "../services/UserService"
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes"
import TokenHelper from "../../utils/helpers/TokenHelper"
import PgUserRepository from "../repositories/implemented/postgre/PgUserRepository"
import { RequestWithBody, RequestWithParams } from "../../utils/types/DifferentiatedRequests"
import UserCreateDto from "../models/dto/users/UserCreateDto"
import UserEditDto from "../models/dto/users/UserEditDto"
import { ApiError } from "../../utils/errors/ApiError"
import UserUpdateLightDto from "../models/dto/users/UserUpdateLightDto"

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
    getUserByLink = async (req: RequestWithParams<{ link: string }>, res: Response, next: NextFunction) => {
        try {
            const user = await this.service.getUserByLink(req.params.link)

            return res.send(user)
        } catch (e) {
            next(e)
        }
    }
    getUserById = async (req: RequestWithParams<{ id: number }>, res: Response, next: NextFunction) => {
        try {
            const user = await this.service.getUserById(req.params.id)

            return res.send(user)
        } catch(e) {
            next(e)
        }
    }
    create = async (req: RequestWithBody<UserCreateDto>, res: Response, next: NextFunction) => {
        try {
            const user = await this.service.create(req.body)

            res.status(HttpStatusCodes.UPLOADED).send(user)
        } catch (e) {
            next(e)
        }
    }
    update = async (req: RequestWithBody<UserEditDto & { id: number }>, res: Response, next: NextFunction) => {
        try {
            const updatedUser = await this.service.update(req.body.id, req.body)
            res.status(HttpStatusCodes.UPLOADED).send(updatedUser)
        } catch(e) {
            next(e)
        }
    }
    updateLight = async (req: RequestWithBody<UserUpdateLightDto & { id: number }>, res: Response, next: NextFunction) => {
        try {
            if (Number(req.body.id) !== req.user.id) {
                throw ApiError.Forbidden("This account doesn't belong to you")
            }

            const user = await this.service.updateLight(req.body.id, req.body)
            return res.status(HttpStatusCodes.UPLOADED).send(user)
        } catch (e) {
            next(e)
        }
    }
    changePfp = async (req: RequestWithBody<{ id: number, pfp: Express.Multer.File }>, res: Response, next: NextFunction) => {
        try {
            if (req.user.id !== Number(req.body.id)) {
                throw ApiError.Forbidden("You're trying to change other account")
            }
            const image = req.file
            if (!image) {
                throw ApiError.NotFound('Profile picture was not given')
            }

            await this.service.changeProfilePicture({
                id: req.body.id,
                image,
                imageName: req.user.username
            })
            return res.send({ message: 'Image was uploaded successfully' })
        } catch(e) {
            next(e)
        }
    }
    delete = async (req: RequestWithBody<{ id: number, password: string }>, res: Response, next: NextFunction) => {
        try {
            await this.service.delete(req.body.id, req.body.password)

            res.status(HttpStatusCodes.DELETED).send()
        } catch (e) {
            next(e)
        }
    }
    login = async (req: RequestWithBody<{ username: string, password: string }>, res: Response, next: NextFunction) => {
        try {
            const userData = await this.service.login(req.body.username, req.body.password)

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
    activate = async (req: RequestWithParams<{ link: string }>, res: Response, next: NextFunction) => {
        try {
            await this.service.activate(req.params.link)

            return res.redirect(process.env.CLIENT_URL as string)
        } catch(e) {
            next(e)
        }
    }
    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies
            if (!refreshToken) {
                throw ApiError.Unauthorized('Refresh token is not valid')
            }
            
            const userData = await this.service.refresh(refreshToken)

            TokenHelper.putCookie(userData.tokens.refreshToken, res)
            res.send(userData)
        } catch(e) {
            next(e)
        }
    }
}

export default new UserController()