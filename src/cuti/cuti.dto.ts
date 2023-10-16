export class DtoCutiRequest  {
    tanggalMulai: Date;
    jangkaWaktu: number;
    alasanCuti: number;
    skPengangkatan: {
        file: string;
        nomor: string;
        tanggal: Date;
    };
    beritaAcara: {
        file: string;
        nomor: string;
        tanggal: Date
    };
    fileSertifikatCuti: string;
    fileSkPejabatNegara: string;
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
    notarisPemegangProtokol: {
        nama: string;
        alamat: string;
    }
    voucherSimpadhu: string;
}