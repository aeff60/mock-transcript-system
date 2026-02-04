import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ReportService {
  private readonly FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

  /**
   * สร้าง PDF ใบแสดงผลการศึกษา (Transcript)
   */
  async generateTranscript(studentId?: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    // เรียกหน้า Transcript พร้อม studentId
    const url = studentId
      ? `${this.FRONTEND_URL}/report/demo?studentId=${studentId}`
      : `${this.FRONTEND_URL}/report/demo`;

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9px; width: 100%; text-align: center; color: #666;">
          มหาวิทยาลัยเอไอพี - ใบแสดงผลการศึกษา
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9px; width: 100%; text-align: center; color: #666;">
          หน้า <span class="pageNumber"></span> จาก <span class="totalPages"></span>
        </div>
      `,
      margin: {
        top: '25mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm',
      },
    });

    await browser.close();
    return Buffer.from(pdf);
  }

  /**
   * สร้าง PDF ใบรับรองการเป็นนักศึกษา (Enrollment Certificate)
   */
  async generateEnrollmentCertificate(studentId?: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    // ในอนาคตสามารถสร้างหน้าใหม่สำหรับ Enrollment Certificate
    const url = studentId
      ? `${this.FRONTEND_URL}/report/enrollment?studentId=${studentId}`
      : `${this.FRONTEND_URL}/report/enrollment`;

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9px; width: 100%; text-align: center; color: #666;">
          มหาวิทยาลัยเอไอพี - ใบรับรองการเป็นนักศึกษา
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9px; width: 100%; text-align: center; color: #666;">
          หน้า <span class="pageNumber"></span> จาก <span class="totalPages"></span>
        </div>
      `,
      margin: {
        top: '25mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm',
      },
    });

    await browser.close();
    return Buffer.from(pdf);
  }
}
