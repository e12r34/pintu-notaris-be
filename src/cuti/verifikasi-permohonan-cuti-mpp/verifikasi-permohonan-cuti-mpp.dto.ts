import { ApiProperty } from "@nestjs/swagger";

export class DtoCutiRejectMPP  {
    @ApiProperty({ example: 'alasan Cuti ditolak', description: 'Alasan cuti ditolak' })
    alasan: string;
}