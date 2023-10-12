import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { JsonHeaderMiddleware } from './json-header/json-header.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './exception.filter';


@Module({
  imports: [
    AuthModule, 
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '7!74043MyTh4a',
      database: 'db_pintu_notaris',
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonHeaderMiddleware).forRoutes('*')
  }
}

