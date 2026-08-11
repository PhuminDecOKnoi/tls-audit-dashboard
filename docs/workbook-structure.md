# Workbook Structure Report

| Sheet | Max rows | Max columns | Used range | Formulas | Merged ranges |
|---|---:|---:|---|---:|---:|
| Dashboard | 99 | 27 | A1:AA99 | 12 | 36 |
| EN_Template | 29 | 17 | A1:Q29 | 21 | 8 |
| TH_Template | 29 | 17 | A1:Q29 | 20 | 8 |
| NC_Log | 91 | 17 | A1:Q91 | 67 | 10 |
| Dashboard_Data | 86 | 16 | A1:P86 | 144 | 0 |
| Lists | 85 | 14 | A1:N85 | 0 | 0 |
| Cover | 12 | 8 | A1:H12 | 0 | 3 |

## Source selection
- Dashboard ใช้ `NC_Log` เป็นข้อมูลข้อเท็จจริงหลัก
- จาก 40 Records ใน `NC_Log` พบสถานประกอบกิจการไม่ซ้ำ 23 แห่ง และ CB ที่ปรากฏจริง 2 ราย คือ MASCI และ SGS
- Sheet `Dashboard` เดิมแสดง 17 Sites และ 4 CBs ซึ่งไม่สอดคล้องกับ Distinct values ใน `NC_Log`; Prototype จึงคำนวณจากข้อมูลที่นำเข้าทุกครั้ง ไม่ใช้ค่าที่ฝังใน Dashboard เดิม
- CB ที่มีค่า 0 ในตารางสรุปเดิมไม่ถูกนับเป็น CB ที่มี Record จริง