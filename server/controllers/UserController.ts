import { Request, Response } from 'express'
import UserService from '../services/UserService'
import { mapUserToFullDto, mapUserToPreviewDto } from '../models/dto/UserDto'

class UserController {
    async getUsers(req: Request, res: Response) {
        const users = await (await UserService.getUsers()).map(user => mapUserToPreviewDto(user))
        res.json(users)
    }
    async getUserById(req: Request, res: Response) {
        const {id} = req.params
        const user = await UserService.getUserById(Number(id))
        const dto = await mapUserToFullDto(user!)
        res.json(dto)
    }
    async addUser(req: Request, res: Response) {
        let newUser = null 
        try {
            newUser = await UserService.addUser(req.body)
            res.json(newUser)
        } catch(e) {
            res.json(e)
        }
    }
}

export default new UserController()