import { ApiProperty } from "@nestjs/swagger";

export class DtoCutiRejectMPW  {
    @ApiProperty({ example: 'alasan Cuti ditolak', description: 'Alasan cuti ditolak' })
    alasan: string;
}