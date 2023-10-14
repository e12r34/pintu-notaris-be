import { Injectable } from '@nestjs/common';
import { KonditeEntity } from './entity/kondite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KonditeService {
    constructor(
        @InjectRepository(KonditeEntity)
        private konditeRepository: Repository<KonditeEntity>,
      ) {}
      
    async create(createKonditeDto: KonditeEntity) {
      const kondite = this.konditeRepository.create(createKonditeDto);
      return await this.konditeRepository.save(kondite);
    }


    async findAll(): Promise<KonditeEntity[]> {
      return await this.konditeRepository.find({
        relations: ['skPengangkatanPindah', 'beritaAcaraSumpah', 'suratPernyataanJumlahAktaNotaris', 'suratPernyataanPemegangProtokol'],
      });
    }

    async findOne(id: string): Promise<KonditeEntity> {
      return await this.konditeRepository.findOne({
        where: { id },
        relations: ['skPengangkatanPindah', 'beritaAcaraSumpah', 'suratPernyataanJumlahAktaNotaris', 'suratPernyataanPemegangProtokol'],
      });
    }

    async update(id: string, updateKonditeDto: KonditeEntity): Promise<KonditeEntity> {
      await this.konditeRepository.update(id, updateKonditeDto);
      return this.findOne(id);
    }
  
    async remove(id: string): Promise<void> {
      await this.konditeRepository.delete(id);
    }
}
