// import { submitReview } from "./review.js";
// // 클릭시 submitReview 함수호출
// document.getElementById("submitReviewButton").addEventListener("click", submitReview);
import { getMovies, fetchMovies } from "./movie.js";

window.onload = async function () {
  let urlParams = new URLSearchParams(window.location.search);
  let receivedData = urlParams.get("data");
  console.log(receivedData);

  await fetchMovies(receivedData);

  const movies = getMovies();
  console.log(movies);

  const reviewDataList = [];
  const reviewListElement = document.querySelector("#reviewList");

  movies.forEach((movie) => {
    const movieTitleList = movie.title.split(","); // [스파이더맨, 런닝맨 ..]

    movieTitleList.forEach(() => {
      // const formList = document.querySelectorAll(".reviewForm");
      // formList.forEach((document) => {
      // reviewbtn.forEach((btn, index) => {
      const username = document.querySelector(".username").value;
      const review = document.querySelector(".review").value;
      const password = document.querySelector(".password").value;
      const reviewbtn = document.getElementById("submitReviewButton");

      reviewbtn.addEventListener("click", () => {
        if (username && review && password) {
          const reviewData = {
            usernameContent: username,
            reviewContent: review,
            passwordContent: password
          };

          reviewDataList.push(reviewData);

          const reviewPair = {
            movietitle: reviewDataList
          };

          localStorage.setItem("movieName", JSON.stringify(reviewPair));
          alert("리뷰가 작성되었습니다.");
          console.log("리뷰작성 완료");
        } else {
          alert("내용을 입력해주세요.");
          console.error("리뷰작성 미완료");
        }

        console.log(modal);
        reviewListElement.innerHTML = "";

        let doneReviewlist = JSON.parse(localStorage.getItem("movieName"));

        doneReviewlist.forEach((a) => {
          const listItem = document.createElement("li");
          listItem.textContent = `작성자 : ${a.usernameContent}, 리뷰:${a.reviewContent}`;
          reviewListElement.appendChild(listItem);
        });
      });
    });
  });
};
