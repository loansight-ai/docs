# LoanSight AI

제조·건설·도소매·부동산 임대 4개 업종의 재무·공시를 연결해 기업금융 담당자의 검토를 돕는다. 장비·물품 렌탈은 제외한다. OFS가 기본이며 CFS는 구분된 비교 자료다. 정량 징후 → 관련 주석 → 원인 후보 → 원문 근거 → 추가 질문으로 연결한다. 공식 여신 판단·내부 등급은 담당자가 수행한다.

## 문서 기준과 개정 이력

기획안 v2.2 · 요구사항 v0.0.6 · PRD/기능명세서 v0.0.5 · WBS v1.3 · 2026.10.28 · 검토·승인 미정

| 개정일 | 변경 |
| --- | --- |
| 2026.10.27 | 기획안 v2.1·요구사항 파일 v0.0.5·WBS v1.2 공유 |
| 2026.10.28 | v2.1 누락 보완·서비스와 팀 내부 관리 분리·문서별 개정·수식 보정 |

## 현행 산출물

| 문서 | 버전 | 상세 |
| --- | --- | --- |
| 기획안 | v2.2 | [기획안](01-planning/proposal.md) |
| 요구사항 | v0.0.6 | [요구사항](01-planning/requirements.md) |
| PRD | v0.0.5 | [PRD](01-planning/prd.md) |
| 기능명세서 | v0.0.5 | [기능](01-planning/functions.md) |
| WBS | v1.3 | [작업](01-planning/wbs.md) |

[원문 파일·해시·정합성](01-planning/README.md) · [v2.1 반영 점검](01-planning/v2.1-impact-check.md)

## 서비스 흐름

기업/기간 선택 → 핵심 재무 → 변동/현금흐름 → 개별·복합 위험과 주석 근거 → 예측 제공/보류 → 뉴스 → 담당자 체크·메모

판단 관점 10개·11개 보완 산식·23개 위험 후보·복합 위험 7유형·타임라인/매트릭스와 주석 자동 연결을 계획한다. 가설 임계값·자료 미확보·모델 제공 조건은 미정 상태를 유지한다.

요구사항 38개·기능 37개·화면 7개·미정 18개·WBS 55개다. 문서 개정은 구현 완료가 아니다.

## 팀과 개발 연결

KB Bridge 4조참치: 김동혁·김동민(데이터), 서종원(개발), 오준탁·최수인(기획).

[실행 코드](https://github.com/loansight-ai/code) · [Notion 문서 허브](https://app.notion.com/p/40080be201ba8159ae7fcd1aebce0000) · [화면 설계](02-design/README.md)

팀 품질관리 자료는 서비스 화면에서 분리해 [별도 Notion 페이지](https://app.notion.com/p/40680be201ba81ddb717d75d409cde98)에서 관리한다.

## 문서 목차

- [기획 산출물](01-planning/README.md)
- [설계 문서](02-design/README.md)
- [수행일지](03-daily-logs/README.md)
- [이슈 기록](04-issue-logs/README.md)
- [내부 품질관리 안내](05-testing/test-cases.md)
- [발표](06-presentation/README.md)
- [제출](07-submission/checklist.md)
- [협업 규칙](CONTRIBUTING.md)

## 화면 설계 상태

Figma v0.0.1 원본은 보존했다. 실제 v0.0.2 섹션 편집은 Figma Starter 도구 호출 한도로 미완료다. 기존 파일명의 v0.0.2(261026)는 색상만 바꾼 v0.0.1 보관본이다.
