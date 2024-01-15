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
export let filteredMovies = [];

export function setFilteredMovies(movies) {
  filteredMovies = movies;
}

export function fetchMovies() {
  Promise.all([
    fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options),
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=ko", options)
  ])

    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then(([moviesResponse, genresResponse]) => {
      movies = moviesResponse.results; // 영화 데이터를 배열에 저장
      filteredMovies = moviesResponse.results; // 영화 데이터를 검색어로 필터링된 배열에 저장
      genres = genresResponse.genres; // 장르 데이터를 배열에 저장

      makeMovieCards(movies); // 영화 카드 만들기 함수 호출
      hideMovies(); // 페이지 새로고침 시 movieCard가 보이지 않는 것을 기본 값으로
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

  moviesBox.innerHTML = ""; // 기존 카드 비우기

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
}

export function showMovies() {
  let cards = document.querySelectorAll(".movieCard");

  cards.forEach((card) => (card.style.display = "flex"));
}

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

// 제목 오름차순 정렬
export function sortByTitle() {
  const sortedTitle = filteredMovies.slice().sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  // 정렬된 영화 데이터로 카드 업데이트
  makeMovieCards(sortedTitle);
}

// 평점 내림차순 정렬
export function sortByRate() {
  const sortedRate = filteredMovies.slice().sort((a, b) => b.vote_average - a.vote_average);

  // 정렬된 영화 데이터로 카드 업데이트
  makeMovieCards(sortedRate);
}

// 개봉일 내림차순 정렬 (최신순)
export function sortByNewDate() {
  const sortedNewDate = filteredMovies.slice().sort((a, b) => {
    // 올바른 비교 수행 위해 release_date 문자열을 Date 객체로 변환
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);

    // Date 객체를 비교
    return dateB - dateA;
  });

  // 정렬된 영화 데이터로 카드 업데이트
  makeMovieCards(sortedNewDate);
}

// 개봉일 오름차순 정렬 (오래된순)
export function sortByOldDate() {
  const sortedOldDate = filteredMovies.slice().sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);

    return dateA - dateB;
  });
  // 정렬된 영화 데이터로 카드 업데이트
  makeMovieCards(sortedOldDate);
}
