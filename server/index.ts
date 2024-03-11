import express from 'express'
import 'reflect-metadata'
import { config } from 'dotenv'
import PgDataSource from './utils/AppDataSource'
import UserRouter from './src/routers/UserRouter'
import cors from 'cors'

config()

const app = express()

app.use(express.json())
app.use(cors({ 
    origin: 'http://localhost:5173' 
}))

app.use('/users', UserRouter)

async function startApp() {
    const port = Number(process.env.APP_PORT) || 5432
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