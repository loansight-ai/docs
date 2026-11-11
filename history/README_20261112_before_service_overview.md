# 이전 README · 2026.11.12 보관

# 최신 원문 · 2026.11.12

사용자가 확인한 로컬 docs 파일 기준입니다. 문서의 실제 개정 이력은 각 원문을 확인합니다.

| 문서 | 파일 |
| --- | --- |
| 기획안_v3.0.docx | [원문](docs/LoanSight_AI_기획안_v3.0.docx) |
| PRD_v1.0.docx | [원문](docs/LoanSight_AI_PRD_v1.0.docx) |
| 요구사항정의서_v1.0.xlsx | [원문](docs/LoanSight_AI_요구사항정의서_v1.0.xlsx) |
| 기능명세서_v1.0.xlsx | [원문](docs/LoanSight_AI_기능명세서_v1.0.xlsx) |
| WBS_v2.0.xlsx | [원문](docs/LoanSight_AI_WBS_v2.0.xlsx) |
| 화면설계서_v1.0.pdf | [원문](docs/LoanSight_AI_화면설계서_v1.0.pdf) |
| 통합테스트시나리오케이스_v1.1.xlsx | [원문](docs/LoanSight_AI_통합테스트시나리오케이스_v1.1.xlsx) |

[최종 제출 ZIP](https://drive.google.com/file/d/1VChZ5uohwFoxGgZ-MVCRA73DqE1ul92L/view?usp=drive_link) · [버전 및 해시](01-planning/version-manifest.json)

아래는 이전 게시 기록입니다. 기존 상세 Markdown의 v1.0 반영은 별도 검토 중이며, 원문을 우선합니다.

---

## 통합테스트 최신 문서 · 2026.11.05

통합테스트 **v1.1 / 웹 베타 v1.5.9b**: 127개 케이스, PASS103·FAIL14·BLOCKED10. 사용자 원래 기록과 기대 결과를 보존하고 실제 관찰·증빙·제한을 기록했습니다.

[테스트 문서·엑셀·증빙](05-testing/README.md) · [케이스별 결과](05-testing/test-cases.md)

---

# 현행 기획 문서 · 2026.11.04

기획안 v3.0 · 요구사항 v0.0.11 · 기능명세 v0.0.10 · PRD v0.0.9 · WBS v2.0.

[현행 문서·원문](01-planning/README.md) · [정합성 확인](01-planning/alignment-check.md)

개정 이력·현행 참조·시트를 정리했습니다. 기존 WBS 업무 기록은 보존했습니다.

---

아래는 이전 게시 기준과 기존 저장소 안내입니다. 최신 파일은 위 현행 문서 목록을 기준으로 확인합니다.

# 기획안 v3.0 연계 개정 · 2026.11.04

요구사항 v0.0.10 · 기능명세/PRD v0.0.9. 임대업 주석 추출·요약은 현행 제외. WBS·화면설계·테스트는 기존 버전을 유지합니다.

[기준과 범위](https://github.com/loansight-ai/docs/blob/main/01-planning/v3.0-alignment.md)

---

이하 이전 게시 기준입니다.

# 현재 기획안 v2.5 · 2026.11.04

[기획안 상세](https://github.com/loansight-ai/docs/blob/main/01-planning/proposal.md) · [변경 및 미확인 사항](https://github.com/loansight-ai/docs/blob/main/01-planning/plan-v2.5-review.md)

현재 웹 v1.5.3은 OFS 고정입니다. 우선·보조·조건부·관찰까지의 의미와 기준일 현황을 설명했습니다. 연계 PRD·요구사항·기능·WBS 정합성은 보완 중이며 아래 기존 버전은 당시 기록입니다.

---

# LoanSight AI

기업금융·여신심사 담당자를 위한 재무·공시·주석·위험징후 분석 지원 서비스입니다.

기획안 v2.3 · 요구사항 v0.0.7 · PRD/기능명세서 v0.0.6 · WBS v1.4

## 문서 개정 이력

| 개정일 | 변경 |
| --- | --- |
| 2026.10.28 | 이전 v2.2 연계본 보존 |
| 2026.10.29 | v2.3 통합 범위·징후 판정·CFS 우선. 사용자 지정 Notion 연결 2칸 보존. 화면설계서 유지. |

## 적용 기준

- 제조·건설·도소매·부동산 임대 4개 업종. 장비·물품 렌탈 제외.
- 연결(CFS) 우선, 없으면 별도(OFS) 전환·표시. 동일 추세에 회계 기준 혼합 금지.
- 상환재원·유동성/만기·재무구조·우발/부외·외부 평가·담보/회수 여력 6개 판단 관점.
- 경고·주의·관찰은 팀 가설과 담당자 확인 순서이며 공식 은행 등급이 아닙니다.
- 원문·기준일·추출/계산 상태·예측 제공/보류를 구분합니다.

## 최신 문서

| 문서 | 버전 | 상세 |
| --- | --- | --- |
| 기획안 | v2.3 | [기획안](01-planning/proposal.md) |
| PRD | v0.0.6 | [PRD](01-planning/prd.md) |
| 요구사항 | v0.0.7 | [요구사항](01-planning/requirements.md) |
| 기능명세서 | v0.0.6 | [기능](01-planning/functions.md) |
| WBS | v1.4 | [WBS](01-planning/wbs.md) |

현행 요구사항 37개·기능 35개·논리 화면 7개·미정 질문 18개·WBS 53개. 제외 ID는 이전 이력으로 보존합니다.

[원문·버전·해시](01-planning/README.md) · [v2.3 반영 점검](01-planning/v2.3-impact-check.md) · [정합성](01-planning/alignment-check.md)

## 팀과 연결

김동혁·김동민 데이터, 서종원 개발, 오준탁·최수인 기획.

[Notion 문서 허브](https://app.notion.com/p/40080be201ba8159ae7fcd1aebce0000) · [실행 코드](https://github.com/loansight-ai/code) · [팀 품질관리 자료](https://app.notion.com/p/40680be201ba81ddb717d75d409cde98)

## 화면설계서

사용자 지시대로 기존 v0.0.1과 보관 PDF·소스를 그대로 유지합니다. 이번 기획 개정이 실제 화면설계서 수정이나 구현 완료를 뜻하지 않습니다.

WBS v2.0 최종본: 사용자가 제공한 원문 53개 작업·담당·일정·진행을 반영했습니다. 완료 52개(100%)·보류 1개는 원문 기재 상태이며 독립 수행 검증 결과로 해석하지 않습니다. 원문에서 빠진 완료근거를 새로 만들지 않았습니다. 다른 기획 문서는 이번 WBS 최종본 반영에서 개정하지 않았습니다.
