import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { CutiEntity } from './cuti.entity';


@Entity() // Make sure the name matches your table name in the database
export class NotarisPenggantiEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nama: string;
  
    @Column()
    email: string;

    @Column()
    fileFoto: string;

    @Column()
    fileKtp: string;
  
    @Column()
    fileIjazah: string;

    @Column()
    fileSkck: string;

    @Column()
    fileRiwayatHidup: string;

    @Column()
    fileKeteranganBerkerja: string;

    @OneToOne(() => CutiEntity, (cuti) => cuti.skPengangkatan)
    cuti: CutiEntity;
}