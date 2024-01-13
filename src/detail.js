// import { submitReview } from "./review.js";
// // 클릭시 submitReview 함수호출
// document.getElementById("submitReviewButton").addEventListener("click", submitReview);

import { getMovies, fetchMovies } from "./movie.js";

window.onload = async function () {
  // window 시작하자마자
  let urlParams = new URLSearchParams(window.location.search);
  let receivedData = urlParams.get("data"); // movie.js에 href html?data=${movid.id}라고 저장해두었어서 ${movid.id}를 receivedData에 할당
  console.log(receivedData); // 클릭한 id ex.278

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
      genre_ids: movieFound.genre_ids
    };
  }

  // 상세페이지에 정보 넣기
  const movieTitleContent = document.getElementById("modal-title");
  movieTitleContent.textContent = `제목 : ${dictionary(receivedData).title}`;
  const releaseDateContent = document.querySelector("#release_date");
  releaseDateContent.textContent = `개봉일: ${dictionary(receivedData).release_date}`;
  // 제목, 개봉일 말고 다른 것들 추가해야 합니다.

  function displayReviews(title) {
    const reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = ""; // 기존 목록 비우기

    const storedReviews = JSON.parse(localStorage.getItem(title)) || [];
    storedReviews.forEach((reviewData) => {
      const listItem = document.createElement("li");
      listItem.textContent = `작성자 : ${reviewData.usernameContent}, 리뷰: ${reviewData.reviewContent}`;

      reviewList.appendChild(listItem);
    });
  }
  const title = dictionary(receivedData).title;
  displayReviews(title);

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
        submitReview(username, review, password);
      } else {
        alert("내용을 입력해주세요.");
        console.error("리뷰작성 미완료");
      }

      function submitReview(username, review, password) {
        const storedReviews = JSON.parse(localStorage.getItem(title)) || [];

        // 기존에 리뷰들이 이미 있는지 확인하기 위해 일단 저장된 걸 먼저 가져오고
        const reviewData = {
          usernameContent: username,
          reviewContent: review,
          passwordContent: password
        };

        if (storedReviews) {
          storedReviews.push(reviewData);
          // 있으면 있는 거에다 추가
        } else {
          const newReviewList = [reviewData];
          localStorage.setItem(title, JSON.stringify(newReviewList));
          // 없으면 새로 만들어서 추가
        }
        localStorage.setItem(`${dictionary(receivedData).title}`, JSON.stringify(storedReviews));

        alert("리뷰가 작성되었습니다.");
        console.log("리뷰작성 완료");

        displayReviews(title);
      }
    })
  );
};
