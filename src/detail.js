import { getMovies, fetchMovies } from "./movie.js";
import { displayReviews, submitReview } from "./review.js";

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

  // 상세페이지에 정보 넣기
  const movieTitleContent = document.getElementById("modal-title"); // 제목
  movieTitleContent.textContent = `제목 : ${dictionary(receivedData).title}`;
  const releaseDateContent = document.querySelector("#release_date"); // 개봉일
  releaseDateContent.textContent = `개봉일: ${dictionary(receivedData).release_date}`;
  const movieGenre = document.querySelector("#name"); // 장르
  movieGenre.textContent = `장르: ${receivedGenre}`;
  const movieImg = document.getElementById("movie-img"); // 이미지
  movieImg.src = `https://image.tmdb.org/t/p/w500${dictionary(receivedData).img}`;
  const movieAverage = document.getElementById("vote_average");
  movieAverage.textContent = `평점: ${dictionary(receivedData).average}`;
  const movieOverview = document.getElementById("overview");
  movieOverview.textContent = `평점: ${dictionary(receivedData).overview}`;

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
