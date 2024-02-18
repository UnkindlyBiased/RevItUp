import express from 'express'
import 'reflect-metadata'
import PgDataSource from './utils/PgDataSource.ts'
import PostRouter from './routes/PostRouter.ts'
import UserRouter from './routes/UserRouter.ts'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/posts', PostRouter)
app.use('/api/users', UserRouter)


async function startApp() {
    try {
        await PgDataSource.initialize()
        await PgDataSource.synchronize()
    } catch(e) {
        console.log(e)
    }
    app.listen(Number(process.env.APP_PORT), () => {
        console.log('Server is started')
    })
}

startApp()