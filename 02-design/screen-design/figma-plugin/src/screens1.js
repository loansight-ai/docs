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
