import express from 'express'
import 'reflect-metadata'
import UserRouter from './routes/UserRoutes.ts'

const app = express()

app.use(express.json())
app.use('/users', UserRouter)



async function startApp() {
    app.listen(Number(process.env.APP_PORT), () => {
        console.log('Server is started')
    })
}

startApp()