import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { KonditeEntity } from './kondite.entity';

@Entity()
export class SuratPernyataanJumlahAktaNotarisEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nomorSurat: string;

  @Column({ type: 'date' })
  tanggalSurat: Date;

  @Column()
  jumlahAktaDisahkan: number;

  @Column()
  jumlahAktaDibutuhkan: number;

  @Column()
  file: string;

  @OneToOne(() => KonditeEntity, (kondite) => kondite.suratPernyataanJumlahAktaNotaris)
  kondite: KonditeEntity;
}
