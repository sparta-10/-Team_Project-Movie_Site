import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
import {
  movies,
  setFilteredMovies,
  fetchMovies,
  makeMovieCards,
  openClose,
  scrollToTop,
  sortByTitle,
  sortByRate
} from "./movie.js";
import { searchMovies } from "./search.js";
import { submitReview } from "./review.js";

// 페이지 로드 시 fetchMovies 함수 호출
document.addEventListener("DOMContentLoaded", fetchMovies);

document.addEventListener("DOMContentLoaded", function () {
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
});

// 클릭 이벤트 발생 시 openClose 함수 호출
document.getElementById("toggleBtn").addEventListener("click", () => {
  openClose();
});

// 클릭 이벤트 발생 시 scrollToTop 함수 호출
document.getElementById("toTop").addEventListener("click", () => {
  scrollToTop();
});

// 클릭시 submitReview 함수 호출
document.getElementById("submitReviewButton").addEventListener("click", submitReview);

// 정렬 버튼에 이벤트 등록 -> 클릭 시 정렬 함수 호출
document.getElementById("sortByTitleBtn").addEventListener("click", () => {
  sortByTitle();
});
document.getElementById("sortByRateBtn").addEventListener("click", () => {
  sortByRate();
});
