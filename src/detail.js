import { getMovies, fetchMovies } from "./movie.js";
import { displayReviews, submitReview } from "./review.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzZmI5OTkyMjA2MjRiM2U3MmZlN2RmYTNmZDllOCIsInN1YiI6IjY1OTZkZDYyZWEzN2UwMDZmYTRjZDVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gq8AghSSWR5zlZngutCS3V1eRtf8JDANW3gZOJpOIUA"
  }
};

let selectedMovie = []; // 영화 정보를 저장할 변수
let cast = [];
let slicedCast = [];
let detail = [];

async function fetchCredits() {
  let urlParams = new URLSearchParams(window.location.search);
  let receivedData = urlParams.get("data");

  // fetchMovies 함수 호출하여 영화 정보 가져오기
  await fetchMovies();

  const movies = getMovies();
  // receivedData와 일치하는 영화 찾기
  selectedMovie = movies.find((movie) => movie.id.toString() === receivedData);

  if (selectedMovie) {
    // 영화 정보가 있다면 credits를 가져오는 API 호출
    await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?language=ko-KR`, options),
      fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}?language=ko-KR`, options)
    ])
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then(([creditsResponse, detailResponse]) => {
        cast = creditsResponse.cast;
        slicedCast = cast.slice(0, 3);
        detail = detailResponse;
      })
      .catch((err) => console.error(err));
  } else {
    console.error("영화를 찾을 수 없습니다.");
  }
}

window.onload = async function () {
  // window 시작하자마자
  let urlParams = new URLSearchParams(window.location.search);
  let receivedData = urlParams.get("data"); // movie.js에 href html?data=${movid.id}라고 저장해두었어서 ${movid.id}를 receivedData에 할당
  console.log(receivedData); // 클릭한 id ex.278

  let receivedGenre = urlParams.get("genreList");
  console.log(receivedGenre); // 클릭한 영화의 장르

  await fetchMovies();

  const movies = getMovies();
  // const genres = getGenres();
  console.log(movies);

  function dictionary(receivedData) {
    // movies 배열에서 해당 ID에 맞는 영화 찾기
    const movieFound = movies.find((movie) => movie.id.toString() === receivedData);

    // 선택된 영화의 정보를 객체로 반환
    return {
      id: movieFound.id,
      title: movieFound.title,
      release_date: movieFound.release_date,
      genre_ids: movieFound.genre_ids,
      img: movieFound.poster_path,
      average: movieFound.vote_average,
      overview: movieFound.overview
    };
  }

  // credits 데이터 가져오기
  await fetchCredits();

  // 상세페이지에 정보 넣기
  const movieTitleContent = document.getElementById("modal-title"); // 제목
  movieTitleContent.textContent = `${dictionary(receivedData).title}`;
  const releaseDateContent = document.querySelector("#release_date"); // 개봉일
  releaseDateContent.textContent = `개봉일 : ${dictionary(receivedData).release_date}`;
  const movieGenre = document.querySelector("#genreIds"); // 장르
  movieGenre.textContent = `장르 : ${receivedGenre}`;
  const movieImg = document.getElementById("movie-img"); // 이미지
  movieImg.src = `https://image.tmdb.org/t/p/w500${dictionary(receivedData).img}`;
  const movieRunTime = document.getElementById("runtime"); // 상영 시간
  movieRunTime.textContent = `상영 시간 : ${detail.runtime}분`;
  const movieAverage = document.getElementById("vote_average"); // 평점
  movieAverage.textContent = `평점 : ${dictionary(receivedData).average.toFixed(1)}`;
  const movieOverview = document.getElementById("overview"); // 줄거리
  movieOverview.textContent = `줄거리 : ${dictionary(receivedData).overview}`;
  const movieActorImgContainer = document.getElementById("actor-img-container"); // 배우 이미지
  movieActorImgContainer.innerHTML = ""; // 이전 이미지 제거
  slicedCast.forEach((actor) => {
    const actorImg = document.createElement("img");
    actorImg.src = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
    actorImg.alt = `${actor.name} 이미지`;
    actorImg.classList.add("actor-img");
    movieActorImgContainer.appendChild(actorImg);
  });
  const movieActor = document.getElementById("actor"); // 배우명
  movieActor.textContent = `${slicedCast.map((actor) => actor.name).join(` \t `)}`;
  const movieCharacter = document.getElementById("character"); // 배역명
  movieCharacter.textContent = `${slicedCast.map((actor) => actor.character).join(` \t `)}`;

  // ---------------------------------------------------여기서부터 리뷰 ------------------------------------------------------------//
  const title = dictionary(receivedData).title;

  displayReviews(title);
  // 페이지가 로드 되자마자 이전에 작성했던 리뷰들이 보여지게 하기 위해서 위쪽에 위치시킴

  // 리뷰작성 버튼 누를 때마다 리뷰 저장, 수정, 삭제
  const reviewbtns = document.querySelectorAll(".submitReviewButton");

  reviewbtns.forEach((reviewbtn) =>
    reviewbtn.addEventListener("click", (event) => {
      event.preventDefault();
      const usernameA = document.querySelector(".username");
      const reviewA = document.querySelector(".review");
      const passwordA = document.querySelector(".password");

      const username = usernameA ? usernameA.value : "";
      const review = reviewA ? reviewA.value : "";
      const password = passwordA ? passwordA.value : "";

      if (username && review && password) {
        submitReview(username, review, password, title);

        displayReviews(title);
      }

      if (!username) {
        alert("작성자를 입력해주세요.");
        return;
      }
      if (!review) {
        alert("리뷰를 입력해주세요.");
        return;
      }
      if (!password) {
        alert("비밀번호를 입력해주세요.");
        return;
      }
    })
  );
};
