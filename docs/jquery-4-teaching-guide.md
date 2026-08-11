# jQuery 4 Teaching Guide

> คู่มือสรุปการใช้งาน jQuery สำหรับ repo `tls-audit-dashboard` เพื่อใช้สื่อสาร ถ่ายทอด และสอนการทำ Dashboard ด้วย HTML / CSS / JavaScript / jQuery แบบมืออาชีพ

## 1. Version ที่ใช้ในโครงการ

| รายการ | Version | สถานะการใช้งานใน repo | หมายเหตุ |
|---|---:|---|---|
| jQuery Core | 4.0.0 | ใช้งานจริงใน `index.html` | ใช้สำหรับ DOM selection, event handling และ UI update |
| jQuery Migrate | 4.0.2 | ไม่ได้ใช้งานจริง | ใช้ช่วยตรวจ compatibility ตอนย้ายจาก jQuery 3.x ไป 4.x |
| jQuery UI | 1.14.2 | ไม่ได้ใช้งานจริง | เป็น plugin UI เช่น draggable, dialog, datepicker แต่ dashboard นี้ใช้ native `<dialog>` |
| jQuery Mobile | 1.4.5 | ไม่ได้ใช้งานจริง | legacy mobile UI framework ไม่แนะนำให้เพิ่มหากไม่จำเป็น |
| jQuery Color | 3.0.0 | ไม่ได้ใช้งานจริง | plugin สำหรับจัดการ/animate สี |
| QUnit | 2.26.0 | ไม่ได้ใช้งานจริง | framework สำหรับ unit test ของ JavaScript/jQuery |

**ข้อสรุปสำหรับการสอน:** repo นี้ใช้ **jQuery Core 4.0.0 เท่านั้น** ส่วนรายการอื่นเป็น plugin/ecosystem ที่ควรรู้ แต่ไม่ใช่ dependency หลักของ dashboard

แหล่งตรวจสอบหลัก:

- https://jquery.com/download/
- https://releases.jquery.com/
- https://blog.jquery.com/2026/01/17/jquery-4-0-0/
- https://api.jquery.com/category/version/4.0/

---

## 2. บทบาทของ jQuery ใน Dashboard นี้

jQuery ในโครงการนี้ไม่ได้ถูกใช้แทน JavaScript ทั้งหมด แต่ถูกใช้ในงานที่เหมาะกับ jQuery ได้แก่:

1. เลือก element ในหน้าเว็บ เช่น `$('#excel-file')`, `$('#filters')`
2. ผูก event เช่น `.on('change', ...)`, `.on('click', ...)`
3. อ่าน/เขียนค่าจาก form เช่น `.val()`
4. เปลี่ยนข้อความ/HTML เช่น `.text()`, `.html()`
5. เพิ่ม/ลบ class สำหรับ UI state เช่น `.toggleClass('error', true)`
6. สร้าง interactive dashboard โดยเชื่อมข้อมูลกับ Chart.js และ Vanilla JavaScript

> หลักคิด: ใช้ jQuery เป็น **DOM and Event Helper** ไม่ใช่ framework ทั้งระบบ

---

## 3. วิธีเรียกใช้ jQuery 4.0.0

### 3.1 CDN แบบ Production

```html
<script
  src="https://code.jquery.com/jquery-4.0.0.min.js"
  integrity="sha384-fgGyf7Mo7DURSOMnOy7ed+dkq5Job205Gnzu6QIg0BOHKaqt4D76Dt8VlDCzcMHV"
  crossorigin="anonymous"
  defer></script>
```

คำอธิบาย:

| Attribute | ความหมาย |
|---|---|
| `src` | URL ของไฟล์ jQuery จาก official CDN |
| `integrity` | Subresource Integrity ใช้ตรวจว่าไฟล์ CDN ไม่ถูกแก้ไขระหว่างทาง |
| `crossorigin` | ใช้ร่วมกับ SRI เมื่อต้องโหลด resource จาก domain อื่น |
| `defer` | ให้ browser โหลด script แต่รันหลัง HTML parse เสร็จ |

### 3.2 Development Version

```html
<script src="https://code.jquery.com/jquery-4.0.0.js"></script>
```

เหมาะสำหรับสอน/debug เพราะอ่าน source ได้ง่ายกว่า `.min.js`

### 3.3 npm

```bash
npm install jquery@4.0.0
```

เหมาะกับ project ที่มี bundler เช่น Vite, Webpack หรือ Rollup

---

## 4. jQuery Syntax พื้นฐาน

```js
$(selector).method(argument);
```

ตัวอย่าง:

```js
$('#status-message').text('โหลดข้อมูลสำเร็จ');
```

แปลความหมาย:

| ส่วน | ความหมาย |
|---|---|
| `$` | alias ของ `jQuery` |
| `#status-message` | selector แบบ CSS เลือก element ที่มี id นี้ |
| `.text()` | method สำหรับอ่าน/เขียนข้อความ |
| `'โหลดข้อมูลสำเร็จ'` | ค่าที่ต้องการนำไปแสดง |

---

## 5. Selectors ที่ใช้บ่อย

| Selector | ความหมาย | ตัวอย่าง |
|---|---|---|
| `$('#id')` | เลือก element จาก id | `$('#excel-file')` |
| `$('.class')` | เลือก element จาก class | `$('.kpi-card')` |
| `$('tag')` | เลือกจาก tag | `$('button')` |
| `$('[data-key]')` | เลือกจาก attribute | `$('[data-filter]')` |
| `$('input[type="search"]')` | เลือก input ตาม type | `$('input[type="search"]')` |
| `$(this)` | element ปัจจุบันใน event handler | `$(this).val()` |

ตัวอย่างสอน:

```js
// เลือกปุ่มทั้งหมด แล้วเพิ่ม class เพื่อทำ styling
$('button').addClass('is-ready');
```

---

## 6. Events / คำสั่งเกี่ยวกับเหตุการณ์

### 6.1 `.on()`

ใช้ผูก event กับ element

```js
$('#load-sheet').on('click', function () {
  $('#status-message').text('กำลังอ่าน Sheet...');
});
```

ใช้เมื่อต้องการให้ปุ่ม/ช่องกรอก/ตัวกรองตอบสนองต่อผู้ใช้

### 6.2 `.off()`

ใช้ยกเลิก event เดิม

```js
$('#load-sheet').off('click');
```

เหมาะกับกรณี re-render component แล้วต้องกัน event ซ้ำ

### 6.3 `.trigger()`

ใช้สั่งให้ event ทำงานด้วย code

```js
$('#table-search').trigger('input');
```

ใช้ทดสอบหรือบังคับให้ logic เดิมทำงานโดยไม่ต้องให้ผู้ใช้กดเอง

### 6.4 Event Delegation

ใช้เมื่อ element ถูกสร้างทีหลัง เช่น row ในตาราง หรือ filter ที่ render จากข้อมูล

```js
$('#detail-body').on('click', 'tr[data-id]', function () {
  const id = $(this).data('id');
  console.log('Open record:', id);
});
```

ข้อดี: แม้ `tr[data-id]` จะถูกสร้างใหม่ภายหลัง event ก็ยังทำงานได้

---

## 7. DOM Manipulation / การแก้ไขหน้าเว็บ

| Method | ใช้ทำอะไร | ตัวอย่าง |
|---|---|---|
| `.text()` | อ่าน/เขียนข้อความ plain text | `$('#status').text('Ready')` |
| `.html()` | อ่าน/เขียน HTML | `$('#kpi-grid').html(cardsHtml)` |
| `.append()` | เพิ่ม HTML ต่อท้าย | `$('#list').append('<li>Item</li>')` |
| `.empty()` | ล้างเนื้อหาด้านใน | `$('#list').empty()` |
| `.replaceWith()` | แทนที่ element ทั้งก้อน | `$('#chart').replaceWith(newCanvas)` |
| `.clone()` | copy element | `const copy = $('#chart').clone()` |

หลักสอนสำคัญ:

- ใช้ `.text()` เมื่อแสดงข้อความจากผู้ใช้/ข้อมูลภายนอก เพราะปลอดภัยกว่า `.html()`
- ใช้ `.html()` เมื่อเราควบคุม HTML template เองแล้ว escape ข้อมูลเรียบร้อย

---

## 8. Attributes / Properties / Data

### 8.1 `.attr()`

ใช้กับ HTML attribute เช่น `href`, `src`, `aria-label`

```js
$('#download-link').attr('href', 'report.csv');
```

### 8.2 `.prop()`

ใช้กับ DOM property โดยเฉพาะ boolean state เช่น `disabled`, `checked`, `selected`

```js
$('#load-sheet').prop('disabled', false);
```

### 8.3 `.data()`

ใช้กับ `data-*` attribute

```html
<button class="kpi-card" data-filter="classification" data-value="Major">Major</button>
```

```js
$('.kpi-card').on('click', function () {
  const filter = $(this).data('filter');
  const value = $(this).data('value');
  console.log(filter, value);
});
```

### 8.4 `.val()`

อ่าน/เขียนค่าจาก input/select/textarea

```js
const keyword = $('#table-search').val().trim();
```

---

## 9. CSS / Class Methods

| Method | ใช้ทำอะไร | ตัวอย่าง |
|---|---|---|
| `.addClass()` | เพิ่ม class | `$('#status').addClass('success')` |
| `.removeClass()` | ลบ class | `$('#status').removeClass('error')` |
| `.toggleClass()` | เปิด/ปิด class ตามเงื่อนไข | `$('#status').toggleClass('error', hasError)` |
| `.hasClass()` | ตรวจว่ามี class หรือไม่ | `$('#panel').hasClass('open')` |
| `.css()` | อ่าน/เขียน style โดยตรง | `$('#panel').css('display', 'block')` |

แนวทางมืออาชีพ:

- ควรใช้ class เป็นหลัก เช่น `.addClass()` / `.toggleClass()`
- ลดการใช้ `.css()` แบบ inline ยกเว้นกรณี dynamic จริง ๆ

---

## 10. Traversal / การเดินหา element รอบข้าง

| Method | ความหมาย | ตัวอย่าง |
|---|---|---|
| `.find()` | หา element ลูกหลาน | `$('#filters').find('select')` |
| `.closest()` | หา parent ที่ใกล้ที่สุดตาม selector | `$(this).closest('tr')` |
| `.parent()` | parent ชั้นเดียว | `$(this).parent()` |
| `.children()` | ลูกชั้นเดียว | `$('#list').children()` |
| `.siblings()` | element พี่น้อง | `$(this).siblings()` |
| `.eq(index)` | เลือกตัวที่ n | `$('.kpi-card').eq(0)` |
| `.first()` / `.last()` | ตัวแรก/ตัวสุดท้าย | `$('tr').first()` |

---

## 11. Effects / Animation

> หมายเหตุ: jQuery slim build ไม่รวม `ajax` และ `effects` modules ดังนั้นหากต้องใช้ animation ให้ใช้ full build ไม่ใช่ slim build

| Method | ตัวอย่าง | หมายเหตุ |
|---|---|---|
| `.show()` | `$('#panel').show()` | แสดง element |
| `.hide()` | `$('#panel').hide()` | ซ่อน element |
| `.toggle()` | `$('#panel').toggle()` | สลับแสดง/ซ่อน |
| `.fadeIn()` | `$('#panel').fadeIn(150)` | แสดงแบบ fade |
| `.fadeOut()` | `$('#panel').fadeOut(150)` | ซ่อนแบบ fade |

สำหรับ dashboard มืออาชีพ แนะนำใช้ CSS class + transition มากกว่า effect จำนวนมาก เพื่อควบคุม performance และ accessibility ได้ง่าย

---

## 12. AJAX ใน jQuery

> Dashboard นี้อ่าน Excel ด้วย Browser File API + SheetJS จึงไม่ได้ใช้ AJAX เป็นหลัก

ตัวอย่างทั่วไป:

```js
$.ajax({
  url: 'assets/data/sample.json',
  method: 'GET',
  dataType: 'json'
}).done(function (data) {
  console.log('Loaded:', data);
}).fail(function () {
  console.error('Cannot load data');
});
```

ในงานใหม่ที่ไม่ต้องพึ่ง jQuery มาก อาจใช้ `fetch()` ของ JavaScript แทนได้

---

## 13. Utility Functions

| Utility | ใช้ทำอะไร | ตัวอย่าง |
|---|---|---|
| `$.each()` | loop array/object | `$.each(rows, function(i, row) {})` |
| `$.map()` | map ค่าใหม่ | `$.map(rows, row => row.site)` |
| `$.grep()` | filter array | `$.grep(rows, row => row.classification === 'Major')` |
| `$.extend()` | merge object | `$.extend({}, defaults, options)` |
| `$.trim()` | ตัด space | ใน jQuery รุ่นใหม่ควรใช้ native `String.prototype.trim()` |

แนวทางสอน: ปัจจุบันควรสอนทั้ง jQuery utility และ native JavaScript คู่กัน เพื่อให้ผู้เรียนเข้าใจการพัฒนาเว็บยุคใหม่

---

## 14. jQuery Plugin Pattern

Plugin ใน jQuery คือ function ที่เพิ่มเข้าไปใน `$.fn` เพื่อให้เรียกต่อจาก selector ได้ เช่น `$('.field').markRequired()`

```js
(function ($) {
  'use strict';

  $.fn.markRequired = function (options) {
    const settings = $.extend({
      text: 'จำเป็น',
      className: 'is-required'
    }, options);

    return this.each(function () {
      const $field = $(this);
      $field.addClass(settings.className);
      $field.append('<span class="required-note">' + settings.text + '</span>');
    });
  };
})(jQuery);

// การใช้งาน
$('.mapping-row').markRequired({ text: 'Required Field' });
```

หลักมืออาชีพของ plugin:

1. ครอบด้วย IIFE เพื่อไม่ให้ตัวแปรรั่วไป global scope
2. รับ `options` เพื่อปรับแต่งได้
3. ใช้ `$.extend()` รวม default options กับ user options
4. `return this.each(...)` เพื่อรองรับหลาย elements และ chain ต่อได้
5. หลีกเลี่ยงการเขียน logic ที่ผูกกับ project มากเกินไป

---

## 15. ตัวอย่างการสอนจาก Dashboard จริง

### ตัวอย่างที่ 1: ปุ่มเลือกไฟล์ Excel

```js
$('#excel-file').on('change', async function () {
  const file = this.files[0];
  $('#status-message').text('กำลังอ่านไฟล์: ' + file.name);
});
```

จุดสอน:

- `$('#excel-file')` เลือก input file
- `.on('change', ...)` ทำงานเมื่อผู้ใช้เลือกไฟล์
- `this.files[0]` เป็น native DOM API ไม่ใช่ jQuery
- jQuery และ native JavaScript ใช้ร่วมกันได้

### ตัวอย่างที่ 2: เปิด/ปิดสถานะ error

```js
function showStatus(message, isError) {
  $('#status-message')
    .text(message)
    .toggleClass('error', isError);
}
```

จุดสอน:

- chain method ได้
- `.text()` ปลอดภัยสำหรับข้อความ
- `.toggleClass()` ใช้ควบคุม state ของ UI

### ตัวอย่างที่ 3: อ่านค่าค้นหาในตาราง

```js
$('#table-search').on('input', function () {
  const keyword = $(this).val().trim().toLowerCase();
  console.log('Search:', keyword);
});
```

จุดสอน:

- `$(this).val()` อ่านค่าจาก input
- `.trim()` และ `.toLowerCase()` เป็น native JavaScript string methods
- event `input` เหมาะกับ search box มากกว่า `change`

### ตัวอย่างที่ 4: Event delegation กับตาราง

```js
$('#detail-body').on('click', 'tr[data-id]', function () {
  const recordId = $(this).data('id');
  console.log('Open detail record:', recordId);
});
```

จุดสอน:

- เหมาะกับ rows ที่ render ใหม่จากข้อมูล
- ไม่ต้อง bind event ใหม่ทุกครั้งหลังเปลี่ยนหน้า table
- ใช้ `data-id` เพื่อเก็บ record id ใน DOM

---

## 16. jQuery 4.0 Notes สำหรับผู้สอน

ประเด็นสำคัญของ jQuery 4.0 ที่ควรสื่อสาร:

1. jQuery 4.0.0 เป็น major release ล่าสุดของ jQuery Core
2. รองรับ browser สมัยใหม่มากขึ้น และลด legacy code
3. เลิก support IE ต่ำกว่า 11 และ browser เก่าหลายกลุ่ม
4. มีการปรับปรุงเรื่อง CSP และ Trusted Types
5. jQuery Slim build เล็กกว่าเดิม แต่ไม่รวม AJAX/effects บางส่วน
6. API บางส่วนที่ deprecated ถูกนำออก จึงควรทดสอบก่อน upgrade จาก jQuery 3.x
7. ใช้ jQuery Migrate เพื่อช่วยตรวจ compatibility ในช่วง migration ได้

---

## 17. Checklist สำหรับสอน jQuery ใน Class

- [ ] อธิบายว่า jQuery คือ DOM helper ไม่ใช่ full framework
- [ ] เปิดหน้า HTML ที่โหลด jQuery 4.0.0 สำเร็จ
- [ ] สอน selector: id, class, tag, attribute, `this`
- [ ] สอน event: `.on()`, `.off()`, `.trigger()`
- [ ] สอน form value: `.val()`
- [ ] สอน DOM update: `.text()`, `.html()`, `.append()`
- [ ] สอน class/state: `.addClass()`, `.removeClass()`, `.toggleClass()`
- [ ] สอน attribute/property: `.attr()` vs `.prop()`
- [ ] สอน `.data()` สำหรับ `data-*`
- [ ] สอน event delegation สำหรับ dynamic table
- [ ] สอน plugin pattern เบื้องต้น
- [ ] เปรียบเทียบกับ native JavaScript เมื่อเหมาะสม

---

## 18. Teaching Script แบบสั้น

> jQuery ช่วยให้เราเขียน JavaScript เพื่อจัดการหน้าเว็บได้สั้น อ่านง่าย และเหมาะกับงาน DOM interaction เช่น เลือก element, ผูก event, อ่านค่า form, เปลี่ยนข้อความ, เปลี่ยน class และสร้าง interaction ในหน้า dashboard. ใน repo นี้ jQuery 4.0.0 ถูกใช้ร่วมกับ Vanilla JavaScript, SheetJS และ Chart.js โดยให้ jQuery รับผิดชอบส่วน UI interaction ส่วน logic หลัก เช่น การอ่าน Excel, normalize data, filter, KPI และ chart rendering แยกไว้ใน JavaScript function เพื่อให้ดูแลต่อได้ง่าย.

---

## 19. ข้อควรระวังในการใช้งานจริง

| ประเด็น | คำแนะนำ |
|---|---|
| Security | อย่าใส่ข้อมูลจากผู้ใช้ลง `.html()` โดยไม่ escape |
| Performance | ลดการ select DOM ซ้ำใน loop ขนาดใหญ่ |
| Dependency | ใช้ jQuery เฉพาะจุดที่ช่วยให้งานง่ายจริง |
| Compatibility | เมื่อ upgrade จาก 3.x ไป 4.x ให้ทดสอบ plugin เดิมก่อน |
| Accessibility | event handler ต้องไม่ทำลาย keyboard navigation และ focus state |
| Maintainability | แยก data logic ออกจาก UI rendering |

---

## 20. Reference

- jQuery Download: https://jquery.com/download/
- jQuery CDN Latest Stable Versions: https://releases.jquery.com/
- jQuery 4.0.0 Release Notes: https://blog.jquery.com/2026/01/17/jquery-4-0-0/
- jQuery API Documentation: https://api.jquery.com/
- jQuery Version 4.0 API Notes: https://api.jquery.com/category/version/4.0/
