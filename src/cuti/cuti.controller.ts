import { Controller, Inject, Post, Body, Req, Res, UnauthorizedException, Param, Get, NotFoundException, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CutiService } from './cuti.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { Response, Request } from 'express';
import { DtoCutiFindAllResponse, DtoCutiRequest, DtoCutiFindAllRequest } from './cuti.dto';
import { generateCacheKeyCuti } from 'src/kondite/kondite.function';
import { CutiEntity } from './entity/cuti.entity';

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
            await this.cacheManager.set(generateCacheKeyCuti(this.userId, createdData.id), createdData);
            res.json(createdData)
        }
        catch(error){
            throw error
        }
      }

      @Get()
      @Roles(Role.Notaris)
      async getAllKondite(
          @Res() res: Response,
          @Req() req: Request,
          @Query('pageIndex') pageIndex: number = 1,
          @Query('pageSize') pageSize: number = 10,
          @Query('stringPencarian') stringPencarian?: string,
          @Query('sortBy') sortBy?: string,)
      {
          try{
              const body: DtoCutiFindAllRequest={
                  pageIndex:pageIndex,
                  pageSize:pageSize,
                  stringPencarian:stringPencarian,
                  sortBy:sortBy
              }
              const cachedKonditeEntries = await this.cacheManager.get<DtoCutiFindAllResponse[]>(generateCacheKeyCuti(this.userId,null,body));
              if (cachedKonditeEntries) {
                  return res.json(cachedKonditeEntries);
              }
              this.userId=req.user['id']
              if (!this.userId) {
                  throw new UnauthorizedException('No user id found');
              }
              const cutiEntries = await this.cutiService.findAll(this.userId,body);
              await this.cacheManager.set(generateCacheKeyCuti(this.userId,null,body), cutiEntries, 120);
              res.json(cutiEntries);
              
          }
          catch(error){
              throw error;
          }
      }

      @Get(':id')
      @Roles(Role.Notaris)
      async getAKondite(
          @Res() res: Response,
          @Req() req: Request,
          @Param('id') id: string)
      {
          try{
              this.userId=req.user['id']
              if (!this.userId) {
                  throw new UnauthorizedException('No user id found');
              }
              //caching
              const cachedKonditeEntries = await this.cacheManager.get<CutiEntity>(generateCacheKeyCuti(this.userId, id));
              if (cachedKonditeEntries) {
                  return res.json(cachedKonditeEntries);
              }
              //todb
              const cutiEntries = await this.cutiService.findOne(id, this.userId);
              if (!cutiEntries) {
                  throw new NotFoundException("Data Not Found")
              }
            await this.cacheManager.set(generateCacheKeyCuti(this.userId, cutiEntries.id), cutiEntries);
              res.json(cutiEntries);
          }
          catch(error){
              throw error;
          }
      }

}
