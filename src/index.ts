import { createServer } from 'node:http';
// import path from "node:path";

import app from '@/app/app';
import dbConn from '@/config/dbConn';
import router from '@/app/routes/index.routes';
import configSocket, { connSocket } from '@/services/socket';
import exposeHost, { getServerAddresses } from '@/services/exposeHost';
import logger from './config/logger';

export const server = createServer(app);
export const io = configSocket(server);

app.use('/api/', router);
// const nameSpaceAdmin = io.of('/admin');
// const nameSpaceStudent = io.of('/student');

io.on('connection', connSocket);

exposeHost(server, getServerAddresses()).then(() => {
    dbConn
        .authenticate()
        .then(async () => {
            logger.info(
                'Conexión a la base de datos establecida correctamente.',
            );
        })
        .catch((err) => {
            // const { code, errno, sqlState, sqlMessage } = err.original;
            logger.error('Error al conectar a la base de datos:', err);
        });
    // dbConn
    //     .sync()
    //     .then(async () => {
    //         console.log('Base de datos y tabla de usuarios creadas');
    //         User.sync();
    //         const user = {
    //             dni: '28532259',
    //             name: 'Luis Angel',
    //             lastname: 'Valencia',
    //             password: '1234',
    //             email: 'luicciano.08.angel.2002@gmail.com',
    //             username: 'luiggi',
    //             phone: '7314426',
    //             gender_id: 1,
    //         };
    //         const userCreate = await User.create(user);
    //         console.log(userCreate.dataValues);
    //     })
    //     .catch((error) => {
    //         console.error('Error al sincronizar la base de datos:', error);
    //     });
});
