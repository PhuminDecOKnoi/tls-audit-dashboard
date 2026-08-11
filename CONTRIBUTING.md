# Contributing to TLS Audit Dashboard

> Contribution guide for **Project TLS8001 / tls-audit-dashboard**

Thank you for improving this project. This repository is used as a professional demo, learning repository and prototype for TLS 8001 / HRA dashboard work.

---

## 1. Contribution Scope

Contributions should improve one of these areas:

- dashboard usability;
- documentation quality;
- demo presentation readiness;
- code readability and comments;
- teaching examples;
- workbook mapping and data validation;
- privacy and security controls;
- GitHub Pages demo quality.

---

## 2. Confidentiality Rule

Do not commit real or confidential audit data.

Never commit:

- real Excel audit files;
- employee personal data;
- real CB reports;
- site or client confidential information;
- evidence files;
- wage, contract, discipline or grievance documents;
- screenshots containing confidential operational information.

Use mock or sanitized data only.

---

## 3. Branch Workflow

Create a focused branch before making changes:

```text
docs/<topic>
feature/<topic>
fix/<topic>
chore/<topic>
```

Examples:

```text
docs/demo-presentation-guide
feature/sanitized-sample-workbook
fix/column-mapping-validation
chore/update-library-license-notes
```

---

## 4. Pull Request Checklist

Before opening or merging a pull request:

- [ ] The change has a clear purpose.
- [ ] README or docs are updated if behavior changes.
- [ ] No real audit/confidential data is included.
- [ ] Browser demo still opens.
- [ ] Excel import flow is not broken.
- [ ] Public links remain correct.
- [ ] New code includes helpful comments where needed.

---

## 5. Coding Guidelines

### HTML

- Use semantic sections where practical.
- Keep accessibility labels for important controls.
- Add comments for major dashboard sections.

### CSS

- Prefer existing CSS variables/design tokens.
- Keep responsive behavior intact.
- Avoid unnecessary inline styles.

### JavaScript / jQuery

- Keep event binding readable.
- Prefer clear function names.
- Explain non-obvious logic with comments.
- Avoid changing dashboard calculation logic without documentation.

### Data handling

- Process user-selected files locally in the browser.
- Do not add server upload behavior unless security design is approved.
- Guard against formula injection when exporting user-derived table data.

---

## 6. Documentation Guidelines

Documentation should be:

- clear enough for non-technical reviewers;
- useful for HR, audit and compliance users;
- precise enough for developers;
- honest about assumptions and limitations;
- written in a professional GitHub-ready style.

---

## 7. License

By contributing, you agree that your contribution may be distributed under the MIT License used by this repository.
