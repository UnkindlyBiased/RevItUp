import { DataSource } from 'typeorm'
import 'reflect-metadata'

const PgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PW,
    database: process.env.POSTGRES_DB_NAME,
    entities: [__dirname + '/..' + '/models/*Entity.{js,ts}'],
    synchronize: true,
    logging: false
})

export default PgDataSource