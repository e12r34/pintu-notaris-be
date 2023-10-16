import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { KonditeEntity } from './entity/kondite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMinio } from 'nestjs-minio';
import config from 'src/config';
import * as uuid from 'uuid';
import { DtoKonditeFindAllRequest, DtoKonditeFindAllResponse } from './kondite.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class KonditeService {
    constructor(
        @InjectRepository(KonditeEntity) private konditeRepository: Repository<KonditeEntity>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectMinio() private readonly minioClient,
      ) {}
      
    async uploadFile(filePath:string,file:string){
      const bucketName=config.minioBucketName
      const fileBuffer = Buffer.from(file, 'base64');
      const metaData = {
        'Content-Type': 'application/pdf'
      };
      try{
        await this.minioClient.putObject(bucketName,filePath,fileBuffer,metaData,function (err, objInfo) {
          if (err) {
            throw err
          }
        })
      }
      catch(err){
        throw new BadRequestException(`Error upload file ${filePath} to server, ${err}`)
      }
    }

    async downloadAndEncodeFile(objectName: string): Promise<{ content: string } | null> {
      try {
        const bucketName=config.minioBucketName
        const objectStream = await this.minioClient.getObject(bucketName, objectName);
        const buffers = [];
        return new Promise<{ content: string }>((resolve, reject) => {
          objectStream.on('data', (chunk) => buffers.push(chunk));
          objectStream.on('end', () => {
            const fileBuffer = Buffer.concat(buffers);
            // Encode the file content as base64
            const base64Content = fileBuffer.toString('base64');
            // Create a JSON object with the base64 content
            const jsonResult = { content: base64Content };
            resolve(jsonResult);
          });
          objectStream.on('error', (error) => {
            reject(error);
          });
        });
      } catch (error) {
        // Handle any errors that occur during the getObject operation
        throw error
      }
    }

    async deleteFile(filePath:string){
      try{
        const bucketName=config.minioBucketName
        await this.minioClient.removeObject(bucketName, filePath)
      }
      catch(err){
        throw err
      }
    }

    async create(createKonditeDao: KonditeEntity) {
      if (createKonditeDao.beritaAcaraSumpah.file) {
        const uuidv4 = uuid.v4()
        const path=`/kondite/berita-acara-sumpah/${uuidv4}.pdf`
        await this.uploadFile(path,createKonditeDao.beritaAcaraSumpah.file)
        createKonditeDao.beritaAcaraSumpah.file=path
      }

      if (createKonditeDao.skPengangkatanPindah.file) {
        const uuidv4 = uuid.v4()
        const path=`/kondite/sk-pengangkatan-pindah/${uuidv4}.pdf`
        await this.uploadFile(path,createKonditeDao.skPengangkatanPindah.file)
        createKonditeDao.skPengangkatanPindah.file=path
      }

      if (createKonditeDao.suratPernyataanJumlahAktaNotaris.file) {
        const uuidv4 = uuid.v4()
        const path=`/kondite/suart-pernyataan-jumlah-akta-notaris/${uuidv4}.pdf`
        await this.uploadFile(path,createKonditeDao.suratPernyataanJumlahAktaNotaris.file)
        createKonditeDao.suratPernyataanJumlahAktaNotaris.file=path
      }

      if (createKonditeDao.suratPernyataanPemegangProtokol.file) {
        const uuidv4 = uuid.v4()
        const path=`/kondite/surat-pernyataan-pemegang-protokol/${uuidv4}.pdf`
        await this.uploadFile(path,createKonditeDao.suratPernyataanPemegangProtokol.file)
        createKonditeDao.suratPernyataanPemegangProtokol.file=path
      }

      const kondite = this.konditeRepository.create(createKonditeDao);
      return await this.konditeRepository.save(kondite);
    }

    async Download(record: KonditeEntity){
      if (record.beritaAcaraSumpah.file!="") {
        try {
          const result = await this.downloadAndEncodeFile(record.beritaAcaraSumpah.file);
          if (result) {
            // Send the JSON object as a response
            record.beritaAcaraSumpah.file=result.content
          } else {
            // Handle the case where the file doesn't exist or there's an error
            throw new NotFoundException('File not found');
          }
        } catch (error) {
          throw error;
        }
      }
      if (record.skPengangkatanPindah.file!="") {
        try {
          const result = await this.downloadAndEncodeFile(record.skPengangkatanPindah.file);
          if (result) {
            // Send the JSON object as a response
            record.skPengangkatanPindah.file=result.content
          } else {
            // Handle the case where the file doesn't exist or there's an error
            throw new NotFoundException('File not found');
          }
        } catch (error) {
          throw error;
        }
      }
      if (record.suratPernyataanJumlahAktaNotaris.file!="") {
        try {
          const result = await this.downloadAndEncodeFile(record.suratPernyataanJumlahAktaNotaris.file);
          if (result) {
            // Send the JSON object as a response
            record.suratPernyataanJumlahAktaNotaris.file=result.content
          } else {
            // Handle the case where the file doesn't exist or there's an error
            throw new NotFoundException('File not found');
          }
        } catch (error) {
          throw error;
        }
      }
      if (record.suratPernyataanPemegangProtokol.file!="") {
        try {
          const result = await this.downloadAndEncodeFile(record.suratPernyataanPemegangProtokol.file);
          if (result) {
            // Send the JSON object as a response
            record.suratPernyataanPemegangProtokol.file=result.content
          } else {
            // Handle the case where the file doesn't exist or there's an error
            throw new NotFoundException('File not found');
          }
        } catch (error) {
          throw error;
        }
      }
      return record
    }

    async findAll(userId: string, body: DtoKonditeFindAllRequest): Promise<DtoKonditeFindAllResponse[]> {
      const skip = (body.pageIndex - 1) * body.pageSize;
      const records:any = await this.konditeRepository.find({
        where: {
          userId
        },
        // relations: ['skPengangkatanPindah', 'beritaAcaraSumpah', 'suratPernyataanJumlahAktaNotaris', 'suratPernyataanPemegangProtokol'],
        select: {
          id: true,
          jenisLayanan: true,
          tanggalPermohonan: true,
          nomorPermohonan: true,
          statusPermohonan: true,
          userId: true,
        },
        take: body.pageSize,
        skip: skip,
      });
      if (records.length===0) {
        throw new NotFoundException('Records Kondite Not found')
      }

      var namaNotaris:any={}
      var keluaran: DtoKonditeFindAllResponse[]=[]
      records.forEach(async record => {
        if (namaNotaris.hasOwnProperty(record.userId) ) {
          record['namaNotaris']=namaNotaris[record.userId]
        }
        else{
          const chosenUsername = await this.userRepository.findOne({
            where:{
              id: record.userId
            },
            select:{
              nama: true,
            }
          })
          namaNotaris[record.userId]=chosenUsername
        }
        delete record.userId
        keluaran.push(record)
        
      });

      return keluaran
    }

    async findOne(id: string, userId: string): Promise<KonditeEntity> {
      const record= await this.konditeRepository.findOne({
        where: { id, userId },
        relations: ['skPengangkatanPindah', 'beritaAcaraSumpah', 'suratPernyataanJumlahAktaNotaris', 'suratPernyataanPemegangProtokol'],
      });
      if (!record) {
        throw new NotFoundException('Record Kondite Not found');
      }
      const new_record = await this.Download(record);
      return new_record
    }


    async update(id: string, updateKonditeDao: KonditeEntity, userId: string): Promise<KonditeEntity> {
      const existing_record = await this.findOne(id,userId);
      if (updateKonditeDao.beritaAcaraSumpah.file!="") {
        const uuidv4 = uuid.v4()
        var path=`/kondite/berita-acara-sumpah/${uuidv4}.pdf`
        if (existing_record.beritaAcaraSumpah.file!="") {
          path=existing_record.beritaAcaraSumpah.file
        }
        await this.uploadFile(path,updateKonditeDao.beritaAcaraSumpah.file)
        updateKonditeDao.beritaAcaraSumpah.file=path
      }
      if (updateKonditeDao.skPengangkatanPindah.file!="") {
        const uuidv4 = uuid.v4()
        var path=`/kondite/sk-pengangkatan-pindah/${uuidv4}.pdf`
        if (existing_record.skPengangkatanPindah.file!="") {
          path=existing_record.skPengangkatanPindah.file
        }
        await this.uploadFile(path,updateKonditeDao.skPengangkatanPindah.file)
        updateKonditeDao.skPengangkatanPindah.file=path
      }
      if (updateKonditeDao.suratPernyataanJumlahAktaNotaris.file!="") {
        const uuidv4 = uuid.v4()
        var path=`/kondite/suart-pernyataan-jumlah-akta-notaris/${uuidv4}.pdf`
        if (existing_record.suratPernyataanJumlahAktaNotaris.file!="") {
          path=existing_record.suratPernyataanJumlahAktaNotaris.file
        }
        await this.uploadFile(path,updateKonditeDao.suratPernyataanJumlahAktaNotaris.file)
        updateKonditeDao.suratPernyataanJumlahAktaNotaris.file=path
      }
      if (updateKonditeDao.suratPernyataanPemegangProtokol.file!="") {
        const uuidv4 = uuid.v4()
        var path=`/kondite/surat-pernyataan-pemegang-protokol/${uuidv4}.pdf`
        if (existing_record.suratPernyataanPemegangProtokol.file!="") {
          path=existing_record.suratPernyataanPemegangProtokol.file
        }
        await this.uploadFile(path,updateKonditeDao.suratPernyataanPemegangProtokol.file)
        updateKonditeDao.suratPernyataanPemegangProtokol.file=path
      }
      await this.konditeRepository.update(id, updateKonditeDao);
      return this.findOne(id, userId);
    }
  
    async remove(id: string, userId:string): Promise<void> {
      const existing_record = await this.findOne(id,userId);
      if (existing_record.beritaAcaraSumpah.file!="") {
        this.deleteFile(existing_record.beritaAcaraSumpah.file)
      }
      if (existing_record.skPengangkatanPindah.file!="") {
        this.deleteFile(existing_record.skPengangkatanPindah.file)
      }
      if (existing_record.suratPernyataanJumlahAktaNotaris.file!="") {
        this.deleteFile(existing_record.suratPernyataanJumlahAktaNotaris.file)
      }
      if (existing_record.suratPernyataanPemegangProtokol.file!="") {
        this.deleteFile(existing_record.suratPernyataanPemegangProtokol.file)
      }
      await this.konditeRepository.delete(id);
    }
}
