import express from 'express'
import 'reflect-metadata'
import { config } from 'dotenv'
import PgDataSource from './utils/data/AppDataSource'
import UserRouter from './src/routers/UserRouter'
import cors from 'cors'
import CountryRouter from './src/routers/CountryRouter'
import errorMiddleware from './utils/middlewares/ErrorMiddleware'

config()

const app = express()

app.use(express.json())
app.use(cors({ 
    origin: 'http://localhost:4004' 
}))

app.use('/users', UserRouter)
app.use('/countries', CountryRouter)

app.use(errorMiddleware)

async function startApp() {
    const port = Number(process.env.APP_PORT) || 8008
    try {
        await PgDataSource.initialize()
        await PgDataSource.synchronize()
        app.listen(port, () => {
            console.log(`App is started on port ${port}`)
        })
    } catch(e) {
        console.log(e)
    }
}

startApp()