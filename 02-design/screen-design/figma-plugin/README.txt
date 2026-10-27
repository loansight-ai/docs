LoanSight AI 화면 설계서 Figma 플러그인

[설계서 생성기] 이 폴더의 manifest.json
1. Figma 데스크톱에서 'LoanSight AI 화면 설계서 v0.0.1' 파일을 엽니다.
2. 메뉴 > Plugins > Development > Import plugin from manifest... 에서 이 폴더의 manifest.json 을 고릅니다.
3. Plugins > Development > LoanSight 화면 설계서 생성기 를 실행합니다.
4. '화면 설계서 v0.0.1' 페이지가 새로 생기고 설계서 11장(개요, 공통 UI, N-S01~N-S08)이 그려집니다.
   - 글꼴: Pretendard가 있으면 Pretendard, 없으면 Noto Sans KR
   - 다시 실행하면 새 페이지가 하나 더 생기므로, 기존 페이지를 먼저 지웁니다.
   - 색상은 KB 컬러(v0.0.2 기준)로 생성됩니다.

[KB 컬러 적용] kb-color/manifest.json
- 이미 그려진 '화면 설계서 v0.0.1' 페이지의 색만 KB 컬러로 바꿉니다(레이아웃·문구는 그대로).
- 이미 KB 컬러인 페이지에 다시 실행해도 바뀌는 것은 없습니다.

[소스 수정] src/ 의 js를 고친 뒤 lib, spec, screens1, screens2, main 순서로 합쳐 code.js 를 만듭니다.
