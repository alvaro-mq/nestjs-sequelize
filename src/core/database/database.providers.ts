import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { Cat } from '../../modules/cats/cat.model';
export const databaseProviders = [
  {
    provide: 'Sequelize',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Cat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
