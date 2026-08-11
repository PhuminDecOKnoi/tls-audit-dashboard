# Executive Interactive Dashboard ผลการตรวจประเมินมาตรฐานแรงงานไทยจาก CBs

## วัตถุประสงค์
Private Prototype สำหรับนำเข้าไฟล์ Excel ภายใน Browser และวิเคราะห์ผลการตรวจประเมิน TLS 8001 โดยไม่ Upload ไฟล์ไป Server

## โหมดการเผยแพร่
- **PRIVATE PROTOTYPE**
- ใช้ `noindex, nofollow, noarchive, nosnippet`
- ไม่มี Sitemap, Canonical หรือ Public Structured Data
- Package ไม่ฝังข้อมูลผลตรวจจริงหรือข้อมูลส่วนบุคคล

## วิธีเปิดใช้งาน
### แบบ Double-click
เปิด `index.html` หรือ `index-single-file.html` ด้วย Browser รุ่นปัจจุบัน จากนั้นเลือกไฟล์ Excel

### แบบ Local Web Server
```bash
python -m http.server 8080
```
เปิด `http://localhost:8080/dashboard-prototype/`

## การนำเข้า Excel
1. กด **เลือกไฟล์ Excel**
2. เลือก `.xlsx` หรือ `.xls`
3. เลือก Sheet โดยแนะนำ `NC_Log`
4. กด **อ่าน Sheet**
5. ตรวจ Column Mapping แล้วกด **นำไปใช้**
6. Filters, KPI, Charts, Alerts และ Detail Table จะคำนวณใหม่ภายใน Browser

## Column Mapping
คอลัมน์จำเป็น ได้แก่ Audit Date, Audited Site, NC Classification และ Certification Body ส่วนคอลัมน์อื่นเลือกได้ตามข้อมูลจริง หากชื่อหัวตารางไม่ตรง ระบบจะแสดง Mapping Screen

## Refresh
เลือกไฟล์หรือ Sheet ใหม่ หรือ Reload หน้า Dashboard แล้วนำเข้าไฟล์อีกครั้ง

## Browser ที่รองรับ
Chrome, Edge, Firefox และ Safari รุ่นปัจจุบัน รองรับ Desktop และ Tablet ไม่รองรับ Internet Explorer

## Libraries
- jQuery 4.0.0, Official CDN: https://code.jquery.com/jquery-4.0.0.min.js, MIT License
- Chart.js 4.5.1, MIT License
- SheetJS Community Edition 0.20.3 ผ่าน Official CDN, Apache-2.0 License
- Offline fallback: jQuery 4.0.0, Chart.js 4.5.1 และ SheetJS CE 0.18.5 ภายใต้ `assets/vendor/`
- ไม่ใช้ DataTables เนื่องจาก Prototype ใช้ตาราง Vanilla JavaScript เพื่อลด Dependency และหลีกเลี่ยงความไม่แน่นอนด้าน Compatibility กับ jQuery 4.0.0

## Offline
`index-single-file.html` ฝัง Library, CSS และ JavaScript ที่จำเป็นไว้ในไฟล์เดียว ส่วน Modular Version มีไฟล์ Vendor ใน `assets/vendor/`

## ข้อจำกัด
- ไม่มี Province/Region, Pass/Fail, Certificate Expiry, Responsible Person และ Closure Date
- ไม่สร้าง Map, Pass Rate, Certificate Aging หรือ Risk Matrix
- ค่า Open หมายถึงไม่พบ `Closed` ใน Remarks ไม่ใช่การยืนยันสถานะอย่างเป็นทางการ
- การ Export PDF ใช้ Print to PDF ของ Browser
- การ Export Excel ใช้ CSV ซึ่งเปิดใน Excel ได้

## ความลับและข้อมูลส่วนบุคคล
ไฟล์ต้นฉบับอาจมีชื่อผู้ตรวจและรายละเอียด Finding โปรดใช้ภายในสิทธิ์ที่ได้รับอนุญาต ห้ามเผยแพร่ Package พร้อมไฟล์ข้อมูลจริงโดยไม่ได้รับอนุมัติ
