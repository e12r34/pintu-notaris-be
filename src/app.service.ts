import { Get, Injectable, Param, Req, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }


}
