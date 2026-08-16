/**
 * TLS Audit Dashboard | Dashboard Controller
 * ------------------------------------------------------------
 * Purpose:
 * - Keep UI state, filters, charts, table rendering and export actions in one controller.
 * - Use jQuery 4.0.0 as a DOM/event utility layer only.
 * - Keep workbook parsing and record normalization in assets/js/data-loader.js.
 *
 * Teaching Structure:
 * 1. Configuration and state
 * 2. Utility helpers
 * 3. Filter rendering and state changes
 * 4. Summary, KPI, chart, alert and table rendering
 * 5. Dialog, export and workbook import flows
 * 6. Event binding and bootstrap
 */
(function ($, global) {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1) Configuration and state
  // ---------------------------------------------------------------------------

  const FILTER_DEFINITIONS = [
    ['year', 'ปี'],
    ['quarter', 'ไตรมาส'],
    ['month', 'เดือน'],
    ['cb', 'Certification Body'],
    ['classification', 'ระดับข้อบกพร่อง'],
    ['ba', 'Business Area'],
    ['bu', 'Business Unit'],
    ['site', 'สถานประกอบกิจการ'],
    ['auditType', 'ประเภทการตรวจ'],
    ['criteria', 'เกณฑ์การตรวจ'],
    ['legal', 'กฎหมาย / ข้อกำหนด'],
    ['status', 'สถานะ Corrective Action']
  ];

  const TABLE_COLUMNS = [
    ['auditDate', 'วันที่'],
    ['site', 'สถานประกอบกิจการ'],
    ['cb', 'CB'],
    ['criteria', 'เกณฑ์'],
    ['classification', 'ระดับ'],
    ['legal', 'กฎหมาย/ข้อกำหนด'],
    ['status', 'สถานะ'],
    ['finding', 'รายละเอียด Finding']
  ];

  const MONTH_LABELS = {
    '1': 'ม.ค.',
    '2': 'ก.พ.',
    '3': 'มี.ค.',
    '4': 'เม.ย.',
    '5': 'พ.ค.',
    '6': 'มิ.ย.',
    '7': 'ก.ค.',
    '8': 'ส.ค.',
    '9': 'ก.ย.',
    '10': 'ต.ค.',
    '11': 'พ.ย.',
    '12': 'ธ.ค.'
  };

  const CLASSIFICATION_COLORS = {
    Observation: '#7f8c8d',
    Minor: '#f4b400',
    Major: '#d93025',
    OFI: '#159a9c'
  };

  const app = {
    workbook: null,
    inspection: null,
    data: [],
    filters: {},
    charts: {},
    page: 1,
    sortKey: 'dateSort',
    sortAsc: false,
    period: 'month',
    cbLevel: 'cb',
    percentMode: false,
    paretoDesc: true
  };

  // ---------------------------------------------------------------------------
  // 2) Utility helpers
  // ---------------------------------------------------------------------------

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, function (char) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[char];
    });
  }

  function setStatus(message, isError = false) {
    $('#status-message').text(message).toggleClass('error', isError);
  }

  function debounce(fn, wait = 180) {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn(...args);
      }, wait);
    };
  }

  function uniqueSorted(values) {
    return [...new Set(values.filter(Boolean))].sort(function (a, b) {
      return String(a).localeCompare(String(b), 'th', { numeric: true });
    });
  }

  function selectedValues(key) {
    return app.filters[key] || [];
  }

  function displayLabel(key, value) {
    if (key === 'month') return MONTH_LABELS[value] || value;
    if (key === 'quarter') return `Q${value}`;
    return value;
  }

  function groupCount(rows, key) {
    const counts = {};

    rows.forEach(function (row) {
      const value = row[key] || 'ไม่ระบุ';
      counts[value] = (counts[value] || 0) + 1;
    });

    return Object.entries(counts).sort(function (a, b) {
      return b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), 'th');
    });
  }

  function activeFilterText() {
    const active = FILTER_DEFINITIONS
      .filter(function ([key]) {
        return selectedValues(key).length > 0;
      })
      .map(function ([key, label]) {
        return `${label}: ${selectedValues(key).map(function (value) {
          return displayLabel(key, value);
        }).join(', ')}`;
      });

    return active.length ? active.join(' • ') : 'ทั้งหมด';
  }

  function filteredRows() {
    const query = $('#table-search').val().trim().toLowerCase();

    return app.data.filter(function (row) {
      const matchesFilters = FILTER_DEFINITIONS.every(function ([key]) {
        const values = selectedValues(key);
        return !values.length || values.includes(row[key]);
      });

      const matchesSearch = !query || Object.values(row).join(' ').toLowerCase().includes(query);
      return matchesFilters && matchesSearch;
    });
  }

  function ensureLibraries() {
    if (!global.jQuery) throw new Error('jQuery 4.0.0 ไม่พร้อมใช้งาน');
    if (!global.Chart) throw new Error('Chart.js ไม่พร้อมใช้งาน');
    if (!global.XLSX) throw new Error('SheetJS ไม่พร้อมใช้งาน');
    if (!global.TLSDataLoader) throw new Error('TLSDataLoader ไม่พร้อมใช้งาน');
  }

  function destroyChart(name) {
    if (app.charts[name]) {
      app.charts[name].destroy();
      delete app.charts[name];
    }
  }

  function emptyState(selector, message = 'ไม่พบข้อมูลตามเงื่อนไขที่เลือก') {
    $(selector).html(`<span class="empty-state">${escapeHtml(message)}</span>`);
  }

  function badge(value) {
    const key = String(value || '').toLowerCase();
    let className = 'open';

    if (key.includes('major')) className = 'major';
    else if (key.includes('minor')) className = 'minor';
    else if (key === 'closed') className = 'closed';

    return `<span class="badge ${className}">${escapeHtml(value || 'ไม่ระบุ')}</span>`;
  }

  function formatRowsForAltText(items) {
    return items.map(function ([label, count]) {
      return `${label} ${count} รายการ`;
    }).join(', ');
  }

  // ---------------------------------------------------------------------------
  // 3) Filter rendering and state changes
  // ---------------------------------------------------------------------------

  function renderFilters() {
    const html = FILTER_DEFINITIONS.map(function ([key, label]) {
      const options = uniqueSorted(app.data.map(function (row) {
        return row[key];
      })).map(function (value) {
        return `<option value="${escapeHtml(value)}">${escapeHtml(displayLabel(key, value))}</option>`;
      }).join('');

      return `
        <div class="filter-field">
          <label for="filter-${key}">${escapeHtml(label)}</label>
          <select id="filter-${key}" data-key="${key}" multiple>${options}</select>
        </div>`;
    }).join('');

    $('#filters')
      .html(html)
      .find('select')
      .on('change', function () {
        app.filters[$(this).data('key')] = $(this).val() || [];
        app.page = 1;
        renderAll();
      });
  }

  function setFilter(key, value) {
    const values = selectedValues(key).slice();
    const index = values.indexOf(value);

    if (index >= 0) values.splice(index, 1);
    else values.push(value);

    app.filters[key] = values;
    $(`#filter-${key}`).val(values);
    app.page = 1;
    renderAll();
  }

  function resetDashboard() {
    app.filters = {};
    app.page = 1;

    $('#filters select').val([]);
    $('#table-search').val('');
    renderAll();
  }

  function renderActiveFilters() {
    $('#active-filters').text(activeFilterText());
  }

  // ---------------------------------------------------------------------------
  // 4) Summary, KPI, chart, alert and table rendering
  // ---------------------------------------------------------------------------

  function renderSummary(rows) {
    if (!rows.length) {
      emptyState('#executive-summary', 'ไม่พบข้อมูลตามตัวกรองปัจจุบัน');
      $('#decision-note').text('');
      return;
    }

    const major = rows.filter(function (row) { return row.classification === 'Major'; }).length;
    const minor = rows.filter(function (row) { return row.classification === 'Minor'; }).length;
    const open = rows.filter(function (row) { return row.status !== 'Closed'; }).length;
    const topCriteria = groupCount(rows, 'criteria')[0];
    const topLegal = groupCount(rows, 'legal')[0];

    $('#executive-summary').text(
      `พบ Findings ${rows.length} รายการ จาก ${new Set(rows.map(function (row) { return row.site; })).size} ` +
      `สถานประกอบกิจการ และ ${new Set(rows.map(function (row) { return row.cb; })).size} CB ` +
      `โดยมี Major ${major} รายการ Minor ${minor} รายการ และรายการที่ไม่พบสถานะ Closed ${open} รายการ ` +
      `ข้อกำหนดที่พบบ่อยที่สุดคือ ${topCriteria?.[0] || '-'} (${topCriteria?.[1] || 0}) ` +
      `และกลุ่มกฎหมาย/ข้อกำหนดที่พบมากที่สุดคือ ${topLegal?.[0] || '-'} (${topLegal?.[1] || 0})`
    );

    $('#decision-note').text(
      major || minor
        ? 'ประเด็นเพื่อการติดตาม: ตรวจสอบ Major/Minor ที่ยังไม่มีสถานะ Closed และยืนยันผู้รับผิดชอบ/กำหนดแล้วเสร็จจากแหล่งข้อมูลที่เกี่ยวข้อง'
        : 'ไม่พบ Major/Minor ที่ไม่มีสถานะ Closed ตามตัวกรองปัจจุบัน'
    );
  }

  function renderKpis(rows) {
    const items = [
      ['Findings', rows.length, 'รายการ', '', '', 'COUNTROWS'],
      ['สถานประกอบกิจการ', new Set(rows.map(function (row) { return row.site; })).size, 'แห่ง', '', '', 'DISTINCTCOUNT(Audited Site)'],
      ['CBs', new Set(rows.map(function (row) { return row.cb; })).size, 'หน่วย', '', '', 'DISTINCTCOUNT(CB)'],
      ['Major', rows.filter(function (row) { return row.classification === 'Major'; }).length, 'รายการ', 'alert', 'classification', 'Major'],
      ['Minor', rows.filter(function (row) { return row.classification === 'Minor'; }).length, 'รายการ', 'warning', 'classification', 'Minor'],
      ['Closed', rows.filter(function (row) { return row.status === 'Closed'; }).length, 'รายการ', '', 'status', 'Closed']
    ];

    const html = items.map(function ([label, value, unit, className, filterKey, filterValue]) {
      const filterAttrs = filterKey ? `data-filter="${filterKey}" data-value="${escapeHtml(filterValue)}"` : '';
      const title = filterKey ? 'กรองตามค่าที่เลือก' : filterValue;

      return `
        <button type="button" class="kpi-card ${className}" ${filterAttrs} title="${escapeHtml(title)}">
          <span>${escapeHtml(label)}</span>
          <strong>${value}</strong>
          <span>${escapeHtml(unit)}</span>
        </button>`;
    }).join('');

    $('#kpi-grid')
      .html(html)
      .find('[data-filter]')
      .on('click', function () {
        setFilter($(this).data('filter'), $(this).data('value'));
      });
  }

  function commonChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { enabled: true }
      },
      interaction: { mode: 'nearest', intersect: true },
      onHover: function (event, elements) {
        event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
      }
    };
  }

  function renderTrendChart(rows) {
    destroyChart('trend');

    const items = groupCount(rows, app.period).sort(function (a, b) {
      return Number(a[0]) - Number(b[0]);
    });

    $('#trend-title').text(`แนวโน้ม Findings ราย${app.period === 'month' ? 'เดือน' : 'ไตรมาส'} • ${activeFilterText()}`);

    if (!items.length) {
      $('#trend-caption').text('ไม่พบข้อมูลตามเงื่อนไขที่เลือก');
      $('#trend-alt').text('');
      return;
    }

    app.charts.trend = new Chart($('#trend-chart')[0], {
      type: 'line',
      data: {
        labels: items.map(function ([label]) {
          return app.period === 'month' ? (MONTH_LABELS[label] || label) : `Q${label}`;
        }),
        datasets: [{
          label: 'Findings (รายการ)',
          data: items.map(function ([, count]) { return count; }),
          borderColor: '#159a9c',
          backgroundColor: 'rgba(21,154,156,.15)',
          fill: true,
          tension: 0.2,
          pointRadius: 5
        }]
      },
      options: {
        ...commonChartOptions(),
        onClick: function (event, elements) {
          if (elements.length) setFilter(app.period, items[elements[0].index][0]);
        },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });

    $('#trend-caption').text(`แสดง ${items.length} ช่วงเวลา รวม ${rows.length} รายการ คลิกจุดข้อมูลเพื่อกรอง`);
    $('#trend-alt').text(formatRowsForAltText(items));
  }

  function renderCbChart(rows) {
    destroyChart('cb');

    const key = app.cbLevel;
    const groups = groupCount(rows, key).slice(0, 15);
    const classes = ['Observation', 'Minor', 'Major'];

    $('#cb-title').text(`Findings แยกตาม ${key === 'cb' ? 'CB' : 'สถานประกอบกิจการ'} • ${activeFilterText()}`);

    if (!groups.length) {
      $('#cb-caption').text('ไม่พบข้อมูลตามเงื่อนไขที่เลือก');
      $('#cb-alt').text('');
      return;
    }

    app.charts.cb = new Chart($('#cb-chart')[0], {
      type: 'bar',
      data: {
        labels: groups.map(function ([label]) { return label; }),
        datasets: classes.map(function (classification) {
          return {
            label: classification,
            data: groups.map(function ([label]) {
              return rows.filter(function (row) {
                return row[key] === label && row.classification === classification;
              }).length;
            }),
            backgroundColor: CLASSIFICATION_COLORS[classification]
          };
        })
      },
      options: {
        ...commonChartOptions(),
        indexAxis: 'y',
        onClick: function (event, elements) {
          if (elements.length) setFilter(key, groups[elements[0].index][0]);
        },
        scales: {
          x: { stacked: true, beginAtZero: true, ticks: { precision: 0 } },
          y: { stacked: true }
        }
      }
    });

    $('#cb-caption').text('จำนวน Findings แยกตามระดับข้อบกพร่อง ไม่ใช้เพื่อจัดอันดับคุณภาพ CB');
    $('#cb-alt').text(formatRowsForAltText(groups));
  }

  function renderClassificationChart(rows) {
    destroyChart('classification');

    const items = groupCount(rows, 'classification');
    const total = rows.length;

    $('#classification-title').text(`สัดส่วนระดับข้อบกพร่อง • ${activeFilterText()}`);

    if (!items.length) {
      $('#classification-caption').text('ไม่พบข้อมูลตามเงื่อนไขที่เลือก');
      $('#classification-alt').text('');
      return;
    }

    app.charts.classification = new Chart($('#classification-chart')[0], {
      type: 'doughnut',
      data: {
        labels: items.map(function ([label]) { return label; }),
        datasets: [{
          data: items.map(function ([, count]) {
            return app.percentMode ? Number((count / total * 100).toFixed(1)) : count;
          }),
          backgroundColor: items.map(function ([label]) {
            return CLASSIFICATION_COLORS[label] || '#b4bec9';
          })
        }]
      },
      options: {
        ...commonChartOptions(),
        onClick: function (event, elements) {
          if (elements.length) setFilter('classification', items[elements[0].index][0]);
        }
      }
    });

    $('#classification-caption').text(app.percentMode ? 'หน่วย: ร้อยละ' : 'หน่วย: รายการ');
    $('#classification-alt').text(formatRowsForAltText(items));
  }

  function renderParetoChart(rows) {
    destroyChart('pareto');

    const items = groupCount(rows, 'legal').slice(0, 12);
    if (!app.paretoDesc) items.reverse();

    const total = items.reduce(function (sum, [, count]) {
      return sum + count;
    }, 0);

    let cumulative = 0;
    const cumulativePct = items.map(function ([, count]) {
      cumulative += count;
      return Number((cumulative / total * 100).toFixed(1));
    });

    $('#pareto-title').text(`Pareto กฎหมาย/ข้อกำหนด • ${activeFilterText()}`);

    if (!items.length) {
      $('#pareto-caption').text('ไม่พบข้อมูลตามเงื่อนไขที่เลือก');
      $('#pareto-alt').text('');
      return;
    }

    app.charts.pareto = new Chart($('#pareto-chart')[0], {
      data: {
        labels: items.map(function ([label]) { return label; }),
        datasets: [
          {
            type: 'bar',
            label: 'จำนวน',
            data: items.map(function ([, count]) { return count; }),
            backgroundColor: '#159a9c',
            yAxisID: 'y'
          },
          {
            type: 'line',
            label: 'สะสม (%)',
            data: cumulativePct,
            borderColor: '#d93025',
            yAxisID: 'p',
            tension: 0.2
          }
        ]
      },
      options: {
        ...commonChartOptions(),
        onClick: function (event, elements) {
          if (elements.length) setFilter('legal', items[elements[0].index][0]);
        },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
          p: {
            position: 'right',
            min: 0,
            max: 100,
            grid: { drawOnChartArea: false },
            ticks: { callback: function (value) { return value + '%'; } }
          }
        }
      }
    });

    $('#pareto-caption').text('แท่งแสดงจำนวน เส้นแสดงสัดส่วนสะสม คลิกแท่งเพื่อกรอง');
    $('#pareto-alt').text(items.map(function ([label, count], index) {
      return `${label} ${count} รายการ สะสม ${cumulativePct[index]}%`;
    }).join(', '));
  }

  function renderCharts(rows) {
    renderTrendChart(rows);
    renderCbChart(rows);
    renderClassificationChart(rows);
    renderParetoChart(rows);
  }

  function renderAlerts(rows) {
    const alerts = rows
      .filter(function (row) {
        return ['Major', 'Minor'].includes(row.classification) && row.status !== 'Closed';
      })
      .sort(function (a, b) {
        return (a.classification === 'Major' ? 0 : 1) - (b.classification === 'Major' ? 0 : 1);
      });

    if (!alerts.length) {
      $('#alerts-list').html('<p class="empty-state">ไม่พบ Major/Minor ที่ไม่มีสถานะ Closed ตามตัวกรอง</p>');
      return;
    }

    const html = alerts.slice(0, 10).map(function (row) {
      return `
        <button type="button" class="alert-item ${row.classification.toLowerCase()}" data-id="${row.id}">
          <span class="badge ${row.classification.toLowerCase()}">${escapeHtml(row.classification)}</span>
          <span>
            <strong>${escapeHtml(row.site)}</strong><br>
            <small>${escapeHtml(row.cb)} • ${escapeHtml(row.auditDate)} • Due: ${escapeHtml(row.dueDate || 'ไม่ระบุในไฟล์')}</small>
          </span>
          <span>ดูรายละเอียด ›</span>
        </button>`;
    }).join('');

    $('#alerts-list')
      .html(html)
      .find('button')
      .on('click', function () {
        openDetail(Number($(this).data('id')));
      });
  }

  function renderTable(rows) {
    const pageSize = Number($('#page-size').val());
    const sortedRows = rows.slice().sort(function (a, b) {
      return String(a[app.sortKey] ?? '').localeCompare(String(b[app.sortKey] ?? ''), 'th', { numeric: true }) * (app.sortAsc ? 1 : -1);
    });

    const pages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
    app.page = Math.min(app.page, pages);

    const visibleRows = sortedRows.slice((app.page - 1) * pageSize, app.page * pageSize);

    const headHtml = '<tr>' + TABLE_COLUMNS.map(function ([key, label]) {
      const direction = app.sortKey === key ? (app.sortAsc ? ' ▲' : ' ▼') : '';
      return `<th scope="col"><button type="button" data-sort="${key}">${escapeHtml(label)}${direction}</button></th>`;
    }).join('') + '</tr>';

    $('#detail-head')
      .html(headHtml)
      .find('button')
      .on('click', function () {
        const key = $(this).data('sort');

        if (app.sortKey === key) app.sortAsc = !app.sortAsc;
        else {
          app.sortKey = key;
          app.sortAsc = true;
        }

        renderTable(filteredRows());
      });

    const bodyHtml = visibleRows.length
      ? visibleRows.map(function (row) {
        const cells = TABLE_COLUMNS.map(function ([key]) {
          const className = key === 'finding' ? 'wide-cell' : '';
          const value = ['classification', 'status'].includes(key) ? badge(row[key]) : escapeHtml(row[key] || 'ไม่ระบุในไฟล์');
          return `<td class="${className}">${value}</td>`;
        }).join('');

        return `<tr tabindex="0" data-id="${row.id}">${cells}</tr>`;
      }).join('')
      : '<tr><td colspan="8" class="empty-state">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</td></tr>';

    $('#detail-body')
      .html(bodyHtml)
      .find('tr[data-id]')
      .on('click keydown', function (event) {
        if (event.type === 'click' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDetail(Number($(this).data('id')));
        }
      });

    $('#page-info').text(`${sortedRows.length} รายการ • หน้า ${app.page}/${pages}`);
    $('#page-prev').prop('disabled', app.page <= 1);
    $('#page-next').prop('disabled', app.page >= pages);
  }

  function renderMetadata(rows) {
    const latest = rows
      .map(function (row) { return row.dateSort; })
      .filter(Boolean)
      .sort()
      .pop();

    $('#latest-date').text(latest || 'ไม่พบวันที่');
    $('#refresh-time').text(new Date().toLocaleString('th-TH'));
    $('#record-count').text(rows.length);
  }

  function renderAll() {
    const rows = filteredRows();

    renderActiveFilters();
    renderMetadata(rows);
    renderSummary(rows);
    renderKpis(rows);
    renderCharts(rows);
    renderAlerts(rows);
    renderTable(rows);
  }

  // ---------------------------------------------------------------------------
  // 5) Dialog, export and workbook import flows
  // ---------------------------------------------------------------------------

  function renderMappingFields() {
    const requiredKeys = Object.keys(global.TLSDataLoader.REQUIRED);
    const optionalKeys = Object.keys(global.TLSDataLoader.OPTIONAL);
    const keys = requiredKeys.concat(optionalKeys);

    const html = keys.map(function (key) {
      const names = global.TLSDataLoader.REQUIRED[key] || global.TLSDataLoader.OPTIONAL[key] || [key];
      const label = names[0];
      const selected = app.inspection.map[key] || '';
      const options = [''].concat(app.inspection.headers).map(function (header) {
        const selectedAttr = header === selected ? 'selected' : '';
        return `<option value="${escapeHtml(header)}" ${selectedAttr}>${escapeHtml(header || 'ไม่เลือก')}</option>`;
      }).join('');

      return `
        <div class="mapping-row">
          <label for="map-${key}">${escapeHtml(label)}</label>
          <select id="map-${key}" data-map-key="${key}">${options}</select>
        </div>`;
    }).join('');

    $('#mapping-fields').html(html);
  }

  function openMappingDialog() {
    renderMappingFields();
    $('#mapping-dialog')[0].showModal();
  }

  function applyMapping() {
    const map = { ...app.inspection.map };

    $('#mapping-fields select').each(function () {
      const key = $(this).data('map-key');
      const value = $(this).val();

      if (value) map[key] = value;
      else delete map[key];
    });

    loadMappedRecords(map);
  }

  function loadMappedRecords(map) {
    const required = Object.keys(global.TLSDataLoader.REQUIRED);
    const missing = required.filter(function (key) {
      return !map[key];
    });

    if (missing.length) {
      setStatus(`กรุณา map field ที่จำเป็นให้ครบ: ${missing.join(', ')}`, true);
      openMappingDialog();
      return;
    }

    app.data = global.TLSDataLoader.convert(app.inspection.objects, map);
    app.filters = {};
    app.page = 1;

    const quality = global.TLSDataLoader.quality(app.data);

    renderFilters();
    renderAll();

    $('#export-csv').prop('disabled', !app.data.length);
    setStatus(`อ่านข้อมูลสำเร็จ ${quality.records} records • duplicates ${quality.duplicates} • invalid date ${quality.invalidDate}`);
  }

  function openDetail(id) {
    const row = app.data.find(function (item) {
      return item.id === id;
    });

    if (!row) return;

    const html = Object.entries(row).map(function ([key, value]) {
      return `
        <div class="detail-block">
          <strong>${escapeHtml(key)}</strong>
          <span>${escapeHtml(value || 'ไม่ระบุในไฟล์')}</span>
        </div>`;
    }).join('');

    $('#detail-dialog-title').text(`รายละเอียด Record #${row.id}`);
    $('#detail-dialog-body').html(`<div class="detail-grid">${html}</div>`);
    $('#detail-dialog')[0].showModal();
  }

  function exportCsv() {
    const rows = filteredRows();
    if (!rows.length) {
      setStatus('ไม่พบข้อมูลสำหรับ Export', true);
      return;
    }

    const keys = TABLE_COLUMNS.map(function ([key]) { return key; });
    const lines = [keys.join(',')].concat(rows.map(function (row) {
      return keys.map(function (key) {
        const value = String(row[key] ?? '').replace(/"/g, '""');
        return `"${value}"`;
      }).join(',');
    }));

    const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'tls-audit-dashboard-filtered.csv';
    link.click();

    URL.revokeObjectURL(url);
    setStatus(`Export CSV สำเร็จ ${rows.length} รายการ`);
  }

  async function handleFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      ensureLibraries();
      app.workbook = await global.TLSDataLoader.loadFile(file);

      const options = app.workbook.SheetNames.map(function (name) {
        return `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`;
      }).join('');

      $('#sheet-select').html(options).prop('disabled', false);
      $('#load-sheet').prop('disabled', false);
      $('#export-csv').prop('disabled', true);

      setStatus(`โหลดไฟล์สำเร็จ: ${file.name} • พบ ${app.workbook.SheetNames.length} sheet`);
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  function handleLoadSheet() {
    try {
      ensureLibraries();

      const sheetName = $('#sheet-select').val();
      app.inspection = global.TLSDataLoader.inspectSheet(app.workbook, sheetName);

      const required = Object.keys(global.TLSDataLoader.REQUIRED);
      const missing = required.filter(function (key) {
        return !app.inspection.map[key];
      });

      if (missing.length) openMappingDialog();
      else loadMappedRecords(app.inspection.map);
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  // ---------------------------------------------------------------------------
  // 6) Event binding and bootstrap
  // ---------------------------------------------------------------------------

  function bindEvents() {
    $('#excel-file').on('change', handleFileSelected);
    $('#load-sheet').on('click', handleLoadSheet);
    $('#reset-all').on('click', resetDashboard);
    $('#export-csv').on('click', exportCsv);
    $('#print-summary').on('click', function () { global.print(); });

    $('#table-search').on('input', debounce(function () {
      app.page = 1;
      renderAll();
    }));

    $('#page-size').on('change', function () {
      app.page = 1;
      renderTable(filteredRows());
    });

    $('#page-prev').on('click', function () {
      app.page = Math.max(1, app.page - 1);
      renderTable(filteredRows());
    });

    $('#page-next').on('click', function () {
      app.page += 1;
      renderTable(filteredRows());
    });

    $('.view-toggle').on('click', function () {
      app.period = $(this).data('view');
      $('.view-toggle').attr('aria-pressed', 'false');
      $(this).attr('aria-pressed', 'true');
      renderTrendChart(filteredRows());
    });

    $('#cb-drill').on('click', function () {
      app.cbLevel = app.cbLevel === 'cb' ? 'site' : 'cb';
      $(this).text(app.cbLevel === 'cb' ? 'Drill-down' : 'Back to CB');
      renderCbChart(filteredRows());
    });

    $('#classification-toggle').on('click', function () {
      app.percentMode = !app.percentMode;
      $(this).text(app.percentMode ? 'ร้อยละ' : 'จำนวน');
      renderClassificationChart(filteredRows());
    });

    $('#pareto-sort').on('click', function () {
      app.paretoDesc = !app.paretoDesc;
      $(this).text(app.paretoDesc ? 'มาก → น้อย' : 'น้อย → มาก');
      renderParetoChart(filteredRows());
    });

    $('#apply-mapping').on('click', function (event) {
      event.preventDefault();
      applyMapping();
      $('#mapping-dialog')[0].close();
    });

    $('#close-detail').on('click', function () {
      $('#detail-dialog')[0].close();
    });
  }

  $(function () {
    try {
      ensureLibraries();
      bindEvents();
      setStatus('กรุณาเลือกไฟล์ Excel เพื่อเริ่มต้น');
    } catch (error) {
      setStatus(error.message, true);
    }
  });
})(jQuery, window);
