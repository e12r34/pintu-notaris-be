import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CustomExceptionFilter } from './exception.filter';
import { NestMinioModule } from 'nestjs-minio';
import { KonditeModule } from './kondite/kondite.module';
import { KonditeEntity } from './kondite/entity/kondite.entity';
import { SkPengangkatanPindahEntity } from './kondite/entity/sk-pengangkatan-pindah.entity';
import { BeritaAcaraSumpahEntity } from './kondite/entity/berita-acara-sumpah.entity';
import { SuratPernyataanJumlahAktaNotarisEntity } from './kondite/entity/surat-pernyataan-jumlah-akta-notaris.entity';
import { SuratPernyataanPemegangProtokolEntity } from './kondite/entity/surat-pernyataan-pemegang-protokol.entity';
import * as dotenv from 'dotenv';
import { RolesGuard } from './role/role.guard';

dotenv.config();

@Module({
  imports: [
    AuthModule, 
    KonditeModule,
    // TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User, 
        KonditeEntity, 
        SkPengangkatanPindahEntity, 
        BeritaAcaraSumpahEntity, 
        SuratPernyataanJumlahAktaNotarisEntity, 
        SuratPernyataanPemegangProtokolEntity
      ],
      // set to true in the new database, set false, to existing database
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      // synchronize:true
    }),
    NestMinioModule.register(
      // isGlobal: true,
      {
        endPoint: process.env.MINIO_ENDPOINT,
        port: +process.env.MINIO_PORT,
        useSSL: process.env.MINIO_USE_SSL === 'true',
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY,
    }),
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('api/kondite')
  }
}

