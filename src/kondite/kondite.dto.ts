export class DtoKonditeFindAllResponse{
    id:string;
    nomorPermohonan:string;
    namaNotaris:string;
    jenisLayanan:string;
    tanggalPermohonan:Date;
    statusPermohonan:number;
}

export class DtoKonditeFindAllRequest{
    pageIndex?:number
    pageSize?:number
    stringPencarian?:any;
    sortBy?:any;
}
