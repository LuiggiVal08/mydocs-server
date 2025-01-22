import type { Dialect } from 'sequelize';

interface ConfigConn {
    dialect: Dialect;
    storage: string;
}

interface ConnectionDB {
    development: ConfigConn;
    test: ConfigConn;
    production: ConfigConn;
}
