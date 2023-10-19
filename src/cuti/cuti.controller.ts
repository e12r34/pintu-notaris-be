import { Controller, Inject, Post, Body, Req, Res, UnauthorizedException, Param, Get, NotFoundException, Query, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CutiService } from './cuti.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { Response, Request } from 'express';
import { DtoCutiFindAllResponse, DtoCutiRequest, DtoCutiFindAllRequest } from './cuti.dto';
import { generateCacheKeyCuti } from 'src/kondite/kondite.function';
import { CutiEntity } from './entity/cuti.entity';
import { parsingTanggal } from './cuti.function';

@ApiBearerAuth()
@ApiTags('Cuti')
@Controller('api/cuti')
export class CutiController {
    userId:string;
    constructor(
        private readonly cutiService: CutiService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
      ) {}

    @Post()
    @Roles(Role.Notaris)
    @ApiBody({
        type: DtoCutiRequest, // Specify the DTO class representing the request body
        description: 'Tambah sebuah record cuti', // Description of the request body
      })
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
        // res.json({status:"Success"})
        
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
    @ApiQuery({ name: 'pageIndex', type: Number, required: false, description: 'Page Index' })
    @ApiQuery({ name: 'pageSize', type: Number, required: false, description: 'Page Size' })
    @ApiQuery({ name: 'stringPencarian', type: String, required: false, description: 'string yang akan dicari' })
    @ApiQuery({ name: 'sortBy', type: String, required: false, description: 'di sort dari field apa' })
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
            await this.cacheManager.set(generateCacheKeyCuti(this.userId,null,body), cutiEntries, 30);
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

    @Put(':id')
    @Roles(Role.Notaris)
    @ApiBody({
        type: DtoCutiRequest, // Specify the DTO class representing the request body
        description: 'Edit sebuah record cuti', // Description of the request body
      })
    async updateKondite(
        @Res() res: Response,
        @Param('id') id: string, 
        @Req() req: Request,
        @Body() updateCutiDto: DtoCutiRequest) 
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            const updatedCuti = await this.cutiService.update(id, updateCutiDto, this.userId);
            await this.cacheManager.set(generateCacheKeyCuti(this.userId, updatedCuti.id), updatedCuti);
            res.json(updatedCuti);
        }
        catch(err){
            throw err;
        }
    }  

    @Delete(':id')
    @Roles(Role.Notaris)
    async removeCuti(
        @Res() res: Response,
        @Req() req: Request,
        @Param('id') id: string) 
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            await this.cutiService.remove(id, this.userId);
            res.json({ message: 'Cuti entry deleted successfully' })
        }
        catch(err){
            throw err;
        }
    }

    @Post('/submit/:id')
    @Roles(Role.Notaris)
    async submitCuti(
        @Res() res: Response,
        @Req() req: Request,
        @Param('id') id: string) 
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }

            await this.cutiService.submit(id,this.userId)
            res.json({message: `Success Submit data cuti`})
        }
        catch(error){
            throw error;
        }
    }
}
