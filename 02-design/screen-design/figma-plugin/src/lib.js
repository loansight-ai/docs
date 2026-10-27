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
