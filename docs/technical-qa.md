# Technical QA Report

## Automated checks completed
- JavaScript syntax: `node --check` passed for `data-loader.js` and `dashboard.js`
- Semantic structure: one H1, `header`, `nav`, `main`, `aside`, `section`, `figure`, `figcaption`, `table`, `caption`, `footer`, `noscript`
- Privacy: `noindex, nofollow, noarchive, nosnippet`; no real audit records embedded in HTML/JavaScript
- Inline event handlers: none found
- Excel parser test against attached workbook: passed
- Auto-detected header row: row 7 in `NC_Log`
- KPI reconciliations from `NC_Log`: 40 Records, 23 distinct Sites, 2 CBs with records, 33 Observation, 4 Minor, 3 Major, 3 Closed
- Quality checks: 0 exact business-key duplicates under the prototype rule, 40 missing/non-unique Ref values, 37 missing Due Dates, 0 unparseable Audit Date values under supported formats
- Private mode robots directive: passed
- Responsive CSS breakpoints: Desktop and Tablet rules present
- Keyboard: native buttons/selects/dialog, visible focus, skip link, Enter/Space activation on detail rows
- Security: text escaped before HTML rendering; spreadsheet values beginning with formula-control characters are prefixed for CSV/output safety; no credentials in source

## Continuous Integration smoke test

A GitHub Actions workflow is included at `.github/workflows/static-smoke-test.yml`.

The workflow checks:

- Required project files are present.
- `assets/js/data-loader.js` passes `node --check`.
- `assets/js/dashboard.js` passes `node --check`.
- `index.html` keeps the private prototype marker `noindex, nofollow`.
- `index.html` keeps conditional fallback markers for jQuery, Chart.js and SheetJS.

## Library compatibility approach
- No jQuery plugin or DataTables dependency is used
- jQuery 4.0.0 is used for DOM/events only
- Chart.js and SheetJS are independent of jQuery
- Script loading uses a CDN-first conditional fallback pattern:
  - CDN jQuery, Chart.js and SheetJS load first.
  - Local vendor copies load only when the expected global object is unavailable.
  - Application scripts load after vendor globals are available.
- This avoids duplicate library evaluation while preserving offline/self-contained fallback support.

## Maintainability and teaching-readiness approach
- `dashboard.js` is structured into readable controller sections: configuration/state, helpers, filters, rendering, import/export/dialog flow, and event/bootstrap.
- `dashboard.css` and `print.css` are formatted into section-based teaching blocks.
- jQuery remains a UI utility layer for DOM selection, events and UI state updates; workbook parsing remains in `data-loader.js`.

## Items requiring deployment-environment testing
- Lighthouse scores depend on the hosting environment and network
- Google Rich Results Test is not applicable in Private Prototype mode because structured data is intentionally omitted
- CDN reachability depends on organizational firewall policy; Offline Vendor copies are included
- Print-to-PDF appearance can vary slightly by Browser and printer settings
- GitHub Actions confirms syntax/static markers but does not replace manual browser testing with a sanitized workbook
