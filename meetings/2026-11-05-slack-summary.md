# 회의록 — 2026-11-05 · 최종 발표·시연·예상 질의응답

> **초안 · 첨부 확인 한계**
>
> 수집 구간 2026-11-04 23:00 ~ 2026-11-05 23:00 KST
>
> 대화 참여자 김동혁·김동민·서종원·오준탁·최수인·손현원 강사
>
> 기록 구분 Slack 일일 요약 · 검토자 미정

## 💡 한눈에 보기

- **핵심 논의** 최종 발표 자료와 리허설, 현대백화점 시연, 서비스 차별화와 검증 한계를 정리했다.
- **확정 결정** 화면설계서 v1.0 확정을 공유했다. 최종 발표 PDF와 대본의 쪽 번호 차이는 확인이 필요하다.
- **다음 행동** 발표용 번호와 재생본을 맞추고, 화면·테스트·발표 자료의 불일치를 원문과 대조한다.

## ✅ 결정 사항

| 결정 | 근거 | 후속 작업 |
|---|---|---|
| 화면설계서 v1.0 최종본 확정 공유 | [공유 댓글](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793807544234489) | 본문은 용량 제한으로 미확인 |
| 411호 리허설 안내 | [강사 안내](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793842207144869) | 리허설 실시 여부는 미확인 |

## 🎯 할 일

| 구분 | 할 일 | 담당자 | 기한 |
|---|---|---|---|
| 요청 | 최종 발표 자료와 대본을 함께 확인하고 발표자를 지원 | 김동민·서종원·오준탁 | 발표 준비 중 |
| 검토 제안 | 시연 버전 표기, 음수 축 잘림, 재생 속도 및 짧은 직접 시연 점검 | 미정 | 미정 |
| 검토 제안 | 차입금 차이와 테스트 실패·차단 항목을 원문 및 화면과 대조 | 미정 | 미정 |

- [ ] 발표용 자료의 쪽 번호와 영상 버전을 대조하고 영상에서 빠진 기능의 시연 여부를 기록한다. [지원 요청](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793831140525519) · [시연 검토](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793807517631399)
- [ ] 차입금 차이의 원천 보고서·계정 매핑과 테스트 결과를 구분해 기록한다. [QA 자료](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793850256897229) · [테스트 문서](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793824031016249)

## 💬 안건별 논의

### 최종 발표 자료와 시연

- 최종발표 PDF는 45쪽이다. 17쪽에 시연 안내, 18쪽에 별도 시연 화면, 19쪽에 데이터 장 표지, 45쪽에 마무리가 있다. 44장 기준 대본은 시연 다음 장부터 한 쪽씩 어긋난다. 대본은 최수인 발표를 기준으로 검증·모델링 설명을 쉽게 풀고 ERD·아키텍처·협업을 부록에 배치했다. [최종발표 PDF](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793830295973769) · [44장 대본](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793831140525519)
- PDF 5~17쪽은 여신 담당자의 근거 탐색과 기록 부담을 다루고, 별도재무 기준의 재무·실적 변동·주석·징후·패턴 화면에서 검토 메모로 이어지는 흐름을 보여준다. 20~29쪽은 공시 수집, 표본 분리, 주석 보충값 대조, 업종별 지표와 비지도 분석을 설명한다. 34~37쪽은 연체 라벨 부족, 표본 한계, 확장 방향을 다룬다. [발표 자료](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793830295973769)
- 댓글에서는 1.5배 재생과 챗봇·추세 전환 효과의 짧은 직접 시연을 제안했다. 이후 공유된 영상 파일명은 1.25배속이다. 버전 표기 차이가 제기됐고, 캡처에서는 음수 현금전환주기 점이 차트 왼쪽에서 잘린 것을 확인했다. 실제 영상 재생과 수정 완료는 미확인이다. [시연 제안](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793806882205519) · [화면 캡처](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793807517631399) · [영상 공유](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793816501831139)

### 예상 질의응답과 검증 범위

- 팀은 여신 담당자가 상환재원·만기·우발부채를 공시 근거와 함께 확인하는 점을 차별화로 설명했다. 동종업체 비교 기준의 일관성을 위해 수집·정제·분석을 묶어 갱신하며, 현재 스크립트는 필요 시 수동 실행한다고 답했다. 예약 갱신은 가능성으로 언급됐다. [차별화 답변](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793853239403349) · [갱신 답변](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793854226966999)
- QA PDF 11쪽은 원천 수집 집계, 3업종 대상, 재무 및 주석 확보 표본을 구분하도록 안내한다. 현대백화점 시연 영상과 제출 앱에서 리스 제외 차입금 표시가 달랐다는 문서 보고가 있으며 원인은 미확인이다. 현금전환주기가 음수인 사례는 고객 수납과 거래처 정산 시점 차이로 설명하고 매출 추세와 영업현금흐름을 함께 보자는 답변이 있었다. [QA PDF Q61~65](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793850256897229) · [표본과 사례 답변](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793855107915809) · [현금전환주기 답변](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793856150823849)
- 위험징후는 자료 확인, 절대 조건, 업종 상대 위치를 나눠 설명했다. 재표집은 기준의 안정성 점검에 쓰였고 실제 연체 예측력은 미검증이다. 사건 경고와 3년 지속 조건은 코드 분기, 화면 표시, 기업별 원문 검증을 구분해야 한다. [판정 기준 답변](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793856071443609) · [QA PDF Q62](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793850256897229)

### 통합 테스트 v1.1

- 웹 베타 v1.5.9b 시험 문서는 24개 시나리오·127개 케이스를 기존 기대값으로 재판정했다. 이번 결과는 PASS 103, FAIL 14, BLOCKED 10이며 과거 결과는 별도 열에 보존했다. 시험 문서의 집계이며 운영 환경 재시험은 미실시다.
- D-041~044는 도소매 현금전환주기 분해 차트와 추이 차이, 기대 버전 잔존, 버튼 높이 차이, CAPEX·감가상각 자료 상태 공란이다. 기대값 변경이 필요한 경우와 화면 표시 문제를 구분한다. [통합테스트 XLSX의 케이스·결함관리 시트](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793824031016249)

## ❓ 미결 사항

- 발표 자료와 대본의 최종 번호·재생본, 시연 중 추가 기능 사용 여부, 실제 제출·발표 완료는 확인이 필요하다.
- 차입금 차이의 원인, 사건 경고 및 지속 조건의 실제 적용 범위, 테스트 실패·차단 항목의 해소 여부는 미확인이다.

## 📎 참고 자료

- [관련 Issue](https://github.com/loansight-ai/docs/issues/67)
- 관련 PR 연결 대기
- [Notion 회의록](https://app.notion.com/p/41080be201ba81d6bf59e4ea30229cbb)

<details>
<summary>회의 준비·안건·원문·수집 정보</summary>

- 준비 자료와 안건은 최종발표 PDF, 44장 대본, QA PDF, 시연 검토 및 통합테스트 문서다.
- 수집 구간은 2026-11-04 23:00 이상, 2026-11-05 23:00 미만 KST다.
- 채널 2페이지·메시지 137개와 스레드 79개의 전체 댓글을 조회해 페이지 종료와 댓글 수를 대조했다. 구간 내 메시지 6개·댓글 27개를 중복 제거해 반영했다.
- 첨부 8건 중 발표 PDF·대본·QA PDF·XLSX·화면 캡처의 논의 관련 본문과 표·이미지를 검토했다. 원문에 적힌 시험과 배포 결과는 해당 자료의 보고 범위다.
- 최종발표 v1.0 PPTX(64.0MB), 시연영상 v1.0 MP4(58.2MB), 화면설계서 v1.0 PDF(16.5MB)는 각 2회 조회했으나 10MB 제한으로 내부 미확인이다. [PPTX](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793830295973769) · [MP4](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793816501831139) · [설계 PDF](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793807544234489)
- 동기화 키 slack:C0C8L1KGVN1:2026-11-05
- 구간 밖 댓글은 배경 맥락으로만 확인했다. 합의·제안·보고를 구분하고 첨부별 확인 한계를 표시했다.

- [1793850249.472529](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793850249472529)
- [1793842207.144869](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793842207144869)
- [1793831140.525519](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793831140525519)
- [1793831095.435359](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793831095435359)
- [1793830308.508379](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793830308508379)
- [1793830295.973769](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793830295973769)
- [1793850256.897229](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793850256897229)
- [1793853042.508189](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793853042508189)
- [1793853239.403349](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793853239403349)
- [1793854226.966999](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793854226966999)
- [1793855107.915809](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793855107915809)
- [1793856071.443609](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793856071443609)
- [1793856150.823849](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793856150823849)
- [1793831152.242559](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793831152242559)
- [1793802327.164129](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793802327164129)
- [1793805368.037869](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793805368037869)
- [1793805664.452329](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793805664452329)
- [1793806482.909909](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793806482909909)
- [1793806509.560679](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793806509560679)
- [1793806882.205519](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793806882205519)
- [1793806909.820959](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793806909820959)
- [1793807171.443509](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793807171443509)
- [1793807517.631399](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793807517631399)
- [1793808198.922909](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793808198922909)
- [1793808301.770999](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793808301770999)
- [1793808729.445649](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793808729445649)
- [1793808777.242069](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793808777242069)
- [1793808778.510399](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793808778510399)
- [1793811017.017749](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793811017017749)
- [1793811029.281769](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793811029281769)
- [1793816501.831139](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793816501831139)
- [1793824031.016249](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793824031016249)
- [1793807544.234489](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793807544234489)
- 공통 본문 SHA256 7aacdcaa03799d8dc2da25d0b6ec5bdb00ef7a7226b440451dffe6bcf2f3b504

</details>

## 수동 검토 메모

검토자가 직접 기록합니다.
