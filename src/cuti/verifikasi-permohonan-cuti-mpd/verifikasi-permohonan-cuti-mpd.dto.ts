import { ApiProperty } from "@nestjs/swagger";

export class DtoCutiRejectMPD  {
    @ApiProperty({ example: 'alasan Cuti ditolak', description: 'Alasan cuti ditolak' })
    alasan: string;
}