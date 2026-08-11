# Repository Structure

เอกสารนี้อธิบายโครงสร้างมาตรฐานของ repository `tls-audit-dashboard` ซึ่งเป็น working repository ของ **Project TLS8001** สำหรับใช้งานเป็น Static HTML Dashboard บน GitHub Pages, demo presentation, learning repository และฐานต่อยอดไปยังระบบ dashboard ในอนาคต

---

## Current Standard Layout

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
│   │   ├── dashboard.js              # Dashboard state, filters, charts, table rendering
│   │   └── data-loader.js            # Excel parsing + mapping + normalization
│   ├── data/                         # Reserved for mock/sample data only
│   └── vendor/                       # Offline vendor libraries
├── docs/
│   ├── demo-presentation-guide.md    # Demo script and presentation guide
│   ├── github-project-standard.md    # GitHub professional checklist
│   ├── jquery-4-teaching-guide.md    # jQuery version, commands, functions, plugin examples
│   ├── code-study-notes.md           # Developer study notes
│   ├── assumptions-limitations.md    # Prototype assumptions and limitations
│   ├── data-dictionary.md            # Field definitions
│   ├── data-quality-report.md        # Data quality and limitations
│   ├── deployment.md                 # GitHub Pages deployment guide
│   ├── design-system.md              # Visual design principles
│   ├── kpi-calculation.md            # KPI calculation notes
│   ├── open-source-licenses.md       # Project and library license references
│   ├── repository-structure.md       # This document
│   ├── technical-qa.md               # Manual technical QA checklist
│   └── workbook-structure.md         # Expected workbook design
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md      # Pull Request quality checklist
└── .gitignore                        # Prevents local/audit/confidential files from being committed
```

---

## Folder and File Roles

| Path | Purpose |
|---|---|
| `README.md` | Primary GitHub landing page for project overview, demo links, architecture and documentation map. |
| `PROJECT.md` | Project TLS8001 hub for executive positioning, demo storyline, governance and roadmap. |
| `LICENSE` | MIT License for source code and documentation. |
| `CONTRIBUTING.md` | Contribution rules, PR checklist and no-real-data rule. |
| `SECURITY.md` | Security and confidentiality policy for public repository use. |
| `index.html` | Public modular dashboard entry point for GitHub Pages. |
| `index-single-file.html` | Portable offline version with embedded dependencies. |
| `examples/` | Teaching/demo examples that do not contain confidential data. |
| `assets/css/` | Dashboard and print stylesheet files. |
| `assets/js/` | Dashboard logic and Excel data-loading scripts. |
| `assets/vendor/` | Offline fallback libraries and third-party assets. |
| `assets/data/` | Placeholder for mock or sanitized sample data only. Do not commit real audit files. |
| `docs/` | Documentation, demo guide, assumptions, data dictionary, QA, KPI logic, deployment and learning notes. |
| `.github/` | GitHub workflow support files such as pull request template. |

---

## GitHub Professional Standard

A GitHub-ready project should provide:

| Element | Purpose |
|---|---|
| Clear project identity | Helps reviewers understand why the repository exists. |
| Live demo links | Makes the project immediately testable. |
| Project hub | Supports executive/business presentation. |
| License | Clarifies rights to use and adapt. |
| Contributing guide | Defines how changes should be proposed. |
| Security policy | Protects confidential data and defines reporting expectations. |
| Documentation map | Helps users, reviewers and developers navigate. |
| PR template | Supports quality and privacy review before merge. |

See also: [`github-project-standard.md`](github-project-standard.md)

---

## Repository Governance Notes

1. Do not commit real audit workbooks, personal data, factory-specific confidential records, or certification evidence files.
2. Keep the public dashboard as a prototype/demo layer only unless formal data-publication approval exists.
3. Prefer modular updates through `assets/css/` and `assets/js/`; use `index-single-file.html` only when a portable offline package is required.
4. Update `README.md`, `PROJECT.md` and relevant docs whenever public URLs, file names, workflow or dashboard assumptions change.
5. Keep documentation in `docs/` aligned with actual dashboard behavior.
6. Use feature branches and pull requests for changes to public demo content.
7. Treat Project TLS8001 as a professional portfolio/demo repository, not a production audit data store.

---

## Suggested Future Structure

For a later PHP/MySQL, API-backed or internal production version, extend the repository only after security and governance requirements are defined:

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

Do not introduce server-side folders until the dashboard moves beyond the static prototype stage and a production-readiness decision has been made.
