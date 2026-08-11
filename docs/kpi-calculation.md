# KPI Calculation Dictionary

## Findings ทั้งหมด
- นิยาม: จำนวนแถวข้อมูลที่มี Audit Date, Site, Classification และ CB
- สูตร: COUNTROWS(Clean Data)
- หน่วย: รายการ
- Filter: Global filters ทั้งหมด
- ข้อจำกัด: หนึ่งแถวถูกนับเป็นหนึ่ง Finding

## สถานประกอบกิจการ
- สูตร: DISTINCTCOUNT(Audited Site / Department)
- หน่วย: แห่ง

## Certification Bodies
- สูตร: DISTINCTCOUNT(Certification Body)
- หน่วย: หน่วย

## Major / Minor
- สูตร: COUNTROWS โดย NC Classification เท่ากับ Major หรือ Minor
- หน่วย: รายการ

## Closed
- สูตร: COUNTROWS โดย Remarks เท่ากับ Closed แบบไม่คำนึงตัวพิมพ์เล็ก/ใหญ่
- หน่วย: รายการ
- ข้อจำกัด: ไม่พบ Closure Date และ Workflow Status โดยเฉพาะ
