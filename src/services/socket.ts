// socket.ts

import {
    Server as PropSever,
    IncomingMessage,
    ServerResponse,
} from 'node:http';
import { Server, Socket } from 'socket.io';
import { crossOrigin } from '@/config/';
import { io } from '@/';
import logger from '@/config/logger';
// const { cyan, reset } = colors;
const configSocket = (
    server: PropSever<typeof IncomingMessage, typeof ServerResponse>,
) => {
    return new Server(server, {
        cors: {
            origin: crossOrigin,
        },
    });
};
interface UserSocketMap {
    [userId: string]: Socket;
}

const userSockets: UserSocketMap = {};
// const searchItems = ()=>{

// }
export const connSocket = (socket: Socket) => {
    // userSockets[socket.id] = socket;
    logger.info(`Cliente conectado: ${socket.id}`);

    // Escuchar el evento 'login' del lado del cliente con los datos del usuario
    socket.on('login', (userId: string) => {
        userSockets[userId] = socket; // Asocia el userId con el objeto socket
        logger.info(`Usuario con ID ${userId} asociado al socket ${socket.id}`);
    });

    socket.on('search', (query: string, preferences: any) => {
        // console.log('Búsqueda recibida de:', socket.id);
        // const results = performSearch(query, preferences); // Realizamos la búsqueda
        console.log(query, preferences);
        io.to(socket.id).emit('searchResults', 'results');
    });

    socket.on('test', (data) => {
        console.log(data);
        socket.emit('test', data);
    });
    socket.on('message', (data) => {
        console.log(data);
    });
    socket.on('disconnect', () => {
        logger.info(`Cliente desconectado: ${socket.id}`);
        const userId = Object.keys(userSockets).find(
            (id) => userSockets[id].id === socket.id,
        );
        if (userId) delete userSockets[userId]; // Elimina el mapeo cuando se desconecta el socket
    });
};

export default configSocket;
