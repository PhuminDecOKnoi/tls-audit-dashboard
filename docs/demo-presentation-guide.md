# TLS8001 Demo Presentation Guide

> คู่มือการนำเสนอ demo งาน **TLS8001 Audit Dashboard** สำหรับผู้บริหาร ทีม HR/Compliance/Audit และผู้เรียนด้าน web dashboard development

---

## 1. Demo Objective

การนำเสนอ demo นี้มีเป้าหมายเพื่อสื่อสารว่า **ข้อมูลการตรวจประเมิน TLS 8001 / HRA จาก Excel** สามารถถูกแปลงเป็น dashboard เชิงบริหารได้อย่างไร โดยยังคงแนวคิดด้านความปลอดภัยของข้อมูลผ่านการประมวลผลภายใน browser

---

## 2. Demo Links

| Demo | URL | Use case |
|---|---|---|
| Main Dashboard | https://phumindecoknoi.github.io/tls-audit-dashboard/ | นำเสนอภาพรวมแก่ผู้บริหาร |
| Modular HTML | https://phumindecoknoi.github.io/tls-audit-dashboard/index.html | อธิบายโครงสร้าง source code |
| Single-file HTML | https://phumindecoknoi.github.io/tls-audit-dashboard/index-single-file.html | ส่งต่อหรือเปิดแบบ offline prototype |
| jQuery Teaching Demo | https://phumindecoknoi.github.io/tls-audit-dashboard/examples/jquery-teaching-demo.html | ใช้สอน selector, event, prop, attr, data และ plugin pattern |

---

## 3. Recommended Demo Script

### 3-minute executive demo

1. เปิดหน้า dashboard public demo.
2. อธิบายว่า dashboard อ่าน Excel ภายใน browser ไม่อัปโหลดไป server.
3. แสดง KPI cards, charts และ detail table.
4. สรุปประโยชน์ต่อการติดตาม NC / Finding / CB / Site.
5. ย้ำข้อจำกัดว่า public repo ต้องใช้ mock/sanitized data เท่านั้น.

### 7-minute professional demo

1. เริ่มจาก pain point: audit finding อยู่ใน Excel และสื่อสารยาก.
2. เปิด dashboard demo.
3. แสดง workflow: Excel → SheetJS → mapping → normalized records → dashboard.
4. แสดง filters และ charts.
5. แสดง detail record / CSV export / print to PDF.
6. เชื่อมกับ GitHub repo: README, docs, license, security policy.
7. สรุป roadmap สู่ production readiness.

### 15-minute teaching demo

1. อธิบาย repository structure.
2. เปิด `index.html` เพื่ออธิบาย HTML semantic layout.
3. เปิด `assets/css/dashboard.css` เพื่ออธิบาย design system.
4. เปิด `assets/js/data-loader.js` เพื่ออธิบาย Excel parsing.
5. เปิด `assets/js/dashboard.js` เพื่ออธิบาย dashboard state/filter/chart/table rendering.
6. เปิด `docs/jquery-4-teaching-guide.md` และ `examples/jquery-teaching-demo.html` เพื่อสอน jQuery 4.0.0.
7. ปิดท้ายด้วย GitHub workflow: branch → PR → review → merge → GitHub Pages.

---

## 4. Presenter Talk Track

### Opening

> วันนี้เราจะดูตัวอย่าง Project TLS8001 ซึ่งเป็น browser-based dashboard prototype สำหรับนำข้อมูลการตรวจประเมิน TLS 8001 / HRA จาก Excel มาแสดงผลเป็น KPI, chart, table และ follow-up view โดยไม่อัปโหลดไฟล์ข้อมูลไปยัง server

### Business value

> จุดแข็งของ demo นี้คือช่วยเปลี่ยนข้อมูล audit ที่กระจัดกระจายใน Excel ให้กลายเป็น executive view ที่ผู้บริหาร ทีม HR Compliance และทีม audit สามารถเข้าใจแนวโน้ม ปัญหาซ้ำ และลำดับความสำคัญของการติดตามแก้ไขได้เร็วขึ้น

### Data protection note

> เนื่องจากข้อมูล audit อาจมีข้อมูลส่วนบุคคลและข้อมูลสถานประกอบกิจการ จึงกำหนดให้ public repository ใช้เฉพาะ source code, documentation และ mock/sanitized data เท่านั้น

### Closing

> Demo นี้เป็นจุดเริ่มต้นของการยกระดับงาน TLS 8001 จากเอกสารและ Excel ไปสู่ระบบวิเคราะห์เชิงบริหาร โดยยังต้องมี governance, security, access control และ data classification ก่อนใช้จริงใน production

---

## 5. What to Demonstrate

| Area | Demo action | Message |
|---|---|---|
| Privacy | เลือกไฟล์จากเครื่อง | Browser-only processing; no upload |
| KPI | แสดง cards | Management summary |
| Chart | Trend / CB / Pareto | Finding pattern and priority |
| Filter | Year / Site / CB / classification | Drill-down analysis |
| Table | Detail records | Traceability to finding level |
| Export | CSV / print to PDF | Report preparation |
| GitHub | README / docs / LICENSE | Professional repository standard |

---

## 6. FAQ for Demo Discussion

### Q1. Dashboard นี้ใช้ข้อมูลจริงได้หรือไม่?

ใช้ได้ในเชิงเทคนิค แต่ public repository นี้ห้ามเก็บข้อมูลจริง ต้องใช้เฉพาะ mock/sanitized data เท่านั้น หากใช้ production ต้องมี security, access control, data classification และ approval workflow เพิ่มเติม

### Q2. ทำไมต้องใช้ GitHub Pages?

GitHub Pages เหมาะสำหรับ public prototype/demo เพราะเปิดใช้งานง่าย ตรวจสอบ source ได้ และเชื่อมกับ GitHub workflow ได้ดี

### Q3. Dashboard แทน auditor judgment ได้หรือไม่?

ไม่ได้ Dashboard เป็นเครื่องมือวิเคราะห์และสื่อสารข้อมูล ไม่ใช่เครื่องมือออกคำวินิจฉัยแทนผู้ตรวจ หน่วยรับรอง หรือฝ่ายบริหาร

### Q4. เชื่อมกับระบบจริงในอนาคตได้ไหม?

ได้ แต่ควรประเมิน production readiness ก่อน เช่น authentication, authorization, data storage, audit trail, data retention, encryption และ governance model

---

## 7. Demo Risk Control

| Risk | Control |
|---|---|
| Confidential data exposure | Use mock/sanitized workbook only |
| Misinterpretation of findings | Add assumptions and limitations |
| Overclaiming legal/certification result | State that dashboard is decision-support only |
| Public repository misuse | Keep security policy and no-real-data rule |
| Version confusion | Document library versions and demo status |

---

## 8. Recommended Next Improvement

- Add sanitized sample workbook.
- Add screenshot-based demo walkthrough.
- Add release notes for v0.1 demo.
- Add GitHub Pages smoke-test workflow.
- Add production-readiness checklist for internal/private deployment.
