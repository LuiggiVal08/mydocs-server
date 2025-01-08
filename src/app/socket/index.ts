import { Server } from 'socket.io';

import logger from '@/config/logger';
import { userSockets } from '@/constants';

// const configSocket = (server: PropSever<typeof IncomingMessage, typeof ServerResponse>) => {
//     return new Server(server, {
//         cors: {
//             origin: crossOrigin,
//         },
//     });
// };

/**
 * Connects a socket and handles various events like 'login', 'search', 'test', 'message', and 'disconnect'.
 *
 * @param {Socket} socket - The socket to connect and handle events for.
 */
export const setupSockets = (io: Server) => {
    // userSockets[socket.id] = socket;
    io.on('connection', (socket) => {
        logger.info(
            `Cliente conectado: ${socket.id} con ${socket.handshake.headers['user-agent']} en ${
                socket.handshake.address
            } ${socket.handshake.secure ? '(HTTPS)' : '(HTTP)'}`,
        );
        logger.info(`Usuarios conectados: ${Object.keys(userSockets).length}`);
        // Escuchar el evento 'login' del lado del cliente con los datos del usuario
        socket.on('login', (userId: string) => {
            userSockets[userId] = socket; // Asocia el userId con el objeto socket
            logger.info(`Usuario con ID ${userId} asociado al socket ${socket.id}`);
        });

        // socket.on('search', async (_query: string, _preferences: any) => {
        //     // console.log('Búsqueda recibida de:', socket.id);
        //     // const results = await SearchController.searchUser(query);
        //     // // console.log(results, preferences);
        //     // socket.emit('searchResults', results);
        //     // io.to(socket.id).emit('searchResults', query);
        // });

        socket.on('message', (data) => {
            console.log(data);
        });
        socket.on('disconnect', () => {
            logger.info(`Cliente desconectado: ${socket.id}`);
            const userId = Object.keys(userSockets).find((id) => userSockets[id].id === socket.id);
            if (userId) delete userSockets[userId]; // Elimina el mapeo cuando se desconecta el socket
        });
    });
};

export default setupSockets;
