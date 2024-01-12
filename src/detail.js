// import { submitReview } from "./review.js";
// // 클릭시 submitReview 함수호출
// document.getElementById("submitReviewButton").addEventListener("click", submitReview);
import { getMovies, fetchMovies } from "./movie.js";

window.onload = async function () {
  let urlParams = new URLSearchParams(window.location.search);
  let receivedData = urlParams.get("data"); // movie.js에 href html?data=${movid.id}라고 저장해두었어서 ${movid.id}를 receivedData에 할당
  console.log(receivedData); // 클릭한 id ex.278

  await fetchMovies();

  const movies = getMovies();
  // const genres = getGenres();
  console.log(movies);

  function dictionary(receivedData) {
    // movies 배열에서 해당 ID에 맞는 영화 찾기
    const movieFound = movies.find((movie) => movie.id.toString() == receivedData);

    // 선택된 영화의 정보를 객체로 반환
    return {
      id: movieFound.id,
      title: movieFound.title,
      release_date: movieFound.release_date,
      genre_ids: movieFound.genre_ids
    };
  }
  const movieTitleContent = document.getElementById("modal-title");
  movieTitleContent.textContent = `제목 : ${dictionary(receivedData).title}`;
  const releaseDateContent = document.querySelector("#release_date");
  releaseDateContent.textContent = `개봉일: ${dictionary(receivedData).release_date}`;
  // 제목, 개봉일 말고 다른 것들 추가해야 합니다.

  //===========================================이 밑은 리뷰 부분인데 더 수정하겠습니다===============================================
  // const reviewDataList = [];
  // const reviewListElement = document.querySelector("#reviewList");

  // const movieTitleList = movie.title.split(","); // 무비타이틀만 모아놓은 리스트로 만들기 [스파이더맨, 런닝맨, 아이언맨...]

  const usernameA = document.querySelector(".username");
  const reviewA = document.querySelector(".review");
  const passwordA = document.querySelector(".password");
  const reviewbtn = document.getElementById("submitReviewButton");

  const username = usernameA ? usernameA.value : "";
  const review = reviewA ? reviewA.value : "";
  const password = passwordA ? passwordA.value : "";

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
};
