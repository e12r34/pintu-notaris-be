import { Injectable, BadRequestException, NotFoundException, Delete } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { CutiEntity } from './entity/cuti.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoCutiFindAllRequest, DtoCutiFindAllResponse, DtoCutiFindAllResponseData, DtoCutiRequest } from './cuti.dto';
import * as uuid from 'uuid';
import config from 'src/config';
import { User } from 'src/auth/user.entity';
import { CutiSkPengangkatanPindahEntity } from './entity/cuti-sk-pengangkatan.entity';
import { CutiBeritaAcaraEntity } from './entity/cuti-berita-acara.entity';
import { NotarisPenggantiEntity } from './entity/notaris-pengganti.entity';
import { NotarisPemegangProtokolEntity } from './entity/notaris-pemegang-protokol.entity';

@Injectable()
export class CutiService {

    constructor(
        @InjectRepository(CutiEntity) private cutiRepository: Repository<CutiEntity>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectMinio() private readonly minioClient,
      ) {}

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

      async Download(record: CutiEntity){
        console.log("Downloading")
        if (record.skPengangkatan.file!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.skPengangkatan.file);
            if (result) {
              // Send the JSON object as a response
              record.skPengangkatan.file=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.beritaAcara.file!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.beritaAcara.file);
            if (result) {
              // Send the JSON object as a response
              record.beritaAcara.file=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileFoto!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileFoto);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileFoto=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKtp!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileKtp);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileKtp=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileIjazah!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileIjazah);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileIjazah=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileSkck!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileSkck);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileSkck=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileRiwayatHidup!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileRiwayatHidup);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileRiwayatHidup=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKeteranganBerkerja!="") {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileKeteranganBerkerja);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileKeteranganBerkerja=result.content
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

      async Delete(record: CutiEntity){
        if (record.skPengangkatan.file!="") {
          try {
            this.deleteFile(record.skPengangkatan.file);
          } catch (error) {
            throw error;
          }
        }
        if (record.beritaAcara.file!="") {
          try {
            this.deleteFile(record.beritaAcara.file);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileFoto!="") {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileFoto);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKtp!="") {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileKtp);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileIjazah!="") {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileIjazah);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileSkck!="") {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileSkck);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileRiwayatHidup!="") {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileRiwayatHidup);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKeteranganBerkerja!="") {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileKeteranganBerkerja);
          } catch (error) {
            throw error;
          }
        }
      }

      async uploadFile(filePath:string,file:string){
        const bucketName=config.minioBucketName
        const fileBuffer = Buffer.from(file, 'base64');
        const metaData = {
          'Content-Type': 'application/pdf'
        };
        try{
          await this.minioClient.putObject(bucketName,filePath,fileBuffer,metaData,function (err, objInfo) {
            if (err) {
              console.log(err)
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
        cutiData.jenisLayanan? newCutiData.jenisLayanan=cutiData.jenisLayanan:null
        if(cutiData.skPengangkatan){
            newCutiData.skPengangkatan= new CutiSkPengangkatanPindahEntity()
            if(cutiData.skPengangkatan.file!=""){
                const uuidv4 = uuid.v4()
                const path=`/cuti/sk-pengangkatan/${uuidv4}.pdf`
                await this.uploadFile(path,cutiData.skPengangkatan.file)
                
                newCutiData.skPengangkatan['file']=path
            }
            cutiData.skPengangkatan.nomor?newCutiData.skPengangkatan.nomor=cutiData.skPengangkatan.nomor:null
            cutiData.skPengangkatan.tanggal?newCutiData.skPengangkatan.tanggal=cutiData.skPengangkatan.tanggal:null
        }
        if(cutiData.beritaAcara) {
            newCutiData.beritaAcara =  new CutiBeritaAcaraEntity()
            if(cutiData.beritaAcara.file!=""){
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
          newCutiData.notarisPenggantiSementara= new NotarisPenggantiEntity()
            cutiData.notarisPenggantiSementara.nama?newCutiData.notarisPenggantiSementara.nama=cutiData.notarisPenggantiSementara.nama:null
            cutiData.notarisPenggantiSementara.email?newCutiData.notarisPenggantiSementara.email=cutiData.notarisPenggantiSementara.email:null
            if (cutiData.notarisPenggantiSementara.fileFoto!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-foto/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileFoto)
                newCutiData.notarisPenggantiSementara.fileFoto=path
            }

            if (cutiData.notarisPenggantiSementara.fileKtp!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-ktp/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKtp)
                newCutiData.notarisPenggantiSementara.fileKtp=path

            }

            if (cutiData.notarisPenggantiSementara.fileIjazah!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-ijazah/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileIjazah)
                newCutiData.notarisPenggantiSementara.fileIjazah=path
            }

            if (cutiData.notarisPenggantiSementara.fileSkck!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-skck/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileSkck)
                newCutiData.notarisPenggantiSementara.fileSkck=path
            }

            if (cutiData.notarisPenggantiSementara.fileRiwayatHidup!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-riwayat-hidup/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileRiwayatHidup)
                newCutiData.notarisPenggantiSementara.fileRiwayatHidup=path
            }

            if (cutiData.notarisPenggantiSementara.fileKeteranganBerkerja!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-keterangan-bekerja/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKeteranganBerkerja)
                newCutiData.notarisPenggantiSementara.fileKeteranganBerkerja=path
            }
        }
        if (cutiData.notarisPemegangProtokol) {
          newCutiData.notarisPemegangProtokol=new NotarisPemegangProtokolEntity()
            cutiData.notarisPemegangProtokol.nama?newCutiData.notarisPemegangProtokol.nama=cutiData.notarisPemegangProtokol.nama:null
            cutiData.notarisPemegangProtokol.alamat?newCutiData.notarisPemegangProtokol.alamat=cutiData.notarisPemegangProtokol.alamat:null
        }
        cutiData.voucherSimpadhu?newCutiData.voucherSimpadhu=cutiData.voucherSimpadhu:null
        newCutiData.userId=userId

        const cuti = this.cutiRepository.create(newCutiData);
        cutiData.skPengangkatan.file?cuti.skPengangkatan.file=cutiData.skPengangkatan.file:null
        cutiData.beritaAcara.file?cuti.beritaAcara.file=cutiData.beritaAcara.file:null
        cutiData.notarisPenggantiSementara.fileFoto?cuti.notarisPenggantiSementara.fileFoto=cutiData.notarisPenggantiSementara.fileFoto:null
        cutiData.notarisPenggantiSementara.fileKtp?cuti.notarisPenggantiSementara.fileKtp=cutiData.notarisPenggantiSementara.fileKtp:null
        cutiData.notarisPenggantiSementara.fileIjazah?cuti.notarisPenggantiSementara.fileIjazah=cutiData.notarisPenggantiSementara.fileIjazah:null
        cutiData.notarisPenggantiSementara.fileRiwayatHidup?cuti.notarisPenggantiSementara.fileRiwayatHidup=cutiData.notarisPenggantiSementara.fileRiwayatHidup:null
        cutiData.notarisPenggantiSementara.fileSkck?cuti.notarisPenggantiSementara.fileSkck=cutiData.notarisPenggantiSementara.fileSkck:null
        cutiData.notarisPenggantiSementara.fileKeteranganBerkerja?cuti.notarisPenggantiSementara.fileKeteranganBerkerja=cutiData.notarisPenggantiSementara.fileKeteranganBerkerja:null
        
        return  await this.cutiRepository.save(cuti);
        
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

      async findOne(id: string, userId: string): Promise<CutiEntity> {
        const record:any= await this.cutiRepository.findOne({
          where: { id, userId },
          relations: ['skPengangkatan', 'beritaAcara', 'notarisPenggantiSementara', 'notarisPemegangProtokol'],
        });
        if (!record) {
          throw new NotFoundException('Record Cuti Not found');
        }
        const new_record = await this.Download(record);
        return new_record
      }

      async findAll(userId: string, body: DtoCutiFindAllRequest): Promise<DtoCutiFindAllResponse> {
        const skip = (body.pageIndex - 1) * body.pageSize;
        const records:any = await this.cutiRepository.find({
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
          throw new NotFoundException('Records Cuti Not found')
        }
  
        var namaNotaris:any={}
        var keluaran: DtoCutiFindAllResponseData[]=[]
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
        const totalCount = await this.cutiRepository.count();
        const keluaran_lengkap:DtoCutiFindAllResponse ={
          data: keluaran,
          total: totalCount
        }
        return keluaran_lengkap
        // return keluaran

      }

      async update(id: string, cutiData: DtoCutiRequest, userId: string): Promise<CutiEntity> {
        var newCutiData= new CutiEntity()
        cutiData.tanggalMulai ? newCutiData.tanggalMulai= cutiData.tanggalMulai:null
        cutiData.jangkaWaktu ? newCutiData.jangkaWaktu= cutiData.jangkaWaktu:null
        cutiData.alasanCuti? newCutiData.alasanCuti=cutiData.alasanCuti:null
        cutiData.jenisLayanan? newCutiData.jenisLayanan=cutiData.jenisLayanan:null
        
        if(cutiData.skPengangkatan){
            newCutiData.skPengangkatan= new CutiSkPengangkatanPindahEntity()
            if(cutiData.skPengangkatan.file!=""){
                const uuidv4 = uuid.v4()
                const path=`/cuti/sk-pengangkatan/${uuidv4}.pdf`
                await this.uploadFile(path,cutiData.skPengangkatan.file)
                
                newCutiData.skPengangkatan['file']=path
            }
            cutiData.skPengangkatan.nomor?newCutiData.skPengangkatan.nomor=cutiData.skPengangkatan.nomor:null
            cutiData.skPengangkatan.tanggal?newCutiData.skPengangkatan.tanggal=cutiData.skPengangkatan.tanggal:null
        }
        if(cutiData.beritaAcara) {
            newCutiData.beritaAcara =  new CutiBeritaAcaraEntity()
            if(cutiData.beritaAcara.file!=""){
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
          newCutiData.notarisPenggantiSementara= new NotarisPenggantiEntity()
            cutiData.notarisPenggantiSementara.nama?newCutiData.notarisPenggantiSementara.nama=cutiData.notarisPenggantiSementara.nama:null
            cutiData.notarisPenggantiSementara.email?newCutiData.notarisPenggantiSementara.email=cutiData.notarisPenggantiSementara.email:null
            if (cutiData.notarisPenggantiSementara.fileFoto!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-foto/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileFoto)
                newCutiData.notarisPenggantiSementara.fileFoto=path
            }

            if (cutiData.notarisPenggantiSementara.fileKtp!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-ktp/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKtp)
                newCutiData.notarisPenggantiSementara.fileKtp=path

            }

            if (cutiData.notarisPenggantiSementara.fileIjazah!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-ijazah/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileIjazah)
                newCutiData.notarisPenggantiSementara.fileIjazah=path
            }

            if (cutiData.notarisPenggantiSementara.fileSkck!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-skck/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileSkck)
                newCutiData.notarisPenggantiSementara.fileSkck=path
            }

            if (cutiData.notarisPenggantiSementara.fileRiwayatHidup!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-riwayat-hidup/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileRiwayatHidup)
                newCutiData.notarisPenggantiSementara.fileRiwayatHidup=path
            }

            if (cutiData.notarisPenggantiSementara.fileKeteranganBerkerja!="") {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-keterangan-bekerja/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKeteranganBerkerja)
                newCutiData.notarisPenggantiSementara.fileKeteranganBerkerja=path
            }
        }
        if (cutiData.notarisPemegangProtokol) {
          newCutiData.notarisPemegangProtokol=new NotarisPemegangProtokolEntity()
            cutiData.notarisPemegangProtokol.nama?newCutiData.notarisPemegangProtokol.nama=cutiData.notarisPemegangProtokol.nama:null
            cutiData.notarisPemegangProtokol.alamat?newCutiData.notarisPemegangProtokol.alamat=cutiData.notarisPemegangProtokol.alamat:null
        }
        cutiData.voucherSimpadhu?newCutiData.voucherSimpadhu=cutiData.voucherSimpadhu:null
        newCutiData.userId=userId

        await this.cutiRepository.update(id, newCutiData);
        return this.findOne(id, userId);
      }

      async remove(id: string, userId:string): Promise<void> {
        const existing_record = await this.findOne(id,userId);
        this.Delete(existing_record)
        await this.cutiRepository.delete(id);
      }
}
