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
