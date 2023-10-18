import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CutiSkPengangkatanPindahEntity } from './cuti-sk-pengangkatan.entity';
import { CutiBeritaAcaraEntity } from './cuti-berita-acara.entity';
import { NotarisPenggantiEntity } from './notaris-pengganti.entity';
import { NotarisPemegangProtokolEntity } from './notaris-pemegang-protokol.entity';

function now():string {
  const skrg=Date.now()
  const date = new Date(skrg);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}
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
  jangkaWaktu: number;

  @Column()
  alasanCuti: number;

  @Column({default:now()})
  tanggalPermohonan: Date;

  @Column()
  fileSertifikatCuti: string;
  
  @Column()
  fileSkPejabatNegara: string;
  
  @Column()
  voucherSimpadhu: string;

  @Column({default:0})
  statusPermohonan: number;

  @OneToOne(() => CutiSkPengangkatanPindahEntity, { cascade: true, eager: true })
  @JoinColumn()
  skPengangkatan: CutiSkPengangkatanPindahEntity;

  @OneToOne(() => CutiBeritaAcaraEntity, { cascade: true, eager: true })
  @JoinColumn()
  beritaAcara: CutiBeritaAcaraEntity;

  @OneToOne(() => NotarisPenggantiEntity, { cascade: true, eager: true })
  @JoinColumn()
  notarisPenggantiSementara: NotarisPenggantiEntity

  @OneToOne(() => NotarisPemegangProtokolEntity, { cascade: true, eager: true })
  @JoinColumn()
  notarisPemegangProtokol: NotarisPemegangProtokolEntity
  newCutiData: {};
}
