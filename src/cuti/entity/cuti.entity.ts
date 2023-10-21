import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CutiSkPengangkatanPindahEntity } from './cuti-sk-pengangkatan.entity';
import { CutiBeritaAcaraEntity } from './cuti-berita-acara.entity';
import { CutiNotarisPenggantiEntity } from './cuti-notaris-pengganti.entity';
import { CutiNotarisPemegangProtokolEntity } from './cuti-notaris-pemegang-protokol.entity';
import { nows } from '../cuti.function';

@Entity('Cuti') // Make sure the name matches your table name in the database
export class CutiEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default:"CUTI-XXXX-1"})
  nomorPermohonan: string;

  @Column()
  userId: string;
  
  @Column()
  jenisLayanan: number;

  @Column()
  tanggalMulai: Date;

  @Column()
  tanggalSelesai: Date;

  @Column()
  jangkaWaktu: number;

  @Column()
  alasanCuti: number;

  @Column({default:nows()})
  tanggalPermohonan: Date;

  @Column()
  fileSertifikatCuti: string;
  
  @Column()
  fileSkPejabatNegara: string;
  
  @Column()
  voucherSimpadhu: string;

  @Column({default:0})
  statusPermohonan: number;

  @OneToOne(() => CutiSkPengangkatanPindahEntity, {eager:true})
  @JoinColumn()
  skPengangkatan: CutiSkPengangkatanPindahEntity;

  @OneToOne(() => CutiBeritaAcaraEntity, { cascade:true })
  @JoinColumn()
  beritaAcara: CutiBeritaAcaraEntity;

  @OneToOne(() => CutiNotarisPenggantiEntity, { cascade:true })
  @JoinColumn()
  notarisPenggantiSementara: CutiNotarisPenggantiEntity

  @OneToOne(() => CutiNotarisPemegangProtokolEntity, { cascade: true })
  @JoinColumn()
  notarisPemegangProtokol: CutiNotarisPemegangProtokolEntity
}
