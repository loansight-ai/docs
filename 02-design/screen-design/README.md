# LoanSight AI 화면 설계서

기획안 v2.0, 요구사항 정의서 v0.0.4, 기능명세서 v0.0.4, PRD v0.0.4를 기준으로 만든 화면 설계서입니다. Figma 파일 `LoanSight AI 화면 설계서 v0.0.1`의 `화면 설계서 v0.0.1` 페이지가 편집 원본이며, 이 폴더의 PDF는 그 페이지를 내보낸 것입니다.

## 버전

| 버전 | 날짜 | 파일 | 변경 내용 |
| --- | --- | --- | --- |
| v0.0.1 | 2026.10.24 | `LoanSight AI_화면설계서_v0.0.1_261024.pdf` | 최초 작성. 개요, 공통 UI(COMUI-001), N-S01~N-S08(N-S04는 2장) 총 11장 |
| v0.0.2 | 2026.10.26 | `LoanSight AI_화면설계서_v0.0.2_261026.pdf` | KB 컬러 적용(KB Yellow Positive #FFBC00, KB Gray #60584C, KB Yellow Negative #FFCC00), 공통 UI 메시지 상자 폭 보정 |

화면 내 기업명(한결건설㈜)·수치·모델 성능 값은 레이아웃 확인용 예시 값입니다. 미정 질문(N-U01~U20)은 각 시트 Description에 빨간 글씨로 연결되어 있습니다.

## 폴더 구성

```text
docs/screen-design/
├─ README.md
├─ LoanSight AI_화면설계서_v0.0.1_261024.pdf
├─ LoanSight AI_화면설계서_v0.0.2_261026.pdf
├─ html/                    # 2026.10.23 HTML 화면 시안(별도 작업, 그대로 보존)
└─ figma-plugin/            # Figma 설계서 생성·수정용 개발 플러그인
   ├─ README.txt            # 실행 방법
   ├─ manifest.json         # 설계서 생성기
   ├─ code.js               # src/를 합친 실행 파일
   ├─ src/                  # 편집 원문(lib, spec, screens1, screens2, main) + mock_test.js
   └─ kb-color/             # 기존 페이지 색을 KB 컬러로 바꾸는 플러그인
```

중간 검수 PDF와 작업 기록은 `workbench/2026-10-24/screen-design-qa/`, `workbench/2026-10-26/screen-design-kb-color/`에 있습니다.

## 수정하는 방법

1. `figma-plugin/src/`의 js를 고친 뒤 lib → spec → screens1 → screens2 → main 순서로 합쳐 `code.js`를 만듭니다.
2. Figma에서 기존 `화면 설계서 v0.0.1` 페이지를 지우고 생성기 플러그인을 다시 실행합니다(Ctrl+Alt+P는 마지막 플러그인 재실행).
3. `파일 > 프레임을 PDF로 내보내기`로 이 폴더에 새 버전 PDF를 저장하고 위 버전 표를 갱신합니다.

플러그인 폴더 위치가 바뀌었으므로, Figma에서 처음 실행할 때는 `figma-plugin/manifest.json`(생성기)과 `figma-plugin/kb-color/manifest.json`(KB 컬러)을 다시 가져와야 합니다.
