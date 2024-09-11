import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { crossOrigin } from '@/config/';
import logger from '@/config/logger';

const app = express();

app.use(
    morgan('dev', {
        stream: { write: (message) => logger.info(message.trim()) },
    }),
);
app.use(
    cors({
        origin(requestOrigin, callback) {
            const ACCEPTED_ORIGINS = crossOrigin;
            if (!requestOrigin) {
                return callback(null, true);
            } else if (ACCEPTED_ORIGINS.includes(requestOrigin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowend By Origin'));
            }
        },
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());
app.disable('x-powered-by');

export default app;
