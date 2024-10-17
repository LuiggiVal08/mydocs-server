import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { crossOrigin } from '@/config/';
import logger from '@/config/logger';
import path from 'node:path';

const app = express();

app.use(
    morgan('dev', {
        stream: { write: (message) => logger.info(message.trim()) },
    }),
);
const publicPath = path.join(__dirname, '../../public');

app.use(express.static(publicPath));

app.use(
    cors({
        origin(requestOrigin, callback) {
            const ACCEPTED_ORIGINS = crossOrigin;
            // Aceptar aplicaciones Electron buildeadas (sin origen)
            if (!requestOrigin || requestOrigin === 'file://' || requestOrigin === undefined) {
                console.log({ requestOrigin });
                return callback(null, true); // Permitir acceso
            } else if (ACCEPTED_ORIGINS.includes(requestOrigin)) {
                return callback(null, true); // Permitir acceso si el origen es aceptado
            } else {
                return callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());
app.disable('x-powered-by');

export default app;
