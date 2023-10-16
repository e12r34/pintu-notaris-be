import { Module } from '@nestjs/common';
import { CutiService } from './cuti.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { CutiEntity } from './entity/cuti.entity';
import { redisStore } from 'cache-manager-redis-store';
import { CutiController } from './cuti.controller';
import * as dotenv  from 'dotenv';

dotenv.config();
@Module({
  providers: [CutiService],
  controllers:[CutiController],
  imports:[
    TypeOrmModule.forFeature([CutiEntity]),
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
