import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity() // Make sure the name matches your table name in the database
export class CutiSkPengangkatanPindahEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nomor: string;
  
    @Column({ type: 'date' })
    tanggal: Date;
  
    @Column({default:""})
    file: string;
  
    // @OneToOne(() => CutiEntity, (cuti) => cuti.skPengangkatan,{eager:true, onDelete:'CASCADE'})
    // @OneToOne(() => CutiEntity, { onDelete:'CASCADE'})
    // @JoinColumn()
    // cuti: CutiEntity;
}
