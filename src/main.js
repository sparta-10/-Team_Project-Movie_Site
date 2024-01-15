import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
import {
  renderMovies,
  toggleMovies,
  scrollToTop,
  sortByTitle,
  sortByRate,
  sortByNewDate,
  sortByOldDate
} from "./movie.js";
import { setSearch } from "./search.js";

document.addEventListener("DOMContentLoaded", handleContectLoaded);
function handleContectLoaded() {
  renderMovies(); // 페이지 로드 시 renderMovies 함수 호출
  setSearch(); // 페이지 로드 시 setSearch 함수 호출
  setToggleMovies();
  setScrollToTop();
  setSortByTitle();
  setSortByRate();
  setSortByNewDate();
  setSortByOldDate();
}

function setToggleMovies() {
  // 클릭 이벤트 발생 시 toggleMovies 함수 호출
  document.getElementById("toggleBtn").addEventListener("click", toggleMovies);
}

function setScrollToTop() {
  // 클릭 이벤트 발생 시 scrollToTop 함수 호출
  document.getElementById("toTopBtn").addEventListener("click", scrollToTop);
}

// 정렬 버튼에 이벤트 등록 -> 클릭 시 정렬 함수 호출
function setSortByTitle() {
  document.getElementById("sortByTitleBtn").addEventListener("click", sortByTitle);
}

function setSortByRate() {
  document.getElementById("sortByRateBtn").addEventListener("click", sortByRate);
}

function setSortByNewDate() {
  document.getElementById("sortByNewDateBtn").addEventListener("click", sortByNewDate);
}

function setSortByOldDate() {
  document.getElementById("sortByOldDateBtn").addEventListener("click", sortByOldDate);
}

/*function setSortByTitle() {
  const sortByTitleBtn = document.getElementById("sortByTitleBtn");
  if (sortByTitleBtn) {
    // 요소가 존재하는 경우에만 이벤트 리스너 추가
    sortByTitleBtn.addEventListener("click", sortByTitle);
  }
}

function setSortByRate() {
  const sortByRateBtn = document.getElementById("sortByRateBtn");
  if (sortByRateBtn) {
    // 요소가 존재하는 경우에만 이벤트 리스너 추가
    sortByRateBtn.addEventListener("click", sortByRate);
  }
}

function setSortByNewDate() {
  const sortByNewDateBtn = document.getElementById("sortByNewDateBtn");
  if (sortByNewDateBtn) {
    // 요소가 존재하는 경우에만 이벤트 리스너 추가
    sortByNewDateBtn.addEventListener("click", sortByNewDate);
  }
}

function setSortByOldDate() {
  const sortByOldDateBtn = document.getElementById("sortByOldDateBtn");
  if (sortByOldDateBtn) {
    // 요소가 존재하는 경우에만 이벤트 리스너 추가
    sortByOldDateBtn.addEventListener("click", sortByOldDate);
  }
}*/
