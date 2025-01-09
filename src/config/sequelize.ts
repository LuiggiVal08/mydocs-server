import cls from 'cls-hooked';
import { Sequelize } from 'sequelize-typescript';
import { connDB, NODE_ENV } from '@/constants';
import models from '@/app/models';

const nameSpace = cls.createNamespace('sequelize-transaction');
Sequelize.useCLS(nameSpace);

const environment = NODE_ENV === 'test' ? 'test' : NODE_ENV === 'production' ? 'production' : 'development';

const conn = connDB[environment];
const config = {
    logging: false,
    models: Object.values(models),
    define: {
        timestamps: true,
        underscored: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

const sequelize =
    environment === 'production'
        ? new Sequelize(conn.storage, {
              ...config,
          })
        : new Sequelize({
              ...conn,
              ...config,
          });

export default sequelize;
