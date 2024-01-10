const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzZmI5OTkyMjA2MjRiM2U3MmZlN2RmYTNmZDllOCIsInN1YiI6IjY1OTZkZDYyZWEzN2UwMDZmYTRjZDVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gq8AghSSWR5zlZngutCS3V1eRtf8JDANW3gZOJpOIUA"
  }
};

export let movies = [];

export function fetchMovies() {
  fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options)
    .then((response) => response.json())
    .then((response) => {
      movies = response.results; // 영화 데이터를 배열에 저장
      makeMovieCards(movies); // 영화 카드 만들기 함수 호출
      hideMovies(); // 페이지 로드 시 .movie 숨기기(토글버튼)
    })
    .catch((err) => console.error(err));
}

// 영화 카드 만들기
export function makeMovieCards(movies) {
  const moviesBox = document.getElementById("movieCardList");

  movies.forEach((movie) => {
    const template = `
            <li id=${movie.id} class="movieCard">
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=""/>
            <h2 class="movieTitle">${movie.title}</h2>
            <p class="movieOverview">${movie.overview}</p>
            <p class="movieRate"><span class="star">⭐${movie.vote_average.toFixed(1)}</span></p>
            </li>`;

    moviesBox.insertAdjacentHTML("beforeend", template);
  });
}

// 페이지 새로고침 시 movieCard가 보이지 않는 것을 기본 값으로 만드는 함수
export function hideMovies() {
  let cards = document.querySelectorAll(".movieCard");

  cards.forEach((card) => {
    card.style.display = "none";
  });

  // 토글 되어도 배경색 유지 위함
  document.body.style.backgroundColor = "gainsboro";
}

// alert 창 띄우는 함수
// 이벤트 위임: 하위요소에서 발생한 이벤트를 상위요소에서 처리
export function clickCard({ target, cardList }) {
  // 카드 외 영역 클릭 시 무시
  if (target === cardList) return;

  if (target.matches(".movieCard")) {
    alert(`영화 id: ${target.id}`);
  } else {
    // 카드의 자식 태그 (img, h3, p) 클릭 시 부모의 id로 접근
    alert(`영화 id: ${target.parentNode.id}`);
  }
}

// 영화 목록 보기 버튼 클릭 시 토글하는 함수
export function openclose() {
  let cards = document.querySelectorAll(".movieCard");

  // none이면 block으로, block이면 none으로
  cards.forEach((card) => {
    if (card.style.display === "none" || card.style.display === "") {
      card.style.display = "flex"; // 나타나도록
    } else {
      card.style.display = "none"; // 사라지도록
    }
  });
}

// 페이지 상단으로 올라가는 함수(top 버튼)
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
