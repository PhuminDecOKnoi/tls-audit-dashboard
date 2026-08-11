# Project TLS8001 — Audit Dashboard Demo

> **Professional GitHub demo project for TLS 8001 / Human Resource Audit (HRA) dashboard presentation**  
> นำเสนอแนวทางเปลี่ยนข้อมูลการตรวจประเมินมาตรฐานแรงงานไทยจาก Excel ไปสู่ Executive Dashboard ที่เปิดใช้งานผ่าน Browser และ GitHub Pages

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-159A9C?style=for-the-badge&logo=github)
![Project](https://img.shields.io/badge/Project-TLS8001-002333?style=for-the-badge)
![Prototype](https://img.shields.io/badge/Status-Demo%20Prototype-116B58?style=for-the-badge)
![Browser Only](https://img.shields.io/badge/Data%20Processing-Browser%20Only-0B7285?style=for-the-badge)
![No Real Data](https://img.shields.io/badge/Public%20Repo-No%20Real%20Audit%20Data-B42318?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-0B7285?style=for-the-badge)
![jQuery](https://img.shields.io/badge/jQuery-4.0.0-0769AD?style=for-the-badge&logo=jquery)

---

## 🚀 Live Demo / Public Deploy

| Version | Public URL | Best For |
|---|---|---|
| **Main Dashboard** | https://phumindecoknoi.github.io/tls-audit-dashboard/ | นำเสนอ dashboard หลักต่อผู้บริหาร / ทีม HR / Audit / Compliance |
| **Modular HTML** | https://phumindecoknoi.github.io/tls-audit-dashboard/index.html | ศึกษาโครงสร้าง HTML / CSS / JavaScript แยกไฟล์ |
| **Single-file HTML** | https://phumindecoknoi.github.io/tls-audit-dashboard/index-single-file.html | ใช้งานเป็น offline/shareable prototype |
| **jQuery Teaching Demo** | https://phumindecoknoi.github.io/tls-audit-dashboard/examples/jquery-teaching-demo.html | ใช้สอน jQuery 4.0.0 จากตัวอย่างจริง |

> ⚠️ **Public Repository Notice**  
> Repository นี้เผยแพร่เฉพาะ source code, documentation, prototype และ demo structure เท่านั้น **ห้าม commit ไฟล์ Excel ผลตรวจจริง ข้อมูลส่วนบุคคล เอกสารหลักฐาน audit หรือข้อมูลสถานประกอบกิจการที่เป็นความลับ**

---

## 🎯 Project Positioning

`tls-audit-dashboard` คือ working repository ของ **Project TLS8001** สำหรับนำเสนอแนวคิดการสร้าง **Browser-based Executive Dashboard** จากข้อมูลการตรวจประเมิน **TLS 8001 / Human Resource Audit / Labour Compliance Audit**

Project นี้ออกแบบให้ใช้ได้ 3 มุมพร้อมกัน:

| Perspective | Purpose |
|---|---|
| **Management Demo** | แสดงผล KPI, chart, trend, Pareto, finding table และ follow-up view |
| **Audit / Compliance Prototype** | ทดลองแนวคิดการอ่าน Excel, column mapping และจัดกลุ่ม NC/Finding |
| **Learning Repository** | ใช้สอน HTML, CSS, JavaScript, jQuery, Chart.js, SheetJS และ GitHub workflow |

---

## 🧭 Project Hub

อ่านภาพรวมโครงการแบบ executive/professional ได้ที่:

| Document | Purpose |
|---|---|
| [PROJECT.md](PROJECT.md) | Project hub สำหรับ TLS8001: identity, scope, demo links, governance, roadmap |
| [Demo Presentation Guide](docs/demo-presentation-guide.md) | คู่มือพูดนำเสนอ demo แบบ 3 / 7 / 15 นาที |
| [GitHub Project Standard](docs/github-project-standard.md) | Checklist มาตรฐาน repo ให้ดู professional บน GitHub |
| [Contributing Guide](CONTRIBUTING.md) | แนวทาง branch, PR, code/doc contribution และ no-real-data rule |
| [Security Policy](SECURITY.md) | นโยบายความปลอดภัยและข้อมูลลับสำหรับ public repository |

---

## ✨ Key Features

| Capability | Description |
|---|---|
| **Excel Import** | อ่านไฟล์ `.xlsx` / `.xls` ผ่าน SheetJS ภายใน Browser |
| **Column Mapping** | ตรวจหัวตารางและให้ผู้ใช้ map field ที่จำเป็น |
| **Executive KPIs** | แสดงจำนวน Findings, Sites, CBs, Major, Minor และ Closed |
| **Interactive Charts** | ใช้ Chart.js สำหรับ Trend, CB, Classification และ Pareto |
| **Global Filters** | Filter ตามปี ไตรมาส เดือน CB Site Criteria Legal Status ฯลฯ |
| **Detail Table** | ตารางรายละเอียด ค้นหา จัดหน้า และเปิด record detail ได้ |
| **CSV Export** | Export ตารางที่ filter แล้วเป็น CSV |
| **Print to PDF** | ใช้ Browser Print สำหรับจัดทำ PDF Summary |
| **jQuery Teaching Demo** | ตัวอย่าง selector, event, property, function และ plugin pattern |
| **Privacy by Design** | Prototype ไม่อัปโหลดไฟล์ข้อมูลไป Server |

---

## 🧱 Technical Architecture

```text
TLS 8001 / HRA Excel Workbook
        │
        ▼
Browser File API
        │
        ▼
SheetJS Workbook Reader
        │
        ▼
Column Detection / Mapping
        │
        ▼
Normalized Audit Records
        │
        ├── KPI Calculation
        ├── Filter Engine
        ├── jQuery DOM / Event Layer
        ├── Chart.js Visualizations
        ├── Alerts / Follow-up List
        └── Detail Table / CSV Export / Print
```

### Technology Stack

| Layer | Tool / Library | Role |
|---|---|---|
| Structure | HTML5 | Semantic layout, accessibility, dialogs, forms |
| Style | CSS3 | Responsive layout, design tokens, print layout |
| DOM / Events | jQuery 4.0.0 | Selector, event binding, UI updates |
| Data Parsing | SheetJS CE | Read Excel workbook inside Browser |
| Visualization | Chart.js 4.5.1 | Interactive charts |
| App Logic | Vanilla JavaScript | Data normalization, filtering, KPIs, rendering logic |
| License | MIT License | Open-source project license for source code and documentation |

---

## 📁 Repository Structure

```text
tls-audit-dashboard/
├── README.md                         # GitHub landing page / project overview
├── PROJECT.md                        # Project TLS8001 hub
├── LICENSE                           # MIT License
├── CONTRIBUTING.md                   # Contribution and PR guide
├── SECURITY.md                       # Security and confidentiality policy
├── index.html                        # Modular dashboard entry point
├── index-single-file.html            # Offline single-file dashboard bundle
├── examples/
│   └── jquery-teaching-demo.html     # jQuery 4 teaching demo
├── assets/
│   ├── css/
│   │   ├── dashboard.css             # Main responsive UI stylesheet
│   │   └── print.css                 # Print/PDF stylesheet
│   ├── js/
│   │   ├── data-loader.js            # Excel parsing + mapping + normalization
│   │   └── dashboard.js              # Dashboard state, filters, charts, table rendering
│   ├── data/                         # Reserved for mock/sample data only
│   └── vendor/                       # Offline vendor libraries
├── docs/
│   ├── demo-presentation-guide.md    # Demo script and presentation guide
│   ├── github-project-standard.md    # GitHub professional checklist
│   ├── jquery-4-teaching-guide.md    # jQuery version, commands, functions, plugin examples
│   ├── code-study-notes.md           # Developer study notes
│   ├── deployment.md                 # GitHub Pages deploy guide
│   ├── repository-structure.md       # Standard repository structure
│   ├── workbook-structure.md         # Expected workbook design
│   ├── data-dictionary.md            # Data fields and meanings
│   ├── kpi-calculation.md            # KPI calculation notes
│   ├── data-quality-report.md        # Data quality and limitations
│   ├── technical-qa.md               # Technical QA checklist
│   ├── assumptions-limitations.md    # Prototype assumptions and limitations
│   ├── design-system.md              # Visual design principles
│   └── open-source-licenses.md       # Project and library license references
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md      # Pull Request quality checklist
└── .gitignore                        # Prevents local/audit/confidential files from being committed
```

---

## 🧭 How to Use

### 1) Present the demo

Open:

```text
https://phumindecoknoi.github.io/tls-audit-dashboard/
```

Then import a sanitized/mock Excel workbook. The file is processed inside the Browser.

Recommended presenter guide:

```text
docs/demo-presentation-guide.md
```

### 2) Study jQuery 4.0.0

Open the guide:

```text
docs/jquery-4-teaching-guide.md
```

Open the live teaching demo:

```text
https://phumindecoknoi.github.io/tls-audit-dashboard/examples/jquery-teaching-demo.html
```

### 3) Use local web server

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

---

## 🔄 Excel Import Flow

```text
Select Excel File
   ↓
Choose Sheet
   ↓
Read Sheet
   ↓
Auto-detect Header Row
   ↓
Column Mapping
   ↓
Normalize Records
   ↓
Render KPI / Charts / Alerts / Table
```

### Required Fields

| Field | Meaning |
|---|---|
| `Audit Date` | วันที่ตรวจประเมิน |
| `Audited Site` | หน่วยงาน / โรงงาน / สถานประกอบกิจการที่ถูกตรวจ |
| `NC Classification` | ประเภทหรือระดับของ NC / Finding |
| `Certification Body` | หน่วยตรวจ / หน่วยรับรอง |

หาก workbook ใช้ชื่อคอลัมน์ไม่ตรง ระบบจะแสดง Mapping Screen เพื่อให้ผู้ใช้กำหนด field เอง

---

## 🧠 Code Study Notes

Repository นี้ตั้งใจให้ใช้เป็นทั้ง **Prototype** และ **Learning Repository** สำหรับศึกษาการสร้าง Dashboard ด้วย HTML/CSS/JavaScript/jQuery

| File | Learning Focus |
|---|---|
| `PROJECT.md` | Project identity, scope, demo narrative and governance |
| `docs/demo-presentation-guide.md` | Script สำหรับนำเสนอ demo ต่อผู้บริหาร/ทีมงาน |
| `docs/github-project-standard.md` | Checklist มาตรฐาน GitHub repo |
| `docs/jquery-4-teaching-guide.md` | คู่มือสอน jQuery 4.0.0 พร้อม commands/properties/functions/plugins/examples |
| `examples/jquery-teaching-demo.html` | HTML demo สำหรับสอน jQuery แบบ interactive |
| `index.html` | HTML semantic structure, script loading order, accessibility, public prototype meta tags |
| `index-single-file.html` | Single-file bundle strategy สำหรับ offline/shareable prototype |
| `assets/css/dashboard.css` | CSS variables, responsive grid, card layout, accessibility focus state |
| `assets/css/print.css` | Print/PDF stylesheet และการซ่อน interactive controls ตอนพิมพ์ |
| `assets/js/data-loader.js` | SheetJS, header detection, column mapping, data normalization, formula injection guard |
| `assets/js/dashboard.js` | jQuery event handling, state management, filtering, Chart.js rendering, table pagination |
| `docs/code-study-notes.md` | คำอธิบายเชิง developer สำหรับอ่านโค้ดต่อภายหลัง |

---

## 🛡️ Data Privacy & Confidentiality

ไฟล์ต้นฉบับอาจมีชื่อผู้ตรวจ รายละเอียด Finding ข้อมูลสถานประกอบกิจการ และข้อมูลอื่นที่อาจเป็นความลับ โปรดใช้งานภายใต้สิทธิ์ที่ได้รับอนุญาตเท่านั้น

ห้ามเผยแพร่หรือ commit รายการต่อไปนี้ใน public repository:

- ไฟล์ Excel ผลการตรวจจริง
- ข้อมูลส่วนบุคคลของพนักงานหรือผู้ตรวจ
- หลักฐานการตรวจ เช่น ภาพถ่าย เอกสารสัญญา เอกสารค่าจ้าง หรือเอกสารนายจ้าง
- ข้อมูลโรงงาน / ฟาร์ม / หน่วยงานที่ยังไม่ได้รับอนุญาตให้เปิดเผย
- รายงาน CB หรือ audit evidence ที่มีสถานะ confidential
- token, password, API key หรือ credential ใด ๆ

ดูเพิ่ม: [`SECURITY.md`](SECURITY.md)

---

## 📚 Documentation

| Document | Purpose |
|---|---|
| [Project Hub](PROJECT.md) | ศูนย์กลาง Project TLS8001 สำหรับนำเสนอ demo และ governance |
| [Demo Presentation Guide](docs/demo-presentation-guide.md) | คู่มือพูดนำเสนอ demo แบบมืออาชีพ |
| [GitHub Project Standard](docs/github-project-standard.md) | Checklist มาตรฐาน repo ให้ดู professional บน GitHub |
| [jQuery 4 Teaching Guide](docs/jquery-4-teaching-guide.md) | คู่มือสอน jQuery version ล่าสุดที่ใช้ใน repo |
| [jQuery Teaching Demo](examples/jquery-teaching-demo.html) | ตัวอย่าง HTML สำหรับสอน selector, event, prop, attr, data และ plugin pattern |
| [Code Study Notes](docs/code-study-notes.md) | คำอธิบายโค้ด HTML/CSS/JS/jQuery/Chart.js/SheetJS สำหรับศึกษา |
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

---

## ⚙️ Recommended GitHub Workflow

```text
Create Feature Branch
   ↓
Implement Focused Change
   ↓
Open Pull Request
   ↓
Review README / Docs / HTML / CSS / JS / Privacy Impact
   ↓
Confirm No Real Audit Data
   ↓
Merge to main
   ↓
GitHub Pages deploys from main:/
   ↓
Manual Smoke Test Public URL
```

See: [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

## ✅ Demo Smoke Test

- [ ] Public URL เปิดได้โดยไม่เกิด 404
- [ ] `index.html` โหลด CSS และ JavaScript ได้ครบ
- [ ] ปุ่มเลือกไฟล์ Excel แสดงผลถูกต้อง
- [ ] Sheet selection และ Column Mapping ใช้งานได้
- [ ] KPI cards แสดงผลหลัง import
- [ ] Charts แสดงผลหลัง import
- [ ] Detail Table แสดงผลหลัง import
- [ ] Print to PDF ใช้งานได้
- [ ] README / PROJECT / Demo Guide แสดงลิงก์ถูกต้อง
- [ ] ไม่มีไฟล์ข้อมูลจริงหรือข้อมูลลับอยู่ใน repository

---

## 🧑‍💼 Maintainer

Maintained by **Phumin DecOKnoi**  
For TLS8001 / HRA / Labour Compliance dashboard prototyping, teaching and professional GitHub demo presentation.
