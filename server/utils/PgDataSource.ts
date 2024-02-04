import { DataSource } from 'typeorm'
import 'reflect-metadata'

const PgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'RevItUpDatabase',
    entities: [__dirname + '/..' + '/models/*Entity.{js,ts}']
})

export default PgDataSource