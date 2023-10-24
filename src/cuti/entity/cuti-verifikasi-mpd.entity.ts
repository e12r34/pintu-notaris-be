import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';



@Entity() // Make sure the name matches your table name in the database
export class CutiVerifikasiMPD {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'date' })
    tanggalVerif: Date;
  
    @Column({default:""})
    catatan: string;

    @Column()
    kodeVoucher: string;

    @Column()
    isVerified: boolean

    @Column()
    mpdId: string;

    @Column()
    mpdNama: string;
}
