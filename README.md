# research

정적 HTML 리서치 보고서 모음입니다. GitHub Pages로 배포합니다.

## 디렉터리

보고서는 카테고리와 날짜로 나눕니다.

```text
<category>/<yyyy>/<mm>/<report-slug>/index.html
```

이 저장소의 첫 보고서:

```text
dev/2026/11/dev-platform-trends/index.html
```

새 주제는 `dev`와 같은 깊이에 카테고리 폴더를 추가합니다. 예: `design/2026/12/<slug>/index.html`.

## 보고서 추가

1. 위 경로에 `index.html`을 만듭니다. 공통 스타일은 보고서 위치에서 `assets/site.css`로 상대 링크합니다. 프로젝트 페이지(`/research/`)에서도 동작하도록 루트 절대 경로(`/assets/...`)는 쓰지 않습니다.
2. 루트 `reports.json`의 `reports` 배열에 항목을 추가합니다. 목록 페이지는 이 파일을 읽어 카테고리별로 묶고, 날짜는 최신순으로 표시합니다.

```json
{
  "title": "보고서 제목",
  "summary": "목록에 보일 한두 문장 요약",
  "category": "dev",
  "categoryLabel": "개발",
  "date": "2026-11-25",
  "href": "dev/2026/11/report-slug/"
}
```

`href`는 사이트 루트 기준의 상대 경로이며, 앞에 `/`를 붙이지 않습니다.

## 배포

`main`에 머지되면 `.github/workflows/pages.yml`이 정적 파일을 GitHub Pages에 배포합니다. Jekyll은 사용하지 않습니다(`.nojekyll`).

- 목록: https://spacepro.github.io/research/
- 이 보고서: https://spacepro.github.io/research/dev/2026/11/dev-platform-trends/

Pages가 아직 GitHub Actions를 소스로 쓰지 않으면 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
