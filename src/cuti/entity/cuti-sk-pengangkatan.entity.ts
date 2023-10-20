import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { CutiEntity } from './cuti.entity';


@Entity() // Make sure the name matches your table name in the database
export class CutiSkPengangkatanPindahEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nomor: string;
  
    @Column({ type: 'date' })
    tanggal: Date;
  
    @Column()
    file: string;
  
    @OneToOne(() => CutiEntity, (cuti) => cuti.skPengangkatan,{onDelete:'CASCADE'})
    @JoinColumn()
    cuti: CutiEntity;
}
