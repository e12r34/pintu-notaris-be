import { Module } from '@nestjs/common';
import { KonditeController } from './kondite.controller';
import { KonditeService } from './kondite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KonditeEntity } from './entity/kondite.entity';

@Module({
    controllers:[
        KonditeController
    ],
    providers:[
        KonditeService
    ],
    imports:[
        TypeOrmModule.forFeature([KonditeEntity]),
    ]
})
export class KonditeModule {}
