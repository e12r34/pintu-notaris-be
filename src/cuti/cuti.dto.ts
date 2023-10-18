import { ApiProperty } from "@nestjs/swagger";

export class DtoCutiRequest  {
    @ApiProperty({ example: '2023-10-13 00:00:00', description: 'Tanggal Mulai Cuti' })
    tanggalMulai: Date;
    
    @ApiProperty({ example: 2, description: 'Berapa lama cutinya (dalam bulan)' })
    jangkaWaktu: number;
    
    @ApiProperty({ example: 1, description: 'Alasan Cuti Berdasarkan Katalog' })
    alasanCuti: number;
    
    @ApiProperty({ example: 1, description: 'jenisLayanan Cuti' })
    jenisLayanan:number;

    @ApiProperty({ example: {file:"base64 File", nomor:"29/SK/02/2022",tanggal:'2023-10-13 00:00:00'}, description: 'File SK, Nomor SK, dan tanggal SK' })
    skPengangkatan: {
        file: string;
        nomor: string;
        tanggal: Date;
    };
    @ApiProperty({ example: {file:"base64 File", nomor:"29/BA/02/2022",tanggal:'2023-10-13 00:00:00'}, description: 'File BA, Nomor BA, dan tanggal BA' })
    beritaAcara: {
        file: string;
        nomor: string;
        tanggal: Date
    };

    @ApiProperty({ example: '1', description: 'Base64 File' })
    fileSertifikatCuti: string;

    @ApiProperty({ example: '1', description: 'Base64 File' })
    fileSkPejabatNegara: string;

    @ApiProperty({ example: {nama:"nama",email:"email",fileFoto:"base64 Foto",fileKtp:"base64 KTP", fileIjazah:"base64 Ijazah", fileSkck:"base64 skck",fileRiwayatHidup:"base64 drh",fileKeteranganBerkerja:"base64 keterangan bekerja"}, description: 'Base64 File' })
    notarisPenggantiSementara: {
        nama: string;
        email: string;
        fileFoto: string;
        fileKtp: string;
        fileIjazah: string;
        fileSkck: string;
        fileRiwayatHidup: string;
        fileKeteranganBerkerja: string;
    };
    @ApiProperty({ example: {nama:"nama",alamat:"alamat"}, description: 'Nama notaris dan Alamat' })
    notarisPemegangProtokol: {
        nama: string;
        alamat: string;
    }
    @ApiProperty({ example: 'kode voucher', description: 'Base64 File' })
    voucherSimpadhu: string;
}

export class DtoCutiFindAllRequest{
    pageIndex?:number
    pageSize?:number
    stringPencarian?:any;
    sortBy?:any;
}

export class DtoCutiFindAllResponse{
    id:string;
    nomorPermohonan:string;
    namaNotaris:string;
    jenisLayanan:string;
    tanggalPermohonan:Date;
    statusPermohonan:number;
}
