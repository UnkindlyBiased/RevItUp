import { DataSource } from "typeorm";
import { config } from "dotenv";
import 'reflect-metadata'

config()

const PgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
    database: 'RevItUpDB',
    entities: [__dirname + '/../src/models/*.ts'],
    synchronize: true,
    logging: false
})

export default PgDataSource