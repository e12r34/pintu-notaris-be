import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { CutiEntity } from './cuti.entity';


@Entity() // Make sure the name matches your table name in the database
export class CutiBeritaAcaraEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nomor: string;
  
    @Column({ type: 'date' })
    tanggal: Date;
  
    @Column()
    file: string;
  
    // @OneToOne(() => CutiEntity, (cuti) => cuti.beritaAcara)
    // cuti: CutiEntity;
}
