import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { crossOrigin } from '@/config';
import logger from '@/config/logger';
import path from 'node:path';

const app = express();

app.use(express.json());
app.use(
    morgan('short', {
        stream: { write: (message) => logger.info(message.trim()) },
    }),
);
app.use(cookieParser());
app.disabled('x-powered-by');
app.use(
    cors({
        origin(requestOrigin, callback) {
            const ACCEPTED_ORIGINS = crossOrigin;
            if (!requestOrigin || requestOrigin === 'file://' || requestOrigin === undefined) {
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

// Función para agregar rutas de archivos estáticos de forma dinámica
function addStaticRoute(carpeta: string, ruta: string = `/${carpeta}`): void {
    app.use(ruta, express.static(path.join(__dirname, '../../public', carpeta)));
}
// Llamamos a la función para registrar las rutas
addStaticRoute('images'); // Ruta: /images
addStaticRoute('js'); // Ruta: /js
addStaticRoute('css'); // Ruta: /css
addStaticRoute('assets'); // Ruta: /assets

export default app;
