import { Test, TestingModule } from '@nestjs/testing';
import { KonditeService } from './kondite.service';

describe('KonditeService', () => {
  let service: KonditeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KonditeService],
    }).compile();

    service = module.get<KonditeService>(KonditeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
