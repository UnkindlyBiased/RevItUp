import { Router } from 'express'

import UserRouter from './UserRouter'
import AuthRouter from './AuthRouter'
import CountryRouter from './CountryRouter'
import PostRouter from './PostRouter'
import CommentRouter from './CommentRouter'
import CategoryRouter from './CategoryRouter'
import ThreadRouter from './ThreadRouter'

const AppRouter = Router()

AppRouter.use('/users', UserRouter)
AppRouter.use('/auth', AuthRouter)
AppRouter.use('/countries', CountryRouter)
AppRouter.use('/posts', PostRouter)
AppRouter.use('/comments', CommentRouter)
AppRouter.use('/categories', CategoryRouter)
AppRouter.use('/threads', ThreadRouter)

export default AppRouter