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
