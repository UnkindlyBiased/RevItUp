import { DataSource } from "typeorm";
import env from "../EnvSchema";

const PgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: env.PG_USERNAME || 'postgres',
    password: env.PG_PASSWORD || 'postgres',
    port: env.PG_PORT || 5432,
    database: 'RevItUpDb',
    entities: [__dirname + '/../../src/models/entity/postgre/*Entity.ts'],
    synchronize: true,
    logging: false
})

const MongoDataSource = new DataSource({
    type: "mongodb",
    host: 'localhost',
    port: env.MONGO_PORT || 27017,
    database: 'RevItUpDB',
    entities: [__dirname + '/../../src/models/entity/mongo/*Entity.ts'],
    synchronize: true,
    logging: false
})

export { PgDataSource, MongoDataSource }