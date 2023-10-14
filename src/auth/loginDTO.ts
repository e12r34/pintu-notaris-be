export class LoginDto {
    username: string;
    password: string;    
  }

export class LoginResultDto{
  message: string;
  access_token: string;
  refresh_token?: string;
}

export class modelCuti{
  tanggalMulai: Date;
  jangkaWaktu: string;
  alasanCuti: string;
  fileSKPengangkatan:string;
  fileBeritaAcara:string;
  fileSertifikatCuti:string;
  fileSKPejabatNegara:string;
  notarisPenggantiSementara:{
    nama:string;
    email:string;
    fileFoto:string;
    fileKtp:string;
    fileIjazah:string;
    fileSkck:string;
    fileRiwayatHidup:string;
    fileKeteranganBerkerja:string;
  };
  notarisPemegangProtokol:{
    nama:string;
    alamat:string;
  };
  voucherSimpadu:string;
}