// ===== LoanSight AI 화면 설계서 생성기 — 공통 빌더 =====
// 디자인 토큰 (design-taste-frontend app-screen 규칙: 단일 잉크·단일 강조색, 그라데이션/그림자/글로우 없음,
// 상태색은 텍스트와 함께, 차트는 단색 계열 + 강조 1색)
function hex(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 };
}
function fmtN(v) { var n = Math.round(Math.abs(v)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (v < 0 ? '−' : '') + n; }
function solid(h, o) { var p = { type: 'SOLID', color: hex(h) }; if (o != null) p.opacity = o; return p; }

var C = {
  ink: '#15181D', ink2: '#3C4450', sub: '#5E6773', mute: '#8B939E', line: '#E2E5E9', line2: '#EEF0F2',
  ground: '#F3F4F1', surface: '#FFFFFF', tone: '#F7F8F6', tone2: '#EDEFEB',
  accent: '#FFBC00', accentTint: '#FFF3CC', accentInk: '#60584C', kbGray: '#60584C', yellowNeg: '#FFCC00', // KB Yellow Positive · KB Gray · KB Yellow Negative
  chart: '#60584C', chart2: '#BDB4A6', chart3: '#E2DDD3',
  warn: '#B42318', warnBg: '#FCEBE9', caut: '#9A5B06', cautBg: '#FBF0DC', obs: '#355C86', obsBg: '#E7EEF6',
  none: '#7C838D', noneBg: '#EEF0F2',
  // 설계서(주석) 색
  red: '#E5312B', specLabel: '#F1F1F1', specLine: '#D6D6D6', canvas: '#3C3C3C', tag: '#E7E7E7'
};

var FONT = { family: 'Noto Sans KR', map: {} };
async function setupFonts() {
  var list = await figma.listAvailableFontsAsync();
  var fams = {};
  list.forEach(function (f) { (fams[f.fontName.family] = fams[f.fontName.family] || []).push(f.fontName.style); });
  var cands = ['Pretendard', 'Pretendard Variable', 'Pretendard JP', 'Noto Sans KR', 'Noto Sans CJK KR', 'Malgun Gothic', 'Inter'];
  var fam = null;
  for (var i = 0; i < cands.length; i++) if (fams[cands[i]]) { fam = cands[i]; break; }
  if (!fam) fam = 'Inter';
  var styles = fams[fam] || ['Regular'];
  var want = {
    400: ['Regular', 'Normal', 'Book'],
    500: ['Medium', 'Regular'],
    600: ['SemiBold', 'Semi Bold', 'Semibold', 'DemiBold', 'Bold'],
    700: ['Bold', 'SemiBold', 'Semi Bold']
  };
  FONT.family = fam;
  for (var w in want) {
    var pick = null;
    for (var j = 0; j < want[w].length; j++) if (styles.indexOf(want[w][j]) >= 0) { pick = want[w][j]; break; }
    FONT.map[w] = pick || styles[0];
  }
  var uniq = {};
  for (var k in FONT.map) uniq[FONT.map[k]] = 1;
  for (var s in uniq) await figma.loadFontAsync({ family: fam, style: s });
  return fam;
}

// ---------- 기본 노드 ----------
function setPad(f, p) {
  if (p == null) return;
  if (typeof p === 'number') p = [p, p, p, p];
  else if (p.length === 2) p = [p[0], p[1], p[0], p[1]];
  f.paddingTop = p[0]; f.paddingRight = p[1]; f.paddingBottom = p[2]; f.paddingLeft = p[3];
}

// 자식 지정: node 또는 [node, {fill, fillV, abs:[x,y]}]
function addKids(f, kids) {
  (kids || []).forEach(function (k) {
    if (!k) return;
    var node = k, opt = null;
    if (Array.isArray(k)) { node = k[0]; opt = k[1] || {}; }
    if (!node) return;
    f.appendChild(node);
    if (opt) {
      if (opt.abs) { node.layoutPositioning = 'ABSOLUTE'; node.x = opt.abs[0]; node.y = opt.abs[1]; return; }
      if (opt.fill) { node.layoutSizingHorizontal = 'FILL'; if (node.type === 'TEXT') node.textAutoResize = 'HEIGHT'; }
      if (opt.fillV) node.layoutSizingVertical = 'FILL';
      if (opt.grow) { node.layoutGrow = 1; if (node.type === 'TEXT') node.textAutoResize = 'HEIGHT'; }
    }
  });
}

// 오토레이아웃 프레임
function A(dir, o, kids) {
  o = o || {};
  var f = figma.createFrame();
  f.name = o.name || (dir === 'h' ? 'Row' : 'Col');
  f.layoutMode = dir === 'h' ? 'HORIZONTAL' : 'VERTICAL';
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  f.fills = o.bg ? [solid(o.bg)] : [];
  f.clipsContent = !!o.clip;
  setPad(f, o.p);
  f.itemSpacing = o.g || 0;
  if (o.r) f.cornerRadius = o.r;
  if (o.stroke) {
    f.strokes = [solid(o.stroke)];
    f.strokeAlign = 'INSIDE';
    if (o.sides) {
      f.strokeTopWeight = o.sides[0]; f.strokeRightWeight = o.sides[1]; f.strokeBottomWeight = o.sides[2]; f.strokeLeftWeight = o.sides[3];
    } else f.strokeWeight = o.sw || 1;
    if (o.dash) f.dashPattern = o.dash;
  }
  if (o.align) f.counterAxisAlignItems = o.align;     // MIN CENTER MAX BASELINE
  if (o.justify) f.primaryAxisAlignItems = o.justify; // MIN CENTER MAX SPACE_BETWEEN
  if (o.wrap) { f.layoutWrap = 'WRAP'; f.counterAxisSpacing = o.wrapGap != null ? o.wrapGap : (o.g || 0); }
  if (o.w || o.h) {
    f.resize(o.w || 100, o.h || 100);
    var horiz = dir === 'h';
    if (o.w) { if (horiz) f.primaryAxisSizingMode = 'FIXED'; else f.counterAxisSizingMode = 'FIXED'; } else f.layoutSizingHorizontal = 'HUG';
    if (o.h) { if (horiz) f.counterAxisSizingMode = 'FIXED'; else f.primaryAxisSizingMode = 'FIXED'; } else f.layoutSizingVertical = 'HUG';
  }
  if (o.opacity != null) f.opacity = o.opacity;
  addKids(f, kids);
  return f;
}

// 텍스트
function T(s, o) {
  o = o || {};
  var t = figma.createText();
  t.fontName = { family: FONT.family, style: FONT.map[o.w || 400] };
  t.characters = String(s);
  t.fontSize = o.s || 13;
  t.fills = [solid(o.c || C.ink)];
  t.lineHeight = { unit: 'PERCENT', value: o.lh || 145 };
  if (o.ls != null) t.letterSpacing = { unit: 'PERCENT', value: o.ls };
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.width) { t.resize(o.width, t.height); t.textAutoResize = 'HEIGHT'; }
  if (o.tnum) { try { t.setRangeOpenTypeFeatures(0, t.characters.length, { TNUM: true }); } catch (e) {} }
  if (o.under) t.textDecoration = 'UNDERLINE';
  t.name = o.name || String(s).slice(0, 24);
  return t;
}

// 고정 크기 일반 프레임(차트 캔버스)
function Free(w, h, o) {
  o = o || {};
  var f = figma.createFrame();
  f.name = o.name || 'Canvas';
  f.resize(w, h);
  f.fills = o.bg ? [solid(o.bg)] : [];
  f.clipsContent = false;
  return f;
}
function R(w, h, color, o) {
  o = o || {};
  var r = figma.createRectangle();
  r.resize(Math.max(0.01, w), Math.max(0.01, h));
  r.fills = color ? [solid(color, o.op)] : [];
  if (o.stroke) { r.strokes = [solid(o.stroke)]; r.strokeWeight = o.sw || 1; if (o.dash) r.dashPattern = o.dash; }
  if (o.r) r.cornerRadius = o.r;
  r.name = o.name || 'rect';
  return r;
}
function E(d, color, o) {
  o = o || {};
  var e = figma.createEllipse();
  e.resize(d, d);
  e.fills = color ? [solid(color)] : [];
  if (o.stroke) { e.strokes = [solid(o.stroke)]; e.strokeWeight = o.sw || 1.5; }
  e.name = 'dot';
  return e;
}
function put(parent, node, x, y) { parent.appendChild(node); node.x = x; node.y = y; return node; }
function svg(str, name) { var n = figma.createNodeFromSvg(str); n.name = name || 'svg'; n.fills = []; return n; }
function Sp(w, h) { var r = R(w || 1, h || 1, null); r.name = 'spacer'; return r; }

// ---------- 아이콘 (SVG 원본) ----------
function icon(kind, size, color) {
  size = size || 14; color = color || C.sub;
  var p = {
    chev: '<path d="M4 6l4 4 4-4" stroke="' + color + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    right: '<path d="M6 4l4 4-4 4" stroke="' + color + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    search: '<circle cx="7" cy="7" r="4.5" stroke="' + color + '" stroke-width="1.6" fill="none"/><path d="M10.5 10.5L14 14" stroke="' + color + '" stroke-width="1.6" stroke-linecap="round"/>',
    check: '<path d="M3.5 8.5l3 3 6-7" stroke="' + color + '" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    ext: '<path d="M9 3h4v4M13 3L7.5 8.5M12 9.5V13H3V4h3.5" stroke="' + color + '" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    copy: '<rect x="5" y="5" width="8" height="8" rx="1.5" stroke="' + color + '" stroke-width="1.5" fill="none"/><path d="M3 10V3h7" stroke="' + color + '" stroke-width="1.5" fill="none"/>',
    close: '<path d="M4 4l8 8M12 4l-8 8" stroke="' + color + '" stroke-width="1.6" stroke-linecap="round"/>',
    cal: '<rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="' + color + '" stroke-width="1.4" fill="none"/><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="' + color + '" stroke-width="1.4"/>',
    info: '<circle cx="8" cy="8" r="6" stroke="' + color + '" stroke-width="1.4" fill="none"/><path d="M8 7.2V11M8 5v.2" stroke="' + color + '" stroke-width="1.6" stroke-linecap="round"/>',
    refresh: '<path d="M13 8a5 5 0 1 1-1.5-3.6M13 3v3h-3" stroke="' + color + '" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    doc: '<path d="M4 2h5l3 3v9H4z" stroke="' + color + '" stroke-width="1.4" fill="none" stroke-linejoin="round"/><path d="M6 8h4M6 10.5h4" stroke="' + color + '" stroke-width="1.4"/>'
  }[kind];
  return svg('<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' + p + '</svg>', 'icon/' + kind);
}

// ---------- UI 컴포넌트 ----------
function badge(text, kind) {
  var m = {
    warn: [C.warnBg, C.warn], caut: [C.cautBg, C.caut], obs: [C.obsBg, C.obs], none: [C.noneBg, C.none],
    ok: [C.accentTint, C.accentInk], neutral: [C.tone2, C.ink2], ink: [C.kbGray, C.yellowNeg], line: [null, C.sub]
  }[kind || 'neutral'];
  return A('h', { name: 'badge/' + text, bg: m[0], p: [2, 7], r: 4, stroke: kind === 'line' ? C.line : null }, [T(text, { s: 11, w: 600, c: m[1], lh: 150 })]);
}
function stageBadge(stage) { return badge(stage, { '경고': 'warn', '주의': 'caut', '관찰': 'obs' }[stage] || 'none'); }
function detBadge(st) { return badge(st, { '검출': 'ok', '공시상 없음': 'neutral', '미검출': 'caut', '추출 실패': 'warn' }[st] || 'none'); }

function btn(text, kind, o) {
  o = o || {};
  var k = kind || 'primary';
  var bg = k === 'primary' ? C.accent : (k === 'dark' ? C.kbGray : C.surface);
  var fg = k === 'primary' ? C.ink : (k === 'dark' ? C.yellowNeg : (k === 'ghost' ? C.kbGray : C.ink));
  var f = A('h', { name: 'button/' + text, bg: k === 'ghost' ? null : bg, p: o.sm ? [5, 10] : [8, 14], r: 6, g: 6, align: 'CENTER', stroke: k === 'secondary' ? C.line : null, opacity: o.disabled ? 0.4 : null },
    [o.icon ? icon(o.icon, 14, fg) : null, T(text, { s: o.sm ? 12 : 13, w: 600, c: fg })]);
  return f;
}
function input(ph, o) {
  o = o || {};
  var f = A('h', { name: 'input', bg: C.surface, stroke: C.line, r: 6, p: [8, 12], g: 8, align: 'CENTER', w: o.w || 200 },
    [o.icon ? icon(o.icon, 14, C.mute) : null, [T(ph, { s: 13, c: o.value ? C.ink : C.mute }), { grow: true }], o.select ? icon('chev', 14, C.sub) : null]);
  return f;
}
function field(label, ctrl, o) {
  o = o || {};
  return A('v', { name: 'field/' + label, g: 6 }, [
    A('h', { g: 4 }, [T(label, { s: 12, w: 600, c: C.ink2 }), o.req ? T('*', { s: 12, w: 700, c: C.warn }) : null]),
    ctrl,
    o.help ? T(o.help, { s: 11, c: C.mute }) : null
  ]);
}
function checkbox(on, label, o) {
  o = o || {};
  var box = on ? A('h', { bg: C.accent, r: 3, w: 16, h: 16, align: 'CENTER', justify: 'CENTER' }, [icon('check', 12, C.ink)])
               : A('h', { bg: C.surface, stroke: C.chart2, sw: 1.5, r: 3, w: 16, h: 16 }, []);
  box.name = on ? 'checkbox/on' : 'checkbox/off';
  return label ? A('h', { g: 8, align: 'CENTER', name: 'check/' + label }, [box, T(label, { s: o.s || 13, c: o.c || C.ink })]) : box;
}
function radio(on, label) {
  var dot = on ? A('h', { stroke: C.accent, sw: 5, r: 8, w: 16, h: 16 }, []) : A('h', { stroke: C.chart2, sw: 1.5, r: 8, w: 16, h: 16, bg: C.surface }, []);
  return A('h', { g: 6, align: 'CENTER', name: 'radio/' + label }, [dot, T(label, { s: 13 })]);
}
function toggle(on, label) {
  var track = A('h', { bg: on ? C.accent : C.chart3, r: 9, w: 32, h: 18, p: 2, justify: on ? 'MAX' : 'MIN', align: 'CENTER' }, [E(14, '#FFFFFF')]);
  return A('h', { g: 8, align: 'CENTER', name: 'toggle/' + label }, [track, T(label, { s: 12, c: C.ink2 })]);
}
function tabs(items, active, o) {
  o = o || {};
  return A('h', { name: 'tabs', g: 4, bg: C.tone2, r: 7, p: 3 }, items.map(function (t, i) {
    return A('h', { bg: i === active ? C.surface : null, r: 5, p: [5, 12], stroke: i === active ? C.line : null }, [T(t, { s: 12, w: i === active ? 600 : 500, c: i === active ? C.ink : C.sub })]);
  }));
}
function chip(text, on) {
  return A('h', { name: 'chip/' + text, bg: on ? C.kbGray : C.surface, stroke: on ? null : C.line, r: 16, p: [5, 12] }, [T(text, { s: 12, w: on ? 600 : 500, c: on ? C.yellowNeg : C.ink2 })]);
}
function srcChip(text) { // 출처·기준 구분 칩
  return A('h', { name: 'src/' + text, g: 4, align: 'CENTER', p: [2, 6], r: 4, stroke: C.line, bg: C.surface }, [T(text, { s: 10.5, w: 500, c: C.sub })]);
}

// 패널
function panel(title, meta, kids, o) {
  o = o || {};
  var head = title ? A('h', { name: 'panel-head', justify: 'SPACE_BETWEEN', align: 'CENTER', g: 8 }, [
    A('h', { g: 8, align: 'CENTER' }, [T(title, { s: 14, w: 700 })].concat(o.titleExtra || [])),
    meta ? (typeof meta === 'string' ? T(meta, { s: 12, c: C.sub }) : meta) : null
  ]) : null;
  var f = A('v', { name: o.name || ('panel/' + (title || '')), bg: o.bg || C.surface, stroke: o.noStroke ? null : C.line, r: 8, p: o.p != null ? o.p : [16, 18], g: o.g != null ? o.g : 12, w: o.w },
    [head ? [head, { fill: true }] : null].concat(kids.map(function (k) { return Array.isArray(k) ? k : [k, { fill: !!(o.fillKids) }]; })));
  return f;
}

// 표
function table(cols, rows, o) {
  o = o || {};
  var f = A('v', { name: o.name || 'table', bg: C.surface, stroke: o.noStroke ? null : C.line, r: 6, clip: true });
  function row(cells, isHead, idx) {
    var rr = A('h', { name: isHead ? 'thead' : 'row', bg: isHead ? C.tone : (o.rowBg && o.rowBg[idx] ? o.rowBg[idx] : null), stroke: C.line2, sides: [0, 0, 1, 0], align: 'CENTER', p: [0, 4] });
    cells.forEach(function (c, i) {
      var col = cols[i];
      var cell = A('h', { name: 'cell', p: [isHead ? 8 : 9, 10], align: 'CENTER', justify: col.align === 'right' ? 'MAX' : (col.align === 'center' ? 'CENTER' : 'MIN'), w: col.w || 40, g: 6 });
      rr.appendChild(cell);
      if (!col.w) cell.layoutGrow = 1;
      if (c && typeof c === 'object' && c.type) cell.appendChild(c);
      else if (Array.isArray(c)) c.forEach(function (n) { cell.appendChild(n); });
      else {
        var tx = T(c == null ? '' : c, { s: isHead ? 11.5 : 12.5, w: isHead ? 600 : (col.bold ? 600 : 400), c: isHead ? C.sub : (col.mute ? C.sub : C.ink), tnum: !!col.num, align: col.align === 'right' ? 'RIGHT' : (col.align === 'center' ? 'CENTER' : 'LEFT') });
        cell.appendChild(tx); tx.layoutSizingHorizontal = 'FILL'; tx.textAutoResize = 'HEIGHT';
      }
      if (col.w) { cell.layoutSizingHorizontal = 'FIXED'; cell.resize(col.w, cell.height); cell.layoutSizingVertical = 'HUG'; }
      else cell.layoutSizingHorizontal = 'FILL';
    });
    if (o.dim && o.dim[idx]) rr.opacity = 0.5;
    return rr;
  }
  f.appendChild(row(cols.map(function (c) { return c.t; }), true, -1));
  f.children[0].layoutSizingHorizontal = 'FILL';
  rows.forEach(function (r, i) { var rr = row(r, false, i); f.appendChild(rr); rr.layoutSizingHorizontal = 'FILL'; });
  var defW = 8; cols.forEach(function (c) { defW += c.w || 170; });
  f.resize(o.w || defW, f.height); f.layoutSizingVertical = 'HUG';
  return f;
}

// KPI 타일
function kpi(label, value, sub, o) {
  o = o || {};
  return A('v', { name: 'kpi/' + label, bg: C.surface, stroke: C.line, r: 8, p: [14, 16], g: 6, w: o.w }, [
    A('h', { g: 6, align: 'CENTER' }, [T(label, { s: 12, w: 500, c: C.sub })].concat(o.tags || [])),
    A('h', { g: 6, align: 'BASELINE' }, [T(value, { s: o.big ? 30 : 22, w: 700, ls: -2, tnum: true }), o.unit ? T(o.unit, { s: 13, w: 500, c: C.sub }) : null]),
    sub ? (typeof sub === 'string' ? T(sub, { s: 12, c: o.subC || C.sub }) : sub) : null
  ].concat(o.extra || []));
}

// ---------- 차트 ----------
function sparkline(w, h, vals, color, o) {
  o = o || {};
  var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals); if (mx === mn) { mx += 1; mn -= 1; }
  var pts = vals.map(function (v, i) { return [(i / (vals.length - 1)) * (w - 6) + 3, h - 3 - ((v - mn) / (mx - mn)) * (h - 6)]; });
  var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
  var last = pts[pts.length - 1];
  var dots = o.missing ? '' : '';
  var s = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg"><path d="' + d + '" stroke="' + (color || C.chart) + '" stroke-width="1.6" fill="none" stroke-linejoin="round"/>' +
    '<circle cx="' + last[0].toFixed(1) + '" cy="' + last[1].toFixed(1) + '" r="2.6" fill="' + (color || C.chart) + '"/>' + dots + '</svg>';
  return svg(s, 'sparkline');
}
// 축 + 막대(그룹) 차트
function barChart(w, h, cats, series, o) {
  o = o || {};
  var f = Free(w, h, { name: o.name || 'bar-chart' });
  var padL = 40, padB = 22, padT = 8, cw = w - padL - 4, ch = h - padB - padT;
  var all = []; series.forEach(function (s) { all = all.concat(s.v); });
  var mx = o.max || Math.max.apply(null, all.map(Math.abs)) * 1.15, mn = o.min != null ? o.min : Math.min(0, Math.min.apply(null, all) * 1.15);
  function y(v) { return padT + ch - ((v - mn) / (mx - mn)) * ch; }
  var ticks = o.ticks || [mn, (mn + mx) / 2, mx];
  ticks.forEach(function (tv) {
    put(f, R(cw, 1, C.line2), padL, y(tv));
    var lb = T(o.fmt ? o.fmt(tv) : fmtN(tv), { s: 10, c: C.mute, tnum: true }); put(f, lb, 0, y(tv) - 7);
  });
  if (mn < 0) put(f, R(cw, 1, C.chart2), padL, y(0));
  var gw = cw / cats.length, bw = Math.min(26, (gw - 16) / series.length);
  cats.forEach(function (c, i) {
    series.forEach(function (s, j) {
      var v = s.v[i]; var y0 = y(Math.max(0, v)), y1 = y(Math.min(0, v));
      var x = padL + i * gw + (gw - bw * series.length - 4 * (series.length - 1)) / 2 + j * (bw + 4);
      put(f, R(bw, Math.max(1, y1 - y0), s.c, { name: s.n + ' ' + c }), x, y0);
    });
    var lb = T(c, { s: 10.5, c: C.sub }); put(f, lb, padL + i * gw + gw / 2 - lb.width / 2, h - padB + 6);
  });
  return f;
}
function legend(items) {
  return A('h', { name: 'legend', g: 14, align: 'CENTER' }, items.map(function (it) {
    return A('h', { g: 6, align: 'CENTER' }, [it.line ? R(14, 2, it.c) : R(10, 10, it.c, { r: 2 }), T(it.n, { s: 11, c: C.sub })]);
  }));
}
// 점(스트립) 플롯
function stripPlot(w, vals, me, med, o) {
  o = o || {};
  var h = 54, f = Free(w, h, { name: 'strip-plot' });
  var mn = o.min, mx = o.max;
  function x(v) { return 8 + ((v - mn) / (mx - mn)) * (w - 16); }
  put(f, R(w - 16, 1, C.line), 8, 24);
  vals.forEach(function (v) { put(f, E(9, C.chart2), x(v) - 4.5, 20); });
  put(f, R(2, 24, C.ink2), x(med) - 1, 12);
  var ml = T('중앙값 ' + o.fmt(med), { s: 10, c: C.ink2 }); put(f, ml, Math.min(w - 70, x(med) + 4), 0);
  put(f, E(13, C.accent, { stroke: '#FFFFFF', sw: 2 }), x(me) - 6.5, 18);
  var l = T('자사 ' + o.fmt(me), { s: 10.5, w: 700, c: C.kbGray }); put(f, l, Math.max(0, Math.min(w - 60, x(me) - 20)), 36);
  return f;
}
// 불릿 차트
function bullet(w, value, target, max, o) {
  o = o || {};
  var f = Free(w, 40, { name: 'bullet' });
  var bands = o.bands || [max * 0.33, max * 0.66, max];
  var cols = [C.tone2, '#E3E6E2', '#D7DBD6'];
  var prev = 0;
  bands.forEach(function (b, i) { put(f, R((b - prev) / max * w, 18, cols[i]), prev / max * w, 4); prev = b; });
  put(f, R(value / max * w, 8, o.c || C.chart), 0, 9);
  put(f, R(2, 26, C.warn), target / max * w - 1, 0);
  var tl = T(o.targetLabel || '', { s: 10, c: C.warn }); put(f, tl, Math.min(w - tl.width, target / max * w + 4), 26);
  var s0 = T('0', { s: 10, c: C.mute }); put(f, s0, 0, 26);
  return f;
}
// ===== 설계서 양식: 헤더 테이블 · 주석 마커 · Description · 앱 셸 · 시트 조립 =====
var SCREEN_W = 1280, DESC_W = 380;
var META = { created: '2026.10.24', updated: '2026.10.24', author: '김동혁' };

function marker(id) {
  var m = A('h', { name: 'marker ' + id, bg: C.red, r: 10, p: [1, id.length > 1 ? 6 : 0], align: 'CENTER', justify: 'CENTER', h: 20, w: id.length > 1 ? null : 20 },
    [T(id, { s: 11, w: 700, c: '#FFFFFF', lh: 120 })]);
  if (id.length > 1) { m.layoutSizingHorizontal = 'HUG'; }
  return m;
}
// 빨간 영역 박스 + 번호 마커
function ann(id, node, o) {
  o = o || {};
  var w = A('v', { name: 'ann ' + id, p: o.pad != null ? o.pad : 4, stroke: C.red, sw: 1.5 }, [[node, { fill: !!o.fill }]]);
  w.clipsContent = false;
  var m = marker(id);
  w.appendChild(m); m.layoutPositioning = 'ABSOLUTE'; m.x = o.mx != null ? o.mx : -10; m.y = o.my != null ? o.my : -10;
  return w;
}
// 작은 마커만(요소 옆에 붙이는 하위 번호)
function pin(id, node, o) {
  o = o || {};
  var w = A('h', { name: 'pin ' + id, g: 4, align: 'CENTER', p: 2, stroke: C.red, sw: 1.5 }, [node]);
  w.clipsContent = false;
  var m = marker(id); w.appendChild(m); m.layoutPositioning = 'ABSOLUTE'; m.x = o.mx != null ? o.mx : -12; m.y = o.my != null ? o.my : -12;
  return w;
}

function headerTable(name, path, id) {
  function cell(t, isLabel, w) {
    var c = A('h', { name: isLabel ? 'label' : 'value', bg: isLabel ? C.specLabel : '#FFFFFF', p: [7, 8], align: 'CENTER', justify: 'CENTER', stroke: C.specLine, sw: 0.5, w: w });
    c.appendChild(T(t, { s: 11.5, w: isLabel ? 500 : 600, c: isLabel ? '#555555' : '#222222' }));
    return c;
  }
  function row(a) {
    var r = A('h', { name: 'meta-row' });
    a.forEach(function (x, i) { var c = cell(x, i % 2 === 0, i % 2 === 0 ? 108 : null); r.appendChild(c); if (i % 2 === 1) { c.layoutGrow = 1; } c.layoutSizingVertical = 'FILL'; });
    return r;
  }
  var t = A('v', { name: 'header-table' }, [
    [row(['화면명', name, '화면 경로', path, '화면 ID', id]), { fill: true }],
    [row(['최초 작성 일자', META.created, '최종 수정 일자', META.updated, '작성자', META.author]), { fill: true }]
  ]);
  return t;
}

// Description 항목 lines 규칙:
//  "- 텍스트"  → • 1단계,  "-- 텍스트" → ◦ 2단계,  "+ 텍스트" → 빨간 조건/미정 메모,  "F: ..." → 관련 기능·요구 ID
function descItem(id, title, lines) {
  var body = A('v', { name: 'desc-body', g: 3 }, [[T(title, { s: 12.5, w: 700, c: '#222222' }), { fill: true }]]);
  lines.forEach(function (ln) {
    var t;
    if (ln.indexOf('-- ') === 0) t = A('h', { g: 6, p: [0, 0, 0, 16] }, [T('◦', { s: 11.5, c: '#555' }), [T(ln.slice(3), { s: 11.5, c: '#333333' }), { fill: true }]]);
    else if (ln.indexOf('- ') === 0) t = A('h', { g: 6, p: [0, 0, 0, 4] }, [T('•', { s: 11.5, c: '#555' }), [T(ln.slice(2), { s: 11.5, c: '#333333' }), { fill: true }]]);
    else if (ln.indexOf('+ ') === 0) t = T(ln, { s: 11.5, w: 600, c: C.red });
    else if (ln.indexOf('F: ') === 0) t = T('관련 ' + ln.slice(3), { s: 10.5, w: 500, c: '#8A8A8A' });
    else t = T(ln, { s: 11.5, c: '#333333' });
    body.appendChild(t); t.layoutSizingHorizontal = 'FILL'; if (t.type === 'TEXT') t.textAutoResize = 'HEIGHT';
    if (t.type === 'FRAME') t.children.forEach(function (c) { if (c.type === 'TEXT' && c.characters.length > 1) { c.layoutSizingHorizontal = 'FILL'; c.textAutoResize = 'HEIGHT'; } });
  });
  var row = A('h', { name: 'desc ' + id, g: 10, p: [14, 16], stroke: C.specLine, sides: [0, 0, 1, 0] }, [marker(id), [body, { fill: true }]]);
  return row;
}
function descColumn(items, note) {
  var col = A('v', { name: 'Description', w: DESC_W, stroke: C.specLine, sides: [0, 0, 0, 1] });
  function bar(t) { return A('h', { bg: '#E4E4E4', p: [8, 12], stroke: C.specLine, sides: [0, 0, 1, 0] }, [T(t, { s: 12, w: 600, c: '#444' })]); }
  col.appendChild(bar('Description')); col.children[0].layoutSizingHorizontal = 'FILL';
  items.forEach(function (it) { var d = descItem(it[0], it[1], it[2]); col.appendChild(d); d.layoutSizingHorizontal = 'FILL'; });
  var b = bar('비고'); col.appendChild(b); b.layoutSizingHorizontal = 'FILL';
  var nb = A('v', { p: [12, 16], g: 4 });
  (note || []).forEach(function (n) { var t = T(n, { s: 11.5, w: n.indexOf('+ ') === 0 ? 600 : 400, c: n.indexOf('+ ') === 0 ? C.red : '#333' }); nb.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; });
  col.appendChild(nb); nb.layoutSizingHorizontal = 'FILL';
  return col;
}

// ---------- 앱 셸 ----------
var NAV = ['기업 검색', '핵심 재무 요약', '실적 변동·현금흐름', '주석·위험징후', '위험 사건 예측', '관련 뉴스', '체크·검토 메모', '검증 기록'];
function sidebar(active) {
  var s = A('v', { name: 'GNB', bg: C.surface, w: 208, p: [22, 14], g: 4, stroke: C.line, sides: [0, 1, 0, 0] });
  var brand = A('v', { g: 2, p: [0, 8, 18, 8] }, [
    A('h', { g: 0, align: 'BASELINE' }, [T('LoanSight', { s: 18, w: 700, ls: -2 }), T(' AI', { s: 18, w: 700, c: C.accent, ls: -2 })]),
    T('기업 여신 검토 지원', { s: 11, c: C.sub })
  ]);
  s.appendChild(brand);
  NAV.forEach(function (n, i) {
    var on = i === active;
    var it = A('h', { name: 'nav/' + n, bg: on ? C.tone2 : null, r: 6, p: [9, 10], g: 8, align: 'CENTER' }, [
      R(3, 14, on ? C.accent : null, { r: 2 }), T(n, { s: 13, w: on ? 700 : 500, c: on ? C.ink : C.ink2 })
    ]);
    if (i === 7) { var gap = Sp(10, 10); s.appendChild(gap); }
    s.appendChild(it); it.layoutSizingHorizontal = 'FILL';
  });
  return s;
}
function contextBar(o) {
  o = o || {};
  if (o.none) {
    return A('h', { name: 'context-bar', bg: C.surface, p: [14, 24], justify: 'SPACE_BETWEEN', align: 'CENTER', stroke: C.line, sides: [0, 0, 1, 0] }, [
      A('v', { g: 2 }, [T(o.title || '기업 검색', { s: 17, w: 700 }), T(o.sub || '', { s: 12, c: C.sub })]),
      userChip()
    ]);
  }
  var left = A('v', { g: 6 }, [
    A('h', { g: 10, align: 'CENTER' }, [T('한결건설㈜', { s: 17, w: 700, ls: -1 }), T('247810 · 유가증권', { s: 12, c: C.sub }), badge('건설', 'ink'), badge('세부: 주거용 건물 건설업', 'line')]),
    A('h', { g: 6, align: 'CENTER' }, [srcChip('2025 사업보고서'), srcChip('연결(CFS)'), srcChip('결산 12월'), srcChip('기준일 2025.12.31'), srcChip('접수번호 20260314000412'), srcChip('수집 2026.10.24')])
  ]);
  return A('h', { name: 'context-bar', bg: C.surface, p: [14, 24], justify: 'SPACE_BETWEEN', align: 'CENTER', stroke: C.line, sides: [0, 0, 1, 0] }, [
    left, A('h', { g: 10, align: 'CENTER' }, [btn('기업 변경', 'secondary', { sm: true }), userChip()])
  ]);
}
function userChip() { return A('h', { w: 30, h: 30, r: 15, bg: C.kbGray, align: 'CENTER', justify: 'CENTER', name: 'user' }, [T('김', { s: 12, w: 700, c: C.yellowNeg })]); }
function appFooter() {
  return A('v', { name: 'footer', p: [14, 24, 18, 24], g: 2, align: 'CENTER' }, [
    T('공시 기반 확인 지원 서비스입니다. 여신 승인·거절, 자산건전성 분류, 내부 등급 산정을 대신하지 않습니다.', { s: 11, c: C.sub }),
    T('© 2026 LoanSight AI · 4조참치', { s: 10.5, c: C.mute })
  ]);
}
// 페이지 제목 줄
function pageTitle(title, sub, right) {
  return A('h', { name: 'page-title', justify: 'SPACE_BETWEEN', align: 'MAX', g: 16 }, [
    A('v', { g: 4 }, [T(title, { s: 20, w: 700, ls: -1.5 }), sub ? T(sub, { s: 12.5, c: C.sub }) : null]),
    right || null
  ]);
}
// 앱 화면: content = 배열(각 요소는 fill 처리)
function appScreen(active, ctx, content, an) {
  an = an || {};
  var main = A('v', { name: 'main' });
  var cb = contextBar(ctx);
  if (an.ctx) { var cw = ann(an.ctx, cb, { pad: 0, fill: true, mx: 4, my: 4 }); main.appendChild(cw); cw.layoutSizingHorizontal = 'FILL'; }
  else { main.appendChild(cb); cb.layoutSizingHorizontal = 'FILL'; }
  var body = A('v', { name: 'content', bg: C.ground, p: [22, 24, 8, 24], g: 16 });
  content.forEach(function (c) { if (!c) return; body.appendChild(c); c.layoutSizingHorizontal = 'FILL'; });
  main.appendChild(body); body.layoutSizingHorizontal = 'FILL';
  var ft = appFooter(); ft.fills = [solid(C.ground)];
  if (an.foot) { var fw = ann(an.foot, ft, { pad: 0, fill: true, mx: 4, my: 4 }); main.appendChild(fw); fw.layoutSizingHorizontal = 'FILL'; }
  else { main.appendChild(ft); ft.layoutSizingHorizontal = 'FILL'; }
  var scr = A('h', { name: 'Screen', w: SCREEN_W, bg: C.ground, clip: true, stroke: '#CFCFCF' }, []);
  var sb = sidebar(active);
  if (an.side) { var sw = ann(an.side, sb, { pad: 0, mx: 4, my: 4 }); scr.appendChild(sw); sw.layoutSizingVertical = 'FILL'; sb.layoutSizingVertical = 'FILL'; scr.clipsContent = false; }
  else { scr.appendChild(sb); sb.layoutSizingVertical = 'FILL'; }
  scr.appendChild(main); main.layoutGrow = 1; main.layoutSizingVertical = 'HUG';
  return scr;
}
// 두 열 배치 (고정폭 왼쪽, 남은 폭 오른쪽)
function cols(kids, g, widths, stretch) {
  var r = A('h', { name: 'cols', g: g || 16, align: 'MIN' });
  kids.forEach(function (k, i) {
    if (!k) return;
    r.appendChild(k);
    if (widths && widths[i]) { k.resize(widths[i], k.height); k.layoutSizingVertical = 'HUG'; }
    else k.layoutGrow = 1;
  });
  if (stretch) kids.forEach(function (k) { if (!k) return; k.layoutSizingVertical = 'FILL'; if (k.name.indexOf('ann ') === 0 && k.children[0]) k.children[0].layoutSizingVertical = 'FILL'; });
  return r;
}
function stack(kids, g) { var s = A('v', { g: g || 16 }); kids.forEach(function (k) { if (!k) return; s.appendChild(k); k.layoutSizingHorizontal = 'FILL'; }); return s; }

// 화면 아래 참고 영역(팝업·상태 화면)
function extraBlock(tag, title, node, notes) {
  var head = A('h', { g: 8, align: 'CENTER' }, [A('h', { bg: C.red, p: [2, 8], r: 3 }, [T(tag, { s: 11, w: 700, c: '#FFFFFF' })]), T(title, { s: 13, w: 700, c: '#222' })]);
  var b = A('v', { name: 'extra/' + title, g: 10 }, [head, node]);
  if (notes && notes.length) {
    var nb = A('v', { g: 3, w: Math.max(260, node.width) });
    notes.forEach(function (n) { var t = T(n, { s: 11.5, c: n.indexOf('+ ') === 0 ? C.red : '#333', w: n.indexOf('+ ') === 0 ? 600 : 400 }); nb.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; });
    b.appendChild(nb);
  }
  return b;
}
function modal(title, kids, w, foot) {
  var m = A('v', { name: 'modal/' + title, bg: C.surface, r: 10, stroke: C.line, w: w || 440, clip: true });
  m.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: 8 }, radius: 24, spread: 0, visible: true, blendMode: 'NORMAL' }]; // 떠 있는 요소만 그림자 허용
  var h = A('h', { p: [16, 20], justify: 'SPACE_BETWEEN', align: 'CENTER', stroke: C.line2, sides: [0, 0, 1, 0] }, [T(title, { s: 15, w: 700 }), icon('close', 16, C.sub)]);
  m.appendChild(h); h.layoutSizingHorizontal = 'FILL';
  var b = A('v', { p: [18, 20], g: 14 }); kids.forEach(function (k) { b.appendChild(k); k.layoutSizingHorizontal = 'FILL'; if (k.type === 'TEXT') k.textAutoResize = 'HEIGHT'; });
  m.appendChild(b); b.layoutSizingHorizontal = 'FILL';
  if (foot) { var f = A('h', { p: [12, 20], g: 8, justify: 'MAX', bg: C.tone, stroke: C.line2, sides: [1, 0, 0, 0] }, foot); m.appendChild(f); f.layoutSizingHorizontal = 'FILL'; }
  return m;
}

// 시트(라벨 + 카드) 조립
function sheet(o) {
  var card = A('v', { name: o.id + ' ' + o.name, bg: '#FFFFFF', w: SCREEN_W + DESC_W + 40 });
  var ht = headerTable(o.name, o.path, o.id); card.appendChild(ht); ht.layoutSizingHorizontal = 'FILL';
  var body = A('h', { name: 'body', align: 'MIN' });
  var left = A('v', { name: 'screen-area', p: [24, 20, 28, 20], g: 32 });
  left.appendChild(o.screen);
  if (o.extras && o.extras.length) {
    var ex = A('h', { name: 'extras', g: 36, wrap: true, wrapGap: 32, w: SCREEN_W, p: [8, 0, 0, 0] });
    o.extras.forEach(function (e) { ex.appendChild(e); });
    left.appendChild(ex);
  }
  body.appendChild(left);
  var dc = descColumn(o.desc, o.note); body.appendChild(dc); dc.layoutSizingVertical = 'FILL';
  card.appendChild(body); body.layoutSizingHorizontal = 'FILL';
  var label = A('v', { name: 'label ' + o.id, bg: C.tag, p: [16, 18], g: 6, w: 230 }, [
    T(o.id, { s: 15, w: 700, c: '#555555' }), [T(o.name, { s: 14, w: 500, c: '#333333' }), { fill: true }]
  ]);
  var item = A('h', { name: 'SHEET ' + o.id, g: 40, align: 'MIN' }, [label, card]);
  return item;
}
// ===== 표지 · 공통 UI · N-S01 · N-S02 · N-S03 =====

function buildCover() {
  var W = SCREEN_W + DESC_W + 40;
  var card = A('v', { name: 'COVER 화면 설계서 개요', bg: '#FFFFFF', w: W, p: [56, 56], g: 40 });
  var head = A('h', { justify: 'SPACE_BETWEEN', align: 'MAX', g: 40 }, [
    A('v', { g: 10 }, [
      A('h', { g: 0, align: 'BASELINE' }, [T('LoanSight', { s: 56, w: 700, ls: -3, lh: 110 }), T(' AI', { s: 56, w: 700, c: C.accent, ls: -3, lh: 110 })]),
      T('화면 설계서 v0.0.1 · 기업 여신 검토를 위한 재무정보와 상환·연체 위험징후 분석', { s: 18, w: 500, c: C.ink2 })
    ]),
    A('v', { g: 4, align: 'MAX' }, [T('4조참치 · KB-Bridge AI 활용 기반 금융 데이터 과정', { s: 13, c: C.sub }), T('작성 2026.10.24 · 작성자 김동혁 · 상태: 검토 전 초안', { s: 13, c: C.sub })])
  ]);
  card.appendChild(head); head.layoutSizingHorizontal = 'FILL';

  var basis = table([{ t: '근거 문서', w: 360, bold: true }, { t: '버전', w: 120 }, { t: '이 설계서에 반영한 내용' }], [
    ['LoanSight AI 기획안', 'v2.0 (10/23)', '서비스 흐름, 업종별 징후 지표·시각화 추천, 주석 자동 추출 기준'],
    ['LoanSight AI 요구사항 정의서', 'v0.0.4 (10/23)', '요구 43개(N-R01~43)·미정 질문 20개(N-U01~20), 10/23 팀 결정 우선'],
    ['LoanSight AI 기능 명세서', 'v0.0.4 (10/24)', '기능 41개(N-F01~41)의 화면 ID 연결, 입력·처리·출력·예외'],
    ['LoanSight AI PRD', 'v0.0.4 (10/24)', '화면 8개(N-S01~08), 7단계 서비스 흐름, 초기 제외 범위']
  ]);
  var list = table([{ t: '화면 ID', w: 110, bold: true }, { t: '화면명', w: 230, bold: true }, { t: '화면 경로', w: 300 }, { t: '주요 기능' }, { t: '범위', w: 80 }], [
    ['COMUI-001', '공통 UI 구성 요소', '전 화면 공통', 'N-F02/N-F24 출처·상태 공통 표시', '필수'],
    ['N-S01', '기업 검색·업종 선택', '기업 검색', 'N-F01, N-F04, N-F28, N-F30', '필수'],
    ['N-S02', '핵심 재무 요약', '기업 검색 > 핵심 재무 요약', 'N-F05, N-F31, N-F32, N-F36', '필수'],
    ['N-S03', '실적 변동·현금흐름', '핵심 재무 요약 > 실적 변동·현금흐름', 'N-F06~08, N-F32, N-F33', '필수'],
    ['N-S04-1', '주석 확인과 위험징후 패널', '실적 변동 > 주석·위험징후 > 위험징후 패널', 'N-F36, N-F37, N-F38', '필수'],
    ['N-S04-2', '주석 추출 근거·AI 요약', '주석·위험징후 > 추출 근거', 'N-F09~11, N-F39~41', '필수'],
    ['N-S05', '위험 사건 예측과 근거', '주석·위험징후 > 위험 사건 예측', 'N-F20 (모델 N-F13~19)', '필수'],
    ['N-S06', '관련 뉴스', '위험 사건 예측 > 관련 뉴스', 'N-F12', '보완'],
    ['N-S07', '담당자 체크·검토 메모', '관련 뉴스 > 체크·검토 메모', 'N-F21~23, N-F34, N-F37, N-F29', '필수'],
    ['N-S08', '검증 기록(구성안)', '검증 기록 (별도 화면 여부 미정)', 'N-F19, N-F25, N-F26, N-F35', '필수']
  ]);
  var legendBox = A('v', { g: 12 }, [
    T('표기 규칙', { s: 16, w: 700 }),
    A('h', { g: 24, wrap: true, wrapGap: 10, align: 'CENTER' }, [
      A('h', { g: 8, align: 'CENTER' }, [A('h', { stroke: C.red, sw: 1.5, w: 36, h: 20 }, []), T('설명 대상 영역', { s: 12.5 })]),
      A('h', { g: 8, align: 'CENTER' }, [marker('1'), T('우측 Description 번호와 대응', { s: 12.5 })]),
      A('h', { g: 8, align: 'CENTER' }, [T('+ 빨간 글씨', { s: 12.5, w: 600, c: C.red }), T('조건부 표시·미정 질문(N-U) 연결', { s: 12.5 })]),
      A('h', { g: 8, align: 'CENTER' }, [stageBadge('경고'), stageBadge('주의'), stageBadge('관찰'), T('징후 단계(색+텍스트 병기)', { s: 12.5 })]),
      A('h', { g: 8, align: 'CENTER' }, [badge('예시', 'line'), T('화면 내 기업명·수치는 레이아웃 확인용 예시 값', { s: 12.5 })])
    ])
  ]);
  [A('v', { g: 12 }, [T('근거 문서', { s: 16, w: 700 }), [basis, { fill: true }]]), A('v', { g: 12 }, [T('화면 목록', { s: 16, w: 700 }), [list, { fill: true }]]), legendBox].forEach(function (b) {
    card.appendChild(b); b.layoutSizingHorizontal = 'FILL';
  });
  var label = A('v', { name: 'label COVER', bg: C.tag, p: [16, 18], g: 6, w: 230 }, [T('COVER', { s: 15, w: 700, c: '#555555' }), [T('화면 설계서 개요', { s: 14, w: 500, c: '#333' }), { fill: true }]]);
  return A('h', { name: 'SHEET COVER', g: 40, align: 'MIN' }, [label, card]);
}

// ---------- COMUI-001 공통 UI ----------
function buildCommon() {
  function group(title, kids) { return A('v', { g: 8 }, [T(title, { s: 12, w: 600, c: C.sub }), A('h', { g: 6, wrap: true, wrapGap: 6, align: 'CENTER', w: 470 }, kids)]); }
  var states = panel('상태 표기 체계', '전 화면 공통 · N-F24', [
    ann('4', A('v', { g: 14 }, [
      group('징후 단계 (규칙 기반 현재 징후, N-F37)', [stageBadge('경고'), stageBadge('주의'), stageBadge('관찰'), badge('자료 없음', 'none')]),
      group('주석 검출 상태 (N-F41)', [detBadge('검출'), detBadge('공시상 없음'), detBadge('미검출'), detBadge('추출 실패')]),
      group('자료·산식 상태 (N-F31)', [badge('확정', 'ok'), badge('근사', 'caut'), badge('미확보', 'none'), badge('계산 불가', 'neutral')])
    ]), { fill: true }),
    ann('5', A('v', { g: 14 }, [
      group('기준값 출처 구분 (N-R27)', [srcChip('팀 가설'), srcChip('공식 통계'), srcChip('현직자 확인')]),
      group('모델 검증 상태 (N-F20)', [badge('미학습', 'none'), badge('검증 중', 'caut'), badge('검증 완료', 'ok'), badge('표시 보류', 'neutral')]),
      group('담당자 확인 상태 (N-F22)', [checkbox(false, '미확인', { s: 12 }), checkbox(true, '확인 완료', { s: 12 })])
    ]), { fill: true })
  ], { g: 16 });
  var controls = panel('기본 컨트롤', null, [
    A('h', { g: 8, wrap: true, wrapGap: 8, align: 'CENTER' }, [btn('분석 시작'), btn('기업 변경', 'secondary'), btn('원문 열기', 'ghost', { icon: 'ext' }), btn('PDF 출력', 'secondary', { disabled: true })]),
    A('h', { g: 8, align: 'CENTER' }, [input('회사명 또는 종목코드', { icon: 'search', w: 230 }), input('2025 사업보고서', { select: true, value: true, w: 170 })]),
    A('h', { g: 16, align: 'CENTER' }, [tabs(['유동성', '레버리지', '활동성'], 0), toggle(true, '리스부채 포함')])
  ]);
  var msgs = panel('공통 메시지 상태', null, [
    ann('6', A('v', { g: 8, w: 380 }, [
      [A('h', { g: 10, p: [10, 12], r: 6, bg: C.tone, align: 'CENTER' }, [icon('refresh', 14, C.sub), T('OpenDART에서 2025 사업보고서를 불러오는 중입니다.', { s: 12.5, c: C.ink2 })]), { fill: true }],
      [A('h', { g: 10, p: [10, 12], r: 6, bg: C.noneBg, align: 'CENTER' }, [icon('info', 14, C.none), T('자료 없음: 이 기간의 현금흐름표가 공시되지 않았습니다. 0으로 계산하지 않습니다.', { s: 12.5, c: C.ink2 })]), { fill: true }],
      [A('h', { g: 10, p: [10, 12], r: 6, bg: C.warnBg, align: 'CENTER' }, [icon('info', 14, C.warn), T('조회 실패: 공시서류 원본을 받지 못했습니다. 다시 시도하거나 직접 입력을 사용하세요.', { s: 12.5, c: C.ink2 })]), { fill: true }]
    ]), { fill: true })
  ]);
  var scr = appScreen(1, {}, [
    pageTitle('공통 UI 구성', '모든 분석 화면이 같은 셸·출처 표기·상태 표기를 사용합니다.'),
    cols([states, stack([controls, msgs], 16)], 16, [500, null])
  ], { side: '1', ctx: '2', foot: '3' });
  return sheet({
    id: 'COMUI-001', name: '공통 UI 구성 요소', path: '전 화면 공통', screen: scr,
    desc: [
      ['1', '좌측 메뉴(GNB)', ['- 워드마크 LoanSight AI, 서비스 설명 한 줄', '- 메뉴는 서비스 흐름 순서: 기업 검색 → 핵심 재무 → 실적 변동·현금흐름 → 주석·위험징후 → 위험 사건 예측 → 관련 뉴스 → 체크·검토 메모', '- 검증 기록은 구분 간격 뒤 별도 배치', '- 현재 화면은 진한 바탕과 좌측 강조선으로 표시', '+ 기업 미선택 시 기업 검색 외 메뉴 비활성', '+ 검증 기록 메뉴 노출 여부·권한 미정 (N-U08)', 'F: PRD 7 서비스 흐름']],
      ['2', '기업 컨텍스트 바', ['- 회사명, 종목코드·시장, 적용 업종, 세부분류', '- 출처 칩: 보고서, 연결/별도, 결산월, 기준일, 접수번호(rcpNo), 수집일', '- 연결 없으면 별도로 전환하고 "별도(OFS)" 칩으로 표시', '- 기업 변경 클릭 시 N-S01로 이동', '+ 담당자가 업종을 수동 변경한 경우 업종 배지 옆에 "수동 변경" 표시', 'F: N-F02, N-F03, N-F24, N-R27']],
      ['3', '하단 고지', ['- 서비스 경계 문구 고정: 여신 승인·거절, 자산건전성 분류, 내부 등급 산정을 대신하지 않음', 'F: N-R14']],
      ['4', '단계·검출·자료 상태', ['- 징후 단계: 경고·주의·관찰, 색과 텍스트 병기. 단계 없음은 "정상"으로 표시하지 않음', '- 검출 상태 4개: 검출 / 공시상 없음 / 미검출 / 추출 실패', '-- 공시상 없음은 원문에 "해당사항 없음" 명시 때만', '- 자료 상태: 확정 / 근사(금융원가 등) / 미확보 / 계산 불가', '- 결측은 0이 아닌 "자료 없음"·회색', 'F: N-F24, N-F31, N-F37, N-F41']],
      ['5', '출처·검증·확인 상태', ['- 기준값마다 출처 구분: 팀 가설 / 공식 통계 / 현직자 확인', '- 모델 검증 상태: 미학습 / 검증 중 / 검증 완료 / 표시 보류', '- 담당자 확인: 미확인 / 확인 완료 (시스템 제안과 구분)', '+ 상태 코드 체계 미정 (기능명세 N-F24 예외)']],
      ['6', '공통 메시지', ['- 로딩, 자료 없음, 조회 실패 3종', '- 자료 없음·실패를 0이나 정상으로 대체하지 않는다는 문구 포함', '+ 오류 재시도·캐시 정책 미정 (N-U08)']]
    ],
    note: ['디자인 토큰: KB Yellow Positive #FFBC00(강조) · KB Gray #60584C(진한 바탕·차트) · KB Yellow Negative #FFCC00(진한 바탕 위 글자), 바탕 #F3F4F1, 잉크 #15181D, 경고 #B42318 · 주의 #9A5B06 · 관찰 #355C86', '그라데이션·글로우·장식 아이콘 없음. 그림자는 팝업처럼 떠 있는 요소에만 사용', '숫자는 고정폭 숫자(tabular)로 정렬']
  });
}

// ---------- N-S01 기업 검색·업종 선택 ----------
function buildS01() {
  var search = A('h', { g: 8, align: 'CENTER' }, [
    input('한결', { icon: 'search', w: 360, value: true }), input('시장 전체', { select: true, w: 150 }), btn('검색', 'dark')
  ]);
  var filt = A('h', { g: 6, align: 'CENTER', wrap: true, wrapGap: 6 }, [chip('전체 업종', false), chip('제조', false), chip('건설', true), chip('도소매', false), chip('부동산 임대', false),
    T('장비·물품 렌탈, 운수·창고, 금융·보험, 지주회사, 스팩, 부동산 관리·중개는 대상에서 제외됩니다.', { s: 11.5, c: C.sub })]);
  var res = table([
    { t: '회사명', w: 104, bold: true }, { t: '종목코드', w: 66 }, { t: '시장', w: 66 }, { t: '업종(코드)', w: 100 }, { t: '세부분류' }, { t: '결산', w: 46 }, { t: '판정', w: 70 }
  ], [
    ['한결건설㈜', '247810', '유가증권', '건설 (F41221)', '주거용 건물 건설업', '12월', badge('대상', 'ok')],
    ['한결이앤씨', '318420', '코스닥', '건설 (F42)', '토목 건설업', '12월', badge('대상', 'ok')],
    ['한결산업', '096250', '코스닥', '제조·도소매', '부문 매출 근거 확인', '12월', badge('복합', 'caut')],
    ['한결리츠', '411080', '유가증권', '미분류 (L68)', '코드 매핑 없음', '6월', badge('미분류', 'neutral')],
    ['한결렌탈', '207390', '코넥스', '렌탈 (N76)', '산업용 기계 임대', '12월', badge('제외', 'none')]
  ], { dim: { 4: true }, rowBg: { 0: C.accentTint } });
  var left = panel('검색 결과', '5건 · 상장사(코넥스 포함) 우선', [
    ann('1', search, { fill: false }),
    ann('2', filt, { fill: true }),
    ann('3', res, { fill: true })
  ], { fillKids: true });
  var detail = panel('분석 기준 설정', null, [
    A('v', { g: 2 }, [T('한결건설㈜', { s: 16, w: 700 }), T('247810 · 유가증권 · 결산 12월', { s: 12, c: C.sub })]),
    field('보고 기간', input('2025 사업보고서 (2026.03.14)', { select: true, value: true, w: 300 })),
    field('회계 범위', A('h', { g: 16 }, [radio(true, '연결 우선 (CFS)'), radio(false, '별도 (OFS)')]), { help: '연결재무제표가 없으면 별도로 전환하고 화면에 표시합니다.' }),
    ann('4', A('v', { g: 8, bg: C.tone, p: [12, 12], r: 6 }, [
      [A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER' }, [T('업종 판정 결과', { s: 12, w: 600, c: C.ink2 }), badge('대상', 'ok')]), { fill: true }],
      [table([{ t: '항목', w: 100 }, { t: '값' }], [
        ['DART 업종코드', 'F41221'], ['서비스 업종', '건설'], ['세부분류', '주거용 건물 건설업'], ['판정 근거', '최장 접두 코드 F412 일치'], ['적용 기준', '건설 업종 기준 v0.1']
      ]), { fill: true }],
      btn('업종 수동 변경', 'secondary', { sm: true })
    ]), { fill: true }),
    A('h', { g: 8, justify: 'SPACE_BETWEEN', align: 'CENTER' }, [ann('5', T('공시 조회가 안 되나요? 직접 입력', { s: 12.5, w: 600, c: C.kbGray, under: true }), { pad: 3 }), btn('분석 시작')])
  ], { fillKids: true, g: 14 });
  var scr = appScreen(0, { none: true, title: '기업 검색', sub: '분석할 기업과 기준을 고르면 핵심 재무 요약부터 시작합니다.' }, [
    cols([left, ann('6', detail, { fill: true })], 16, [630, null])
  ]);
  var changeModal = modal('업종 수동 변경', [
    T('현재 판정: 건설 · 주거용 건물 건설업 (F41221)', { s: 12.5, c: C.sub }),
    field('변경할 업종', input('부동산 임대', { select: true, value: true, w: 380 }), { req: true }),
    field('변경 사유', A('v', { bg: C.surface, stroke: C.line, r: 6, p: [10, 12], h: 72, w: 380 }, [T('2025년 부문 매출 중 임대 수익 비중이 58%로 확인됨', { s: 12.5 })]), { req: true }),
    field('근거', input('사업보고서 II.1 사업의 개요 · 부문별 매출', { select: true, value: true, w: 380 }), { req: true }),
    A('h', { g: 8, p: [10, 12], r: 6, bg: C.cautBg }, [[T('변경 후 바뀐 업종 기준으로 전 화면을 다시 분석하고, 변경 전후 기준과 사유를 이력으로 남깁니다.', { s: 12, c: C.ink2 }), { fill: true }]])
  ], 440, [btn('취소', 'secondary'), btn('변경 후 재분석')]);
  var manual = modal('직접 입력', [
    T('공시 조회가 되지 않는 기업의 재무 수치를 입력합니다. 자동 수집 값과 구분해 표시합니다.', { s: 12.5, c: C.sub }),
    table([{ t: '계정', w: 130 }, { t: '금액' }, { t: '단위', w: 64 }], [['매출액', '12,480', '백만원'], ['영업이익', '640', '백만원'], ['영업활동현금흐름', '—', '백만원']]),
    A('h', { g: 10 }, [[field('출처', input('2025 감사보고서 (회사 제출)', { value: true, w: 200 }), { req: true }), { grow: true }], [field('기준일', input('2025.12.31', { icon: 'cal', value: true, w: 160 }), { req: true }), { grow: true }]])
  ], 440, [btn('취소', 'secondary'), btn('저장')]);
  return sheet({
    id: 'N-S01', name: '기업 검색·업종 선택', path: '로그인 > 기업 검색', screen: scr,
    extras: [
      extraBlock('팝업', '업종 수동 변경 (4 클릭 시)', changeModal, ['- 변경 업종·사유·근거 모두 필수', '- 변경 이력: 변경 전/후 업종, 사유, 근거, 변경자, 일시', '+ 변경 권한·기록 방식 미정 (N-U15)']),
      extraBlock('팝업', '직접 입력 (5 클릭 시)', manual, ['- 출처·기준일 누락 시 저장 불가', '- 자동 수집 값과 충돌하면 두 값을 나란히 표시', '+ 입력 필드·저장 방식 미정 (N-U08)'])
    ],
    desc: [
      ['1', '기업 검색', ['- 회사명 또는 종목코드로 검색, 시장 필터(유가증권·코스닥·코넥스)', '- 상장사(코넥스 포함) 우선, 비상장은 공시 조회 가능성 먼저 대조', '- 동명 기업은 종목코드·시장으로 구분 표시', 'F: N-F01, N-R01, N-R02']],
      ['2', '업종 필터', ['- 대상 4개 업종: 제조·건설·도소매·부동산 임대', '- 제외 업종 안내 문구 상시 노출 (렌탈·운수창고·금융보험·지주·스팩·부동산 관리중개)', 'F: N-F01, N-R01']],
      ['3', '검색 결과 표', ['- 회사명, 종목코드, 시장, 업종(코드), 세부분류, 결산월, 판정', '- 판정 4종: 대상 / 복합 / 미분류 / 제외', '-- 제외 기업은 흐리게 표시하고 선택 불가', '-- 미분류는 미분류 그대로 표시 (임의 업종 배정 X)', '-- 복합은 부문 매출 근거 확인 필요', '- 행 클릭 시 우측 분석 기준 설정에 반영', 'F: N-F30, N-R32']],
      ['4', '업종 판정 결과', ['- DART 업종코드를 매핑표의 가장 긴 접두 코드로 판정', '- 서비스 업종, 세부분류, 판정 근거, 적용 기준(버전) 표시', '- 업종 수동 변경 버튼 → 팝업', '+ 세부분류 적용 수준 미정 (N-U02)', '+ 복합 판정 비중(부문 매출 %) 미정 (N-U15)']],
      ['5', '직접 입력 링크', ['- 공시 조회가 안 되는 기업만 사용', '- 입력 값은 출처·기준일과 함께 자동 수집 값과 분리 관리', 'F: N-F04, N-R06']],
      ['6', '분석 기준 설정', ['- 보고 기간(보고서·접수일), 회계 범위(연결 우선/별도)', '- 분석 시작 클릭 시 N-S02 핵심 재무 요약으로 이동', '- 미수집 기간 선택 시 안내 후 다른 기간 제안', '+ 분석 연도·분기 범위 미정 (N-U02)']]
    ],
    note: ['기업명·종목코드·수치는 레이아웃 확인용 예시 값', '향후 확장: 비상장·스타트업 자동 수집, 추가 업종 (N-F28, N-U10)']
  });
}

// ---------- N-S02 핵심 재무 요약 ----------
function buildS02() {
  var opHero = A('v', { name: 'op-hero', bg: C.surface, stroke: C.line, r: 8, p: [18, 20], g: 10 }, [
    A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER' }, [T('영업이익', { s: 13, w: 600, c: C.sub }), srcChip('연결 · 억원')]),
    A('h', { g: 8, align: 'BASELINE' }, [T('1,284', { s: 44, w: 700, ls: -3, lh: 110, tnum: true }), T('억원', { s: 15, w: 500, c: C.sub })]),
    A('h', { g: 8, align: 'CENTER' }, [T('전기 대비 −312억원 (−19.5%)', { s: 13, w: 600, c: C.warn }), T('· 영업이익률 4.1% (전기 5.2%)', { s: 13, c: C.sub })]),
    A('h', { g: 14, align: 'MAX' }, [sparkline(210, 44, [1710, 1596, 1284], C.chart), T('2023 → 2025', { s: 11, c: C.mute })])
  ]);
  var side = A('v', { g: 12 }, [
    [kpi('매출액', '31,420', '전기 대비 +2.7%', { unit: '억원' }), { fill: true }],
    [kpi('영업활동현금흐름', '−310', '적자 전환 · 비율 대신 금액 표시', { unit: '억원', subC: C.warn }), { fill: true }],
    [kpi('감가상각비', '180', '건설 업종: 보조 표시', { unit: '억원' }), { fill: true }]
  ]);
  var top = cols([ann('1', opHero, { fill: true }), side], 12, [420, null], true);
  function ratio(name, val, prev, st) {
    return A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14], g: 4 }, [
      A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER' }, [T(name, { s: 12, c: C.sub }), st ? badge(st, st === '근사' ? 'caut' : 'ok') : null]),
      T(val, { s: 20, w: 700, ls: -2, tnum: true }), T('전기 ' + prev, { s: 11.5, c: C.mute, tnum: true })
    ]);
  }
  var strip = A('h', { g: 10 }, [ratio('유동비율', '118.4%', '124.0%'), ratio('부채비율', '212.7%', '188.3%'), ratio('매출액영업이익률', '4.1%', '5.2%'), ratio('총자산영업이익률', '2.3%', '3.0%'), ratio('이자보상비율', '1.6배', '2.3배', '근사')]);
  strip.children.forEach(function (c) { c.layoutGrow = 1; c.layoutSizingVertical = 'FILL'; });
  var groups = panel('비율 묶음', A('h', { g: 8, align: 'CENTER' }, [T('산식 사전 v0.3', { s: 12, c: C.sub }), btn('산식 보기', 'ghost', { sm: true, icon: 'info' })]), [
    tabs(['유동성', '레버리지', '활동성', '수익성', '성장성'], 1),
    table([{ t: '지표', w: 168, bold: true }, { t: '당기', w: 74, align: 'right', num: true }, { t: '전기', w: 74, align: 'right', num: true, mute: true }, { t: '변화', w: 78, align: 'right', num: true }, { t: '자료 상태' }], [
      ['부채비율', '212.7%', '188.3%', '+24.4%p', badge('확정', 'ok')],
      ['선수금 제외 부채비율 [업종 기준]', '164.2%', '151.0%', '+13.2%p', badge('확정', 'ok')],
      ['차입금의존도', '34.0%', '29.6%', '+4.4%p', badge('확정', 'ok')],
      ['단기차입 비중', '49.1%', '41.8%', '+7.3%p', badge('확정', 'ok')],
      ['자기자본비율', '32.0%', '34.7%', '−2.7%p', badge('확정', 'ok')]
    ])
  ], { fillKids: true });
  var ind = panel('건설 업종 강조 지표', A('h', { g: 6 }, [srcChip('업종 기준 v0.1'), srcChip('팀 가설')]), [
    table([{ t: '지표', w: 190, bold: true }, { t: '당기', align: 'right', num: true, w: 80 }, { t: '업종 중앙값', align: 'right', num: true, mute: true }], [
      ['계약자산 증가율 − 매출 증가율', '+18.2%p', '+3.1%p'],
      ['선수금 제외 부채비율', '164.2%', '142.0%'],
      ['차입금의존도', '34.0%', '27.5%']
    ]),
    A('h', { g: 8, p: [10, 12], r: 6, bg: C.tone }, [[T('표시 부채비율은 분양 선수금이 포함돼 높게 보일 수 있어 선수금 제외 부채비율을 함께 봅니다.', { s: 12, c: C.ink2 }), { fill: true }]])
  ], { fillKids: true });
  var debt = A('v', { g: 6 }, [
    [A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER', w: 420 }, [T('총차입금 18,950억원', { s: 13, w: 700 }), toggle(false, '리스부채 포함')]), { fill: true }],
    (function () { var f = A('h', { r: 4, clip: true, h: 14, w: 420 }); [[6200, C.chart], [3100, '#8C8273'], [6450, C.chart2], [3200, C.chart3]].forEach(function (s) { f.appendChild(R(s[0] / 18950 * 420, 14, s[1])); }); return f; })(),
    legend([{ n: '단기 6,200', c: C.chart }, { n: '유동성장기 3,100', c: '#8C8273' }, { n: '장기 6,450', c: C.chart2 }, { n: '사채 3,200', c: C.chart3 }])
  ]);
  var repay = panel('상환능력', srcChip('임대보증금 해당 없음'), [
    debt,
    table([{ t: '지표', w: 170, bold: true }, { t: '당기', align: 'right', num: true, w: 110 }, { t: '상태' }], [
      ['이자보상비율', '1.6배', badge('근사: 금융원가', 'caut')],
      ['EBITDA 이자보상배율', '1.8배', badge('근사: 금융원가', 'caut')],
      ['현금보상비율', '—', badge('계산 불가: 영업CF 음수', 'neutral')],
      ['금융비용부담률', '2.6%', badge('확정', 'ok')]
    ])
  ], { fillKids: true });
  var scr = appScreen(1, {}, [
    pageTitle('핵심 재무 요약', '영업이익을 먼저 보고, 공통 핵심 비율과 건설 업종 강조 지표로 이어집니다.', A('h', { g: 8 }, [btn('실적 변동 보기', 'secondary', { icon: 'right' })])),
    top,
    ann('2', strip, { fill: true }),
    cols([ann('3', groups, { fill: true }), stack([ann('4', ind, { fill: true }), ann('5', repay, { fill: true })], 16)], 16, [540, null])
  ]);
  var formula = A('v', { name: 'popover/산식', bg: C.surface, stroke: C.line, r: 8, p: [14, 16], g: 10, w: 400 }, [
    A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER' }, [T('이자보상비율', { s: 14, w: 700 }), badge('근사', 'caut')]),
    table([{ t: '항목', w: 90 }, { t: '정의' }], [['분자', '영업이익 (IS)'], ['분모', '이자비용 → 미확보로 금융원가 사용'], ['잔액 기준', '해당 없음 (손익 항목)'], ['단위', '배, 소수 첫째 자리'], ['버전', '산식 사전 v0.3 · 2026.10.24']]),
    T('이자비용을 본문·주석에서 확보하지 못해 금융원가로 근사했습니다. 확정값과 구분해 표시합니다.', { s: 12, c: C.ink2, width: 368 })
  ]);
  formula.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: 6 }, radius: 18, spread: 0, visible: true, blendMode: 'NORMAL' }];
  var stateRule = table([{ t: '자료 상태', w: 110 }, { t: '화면 처리' }], [
    [badge('확정', 'ok'), '공시 계정으로 계산, 산식 버전 일치'],
    [badge('근사', 'caut'), '대체 계정 사용, 값 옆에 근사 사유 표시'],
    [badge('미확보', 'none'), '값 대신 "자료 없음", 회색, 0으로 계산 X'],
    [badge('계산 불가', 'neutral'), '0·음수 분모, 적자 전환 → 금액·상태로 표시']
  ], { w: 420 });
  return sheet({
    id: 'N-S02', name: '핵심 재무 요약', path: '기업 검색 > 핵심 재무 요약', screen: scr,
    extras: [extraBlock('팝오버', '산식 보기 (3 우측 클릭 시)', formula, ['- 화면·메모·모델이 같은 산식 정의·버전을 공유', '+ 기말/연평균·첫해 처리 미정 (N-U11)', '+ 금융원가 근사 허용 여부 미정 (N-U13)']),
      extraBlock('규칙', '자료 상태 표시 규칙', stateRule, ['- 계정 확보율이 낮은 지표는 "참고"로 낮추거나 제외 (N-F35)'])],
    desc: [
      ['1', '영업이익 우선 영역', ['- 영업이익을 화면 최상단·최대 크기로 배치 (현직자 인터뷰: 영업이익 우선 확인)', '- 전기 대비 증감액·증감률, 영업이익률, 3개년 스파크라인', '- 우측: 매출액, 영업활동현금흐름, 감가상각비', '-- 영업CF가 음수면 비율 대신 금액과 "적자 전환" 상태 표시', '-- 감가상각은 업종·자산 구성에 따라 강조 수준 조정 (임대: 강조, 건설: 보조)', 'F: N-F05, N-R07']],
      ['2', '공통 핵심 5개 비율', ['- 유동비율, 부채비율, 매출액영업이익률, 총자산영업이익률, 이자보상비율', '- 당기 값 + 전기 값, 근사 계산은 "근사" 배지', 'F: N-F05, N-F31']],
      ['3', '비율 묶음 탭', ['- 유동성·레버리지·활동성·수익성·성장성 5개 묶음', '- 열: 지표, 당기, 전기, 변화, 자료 상태', '- 산식 보기 → 팝오버(분자·분모·잔액 기준·버전·근사 여부)', 'F: N-F31, N-R33']],
      ['4', '업종 강조 지표', ['- 적용 업종의 강조 지표와 업종 중앙값', '-- 제조: 원가율·재고일수·현금전환주기·EBITDA', '-- 도소매: 매출총이익률·현금전환주기·매입채무일수', '-- 건설: 계약자산·선수금 제외 부채비율·차입금의존도', '-- 부동산 임대: EBITDA·EBITDA 이자보상·차입금÷투자부동산', '- 기준값 출처 칩(팀 가설·업종 기준 버전) 표시', '+ 업종 기준 수치 확정 방법 미정 (N-U12)', 'F: N-F05, N-F36']],
      ['5', '상환능력', ['- 총차입금 구성 막대: 단기·유동성장기·장기·사채', '- 차입금의존도, 단기차입 비중, 이자보상, EBITDA 이자보상, 현금보상, 금융비용부담률', '- 리스부채 포함 토글, 임대보증금은 부채로 별도 표시(부동산 임대)', '+ 임대보증금 차입 포함 여부 미정 (N-U14)', 'F: N-F32, N-R34']]
    ],
    note: ['수치는 레이아웃 확인용 예시 값 (가상 기업 한결건설㈜)', '상단 영역 3개년 = 자사 비교 기간, 위험징후 패널 5개년 추세와 구분 (N-F08)']
  });
}

// ---------- N-S03 실적 변동·현금흐름 ----------
function waterfall(w, h) {
  var f = Free(w, h, { name: 'waterfall' });
  var steps = [['전기 영업이익', 1596, 'total'], ['매출 증감', 820, 'd'], ['매출원가 증감', -1010, 'd'], ['판관비 증감', -95, 'd'], ['기타·조정', -27, 'res'], ['당기 영업이익', 1284, 'total']];
  var padL = 44, padB = 40, padT = 22, cw = w - padL - 8, ch = h - padB - padT, mx = 2600, mn = 0;
  function y(v) { return padT + ch - (v - mn) / (mx - mn) * ch; }
  [0, 1000, 2000].forEach(function (t) { put(f, R(cw, 1, C.line2), padL, y(t)); put(f, T(fmtN(t), { s: 10, c: C.mute }), 0, y(t) - 7); });
  var gw = cw / steps.length, bw = 54, run = 0;
  steps.forEach(function (s, i) {
    var x = padL + i * gw + (gw - bw) / 2, top, bot, col;
    if (s[2] === 'total') { top = y(s[1]); bot = y(0); col = C.chart; run = s[1]; }
    else { var a = run, b = run + s[1]; top = y(Math.max(a, b)); bot = y(Math.min(a, b)); col = s[2] === 'res' ? null : (s[1] >= 0 ? C.chart2 : C.warn); run = b; }
    var bar = R(bw, Math.max(2, bot - top), col, { stroke: s[2] === 'res' ? C.sub : null, dash: s[2] === 'res' ? [4, 3] : null, name: s[0] });
    put(f, bar, x, top);
    var vl = T((s[2] === 'total' ? '' : (s[1] > 0 ? '+' : '')) + fmtN(s[1]), { s: 11, w: 700, c: s[2] === 'total' ? C.ink : (s[1] >= 0 ? C.ink2 : C.warn), tnum: true });
    put(f, vl, x + bw / 2 - vl.width / 2, top - 17);
    var lb = T(s[0], { s: 10.5, c: C.sub, width: gw - 6, align: 'CENTER' }); put(f, lb, padL + i * gw + 3, h - padB + 6);
  });
  return f;
}
function buildS03() {
  var wf = panel('영업이익 변동 분해', A('h', { g: 6 }, [srcChip('2024 → 2025 · 억원'), badge('잔차 −27', 'neutral')]), [
    waterfall(588, 250),
    A('h', { g: 8, p: [10, 12], r: 6, bg: C.tone }, [[T('분해식: 매출 증감 − 매출원가 증감 − 판관비 증감. 실제 영업이익 증감과의 차이는 기타·조정으로 남깁니다. 회계상 분해이며 사업상 원인을 뜻하지 않습니다.', { s: 12, c: C.ink2 }), { fill: true }]])
  ], { fillKids: true });
  var cmp = panel('업종 비교', tabs(['영업이익률', '부채비율', '영업CF'], 0), [
    T('동일 기간·연결 기준 상장사 건설업 14곳', { s: 12, c: C.sub }),
    stripPlot(316, [2.1, 2.8, 3.0, 3.3, 3.6, 3.9, 4.4, 4.8, 5.2, 5.6, 6.1, 6.9, 7.8], 4.1, 4.5, { min: 1, max: 9, fmt: function (v) { return v.toFixed(1) + '%'; } }),
    A('v', { g: 4, p: [10, 12], r: 6, bg: C.tone }, [
      A('h', { justify: 'SPACE_BETWEEN' }, [T('한국은행 기업경영분석 건설업 평균', { s: 12, w: 600 }), T('3.9%', { s: 12, w: 700, tnum: true })]),
      T('2024년 · 외감·영리법인 모집단 — 상장사 중앙값과 모집단·연도가 다른 참고값', { s: 11, c: C.sub, width: 300 })
    ])
  ], { fillKids: true });
  var ocf = panel('영업이익과 영업활동현금흐름', legend([{ n: '영업이익', c: C.chart }, { n: '영업CF', c: C.chart2 }]), [
    barChart(450, 170, ['2023', '2024', '2025'], [{ n: '영업이익', v: [1710, 1596, 1284], c: C.chart }, { n: '영업CF', v: [1120, 640, -310], c: C.chart2 }], { min: -600, max: 2000, ticks: [-500, 0, 1000, 2000] }),
    table([{ t: '차이 설명 항목 (2025)', bold: true }, { t: '금액', w: 90, align: 'right', num: true }], [
      ['감가상각비 가산', '+180'], ['매출채권 증가', '−410'], ['계약자산(미청구공사) 증가', '−620'], ['재고자산 증가', '−230'], ['매입채무 증가', '+160'], ['이자·법인세 지급 등', '−674']
    ])
  ], { fillKids: true });
  var cyc = panel('영업순환·운전자본', srcChip('기말 잔액 기준 · 팀 가설'), [
    table([{ t: '지표', bold: true, w: 150 }, { t: '당기', align: 'right', num: true, w: 70 }, { t: '전기', align: 'right', num: true, mute: true, w: 70 }, { t: '변화', align: 'right', num: true }], [
      ['재고자산회전일수', '38일', '33일', '+5일'], ['매출채권회수일수', '142일', '118일', '+24일'], ['매입채무지급일수', '61일', '66일', '−5일'], ['현금전환주기', '119일', '85일', '+34일']
    ]),
    A('h', { g: 10 }, [[kpi('계약자산 증감', '+620', '전기 대비 +20.9%', { unit: '억원' }), { grow: true }], [kpi('계약부채(선수금)', '−140', '전기 대비 −6.2%', { unit: '억원' }), { grow: true }]])
  ], { fillKids: true });
  var chk = panel('현금흐름 확인 항목', null, [
    table([{ t: '항목', bold: true, w: 190 }, { t: '값', w: 90, align: 'right', num: true }, { t: '판정' }], [
      ['영업CF ÷ 유동부채', '−1.0%', badge('확인 필요', 'caut')],
      ['단기차입으로 장기부채 상환', '해당', badge('확인 필요', 'caut')],
      ['과다 배당 (배당 > 영업CF)', '해당', badge('확인 필요', 'caut')],
      ['흑자 중 영업CF 음수', '1년', badge('관찰', 'obs')]
    ])
  ], { fillKids: true });
  var scr = appScreen(2, {}, [
    pageTitle('실적 변동·현금흐름', '영업이익이 왜 줄었는지 회계상 분해로 보고, 이익과 현금의 차이를 운전자본으로 확인합니다.'),
    cols([ann('1', wf, { fill: true }), ann('5', cmp, { fill: true })], 16, [640, null]),
    cols([ann('2', ocf, { fill: true }), stack([ann('3', cyc, { fill: true }), ann('4', chk, { fill: true })], 16)], 16, [500, null])
  ]);
  var exc = table([{ t: '상황', w: 170 }, { t: '화면 처리' }], [
    ['전기 0 · 음수 분모', '증가율 대신 금액 차이 표시, "계산 불가" 배지'],
    ['흑자 → 적자 전환', '"적자 전환" 상태 텍스트 + 금액'],
    ['매출원가 미공시 (성격별 손익)', '분해 불가 사유 표시, 워터폴 숨김'],
    ['임대료가 기타수익에 계상', '"분해 불완전" 배지와 계상 위치 안내'],
    ['비교 표본 부족', '세부분류 → 상위 분류 → "비교 보류"']
  ], { w: 520 });
  return sheet({
    id: 'N-S03', name: '실적 변동·현금흐름', path: '핵심 재무 요약 > 실적 변동·현금흐름', screen: scr,
    extras: [extraBlock('예외', '특수 분모·분해 불가 처리', exc, ['- 자금 사용 용도를 추정만으로 확정하지 않음 (N-F07)', '+ 잔차 수용 기준·성격별 손익 범위 미정'])],
    desc: [
      ['1', '영업이익 변동 분해(워터폴)', ['- 전기 OP → 매출 증감 → 매출원가 증감 → 판관비 증감 → 기타·조정 → 당기 OP', '- 감소 요인은 경고색, 기타·조정(잔차)은 점선 막대', '- 검수 예: 매출 +100, 원가 +60, 판관비 +10, 실제 OP +35 → 분해 +30·잔차 +5', '- 제조는 원가율, 도소매는 매출총이익률 강조', '+ 회계 분해를 사업상 원인으로 단정하는 문구 금지', 'F: N-F06, N-R08']],
      ['2', '영업이익 vs 영업CF', ['- 3개년 묶음 막대, 0 기준선 표시', '- 차이 설명: 감가상각, 매출채권, 계약자산, 재고, 매입채무, 이자·법인세', 'F: N-F07, N-R09']],
      ['3', '영업순환·운전자본', ['- 재고·채권·채무 회전일수, 현금전환주기, 전기 대비 변화', '- 건설: 계약자산(미청구공사)·계약부채(선수금) 증감 카드', '- 매출원가 없으면 계산 불가 사유 표시', '+ 기말/연평균·첫해 처리 미정 (N-U11)', '+ +30일 등 변화 문턱은 확정값 아님 (N-U12)', 'F: N-F33, N-R35']],
      ['4', '현금흐름 확인 항목', ['- 영업CF÷유동부채, 현금보상비율, 단기차입의 장기부채 상환, 과다 배당', '- 판정 결과는 N-S07 확인 항목으로 연결', 'F: N-F07, N-F34']],
      ['5', '업종 비교', ['- 동일 기간·회계 기준 상장사 동종 분포(점)와 중앙값, 자사 위치 강조', '- 한국은행 기업경영분석 평균은 출처·연도·모집단 차이를 적어 별도 표시', '- 표본 부족 시 상위 분류, 그래도 부족하면 "비교 보류"', '+ 최소 비교 표본 수 미정 (N-U06), 한국은행 통계 범위 미정 (N-U16)', 'F: N-F08, N-R10']]
    ],
    note: ['수치는 레이아웃 확인용 예시 값', '자사 비교는 3개년(이 화면), 위험징후 패널 추세는 5개년(N-S04)']
  });
}
// ===== N-S04-1 · N-S04-2 · N-S05 · N-S06 · N-S07 · N-S08 =====

function subTabs(active) { return tabs(['위험징후 패널', '주석 추출 근거', 'AI 요약'], active); }

// PF 보증 만기 사다리 (정비/기타 누적 막대)
function pfLadder(w, h) {
  var f = Free(w, h, { name: 'pf-ladder' });
  var b = [['3개월', 300, 900], ['6개월', 400, 1050], ['12개월', 650, 1700], ['1~2년', 1300, 1800], ['2~3년', 900, 880], ['3년 초과', 700, 300]];
  var padL = 44, padB = 24, padT = 16, cw = w - padL - 4, ch = h - padB - padT, mx = 3500;
  function y(v) { return padT + ch - v / mx * ch; }
  [0, 1000, 2000, 3000].forEach(function (t) { put(f, R(cw, 1, C.line2), padL, y(t)); put(f, T(fmtN(t), { s: 10, c: C.mute }), 0, y(t) - 7); });
  var gw = cw / b.length, bw = 40;
  // 1년 내 구간 배경
  put(f, R(gw * 3, ch, C.warnBg, { op: 0.6, name: '1년 내 구간' }), padL, padT);
  put(f, T('1년 내 만기 5,000억 (46%)', { s: 10.5, w: 700, c: C.warn }), padL + 6, padT - 14);
  b.forEach(function (d, i) {
    var x = padL + i * gw + (gw - bw) / 2;
    put(f, R(bw, y(0) - y(d[1]), C.chart, { name: '정비 ' + d[0] }), x, y(d[1]));
    put(f, R(bw, y(0) - y(d[2]) , C.chart2, { name: '기타 ' + d[0] }), x, y(d[1] + d[2]));
    var tl = T(fmtN(d[1] + d[2]), { s: 10.5, w: 600, c: C.ink2, tnum: true }); put(f, tl, x + bw / 2 - tl.width / 2, y(d[1] + d[2]) - 16);
    var lb = T(d[0], { s: 10.5, c: C.sub }); put(f, lb, padL + i * gw + gw / 2 - lb.width / 2, h - padB + 6);
  });
  return f;
}

function buildS04a() {
  function stageCard(stage, n, desc) {
    var k = { '경고': [C.warnBg, C.warn], '주의': [C.cautBg, C.caut], '관찰': [C.obsBg, C.obs] }[stage];
    return A('v', { bg: k[0], r: 8, p: [12, 14], g: 2 }, [
      A('h', { g: 6, align: 'BASELINE' }, [T(stage, { s: 13, w: 700, c: k[1] }), T(n + '건', { s: 22, w: 700, c: k[1], tnum: true })]),
      T(desc, { s: 11.5, c: C.ink2 })
    ]);
  }
  var summary = A('h', { g: 10 }, [stageCard('경고', 1, '원문 확인 필수'), stageCard('주의', 3, '확인 목록에 추가'), stageCard('관찰', 2, '추세·업종 내 위치')]);
  summary.children.forEach(function (c) { c.layoutGrow = 1; });
  var sumWrap = A('v', { g: 8 }, [[summary, { fill: true }], A('h', { g: 6, align: 'CENTER' }, [srcChip('징후 규칙 v0.1'), srcChip('팀 가설 · 현직자 확인 전'), T('징후 단계는 확인 순서용이며 은행 건전성 분류·내부 등급이 아닙니다.', { s: 11.5, c: C.sub })])]);

  function sigRow(stage, text, src, act) {
    return A('h', { g: 10, p: [10, 12], align: 'CENTER', stroke: C.line2, sides: [0, 0, 1, 0] }, [stageBadge(stage), [T(text, { s: 12.5 }), { grow: true }], T(src, { s: 11, c: C.sub }), act ? btn(act, 'ghost', { sm: true, icon: 'ext' }) : null]);
  }
  var sigs = A('v', { name: 'signal-list', bg: C.surface, stroke: C.line, r: 8, clip: true }, [
    [sigRow('경고', '재무약정(부채비율 200% 이하) 미준수로 기한이익상실 사유 발생 문장 검출', '주석 21 차입금', '원문 확인'), { fill: true }],
    [sigRow('주의', '1년 내 만기 차입금 9,300억 > 현금성자산 4,120억 + 영업CF −310억', 'IV.4 유동성', '원문'), { fill: true }],
    [sigRow('주의', '제공 보증·조건부 의무 ÷ 자기자본 38% → 61% 급증', 'XI.2 우발부채', '원문'), { fill: true }],
    [sigRow('주의', '신용등급 전망 A−(안정적) → A−(부정적)', 'I.1 신용등급', '원문'), { fill: true }],
    [sigRow('관찰', '공사원가율 93.1% · 업종 중앙값 90.4% 대비 열위', '손익계산서', null), { fill: true }],
    [sigRow('관찰', '공사미수금 회수기간 118일 → 142일 악화', '재무상태표', null), { fill: true }]
  ]);

  function tile(name, val, dlt, med, sp, bad) {
    return A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14], g: 4 }, [
      [T(name, { s: 11.5, c: C.sub, width: 150 }), { fill: true }],
      T(val, { s: 20, w: 700, ls: -2, tnum: true, c: bad ? C.warn : C.ink }),
      T(dlt, { s: 11, c: C.ink2, tnum: true }), T('업종 중앙값 ' + med, { s: 11, c: C.mute, tnum: true }),
      sparkline(150, 26, sp, bad ? C.warn : C.chart)
    ]);
  }
  var tiles = A('h', { g: 10 }, [
    tile('계약자산 증가율 − 매출 증가율', '+18.2%p', '전기 +6.4%p', '+3.1%p', [2.0, 3.5, 4.8, 6.4, 18.2], true),
    tile('공사미수금 회수기간', '142일', '전기 118일', '104일', [96, 101, 110, 118, 142], true),
    tile('공사원가율', '93.1%', '전기 91.8%', '90.4%', [89.9, 90.6, 91.2, 91.8, 93.1]),
    tile('PF 보증·조건부 의무 ÷ 자기자본', '61%', '전기 38%', '29%', [22, 25, 31, 38, 61], true),
    tile('영업CF ÷ 유동부채', '−1.0%', '전기 2.1%', '4.6%', [6.2, 5.1, 3.4, 2.1, -1.0])
  ]);
  tiles.children.forEach(function (c) { c.layoutGrow = 1; });

  var axis = tabs(['전체', '상환재원', '유동성·만기', '재무구조', '우발·부외', '외부 평가', '담보·회수'], 0);
  var ladder = panel('PF 보증 만기 사다리', legend([{ n: '정비사업', c: C.chart }, { n: '기타사업', c: C.chart2 }]), [
    pfLadder(470, 210),
    T('보증금액 기준 · 억원 · XI.2 채무보증 현황 · 접수번호 20260314000412', { s: 11, c: C.sub })
  ], { fillKids: true });
  var bul = panel('우발채무 ÷ 자기자본', srcChip('팀 가설선 50%'), [
    bullet(400, 61, 50, 100, { targetLabel: '팀 가설선 50%', c: C.chart }),
    A('h', { justify: 'SPACE_BETWEEN' }, [T('당기 61%', { s: 13, w: 700, c: C.warn }), T('전기 38% · 업종 중앙값 29%', { s: 12, c: C.sub })]),
    A('v', { g: 6, p: [10, 12], r: 6, bg: C.tone }, [
      T('그대로 쓰면 왜곡되는 지표', { s: 12, w: 700 }),
      T('표시 부채비율(분양 선수금 포함), 진행률 기준 이익 → 선수금 제외 부채비율·영업CF와 함께 봅니다.', { s: 12, c: C.ink2, width: 380 })
    ]),
    A('h', { g: 8, align: 'CENTER' }, [T('업종 내 위치', { s: 12, w: 600 }), badge('비교 보류: 표본 6곳 < 최소 수', 'neutral')])
  ], { fillKids: true });

  var scr = appScreen(3, {}, [
    pageTitle('주석 확인과 위험징후', '공시로 확인되는 상환능력 저하 징후를 업종 기준으로 모아, 무엇부터 확인할지 보여줍니다.', subTabs(0)),
    ann('1', sumWrap, { fill: true }),
    ann('2', sigs, { fill: true }),
    A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER' }, [T('건설 업종 핵심 지표 · 5개년', { s: 14, w: 700 }), ann('3', axis, { pad: 3 })]),
    ann('4', tiles, { fill: true }),
    cols([ann('5', ladder, { fill: true }), ann('6', bul, { fill: true })], 16, [520, null])
  ]);
  var byInd = table([{ t: '업종', w: 100, bold: true }, { t: '패널 차트 구성 (같은 위치에 교체 표시)' }], [
    ['제조', '현금전환주기 분해 누적 막대 · 매출/재고/채권 증가율 묶음 막대 · 영업이익/영업CF/CAPEX 막대'],
    ['도소매', '매출총이익률 라인(%p 라벨) · 매입채무/재고일수 추세 · 리스 포함/제외 부채비율 막대'],
    ['건설', 'PF 보증 만기 사다리 · 계약자산 vs 매출 증가율 · 우발채무÷자본 불릿 · 공사원가율 추세'],
    ['부동산 임대', '차입 만기 사다리 + 평균 금리 점 · EBITDA 이자보상(1.0배 가설선) · 차입/투자부동산 불릿 · 임대율']
  ], { w: 640 });
  var missing = A('v', { g: 8, w: 300 }, [
    A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14], g: 4 }, [
      T('평균 조달금리 변화', { s: 11.5, c: C.sub }), T('자료 없음', { s: 20, w: 700, c: C.none }), T('차입금 주석에 금리 미기재 · 0으로 계산 X', { s: 11, c: C.mute }),
      A('h', { g: 3 }, [R(28, 24, C.noneBg), R(28, 24, C.noneBg), R(28, 24, C.noneBg), R(28, 24, C.noneBg), R(28, 24, C.noneBg)])
    ])
  ]);
  return sheet({
    id: 'N-S04-1', name: '주석 확인과 위험징후 패널', path: '실적 변동·현금흐름 > 주석·위험징후 > 위험징후 패널', screen: scr,
    extras: [extraBlock('업종별', '업종에 따른 차트 교체 (5·6 영역)', byInd, ['- 게이지·레이더 차트는 쓰지 않고 불릿·막대로 대체', '+ 차트 우선 구현 순서·기존 SVG 범위 미정 (N-U20)']),
      extraBlock('상태', '자료 없음 타일', missing, ['- 결측은 회색 "자료 없음", 확보 연도 부족은 확보 범위 표시'])],
    desc: [
      ['1', '징후 요약 카드', ['- 경고·주의·관찰 건수, 색과 텍스트 병기', '- 규칙 버전·출처(팀 가설) 칩, 서비스 경계 문구', '- 카드 클릭 시 2의 목록을 해당 단계로 필터', '+ 단계 조건 수치(1배·3년 등)는 현직자 확인 전 팀 가설 (N-U17)', 'F: N-F37, N-F38, N-R39, N-R40']],
      ['2', '징후 목록', ['- 경고는 최상단 고정 + "원문 확인" 필수 (확인 전 N-S07에서 완료 처리 불가)', '- 주의: 확인 목록 추가, 원문 연결', '- 관찰: 추세·업종 내 위치만 표시', '- 행: 단계, 판정 문장(수치 포함), 근거 위치(목차·주석)', '- 공시상 조건 조항 존재와 실제 사유 발생을 구분', '+ 복수 규칙 우선순위·결측 시 단계 처리 미정 (N-U17)']],
      ['3', '판단 축 필터', ['- 6개 축: 상환재원, 유동성·만기, 재무구조, 우발·부외 부담, 외부 평가, 담보·회수 여력', '- 선택 축에 연결된 지표·원문만 표시', 'F: N-F36, N-R38']],
      ['4', '업종 핵심 지표 타일', ['- 업종 우선 5개 지표: 당기 값, 전기 대비, 업종 중앙값, 5개년 스파크라인', '- 징후에 걸린 지표는 경고색 값', '- 건설: 계약자산−매출 증가율, 공사미수금 회수기간, 원가율, PF·조건부 의무÷자본, 영업CF÷유동부채', '+ 지표 기준값 확정 미정 (N-U12)']],
      ['5', '업종 차트 (건설: PF 만기 사다리)', ['- 3·6·12개월, 1~2년, 2~3년, 3년 초과 구간, 정비/기타 누적', '- 1년 내 구간 음영 + 합계·비중 표시', '- 보증한도·보증금액·대출잔액 구분 (총괄표/하위표 중복 합산 금지)', 'F: N-F38, N-F40']],
      ['6', '불릿 차트 · 왜곡 주의 · 업종 위치', ['- 우발채무÷자기자본: 당기 막대 + 팀 가설선', '- 그대로 쓰면 왜곡되는 지표 안내', '- 업종 내 위치 점 플롯, 표본 부족 시 "비교 보류"', '+ 업종 위치 최소 표본 수 미정 (N-U20)']]
    ],
    note: ['현재 징후(규칙) · 미래 사건 확률(N-S05) · 담당자 확인 완료(N-S07)는 서로 다른 상태로 표시', 'LTV 성격 비율(차입/투자부동산)을 은행 담보평가 LTV로 표기하지 않음', '수치는 레이아웃 확인용 예시 값']
  });
}

function timeline(w) {
  var f = Free(w, 92, { name: 'timeline' });
  var y0 = 40; put(f, R(w - 20, 2, C.line), 10, y0);
  var ticks = ['2026.Q1', '2026.Q3', '2027.Q1', '2027.Q3', '2028.Q1'];
  ticks.forEach(function (t, i) { var x = 10 + i * (w - 20) / 4; put(f, R(1, 8, C.chart2), x, y0 - 3); var l = T(t, { s: 10, c: C.mute }); put(f, l, x - l.width / 2, y0 + 10); });
  var ev = [[0.08, '소송', '하도급대금 청구 38억 (피고, 계류)', C.ink2], [0.33, '사채', '공모사채 1,200억 만기', C.chart], [0.55, 'PF 보증', '2,350억 만기 집중', C.warn], [0.86, '차입', '장기차입 2,100억 만기', C.chart]];
  ev.forEach(function (e, i) {
    var x = 10 + e[0] * (w - 20);
    put(f, E(11, e[3], { stroke: '#FFFFFF', sw: 2 }), x - 5.5, y0 - 4.5);
    var l = T(e[1] + ' · ' + e[2], { s: 10.5, w: 600, c: e[3] === C.warn ? C.warn : C.ink2 }); put(f, l, Math.min(w - l.width, Math.max(0, x - 10)), i % 2 ? 62 : 6);
  });
  return f;
}
function buildS04b() {
  var ext = table([{ t: '추출 항목', w: 170, bold: true }, { t: '구분', w: 60, mute: true }, { t: '검출 상태', w: 96 }, { t: '건수', w: 44, align: 'right', num: true }, { t: '원문 위치' }], [
    ['감사의견·계속기업', '공통', detBadge('검출'), '1', 'V.1 외부감사 · 적정'],
    ['차입 만기·재무약정', '공통', detBadge('검출'), '4', 'IV.4 · 주석 21'],
    ['신용등급', '공통', detBadge('검출'), '2', 'I.1 회사의 개요'],
    ['담보 제공', '공통', detBadge('검출'), '3', '주석 22 담보제공자산'],
    ['소송·제재', '공통', detBadge('검출'), '1', 'XI.2 · 주석 34'],
    ['부외거래·후속사건', '공통', detBadge('공시상 없음'), '0', 'XI.4 "해당사항 없음" 명시'],
    ['PF 보증·조건부 의무', '건설', detBadge('검출'), '7', 'XI.2 채무보증 · 주석 34'],
    ['분양률·미분양', '건설', detBadge('미검출'), '—', 'II.7 검색어 미일치'],
    ['계약자산·손실부담계약', '건설', detBadge('추출 실패'), '—', '주석 8 표 파싱 오류']
  ]);
  var extP = panel('추출 현황', A('h', { g: 6 }, [srcChip('검색어 사전 v0.2'), srcChip('공통 6 + 건설 업종')]), [ext], { fillKids: true });
  function kv(k, v, strong) { return A('h', { g: 8 }, [T(k, { s: 11.5, c: C.sub, width: 74 }), [T(v, { s: 12, w: strong ? 700 : 400, tnum: true }), { grow: true }]]); }
  var card = A('v', { name: 'evidence-card', bg: C.surface, stroke: C.line, r: 8, p: [14, 16], g: 8 }, [
    A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER' }, [A('h', { g: 6, align: 'CENTER' }, [T('PF 대출 지급보증', { s: 14, w: 700 }), detBadge('검출')]), badge('제공', 'ink')]),
    kv('보증한도', '3,420억원', true), kv('보증금액', '2,980억원'), kv('대출잔액', '2,760억원'), kv('만기', '2027.06.30 (12개월 구간)'),
    kv('상대방', '○○주택조합 (특수관계 아님)'), kv('위치', 'XI.2 채무보증 · 주석 34 · 표 추출'), kv('접수번호', '20260314000412 · 기준일 2025.12.31'),
    A('v', { bg: C.tone, r: 6, p: [10, 12] }, [T('"당사는 ○○ 주택재개발 정비사업의 PF 대출과 관련하여 대주단에 3,420억원 한도의 연대보증을 제공하고 있으며…"', { s: 12, c: C.ink2, width: 300 })]),
    btn('원문 열기', 'ghost', { sm: true, icon: 'ext' })
  ]);
  var split = table([{ t: '보증 구분', bold: true }, { t: '건수', w: 50, align: 'right', num: true }, { t: '금액(억원)', w: 90, align: 'right', num: true }], [
    ['제공한 보증 (회사 부담)', '7', '10,880'], ['제공받은 보증 (수취)', '3', '1,240']
  ]);
  var splitP = panel('제공/수취 분리', T('합산하지 않음', { s: 11.5, c: C.sub }), [split], { fillKids: true });
  var tl = panel('소송·보증·차입 타임라인', null, [timeline(588)], { fillKids: true });
  var sumRow = A('h', { g: 10 }, [
      ['확인된 사실', '정비사업 PF 대출 연대보증 3,420억원 한도(보증금액 2,980억원)를 제공하고 있다.'],
      ['원문 근거', 'XI.2 채무보증 현황 · 주석 34 우발부채 · 접수번호 20260314000412'],
      ['해석과 한계', '보증 존재만으로 손실을 단정할 수 없다. 1년 내 만기가 46%에 몰려 차환 부담을 확인할 필요가 있다.'],
      ['담당자 추가 확인', '사업장별 분양률·대출 약정, 내부 거래·담보 평가는 공시로 확인되지 않아 내부 자료로 확인한다.']
    ].map(function (q) {
      return A('v', { bg: C.tone, r: 6, p: [10, 12], g: 4, w: 236 }, [T(q[0], { s: 12, w: 700 }), T(q[1], { s: 12, c: C.ink2, width: 212 })]);
    }));
  var summary = panel('AI 근거 요약', A('h', { g: 6 }, [srcChip('LLM 요약 · 검수 전'), btn('복사', 'ghost', { sm: true, icon: 'copy' })]), [[sumRow, { fill: true }]]);
  sumRow.children.forEach(function (c) { c.layoutGrow = 1; c.layoutSizingVertical = 'FILL'; var t = c.children[1]; t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; });
  var scr = appScreen(3, {}, [
    pageTitle('주석 확인과 위험징후', '공통 6개·업종별 추출 항목의 검출 상태와 원문 근거를 확인합니다.', subTabs(1)),
    cols([ann('1', extP, { fill: true }), ann('2', card, { fill: true })], 16, [636, null]),
    cols([ann('3', splitP, { fill: true }), ann('4', tl, { fill: true })], 16, [370, null]),
    ann('5', summary, { fill: true })
  ]);
  var viewer = A('v', { name: 'drawer/원문', bg: C.surface, stroke: C.line, r: 8, w: 520, clip: true }, [
    [A('h', { p: [12, 16], justify: 'SPACE_BETWEEN', align: 'CENTER', stroke: C.line2, sides: [0, 0, 1, 0] }, [T('원문 보기 · XI.2 채무보증 현황', { s: 13, w: 700 }), icon('close', 16, C.sub)]), { fill: true }],
    [A('v', { p: [14, 16], g: 8 }, [
      T('2. 우발부채 등에 관한 사항', { s: 12.5, w: 700 }),
      T('가. 채무보증 현황', { s: 12, w: 600, c: C.ink2 }),
      A('v', { bg: C.cautBg, p: [8, 10], r: 4 }, [T('당사는 ○○ 주택재개발 정비사업의 PF 대출과 관련하여 대주단에 3,420억원 한도의 연대보증을 제공하고 있으며, 보고기간말 현재 보증금액은 2,980억원입니다.', { s: 12, c: C.ink, width: 464 })]),
      T('(표 34-2) 사업장별 보증 내역 … 만기 2027.06.30', { s: 12, c: C.sub })
    ]), { fill: true }]
  ]);
  return sheet({
    id: 'N-S04-2', name: '주석 추출 근거·AI 요약', path: '주석·위험징후 > 주석 추출 근거', screen: scr,
    extras: [extraBlock('드로어', '원문 열기 (2 클릭 시)', viewer, ['- 해당 문장 하이라이트, 목차·주석 번호·접수번호 표시', '- 다른 장 참조 문장은 참조 위치로 이동해 재추출 결과 표시'])],
    desc: [
      ['1', '추출 현황', ['- 공통 6개: 감사의견·계속기업, 차입 만기·재무약정, 신용등급, 담보 제공, 소송·제재, 부외거래·후속사건', '- 업종별 추가 항목 (건설: PF·조건부 의무, 분양률·미분양, 계약자산 등)', '- 검출 상태 4종 배지, 건수, 원문 위치', '-- 미검출·추출 실패는 "없음"으로 표시하지 않음', '+ 검색어 사전 버전·표/본문 우선순위 미정 (N-U18)', 'F: N-F09, N-F39, N-F40, N-F41']],
      ['2', '원문 근거 카드', ['- 유형, 방향(제공/수취·원고/피고), 금액·통화·단위', '- 한도/보증금액/대출잔액 구분, 만기, 상대방(특수관계 여부)', '- 목차 위치·주석 번호·추출 방식(표/본문), 접수번호·기준일', '- 원문 발췌 + 원문 열기', 'F: N-F10, N-R43']],
      ['3', '제공/수취 분리 표', ['- 회사가 제공한 보증과 제공받은 보증을 분리, 합산 금지', '- 일반 담보·차입약정은 우발부채로 자동 확정하지 않음']],
      ['4', '타임라인', ['- 소송·보증·차입 만기를 분기 축에 배치', '- 1년 내 만기 집중 구간은 경고색']],
      ['5', 'AI 근거 요약 (4구역)', ['- 확인된 사실 / 원문 근거 / 해석과 한계 / 담당자 추가 확인', '- 숫자·비율은 코드 계산 값만 인용, 소송 결과·손실 단정 금지', '- 검색 없음과 해당 사항 없음, 회사 주장과 확인 사실 구분', '+ LLM 제공자·검수 기준 미정 (N-U07)', 'F: N-F11, N-R13']]
    ],
    note: ['검증된 구조화 결과만 요약·예측 모델 입력에 공통 사용 (N-F10)', '기업명·사업장·금액은 예시 값']
  });
}

function buildS05() {
  var result = A('v', { name: 'result', bg: C.surface, stroke: C.line, r: 8, p: [18, 20], g: 12 }, [
    [A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER', w: 500 }, [T('향후 12개월 상환·연체 위험 사건 발생 확률', { s: 14, w: 700 }), A('h', { g: 6 }, [badge('검증 완료', 'ok'), badge('예시', 'line')])]), { fill: true }],
    A('h', { g: 28, align: 'MAX' }, [
      A('v', { g: 2 }, [T('재무 + 주석 결합 모델', { s: 12, c: C.sub }), A('h', { g: 4, align: 'BASELINE' }, [T('7.8', { s: 48, w: 700, ls: -3, lh: 105, tnum: true }), T('%', { s: 20, w: 600, c: C.sub })])]),
      A('v', { g: 2, p: [0, 0, 6, 0] }, [T('재무 기준 모델', { s: 12, c: C.sub }), A('h', { g: 3, align: 'BASELINE' }, [T('4.6', { s: 26, w: 700, c: C.ink2, tnum: true }), T('%', { s: 14, c: C.sub })])]),
      A('v', { g: 2, p: [0, 0, 6, 0] }, [T('평가셋 전체 사건 비율', { s: 12, c: C.sub }), A('h', { g: 3, align: 'BASELINE' }, [T('2.9', { s: 26, w: 700, c: C.ink2, tnum: true }), T('%', { s: 14, c: C.sub })])])
    ]),
    [A('h', { g: 6, wrap: true, wrapGap: 6, w: 500 }, [srcChip('예측 기간 2026.03.14 ~ 2027.03.13'), srcChip('기준 공시일 2026.03.14'), srcChip('모델 v0.1 · 특징 v0.2'), srcChip('규칙 기반 징후 단계와 별개')]), { fill: true }],
    [A('h', { g: 8, p: [10, 12], r: 6, bg: C.tone, w: 500 }, [[T('공시로 확인되는 위험 사건의 복합 확률입니다. 실제 대출 연체율이나 은행 내부 등급이 아니며, 변수 영향은 인과관계가 아닙니다.', { s: 12, c: C.ink2 }), { fill: true }]]), { fill: true }]
  ]);
  var events = table([{ t: '대상 사건', bold: true }, { t: '심각도', w: 70 }, { t: '원천', w: 150, mute: true }], [
    ['원리금 연체·기한이익상실', badge('높음', 'warn'), '공시 원문 대조'],
    ['어음·수표 지급거절', badge('높음', 'warn'), '주요사항보고서 API'],
    ['회생·채권은행 관리절차 개시신청', badge('높음', 'warn'), '주요사항보고서 API'],
    ['감사의견 비적정·계속기업 불확실성', badge('미정', 'none'), '감사보고서']
  ]);
  var evP = panel('대상 사건 정의', null, [events, T('관리종목 지정·상장폐지는 상환·연체 관련이 확인되지 않으면 제외합니다.', { s: 11.5, c: C.sub })], { fillKids: true });
  function infl(name, v, src) {
    return A('h', { g: 10, align: 'CENTER' }, [T(name, { s: 12, width: 210 }), R(Math.abs(v) * 190, 12, v > 0 ? C.chart : C.chart2, { r: 2 }), T((v > 0 ? '+' : '') + v.toFixed(2), { s: 11.5, w: 600, tnum: true }), T(src, { s: 11, c: C.mute })]);
  }
  var drivers = panel('주요 입력 지표 영향', T('예측의 설명이며 인과가 아님', { s: 11.5, c: C.sub }), [
    infl('1년 내 만기 PF 보증 비중', 0.84, '주석 34'), infl('기한이익상실 조항(사유 발생)', 0.71, '주석 21'), infl('영업CF ÷ 총부채', 0.52, '현금흐름표'), infl('단기차입 비중', 0.38, '재무상태표'), infl('영업이익률', 0.21, '손익계산서'), infl('유동비율', -0.12, '재무상태표')
  ]);
  var notes = panel('연결된 주석 원문', null, [
    table([{ t: '원문', bold: true }, { t: '위치', w: 110, mute: true }, { t: '', w: 60 }], [
      ['PF 대출 연대보증 3,420억 한도', '주석 34', btn('열기', 'ghost', { sm: true })],
      ['재무약정 미준수 · 기한이익상실 사유', '주석 21', btn('열기', 'ghost', { sm: true })],
      ['신용등급 전망 부정적', 'I.1', btn('열기', 'ghost', { sm: true })]
    ])
  ], { fillKids: true });
  var states = A('h', { g: 10 }, [
    A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14], g: 4 }, [T('현재 징후 (규칙)', { s: 11.5, c: C.sub }), A('h', { g: 6 }, [stageBadge('경고'), T('1건', { s: 13, w: 700 })])]),
    A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14], g: 4 }, [T('미래 사건 확률 (모델)', { s: 11.5, c: C.sub }), T('7.8% · 12개월', { s: 13, w: 700 })]),
    A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14], g: 4 }, [T('담당자 확인', { s: 11.5, c: C.sub }), T('미확인 4 / 6', { s: 13, w: 700 })])
  ]);
  states.children.forEach(function (c) { c.layoutGrow = 1; });
  var todo = panel('담당자 추가 확인', T('공시로 확인되지 않는 사항', { s: 11.5, c: C.sub }), [
    checkbox(false, 'PF 사업장별 분양률·대출 약정 (내부 자료)', { s: 12.5 }),
    checkbox(false, '차환 약정·만기 연장 협의 여부 (영업점 확인)', { s: 12.5 }),
    checkbox(false, '기한이익상실 사유 해소 여부 (후속 공시·주석 21)', { s: 12.5 }),
    A('h', { g: 8, align: 'CENTER' }, [btn('체크·메모로 보내기', 'secondary', { sm: true, icon: 'right' })])
  ]);
  var perf = panel('모델 비교 요약', btn('검증 기록 보기', 'ghost', { sm: true, icon: 'right' }), [
    table([{ t: '지표', bold: true }, { t: '기준', w: 70, align: 'right', num: true }, { t: '결합', w: 70, align: 'right', num: true }], [['PR-AUC', '0.21', '0.29'], ['Brier', '0.027', '0.025'], ['평가 사건 수', '41', '41']]),
    T('동일 기업·기간·자연 발생 비율 평가셋 (예시 값)', { s: 11.5, c: C.sub })
  ], { fillKids: true });
  var scr = appScreen(4, {}, [
    pageTitle('위험 사건 예측과 근거', '재무와 주석을 결합한 모델이 계산한 확률과, 그 근거가 된 지표·원문을 함께 봅니다.'),
    cols([ann('1', result, { fill: true }), ann('2', evP, { fill: true })], 16, [560, null]),
    ann('3', states, { fill: true }),
    cols([stack([ann('4', drivers, { fill: true }), ann('7', todo, { fill: true })], 16), stack([ann('5', notes, { fill: true }), ann('6', perf, { fill: true })], 16)], 16, [560, null])
  ]);
  function hold(title, badgeTxt, kind, msg) {
    return A('v', { bg: C.surface, stroke: C.line, r: 8, p: [16, 18], g: 8, w: 330 }, [
      A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER' }, [T(title, { s: 13, w: 700 }), badge(badgeTxt, kind)]),
      T('— %', { s: 34, w: 700, c: C.chart3 }),
      T(msg, { s: 12, c: C.ink2, width: 294 })
    ]);
  }
  var holds = A('h', { g: 12 }, [
    hold('학습 전', '미학습', 'none', '모델 학습 전입니다. 임의 확률을 표시하지 않습니다.'),
    hold('검증 전', '표시 보류', 'neutral', '평가셋 검증이 끝나기 전까지 확률을 보류합니다. 근거 지표·원문만 표시합니다.'),
    hold('입력 부족', '표시 보류', 'neutral', '필수 입력(영업CF, 차입 만기)이 미확보입니다. 확보 후 다시 계산합니다.')
  ]);
  return sheet({
    id: 'N-S05', name: '위험 사건 예측과 근거', path: '주석·위험징후 > 위험 사건 예측', screen: scr,
    extras: [extraBlock('상태', '확률 표시 보류 (1 영역 대체)', holds, ['- 학습·검증 전 임의 확률을 실제 결과처럼 표시하지 않음', '+ 표시/보류 기준·성능 수용 기준 미정 (N-U05)'])],
    desc: [
      ['1', '예측 결과', ['- 재무+주석 결합 모델 확률(대표), 재무 기준 모델 확률, 평가셋 전체 사건 비율', '- 예측 기간·기준 공시일·모델/특징 버전·검증 상태 칩', '- 해석 경계 문구 고정: 실제 대출 연체율·내부 등급 아님, 변수 영향은 인과 아님', '+ 검증 완료 상태에서만 표시, 그 외 하단 보류 상태로 대체', 'F: N-F20, N-R16, N-R23']],
      ['2', '대상 사건 정의', ['- 원리금 연체·기한이익상실, 어음·수표 지급거절, 회생·관리절차 개시신청, 감사의견 비적정·계속기업 불확실성', '- 사건별 심각도·원천', '+ 유형별 심각도·제공 기간·표본 미정 (N-U01)', 'F: N-F13, N-F14, N-R17']],
      ['3', '세 가지 상태 구분', ['- 현재 징후(규칙) · 미래 사건 확률(모델) · 담당자 확인을 나란히 표시해 혼동 방지']],
      ['4', '주요 입력 지표 영향', ['- 변수 영향 막대(양/음), 근거 위치', '- LLM은 확률 계산에 사용하지 않음, 뉴스는 초기 입력 제외', 'F: N-F15, N-F18']],
      ['5', '연결된 주석 원문', ['- 모델 입력에 쓰인 검증된 주석 항목과 원문 링크']],
      ['6', '모델 비교 요약', ['- 기준 vs 결합: PR-AUC, Brier, 평가 사건 수', '- 상세는 N-S08 검증 기록으로 이동', '+ 결합 모델 종류·보정 방식 미정 (N-U05)', 'F: N-F19, N-R22']],
      ['7', '담당자 추가 확인', ['- 내부 거래·담보 평가·상환 약정 등 공시로 확인되지 않는 사항', '- 체크·메모로 보내기 → N-S07 확인 항목에 추가', 'F: N-R14, N-R23']]
    ],
    note: ['확률·성능 수치는 레이아웃 확인용 예시 값이며 실제 학습·검증 결과가 아님', '대출 승인·거절, 내부 등급은 담당자가 별도 판단']
  });
}

function buildS06() {
  var cond = A('h', { g: 8, align: 'CENTER', wrap: true, wrapGap: 8 }, [
    input('2025.01 ~ 2026.03 (실적 기간)', { icon: 'cal', value: true, w: 250 }),
    chip('전체', false), chip('영업이익', true), chip('현금흐름', false), chip('PF·보증', true), chip('소송', false),
    input('매체 전체', { select: true, w: 130 })
  ]);
  function art(date, media, title, tags, st) {
    return A('h', { g: 14, p: [14, 16], align: 'MIN', stroke: C.line2, sides: [0, 0, 1, 0] }, [
      A('v', { g: 2, w: 96 }, [T(date, { s: 12, w: 600, tnum: true }), T(media, { s: 11.5, c: C.sub })]),
      [A('v', { g: 6 }, [[T(title, { s: 14, w: 600 }), { fill: true }], A('h', { g: 6 }, tags.map(function (t) { return badge(t, 'neutral'); }).concat([T('관련 기간: 2025 사업연도', { s: 11, c: C.mute })]))]), { grow: true }],
      A('v', { g: 6, align: 'MAX' }, [badge(st, st === '검수 완료' ? 'ok' : 'caut'), btn('원문', 'ghost', { sm: true, icon: 'ext' })])
    ]);
  }
  var list = A('v', { name: 'news-list', bg: C.surface, stroke: C.line, r: 8, clip: true }, [
    [art('2026.02.11', '경제매체 A', '한결건설, 정비사업 PF 보증 만기 앞두고 차환 협의', ['PF·보증'], '검수 완료'), { fill: true }],
    [art('2026.01.20', '경제매체 B', '건설사 원가 부담 지속…한결건설 4분기 영업이익 감소', ['영업이익'], '검수 완료'), { fill: true }],
    [art('2025.11.03', '경제매체 C', '한결건설 신용등급 전망 ‘부정적’ 조정', ['신용등급'], '검수 완료'), { fill: true }],
    [art('2025.09.18', '경제매체 A', '주택 공급 위축에 미청구공사 늘어난 건설사들', ['영업이익', '현금흐름'], '관련성 검토 중'), { fill: true }]
  ]);
  var excl = panel('제외된 기사', T('12건', { s: 12, w: 600 }), [
    table([{ t: '제외 사유', bold: true }, { t: '건수', w: 60, align: 'right', num: true }], [['동명이인·동명 기업', '3'], ['단순 언급(실적 무관)', '5'], ['중복 기사', '4']]),
    btn('제외 기사 보기', 'secondary', { sm: true })
  ], { fillKids: true });
  var limit = panel('이용 시 유의', null, [
    T('기사 존재만으로 실적 변동의 원인을 확정하지 않습니다. 기사 날짜와 실적 귀속 기간을 구분해 보세요.', { s: 12.5, c: C.ink2, width: 280 }),
    T('수집 누락 가능: 일부 매체는 링크만 제공합니다.', { s: 12, c: C.sub, width: 280 })
  ], { fillKids: true });
  var scr = appScreen(5, {}, [
    pageTitle('관련 뉴스', '기업과 실적 기간에 맞는 기사 중 관련성을 검수한 기사만 보여줍니다.', badge('보완 기능', 'line')),
    ann('1', A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14] }, [cond]), { fill: true }),
    cols([ann('2', list, { fill: true }), stack([ann('3', excl, { fill: true }), ann('4', limit, { fill: true })], 16)], 16, [680, null])
  ]);
  var linkOnly = A('v', { bg: C.surface, stroke: C.line, r: 8, w: 520, clip: true }, [
    [A('h', { p: [12, 16], g: 8, bg: C.cautBg }, [[T('뉴스 요약을 제공하지 않습니다. 기업명·기간으로 검색한 원문 링크만 표시합니다.', { s: 12, c: C.ink2 }), { fill: true }]]), { fill: true }],
    [A('h', { p: [12, 16], g: 12, align: 'CENTER', justify: 'SPACE_BETWEEN' }, [T('2026.02.11 · 경제매체 A · 한결건설, 정비사업 PF 보증…', { s: 12.5 }), icon('ext', 14, C.kbGray)]), { fill: true }],
    [A('h', { p: [12, 16], g: 12, align: 'CENTER', justify: 'SPACE_BETWEEN' }, [T('2026.01.20 · 경제매체 B · 건설사 원가 부담 지속…', { s: 12.5 }), icon('ext', 14, C.kbGray)]), { fill: true }]
  ]);
  return sheet({
    id: 'N-S06', name: '관련 뉴스', path: '위험 사건 예측 > 관련 뉴스', screen: scr,
    extras: [extraBlock('대체', '링크만 제공 모드', linkOnly, ['- 수집·품질 검증이 어려우면 원문 링크 중심으로 제공', '+ 후보 매체·수집 방식·이용 조건 미정 (N-U07)'])],
    desc: [
      ['1', '검색 조건', ['- 기간 기본값: 실적 비교 기간', '- 관련 항목 필터: 영업이익·현금흐름·PF·보증·소송', '- 매체 필터', 'F: N-F12, N-R15']],
      ['2', '기사 목록', ['- 발행일, 매체, 제목, 관련 항목, 관련 귀속 기간', '- 관련성 상태: 검수 완료 / 관련성 검토 중', '- 원문 버튼은 새 창', '+ 관련성 검수 기준 미정 (N-U07)']],
      ['3', '제외된 기사', ['- 동명이인·단순 언급·중복 제거 건수', '- 펼쳐서 제외 사유 확인 가능 (누락 점검용)']],
      ['4', '유의 문구', ['- 기사로 원인 확정 금지, 기사 시점과 실적 귀속 기간 구분', '- 누락 가능성 안내']]
    ],
    note: ['보완 기능: 필수 범위 아님 (PRD 5)', '매체명·기사 제목은 예시 값', '뉴스는 초기 예측 모델 입력에서 제외']
  });
}

function buildS07() {
  function item(on, stage, text, rule, src) {
    return A('h', { g: 10, p: [11, 14], align: 'CENTER', stroke: C.line2, sides: [0, 0, 1, 0], opacity: on ? 0.55 : null }, [
      checkbox(on), stageBadge(stage), [T(text, { s: 12.5 }), { grow: true }], T(rule, { s: 11, c: C.mute }), btn(src, 'ghost', { sm: true })
    ]);
  }
  var head = A('h', { justify: 'SPACE_BETWEEN', align: 'CENTER', p: [12, 14], stroke: C.line2, sides: [0, 0, 1, 0] }, [
    A('h', { g: 8, align: 'CENTER' }, [T('확인 항목', { s: 14, w: 700 }), T('미확인 4 · 완료 2', { s: 12, c: C.sub })]),
    toggle(false, '미확인만 보기')
  ]);
  var checks = A('v', { name: 'checklist', bg: C.surface, stroke: C.line, r: 8, clip: true }, [
    [head, { fill: true }],
    [item(false, '경고', '기한이익상실 사유 발생 문장 원문 확인', 'R-W03 v0.1', '주석 21'), { fill: true }],
    [item(false, '주의', '1년 내 만기 차입금 차환 계획 확인', 'R-C04 v0.1', 'IV.4'), { fill: true }],
    [item(false, '주의', 'PF 보증·조건부 의무 급증 사업장 확인', 'R-C06 v0.1', '주석 34'), { fill: true }],
    [item(false, '주의', '단기차입으로 장기부채 상환 여부 확인', 'R-C11 [업종 기준]', '현금흐름표'), { fill: true }],
    [item(true, '주의', '신용등급 전망 하향 사유 확인', 'R-C08 v0.1', 'I.1'), { fill: true }],
    [item(true, '관찰', '공사원가율 상승 원인 확인', 'R-O02 v0.1', '손익계산서'), { fill: true }]
  ]);
  var dist = panel('부실징후 점검표 17항목', null, [
    table([{ t: '판정 방식', bold: true }, { t: '항목', w: 50, align: 'right', num: true }, { t: '해당', w: 50, align: 'right', num: true }], [['자동 판정', '9', '3'], ['주석·원문 확인 필요', '5', '2'], ['외부 확인 필요', '3', '—']]),
    T('자동 판정 불가 항목도 목록에 남기고, 미확인과 "위험 없음"을 구분합니다.', { s: 11.5, c: C.sub, width: 300 })
  ], { fillKids: true });
  function sec(t, body) { return A('v', { g: 4 }, [T(t, { s: 12.5, w: 700 }), [T(body, { s: 12.5, c: C.ink2, lh: 160 }), { fill: true }]]); }
  var memo = A('v', { name: 'memo', bg: C.surface, stroke: C.line, r: 8, clip: true }, [
    [A('h', { p: [12, 14], justify: 'SPACE_BETWEEN', align: 'CENTER', stroke: C.line2, sides: [0, 0, 1, 0] }, [
      A('h', { g: 8, align: 'CENTER' }, [T('검토 기록 초안', { s: 14, w: 700 }), badge('편집됨', 'caut')]),
      A('h', { g: 6 }, [btn('초안 재생성', 'secondary', { sm: true, icon: 'refresh' }), btn('복사', 'secondary', { sm: true, icon: 'copy' }), btn('저장', 'primary', { sm: true }), btn('PDF', 'secondary', { sm: true, disabled: true })])
    ]), { fill: true }],
    [A('v', { p: [14, 16], g: 12 }, [
      [sec('핵심 수치', '2025년 영업이익 1,284억원(전기 대비 −19.5%), 영업이익률 4.1%. 영업CF −310억원으로 적자 전환. 부채비율 212.7%(선수금 제외 164.2%).'), { fill: true }],
      [sec('실적 변동', '매출 +820억에도 매출원가 +1,010억, 판관비 +95억으로 영업이익 감소(기타·조정 −27억). 회계상 분해 결과임.'), { fill: true }],
      [sec('주석 근거', 'PF 대출 연대보증 3,420억 한도 제공(XI.2·주석 34, 접수번호 20260314000412). 1년 내 만기 46%.'), { fill: true }],
      [sec('위험징후·예측', '경고 1·주의 3·관찰 2 (징후 규칙 v0.1). 12개월 위험 사건 확률은 검증 상태 확인 후 기재.'), { fill: true }],
      [sec('추가 확인 (내부 자료)', '사업장별 분양률, 차환 약정, 담보 평가는 내부 자료로 확인 필요.'), { fill: true }],
      [A('v', { g: 4 }, [T('담당자 의견', { s: 12.5, w: 700 }), [A('v', { stroke: C.accent, sw: 1.5, r: 6, p: [10, 12], h: 60 }, [T('여기에 내부 자료 판단과 최종 의견을 작성합니다.', { s: 12.5, c: C.mute })]), { fill: true }]]), { fill: true }],
      [A('h', { g: 6, wrap: true, wrapGap: 6 }, [srcChip('업종 기준: 건설 v0.1'), srcChip('산식 사전 v0.3'), srcChip('징후 규칙 v0.1'), srcChip('모델 v0.1')]), { fill: true }]
    ]), { fill: true }]
  ]);
  var scr = appScreen(6, {}, [
    pageTitle('체크·검토 메모', '시스템이 제안한 확인 항목을 처리하고, 검토 기록 초안을 고쳐 복사합니다.'),
    cols([stack([ann('1', checks, { fill: true }), ann('2', dist, { fill: true })], 16), ann('3', memo, { fill: true })], 16, [520, null])
  ]);
  var conflict = modal('초안 재생성', [
    T('직접 수정한 내용이 있습니다. 다시 생성하면 수정한 문단이 바뀝니다.', { s: 13, c: C.ink }),
    A('v', { g: 8 }, [radio(true, '수정한 문단은 유지하고 나머지만 갱신'), radio(false, '전체를 새로 생성 (수정 내용 삭제)')])
  ], 420, [btn('취소', 'secondary'), btn('재생성')]);
  return sheet({
    id: 'N-S07', name: '담당자 체크·검토 메모', path: '관련 뉴스 > 체크·검토 메모', screen: scr,
    extras: [extraBlock('팝업', '초안 재생성 충돌 (3 초안 재생성 클릭 시)', conflict, ['+ 저장·재생성 충돌 정책 미정 (N-U08)'])],
    desc: [
      ['1', '확인 항목 체크', ['- 시스템 확인 항목: 단계, 항목, 규칙 ID·버전, 근거 위치', '- 체크 = 담당자 확인 완료. 시스템 제안을 자동 완료하지 않음', '- 경고 항목은 원문 열람 기록이 있어야 체크 가능', '- 공통 기준과 [업종 기준] 표시, 낮춘 공통 항목도 숨기지 않음', '- 미확인만 보기 토글', '+ 사용자별 저장·이력 미정 (N-U08)', 'F: N-F21, N-F22, N-F37']],
      ['2', '부실징후 점검표', ['- 17개 항목을 자동 판정 / 주석·원문 확인 / 외부 확인으로 분류', '- 미확인과 "위험 없음"·확인 완료를 구분', '+ 17개 목록 원자료 대조·기간 기준 미정 (N-U12)', 'F: N-F34, N-R36']],
      ['3', '검토 기록 초안', ['- 핵심 수치, 실적 변동, 주석 근거(접수번호·원문 위치), 위험징후·예측, 추가 확인', '- 담당자 의견 칸은 비워 두고 직접 작성', '- 적용 업종 기준·산식·규칙·모델 버전 칩 포함', '- 초안 재생성 / 복사 / 저장, PDF는 확장 기능으로 비활성', '- 미검증 확률은 수치 대신 "검증 상태 확인 후 기재"', 'F: N-F23, N-F29, N-R26']]
    ],
    note: ['규칙 ID(R-W03 등)·문장은 예시 값', '복사본과 화면의 단계·근거·버전이 일치해야 함 (N-F23 검수)']
  });
}

function buildS08() {
  var banner = A('h', { g: 10, p: [12, 14], r: 8, bg: C.cautBg, align: 'CENTER' }, [icon('info', 16, C.caut), [T('구성안 화면입니다. 별도 화면으로 둘지, 내부 문서로 관리할지 미정이며 아래 값은 측정 전 상태입니다.', { s: 12.5, c: C.ink2 }), { grow: true }]]);
  function sample(name, n, st) { return A('v', { bg: C.surface, stroke: C.line, r: 8, p: [12, 14], g: 4 }, [T(name, { s: 11.5, c: C.sub }), T(n, { s: 20, w: 700, tnum: true }), badge(st, st === '논의 필요' ? 'caut' : 'neutral')]); }
  var samples = A('h', { g: 10 }, [sample('기능 검증 표본', '15곳', '논의 필요'), sample('원문 정답지', '5곳', '논의 필요'), sample('원문 추출 시트', '40개사', '기획안 인용'), sample('계정 확보 점검', '업종별 5곳+', '대상 미정')]);
  samples.children.forEach(function (c) { c.layoutGrow = 1; });
  var pr = table([{ t: '추출 항목', bold: true, w: 150 }, { t: '제조', w: 86, align: 'center' }, { t: '건설', w: 86, align: 'center' }, { t: '도소매', w: 86, align: 'center' }, { t: '부동산 임대', align: 'center' }], [
    ['감사의견·계속기업', '측정 전', '측정 전', '측정 전', '측정 전'],
    ['차입 만기·재무약정', '측정 전', '측정 전', '측정 전', '측정 전'],
    ['담보 제공', '측정 전', '측정 전', '측정 전', '측정 전'],
    ['PF·조건부 의무', '—', '측정 전', '—', '측정 전'],
    ['분양률·미분양', '—', '우선 보완', '—', '—'],
    ['작성기준일 이후', '측정 전', '측정 전', '측정 전', '우선 보완']
  ]);
  var prP = panel('주석 추출 정밀도 / 재현율', srcChip('업종 × 항목'), [pr], { fillKids: true });
  var cause = panel('미검출 원인', null, [
    table([{ t: '원인', bold: true }, { t: '건수', w: 60, align: 'right', num: true }], [['규칙 누락', '—'], ['공시 없음 (원문 대조 필요)', '—'], ['형식 차이', '—']])
  ], { fillKids: true });
  var acct = panel('업종별 필수 계정 확보율', srcChip('70%는 예시 기준'), [
    table([{ t: '업종', bold: true }, { t: '표본', w: 54, align: 'right' }, { t: '확보율', w: 70, align: 'right' }], [['제조', '—', '—'], ['건설', '—', '—'], ['도소매', '—', '—'], ['부동산 임대', '—', '—']])
  ], { fillKids: true });
  var model = panel('모델 학습·평가 상태', null, [
    table([{ t: '단계', bold: true }, { t: '상태', w: 90 }], [['사건 라벨 원문 대조', badge('진행 전', 'none')], ['시점 분리·누출 점검', badge('진행 전', 'none')], ['기준 모델 학습', badge('미학습', 'none')], ['결합 모델 학습', badge('미학습', 'none')], ['성능·보정 비교', badge('측정 전', 'none')]])
  ], { fillKids: true });
  var exp = panel('사용자 비교 실험', null, [
    table([{ t: '항목', bold: true }, { t: '값', w: 90 }], [['참여 인원', '미정'], ['과제 순서', '교차'], ['검토 시간·누락·수정량', '측정 전']])
  ], { fillKids: true });
  var scr = appScreen(7, {}, [
    pageTitle('검증 기록', '표본, 추출 품질, 계정 확보, 모델과 실험의 진행 상태를 한곳에 기록합니다.'),
    ann('1', banner, { fill: true }),
    ann('2', samples, { fill: true }),
    cols([stack([ann('3', prP, { fill: true }), ann('6', model, { fill: true })], 16), stack([ann('4', cause, { fill: true }), ann('5', acct, { fill: true }), ann('7', exp, { fill: true })], 16)], 16, [640, null])
  ]);
  return sheet({
    id: 'N-S08', name: '검증 기록(구성안)', path: '검증 기록 (별도 화면 여부 미정)', screen: scr,
    desc: [
      ['1', '구성안 안내', ['- 별도 화면 여부 미정 상태를 상단에 명시', '- 측정 전 값은 "측정 전"·"—"로 표시, 예시 수치를 성과처럼 쓰지 않음', '+ 별도 화면 구현 여부 미정 (PRD 7)']],
      ['2', '표본 현황', ['- 기능 검증 15곳·정답지 5곳: 논의 필요 (확정 목표로 표시 X)', '- 원문 추출 시트 40개사(업종별 10): 기획안 인용, 이번 검수 실적 아님', '- 계정 확보 업종별 5곳 이상, 모델 표본과 목적 구분', '+ 표본 수·합격 기준 미정 (N-U02, N-U09)', 'F: N-F25, N-R28']],
      ['3', '추출 정밀도/재현율', ['- 업종 × 항목 표, 우선 보완 항목 표시 (건설 분양률·미분양, 임대 작성기준일 이후 등)', '+ 보완 범위·합격 기준 미정 (N-U19)']],
      ['4', '미검출 원인', ['- 규칙 누락 / 공시 없음 / 형식 차이로 분리 기록', '- 공시 없음 판정은 원문 대조 후에만', 'F: N-F25, N-U18']],
      ['5', '계정 확보율', ['- 표준계정/계정명/없음, 업종별 확보율', '- 낮은 확보율 지표는 "참고"로 낮추거나 제외', 'F: N-F35, N-R37']],
      ['6', '모델 학습·평가', ['- 라벨 대조 → 시점 분리 → 기준/결합 모델 → 성능·보정 비교 단계 상태', 'F: N-F13~N-F19, N-R22']],
      ['7', '사용자 비교 실험', ['- 동일 난이도 과제, 순서 교차, 시간·누락·메모 수정량', '- 결과는 측정 후 기재, 은행 전체 효과로 일반화 X', 'F: N-F26, N-R29']]
    ],
    note: ['데이터 확보 / 학습 / 평가 / 운영 완료를 각각 별도로 기록 (N-R27)']
  });
}
// ===== 실행부 =====
async function run() {
  var fam = await setupFonts();
  var page = figma.createPage();
  page.name = '화면 설계서 v0.0.1';
  await figma.setCurrentPageAsync(page);
  page.backgrounds = [solid(C.canvas)];
  var builders = [buildCover, buildCommon, buildS01, buildS02, buildS03, buildS04a, buildS04b, buildS05, buildS06, buildS07, buildS08];
  var colX = [0, 2240], gapY = 200, colY = [0, 0], made = [], errs = [];
  for (var i = 0; i < builders.length; i++) {
    try {
      var node = builders[i]();
      page.appendChild(node);
      var c = i < 2 ? i : (colY[0] <= colY[1] ? 0 : 1);
      node.x = colX[c]; node.y = colY[c];
      colY[c] += node.height + gapY;
      made.push(node);
    } catch (e) {
      errs.push(builders[i].name + ': ' + (e && e.message ? e.message : e));
    }
  }
  if (errs.length) { var et = T('생성 오류:\n' + errs.join('\n'), { s: 40, w: 700, c: '#FF5555' }); page.appendChild(et); et.x = 0; et.y = -400; made.push(et); }
  figma.viewport.scrollAndZoomIntoView(made);
  var msg = '설계서 ' + made.length + '장 생성 · 글꼴 ' + fam + (errs.length ? ' · 오류 ' + errs.length + '건: ' + errs.join(' / ') : '');
  figma.closePlugin(msg);
}
run().catch(function (e) { figma.closePlugin('실패: ' + (e && e.message ? e.message : e)); });
