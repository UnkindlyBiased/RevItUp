import { Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
    async getUsers(req: Request, res: Response) {
        const users = await UserService.getUsers()
        res.json(users)
    }
    async getUserById(req: Request, res: Response) {
        const {id} = req.params
        const user = await UserService.getUserById(Number(id))
        res.json(user)
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