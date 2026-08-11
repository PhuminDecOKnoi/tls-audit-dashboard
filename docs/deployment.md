# Deployment Guide

## Public GitHub Pages URL

- Main dashboard: `https://phumindecoknoi.github.io/tls-audit-dashboard/`
- Direct modular HTML: `https://phumindecoknoi.github.io/tls-audit-dashboard/index.html`
- Direct single-file HTML: `https://phumindecoknoi.github.io/tls-audit-dashboard/index-single-file.html`

## GitHub Pages Source

Current GitHub Pages configuration:

```text
Branch: main
Path: /
Status: built
Public: true
HTTPS: enforced
```

## Deployment Flow

1. Update source files on a feature branch.
2. Open a pull request into `main`.
3. Review changed files, especially `index.html`, `assets/js/`, `assets/css/`, and `README.md`.
4. Merge into `main` after review.
5. GitHub Pages will publish from the repository root.
6. Open the public URL and run a manual smoke test.

## Manual Smoke Test

Use this checklist after deployment:

- [ ] Public URL opens without a 404 error.
- [ ] `index.html` loads CSS and JavaScript correctly.
- [ ] Excel file selection control is visible.
- [ ] Sheet selection and column mapping screen are usable.
- [ ] KPI cards render after import.
- [ ] Charts render after import.
- [ ] Detail table renders after import.
- [ ] Print to PDF works from browser print.
- [ ] No real confidential data is committed to the repository.

## Data Privacy Warning

This dashboard processes Excel files in the browser. Do not publish real audit workbooks, personal data, employee records, certification evidence, or factory-specific confidential files in this repository unless formal publication approval has been obtained.
