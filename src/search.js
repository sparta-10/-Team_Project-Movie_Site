import { movies, setFilteredMovies, makeMovieCards } from "./movie.js";

export function setSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const moviesBox = document.getElementById("movieCardList");

  // 페이지 로딩 시 검색창에 포커스 주기
  searchInput.focus();

  searchBtn.addEventListener("click", (event) => {
    // 이벤트의 기본 동작인 페이지 새로고침을 막음
    event.preventDefault();

    // 입력한 검색어를 변수에 할당
    const searchInputValue = searchInput.value;

    // 영화 제목에 검색어가 포함된 영화만 선택
    const searchedMovies = searchMovies(movies, searchInputValue);
    setFilteredMovies(searchedMovies);

    // moviesBox의 내용 비워줌
    moviesBox.innerHTML = "";

    // 선택된 영화만 함수 실행시켜 카드 만들어줌
    makeMovieCards(searchedMovies);
  });
}

// 영화 제목에 검색어가 포함된 영화만 선택
export function searchMovies(movies, searchInputValue) {
  const resultMovies = movies.filter((movie) => movie.title.includes(searchInputValue));

  // 입력값이 없을 경우와 입력값이 공백일 경우 경고창 띄워줌
  if (searchInputValue.trim() === "") {
    alert("영화 제목을 입력해주세요.");
  }
  // 영화 제목 잘못 입력했을 때 경고창 띄우고, 현재 movie cards가 화면에 보이는 경우에만 처음 상태로 돌아가도록
  else if (resultMovies.length === 0) {
    alert("영화 제목을 확인해주세요.");
  }

  return resultMovies;
}
