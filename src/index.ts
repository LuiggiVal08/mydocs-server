import { createServer } from 'node:http';
import app from '@/app/app';
import router from '@/app/routes';
// import configSocket, { connSocket } from '@/services/socket';
import exposeHost from '@/services/exposeHost';
import { getServerAddresses } from './helpers/getServerAddress';

// Crea el servidor HTTP
const server = createServer(app);

// Configura el servidor de Socket.io
// const io = configSocket(server);

// Establece la conexión con el cliente
// io.on('connection', connSocket);

// Establece las rutas de la API

app.use('/api/', router);
// Exponer el servidor en las direcciones disponibles
export const serverListen = exposeHost(server, getServerAddresses());
export const serverApp = app;
