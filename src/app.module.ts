import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('POSTGRES_HOST'),
        port: ConfigService.get('POSTGRES_PORT'),
        username: ConfigService.get('POSTGRES_USER'),
        password: ConfigService.get('POSTGRES_PASSWORD'),
        database: ConfigService.get('POSTGRES_DB'),
        entities: [Task], 
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
