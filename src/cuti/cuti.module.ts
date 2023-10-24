import { Module } from '@nestjs/common';
import { CutiService } from './cuti.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { CutiEntity } from './entity/cuti.entity';
import { redisStore } from 'cache-manager-redis-store';
import { CutiController } from './cuti.controller';
import * as dotenv  from 'dotenv';
import { User } from 'src/auth/user.entity';
import { CutiBeritaAcaraEntity } from './entity/cuti-berita-acara.entity';
import { CutiNotarisPemegangProtokolEntity } from './entity/cuti-notaris-pemegang-protokol.entity';
import { CutiNotarisPenggantiEntity } from './entity/cuti-notaris-pengganti.entity';
import { CutiSkPengangkatanPindahEntity } from './entity/cuti-sk-pengangkatan.entity';
import { VerifikasiPermohonanCutiMpdController } from './verifikasi-permohonan-cuti-mpd/verifikasi-permohonan-cuti-mpd.controller';
import { VerifikasiPermohonanCutiMpdService } from './verifikasi-permohonan-cuti-mpd/verifikasi-permohonan-cuti-mpd.service';

dotenv.config();
@Module({
  providers: [CutiService, VerifikasiPermohonanCutiMpdService],
  controllers:[CutiController, VerifikasiPermohonanCutiMpdController],
  imports:[
    TypeOrmModule.forFeature([
      CutiEntity, 
      User, 
      CutiBeritaAcaraEntity, 
      CutiNotarisPemegangProtokolEntity, 
      CutiNotarisPenggantiEntity, 
      CutiSkPengangkatanPindahEntity]),
        CacheModule.register({
            // @ts-ignore
            store: async () => await redisStore({
              socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
              },
              ttl:parseInt(process.env.REDIS_TTL),
              
              
            },
            
            )
          }),
  ]
})
export class CutiModule {}
