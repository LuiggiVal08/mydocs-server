import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import logger from '@/config/logger';
import { corsConfig } from '@/config/cors';
import { APP_SECRET, NODE_ENV, routeStatic } from '@/constants';
import { addStaticRoute } from '@/helpers/addStaticRoute';
import router from '@/app/routes/index.routes';
import setupSockets from '@/app/socket';
import csrf from '@/app/middlewares/csrf';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.disabled('x-powered-by');
if (NODE_ENV !== 'test') {
    app.use(morgan('dev', { stream: { write: (message) => logger.info(message.trim()) } }));
}
routeStatic.forEach((ruta) => {
    addStaticRoute(app, ruta);
});
setupSockets(io);
app.use('/api', express.json());
app.use('/api', express.urlencoded({ extended: true }));
app.use('/api', cookieParser(APP_SECRET));
app.use('/api', cors(corsConfig));
app.use('/api', csrf({ excludedRoutes: ['/api/login', '/api/logout', '/health'] }));
app.use('/api/', router);

export { app, httpServer };
