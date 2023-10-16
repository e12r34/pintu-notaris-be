import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { SkPengangkatanPindahEntity } from './sk-pengangkatan-pindah.entity';
import { BeritaAcaraSumpahEntity } from './berita-acara-sumpah.entity';
import { SuratPernyataanJumlahAktaNotarisEntity } from './surat-pernyataan-jumlah-akta-notaris.entity';
import { SuratPernyataanPemegangProtokolEntity } from './surat-pernyataan-pemegang-protokol.entity';
function now():string {
  const skrg=Date.now()
  const date = new Date(skrg);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}
@Entity('Kondite') // Make sure the name matches your table name in the database
export class KonditeEntity {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jenisLayanan: string;

  @Column()
  kodeVoucher: string;

  @Column({default:now()})
  tanggalPermohonan: Date;

  @Column({default:0})
  statusPermohonan: number;

  @Column({default:"KONDITE-XXXX-1"})
  nomorPermohonan: string;

  @OneToOne(() => SkPengangkatanPindahEntity, { cascade: true, eager: true })
  @JoinColumn()
  skPengangkatanPindah: SkPengangkatanPindahEntity;

  @OneToOne(() => BeritaAcaraSumpahEntity, { cascade: true, eager: true })
  @JoinColumn()
  beritaAcaraSumpah: BeritaAcaraSumpahEntity;

  @OneToOne(() => SuratPernyataanJumlahAktaNotarisEntity, { cascade: true, eager: true })
  @JoinColumn()
  suratPernyataanJumlahAktaNotaris: SuratPernyataanJumlahAktaNotarisEntity;

  @OneToOne(() => SuratPernyataanPemegangProtokolEntity, { cascade: true, eager: true })
  @JoinColumn()
  suratPernyataanPemegangProtokol: SuratPernyataanPemegangProtokolEntity;

  @Column()
  userId: string;
}
