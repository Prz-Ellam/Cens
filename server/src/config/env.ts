import dotenv from 'dotenv';
import convict from 'convict';

dotenv.config({
    path: process.env.NODE_ENV === 'testing' ? '.env.test' : '.env',
});

const env = convict({
    server: {
        port: {
            doc: 'The port number on which the server will listen.',
            format: 'port',
            default: 3000,
            env: 'PORT',
        },
        env: {
            doc: 'Type of environment',
            format: String,
            default: 'development',
            env: 'NODE_ENV',
        },
    },
    db: {
        connection: {
            doc: 'The type of database dialect.',
            format: ['mysql', 'mssql', 'postgres', 'sqlite', 'oracle'],
            default: 'mysql',
            env: 'DB_CONNECTION',
        },
        host: {
            doc: 'The IP address or hostname of the database instance.',
            format: '*',
            default: '127.0.0.1',
            env: 'DB_HOST',
        },
        port: {
            doc: 'The port number of the database instance.',
            format: 'port',
            default: 3306,
            env: 'DB_PORT',
        },
        database: {
            doc: 'The name of the database schema.',
            format: String,
            default: 'cens',
            env: 'DB_DATABASE',
        },
        username: {
            doc: 'The username used to connect to the database.',
            format: String,
            default: 'root',
            env: 'DB_USERNAME',
        },
        password: {
            doc: 'The password for the database user.',
            format: String,
            default: '',
            env: 'DB_PASSWORD',
        },
    },
    jwt: {
        secret: {
            doc: 'The secret key used to sign JSON Web Tokens (JWT).',
            format: String,
            default: '1',
            env: 'JWT_SECRET',
        },
    },
});

env.validate();

export { env };
