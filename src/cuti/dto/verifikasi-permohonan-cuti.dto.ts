export class DtoCutiVerifFindAllRequest{
    pageIndex?:number
    pageSize?:number
    stringPencarian?:any;
    sortBy?:any;
}

export class DtoCutiVerifFindAllResponseData{
    id:string;
    nomorPermohonan:string;
    namaNotaris:string;
    jenisLayanan:string;
    tanggalPermohonan:Date;
    statusPermohonan:number; 
    tanggalMulai:Date;
    jangkaWaktu:number;
    tanggalSelesai:Date;
}

export class DtoCutiVerifFindAllResponse{
    data:DtoCutiVerifFindAllResponseData[];
    total:number
}
