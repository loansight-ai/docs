/* LoanSight AI 화면 설계서 — 목업용 SVG 차트 (data-chart 속성으로 렌더) */
(function () {
  const C = { ink: '#2F3B4B', mid: '#8C96A3', light: '#C6CCD4', grid: '#E1E4E9', text: '#737B87', accent: '#0E5E50', warn: '#B42318', caut: '#8F5400', watch: '#2C5A7E', none: '#959CA6' };
  const NS = 'http://www.w3.org/2000/svg';
  const fmt = (v, d = 0) => (v == null ? '자료 없음' : Number(v).toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d }));

  function svg(w, h) {
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', `0 0 ${w} ${h}`);
    s.setAttribute('width', w);
    s.setAttribute('height', h);
    return s;
  }
  function el(tag, attrs, parent, text) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(p, x, y, t, o = {}) {
    return el('text', { x, y, 'font-size': o.size || 11, fill: o.fill || C.text, 'text-anchor': o.anchor || 'start', 'font-weight': o.weight || 400 }, p, t);
  }

  /* 5개년 스파크라인: 결측은 회색 점선 구간 */
  function spark(node, d) {
    const w = d.w || 120, h = d.h || 32, v = d.values, pad = 3;
    const s = svg(w, h);
    const vals = v.filter(x => x != null);
    const lo = Math.min(...vals), hi = Math.max(...vals), span = hi - lo || 1;
    const X = i => pad + (i * (w - pad * 2)) / (v.length - 1);
    const Y = x => h - pad - ((x - lo) / span) * (h - pad * 2);
    let path = '';
    v.forEach((x, i) => { if (x == null) return; path += (path && v[i - 1] != null ? 'L' : 'M') + X(i) + ' ' + Y(x); });
    el('path', { d: path, fill: 'none', stroke: C.ink, 'stroke-width': 1.6 }, s);
    v.forEach((x, i) => {
      if (x == null) el('circle', { cx: X(i), cy: h / 2, r: 2.5, fill: 'none', stroke: C.none, 'stroke-dasharray': '2 1.5' }, s);
    });
    const li = v.length - 1;
    if (v[li] != null) el('circle', { cx: X(li), cy: Y(v[li]), r: 3, fill: d.color || C.accent }, s);
    node.appendChild(s);
  }

  /* 업종 내 위치 점 플롯 + 중앙값선 */
  function strip(node, d) {
    const w = d.w || 260, h = d.h || 44, pad = 10;
    const s = svg(w, h);
    const all = d.peers.concat([d.self]);
    const lo = d.min ?? Math.min(...all), hi = d.max ?? Math.max(...all);
    const X = x => pad + ((x - lo) / (hi - lo)) * (w - pad * 2);
    el('line', { x1: pad, x2: w - pad, y1: 20, y2: 20, stroke: C.grid, 'stroke-width': 1 }, s);
    d.peers.forEach((p, i) => el('circle', { cx: X(p), cy: 20 + ((i % 3) - 1) * 4, r: 3.5, fill: C.light }, s));
    el('line', { x1: X(d.median), x2: X(d.median), y1: 8, y2: 32, stroke: C.mid, 'stroke-width': 1.5 }, s);
    txt(s, X(d.median), 42, '중앙값 ' + d.medianLabel, { anchor: 'middle', size: 10 });
    el('circle', { cx: X(d.self), cy: 20, r: 5.5, fill: C.accent, stroke: '#fff', 'stroke-width': 1.5 }, s);
    txt(s, X(d.self), 6, '자사', { anchor: 'middle', size: 10, fill: C.accent, weight: 600 });
    node.appendChild(s);
  }

  /* 묶음 막대 (연도 × 계열) */
  function bars(node, d) {
    const w = d.w || 520, h = d.h || 200, l = 44, r = 10, t = 14, b = 34;
    const s = svg(w, h);
    const series = d.series, cats = d.cats;
    const all = series.flatMap(x => x.values).filter(v => v != null);
    const lo = Math.min(0, ...all), hi = Math.max(...all) * 1.12;
    const Y = v => t + ((hi - v) / (hi - lo)) * (h - t - b);
    const ticks = d.ticks || 4;
    for (let i = 0; i <= ticks; i++) {
      const v = lo + ((hi - lo) * i) / ticks;
      el('line', { x1: l, x2: w - r, y1: Y(v), y2: Y(v), stroke: C.grid }, s);
      txt(s, l - 6, Y(v) + 4, fmt(v, d.dec || 0), { anchor: 'end', size: 10 });
    }
    if (lo < 0) el('line', { x1: l, x2: w - r, y1: Y(0), y2: Y(0), stroke: C.mid }, s);
    const gw = (w - l - r) / cats.length, bw = Math.min(26, (gw * 0.7) / series.length);
    cats.forEach((c, ci) => {
      const gx = l + gw * ci + (gw - bw * series.length) / 2;
      series.forEach((se, si) => {
        const v = se.values[ci];
        const x = gx + si * bw;
        if (v == null) {
          el('rect', { x: x + 1, y: Y(hi * 0.3), width: bw - 2, height: Y(0) - Y(hi * 0.3), fill: '#EEF0F2', stroke: C.none, 'stroke-dasharray': '3 2' }, s);
          return;
        }
        const y0 = Y(Math.max(0, v)), y1 = Y(Math.min(0, v));
        el('rect', { x: x + 1, y: y0, width: bw - 2, height: Math.max(1, y1 - y0), fill: se.color }, s);
        if (d.labels) txt(s, x + bw / 2, (v >= 0 ? y0 - 4 : y1 + 12), fmt(v, d.dec || 0), { anchor: 'middle', size: 10, fill: '#48505C' });
      });
      txt(s, l + gw * ci + gw / 2, h - b + 16, c, { anchor: 'middle', size: 11 });
    });
    if (d.refLine) {
      el('line', { x1: l, x2: w - r, y1: Y(d.refLine.v), y2: Y(d.refLine.v), stroke: C.caut, 'stroke-dasharray': '5 3', 'stroke-width': 1.5 }, s);
      txt(s, w - r, Y(d.refLine.v) - 5, d.refLine.label, { anchor: 'end', size: 10, fill: C.caut, weight: 600 });
    }
    node.appendChild(s);
    legend(node, series);
  }

  /* 누적 막대: 위(+) / 아래(−) 분해. CCC 등 */
  function stack(node, d) {
    const w = d.w || 520, h = d.h || 220, l = 44, r = 10, t = 14, b = 34;
    const s = svg(w, h);
    const cats = d.cats;
    let hi = 0, lo = 0;
    cats.forEach((_, i) => {
      hi = Math.max(hi, d.series.filter(x => x.sign > 0).reduce((a, x) => a + x.values[i], 0));
      lo = Math.min(lo, -d.series.filter(x => x.sign < 0).reduce((a, x) => a + x.values[i], 0));
    });
    hi *= 1.1; lo *= 1.2;
    const Y = v => t + ((hi - v) / (hi - lo)) * (h - t - b);
    [lo, 0, hi / 2, hi].forEach(v => {
      el('line', { x1: l, x2: w - r, y1: Y(v), y2: Y(v), stroke: v === 0 ? C.mid : C.grid }, s);
      txt(s, l - 6, Y(v) + 4, fmt(v), { anchor: 'end', size: 10 });
    });
    const gw = (w - l - r) / cats.length, bw = Math.min(40, gw * 0.45);
    cats.forEach((c, i) => {
      const x = l + gw * i + (gw - bw) / 2;
      let up = 0, dn = 0;
      d.series.forEach(se => {
        const v = se.values[i];
        if (se.sign > 0) { el('rect', { x, y: Y(up + v), width: bw, height: Y(up) - Y(up + v), fill: se.color }, s); up += v; }
        else { el('rect', { x, y: Y(-dn), width: bw, height: Y(-dn - v) - Y(-dn), fill: se.color }, s); dn += v; }
      });
      if (d.net) {
        const n = d.net[i];
        el('rect', { x: x + bw + 6, y: Y(n) - 1.5, width: 10, height: 3, fill: C.accent }, s);
        txt(s, x + bw + 20, Y(n) + 4, fmt(n, 1) + '일', { size: 10.5, fill: C.accent, weight: 600 });
      }
      txt(s, l + gw * i + gw / 2, h - b + 16, c, { anchor: 'middle', size: 11 });
    });
    node.appendChild(s);
    legend(node, d.series.concat(d.net ? [{ name: d.netName || '순합계', color: C.accent }] : []));
  }

  /* 워터폴: 전기 OP → 증감 요소 → 당기 OP */
  function waterfall(node, d) {
    const w = d.w || 640, h = d.h || 240, l = 48, r = 10, t = 20, b = 46;
    const s = svg(w, h);
    const steps = d.steps;
    let run = 0; const rows = [];
    const lo = d.min ?? 0;
    steps.forEach(st => {
      if (st.type === 'total') { rows.push({ ...st, a: lo, b2: st.v }); run = st.v; }
      else { rows.push({ ...st, a: run, b2: run + st.v }); run += st.v; }
    });
    const hi = Math.max(...rows.map(x => Math.max(x.a, x.b2))) * 1.08;
    const Y = v => t + ((hi - v) / (hi - lo)) * (h - t - b);
    [lo, (lo + hi) / 2, hi].forEach(v => { el('line', { x1: l, x2: w - r, y1: Y(v), y2: Y(v), stroke: C.grid }, s); txt(s, l - 6, Y(v) + 4, fmt(v), { anchor: 'end', size: 10 }); });
    const gw = (w - l - r) / rows.length, bw = gw * 0.56;
    rows.forEach((x, i) => {
      const bx = l + gw * i + (gw - bw) / 2;
      const top = Y(Math.max(x.a, x.b2)), bot = Y(Math.min(x.a, x.b2));
      const fill = x.type === 'total' ? C.ink : x.type === 'resid' ? '#fff' : x.v >= 0 ? C.accent : C.warn;
      el('rect', { x: bx, y: top, width: bw, height: Math.max(2, bot - top), fill, stroke: x.type === 'resid' ? C.mid : 'none', 'stroke-dasharray': x.type === 'resid' ? '4 3' : '' }, s);
      const lab = x.type === 'total' ? fmt(x.v) : (x.v > 0 ? '+' : '') + fmt(x.v);
      txt(s, bx + bw / 2, top - 6, lab, { anchor: 'middle', size: 11.5, fill: '#14181F', weight: 600 });
      x.name.split('\n').forEach((ln, k) => txt(s, bx + bw / 2, h - b + 16 + k * 13, ln, { anchor: 'middle', size: 11 }));
      if (i < rows.length - 1) {
        const nx = l + gw * (i + 1) + (gw - bw) / 2;
        el('line', { x1: bx + bw, x2: nx, y1: Y(x.b2), y2: Y(x.b2), stroke: C.mid, 'stroke-dasharray': '2 2' }, s);
      }
    });
    node.appendChild(s);
  }

  /* 만기 사다리: 구간별 누적 막대 + (선택) 평균 금리 점 */
  function ladder(node, d) {
    const w = d.w || 560, h = d.h || 220, l = 44, r = d.rate ? 40 : 10, t = 16, b = 36;
    const s = svg(w, h);
    const cats = d.cats;
    const tot = cats.map((_, i) => d.series.reduce((a, x) => a + (x.values[i] || 0), 0));
    const hi = Math.max(...tot) * 1.15;
    const Y = v => t + ((hi - v) / hi) * (h - t - b);
    [0, hi / 2, hi].forEach(v => { el('line', { x1: l, x2: w - r, y1: Y(v), y2: Y(v), stroke: C.grid }, s); txt(s, l - 6, Y(v) + 4, fmt(v), { anchor: 'end', size: 10 }); });
    const gw = (w - l - r) / cats.length, bw = gw * 0.58;
    cats.forEach((c, i) => {
      const x = l + gw * i + (gw - bw) / 2; let acc = 0;
      d.series.forEach(se => { const v = se.values[i] || 0; el('rect', { x, y: Y(acc + v), width: bw, height: Y(acc) - Y(acc + v), fill: se.color }, s); acc += v; });
      txt(s, x + bw / 2, Y(acc) - 5, fmt(acc), { anchor: 'middle', size: 10.5, fill: '#14181F', weight: 600 });
      txt(s, l + gw * i + gw / 2, h - b + 16, c, { anchor: 'middle', size: 10.5 });
      if (d.hl && d.hl.includes(i)) el('rect', { x: l + gw * i + 2, y: h - b + 22, width: gw - 4, height: 3, fill: C.caut }, s);
    });
    if (d.rate) {
      const rlo = Math.min(...d.rate) - 0.5, rhi = Math.max(...d.rate) + 0.5;
      const RY = v => t + ((rhi - v) / (rhi - rlo)) * (h - t - b);
      d.rate.forEach((v, i) => { const cx = l + gw * i + gw / 2; el('circle', { cx, cy: RY(v), r: 4, fill: '#fff', stroke: C.caut, 'stroke-width': 2 }, s); txt(s, cx + 7, RY(v) - 6, v.toFixed(1) + '%', { size: 10, fill: C.caut, weight: 600 }); });
      txt(s, w - 4, t + 4, '평균 금리', { anchor: 'end', size: 10, fill: C.caut });
    }
    node.appendChild(s);
    legend(node, d.series.concat(d.rate ? [{ name: '평균 금리(점)', color: C.caut }] : []));
  }

  /* 불릿: 값 막대 + 팀 가설 기준선 */
  function bullet(node, d) {
    const w = d.w || 320, h = 46, l = 0, r = 40;
    const s = svg(w, h);
    const X = v => l + (v / d.max) * (w - l - r);
    el('rect', { x: 0, y: 10, width: X(d.max), height: 18, fill: '#EEF0F2' }, s);
    if (d.band) el('rect', { x: X(d.band[0]), y: 10, width: X(d.band[1]) - X(d.band[0]), height: 18, fill: '#E2E5EA' }, s);
    el('rect', { x: 0, y: 14, width: X(d.value), height: 10, fill: d.color || C.ink }, s);
    if (d.prev != null) el('rect', { x: X(d.prev) - 1, y: 12, width: 2, height: 14, fill: C.mid }, s);
    el('line', { x1: X(d.ref), x2: X(d.ref), y1: 5, y2: 33, stroke: C.caut, 'stroke-width': 2, 'stroke-dasharray': '3 2' }, s);
    txt(s, X(d.ref), 44, d.refLabel, { anchor: 'middle', size: 10, fill: C.caut, weight: 600 });
    txt(s, X(d.value) + 6, 23, d.valueLabel, { size: 11, fill: '#14181F', weight: 700 });
    node.appendChild(s);
  }

  /* 라인: 연도 추이 + 기준선 */
  function line(node, d) {
    const w = d.w || 520, h = d.h || 200, l = 44, r = 14, t = 16, b = 32;
    const s = svg(w, h);
    const all = d.series.flatMap(x => x.values).filter(v => v != null).concat(d.ref ? [d.ref.v] : []);
    const lo = d.min ?? Math.min(...all) * 0.9, hi = d.max ?? Math.max(...all) * 1.1;
    const n = d.cats.length;
    const X = i => l + (i * (w - l - r)) / (n - 1);
    const Y = v => t + ((hi - v) / (hi - lo)) * (h - t - b);
    for (let i = 0; i <= 4; i++) { const v = lo + ((hi - lo) * i) / 4; el('line', { x1: l, x2: w - r, y1: Y(v), y2: Y(v), stroke: C.grid }, s); txt(s, l - 6, Y(v) + 4, fmt(v, d.dec ?? 1), { anchor: 'end', size: 10 }); }
    d.cats.forEach((c, i) => txt(s, X(i), h - b + 16, c, { anchor: 'middle', size: 11 }));
    if (d.ref) {
      el('line', { x1: l, x2: w - r, y1: Y(d.ref.v), y2: Y(d.ref.v), stroke: C.caut, 'stroke-width': 1.5, 'stroke-dasharray': '5 3' }, s);
      txt(s, w - r, Y(d.ref.v) - 5, d.ref.label, { anchor: 'end', size: 10, fill: C.caut, weight: 600 });
    }
    d.series.forEach(se => {
      let p = '';
      se.values.forEach((v, i) => { if (v == null) return; p += (p && se.values[i - 1] != null ? 'L' : 'M') + X(i) + ' ' + Y(v); });
      el('path', { d: p, fill: 'none', stroke: se.color, 'stroke-width': 2, 'stroke-dasharray': se.dash || '' }, s);
      se.values.forEach((v, i) => {
        if (v == null) { el('circle', { cx: X(i), cy: Y((lo + hi) / 2), r: 4, fill: '#fff', stroke: C.none, 'stroke-dasharray': '2 2' }, s); txt(s, X(i), Y((lo + hi) / 2) - 8, '자료 없음', { anchor: 'middle', size: 9.5, fill: C.none }); return; }
        el('circle', { cx: X(i), cy: Y(v), r: 3.5, fill: se.color }, s);
        if (se.labels) txt(s, X(i), Y(v) - 8, fmt(v, d.dec ?? 1) + (d.unit || ''), { anchor: 'middle', size: 10.5, fill: '#14181F', weight: 600 });
      });
    });
    node.appendChild(s);
    if (d.series.length > 1) legend(node, d.series);
  }

  /* 발산 막대: 변수 영향(설명용) */
  function diverge(node, d) {
    const w = d.w || 520, rowH = 30, l = d.l || 230, h = d.items.length * rowH + 24;
    const s = svg(w, h);
    const mx = Math.max(...d.items.map(x => Math.abs(x.v)));
    const mid = l + (w - l) / 2, half = (w - l) / 2 - 36;
    el('line', { x1: mid, x2: mid, y1: 0, y2: h - 18, stroke: C.mid }, s);
    d.items.forEach((it, i) => {
      const y = i * rowH + 6;
      txt(s, 0, y + 14, it.name, { size: 12, fill: '#14181F' });
      const bw = (Math.abs(it.v) / mx) * half;
      el('rect', { x: it.v >= 0 ? mid : mid - bw, y: y + 3, width: bw, height: 16, fill: it.v >= 0 ? C.ink : C.light }, s);
      txt(s, it.v >= 0 ? mid + bw + 6 : mid - bw - 6, y + 15, (it.v > 0 ? '+' : '') + it.v.toFixed(2), { size: 10.5, anchor: it.v >= 0 ? 'start' : 'end', fill: '#48505C' });
    });
    txt(s, mid - 8, h - 4, '← 확률을 낮춘 방향', { anchor: 'end', size: 10 });
    txt(s, mid + 8, h - 4, '확률을 높인 방향 →', { size: 10 });
    node.appendChild(s);
  }

  function legend(node, series) {
    const lg = document.createElement('div');
    lg.style.cssText = 'display:flex;gap:14px;flex-wrap:wrap;font-size:11.5px;color:#48505C;margin-top:4px';
    series.forEach(se => {
      const i = document.createElement('span');
      i.style.cssText = 'display:inline-flex;align-items:center;gap:6px';
      i.innerHTML = `<i style="width:10px;height:10px;background:${se.color};display:inline-block;border-radius:2px"></i>${se.name}`;
      lg.appendChild(i);
    });
    node.appendChild(lg);
  }

  const R = { spark, strip, bars, stack, waterfall, ladder, bullet, line, diverge };
  window.LS = { C };
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-chart]').forEach(n => {
      const d = n.getAttribute('data-src') ? window[n.getAttribute('data-src')] : JSON.parse(n.getAttribute('data-d'));
      const fn = R[n.getAttribute('data-chart')];
      if (fn) fn(n, d);
    });
  });
})();
