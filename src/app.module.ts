import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'cats_db',
      synchronize: true,
      autoLoadModels: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'app',
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        useLevelLabels: true,
        prettyPrint:
          process.env.NODE_ENV !== 'production'
            ? {
                colorize: true,
                levelFirst: true,
                translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
              }
            : {},
      },
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
