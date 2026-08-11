# TLS Audit Dashboard

> Executive Interactive Dashboard สำหรับวิเคราะห์ผลการตรวจประเมินมาตรฐานแรงงานไทย มรท.8001 / TLS 8001 จากไฟล์ Excel ภายใน Browser โดยไม่อัปโหลดไฟล์ไปยัง Server

## Public Deploy

| Version | Public URL | Use Case |
|---|---|---|
| Main Dashboard | https://phumindecoknoi.github.io/tls-audit-dashboard/ | เปิดใช้งานหน้า Dashboard หลักผ่าน GitHub Pages |
| Modular HTML | https://phumindecoknoi.github.io/tls-audit-dashboard/index.html | ใช้งานเวอร์ชันแยกไฟล์ CSS/JS/Vendor |
| Single-file HTML | https://phumindecoknoi.github.io/tls-audit-dashboard/index-single-file.html | ใช้งาน/ส่งต่อแบบไฟล์เดียว เหมาะกับ Offline Prototype |

> หมายเหตุ: Public Deploy เป็นเพียงตัว Dashboard/Prototype เท่านั้น ห้ามอัปโหลดไฟล์ Excel ผลตรวจจริง ข้อมูลส่วนบุคคล หรือหลักฐานการตรวจที่เป็นความลับลง repository สาธารณะ

## Project Purpose

Dashboard นี้ออกแบบเพื่อช่วยงาน Human Resource Audit / Labour Compliance Audit โดยเน้นการวิเคราะห์ข้อมูลจาก Excel ภายในเครื่องผู้ใช้ เช่น

- สรุปภาพรวมผลการตรวจประเมินจาก Certification Bodies
- วิเคราะห์ NC / Finding ตาม Site, Classification, Certification Body และช่วงเวลา
- แสดง KPI, Charts, Alerts และ Detail Table ภายใน Browser
- รองรับการตรวจ Column Mapping เมื่อหัวตารางไม่ตรงกับรูปแบบที่ระบบคาดหวัง
- ลดความเสี่ยงด้านข้อมูล เพราะการอ่านไฟล์เกิดขึ้นฝั่ง Browser

## Repository Status

| Item | Status |
|---|---|
| Repository Visibility | Public |
| GitHub Pages | Enabled |
| Pages Source | `main` branch / repository root `/` |
| Main Entry | `index.html` |
| Offline Entry | `index-single-file.html` |
| Data Policy | Do not commit real audit data |
| Search Policy | Prototype uses `noindex, nofollow, noarchive, nosnippet` |

## Standard Repository Structure

```text
tls-audit-dashboard/
├── README.md
├── index.html
├── index-single-file.html
├── assets/
│   ├── css/
│   │   ├── dashboard.css
│   │   └── print.css
│   ├── js/
│   │   ├── dashboard.js
│   │   └── data-loader.js
│   ├── data/
│   └── vendor/
├── docs/
│   ├── assumptions-limitations.md
│   ├── data-dictionary.md
│   ├── data-quality-report.md
│   ├── deployment.md
│   ├── design-system.md
│   ├── kpi-calculation.md
│   ├── open-source-licenses.md
│   ├── repository-structure.md
│   ├── technical-qa.md
│   └── workbook-structure.md
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
└── .gitignore
```

## How to Use

### 1. Public GitHub Pages

เปิดลิงก์หลัก:

```text
https://phumindecoknoi.github.io/tls-audit-dashboard/
```

จากนั้นเลือกไฟล์ Excel จากเครื่องของผู้ใช้ ระบบจะอ่านไฟล์ใน Browser โดยไม่อัปโหลดไปยัง Server

### 2. Local Double-click

เปิดไฟล์ใดไฟล์หนึ่งด้วย Browser รุ่นปัจจุบัน:

```text
index.html
index-single-file.html
```

### 3. Local Web Server

```bash
python -m http.server 8080
```

เปิด:

```text
http://localhost:8080/
```

## Excel Import Flow

1. กด **เลือกไฟล์ Excel**
2. เลือกไฟล์ `.xlsx` หรือ `.xls`
3. เลือก Sheet ที่ต้องการ โดยแนะนำ `NC_Log`
4. กด **อ่าน Sheet**
5. ตรวจ Column Mapping
6. กด **นำไปใช้**
7. Filters, KPI, Charts, Alerts และ Detail Table จะคำนวณใหม่ภายใน Browser

## Required Column Mapping

คอลัมน์จำเป็น ได้แก่

| Required Field | Description |
|---|---|
| Audit Date | วันที่ตรวจประเมิน |
| Audited Site | หน่วยงาน / โรงงาน / สถานประกอบกิจการที่ถูกตรวจ |
| NC Classification | ประเภทหรือระดับของ NC / Finding |
| Certification Body | หน่วยตรวจ / หน่วยรับรอง |

คอลัมน์อื่นสามารถเลือกได้ตามข้อมูลจริง หากชื่อหัวตารางไม่ตรง ระบบจะแสดง Mapping Screen ให้ผู้ใช้กำหนดเอง

## Documentation

| Document | Purpose |
|---|---|
| [Deployment Guide](docs/deployment.md) | วิธี Deploy, Public URL และ Smoke Test |
| [Repository Structure](docs/repository-structure.md) | โครงสร้าง repo และบทบาทของแต่ละ folder |
| [Workbook Structure](docs/workbook-structure.md) | โครงสร้างไฟล์ Excel ที่ใช้กับ Dashboard |
| [Data Dictionary](docs/data-dictionary.md) | ความหมายของ field / column |
| [KPI Calculation](docs/kpi-calculation.md) | หลักการคำนวณ KPI |
| [Data Quality Report](docs/data-quality-report.md) | ข้อจำกัดและคุณภาพข้อมูล |
| [Technical QA](docs/technical-qa.md) | แนวทางตรวจสอบเชิงเทคนิค |
| [Assumptions & Limitations](docs/assumptions-limitations.md) | สมมติฐานและข้อจำกัดของ Prototype |
| [Design System](docs/design-system.md) | หลักการออกแบบ UI |
| [Open Source Licenses](docs/open-source-licenses.md) | รายการ Library และ License |

## Libraries

- jQuery 4.0.0 — Official CDN: `https://code.jquery.com/jquery-4.0.0.min.js` — MIT License
- Chart.js 4.5.1 — MIT License
- SheetJS Community Edition 0.20.3 — Official CDN — Apache-2.0 License
- Offline fallback: jQuery, Chart.js และ SheetJS CE ภายใต้ `assets/vendor/`
- ไม่ใช้ DataTables เนื่องจาก Prototype ใช้ตาราง Vanilla JavaScript เพื่อลด Dependency และลดความเสี่ยงด้าน Compatibility กับ jQuery 4.0.0

## Data Privacy & Confidentiality

ไฟล์ต้นฉบับอาจมีชื่อผู้ตรวจ รายละเอียด Finding ข้อมูลสถานประกอบกิจการ และข้อมูลอื่นที่อาจเป็นความลับ โปรดใช้งานภายใต้สิทธิ์ที่ได้รับอนุญาตเท่านั้น

ห้ามเผยแพร่หรือ commit รายการต่อไปนี้ใน public repository:

- ไฟล์ Excel ผลการตรวจจริง
- ข้อมูลส่วนบุคคลของพนักงานหรือผู้ตรวจ
- หลักฐานการตรวจ เช่น ภาพถ่าย เอกสารสัญญา เอกสารค่าจ้าง หรือเอกสารนายจ้าง
- ข้อมูลโรงงาน / ฟาร์ม / หน่วยงานที่ยังไม่ได้รับอนุญาตให้เปิดเผย
- รายงาน CB หรือ audit evidence ที่มีสถานะ confidential

## Current Limitations

- ไม่มี Province/Region, Pass/Fail, Certificate Expiry, Responsible Person และ Closure Date หาก workbook ไม่ได้ให้ข้อมูลไว้
- ไม่สร้าง Map, Pass Rate, Certificate Aging หรือ Risk Matrix จากข้อมูลที่ยังไม่รองรับ
- ค่า Open หมายถึงไม่พบ `Closed` ใน Remarks ไม่ใช่การยืนยันสถานะอย่างเป็นทางการ
- การ Export PDF ใช้ Print to PDF ของ Browser
- การ Export Excel ใช้ CSV ซึ่งเปิดใน Excel ได้

## Recommended Workflow

```text
Feature Branch
   ↓
Pull Request
   ↓
Review README / docs / HTML / CSS / JS
   ↓
Merge to main
   ↓
GitHub Pages deploys from main:/
   ↓
Manual smoke test public URL
```

## Manual Smoke Test

- [ ] Public URL เปิดได้โดยไม่เกิด 404
- [ ] `index.html` โหลด CSS และ JavaScript ได้ครบ
- [ ] ปุ่มเลือกไฟล์ Excel แสดงผลถูกต้อง
- [ ] Sheet selection และ Column Mapping ใช้งานได้
- [ ] KPI cards แสดงผลหลัง import
- [ ] Charts แสดงผลหลัง import
- [ ] Detail Table แสดงผลหลัง import
- [ ] Print to PDF ใช้งานได้
- [ ] ไม่มีไฟล์ข้อมูลจริงหรือข้อมูลลับอยู่ใน repository

---

Maintained by **Phumin DecOKnoi** for TLS / HRA / Labour Compliance dashboard prototyping.
