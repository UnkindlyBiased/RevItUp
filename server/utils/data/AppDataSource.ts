import { DataSource } from "typeorm";
import { config } from "dotenv";

config()

const PgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: process.env.PG_USERNAME || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    port: Number(process.env.PG_PORT) || 5432,
    database: 'RevItUpDb',
    entities: [__dirname + '/../../src/models/entity/postgre/*Entity.ts'],
    synchronize: true,
    logging: false
})

const MongoDataSource = new DataSource({
    type: "mongodb",
    host: 'localhost',
    port: Number(process.env.MONGO_PORT) || 27017,
    database: 'RevItUpDB',
    entities: [__dirname + '/../../src/models/entity/mongo/*Entity.ts'],
    synchronize: true,
    logging: false
})

export { PgDataSource, MongoDataSource }