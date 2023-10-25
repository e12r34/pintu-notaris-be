import config from 'src/config';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CutiEntity } from '../entity/cuti.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CutiBeritaAcaraEntity } from '../entity/cuti-berita-acara.entity';
import { CutiSkPengangkatanPindahEntity } from '../entity/cuti-sk-pengangkatan.entity';
import { CutiNotarisPemegangProtokolEntity } from '../entity/cuti-notaris-pemegang-protokol.entity';
import { CutiNotarisPenggantiEntity } from '../entity/cuti-notaris-pengganti.entity';
import { User } from 'src/auth/user.entity';
import { Repository, LessThan, ILike } from 'typeorm';
import { InjectMinio } from 'nestjs-minio';
import { DtoCutiVerifFindAllRequest, DtoCutiVerifFindAllResponse, DtoCutiVerifFindAllResponseData } from '../dto/verifikasi-permohonan-cuti.dto';
import { DtoCutiRejectMPD } from './verifikasi-permohonan-cuti-mpd.dto';

@Injectable()
export class VerifikasiPermohonanCutiMpdService {
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

      async findAll(userId: string, body: DtoCutiVerifFindAllRequest): Promise<DtoCutiVerifFindAllResponse> {
        let sort = {};
        if (body.sortBy) {
            sort['order'] = {
                [body.sortBy]: body.isSortAscending ? 'ASC' : 'DESC'
            };
        }
        
        const searchConditions = [];
        if (body.stringPencarian) {
            searchConditions.push({ nomorPermohonan: ILike(`%${body.stringPencarian}%`) });
            searchConditions.push({ namaNotaris: ILike(`%${body.stringPencarian}%`) });
        }
    
        const commonConditions = { 
            isSubmit: true 
        };
    
        const combinedConditions = [
          {
            ...commonConditions,
            isSubmit:true,
            jenisLayanan:0,
            jangkaWaktu:LessThan(6)
          },
          {
            ...commonConditions,
            isSubmit:true,
            jenisLayanan:1
          }
        ];
    
        if (searchConditions.length > 0) {
            combinedConditions.forEach(cond => Object.assign(cond, { or: searchConditions }));
        }
    
        const skip = (body.pageIndex - 1) * body.pageSize;
        const records: any = await this.cutiRepository.find({
            ...sort,
            where: combinedConditions,
            select: {
              id: true,
              jenisLayanan: true,
              tanggalPermohonan: true,
              nomorPermohonan: true,
              statusPermohonan: true,
              userId: true,
              namaNotaris:true,
              tanggalMulai:true,
              jangkaWaktu:true,
              tanggalSelesai:true
            },
            take: body.pageSize,
            skip: skip,
        });
    
        if (records.length === 0) {
            throw new NotFoundException('Records Cuti Not found');
        }
    
        const totalCount = await this.cutiRepository.count({ where: combinedConditions });
    
        return {
            data: [...records],
            total: totalCount
        };
      }

      async findOne(id: string, isGetFile: Boolean=true): Promise<CutiEntity> {
        const record:any= await this.cutiRepository.findOne({
          where:  [
            {
              id:id,
              isSubmit:true,
              jangkaWaktu:LessThan(6),
              jenisLayanan:0,

            },
            {
              id:id,
              isSubmit:true,
              jenisLayanan:1
            }
          ]
          ,
          relations: ['skPengangkatan', 'beritaAcara', 'notarisPenggantiSementara', 'notarisPemegangProtokol','verifikasiMPD','verifikasiMPW','verifikasiMPP'],
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

      async submit(id:string, userId:string){
        const existing_record=await this.findOne(id,false);
        if (existing_record.statusPermohonan!=1) {
          throw new BadRequestException("Status Permohonan Cuti sudah pernah diaprove atau di tolak, tidak bisa lagi melakukan verifikasi data cuti")
        }
        const chosenUsername = await this.userRepository.findOne({
          where:{
            id: userId
          },
          select:{
            nama: true,
          }
        })

        console.log(id)
        var newValue: any={}
        
        existing_record.jenisLayanan===0? newValue.statusPermohonan=3: newValue.statusPermohonan=2
        newValue.tanggalVerifikasi=new Date(Date.now())
        newValue.verifikasiMPD={}
        newValue.verifikasiMPD.isVerified=true
        newValue.verifikasiMPD.mpdId=userId        
        newValue.verifikasiMPD.mpdNama=chosenUsername.nama
        newValue.verifikasiMPD.kodeVoucher=existing_record.voucherSimpadhu
        newValue.verifikasiMPD.tanggalVerif=new Date(Date.now())

        newValue.id=id
        await this.cutiRepository.save(newValue)
      }

      async reject(id:string, dtoReject: DtoCutiRejectMPD, userId:string){
        const existing_record=await this.findOne(id,false);
        if (existing_record.statusPermohonan>1) {
          throw new BadRequestException("Status Permohonan Cuti sudah pernah diaprove atau di tolak, tidak bisa lagi melakukan verifikasi data cuti")
        }
        const chosenUsername = await this.userRepository.findOne({
          where:{
            id: userId
          },
          select:{
            nama: true,
          }
        })

        var newValue: any={}
        newValue.id=id
        newValue.tanggalVerifikasi=new Date(Date.now())
        newValue.statusPermohonan=99
        newValue.CatatanTolakVerifikasi=dtoReject.alasan
        
        newValue.verifikasiMPD={}
        newValue.verifikasiMPD.isVerified=false
        newValue.verifikasiMPD.mpdId=userId        
        newValue.verifikasiMPD.mpdNama=chosenUsername.nama
        newValue.verifikasiMPD.kodeVoucher=existing_record.voucherSimpadhu
        newValue.verifikasiMPD.tanggalVerif=new Date(Date.now())
        newValue.verifikasiMPD.catatan=dtoReject.alasan
        

        await this.cutiRepository.save(newValue)
      }
}
