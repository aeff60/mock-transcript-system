# 🎓 จำลองระบบออกเอกสารมหาวิทยาลัย (University Document Generation System)

ระบบสร้างเอกสาร PDF สำหรับงานทะเบียนมหาวิทยาลัย เช่น ใบแสดงผลการศึกษา (Transcript) และใบรับรองนักศึกษา สำหรับตัวอย่างการใช้งาน Next.JS และ NestJS

## 📁 โครงสร้างโปรเจกต์

```
v3/
├── report-web/          # Frontend (Next.js) - หน้าเอกสารสำหรับแปลงเป็น PDF
├── report-service/      # Backend (NestJS) - API สร้าง PDF ด้วย Puppeteer

```

## 🏗️ สถาปัตยกรรมระบบ

```
┌─────────────────┐         ┌──────────────────┐          ┌─────────────────┐
│   Client/User   │ ──────► │  report-service  │ ──────►  │   report-web    │
│   (Browser)     │  HTTP   │   (NestJS API)   │ Puppeteer│   (Next.js)     │
│                 │ ◄────── │   Port: 3001     │ ◄──────  │   Port: 3000    │
│   Download PDF  │   PDF   │   Generate PDF   │   HTML   │   Render Page   │
└─────────────────┘         └──────────────────┘          └─────────────────┘
```

## 🚀 การเริ่มต้นใช้งาน

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
# Frontend
cd report-web
npm install

# Backend
cd ../report-service
npm install
```

### ขั้นตอนที่ 2: รัน Development Server

**Terminal 1 - Frontend (Next.js)**
```bash
cd report-web
npm run dev
# รันที่ http://localhost:3000
```

**Terminal 2 - Backend (NestJS)**
```bash
cd report-service
npm run start:dev
# รันที่ http://localhost:3001
```

### ขั้นตอนที่ 3: ทดสอบระบบ

1. **ดูหน้า Transcript**: เปิด http://localhost:3000/report/demo
2. **ดาวน์โหลด PDF**: เปิด http://localhost:3001/report/transcript

## 📄 เอกสารที่รองรับ

| เอกสาร | Endpoint | คำอธิบาย |
|--------|----------|----------|
| ใบแสดงผลการศึกษา | `GET /report/transcript` | Transcript แสดงผลการเรียนทั้งหมด |
| ใบรับรองนักศึกษา | `GET /report/enrollment-certificate` | หนังสือรับรองสถานภาพนักศึกษา |

## 🛠️ เทคโนโลยีที่ใช้

### Frontend (report-web)
- **Next.js** - React Framework
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling

### Backend (report-service)
- **NestJS** - Node.js Framework
- **Puppeteer** - Headless Chrome สำหรับสร้าง PDF
- **TypeScript** - Type-safe JavaScript

