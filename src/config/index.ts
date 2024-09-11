import envVar from './envVar';
import z from 'zod';
export const { PORT, JWT_SECRET, NODE_ENV, BASE, ...DB_INFO } = envVar.parse(
    process.env,
);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVar> {}
    }
}
export const ABORT_DELAY = 10000;

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
