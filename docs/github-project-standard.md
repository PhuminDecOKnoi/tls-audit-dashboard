# GitHub Project Standard Checklist

> Professional repository checklist for **Project TLS8001 / tls-audit-dashboard**

---

## 1. Purpose

This document defines the minimum GitHub repository standard for Project TLS8001 so the repository is ready for professional presentation, demo review, teaching and future improvement.

---

## 2. Repository Standard

| Standard area | Expected practice | Project status |
|---|---|---:|
| Project identity | Clear project name, purpose and target users | Completed |
| README | Professional landing page with demo links and architecture | Completed |
| License | Root `LICENSE` file | Completed |
| Project hub | Root `PROJECT.md` file | Completed |
| Contribution guide | `CONTRIBUTING.md` with branch/PR rules | Completed |
| Security policy | `SECURITY.md` with no-real-data rule | Completed |
| PR workflow | Pull request template in `.github/` | Completed |
| Documentation | Structured `docs/` folder | Completed |
| Demo guide | Demo presentation guide | Completed |
| Public demo | GitHub Pages links | Completed |
| Confidentiality | Explicit public-repo restrictions | Mandatory |
| Learning value | Code study and jQuery teaching materials | Completed |

---

## 3. Recommended File Structure

```text
tls-audit-dashboard/
├── README.md
├── PROJECT.md
├── LICENSE
├── CONTRIBUTING.md
├── SECURITY.md
├── index.html
├── index-single-file.html
├── examples/
├── assets/
│   ├── css/
│   ├── js/
│   ├── vendor/
│   └── data/
├── docs/
└── .github/
```

---

## 4. README Quality Standard

A professional README should answer these questions quickly:

1. What is the project?
2. Who is it for?
3. What problem does it solve?
4. Where is the live demo?
5. What is the technical architecture?
6. How should users run or study it?
7. What data/privacy limits apply?
8. What documents should reviewers read next?

---

## 5. Documentation Standard

| Document type | Purpose |
|---|---|
| Project hub | Defines business/project identity |
| Demo guide | Helps present the project professionally |
| Deployment guide | Explains public GitHub Pages deployment |
| Workbook structure | Defines expected Excel input |
| Data dictionary | Explains fields and meanings |
| KPI calculation | Documents KPI logic |
| Data quality report | Explains limitations and assumptions |
| Technical QA | Supports manual validation |
| Code study notes | Supports developer learning |
| License inventory | Lists open-source dependencies |

---

## 6. Development Workflow

```text
Create feature branch
   ↓
Implement focused change
   ↓
Commit with clear message
   ↓
Open pull request
   ↓
Review docs/source/privacy impact
   ↓
Merge to main
   ↓
Verify GitHub Pages demo
```

---

## 7. Commit and Branch Naming

### Branch naming

Use clear prefixes:

```text
docs/<topic>
feature/<topic>
fix/<topic>
chore/<topic>
```

Examples:

```text
docs/tls8001-project-demo-standard
feature/dashboard-filter-improvement
fix/csv-export-encoding
chore/update-license-inventory
```

### Commit messages

Use concise professional messages:

```text
docs: add TLS8001 project hub
feature: add sanitized workbook template
fix: correct date parsing for Thai format
chore: update open-source license inventory
```

---

## 8. Privacy and Compliance Gate

Before every PR is merged, confirm:

- No real audit data is committed.
- No employee personal data is committed.
- No confidential CB report is committed.
- No real site/client name is committed unless approved for public use.
- No evidence file or wage/contract/discipline document is committed.
- Any sample data is mock or sanitized.

---

## 9. Demo Readiness Gate

Before presenting the project:

- README renders correctly.
- Live demo URL opens.
- `index.html` loads CSS and JavaScript.
- Excel import can be demonstrated using sanitized workbook.
- Filters and charts render correctly.
- Print/export flow works.
- Demo presenter understands limitations.

---

## 10. Future Professional Enhancements

| Enhancement | Benefit |
|---|---|
| Sanitized sample workbook | Easier live demo |
| Screenshots in README | Faster visual understanding |
| Release notes | Better version communication |
| GitHub Actions smoke test | Stronger deployment confidence |
| Issue templates | Better feedback collection |
| Production-readiness checklist | Clear boundary between prototype and real use |
