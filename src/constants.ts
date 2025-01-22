import { config } from 'dotenv';
import envVar from '@/schemas/envVar';
import type { UserSocketMap } from '@/types/io';
import type { ConnectionDB } from '@/types/dbConn';

config();

export const { PORT, APP_SECRET, JWT_SECRET, JWT_REFRESH_SECRET, NODE_ENV, DATABASE_URL } = envVar.parse(process.env);
export const ABORT_DELAY = 10000;
export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '7d';
export const routeStatic = ['', 'images', 'assets', 'js', 'css'];
export const userSockets: UserSocketMap = {};
export const connDB: ConnectionDB = {
    development: {
        dialect: 'sqlite',
        storage: './dev-database.sqlite',
    },
    test: {
        dialect: 'sqlite',
        storage: ':memory:',
    },
    production: {
        dialect: 'mysql',
        storage: DATABASE_URL,
    },
};

export const crossOrigin = [
    'http://localhost:3300',
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:4173/',
    'http://localhost:4173/',
];

export const colors = {
    reset: '\x1b[0m',
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
};
