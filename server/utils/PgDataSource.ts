import { DataSource } from 'typeorm'
import 'reflect-metadata'

const PgDataSource = new DataSource({
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PW,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB_NAME,
    synchronize: true
})

export default PgDataSource