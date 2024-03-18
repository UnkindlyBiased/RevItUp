import { DataSource } from "typeorm";
import { config } from "dotenv";
import 'reflect-metadata'

config()

const PgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: process.env.PG_USERNAME || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    port: Number(process.env.PG_PORT) || 5432,
    database: 'RevItUpDB',
    entities: [__dirname + '/../../src/models/entity/*Entity.ts'],
    synchronize: true,
    logging: false,
    cache: true
})

export default PgDataSource