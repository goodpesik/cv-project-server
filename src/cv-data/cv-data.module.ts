import { Module } from '@nestjs/common';
import { CvDataService } from './cv-data.service';
import { CvDataController } from './cv-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CVData, CVDataSchema } from './schemas/cv-data.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: CVData.name, schema: CVDataSchema }]),
  ],
  controllers: [CvDataController],
  providers: [CvDataService],
})
export class CvDataModule {}
