# Docs — 금융·AI 최종 프로젝트

기획부터 최종 제출까지의 문서를 관리하는 비공개 저장소입니다.

- 주제·서비스명·시작일·팀원 및 역할: 미정
- 현재 상태: 문서 구조와 작성 양식 준비. 각 산출물의 실제 내용은 아직 작성하지 않았습니다.
- [GitHub 협업 규칙·Issue/PR/커밋 제목 예시](CONTRIBUTING.md)
- [코드 저장소](https://github.com/fin-ai-lab-2026/code)
- [조직 Overview](https://github.com/fin-ai-lab-2026)

## 주제 후보

1. AI 기반 기업 재무분석 리포트 생성 서비스
2. 금리·환율 변화 기반 금융 시장 분석 및 AI 해석 서비스
3. 금융 뉴스 키워드와 주가 변동 관계 분석 및 AI 요약 서비스

팀 역량과 데이터 확보 가능성을 비교한 뒤 하나를 선정합니다.

## 문서 목차 및 진행 계획

| 일정 | 문서 | 담당자 | 상태 |
|---|---|---|---|
| Day 1~2 | [기획안](01-planning/proposal.md) | 미정 | 양식 준비 |
| Day 1~2 | [요구사항 정의서](01-planning/requirements.md) | 미정 | 양식 준비 |
| Day 1~2 | [기능 정의서](01-planning/functions.md) | 미정 | 양식 준비 |
| Day 2~3 | [설계 산출물](02-design/README.md) | 미정 | 양식 준비 |
| Day 3~10 | [매일 수행일지](03-daily-logs/README.md) | 미정 | 양식 준비 |
| 구현 중 병행 | [이슈·오류 기록](04-issue-logs/README.md) | 미정 | 양식 준비 |
| Day 10~11 | [테스트 케이스·검증](05-testing/test-cases.md) | 미정 | 양식 준비 |
| Day 11~12, Day 14 | [발표 자료](06-presentation/README.md) | 미정 | 양식 준비 |
| Day 13 | [최종 제출 체크리스트](07-submission/checklist.md) | 미정 | 양식 준비 |
| 전체 기간 | [회의록](meetings/README.md) | 미정 | 양식 준비 |
| 전체 기간 | [공통 양식](templates/README.md) | 미정 | 양식 준비 |

작성 시작 후 상태는 `작성 중 / 검토 중 / 확정`으로 관리합니다. 프로젝트 시작일이 확정되면 실제 날짜를 추가합니다.

## 디렉토리

```text
docs/
├─ README.md
├─ .github/
│  └─ pull_request_template.md
├─ 01-planning/
│  ├─ proposal.md
│  ├─ requirements.md
│  └─ functions.md
├─ 02-design/
│  └─ README.md
├─ 03-daily-logs/
│  └─ README.md
├─ 04-issue-logs/
│  └─ README.md
├─ 05-testing/
│  └─ test-cases.md
├─ 06-presentation/
│  └─ README.md
├─ 07-submission/
│  └─ checklist.md
├─ meetings/
│  └─ README.md
└─ templates/
   ├─ README.md
   ├─ daily-log.md
   └─ meeting.md
```

## 문서 관리 규칙

- 문서마다 담당자, 검토자, 상태와 수정일을 기록합니다. 확인되지 않은 내용은 미정 또는 미확인으로 표시합니다.
- 요구사항·기능·테스트 ID를 연결합니다. 예: `REQ-001 → FUN-001 → code PR → TC-001`.
- 개발 할 일과 오류의 진행 상태는 [code Issues](https://github.com/fin-ai-lab-2026/code/issues)에서 관리합니다. 이 저장소에는 문서 작업과 제출 준비만 등록합니다.
- 문서 변경은 [협업 규칙](CONTRIBUTING.md)에 따라 브랜치와 PR로 검토합니다. 일일 회의록도 Issue → 브랜치 → PR 절차로 제출하며, 관련 코드 Issue·PR은 전체 URL로 연결합니다.
- Markdown 문서는 작업 기록용으로 사용합니다. 제출 양식이 지정되면 지정 형식의 편집 원본과 제출본을 함께 보관합니다.
- 실제 ERD·PPT·검증 결과는 작성 후 해당 폴더에 추가합니다. 현재 해당 산출물이 완성된 상태는 아닙니다.
- Day 13 제출 시 문서와 코드의 커밋 SHA 또는 태그, 제출 파일 목록을 체크리스트에 기록합니다. 이후 변경은 제출본과 구분합니다.
