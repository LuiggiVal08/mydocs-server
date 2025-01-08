import { httpServer } from '@/app/app';
import { PORT } from '@/constants';
import logger from '@/config/logger';
import sequelize from './config/sequelize';

const PORT_SERVER: number = parseInt(PORT || '3000', 10);

sequelize
    .authenticate()
    .then(async () => {
        await sequelize.sync({ alter: true });
        logger.info('Connection has been established successfully.');

        httpServer.listen(PORT_SERVER, () => {
            logger.info(`Server running on port ${PORT_SERVER}`);
        });
    })
    .catch((err) => {
        logger.error('Unable to connect to the database:', err);
    });
