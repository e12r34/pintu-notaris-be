import { DtoCutiRejectMPP } from './verifikasi-permohonan-cuti-mpp.dto';
import { Controller, Get, Inject, Param, Query, Req, Res, UnauthorizedException, NotFoundException, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { DtoCutiVerifFindAllRequest } from '../dto/verifikasi-permohonan-cuti.dto';
import { Request, Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { VerifikasiPermohonanCutiMppService } from './verifikasi-permohonan-cuti-mpp.service';
import { Cache } from 'cache-manager';
import { CutiEntity } from '../entity/cuti.entity';
import { generateCacheKeyCuti } from 'src/kondite/kondite.function';

@ApiBearerAuth()
@ApiTags('Verifikasi Permohonan Cuti MPP')
@Roles(Role.MPP)
@Controller('api/VerifikasiPermohonanCutiMPP')
export class VerifikasiPermohonanCutiMppController {
    userId:string;
    constructor(
        private readonly verifMPPService: VerifikasiPermohonanCutiMppService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
      ) {}
    
    @Get()
    @ApiQuery({ name: 'pageIndex', type: Number, required: false, description: 'Page Index' })
    @ApiQuery({ name: 'pageSize', type: Number, required: false, description: 'Page Size' })
    @ApiQuery({ name: 'stringPencarian', type: String, required: false, description: 'string yang akan dicari' })
    @ApiQuery({ name: 'sortBy', type: String, required: false, description: 'di sort dari field apa' })
    @ApiQuery({ name: 'isSortAscending', type: Boolean, required: false, description: 'apakah field ASCENDING' })
    async getAllVerif(
        @Res() res: Response,
        @Req() req: Request,
        @Query('pageIndex') pageIndex: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('stringPencarian') stringPencarian?: string,
        @Query('sortBy') sortBy?: string,
        @Query('isSortAscending') isSortAscending: boolean=true) {
            const body: DtoCutiVerifFindAllRequest={
                pageIndex:pageIndex,
                pageSize:pageSize,
                stringPencarian:stringPencarian,
                sortBy:sortBy,
                isSortAscending:isSortAscending
            }
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            const cutiEntries = await this.verifMPPService.findAll(this.userId,body);
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
            const cutiEntries = await this.verifMPPService.findOne(id, true);
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

            await this.verifMPPService.submit(id,this.userId)
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
        @Body() dtoReject: DtoCutiRejectMPP) 
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }

            await this.verifMPPService.reject(id,dtoReject,this.userId)
            res.json({message: `Success Reject data cuti`})
        }
        catch(error){
            throw error;
        }
    }
}
