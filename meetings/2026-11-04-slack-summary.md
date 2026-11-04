# 회의록 — 2026-11-04 · 최종 문서·연도별 분석·발표·제출 준비

> **초안 · 요약 검증 중 · 첨부 확인 한계** | Slack 일일 요약
>
> 수집: 2026-11-03 23:00 ~ 2026-11-04 23:00 (KST)
>
> 대화 참여자: 김동혁·김동민·서종원·오준탁·최수인·손현원 강사
>
> 실제 회의 참석 여부는 별도 · 검토자: 미정

## 💡 한눈에 보기

- **핵심 논의:** 기획·명세·WBS 최종본, 연도별 패턴 분석 전달, ERD 정정과 테스트 한계를 정리하고 발표·시연 준비를 진행했다.
- **확정 결정:** 기획안 v3.0, 기능명세·요구사항 v1.0, WBS v2.0을 최종본으로 공유했다. 시연 기업은 현대백화점으로 정했다.
- **다음 행동:** 최종 제출 파일·발표 내보내기·시연 음성을 점검하고, 문서와 구현의 범위·버전 차이를 확인한다.

## ✅ 결정 사항

| 결정·확인 기록 | 근거 | 후속 작업 |
|---|---|---|
| 기획안 v3.0·기능명세 v1.0·요구사항 v1.0·WBS v2.0 최종본 공유 | [기획안](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793760350827709) · [기능](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793760298675589) · [요구](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793769267183699) · [WBS](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793767874870359) | 문서 확정과 구현·배포·실제 검증 완료를 구분 |
| 시연 기업은 현대백화점으로 진행 | [확정 댓글](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793776263713239) | 이전 롯데쇼핑 제안을 대체해 대본·영상 점검 |
| 기술 스택 설명에 Slack 추가·“서버 정리중” 제거 승인 및 수정 완료 보고 | [요청](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793796445633499) · [승인](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793796580879159) · [완료 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793796608845199) | 실제 발표 파일 재확인. 댓글은 28번, 첨부 스크립트는 기술 스택을 29번으로 표기 |

## 🎯 할 일

| 구분 | 할 일 | 담당자 | 기한 |
|---|---|---|---|
| 배정 | 발표 자료 제작·최종 파일 점검 | 오준탁 | 미정 |
| 배정 | 발표 준비·리허설·예상 질문 답변 | 최수인 | 미정 |
| 배정 | 개발 파트 내용·서버 상태 정리 | 서종원 | 미정 |
| 배정 | 기획 문서 최신화·최종 산출물 취합 및 제출 확인 | 김동혁 | 11/04 밤 제출 권고 |
| 배정 | 현대백화점 시연 영상·음성 개선 | 김동민 | 미정 |
| 검토 제안 | 문서의 잔존 기준과 배포 버전·운영 DB 일치 확인 | 미정 | 미정 |
| 검토 제안 | 미실행·미조치 테스트와 PPT 내보내기 문제 재확인 | 미정 | 발표 전 |

- [ ] 완료 기준: 발표용 PC에서 글자·영상·시간을 확인하고 실제 제출 접수 근거를 남긴다. [업무 배정](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793750915168529) · [강사 피드백](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793779815974179)
- [ ] 검토 기준: 선택 연도·OFS·징후 판정·패턴·주석 출처가 문서와 운영 화면에서 일치하는지 기록한다. 관련 회의록 작업 Issue·PR은 아래 참고 자료에 연결한다.

## 💬 안건별 논의

### 1. 기획·요구사항·기능명세·WBS 개정 · 최종본 공유

- 기획안 v3.0과 PRD v0.0.9는 은행 기업금융·여신 담당자의 재무·현금흐름·주석·징후·패턴 검토를 지원하고 최종 판단은 담당자가 수행하는 범위를 설명한다. 제조·건설·도소매 3업종, OFS 고정, 선택 연도별 패턴 조회와 5축 레이더가 현행 기준이다.
- 기능명세 v0.0.9→v0.0.10→v1.0, 요구사항 v0.0.10→v0.0.11→v1.0은 개정 이력을 통합하고 출력·자료 없음·예외를 정리했다. PRD·명세의 현행 기준은 임대업 주석 추출·요약까지 제외하며 과거 연구를 보존한다.
- **잔존 충돌:** 기획안의 임대업 추출·필수 기능 문구, WBS 완료 기준의 CFS 전환 가능 문구, 일부 명세의 주석을 모델에 재사용한다는 과거 문구가 현행 범위와 어긋난다. 제목이 최종이어도 이 차이가 해소됐다고 단정하지 않는다.
- WBS v1.8→v2.0(Markdown·XLSX)은 작업·완료 기준·일정을 ID로 연결하며 기존 담당·진행 기록을 유지한다. 11/05 제출·발표도 “완료”로 표시하지만 11/04 대화에서 실제 발표 완료는 확인되지 않는다. 공유 드라이브 업로드 완료 보고와 교육 최종 제출 접수는 구분한다.
- 근거: 기획안 「초기 구현 범위·3·4-1·5·7·8」, PRD 「범위·연계와 범위 충돌」, 각 XLSX 「문서정보·개정이력·기능명세/요구사항·미정사항」, WBS 「작업 관리·완료 기준·일정」. [문서 개정 스레드](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793745954347349) · [기획안](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793760350827709) · [WBS](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793767874870359) · [업로드 보고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793781867884199)

### 2. 연도별 재무 패턴 전달 · 개발 검토본과 운영 구분

- v0.0.3은 연도별 지표 계산→위험징후→K-means·Isolation Forest 학습·저장→선택 연도 조회를 연결한 개발 검토본으로 소개됐다. v0.0.4는 이자비용 품질 연결 수정과 군집 안정성·실제 중앙값 설명을 보완했으나 기본 결과가 2025년뿐이었다. 이후 v0.0.5가 전체 연도 결과로 이를 대체한다고 보고했다.
- 읽은 기획안·PRD는 동일 연도·업종·지표 조합 안에서 5지표 모델/3지표 참고/보류를 구분하고, 작은 비교집단·불안정한 군집에는 보류 사유를 표시하는 설계를 설명한다. 이상도는 연체 확률이 아니며 군집 번호는 위험 순서가 아니다. 연도·모델 사이 백분위를 하나의 위험 순위로 합치지 않는다.
- 김동혁은 지표 대조·코드 테스트·연도별 API 확인을 통과했다고 보고했다. **ZIP 내부는 크기 제한으로 읽지 못했으며 이 실행에서 모델·테스트를 재실행하지 않았다.** 공유 시점에는 최신 운영 main 병합·배포·실제 브라우저 종단 검수와 별개라고 명시했다.
- 근거: 기획안 7절·PRD 「패턴·규모·갱신」 및 [v0.0.3](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793717418593789) · [v0.0.4](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793743225301889) · [v0.0.5](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793744242639839)

### 3. ERD 설명서 정정·시스템 흐름도 · 확인 범위 제한

- ERD 설명서2는 웹 배포용 SQLite의 기업·재무·계정 품질·주석·감사·사건·원문 관계를 설명한다. 작성자는 전달받은 DB·스키마와 커밋 37af312 코드를 대조해 기존 추정을 수정했다고 보고했다.
- 주요 정정은 OFS 고정, 웹 변환 때 계산한 업종 분포 지표와 요청 때 계산하는 기업 지표의 구분, 당시 패턴 화면의 저장 JSON 조회, 주석 payload를 통한 원문 연결이다. evidence의 화면 미사용, 주석 회계범위 미상 처리, 감사의견 범위와 보고서 연결 누락은 확인 과제로 남겼다.
- 이는 **첨부 설명서의 검증 보고**다. 검증자료 ZIP 내부·실제 운영 DB 동일성·화면 조작은 이번에 확인하지 않았다. 설명서의 37af312 상태를 이후 다년도 전달본·베타 v1.5.9에 그대로 적용하지 않는다.
- 서비스 흐름도 이미지는 자료 확보/부족 분기와 분석 제공/보류 분기를 다시 합류시켜 근거 확인·메모·담당자 판단으로 잇는다. 아키텍처 이미지는 수집→정제→오프라인 분석→서버·브라우저 표현 및 OpenDART·ECOS·Gemini 연결을 그린다. **수집용 DB를 SQLite로 적은 그림과 PostgreSQL 원본 설명의 차이는 발표 자료 정합성 확인 대상**이다.
- 근거: 설명서2 「개요·기업과 재무·화면과 테이블 연결·유의점」, [ERD 정정](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793718161372239) · [서비스 흐름도](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793767974599679) · [아키텍처 이미지](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793768249470449)

### 4. 통합 테스트 v0.0.7 · 환경·버전별 결과 분리

- XLSX는 기존 TS-LS-01~12 기록과 11/03 개발 환경의 웹 v1.4.5 추가 시험 TS-LS-13~23을 함께 보관한다. 검색·OFS 고정·상대 구간·업종 비교·패턴·뉴스·주석 원문·DB·성능·모바일 화면을 다룬다.
- 「v1.4.5 반영 확인」은 실데이터 예시 표기를 조치, 분포·범례 변경을 부분 반영으로 기록한다. 자동완성 시장 표기(D-032), 반복 요청의 자본잠식 제외 수 안내(D-033), 뉴스 실패 후 재시도 버튼(D-034), 챗봇과 타일의 중앙값 차이(D-035)가 남아 있다.
- 현금흐름 부호·차입금 누락·미확인/해당 없음·이자비용·지속 조건 등 기존 결함은 해당 추가 시험의 재검증 범위 밖으로 명시됐다. 결함 목록의 “미조치”와 이후 반영 확인의 “조치/부분/미확인”을 버전 없이 합치지 않는다.
- RSS 실수집, DART 원문 대조, OpenDART 우선·DB 보충, 새 덤프 갱신, 운영 서버 속도는 미실행이다. 자료의 PASS를 현재 운영 v1.5.9 전체 검증으로 확대하지 않는다. 내장 이미지 3개는 작성 가이드·예제이며 서비스 시험 증거로 집계하지 않았다.
- 근거: [공유 댓글](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793772763972159) · XLSX 「테스트 요약·20261103 결함 목록·20261103 v1.4.5 반영 확인·TS-LS-13~23」

### 5. 현대백화점 시연·음성 개선·발표 스크립트 · 준비 중

- 시연 대본은 현대백화점 2025 사업보고서·OFS·베타 v1.5.9 기준으로 검색→재무 요약→실적·현금흐름→차입 만기·주석→패턴→체크·메모를 약 5분으로 구성한다. 숫자는 화면 표시값이며 DART 원문 전체 대조 전, 촬영 직전 재확인 대상으로 적었다. 기업별 수치·원자료 행은 회의록에 전재하지 않는다.
- 영상은 최초본→음성개선→v3→v4 남성 음성으로 공유됐다. 김동민은 내레이션 부자연스러움과 간헐적으로 느려지는 음성을 보고했다. v4 SRT는 같은 시연 흐름의 자막이며 마지막 시각은 약 5분 5초다. **자막을 읽은 것과 영상·음성 품질 확인은 다르며 MP4 4건은 미열람**이다.
- PPT 35장 기준 발표 스크립트는 최수인 발표, 협업→문제→데이터→구현→한계·확장을 구성한다. 첨부는 한글 내보내기 손상, 목표 시간을 넘는 배분, 시연 기업·대상 수·목차 태그·DB 설명·경고 0/미평가·지속 경고 표현 차이를 점검 사항으로 적었다. 실제 PPT/PDF 파일은 이번 구간에 첨부되지 않아 그 현상을 직접 확인하지 않았다.
- 근거: [시연 대본](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793778556144059) · [영상 개선](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792045716229) · [v4·자막](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793800220897699) · [발표 스크립트](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793793064887139)

### 6. 마무리 역할·제출·운영 · 피드백과 진행 보고

- 강사는 11/04 밤 안에 최종본을 제출하고, 기본 산출물 외 기획·QA·분석 코드까지 팀장이 확인하며, 서비스와 과정을 명확히 설명하라고 요청했다. 치명적인 오류 외 변경은 시연 안정성을 고려해 신중히 하고 발표·업로드·질의응답·서버 점검에 집중하도록 안내했다.
- 수행일지에는 김동혁의 분석·문서·대본·제출 폴더 정리, 서종원의 주석 요약·업종 챗봇·코드 통합·도식화, 최수인의 스크립트·PPT 수정, 오준탁의 연도별 결과·OFS·뉴스·최적화·테스트·백업 작업이 보고됐다. 속도 개선·복원 테스트·배포 완료는 **참여자의 보고**이며 이번 회의록 실행에서 독립 확인하지 않았다.
- 웹 디자인 스레드에 Toss 디자인 참고 링크가 공유됐다. 외부 페이지와 발표 편집 링크는 자동 열람하지 않았다.
- 근거: [마무리 배정](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793750915168529) · [강사 피드백](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793779815974179) · [수행일지](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793777958131609) · [디자인 참고](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793752985005179)

## ❓ 미결 사항

- 최종 문서의 임대업·CFS·주석/모델 입력 잔존 문구, 지속 경고와 미평가 표시, 발표 슬라이드 번호·DB 설명을 맞출 필요가 있다.
- 전달본·설명서·시험 문서·운영 버전은 기준 시점이 다르다. 운영 DB와 제공 ZIP의 동일성, 최신 운영 배포·종단 검수 및 남은 결함의 재시험 결과는 미확인이다.
- WBS의 제출·발표 완료 표기와 실제 접수·행사 완료를 구분한다. 11/04 공유 드라이브 업로드 보고만으로 교육 제출 접수까지 확정하지 않는다.
- 영상 품질과 PPT/PDF 한글 표시·시간 배분의 실제 수정 결과는 추가 확인이 필요하다. 담당자·구체적 재점검 시점은 명시된 배정 외 미정이다.

## 📎 참고 자료

- [관련 Issue](https://github.com/loansight-ai/docs/issues/63)
- 관련 PR: 생성 후 연결
- [Notion 회의록](https://app.notion.com/p/40e80be201ba81c281f7d777ad83f4cc)
- [GitHub 브랜치 회의록](https://github.com/loansight-ai/docs/blob/docs/63-slack-summary-2026-11-04/meetings/2026-11-04-slack-summary.md)
- 처리 상태: 작성 중·검증 중

<details>
<summary>회의 준비·안건</summary>

- 준비 자료: 이 구간에서 공유한 기획·명세·WBS·테스트·ERD·흐름도·대본·자막. 별도 사전 준비 자료 지정은 없음.
- 안건: 최종 문서·패턴 전달·ERD·QA·발표·제출.
</details>

<details>
<summary>원문·수집 정보와 첨부 확인 한계</summary>

- 수집: 2026-11-03 23:00 이상~2026-11-04 23:00 미만(KST)
- 채널 전체 131개 부모·2페이지, 스레드 77개를 끝까지 조회하고 댓글 수를 대조했다. 구간 내 메시지 9개·댓글 53개, 중복 제거 합계 62개다.
- 첨부 26건 중 18건의 본문·표를 추출하고 논의 관련 절·개정 차이·이미지를 검토했다. 문서 전체의 모든 주장·수치·행을 독립 검증한 것은 아니다. 테스트 문서의 과거 기록·예제와 현행 결과를 구분했다.
- 다음 8건은 크기 제한으로 내부 미확인이다. 영상은 시청하지 않았고 ZIP의 원자료·코드·검증 결과를 직접 확인하지 않았다.

| 미열람 파일 | 크기 | 확인 한계 |
|---|---|---|
| LoanSight_ERD_검증자료_37af312.zip | 43.5 MB | 10MB 제한·2회 실패, 내부 미확인 |
| LoanSight_AI_시연영상_v1.5.9.mp4 | 25.2 MB | 10MB 제한·2회 실패, 내부 미확인 |
| LoanSight_AI_시연영상_v1.5.9_음성개선.mp4 | 26.7 MB | 10MB 제한·2회 실패, 내부 미확인 |
| LoanSight_AI_시연영상_v1.5.9_v3.mp4 | 27.1 MB | 10MB 제한·2회 실패, 내부 미확인 |
| LoanSight_AI_시연영상_v1.5.9_v4_남성.mp4 | 27.8 MB | 10MB 제한·2회 실패, 내부 미확인 |
| LoanSight_AI_연도별분석_개발전달_v0.0.3_20261103.zip | 129.6 MB | 10MB 제한·2회 실패, 내부 미확인 |
| LoanSight_AI_2025재학습_군집설명_개발전달_v0.0.4_20261104.zip | 61.2 MB | 10MB 제한·2회 실패, 내부 미확인 |
| LoanSight_AI_2016-2025_전체연도_개발전달_v0.0.5_20261104.zip | 172.6 MB | 10MB 제한·2회 실패, 내부 미확인 |

- 동기화 키: slack:C0C8L1KGVN1:2026-11-04
- 공통 본문 SHA256: da22f7e1894ef0c4876a7c9b7731cf93cc84e9cb59fe731452effb0928f1627d
- 관련 요구·기능: N-R16/19/23/32/38~43, N-F15/18/20/30/36~41. 문서 표기이며 구현 완료 뜻은 아님.
- 예전 부모는 맥락이며 구간 밖 댓글은 이번 논의로 집계하지 않았다. 원문 전체·원자료·개인 연락처는 게시하지 않았다.

- [1793793064.887139](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793793064887139)
- [1793779815.974179](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793779815974179)
- [1793777958.131609](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793777958131609)
- [1793776122.862269](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793776122862269)
- [1793768313.186609](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793768313186609)
- [1793767968.127659](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793767968127659)
- [1793752985.005179](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793752985005179)
- [1793750915.168529](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793750915168529)
- [1793722968.575479](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793722968575479)
- [1793796445.633499](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793796445633499)
- [1793796580.879159](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793796580879159)
- [1793796608.845199](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793796608845199)
- [1793779626.181929](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793779626181929)
- [1793779957.143139](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793779957143139)
- [1793780479.463289](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793780479463289)
- [1793781035.673569](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793781035673569)
- [1793781867.884199](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793781867884199)
- [1793776263.713239](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793776263713239)
- [1793767974.599679](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793767974599679)
- [1793753009.259429](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793753009259429)
- [1793753017.150619](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793753017150619)
- [1793714992.602319](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793714992602319)
- [1793718161.372239](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793718161372239)
- [1793768249.470449](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793768249470449)
- [1793740148.392049](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793740148392049)
- [1793776172.982769](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793776172982769)
- [1793778556.144059](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793778556144059)
- [1793784819.708729](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793784819708729)
- [1793784851.261869](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793784851261869)
- [1793784908.220709](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793784908220709)
- [1793789725.638449](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793789725638449)
- [1793789853.126039](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793789853126039)
- [1793790092.676979](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793790092676979)
- [1793791243.960319](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793791243960319)
- [1793792045.716229](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792045716229)
- [1793792349.354459](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792349354459)
- [1793792352.174869](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792352174869)
- [1793792362.527299](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792362527299)
- [1793792578.481169](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792578481169)
- [1793792589.181409](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792589181409)
- [1793792637.988229](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792637988229)
- [1793792686.889789](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792686889789)
- [1793792760.969339](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793792760969339)
- [1793796311.142349](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793796311142349)
- [1793800220.897699](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793800220897699)
- [1793800272.342349](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793800272342349)
- [1793800279.007549](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793800279007549)
- [1793717418.593789](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793717418593789)
- [1793743225.301889](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793743225301889)
- [1793744242.639839](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793744242639839)
- [1793772763.972159](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793772763972159)
- [1793759076.129269](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793759076129269)
- [1793767874.870359](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793767874870359)
- [1793745961.531009](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793745961531009)
- [1793759053.646809](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793759053646809)
- [1793759226.925029](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793759226925029)
- [1793760298.675589](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793760298675589)
- [1793745954.347349](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793745954347349)
- [1793759067.440899](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793759067440899)
- [1793769267.183699](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793769267183699)
- [1793745968.071829](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793745968071829)
- [1793760350.827709](https://kb-bridge12.slack.com/archives/C0C8L1KGVN1/p1793760350827709)
</details>

<details>
<summary>작성·검토 기준</summary>

- Slack 대화 참여자를 실제 회의 참석자로 단정하지 않는다.
- 문서·참여자의 보고, 팀 결정, 독립 검증과 한계를 구분한다.
- 원자료 전체 열람과 대화 수집·요약 검증을 구분한다. 외부 링크·운영 서비스는 별도 검증하지 않았다.
- 미정 담당·기한을 임의로 배정하지 않고 사람의 수정과 수동 메모를 보존한다.
</details>

## 수동 검토 메모

검토자가 직접 기록합니다.
