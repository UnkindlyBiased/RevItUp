import express from 'express'
import 'reflect-metadata'
import { config } from 'dotenv'
import { MongoDataSource, PgDataSource } from './utils/data/AppDataSource'
import UserRouter from './src/routers/UserRouter'
import cors from 'cors'
import CountryRouter from './src/routers/CountryRouter'
import errorMiddleware from './utils/middlewares/misc/ErrorMiddleware'
import cookieParser from 'cookie-parser'
import AuthRouter from './src/routers/AuthRouter'
import CommentRouter from './src/routers/CommentRouter'
import { connectToCacheClient } from './utils/data/RedisCacheClient'
import PostRouter from './src/routers/PostRouter'

config()

const app = express()

// * Third-party middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
    origin: 'http://localhost:4004',
    credentials: true
}))

// * Routers
app.use('/users', UserRouter)
app.use('/auth', AuthRouter)
app.use('/countries', CountryRouter)
app.use('/posts', PostRouter)
app.use('/comments', CommentRouter)

// * Error middleware (should be last)
app.use(errorMiddleware)

async function startApp() {
    const port = Number(process.env.APP_PORT) || 6006
    try {
        // * Connections to databases
        await PgDataSource.initialize()
        await PgDataSource.synchronize()

        await connectToCacheClient()

        await MongoDataSource.initialize()
        await MongoDataSource.synchronize()
        
        app.listen(port, () => {
            console.log(`App is started on port ${port}`)
        })
    } catch(e) {
        console.log(e)
    }
}

startApp()