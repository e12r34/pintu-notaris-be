import { Test, TestingModule } from '@nestjs/testing';
import { KonditeController } from './kondite.controller';

describe('KonditeController', () => {
  let controller: KonditeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KonditeController],
    }).compile();

    controller = module.get<KonditeController>(KonditeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
