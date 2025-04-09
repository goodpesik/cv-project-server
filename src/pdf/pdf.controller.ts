import { Controller, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate')
  async generatePdf(@Query('url') url: string, @Res() res: Response) {
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    console.log(1111, url);
    
    const pdfBuffer = await this.pdfService.generatePdfFromUrl(url);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=document.pdf',
    });

    res.send(pdfBuffer);
  }
}
