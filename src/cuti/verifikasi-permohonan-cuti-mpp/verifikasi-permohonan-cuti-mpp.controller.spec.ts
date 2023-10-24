import { Test, TestingModule } from '@nestjs/testing';
import { VerifikasiPermohonanCutiMppController } from './verifikasi-permohonan-cuti-mpp.controller';

describe('VerifikasiPermohonanCutiMppController', () => {
  let controller: VerifikasiPermohonanCutiMppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifikasiPermohonanCutiMppController],
    }).compile();

    controller = module.get<VerifikasiPermohonanCutiMppController>(VerifikasiPermohonanCutiMppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
