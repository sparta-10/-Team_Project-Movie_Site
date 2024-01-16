# 사이트명
Movie Collection

## 👩‍💻 프로젝트 소개
TMDB API를 사용하여 영화를 소개하고 검색 및 각 영화에 대한 리뷰를 작성 할 수 있는 사이트 입니다.

## ⏲️ 개발 기간
- 2024.01.10(수) ~ 2024.01.15(월)


## 🧑‍🤝‍🧑 개발자 소개
- 장지영 : API를 이용하여 데이터 가져오기, 메인페이지 추가 기능 구현, 메인페이지 CSS
- 황인정 : 메인페이지와 상세페이지 간 데이터 호환, 리뷰 저장/작성/전시 기능 구현
- 최희라 : 리뷰 작성/수정/삭제 기능 구현, CSS 수정


## 💻 개발환경
- Version : Javascript
- <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScriipt-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img alt="Html" src ="https://img.shields.io/badge/HTML-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="Css" src ="https://img.shields.io/badge/CSS-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>


## 📌 주요 기능
- 영화 검색 기능.
- 검색 입력값 유효성 검사 기능.
- 영화 정렬 기능. (제목순, 별점순, 최신순, 오래된순)
- 영화 목록 UI 토글 기능.
- 영화 정보 상세페이지로 이동 기능.
- 영화 상세페이지에서 리뷰 작성 기능.
- 리뷰 입럭값 유효성 검사 기능.
- 로컬스토리지에 저장한 리뷰 데이터 수정 및 삭제 기능.
- 리뷰 수정/삭제 유효성 검사 기능.

## ✒️ API
- API 링크
    - 영화 정보 : https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1 ~ https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=12
    - 영화 장르 : https://api.themoviedb.org/3/genre/movie/list?language=ko-KR
    - 영화 배우 정보 : https://api.themoviedb.org/3/movie/${movie.id}/credits?language=ko-KR
    - 상영 시간 정보 : https://api.themoviedb.org/3/movie/${movie.id}?language=ko-KR
