# Repository Structure

เอกสารนี้อธิบายโครงสร้างมาตรฐานของ repository `tls-audit-dashboard` สำหรับใช้งานเป็น Static HTML Dashboard บน GitHub Pages และใช้เป็นฐานต่อยอดไปยัง Web App ในอนาคต

## Current Standard Layout

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
└── docs/
    ├── assumptions-limitations.md
    ├── data-dictionary.md
    ├── data-quality-report.md
    ├── deployment.md
    ├── design-system.md
    ├── kpi-calculation.md
    ├── open-source-licenses.md
    ├── repository-structure.md
    ├── technical-qa.md
    └── workbook-structure.md
```

## Folder Roles

| Path | Purpose |
|---|---|
| `index.html` | Public modular dashboard entry point for GitHub Pages. |
| `index-single-file.html` | Portable offline version with embedded dependencies. |
| `assets/css/` | Dashboard and print stylesheet files. |
| `assets/js/` | Dashboard logic and Excel data-loading scripts. |
| `assets/vendor/` | Offline fallback libraries and third-party assets. |
| `assets/data/` | Placeholder for non-sensitive sample data only. Do not commit real audit files. |
| `docs/` | Documentation, assumptions, data dictionary, QA, KPI logic, and deployment notes. |

## Repository Governance Notes

1. Do not commit real audit workbooks, personal data, factory-specific confidential records, or certification evidence files.
2. Keep the public dashboard as a prototype/demo layer only unless a formal data-publication approval exists.
3. Prefer modular updates through `assets/css/` and `assets/js/`; use `index-single-file.html` only when a portable offline package is required.
4. Update `README.md` whenever public URLs, file names, or dashboard assumptions change.
5. Keep documentation in `docs/` aligned with the actual dashboard behavior.

## Suggested Future Structure

For a later PHP/MySQL or API-backed version, extend the repository as follows:

```text
server/
├── app/
├── config/
├── database/
└── public/

tests/
├── fixtures/
└── smoke/
```

Do not introduce server-side folders until the dashboard moves beyond the static prototype stage.
