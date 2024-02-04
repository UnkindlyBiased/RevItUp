import Router from 'express'

const UserRouter = Router()

UserRouter.get('/', async (req, res) => {
    res.send('working')
})

export default UserRouter