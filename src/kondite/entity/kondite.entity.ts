import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { SkPengangkatanPindahEntity } from './sk-pengangkatan-pindah.entity';
import { BeritaAcaraSumpahEntity } from './berita-acara-sumpah.entity';
import { SuratPernyataanJumlahAktaNotarisEntity } from './surat-pernyataan-jumlah-akta-notaris.entity';
import { SuratPernyataanPemegangProtokolEntity } from './surat-pernyataan-pemegang-protokol.entity';

@Entity('Kondite') // Make sure the name matches your table name in the database
export class KonditeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jenisLayanan: string;

  @Column()
  kodeVoucher: string;

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
