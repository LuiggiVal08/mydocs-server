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
    userSockets[socket.id] = socket;
    logger.info(`Cliente conectado: ${socket.id}`);

    socket.on('test', (data) => {
        console.log(data);
        socket.emit('test', data);
    });
    socket.on('message', (data) => {
        console.log(data);
    });
    socket.on('search', (query: string, preferences: any) => {
        // console.log('Búsqueda recibida de:', socket.id);
        // const results = performSearch(query, preferences); // Realizamos la búsqueda
        console.log(query, preferences);
        io.to(socket.id).emit('searchResults', 'results');
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
        delete userSockets[socket.id];
    });
};

export default configSocket;
