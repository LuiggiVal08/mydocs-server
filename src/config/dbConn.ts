import { Sequelize } from 'sequelize';
import { DB_INFO, NODE_ENV } from '.';
import logger from './logger';

const { DB_NAME, DB_HOST, DB_USER, DB_PASS } = DB_INFO;

const dbConn = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: NODE_ENV === 'production' ? 'mysql' : 'sqlite' ,
    storage: 'src/database/app.sqlite',
    logging: (msg) => {
        // Utilizar tu logger personalizado para registrar los mensajes de Sequelize
        logger.info(msg);
    },
});

export const dbValidConn = () => {
    dbConn
        .authenticate()
        .then(() => {
            console.log(
                'Conexión a la base de datos establecida correctamente.',
            );
        })
        .catch((err) => {
            const { code, errno, sqlState, sqlMessage } = err.original;
            console.error('Error al conectar a la base de datos:', {
                code,
                errno,
                sqlState,
                sqlMessage,
            });
        });
};
export default dbConn;
