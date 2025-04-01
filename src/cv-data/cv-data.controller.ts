import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { CvDataService } from './cv-data.service';
import { Item } from './schemas/item.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { UserService } from '../users/users.service';

@Controller('cv-data')
export class CvDataController {
  constructor(
    private readonly cvDataService: CvDataService,
    private readonly userService: UserService,
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
  async createPhoto(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename, path: file.path };
  }

  @Put('photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async updatePhoto(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename, path: file.path };
  }
  

  @Post()
  async create(@Body() item: Item, @Body('userId') userId: string) {
    const createdItem = this.cvDataService.create(item);
    await this.userService.addItemToUser(userId, item.id);
    return createdItem;
  }

  @Get()
  findAll() {
    return this.cvDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvDataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() item: Item) {
    return this.cvDataService.update(id, item);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Param('userId') userId: string) {
    const removedItem = await this.cvDataService.remove(id);
    await this.userService.removeItemFromUser(userId, id);
    return removedItem;
  }
}
