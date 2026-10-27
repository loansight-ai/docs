// LoanSight 화면 설계서 — KB 컬러 적용 (기존 레이어 색을 그 자리에서 교체)
// KB Yellow Positive #FFBC00 · KB Gray #60584C · KB Yellow Negative #FFCC00
var YP = '#FFBC00', KBG = '#60584C', YN = '#FFCC00', INK = '#15181D';
var OLD = { accent: '#0B6B4F', tint: '#E3F1EB', accInk: '#08513C', ink: '#15181D', white: '#FFFFFF' };
var MAP_SHAPE = {            // 도형·프레임 채우기/선
  '#0B6B4F': YP,             // 강조(버튼, 체크박스, 토글, 메뉴 강조선, 자사 점)
  '#E3F1EB': '#FFF3CC',      // 강조 연한 바탕(확정·검출 배지, 선택 행)
  '#15181D': KBG,            // 진한 바탕(진한 버튼, 칩, 배지, 사용자 아이콘)
  '#2F3A4A': KBG,            // 차트 주 계열
  '#56657A': '#8C8273',      // 차트 보조 계열
  '#A7AFB9': '#BDB4A6',      // 차트 비교 계열
  '#D5DAE0': '#E2DDD3'       // 차트 연한 계열
};
function hx(c) { function h(v) { var s = Math.round(v * 255).toString(16).toUpperCase(); return s.length < 2 ? '0' + s : s; } return '#' + h(c.r) + h(c.g) + h(c.b); }
function rgb(h) { h = h.replace('#', ''); return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 }; }
function firstSolid(paints) {
  if (!Array.isArray(paints)) return null;
  for (var i = 0; i < paints.length; i++) { var p = paints[i]; if (p.type === 'SOLID' && p.visible !== false) return hx(p.color); }
  return null;
}
var ORIG = {}; // node.id -> 원래 첫 채우기 색(교체 전)
function bgOf(node) {
  var p = node.parent;
  while (p && p.type !== 'PAGE') {
    var c = ORIG[p.id];
    if (c) return c;
    p = p.parent;
  }
  return null;
}
function recolorPaints(paints, fn) {
  if (!Array.isArray(paints) || !paints.length) return null;
  var changed = false;
  var out = paints.map(function (p) {
    if (p.type !== 'SOLID') return p;
    var n = fn(hx(p.color));
    if (!n) return p;
    changed = true;
    var q = JSON.parse(JSON.stringify(p)); q.color = rgb(n); return q;
  });
  return changed ? out : null;
}
async function run() {
  var page = null;
  for (var i = 0; i < figma.root.children.length; i++) if (figma.root.children[i].name === '화면 설계서 v0.0.1') page = figma.root.children[i];
  if (!page) { figma.closePlugin('"화면 설계서 v0.0.1" 페이지를 찾지 못했습니다.'); return; }
  await figma.setCurrentPageAsync(page);
  var nodes = page.findAll(function () { return true; });
  nodes.forEach(function (n) { if ('fills' in n && n.fills !== figma.mixed) { var c = firstSolid(n.fills); if (c && n.type !== 'TEXT' && n.type !== 'VECTOR') ORIG[n.id] = c; } });
  // 1) 결정 단계: 모든 노드의 새 색을 원래 색 기준으로 계산
  var plan = [];
  nodes.forEach(function (n) {
    var bg = bgOf(n);
    if (n.type === 'TEXT') {
      if (n.fills === figma.mixed) return;
      var nf = recolorPaints(n.fills, function (h) {
        if (h === OLD.accent) return n.characters.trim() === 'AI' ? YP : KBG;   // 워드마크 AI는 노란색, 링크·강조 글자는 KB 그레이
        if (h === OLD.accInk) return KBG;
        if (h === OLD.white && bg === OLD.accent) return INK;                   // 노란 버튼 위 글자는 진한 색(대비)
        if (h === OLD.white && bg === OLD.ink) return YN;                       // 진한 바탕 위 글자는 보조 노란색
        return null;
      });
      if (nf) plan.push([n, 'fills', nf]);
      return;
    }
    var isVec = n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION';
    ['fills', 'strokes'].forEach(function (prop) {
      if (!(prop in n) || n[prop] === figma.mixed) return;
      var np = recolorPaints(n[prop], function (h) {
        if (isVec) {
          if (h === OLD.white && bg === OLD.accent) return INK;
          if (h === OLD.white && bg === OLD.ink) return YN;
          if (h === OLD.accent) return KBG;                                     // 링크·고스트 버튼 아이콘
        }
        if (h === OLD.ink && prop === 'strokes') return null;
        return MAP_SHAPE[h] || null;
      });
      if (np) plan.push([n, prop, np]);
    });
  });
  // 2) 적용 단계
  var count = 0, errs = 0;
  plan.forEach(function (p) { try { p[0][p[1]] = p[2]; count++; } catch (e) { errs++; } });
  // 2-1) 공통 UI 메시지 박스 폭 보정(접힌 상자 펼치기)
  var fixed = 0;
  var com = page.findOne(function (n) { return n.type === 'FRAME' && n.name === 'SHEET COMUI-001'; });
  if (com) {
    var a6 = com.findOne(function (n) { return n.type === 'FRAME' && n.name === 'ann 6'; });
    var inner = a6 && a6.children[0];
    if (inner && inner.type === 'FRAME') {
      inner.layoutSizingHorizontal = 'FIXED';
      inner.resize(380, inner.height);
      inner.layoutSizingVertical = 'HUG';
      inner.children.forEach(function (r) { if (r.type === 'FRAME') { r.layoutSizingHorizontal = 'FILL'; fixed++; } });
      try { a6.layoutSizingHorizontal = 'FILL'; inner.layoutSizingHorizontal = 'FILL'; inner.children.forEach(function (r) { if (r.type === 'FRAME') r.layoutSizingHorizontal = 'FILL'; }); } catch (e) {}
    }
  }
  // 3) 공통 UI 비고의 토큰 문구 갱신
  var note = page.findOne(function (n) { return n.type === 'TEXT' && n.characters.indexOf('강조 #0B6B4F') >= 0; });
  if (note) {
    await figma.loadFontAsync(note.fontName);
    note.characters = '디자인 토큰: KB Yellow Positive #FFBC00(강조) · KB Gray #60584C(진한 바탕·차트) · KB Yellow Negative #FFCC00(진한 바탕 위 글자), 바탕 #F3F4F1, 잉크 #15181D, 경고 #B42318 · 주의 #9A5B06 · 관찰 #355C86';
  }
  figma.closePlugin('KB 컬러 적용: ' + count + '곳 변경 · 메시지 보정 ' + fixed + (errs ? ' · 실패 ' + errs : '') + (note ? ' · 토큰 문구 갱신' : ''));
}
run().catch(function (e) { figma.closePlugin('실패: ' + (e && e.message ? e.message : e)); });
