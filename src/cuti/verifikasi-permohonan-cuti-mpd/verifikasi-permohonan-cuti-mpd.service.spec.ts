import { Test, TestingModule } from '@nestjs/testing';
import { VerifikasiPermohonanCutiMpdService } from './verifikasi-permohonan-cuti-mpd.service';

describe('VerifikasiPermohonanCutiMpdService', () => {
  let service: VerifikasiPermohonanCutiMpdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifikasiPermohonanCutiMpdService],
    }).compile();

    service = module.get<VerifikasiPermohonanCutiMpdService>(VerifikasiPermohonanCutiMpdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
