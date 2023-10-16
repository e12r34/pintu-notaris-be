import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { KonditeEntity } from './kondite.entity';

@Entity()
export class BeritaAcaraSumpahEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nomorSurat: string;

  @Column()
  tanggalSurat: Date;

  @Column()
  file: string;

  @OneToOne(() => KonditeEntity, (kondite) => kondite.beritaAcaraSumpah)
  kondite: KonditeEntity;
}
