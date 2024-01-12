import { submitReview } from "./review.js";
// 클릭시 submitReview 함수호출
document.getElementById("submitReviewButton").addEventListener("click", submitReview);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmQzZmI5OTkyMjA2MjRiM2U3MmZlN2RmYTNmZDllOCIsInN1YiI6IjY1OTZkZDYyZWEzN2UwMDZmYTRjZDVkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gq8AghSSWR5zlZngutCS3V1eRtf8JDANW3gZOJpOIUA"
  }
};


fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    console.log(data);
    movies.forEach((movie) => {
      let modal = document.querySelector(".modal-main");
      let moviePoster = movie.poster_path;
      let modalTitle = movie.title;
      let releaseDate = movie.release_date;
      let voteAverage = movie.vote_average;
      let overview = movie.overview;
      let id = movie.id;

      let temp_html = `
          <main class="modal-main" data-id="${id}">
            <div class="movie-poster">
              <img id="movie-img" src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="영화 포스터 이미지">
            </div>
            <div class="movie-info">
              <h1 id="modal-title">${modalTitle}</h1>
              <h3 id="release_date">개봉일: ${releaseDate}</h3>
              <h3 id="name">장르: </h3>
              <h3 id="vote_average">평점: ${voteAverage}</h3>
              <h3 id="overview">줄거리: ${overview}</h3>
            </div>
          </main>
        `;

      modal.innerHTML = temp_html; // Use innerHTML to replace existing content
    });
  })

  .catch((error) => {
    console.log("데이터를 받아오는 데 실패했습니다:", error);
  });
