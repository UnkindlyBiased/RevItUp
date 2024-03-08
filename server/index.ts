import express from 'express'
import 'reflect-metadata'
import { config } from 'dotenv'
import PgDataSource from './utils/AppDataSource'
import { TestEntity } from './src/models/TestEntity'

config()

const app = express()

async function startApp() {
    try {
        await PgDataSource.initialize()
        await PgDataSource.synchronize()
        app.listen(Number(process.env.APP_PORT),() => {
            console.log('Yeppi')
        })
    } catch(e) {
        console.log(e)
    }
}

startApp()