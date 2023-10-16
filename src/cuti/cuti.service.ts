import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { CutiEntity } from './entity/cuti.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoCutiRequest } from './cuti.dto';
import * as uuid from 'uuid';
import config from 'src/config';

@Injectable()
export class CutiService {

    constructor(
        @InjectRepository(CutiEntity) private cutiRepository: Repository<CutiEntity>,
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

      async create(cutiData: DtoCutiRequest, userId:string) {
        var newCutiData= new CutiEntity()
        cutiData.tanggalMulai ? newCutiData.tanggalMulai= cutiData.tanggalMulai:null
        cutiData.jangkaWaktu ? newCutiData.jangkaWaktu= cutiData.jangkaWaktu:null
        cutiData.alasanCuti? newCutiData.alasanCuti=cutiData.alasanCuti:null
        if(cutiData.skPengangkatan){
            if(cutiData.skPengangkatan.file){
                const uuidv4 = uuid.v4()
                const path=`/cuti/sk-pengangkatan/${uuidv4}.pdf`
                await this.uploadFile(path,cutiData.skPengangkatan.file)
                newCutiData.skPengangkatan.file=path
            }
            cutiData.skPengangkatan.nomor?newCutiData.skPengangkatan.nomor=cutiData.skPengangkatan.nomor:null
            cutiData.skPengangkatan.tanggal?newCutiData.skPengangkatan.tanggal=cutiData.skPengangkatan.tanggal:null
        }
        if(cutiData.beritaAcara) {
            if(cutiData.beritaAcara.file){
                const uuidv4 = uuid.v4()
                const path=`/cuti/berita-acara/${uuidv4}.pdf`
                await this.uploadFile(path,cutiData.skPengangkatan.file)
                newCutiData.beritaAcara.file=path
            }
            cutiData.beritaAcara.nomor?newCutiData.beritaAcara.nomor=cutiData.beritaAcara.nomor:null
            cutiData.beritaAcara.tanggal?newCutiData.beritaAcara.tanggal=cutiData.beritaAcara.tanggal:null
        }
        
        cutiData.fileSertifikatCuti?newCutiData.fileSertifikatCuti=cutiData.fileSertifikatCuti:null
        cutiData.fileSkPejabatNegara?newCutiData.fileSkPejabatNegara=cutiData.fileSkPejabatNegara:null
        if (cutiData.notarisPenggantiSementara) {
            cutiData.notarisPenggantiSementara.nama?newCutiData.notarisPenggantiSementara.nama=cutiData.notarisPenggantiSementara.nama:null
            cutiData.notarisPenggantiSementara.email?newCutiData.notarisPenggantiSementara.email=cutiData.notarisPenggantiSementara.email:null
            if (cutiData.notarisPenggantiSementara.fileFoto) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-foto/${uuidv4}`
                await this.uploadFile(path,cutiData.skPengangkatan.file)
                newCutiData.notarisPenggantiSementara.fileFoto=path
            }

            if (cutiData.notarisPenggantiSementara.fileKtp) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-ktp/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKtp)
                newCutiData.notarisPenggantiSementara.fileFoto=path

            }

            if (cutiData.notarisPenggantiSementara.fileIjazah) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-ijazah/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileIjazah)
                newCutiData.notarisPenggantiSementara.fileIjazah=path
            }

            if (cutiData.notarisPenggantiSementara.fileSkck) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-skck/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileSkck)
                newCutiData.notarisPenggantiSementara.fileSkck=path
            }

            if (cutiData.notarisPenggantiSementara.fileRiwayatHidup) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-riwayat-hidup/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileRiwayatHidup)
                newCutiData.notarisPenggantiSementara.fileRiwayatHidup=path
            }

            if (cutiData.notarisPenggantiSementara.fileKeteranganBerkerja) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-keterangan-bekerja/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKeteranganBerkerja)
                newCutiData.notarisPenggantiSementara.fileKeteranganBekerja=path
            }
        }
        if (cutiData.notarisPemegangProtokol) {
            cutiData.notarisPemegangProtokol.nama?newCutiData.notarisPemegangProtokol.nama=cutiData.notarisPemegangProtokol.nama:null
            cutiData.notarisPemegangProtokol.alamat?newCutiData.notarisPemegangProtokol.alamat=cutiData.notarisPemegangProtokol.alamat:null
        }
        cutiData.voucherSimpadhu?newCutiData.voucherSimpadhu=cutiData.voucherSimpadhu:null
        newCutiData.userId=userId

        const cuti = this.cutiRepository.create(newCutiData);
        return await this.cutiRepository.save(cuti);
      }
}
