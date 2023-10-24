import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';



@Entity() // Make sure the name matches your table name in the database
export class CutiVerifikasiMPW {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'date' })
    tanggalVerif: Date;
  
    @Column()
    catatan: string;

    @Column()
    kodeVoucher: string;

    @Column()
    isVerified: string

    @Column()
    mpwId: string;

    @Column()
    mpwNama: string;
}
