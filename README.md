# LoanSight AI

**기업 공시를 바탕으로 재무와 상환위험 징후를 살펴보는 여신 검토 지원 서비스**

LoanSight AI는 기업금융·여신심사 담당자가 흩어진 재무 수치와 공시 원문을 한 흐름에서 확인하고, 추가로 검토할 사항을 정리하도록 돕습니다.

## 이런 문제를 해결합니다

기업을 검토할 때 재무제표, 현금흐름, 주석과 뉴스를 각각 찾아 비교해야 합니다. 이 서비스는 수치의 변화와 관련 근거를 함께 보여 주어 담당자의 자료 탐색과 확인을 지원합니다.

## 주요 기능

| 기능 | 확인할 내용 |
| --- | --- |
| 기업 검색 | 기업·분석 연도·업종과 공시 자료 기준 선택 |
| 핵심 재무 요약 | 주요 재무지표와 업종 내 비교 |
| 실적 변동·현금흐름 | 매출·원가·판관비 변화와 현금흐름 |
| 주석·위험징후 | 지표별 징후와 관련 공시 원문·주석 |
| 재무 패턴 분석 | 비교 집단 내 재무 패턴과 이상도 |
| 관련 뉴스·검토 메모 | 관련 기사와 담당자의 확인 사항 |

기획 기준 대상은 **제조·건설·도소매**이며 별도재무제표(OFS)를 사용합니다. 이상도와 군집은 참고 정보로, 연체확률이나 기업의 위험 순위를 뜻하지 않습니다. 자료가 없거나 비교하기 어려운 경우에는 해당 상태를 구분합니다.

## 데이터와 판단 범위

OpenDART 공시·재무제표와 주석을 바탕으로 분석하며, 확보된 내부 정제 데이터와 외부 통계는 출처와 기준을 구분해 보완합니다. 수치와 원문을 확인하는 도구로, 여신 승인·거절이나 내부 신용등급을 대신하지 않습니다. AI 요약과 위험징후는 담당자가 원문과 함께 검토해야 합니다.

## 시작하기

- [웹 서비스](https://loansight-ai-2sb2.onrender.com/) · 접속 환경과 제공 상태는 변할 수 있습니다.
- [실행 코드와 설치 안내](https://github.com/loansight-ai/code)
- [Notion 프로젝트 문서](https://app.notion.com/p/40080be201ba8159ae7fcd1aebce0000)

## 최신 기획 문서

| 문서 | 버전 | 원문 |
| --- | --- | --- |
| 기획안 | v3.0 | [DOCX](docs/LoanSight_AI_기획안_v3.0.docx) |
| PRD | v1.0 | [DOCX](docs/LoanSight_AI_PRD_v1.0.docx) |
| 요구사항 정의서 | v1.0 | [XLSX](docs/LoanSight_AI_요구사항정의서_v1.0.xlsx) |
| 기능 명세서 | v1.0 | [XLSX](docs/LoanSight_AI_기능명세서_v1.0.xlsx) |
| WBS | v2.0 | [XLSX](docs/LoanSight_AI_WBS_v2.0.xlsx) |
| 화면설계서 | v1.0 | [PDF](docs/LoanSight_AI_화면설계서_v1.0.pdf) |
| 통합테스트 시나리오·케이스 | v1.1 | [XLSX](docs/LoanSight_AI_통합테스트시나리오케이스_v1.1.xlsx) |

[상세 문서와 버전](01-planning/README.md) · [테스트 상세](05-testing/README.md) · [최종 제출본](https://drive.google.com/file/d/1VChZ5uohwFoxGgZ-MVCRA73DqE1ul92L/view?usp=drive_link) · [이전 README 기록](history/README_20261112_before_service_overview.md)

## 팀

KB Bridge 4조참치: 김동혁·김동민(데이터), 서종원(개발), 오준탁·최수인(기획).
