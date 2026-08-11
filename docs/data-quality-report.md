# Data Quality Report

## สรุปจากไฟล์ที่ใช้พัฒนา
- Data source หลัก: `NC_Log`
- Records ที่ตรวจพบ: 40
- NC/CAR Ref. No.: เป็น `0` ทั้ง 40 รายการ จึงไม่เป็น Unique Identifier
- Corrective Action Due Date: มีค่าที่ใช้งานได้ 3 รายการ และอีก 37 รายการระบุหรือเทียบเท่า “ไม่ระบุในไฟล์”
- Remarks = Closed: 3 รายการ
- Audit Date: มีทั้งวันเดียวและช่วงวันที่หลายรูปแบบ
- Audit Criteria: พบ floating-point display artifacts เช่น `4.5999999999999996`; Prototype ปรับเฉพาะการแสดงผลเป็น `4.6`
- Duplicate: ระบบตรวจซ้ำจาก Audit Date + Site + Criteria + Classification + Finding หลังนำเข้า
- Awaiting clarification: ความหมายของ `0` ใน NC/CAR Ref.; นิยามสถานะ Open อย่างเป็นทางการ; วิธีใช้วันที่ช่วง

## Validation ใน Browser
หลัง Mapping ระบบรายงานจำนวน Record, Duplicate, Missing Ref, Missing Due Date และ Invalid Date โดยไม่แก้ไขไฟล์ต้นฉบับ


## Consistency check
- Distinct Site จาก `NC_Log`: 23 แห่ง ขณะที่ Dashboard เดิมแสดง 17 แห่ง
- Distinct CB ที่มี Record จริงใน `NC_Log`: 2 ราย (MASCI, SGS) ขณะที่ตารางสรุปเดิมรวม master values ที่มีศูนย์และแสดง 4 ราย
- Prototype ใช้ `NC_Log` และคำนวณใหม่หลังนำเข้าเป็นหลักตาม Source Boundary
