import cls from 'cls-hooked';
import { Sequelize } from 'sequelize-typescript';
import { connDB, NODE_ENV } from '@/constants';
import models from '@/app/models';

const nameSpace = cls.createNamespace('sequelize-transaction');
Sequelize.useCLS(nameSpace);

// type Environment = 'development' | 'test' | 'production';

const environment = NODE_ENV === 'test' ? 'test' : NODE_ENV === 'production' ? 'production' : 'development';

const config = connDB[environment];

const sequelize =
    environment === 'production'
        ? new Sequelize(config.storage, {
              models: Object.values(models),
              logging: false,
          })
        : new Sequelize({
              ...config,
              models: Object.values(models),
              logging: false,
          });

// sequelize.addModels(Object.values(models));

export default sequelize;
