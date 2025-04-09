import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Put, NotFoundException, Query } from '@nestjs/common';
import { CvDataService } from './cv-data.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { CVData } from './schemas/cv-data.schema';

@Controller('cv-data')
export class CvDataController {
  constructor(
    private readonly cvDataService: CvDataService,
  ) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async createPhoto(@UploadedFile() file: Express.Multer.File, @Query('cvId') cvId: string, @Query('isEdit') isEdit: string) {
    if (isEdit === 'true') {
      await this.cvDataService.patch(cvId, {
        imageName: file.filename,
        imageUrl: file.path
      });
    }
    return { imageName: file.filename, imageUrl: file.path };
  }

  @Delete('photo/:filename')
  async deletePhoto(@Param('filename') filename: string, @Query('cvId') cvId: string, @Query('isEdit') isEdit: boolean) {
    const filePath = join(__dirname, '.', 'uploads', filename);
    try {
      await fs.promises.unlink(filePath);
      if (isEdit) {
        await this.cvDataService.patch(cvId, {
          imageName: null,
          imageUrl: null
        });
      }
      return { success: true, message: 'File Removed' };
    } catch (err) {
      throw new NotFoundException(`File doesn't exist`);
    }
  }
  

  @Post()
  async create(@Body() data: CVData) {
    const createdItem = this.cvDataService.create(data);
    return createdItem;
  }

  @Get('all/:id')
  findAll(@Param('id') userId: string) {
    return this.cvDataService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvDataService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: CVData) {
    return this.cvDataService.update(id, item);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedItem = await this.cvDataService.remove(id);
    return removedItem;
  }
}
