import { Module } from '@nestjs/common';
import { CvDataService } from './cv-data.service';
import { CvDataController } from './cv-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';
import { UserService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    UsersModule
  ],
  controllers: [CvDataController],
  providers: [CvDataService],
})
export class CvDataModule {}
