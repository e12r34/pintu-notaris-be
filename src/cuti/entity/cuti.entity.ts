import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CutiSkPengangkatanPindahEntity } from './cuti-sk-pengangkatan.entity';
import { CutiBeritaAcaraEntity } from './cuti-berita-acara.entity';
import { CutiNotarisPenggantiEntity } from './cuti-notaris-pengganti.entity';
import { CutiNotarisPemegangProtokolEntity } from './cuti-notaris-pemegang-protokol.entity';
import { nows } from '../cuti.function';
import { CutiVerifikasiMPD } from './cuti-verifikasi-mpd.entity';
import { CutiVerifikasiMPP } from './cuti-verifikasi-mpp.entity';
import { CutiVerifikasiMPW } from './cuti-verifikasi-mpw.entity';

@Entity('Cuti') // Make sure the name matches your table name in the database
export class CutiEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default:"CUTI-XXXX-1"})
  nomorPermohonan: string;

  @Column()
  userId: string;

  @Column()
  namaNotaris: string;
  
  @Column({default:0})
  jenisLayanan: number;

  @Column()
  tanggalMulai: Date;

  @Column()
  tanggalSelesai: Date;

  @Column()
  jangkaWaktu: number;

  @Column()
  alasanCuti: number;

  @Column({default:new Date(Date.now())})
  tanggalPermohonan: Date;

  @Column()
  fileSertifikatCuti: string;
  
  @Column({default:""})
  fileSkPejabatNegara: string;
  
  @Column()
  voucherSimpadhu: string;

  @Column({default:0})
  statusPermohonan: number;

  @Column({default:"0000-00-00 00:00:00"})
  tanggalVerifikasi: Date;

  @Column({default:""})
  CatatanTolakVerifikasi: string;

  @Column({default:false})
  isSubmit: boolean;

  @OneToOne(() => CutiSkPengangkatanPindahEntity, {cascade:true, onDelete:'CASCADE', onUpdate:'CASCADE'})
  @JoinColumn()
  skPengangkatan: CutiSkPengangkatanPindahEntity;

  @OneToOne(() => CutiBeritaAcaraEntity, { cascade:true, onDelete:'CASCADE',onUpdate:'CASCADE' })
  @JoinColumn()
  beritaAcara: CutiBeritaAcaraEntity;

  @OneToOne(() => CutiNotarisPenggantiEntity, { cascade:true, onDelete:'CASCADE',onUpdate:'CASCADE' })
  @JoinColumn()
  notarisPenggantiSementara: CutiNotarisPenggantiEntity

  @OneToOne(() => CutiNotarisPemegangProtokolEntity, { cascade: true, onDelete:'CASCADE',onUpdate:'CASCADE' })
  @JoinColumn()
  notarisPemegangProtokol: CutiNotarisPemegangProtokolEntity

  @OneToOne(() => CutiVerifikasiMPD, {cascade:true, onDelete:'CASCADE', onUpdate:'CASCADE'})
  @JoinColumn()
  verifikasiMPD: CutiVerifikasiMPD;

  @OneToOne(() => CutiVerifikasiMPW, {cascade:true, onDelete:'CASCADE', onUpdate:'CASCADE'})
  @JoinColumn()
  verifikasiMPW: CutiVerifikasiMPW;

  @OneToOne(() => CutiVerifikasiMPP, {cascade:true, onDelete:'CASCADE', onUpdate:'CASCADE'})
  @JoinColumn()
  verifikasiMPP: CutiVerifikasiMPP;
}
