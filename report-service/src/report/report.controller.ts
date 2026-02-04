import { Controller, Get, Res, Query } from '@nestjs/common';
import type { Response } from 'express';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  /**
   * ดาวน์โหลดใบแสดงผลการศึกษา (Transcript) เป็น PDF
   * GET /report/transcript?studentId=6401012345678
   */
  @Get('transcript')
  async getTranscript(
    @Query('studentId') studentId: string,
    @Res() res: Response,
  ) {
    const pdf = await this.reportService.generateTranscript(studentId);

    const filename = `transcript_${studentId || 'unknown'}_${Date.now()}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdf.length,
    });

    res.end(pdf);
  }

  /**
   * ดาวน์โหลดใบรับรองนักศึกษา (Enrollment Certificate) เป็น PDF
   * GET /report/enrollment-certificate?studentId=6401012345678
   */
  @Get('enrollment-certificate')
  async getEnrollmentCertificate(
    @Query('studentId') studentId: string,
    @Res() res: Response,
  ) {
    const pdf = await this.reportService.generateEnrollmentCertificate(studentId);

    const filename = `enrollment_cert_${studentId || 'unknown'}_${Date.now()}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdf.length,
    });

    res.end(pdf);
  }
}
