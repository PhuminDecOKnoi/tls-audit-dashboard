# Code Study Notes — TLS Audit Dashboard

> Developer notes สำหรับอ่านโครงสร้าง `index.html`, `index-single-file.html`, CSS, JavaScript, jQuery, Chart.js และ SheetJS ใน repo นี้อย่างเป็นระบบ

---

## 1. Purpose of These Notes

เอกสารนี้ใช้เป็นคู่มือประกอบการศึกษาและบำรุงรักษา Dashboard ในอนาคต โดยอธิบายว่าแต่ละไฟล์ทำหน้าที่อะไร เชื่อมโยงกันอย่างไร และควรระวังอะไรเมื่อต้องแก้ไขโค้ด

Dashboard นี้เป็น **Browser-only Prototype** หมายความว่าไฟล์ Excel ถูกอ่านและประมวลผลใน Browser ของผู้ใช้ ไม่ใช่ Server-side application

---

## 2. Entry Points

| File | Role | When to Use |
|---|---|---|
| `index.html` | Modular entry point | ใช้สำหรับพัฒนา อ่านโค้ด แก้ไข และ debug |
| `index-single-file.html` | Single-file bundle | ใช้สำหรับเปิดแบบ offline หรือส่งต่อเป็นไฟล์เดียว |

### `index.html`

`index.html` เป็นไฟล์หลักที่อ่านง่ายที่สุด เพราะแยก dependencies ออกเป็นหลายไฟล์:

```text
index.html
├── assets/css/dashboard.css
├── assets/css/print.css
├── CDN/vendor scripts
├── assets/vendor/*
├── assets/js/data-loader.js
└── assets/js/dashboard.js
```

### `index-single-file.html`

`index-single-file.html` เป็น bundle ขนาดใหญ่ที่รวม CSS, JavaScript และ vendor libraries ไว้ในไฟล์เดียว เหมาะกับ prototype ที่ต้องส่งต่อหรือเปิดโดยไม่พึ่งหลายไฟล์

> Maintenance note: ควรแก้ logic ใน modular files ก่อน แล้วค่อย regenerate single-file version ภายหลัง เพื่อหลีกเลี่ยงการแก้ bundle ด้วยมือจนเกิดความไม่ตรงกันระหว่างสองเวอร์ชัน

---

## 3. HTML Study Notes

`index.html` ใช้หลักสำคัญต่อไปนี้:

| Concept | Example / Area | Purpose |
|---|---|---|
| `lang="th"` | `<html lang="th">` | ระบุภาษาไทยเพื่อ accessibility และ search context |
| `meta robots` | `noindex, nofollow` | ป้องกัน prototype ถูก index โดย search engine |
| Semantic sections | `header`, `nav`, `main`, `aside`, `section`, `footer` | ทำให้โครงสร้างอ่านง่ายและรองรับ assistive technology |
| ARIA | `aria-label`, `aria-live`, `role="status"` | แจ้งสถานะและช่วยผู้ใช้ที่ใช้ screen reader |
| Dialog | `<dialog>` | ใช้สำหรับ Column Mapping และ Record Detail |
| Canvas | `<canvas>` | พื้นที่ให้ Chart.js วาดกราฟ |

---

## 4. CSS Study Notes

### `assets/css/dashboard.css`

ไฟล์นี้เป็น visual system หลักของ Dashboard

| Section | What to Study |
|---|---|
| `:root` | CSS custom properties เช่น สี ระยะ spacing radius shadow |
| `main` | Grid layout สำหรับ filter panel + dashboard content |
| `.kpi-grid` | Responsive KPI card layout |
| `.chart-grid` | Dashboard chart layout |
| `.badge` | Visual status/classification tags |
| `dialog` | Modal-style layout |
| `@media` | Responsive behavior สำหรับจอเล็ก |
| `@media(prefers-reduced-motion)` | Accessibility สำหรับผู้ใช้ที่ลด animation |

### `assets/css/print.css`

ไฟล์นี้ใช้ตอน Browser Print / Save as PDF

| Rule | Purpose |
|---|---|
| `@page` | กำหนดขนาด A4 landscape |
| Hide toolbar/filter | ซ่อน control ที่ไม่เหมาะกับรายงาน static |
| `break-inside: avoid` | ลดปัญหา card ถูกตัดข้ามหน้า |
| `print-color-adjust` | รักษาสี header ให้ใกล้เคียงหน้าจอ |

---

## 5. JavaScript Study Notes

### `assets/js/data-loader.js`

บทบาทหลัก: แปลง Excel workbook ให้เป็น records ที่ Dashboard ใช้ได้

```text
Excel File
   ↓
SheetJS reads workbook
   ↓
findHeader()
   ↓
uniqueHeaders()
   ↓
autoMap()
   ↓
convert()
   ↓
Normalized records
```

Key functions:

| Function | Purpose |
|---|---|
| `clean()` | ตัดช่องว่างและ normalize value พื้นฐาน |
| `normalize()` | ทำให้ชื่อ field เทียบกันง่ายขึ้น |
| `findHeader()` | หาแถวหัวตารางจาก alias ที่ระบบรู้จัก |
| `uniqueHeaders()` | ป้องกันชื่อ column ซ้ำ |
| `autoMap()` | map column จากชื่อที่ตรงกับ required/optional aliases |
| `safeCell()` | ลดความเสี่ยง formula injection ใน CSV/Excel |
| `dateMeta()` | สร้าง year / quarter / month / sort key |
| `convert()` | แปลง raw worksheet rows เป็น audit records |
| `quality()` | ตรวจคุณภาพข้อมูลเบื้องต้น เช่น duplicate / missing fields |
| `loadFile()` | อ่านไฟล์ Excel ด้วย File API + SheetJS |
| `inspectSheet()` | ตรวจ Sheet และเตรียม mapping |

### `assets/js/dashboard.js`

บทบาทหลัก: ควบคุม UI และ Dashboard state

| Area | Purpose |
|---|---|
| Global state | เก็บ workbook, data, filters, charts, pagination และ mode ต่าง ๆ |
| jQuery selectors | อ่าน/อัปเดต DOM เช่น `$('#status-message')`, `$('#filters')` |
| Event handling | จับ event จาก file input, buttons, filters, search, page controls |
| Filtering | คำนวณข้อมูลตาม global filters และ search query |
| KPI rendering | สร้าง KPI cards และ shortcut filters |
| Chart rendering | ใช้ Chart.js สำหรับ trend, CB, classification, Pareto |
| Table rendering | สร้าง detail table, pagination และ sort |
| Dialog rendering | เปิด detail modal และ mapping modal |
| Export | Export CSV และ Browser Print |

---

## 6. jQuery Usage Pattern

Dashboard ใช้ jQuery เป็น utility layer สำหรับ:

```javascript
$('#status-message').text(msg)
$('#filters').html(html)
$('#table-search').val()
$(this).data('key')
```

Typical pattern:

```javascript
$('#some-button').on('click', function () {
  // read state
  // update filters or data
  // re-render dashboard
})
```

ข้อควรจำ:

- jQuery ช่วยให้ DOM selection และ event binding สั้นลง
- Logic หลักยังเป็น JavaScript ปกติ ไม่ควรผูก business logic ทั้งหมดไว้กับ DOM โดยตรง
- หากต้อง refactor ในอนาคต ควรแยก data logic, render logic และ event binding ให้ชัดขึ้น

---

## 7. Chart.js Usage Pattern

Chart.js ใช้สร้างกราฟใน `<canvas>`

```text
Data rows
   ↓
Group/count data
   ↓
Build chart labels + datasets
   ↓
new Chart(canvas, config)
```

แนวทางดูแล:

- ก่อนสร้างกราฟใหม่ ควร destroy chart เดิมเพื่อป้องกัน memory leak
- Chart click สามารถใช้เป็น filter shortcut ได้
- ควรมี text alternative หรือ caption สำหรับ accessibility

---

## 8. SheetJS Usage Pattern

SheetJS ใช้อ่าน Excel workbook ใน Browser

```javascript
let buffer = await file.arrayBuffer()
let wb = XLSX.read(buffer, { type: 'array', cellDates: false, dense: true })
```

แนวทางดูแล:

- จำกัดขนาดไฟล์ใน prototype เพื่อควบคุม browser memory
- อย่า upload workbook ไป server ถ้ายังต้องการรักษา browser-only privacy model
- ถ้า workbook มีหลายรูปแบบ ควรเพิ่ม alias ใน `REQUIRED` และ `OPTIONAL`

---

## 9. Data Protection Notes

Repository นี้เป็น public repo จึงต้องถือว่าไฟล์ใด ๆ ที่ commit ขึ้น GitHub สามารถถูกเข้าถึงได้

ห้าม commit:

- ไฟล์ Excel ผลตรวจจริง
- รายงาน CB ที่มีข้อมูลสถานประกอบกิจการจริง
- ข้อมูลส่วนบุคคลของผู้ตรวจ พนักงาน หรือผู้เกี่ยวข้อง
- หลักฐาน audit เช่น ภาพถ่าย เอกสารค่าจ้าง สัญญา หรือ record ภายใน
- ไฟล์ export เช่น CSV/PDF ที่มาจากข้อมูลจริง

---

## 10. Recommended Future Improvements

| Improvement | Benefit |
|---|---|
| Conditional vendor fallback | ลดการโหลด library ซ้ำระหว่าง CDN และ local vendor |
| Source maps / build script | ทำให้ single-file bundle regenerate ได้เป็นระบบ |
| Sample anonymized workbook | ใช้ทดสอบโดยไม่เสี่ยงข้อมูลจริง |
| Automated smoke test | ตรวจว่า GitHub Pages ยังโหลด assets ได้ครบ |
| ESLint / Prettier | ทำให้ JavaScript style สม่ำเสมอ |
| README screenshot | ทำให้ GitHub landing page ดูน่าเชื่อถือขึ้น |

---

## 11. Maintenance Rule

```text
Edit modular source files first
   ↓
Test index.html
   ↓
Regenerate index-single-file.html if needed
   ↓
Open Pull Request
   ↓
Confirm no confidential data
   ↓
Merge to main
   ↓
Smoke test GitHub Pages
```
