# 회의록 — 2026-10-29 · 위험징후·주석 추출·기획 개정

> 초안 · Slack 일일 요약
>
> 수집 구간: 2026-10-28 23:00 ~ 2026-10-29 23:00 (KST)
>
> 대화 참여자: 김동혁·김동민·서종원·오준탁·최수인·손현원 강사 · 검토자: 미정

## 💡 한눈에 보기

- **핵심 논의:** 업종별 위험징후와 주석 추출 기준, 데이터베이스 구축, 기획 문서 개정을 논의했다.
- **확정 결정:** 부방의 업종을 부동산임대업으로 분류한다고 공유했다.
- **다음 행동:** 업종 분류와 주석 추출 결과를 점검하고 회계 범위 및 모델 범위를 정리한다.

## ✅ 결정 사항

- 부방을 부동산임대업으로 분류한다고 공유했다. [근거](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793251312514009)

## 🎯 할 일

| 구분 | 할 일 | 담당자 | 기한 |
|---|---|---|---|
| 공유된 작업 | 개발 진행 | 서종원 | 미정 |
| 공유된 작업 | 데이터 분석 | 김동혁 | 미정 |
| 공유된 작업 | DB 구축과 데이터 현황 공유 | 김동민 | 미정 |
| 공유된 작업 | 주석 활용 방안 논의 | 오준탁·최수인 | 미정 |
| 검토 제안 | 업종 불일치와 주석 추출 기준을 점검 | 미정 | 미정 |

- [ ] 각 작업의 결과와 완료 기준을 관련 담당자와 확인한다. [작업 공유](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793236145411919) · [DB 피드백](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793262743686069) · [점검 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263212331039)

## 💬 안건별 논의

### 1. 기획안과 모델 범위 · 검토 중

- 기획안 v2.3은 기존 수정본을 통합하고 검증 기록·표본을 별도 관리하며 장비·물품 렌탈을 제외한다. 기업금융 담당자가 재무·주석 근거와 위험징후를 확인하는 서비스가 목적이다. 경고·주의·관찰 기준은 현직자 확인 전 팀 가설이다. [기획안 공유](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793266859620129) · 기획안 v2.3 §§1, 4-1
- 강사는 모델링을 필수로 전제하지 말고 업종별 주요 지표에 기반한 신호 분류를 먼저 진행하라고 제안했다. 반면 공유된 기획안과 PRD·요구사항·기능명세 초안에는 12개월 위험 사건 예측이 필수로 남아 있어 실제 구현 범위의 확인이 필요하다. [피드백](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793262743686069) · [PRD](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793270834653879)
- 요구사항 v0.0.7과 기능명세 v0.0.6은 v2.3의 징후 기준과 기능 범위를 반영한 검토 전 초안이다. 화면설계서 자체가 수정됐다는 뜻은 아니다. [요구사항](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793270869070839) · [기능명세](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793270904308079)

### 2. 주석 추출과 업종 지표 · 보완 제안

- 주석 추출 수정본 v0.0.2는 제목 일치만으로 놓치는 항목을 보완하기 위해 표준 주제의 본문 전체와 참조 주석을 검색하도록 제안한다. 추출됨·공시상 없음·주석 미기재·미검출을 구분하며 부정 문맥과 중복 합산, 원문·단위를 확인한다. 건설 PF·보증과 임대 담보 등 업종별 검색어를 보완한다. [수정본](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793241559538519) · 문서 공통 원칙 및 ①~③
- 주석 점검에서는 자료 설명과 집계를 대조하고 일부 연도 누락·항목 누락·중복 및 업종 불일치를 추가 확인할 사항으로 보고했다. 주석지도와 회사별 파일의 집계 차이도 확인이 필요하다. [점검 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263212331039) · [추출 기준 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263449244269)
- 업종별 지표 v0.0.3은 제조·도소매의 운전자본, 건설의 계약자산·PF, 부동산 임대의 이자 상환과 차환을 검토하는 기준을 제안한다. 문서의 상대 기준과 수치는 검증된 공식 판정 기준이 아니다. 자료에는 렌탈 설명도 있으나 현재 기획 범위에서는 제외한다. [지표 문서](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793262425097889) · 문서 §§1~4

### 3. 데이터 분석·DB·개발 · 진행 보고

- OFS 자료로 기초 탐색을 수행하고 연도별 가용성, 결측·중복·이상치 및 반복 관측을 검토했다고 공유했다. 변경된 업종 분류를 반영한 통계 검정은 재실행이 필요하다. [분석 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793262542280519)
- 렌탈 데이터 제외와 업종 변경·중복 제거, DB 연결 시도 및 계정 매핑 점검을 보고했다. 서비스용 DB 덤프는 작성자가 자신의 PC에서 복원했다고 보고했으며 독립적인 실행 검증은 하지 않았다. [DB 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263412449349) · [복원 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793255075550839)
- 기획안·PRD·명세는 연결재무제표 우선, 없으면 별도 전환을 기술한다. 이후 DB 규모와 구축 어려움을 이유로 OFS DB만 우선 구축하자는 제안이 공유되어 두 기준의 정합성은 미결이다. [제안](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793267851050349)
- 주석 근거 검색, 공시 기반 지표 계산과 주석 보완 기능을 구현했다고 개발자가 보고했다. 실제 동작과 품질은 별도 검증하지 않았다. [개발 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263239198679)

### 4. 발표 준비 · 안내

- 공유된 발표 안내 이미지에는 프로젝트 개요·설계·개발 내용·후기 구성 예시, 12쪽 이상 권고, 질의응답을 제외한 25분 내 발표 및 제출한 시연영상 사용 권고가 담겨 있다. 제출 후 발표자료·영상 수정 제한도 안내되어 있다. [안내 이미지](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793247155588199)

## ❓ 미결 사항

- CFS 우선 문서와 OFS DB 우선 제안의 적용 범위 및 관련 문서 정합성.
- 모델 구현 여부, 사건 라벨 확보와 제공 조건. 신호 기준과 주석 추출 수정본의 검증·적용 여부.
- 업종 불일치 기업과 주석 집계 차이, 비교 표본과 결측 처리 기준.

## 📎 참고 자료

- [관련 Issue](https://github.com/loansight-ai/docs/issues/43)
- [관련 PR](https://github.com/loansight-ai/docs/pull/44)
- [Notion 회의록](https://app.notion.com/p/40880be201ba8119a4cad9bcc4292d35)
- 처리 상태: 연결 PR의 병합 상태와 검증 기록 참고

<details>
<summary>회의 준비·안건</summary>

- 준비 자료: 해당 없음
- 안건: 위험징후 기준, 주석 추출, 기획·DB·개발, 발표 준비

</details>

<details>
<summary>원문·수집 정보</summary>

- 채널 메시지 4건, 댓글 23건. 채널 전체 및 49개 스레드 페이지 종료와 댓글 수 확인.
- 첨부 7건의 본문·표 또는 이미지를 확인했다. 외부 링크 및 DB 원자료의 실제 내용은 별도 확인하지 않았다.
- 동기화 키: slack:C0C8L1KGVN1:2026-10-29
- 공통 본문 SHA256: f1658dd676dfd1c31de51d93b1a164bee5d6cd6d0b485a278c0a259b711097ce

- [원문 1](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793262743686069)
- [원문 2](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793261383006479)
- [원문 3](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793247155588199)
- [원문 4](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793236145411919)
- [원문 5](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793262542280519)
- [원문 6](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263212331039)
- [원문 7](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263239198679)
- [원문 8](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263412449349)
- [원문 9](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263449244269)
- [원문 10](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793263615857129)
- [원문 11](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793236383042009)
- [원문 12](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793241559538519)
- [원문 13](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793249413394699)
- [원문 14](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793234310508279)
- [원문 15](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793267020784749)
- [원문 16](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793254420152549)
- [원문 17](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793249267432119)
- [원문 18](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793249287916509)
- [원문 19](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793251011366039)
- [원문 20](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793251312514009)
- [원문 21](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793255075550839)
- [원문 22](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793267851050349)
- [원문 23](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793262425097889)
- [원문 24](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793270904308079)
- [원문 25](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793270869070839)
- [원문 26](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793270834653879)
- [원문 27](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793266859620129)

</details>

<details>
<summary>작성·검토 기준</summary>

- 제안과 결정, 작성자의 보고와 독립 검증을 구분한다. 미확인 사항은 추정하지 않는다.
- Slack 참여자를 회의 참석자로 단정하지 않는다.

</details>

## 수동 검토 메모

검토자가 직접 기록합니다.
