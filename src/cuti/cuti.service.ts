import { Injectable, BadRequestException, NotFoundException, Delete } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { CutiEntity } from './entity/cuti.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoCutiFindAllRequest, DtoCutiFindAllResponse, DtoCutiFindAllResponseData, DtoCutiRequest } from './cuti.dto';
import * as uuid from 'uuid';
import config from 'src/config';
import { User } from 'src/auth/user.entity';
import { CutiSkPengangkatanPindahEntity } from './entity/cuti-sk-pengangkatan.entity';
import { CutiBeritaAcaraEntity } from './entity/cuti-berita-acara.entity';
import { CutiNotarisPenggantiEntity } from './entity/cuti-notaris-pengganti.entity';
import { CutiNotarisPemegangProtokolEntity } from './entity/cuti-notaris-pemegang-protokol.entity';
import * as dotenv from 'dotenv';

dotenv.config();


@Injectable()
export class CutiService {
    constructor(
        @InjectRepository(CutiEntity) private cutiRepository: Repository<CutiEntity>,
        @InjectRepository(CutiBeritaAcaraEntity) private cutiBARepository: Repository<CutiBeritaAcaraEntity>,
        @InjectRepository(CutiSkPengangkatanPindahEntity) private cutiSKRepository: Repository<CutiSkPengangkatanPindahEntity>,
        @InjectRepository(CutiNotarisPemegangProtokolEntity) private cutiNotarisProtokolRepository: Repository<CutiNotarisPemegangProtokolEntity>,
        @InjectRepository(CutiNotarisPenggantiEntity) private cutiNotarisPenggantiRepository: Repository<CutiNotarisPenggantiEntity>,
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

      //Belum
      async Download(record: CutiEntity){
        if (record.skPengangkatan.file) {
          try {
            const result = await this.downloadAndEncodeFile(record.skPengangkatan.file);
            if (result) {
              // Send the JSON object as a response
              record.skPengangkatan.file=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File SK Pengangkatan not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.fileSertifikatCuti) {
          try {
            const result = await this.downloadAndEncodeFile(record.fileSertifikatCuti);
            if (result) {
              // Send the JSON object as a response
              record.fileSertifikatCuti=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File Sertifikat Cuti not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.fileSkPejabatNegara) {
          try {
            const result = await this.downloadAndEncodeFile(record.fileSkPejabatNegara);
            if (result) {
              // Send the JSON object as a response
              record.fileSkPejabatNegara=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File SK Pejabat Negara not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.beritaAcara.file) {
          try {
            const result = await this.downloadAndEncodeFile(record.beritaAcara.file);
            if (result) {
              // Send the JSON object as a response
              record.beritaAcara.file=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File BA not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileFoto) {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileFoto);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileFoto=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File Foto Notaris Pengganti not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKtp) {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileKtp);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileKtp=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File KTP Notaris Penggantinot found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileIjazah) {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileIjazah);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileIjazah=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File Ijazah Notaris Pengganti not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileSkck) {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileSkck);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileSkck=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File SKCK Notaris Pengganti not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileRiwayatHidup) {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileRiwayatHidup);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileRiwayatHidup=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File Riwayat Hidup Notaris Pengganti not found');
            }
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKeteranganBerkerja) {
          try {
            const result = await this.downloadAndEncodeFile(record.notarisPenggantiSementara.fileKeteranganBerkerja);
            if (result) {
              // Send the JSON object as a response
              record.notarisPenggantiSementara.fileKeteranganBerkerja=result.content
            } else {
              // Handle the case where the file doesn't exist or there's an error
              throw new NotFoundException('File Keterangan Bekerja Notaris Pengganti not found');
            }
          } catch (error) {
            throw error;
          }
        }


        return record
      }

      async Delete(record: CutiEntity){
        if (record.skPengangkatan.file) {
          try {
            this.deleteFile(record.skPengangkatan.file);
          } catch (error) {
            throw error;
          }
        }
        if (record.fileSertifikatCuti) {
          try {
            this.deleteFile(record.fileSertifikatCuti);
          } catch (error) {
            throw error;
          }
        }
        if (record.fileSkPejabatNegara) {
          try {
            this.deleteFile(record.fileSkPejabatNegara);
          } catch (error) {
            throw error;
          }
        }
        if (record.beritaAcara.file) {
          try {
            this.deleteFile(record.beritaAcara.file);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileFoto) {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileFoto);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKtp) {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileKtp);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileIjazah) {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileIjazah);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileSkck) {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileSkck);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileRiwayatHidup) {
          try {
            this.deleteFile(record.notarisPenggantiSementara.fileRiwayatHidup);
          } catch (error) {
            throw error;
          }
        }
        if (record.notarisPenggantiSementara.fileKeteranganBerkerja) {
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
        const tanggalMulai = cutiData.tanggalMulai;
        const now = Date.now();
        const tanggalMulaiFormatDate = new Date(tanggalMulai);
        const tanggalSelesai=new Date(tanggalMulaiFormatDate.setMonth(tanggalMulaiFormatDate.getMonth() + cutiData.jangkaWaktu))

        const results = await this.cutiRepository
        .createQueryBuilder('cuti')
        .where({ userId })
        .andWhere('(\
          (:tanggalMulai >= cuti.tanggalMulai AND :tanggalMulai <= cuti.TanggalSelesai) \
          OR \
          (:tanggalSelesai >= cuti.tanggalMulai AND :tanggalSelesai <= cuti.TanggalSelesai)\
        )', { tanggalMulai, tanggalSelesai })
        .getCount();

        
        if(results>0)
        {
          throw new BadRequestException("Pengajuan cuti anda berbenturan dengan pengajuan cuti yang sudah ada, harap pastikan tanggalMulai dan lamaCuti")
        }

        var newCutiData= new CutiEntity()
        newCutiData.tanggalSelesai=tanggalSelesai
        cutiData.tanggalMulai ? newCutiData.tanggalMulai= cutiData.tanggalMulai:null
        cutiData.jangkaWaktu ? newCutiData.jangkaWaktu= cutiData.jangkaWaktu:null
        cutiData.alasanCuti? newCutiData.alasanCuti=cutiData.alasanCuti:null
        cutiData.jenisLayanan? newCutiData.jenisLayanan=cutiData.jenisLayanan:null
        if(cutiData.skPengangkatan){
            newCutiData.skPengangkatan= new CutiSkPengangkatanPindahEntity()
            if(cutiData.skPengangkatan.file){
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
            if(cutiData.beritaAcara.file){
                const uuidv4 = uuid.v4()
                const path=`/cuti/berita-acara/${uuidv4}.pdf`
                await this.uploadFile(path,cutiData.beritaAcara.file)
                newCutiData.beritaAcara.file=path
            }
            cutiData.beritaAcara.nomor?newCutiData.beritaAcara.nomor=cutiData.beritaAcara.nomor:null
            cutiData.beritaAcara.tanggal?newCutiData.beritaAcara.tanggal=cutiData.beritaAcara.tanggal:null
        }
        if (cutiData.fileSertifikatCuti) {
            const uuidv4 = uuid.v4()
            const path=`/cuti/file-sertifikat-cuti/${uuidv4}`
            await this.uploadFile(path,cutiData.fileSertifikatCuti)
            newCutiData.fileSertifikatCuti=path
        }

        if (cutiData.fileSkPejabatNegara) {
          const uuidv4 = uuid.v4()
          const path=`/cuti/file-sk-pejabat/${uuidv4}`
          await this.uploadFile(path,cutiData.fileSkPejabatNegara)
          newCutiData.fileSkPejabatNegara=path
        }

        if (cutiData.notarisPenggantiSementara) {
          newCutiData.notarisPenggantiSementara= new CutiNotarisPenggantiEntity()
            cutiData.notarisPenggantiSementara.nama?newCutiData.notarisPenggantiSementara.nama=cutiData.notarisPenggantiSementara.nama:null
            cutiData.notarisPenggantiSementara.email?newCutiData.notarisPenggantiSementara.email=cutiData.notarisPenggantiSementara.email:null
            if (cutiData.notarisPenggantiSementara.fileFoto) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-foto/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileFoto)
                newCutiData.notarisPenggantiSementara.fileFoto=path
            }

            if (cutiData.notarisPenggantiSementara.fileKtp) {
                const uuidv4 = uuid.v4()
                const path=`/cuti/notaris-pengganti-ktp/${uuidv4}`
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKtp)
                newCutiData.notarisPenggantiSementara.fileKtp=path
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
                newCutiData.notarisPenggantiSementara.fileKeteranganBerkerja=path
            }
        }
        if (cutiData.notarisPemegangProtokol) {
          newCutiData.notarisPemegangProtokol=new CutiNotarisPemegangProtokolEntity()
            cutiData.notarisPemegangProtokol.nama?newCutiData.notarisPemegangProtokol.nama=cutiData.notarisPemegangProtokol.nama:null
            cutiData.notarisPemegangProtokol.alamat?newCutiData.notarisPemegangProtokol.alamat=cutiData.notarisPemegangProtokol.alamat:null
        }
        cutiData.voucherSimpadhu?newCutiData.voucherSimpadhu=cutiData.voucherSimpadhu:null
        newCutiData.userId=userId

        const latestRecord = await this.cutiRepository
          .createQueryBuilder('cuti')
          .orderBy('cuti.tanggalPermohonan', 'DESC')
          .getOne();
        if (latestRecord) {
          const pisah = latestRecord.nomorPermohonan.split("-")
          const new_number=parseInt(pisah[pisah.length-1])+1
          newCutiData.nomorPermohonan=`${process.env.APP_FORMAT_NOMOR_CUTI}${new_number}`
        }
        else{
          newCutiData.nomorPermohonan=`${process.env.APP_FORMAT_NOMOR_CUTI}1`
        }
        const cuti = this.cutiRepository.create(newCutiData);
        await this.cutiRepository.save(newCutiData);

        // cutiData.skPengangkatan.file?cuti.skPengangkatan.file=cutiData.skPengangkatan.file:null
        // cutiData.beritaAcara.file?cuti.beritaAcara.file=cutiData.beritaAcara.file:null
        // cutiData.notarisPenggantiSementara.fileFoto?cuti.notarisPenggantiSementara.fileFoto=cutiData.notarisPenggantiSementara.fileFoto:null
        // cutiData.notarisPenggantiSementara.fileKtp?cuti.notarisPenggantiSementara.fileKtp=cutiData.notarisPenggantiSementara.fileKtp:null
        // cutiData.notarisPenggantiSementara.fileIjazah?cuti.notarisPenggantiSementara.fileIjazah=cutiData.notarisPenggantiSementara.fileIjazah:null
        // cutiData.notarisPenggantiSementara.fileRiwayatHidup?cuti.notarisPenggantiSementara.fileRiwayatHidup=cutiData.notarisPenggantiSementara.fileRiwayatHidup:null
        // cutiData.notarisPenggantiSementara.fileSkck?cuti.notarisPenggantiSementara.fileSkck=cutiData.notarisPenggantiSementara.fileSkck:null
        // cutiData.notarisPenggantiSementara.fileKeteranganBerkerja?cuti.notarisPenggantiSementara.fileKeteranganBerkerja=cutiData.notarisPenggantiSementara.fileKeteranganBerkerja:null
        
        // console.log('2')
        return this.findOne(cuti.id,userId,true)
        
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

      async findOne(id: string, userId: string, isGetFile: Boolean=true): Promise<CutiEntity> {
        const record:any= await this.cutiRepository.findOne({
          where: { id, userId },
          relations: ['skPengangkatan', 'beritaAcara', 'notarisPenggantiSementara', 'notarisPemegangProtokol'],
        });
        if (!record) {
          throw new NotFoundException('Record Cuti Not found');
        }

        if (isGetFile) {
          const new_record = await this.Download(record);
          return new_record          
        }
        else{
          return record
        }

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
            tanggalMulai:true,
            jangkaWaktu:true,
            tanggalSelesai:true
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
            namaNotaris[record.userId]=chosenUsername.nama
            record['namaNotaris']=namaNotaris[record.userId]
          }

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
        var tanggalSelesai,tanggalMulai, results
        if (cutiData.tanggalMulai) {
          tanggalMulai = cutiData.tanggalMulai;
          const now = Date.now();
          const tanggalMulaiFormatDate = new Date(tanggalMulai);
          tanggalSelesai=new Date(tanggalMulaiFormatDate.setMonth(tanggalMulaiFormatDate.getMonth() + cutiData.jangkaWaktu))         
          results = await this.cutiRepository
          .createQueryBuilder('cuti')
          .where({ 
            userId,
            id:Not(id) })
          .andWhere('(\
            (:tanggalMulai >= cuti.tanggalMulai AND :tanggalMulai <= cuti.TanggalSelesai) \
            OR \
            (:tanggalSelesai >= cuti.tanggalMulai AND :tanggalSelesai <= cuti.TanggalSelesai)\
          )', { tanggalMulai, tanggalSelesai })
          .getCount();
          if(results>0)
          {
            throw new BadRequestException("Pengajuan cuti anda berbenturan dengan pengajuan cuti yang sudah ada, harap pastikan tanggalMulai dan lamaCuti")
          }
        }
 
        
        // console.log(tanggalMulai.getTime())
        // console.log(tanggalMulaiFormatDate.getTime())
        // if (tanggalMulai.getTime()<now) {
        //     throw new BadRequestException("pengajuan cuti tidak boleh dalam waktu lampau")     
        // }
        
        


        const existingCuti= await this.findOne(id, userId,false);

        if (existingCuti.statusPermohonan>0) {
          throw new BadRequestException("Tidak Bisa Mengubah Permohonan Cuti karena sudah di submit")
        }

        var newCutiData= new CutiEntity()
        tanggalSelesai?newCutiData.tanggalSelesai=tanggalSelesai:null
        cutiData.tanggalMulai ? newCutiData.tanggalMulai= cutiData.tanggalMulai:null
        cutiData.jangkaWaktu ? newCutiData.jangkaWaktu= cutiData.jangkaWaktu:null
        cutiData.alasanCuti? newCutiData.alasanCuti=cutiData.alasanCuti:null
        cutiData.jenisLayanan? newCutiData.jenisLayanan=cutiData.jenisLayanan:null
        if(cutiData.skPengangkatan){
            newCutiData.skPengangkatan= new CutiSkPengangkatanPindahEntity()
            if(cutiData.skPengangkatan.file){
                var path
                if (existingCuti.skPengangkatan.file) {
                  path=existingCuti.skPengangkatan.file                  
                }
                else{
                  const uuidv4 = uuid.v4()
                  path=`/cuti/sk-pengangkatan/${uuidv4}.pdf`  
                }
                await this.uploadFile(path,cutiData.skPengangkatan.file)
                console.log("aaa")
                newCutiData.skPengangkatan.file=path
            }
            cutiData.skPengangkatan.nomor?newCutiData.skPengangkatan.nomor=cutiData.skPengangkatan.nomor:null
            cutiData.skPengangkatan.tanggal?newCutiData.skPengangkatan.tanggal=cutiData.skPengangkatan.tanggal:null
        }
        if(cutiData.beritaAcara) {
            newCutiData.beritaAcara =  new CutiBeritaAcaraEntity()
            if(cutiData.beritaAcara.file){
                var path
                if (existingCuti.beritaAcara.file) {
                  path=existingCuti.beritaAcara.file                  
                }
                else{
                  const uuidv4 = uuid.v4()
                  path=`/cuti/berita-acara/${uuidv4}.pdf`
                }
                await this.uploadFile(path,cutiData.beritaAcara.file)
                newCutiData.beritaAcara.file=path
            }
            cutiData.beritaAcara.nomor?newCutiData.beritaAcara.nomor=cutiData.beritaAcara.nomor:null
            cutiData.beritaAcara.tanggal?newCutiData.beritaAcara.tanggal=cutiData.beritaAcara.tanggal:null
        }
        
        if (cutiData.fileSertifikatCuti) {
          var path
          if (existingCuti.fileSertifikatCuti) {
            path=existingCuti.fileSertifikatCuti
          }
          else{
            const uuidv4 = uuid.v4()
            path=`/cuti/file-sertifikat-cuti/${uuidv4}`
          }
          await this.uploadFile(path,cutiData.fileSertifikatCuti)
          newCutiData.fileSertifikatCuti=path
        }

        if (cutiData.fileSkPejabatNegara) {
          var path
          if (existingCuti.fileSkPejabatNegara) {
            path=existingCuti.fileSkPejabatNegara
          }
          else{
            const uuidv4 = uuid.v4()
            path=`/cuti/file-sk-pejabat/${uuidv4}`
          }

          await this.uploadFile(path,cutiData.fileSkPejabatNegara)
          newCutiData.fileSkPejabatNegara=path
        }
        if (cutiData.notarisPenggantiSementara) {
          newCutiData.notarisPenggantiSementara= new CutiNotarisPenggantiEntity()
            cutiData.notarisPenggantiSementara.nama?newCutiData.notarisPenggantiSementara.nama=cutiData.notarisPenggantiSementara.nama:null
            cutiData.notarisPenggantiSementara.email?newCutiData.notarisPenggantiSementara.email=cutiData.notarisPenggantiSementara.email:null
            if (cutiData.notarisPenggantiSementara.fileFoto) {
                var path
                if (existingCuti.notarisPenggantiSementara.fileFoto) {
                  path=existingCuti.notarisPenggantiSementara.fileFoto
                }
                else{
                  const uuidv4 = uuid.v4()
                  path=`/cuti/notaris-pengganti-foto/${uuidv4}`
                }
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileFoto)
                newCutiData.notarisPenggantiSementara.fileFoto=path
            }

            if (cutiData.notarisPenggantiSementara.fileKtp) {
                var path
                if(existingCuti.notarisPenggantiSementara.fileKtp){
                  path=existingCuti.notarisPenggantiSementara.fileKtp
                }
                else{
                  const uuidv4 = uuid.v4()
                  path=`/cuti/notaris-pengganti-ktp/${uuidv4}`
                }

                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKtp)
                newCutiData.notarisPenggantiSementara.fileKtp=path

            }

            if (cutiData.notarisPenggantiSementara.fileIjazah) {
                var path
                  if(existingCuti.notarisPenggantiSementara.fileIjazah){
                    path=existingCuti.notarisPenggantiSementara.fileIjazah
                  }
                  else{
                    const uuidv4 = uuid.v4()
                    path=`/cuti/notaris-pengganti-ijazah/${uuidv4}`
                  }
                
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileIjazah)
                newCutiData.notarisPenggantiSementara.fileIjazah=path
            }

            if (cutiData.notarisPenggantiSementara.fileSkck) {
              var path
                if (existingCuti.notarisPenggantiSementara.fileSkck) {
                  path= existingCuti.notarisPenggantiSementara.fileSkck  
                }
                else{
                  const uuidv4 = uuid.v4()
                  path=`/cuti/notaris-pengganti-skck/${uuidv4}`
                }
                
                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileSkck)
                newCutiData.notarisPenggantiSementara.fileSkck=path
            }

            if (cutiData.notarisPenggantiSementara.fileRiwayatHidup) {
                var path
                if (existingCuti.notarisPenggantiSementara.fileRiwayatHidup) {
                  path=existingCuti.notarisPenggantiSementara.fileRiwayatHidup
                }
                else{
                  const uuidv4 = uuid.v4()
                  path=`/cuti/notaris-pengganti-riwayat-hidup/${uuidv4}`
                }

                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileRiwayatHidup)
                newCutiData.notarisPenggantiSementara.fileRiwayatHidup=path
            }

            if (cutiData.notarisPenggantiSementara.fileKeteranganBerkerja) {
                var path
                if (existingCuti.notarisPenggantiSementara.fileKeteranganBerkerja) {
                  path=existingCuti.notarisPenggantiSementara.fileKeteranganBerkerja
                }
                else{
                  const uuidv4 = uuid.v4()
                  path=`/cuti/notaris-pengganti-keterangan-bekerja/${uuidv4}`
                }

                await this.uploadFile(path,cutiData.notarisPenggantiSementara.fileKeteranganBerkerja)
                newCutiData.notarisPenggantiSementara.fileKeteranganBerkerja=path
            }
        }
        if (cutiData.notarisPemegangProtokol) {
          newCutiData.notarisPemegangProtokol=new CutiNotarisPemegangProtokolEntity()
            cutiData.notarisPemegangProtokol.nama?newCutiData.notarisPemegangProtokol.nama=cutiData.notarisPemegangProtokol.nama:null
            cutiData.notarisPemegangProtokol.alamat?newCutiData.notarisPemegangProtokol.alamat=cutiData.notarisPemegangProtokol.alamat:null
        }
        cutiData.voucherSimpadhu?newCutiData.voucherSimpadhu=cutiData.voucherSimpadhu:null
        newCutiData.userId=userId

        await this.cutiRepository.update(id, newCutiData);
      
        return this.findOne(id, userId,true);
      }

      async remove(id: string, userId:string): Promise<void> {
        try{
          const existing_record = await this.findOne(id,userId,false);
          if (existing_record.statusPermohonan>0) {
            throw new BadRequestException("Tidak Bisa menghapus permohonan cuti yang sudah di submit")
          }
          this.Delete(existing_record)
          await this.cutiBARepository.delete(existing_record.beritaAcara.id)
          await this.cutiSKRepository.delete(existing_record.skPengangkatan.id)
          await this.cutiNotarisProtokolRepository.delete(existing_record.notarisPemegangProtokol.id)
          await this.cutiNotarisPenggantiRepository.delete(existing_record.notarisPenggantiSementara.id)
          await this.cutiRepository.delete(id);
        }
        catch(err){
          throw err
        }
      }

      async submit(id:string, userId:string){
        const existing_record=await this.findOne(id,userId,false);
        if (existing_record.statusPermohonan>0) {
          throw new BadRequestException("Status Permohonan Cuti sudah pernah dikirim, tidak bisa lagi mengubah data cuti")
        }
        await this.cutiRepository.update(id,{statusPermohonan:1})
      }
}
