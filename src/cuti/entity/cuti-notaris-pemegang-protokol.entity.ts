import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { CutiEntity } from './cuti.entity';


@Entity() // Make sure the name matches your table name in the database
export class CutiNotarisPemegangProtokolEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nama: string;
  
    @Column()
    alamat: string;

    @OneToOne(() => CutiEntity, (cuti) => cuti.skPengangkatan)
    cuti: CutiEntity;
}