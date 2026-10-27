/* LoanSight AI 화면 설계서 — 문서 머리글과 앱 셸(상단 바·좌측 내비) 주입 */
(function () {
  const NAV = [
    ['S01', '기업·업종 선택', 's01.html', ''],
    ['S02', '핵심 재무 요약', 's02.html', ''],
    ['S03', '실적 변동·현금흐름', 's03.html', ''],
    ['S04', '주석·위험징후', 's04.html', '주의 2'],
    ['S05', '위험 사건 예측', 's05.html', '보류'],
    ['S06', '관련 뉴스', 's06.html', '3건'],
    ['S07', '체크·검토 메모', 's07.html', '미확인 6'],
  ];
  const DEFAULT_CTX = { co: '한결정밀(주)', ind: '제조 · C29 기타 기계', rpt: '2025 사업보고서', basis: '연결', date: '2026.03.18 공시' };

  function head(h) {
    const d = h.dataset;
    h.innerHTML = `
      <div class="brand">LoanSight AI<span>화면 설계서 v0.0.1 · 2026.10.24</span></div>
      <div class="title"><b>${d.id}</b>${d.name}</div>
      <div class="meta">관련 기능<strong>${d.f || '–'}</strong></div>
      <div class="meta">관련 요구<strong>${d.r || '–'}</strong></div>
      <div class="meta">작성<strong>4조참치</strong></div>
      <div class="meta">페이지<strong>${d.p}</strong></div>`;
  }

  function app(a) {
    const active = a.dataset.active;
    const ctx = Object.assign({}, DEFAULT_CTX, a.dataset.ctx ? JSON.parse(a.dataset.ctx) : {});
    const main = a.querySelector('.main');
    const top = document.createElement('div');
    top.className = 'topbar';
    top.innerHTML = active === 'S01' && !a.dataset.ctx
      ? `<div class="wordmark">LoanSight <span>AI</span></div><div class="ctx"><div><small>검토 대상</small><b class="muted">기업을 선택하세요</b></div></div><div class="spacer"></div><div class="user">기업금융부 · 담당자</div>`
      : `<div class="wordmark">LoanSight <span>AI</span></div>
        <div class="ctx">
          <div><small>기업</small><b>${ctx.co}</b></div>
          <div><small>적용 업종</small><b>${ctx.ind}</b></div>
          <div><small>기준 보고서</small><b>${ctx.rpt}</b></div>
          <div><small>회계 범위</small><b>${ctx.basis}</b></div>
          <div><small>기준일</small><b>${ctx.date}</b></div>
        </div>
        <div class="spacer"></div>
        <button class="btn sm">기업 변경</button>
        <div class="user">기업금융부 · 담당자</div>`;
    const shell = document.createElement('div');
    shell.className = 'shell';
    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.innerHTML = '<div class="grp">검토 흐름</div>' +
      NAV.map(([id, name, href, c]) => `<a href="${href}" class="${id === active ? 'on' : ''}">${name}<span class="c">${c}</span></a>`).join('') +
      `<div class="grp">검증·운영</div><a href="s08.html" class="${active === 'S08' ? 'on' : ''}">검증 기록<span class="c">구성안</span></a>
       <div class="foot">공시 기반 확인 지원 도구입니다. 여신 승인·거절, 내부 등급, 자산건전성 분류를 수행하지 않습니다.</div>`;
    a.innerHTML = '';
    a.appendChild(top);
    shell.appendChild(nav);
    shell.appendChild(main);
    a.appendChild(shell);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.doc-head[data-id]').forEach(head);
    document.querySelectorAll('.app[data-active]').forEach(app);
  });
})();
