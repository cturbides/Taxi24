const process = require('process');
const path = require('path');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
    client: 'postgres',
    connection: {
        database: 'taxi24',
        host: 'database',
        user: DB_USER,
        password: DB_PASSWORD,
    },
    migrations: {
        directory: path.join(__dirname, 'migrations')
    },
    seeds: {
        directory: path.join(__dirname, 'seeds')
    }
};
