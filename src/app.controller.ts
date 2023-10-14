import { Controller, Get, HttpStatus, Inject, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectMinio } from 'nestjs-minio';
import { Response } from 'express';

@Controller()
export class AppController {
  // constructor() {}
  constructor(
    @InjectMinio() private readonly minioClient,
    // private readonly appService: AppService
    ) {}
  // @Get()
  // async getHello(@Res({ passthrough: true }) res: Response) {
  //   res.setHeader('Content-Type', 'application/pdf');
  //   res.setHeader('Content-Disposition', `attachment; filename=asd.pdf`);
  //   var fileData=[]
    
  //   return new Promise((resolve, reject) => {
  //     this.minioClient.getObject('pintu-notaris', 'kondite/sk/SURAT WFH Ikhsan.pdf',function (err, dataStream){
  //       if (err) {
  //         console.log(err)
  //         reject(err);
  //       }
  //       dataStream.on('data', function(chunk){
  //         fileData.push(chunk)
  //       })
  //       dataStream.on('end',function () {
  //         const files = Buffer.concat(fileData)
  //         console.log(files)
  //         resolve(files);
  //       })
  //       dataStream.on('error', function(err){
  //         console.log(err)
  //         reject(err);
          
  //       })
        
  //     })
  //   })
      
  // }

  @Get()
  async getHello(@Res() res: Response) {
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=asd.pdf');

    try {
      this.minioClient.getObject('pintu-notaris', 'kondite/sk/SURAT WFH Ikhsans.pdf', function (err, dataStream) {
        if (err) {
          console.log(err);
          res.status(500).send('File not found');
        } else {
          dataStream.pipe(res);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }

  @Get('/base64')
  async downloadFileAsBase64(
    @Res() res,
  ) {
    try {
      this.minioClient.getObject('pintu-notaris', 'kondite/sk/SURAT WFH Ikhsan.pdf', function (err, dataStream) {
        if (err) {
          console.log(err);
          res.status(HttpStatus.NOT_FOUND).send('File not found');
        } else {
          const buffers: Buffer[] = [];

          dataStream.on('data', (chunk) => {
            buffers.push(chunk);
          });

          dataStream.on('end', () => {
            const concatenatedBuffer = Buffer.concat(buffers);
            const base64Data = concatenatedBuffer.toString('base64');

            res.status(HttpStatus.OK).json({ data:base64Data });
          });

          dataStream.on('error', (error) => {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error');
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error');
    }
  }


  @Get('base64multi')
  async downloadMultipleFilesAsBase64(
    @Res() res
  ) {
    try {
      const bucket='pintu-notaris'
      const filenames=['kondite/sk/SURAT WFH Ikhsan.pdf','kondite/sk/Proposal Penawaran Peta Desa Digital_06152021[1].pdf']
      const filePromises = filenames.map((filename) => {
        return new Promise((resolve, reject) => {
          this.minioClient.getObject(bucket, filename, function (err, dataStream) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              const buffers: Buffer[] = [];

              dataStream.on('data', (chunk) => {
                buffers.push(chunk);
              });

              dataStream.on('end', () => {
                const concatenatedBuffer = Buffer.concat(buffers);
                const base64Data = concatenatedBuffer.toString('base64');

                resolve({filename,base64Data});
              });

              dataStream.on('error', (error) => {
                console.log(error);
                reject(error);
              });
            }
          });
        });
      });

      Promise.all(filePromises)
        .then((fileData) => {
          res.status(HttpStatus.OK).json(fileData);
        })
        .catch((error) => {
          console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error');
        });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error');
    }
  }

  @Get('onal/:id')
  helloWithParam(
    @Param() params: any
    ){
    
      return `Hello ${params.id}!`
  }
}
