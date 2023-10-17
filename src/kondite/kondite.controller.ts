import { Controller, Post, Body, Res, Req, Get, Param, Put, Delete, NotFoundException, BadRequestException, UnauthorizedException, Inject, Query } from '@nestjs/common';
import { KonditeEntity } from './entity/kondite.entity';
import { Response, Request } from 'express';
import { KonditeService } from './kondite.service';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger/dist';
import { generateCacheKey } from './kondite.function';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DtoKonditeFindAllRequest, DtoKonditeFindAllResponse } from './kondite.dto';

@ApiBearerAuth()
@Controller('api/kondite')
export class KonditeController {

    userId:string;
    constructor(
        private readonly konditeService: KonditeService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
      ) {}


    @Post()
    @Roles(Role.Notaris)
    async createNewKondite(
        @Body() konditeData: KonditeEntity,
        @Req() req: Request,
        @Res() res: Response,
        )
    {
        try{
             // Cache the result
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            konditeData.userId=this.userId
            const createdKondite = await this.konditeService.create(konditeData)
            if(!createdKondite)
            {
                throw new BadRequestException('Invalid data received');
            }
            await this.cacheManager.set(generateCacheKey(this.userId, createdKondite.id), createdKondite);
            res.json(createdKondite)
        }
        catch(error){
            throw error;
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
            const body: DtoKonditeFindAllRequest={
                pageIndex:pageIndex,
                pageSize:pageSize,
                stringPencarian:stringPencarian,
                sortBy:sortBy
            }
            const cachedKonditeEntries = await this.cacheManager.get<DtoKonditeFindAllResponse[]>(generateCacheKey(this.userId,null,body));
            if (cachedKonditeEntries) {
                return res.json(cachedKonditeEntries);
            }
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            const konditeEntries = await this.konditeService.findAll(this.userId,body);
            res.json(konditeEntries);
            await this.cacheManager.set(generateCacheKey(this.userId,null,body), konditeEntries, 120);
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
            const cachedKonditeEntries = await this.cacheManager.get<KonditeEntity>(generateCacheKey(this.userId, id));
            if (cachedKonditeEntries) {
                return res.json(cachedKonditeEntries);
            }
            //todb
            const konditeEntries = await this.konditeService.findOne(id, this.userId);
            if (!konditeEntries) {
                throw new NotFoundException("Data Not Found")
            }
            await this.cacheManager.set(generateCacheKey(this.userId, konditeEntries.id), konditeEntries);
            res.json(konditeEntries);
        }
        catch(error){
            throw error;
        }
    }

    @Put(':id')
    @Roles(Role.Notaris)
    async updateKondite(
        @Res() res: Response,
        @Param('id') id: string, 
        @Req() req: Request,
        @Body() updateKonditeDto: KonditeEntity) 
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            const updatedKondite = await this.konditeService.update(id, updateKonditeDto, this.userId);
            await this.cacheManager.set(generateCacheKey(this.userId, updateKonditeDto.id), updateKonditeDto);
            res.json(updatedKondite);
        }
        catch(err){
            throw err;
        }
    }
  
    @Delete(':id')
    @Roles(Role.Notaris)
    async removeKondite(
        @Res() res: Response,
        @Req() req: Request,
        @Param('id') id: string) 
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            await this.konditeService.remove(id, this.userId);
            res.json({ message: 'Kondite entry deleted successfully' })
        }
        catch(err){
            throw err;
        }
    }
}
