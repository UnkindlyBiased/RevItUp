import { Router } from 'express'

import UserRouter from './UserRouter'
import AuthRouter from './AuthRouter'
import CountryRouter from './CountryRouter'
import PostRouter from './PostRouter'
import CommentRouter from './CommentRouter'
import CategoryRouter from './CategoryRouter'
import ThreadRouter from './ThreadRouter'
import ThreadCategoryRouter from './ThreadCategoryRouter'

const AppRouter = Router()

AppRouter.use('/users', UserRouter)
AppRouter.use('/auth', AuthRouter)
AppRouter.use('/countries', CountryRouter)
AppRouter.use('/posts', PostRouter)
AppRouter.use('/comments', CommentRouter)
AppRouter.use('/categories', CategoryRouter)
AppRouter.use('/threads', ThreadRouter)
AppRouter.use('/thread-categories', ThreadCategoryRouter)

export default AppRouter