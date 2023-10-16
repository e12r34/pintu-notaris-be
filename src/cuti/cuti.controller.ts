import { Controller, Inject, Post, Body, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CutiService } from './cuti.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { Response, Request } from 'express';
import { DtoCutiRequest } from './cuti.dto';

@ApiBearerAuth()
@Controller('api/cuti')
export class CutiController {

    userId:string;
    constructor(
        private readonly cutiService: CutiService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
      ) {}

      @Post()
      @Roles(Role.Notaris)
      async createNewCuti(
        @Body() cutiData: DtoCutiRequest,
        @Req() req: Request,
        @Res() res: Response,
      ){
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }   
            const createdData=await this.cutiService.create(cutiData,this.userId);
            res.json(createdData)
        }
        catch(error){
            throw error
        }
      }

}
