import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';
import Session from './entity/Session';
import User from './entity/User';

const appDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: true,
    entities: [User, Session],
    subscribers: [],
    migrations: [],
});

export default appDataSource;