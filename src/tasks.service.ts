import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { CvDataService } from './cv-data/cv-data.service';

@Injectable()
export class TasksService {
  constructor(private service: CvDataService) {}
  private readonly imagesPath = path.join(__dirname, '..', 'uploads');


  @Cron('0 3 * * *')
  async handleCleanup() {
    console.log(`${new Date()}: Started Clean UP`)
    const images = (await this.service.findAll()).map((cv => cv.imageName));

    if (!fs.existsSync(this.imagesPath)) return;

    const allFiles = fs.readdirSync(this.imagesPath);

    allFiles.forEach((file) => {
      const fullPath = path.join(this.imagesPath, file);

      if (!images.includes(file)) {
        console.log(`🗑 Removed file: ${file}`);
        fs.rmSync(fullPath, { force: true });
      }
    });
  }
}
