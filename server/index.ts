import express from 'express'
import 'reflect-metadata'
import { config } from 'dotenv'
import { PgDataSource } from './utils/data/AppDataSource'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import errorMiddleware from './utils/middlewares/misc/ErrorMiddleware'
import { connectToCacheClient } from './utils/data/RedisCacheClient'
import env from './utils/EnvSchema'
import AppRouter from './src/routers/Routes'

config()

const app = express()

// * Third-party middlewares
app.use(express.json())
app.use(cookieParser())

app.use(cors({ 
    origin: env.CLIENT_URL ||'http://localhost:4004',
    credentials: true
}))

// * Routers
app.use(AppRouter)

// * Error middleware (should be last)
app.use(errorMiddleware)

async function startApp() {
    const PORT = env.APP_PORT || 6006
    try {
        // * Connections to databases
        await PgDataSource.initialize()
        await PgDataSource.synchronize()

        // await connectToCacheClient()
        
        app.listen(PORT, () => {
            console.log(`App is started on port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

startApp()