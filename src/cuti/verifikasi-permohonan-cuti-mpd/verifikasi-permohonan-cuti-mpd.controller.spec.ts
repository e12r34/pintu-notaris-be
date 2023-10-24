import { Test, TestingModule } from '@nestjs/testing';
import { VerifikasiPermohonanCutiMpdController } from './verifikasi-permohonan-cuti-mpd.controller';

describe('VerifikasiPermohonanCutiMpdController', () => {
  let controller: VerifikasiPermohonanCutiMpdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifikasiPermohonanCutiMpdController],
    }).compile();

    controller = module.get<VerifikasiPermohonanCutiMpdController>(VerifikasiPermohonanCutiMpdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
