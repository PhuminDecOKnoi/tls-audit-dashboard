# Open-source Libraries and Licenses

> License inventory for `tls-audit-dashboard`. This file separates the project license from third-party library licenses.

## Project License

| Item | License | File |
|---|---|---|
| `tls-audit-dashboard` source code and documentation | MIT License | [`../LICENSE`](../LICENSE) |

## Runtime Libraries Used by the Dashboard

| Library | Version | License | Usage |
|---|---:|---|---|
| jQuery Core | 4.0.0 | MIT License | DOM selection, event binding, UI state update |
| Chart.js | 4.5.1 | MIT License | Dashboard chart rendering |
| SheetJS Community Edition | 0.20.3 | Apache License 2.0 | Excel workbook parsing in browser |

## jQuery Ecosystem References for Teaching

These are documented for learning/reference purposes in [`jquery-4-teaching-guide.md`](jquery-4-teaching-guide.md). They are not all active runtime dependencies of this dashboard.

| Library / Plugin | Latest stable version checked | Role |
|---|---:|---|
| jQuery Migrate | 4.0.2 | Migration helper when upgrading legacy code to jQuery 4.x |
| jQuery UI | 1.14.2 | UI widgets and interactions such as draggable/dialog/datepicker |
| jQuery Mobile | 1.4.5 | Legacy mobile UI framework |
| jQuery Color | 3.0.0 | Color manipulation plugin |
| QUnit | 2.26.0 | JavaScript unit testing framework |

## Upstream References

- jQuery Download: https://jquery.com/download/
- jQuery CDN Latest Stable Versions: https://releases.jquery.com/
- jQuery License: https://jquery.org/license/
- Chart.js License: https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
- SheetJS CE License: https://docs.sheetjs.com/docs/miscellany/license/

Redistributed copies in `assets/vendor/` retain upstream headers where supplied. Review organizational open-source policy before Production deployment.
