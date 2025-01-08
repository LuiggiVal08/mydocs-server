import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'node:http';

import logger from '@/config/logger';
import { corsConfig } from '@/config/cors';
import { NODE_ENV, routeStatic } from '@/constants';
import { addStaticRoute } from '@/helpers/addStaticRoute';
import router from '@/app/routes/index.routes';
import setupSockets from '@/app/socket';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cookieParser());
app.disabled('x-powered-by');
app.use(cors(corsConfig));
if (NODE_ENV !== 'test') app.use(morgan('dev', { stream: { write: (message) => logger.info(message.trim()) } }));
routeStatic.forEach((ruta) => addStaticRoute(app, ruta));
setupSockets(io);
app.use('/api/', router);

export { app, httpServer };
