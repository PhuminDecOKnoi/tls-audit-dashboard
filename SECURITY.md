# Security Policy

> Security and confidentiality policy for **Project TLS8001 / tls-audit-dashboard**

---

## 1. Supported Scope

This repository is a public prototype and demo project. It is intended for:

- source code demonstration;
- GitHub Pages demo;
- documentation and learning;
- sanitized/mock data testing;
- professional portfolio presentation.

It is not a production system and must not be used to store confidential audit evidence or real personal data in the public repository.

---

## 2. Confidentiality Rules

Do not upload, commit or attach:

- real TLS 8001 / HRA audit files;
- employee personal data;
- real wage, contract, disciplinary or grievance records;
- real site/client names unless public disclosure is approved;
- CB reports marked confidential;
- photos, evidence files or internal documents;
- access tokens, passwords, API keys or credentials.

---

## 3. Browser-only Processing

The dashboard prototype is designed around browser-side processing. Files selected by the user should be processed locally in the browser unless a future production architecture explicitly approves server-side handling.

Any future production use should define:

- authentication;
- authorization;
- data classification;
- encryption requirements;
- audit trail;
- retention policy;
- access review;
- incident response procedure.

---

## 4. Reporting a Security Concern

For security or confidentiality concerns, do not disclose details publicly in issues if they involve sensitive information.

Recommended report content:

- affected file or feature;
- type of risk;
- reproduction steps using mock/sanitized data only;
- recommended mitigation if known.

---

## 5. Public Issue Limitation

Public issues may be used for:

- documentation improvements;
- UI bugs using mock data;
- demo feedback;
- non-sensitive technical suggestions.

Do not include real audit data or personal information in public issues.

---

## 6. Security Review Checklist

Before demo or release:

- [ ] No real audit data is in the repository.
- [ ] No personal data is in the repository.
- [ ] No secrets or credentials are committed.
- [ ] Demo files are mock/sanitized.
- [ ] README states data/privacy limitations.
- [ ] Export and print features are explained as local/user-controlled actions.
- [ ] Production-readiness gaps are clearly documented.
