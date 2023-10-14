import { Controller, Post, Body, Res, Req, Get, Param, Put, Delete, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { KonditeEntity } from './entity/kondite.entity';
import { Response, Request } from 'express';
import { KonditeService } from './kondite.service';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger/dist';

@ApiBearerAuth()
@Controller('api/kondite')
export class KonditeController {

    userId:string;
    constructor(
        private readonly konditeService: KonditeService,
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
        @Req() req: Request)
    {
        try{
            this.userId=req.user['id']
            if (!this.userId) {
                throw new UnauthorizedException('No user id found');
            }
            const konditeEntries = await this.konditeService.findAll(this.userId);
            res.json(konditeEntries);
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
            const konditeEntries = await this.konditeService.findOne(id, this.userId);
            if (!konditeEntries) {
                throw new NotFoundException("Data Not Found")
            }
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
