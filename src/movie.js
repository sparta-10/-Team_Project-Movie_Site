const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzZmI5OTkyMjA2MjRiM2U3MmZlN2RmYTNmZDllOCIsInN1YiI6IjY1OTZkZDYyZWEzN2UwMDZmYTRjZDVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gq8AghSSWR5zlZngutCS3V1eRtf8JDANW3gZOJpOIUA"
  }
};

export let movies = [];
export let genres = [];

export function fetchMovies() {
  Promise.all([
    fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options),
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=ko", options)
  ])

    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then(([moviesResponse, genresResponse]) => {
      movies = moviesResponse.results; // 영화 데이터를 배열에 저장
      genres = genresResponse.genres; // 장르 데이터를 배열에 저장

      makeMovieCards(movies); // 영화 카드 만들기 함수 호출
      hideMovies(); // 페이지 로드 시 .movie 숨기기(토글버튼)
    })
    .catch((err) => console.error(err));
}

// 영화 카드 만들기
export function makeMovieCards(movies) {
  const moviesBox = document.getElementById("movieCardList");

  // 개봉일 날짜 형식 바꾸는 함수
  function transformDateFormat(date) {
    const splitDate = date.split("-");
    return splitDate.join(".");
  }

  movies.forEach((movie) => {
    // 영화의 장르 Id 가져오기
    // || [] : movie.genre_ids가 null 또는 undefined인 경우,
    // genreIds가 빈 배열([])인 null 또는 undefined로 설정되어 에러 발생하는 것 방지
    const genreIds = movie.genre_ids || [];

    // 장르 Id에 해당하는 장르 이름 가져오기
    const movieGenres = genreIds.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : ""; // 해당하는 장르가 없으면 빈 문자열 반환
    });

    // 장르 이름을 쉼표로 구분하여 표시
    const genreList = movieGenres.join(", ");

    const template = `
            <div id="movie">            
            <li id=${movie.id} class="movieCard">
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=""/>
            <h2 class="movieTitle">${movie.title}</h2>
            <p class="movieReleasedDate">${transformDateFormat(movie.release_date)}</p>
            <p class="movieGenre">${genreList}</p>
            <p class="movieOverview">${movie.overview}</p>
            <p class="movieRate"><span class="star">⭐ ${movie.vote_average.toFixed(1)}</span></p>
            <button id="modalbtn" class="modalBtn">자세히보기</button>
            </li>
            </div>
            `;

    moviesBox.insertAdjacentHTML("beforeend", template);
  });

  const modal = document.getElementById("modal");
  const modalBtn = document.querySelectorAll(".modalBtn");
  modalBtn.forEach((a) => {
    a.addEventListener("click", () => {
      modal.style.display = "block";
      openClose();
    });
  });

  const closebtn = document.getElementById("closebtn");
  closebtn.addEventListener("click", () => {
    modal.style.display = "none";
    openClose();
  });
}

// 페이지 새로고침 시 movieCard가 보이지 않는 것을 기본 값으로 만드는 함수
export function hideMovies() {
  let cards = document.querySelectorAll(".movieCard");

  cards.forEach((card) => (card.style.display = "none"));

  // 토글 되어도 배경색 유지 위함
  document.body.style.backgroundColor = "gainsboro";
}

// alert 창 띄우는 함수
// 이벤트 위임: 하위요소에서 발생한 이벤트를 상위요소에서 처리
// export function clickCard({ target, cardList }) {
//   // 카드 외 영역 클릭 시 무시
//   if (target === cardList) return;

//   if (target.matches(".movieCard")) {
//     alert(`영화 id: ${target.id}`);
//   } else {
//     // 카드의 자식 태그 (img, h3, p) 클릭 시 부모의 id로 접근
//     alert(`영화 id: ${target.parentNode.id}`);
//   }
// }

// 영화 목록 보기 버튼 클릭 시 토글하는 함수
export function openClose() {
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
