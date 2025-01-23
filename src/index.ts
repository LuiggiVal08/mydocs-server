console.log('Hello World!');
import logger from '@/config/logger';
console.log('Hello World!2');
import { PORT } from '@/constants';
logger.info('logger is working');
import { httpServer } from '@/app/app';
logger.info('httpServer is working');
import sequelize from './config/sequelize';
logger.info('sequelize is working');
const PORT_SERVER: number = parseInt(PORT || '3000', 10);
logger.info('Starting server...');
sequelize
    .authenticate()
    .then(async () => {
        await sequelize.sync({ alter: true });
        logger.info('Connection has been established successfully.');

        httpServer.listen(PORT_SERVER, async () => {
            logger.info(`Server running on port ${PORT_SERVER}`);
        });
    })
    .catch((err) => {
        logger.error('Unable to connect to the database:', err);
    });
