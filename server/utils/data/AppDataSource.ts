import { DataSource } from "typeorm";
import env from "../EnvSchema";

const PgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: env.PG_USERNAME,
    password: env.PG_PASSWORD,
    port: env.PG_PORT || 5432,
    database: 'revitup_db',
    entities: [__dirname + '/../../src/models/entity/postgre/*Entity.ts'],
    synchronize: true,
    logging: false
})

export { PgDataSource }