import { Controller, Post, Body, Res, Get, Param, Put, Delete } from '@nestjs/common';
import { KonditeEntity } from './entity/kondite.entity';
import { Response } from 'express';
import { KonditeService } from './kondite.service';

@Controller('kondite')
export class KonditeController {

    constructor(
        private readonly konditeService: KonditeService
      ) {}

    @Post()
    async createNewKondite(
        @Body() konditeData: KonditeEntity,
        @Res() res: Response
        )
    {
        try{
            const createdKondite = await this.konditeService.create(konditeData)
            res.json(createdKondite)
        }
        catch(error){
            throw error;
        }
    }

    @Get()
    async getAllKondite(
        @Res() res: Response
        )
    {
        try{
            const konditeEntries = await this.konditeService.findAll();
            res.json(konditeEntries);
        }
        catch(error){
            throw error;
        }
    }



    @Get(':id')
    async getAKondite(@Res() res: Response, @Param('id') id: string)
    {
        try{
            const konditeEntries = await this.konditeService.findOne(id);
            res.json(konditeEntries);
        }
        catch(error){
            throw error;
        }
    }

    @Put(':id')
    async update(@Res() res: Response,@Param('id') id: string, @Body() updateKonditeDto: KonditeEntity) 
    {
        try{
            const updatedKondite = await this.konditeService.update(id, updateKonditeDto);
            res.json(updatedKondite);
        }
        catch(err){
            throw err;
        }

    }
  
    @Delete(':id')
    async remove(@Res() res: Response,@Param('id') id: string) 
    {
        try{
            await this.konditeService.remove(id);
            res.json({ message: 'Kondite entry deleted successfully' })
        }
        catch(err){
            throw err;
        }
    }
}
