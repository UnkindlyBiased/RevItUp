import express from 'express'
import 'reflect-metadata'
import { config } from 'dotenv'
import PgDataSource from './utils/AppDataSource'
import UserRouter from './src/routers/UserRouter'
config()

const app = express()

app.use(express.json())

app.use('/users', UserRouter)

async function startApp() {
    const port = Number(process.env.APP_PORT)
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