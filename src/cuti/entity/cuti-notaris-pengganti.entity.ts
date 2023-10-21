import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { CutiEntity } from './cuti.entity';


@Entity() // Make sure the name matches your table name in the database
export class CutiNotarisPenggantiEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({default:""})
    nama: string;
  
    @Column({default:""})
    email: string;

    @Column({default:""})
    fileFoto: string;

    @Column({default:""})
    fileKtp: string;
  
    @Column({default:""})
    fileIjazah: string;

    @Column({default:""})
    fileSkck: string;

    @Column({default:""})
    fileRiwayatHidup: string;

    @Column({default:""})
    fileKeteranganBerkerja: string;

    // @OneToOne(() => CutiEntity, (cuti) => cuti.skPengangkatan)
    // cuti: CutiEntity;
}