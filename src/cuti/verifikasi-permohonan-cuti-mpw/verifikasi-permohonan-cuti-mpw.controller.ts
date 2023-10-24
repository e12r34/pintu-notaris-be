import { DtoCutiRejectMPW } from './verifikasi-permohonan-cuti-mpw.dto';
import { Controller, Get, Inject, Param, Query, Req, Res, UnauthorizedException, NotFoundException, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { DtoCutiVerifFindAllRequest } from '../dto/verifikasi-permohonan-cuti.dto';
import { Request, Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { VerifikasiPermohonanCutiMpwService } from './verifikasi-permohonan-cuti-mpw.service';
import { Cache } from 'cache-manager';
import { CutiEntity } from '../entity/cuti.entity';
import { generateCacheKeyCuti } from 'src/kondite/kondite.function';

@ApiBearerAuth()
@ApiTags('Verifikasi Permohonan Cuti MPW')
@Roles(Role.MPW)
@Controller('api/VerifikasiPermohonanCutiMPW')
export class VerifikasiPermohonanCutiMpwController {
    userId:string;
    constructor(
        private readonly verifMPWService: VerifikasiPermohonanCutiMpwService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
      ) {}
    
    @Get()
    @ApiQuery({ name: 'pageIndex', type: Number, required: false, description: 'Page Index' })
    @ApiQuery({ name: 'pageSize', type: Number, required: false, description: 'Page Size' })
    @ApiQuery({ name: 'stringPencarian', type: String, required: false, description: 'string yang akan dicari' })
    @ApiQuery({ name: 'sortBy', type: String, required: false, description: 'di sort dari field apa' })
    async getAllVerif(
        @Res() res: Response,
        @Req() req: Request,
        @Query('pageIndex') pageIndex: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('stringPencarian') stringPencarian?: string,
        @Query('sortBy') sortBy?: string) {
            const body: DtoCutiVerifFindAllRequest={
                pageIndex:pageIndex,
                pageSize:pageSize,
                stringPencarian:stringPencarian,
                sortBy:sortBy
            }
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            const cutiEntries = await this.verifMPWService.findAll(this.userId,body);
            res.json(cutiEntries)
        
    }


    @Get(':id')
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
            const cutiEntries = await this.verifMPWService.findOne(id, true);
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

    @Post('/approve/:id')
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

            await this.verifMPWService.submit(id,this.userId)
            res.json({message: `Success Approve data cuti`})
        }
        catch(error){
            throw error;
        }
    }

    @Post('/reject/:id')
    async tolakCuti(
        @Res() res: Response,
        @Req() req: Request,
        @Param('id') id: string,
        @Body() dtoReject: DtoCutiRejectMPW) 
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }

            await this.verifMPWService.reject(id,dtoReject,this.userId)
            res.json({message: `Success Reject data cuti`})
        }
        catch(error){
            throw error;
        }
    }
}
