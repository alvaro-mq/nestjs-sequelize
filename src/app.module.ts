import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
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
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
