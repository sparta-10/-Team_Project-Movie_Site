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
    storedReviews.forEach((reviewData, index) => {
      const listItem = document.createElement("div");
      const authorItem = document.createElement('li');
      authorItem.textContent = `작성자 : ${reviewData.usernameContent}`;

      const reviewItem = document.createElement('li');
      reviewItem.textContent = `리뷰 : ${reviewData.reviewContent}`;

      // 수정 버튼 생성 및 클릭 이벤트 추가
      const editButton = document.createElement("button");
      editButton.textContent = "수정";
      editButton.addEventListener("click", () => editReview(index)); // 리뷰 키 전달

      // 삭제 버튼 생성 및 클릭 이벤트 추가
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.addEventListener("click", () => deleteReview(index)); // 리뷰 키 전달

      // 버튼들을 리스트 아이템에 추가
      listItem.appendChild(authorItem);
      listItem.appendChild(reviewItem);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

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

      function submitReview(username, review, password) {

        // const timestamp = new Date().getTime();
        // const reviewKey = `${title}_${timestamp}`; // 수정된 부분

        const storedReviews = JSON.parse(localStorage.getItem(title)) || [];

        // 기존에 리뷰들이 이미 있는지 확인하기 위해 일단 저장된 걸 먼저 가져오고
        const reviewData = {
          usernameContent: username,
          reviewContent: review,
          passwordContent: password
        };

        storedReviews.push(reviewData);
        localStorage.setItem(title, JSON.stringify(storedReviews));
        alert("리뷰가 작성되었습니다.");
        console.log("리뷰작성 완료");

        displayReviews(title);
      }
    })
  );

  // 리뷰 수정하기
  function editReview(index) {
    // 리뷰 데이터 가져오기
    const storedReviews = JSON.parse(localStorage.getItem(title));

    if (!storedReviews) {
      alert("수정할 리뷰를 찾을 수 없습니다.");
      return;
    }

    const userEnteredPassword = prompt("비밀번호를 입력하세요:");

    // 입력한 비밀번호와 저장된 비밀번호 비교하면서 수정
    const foundReview = storedReviews[index];
    if (foundReview && foundReview.passwordContent === userEnteredPassword) {
      const updatedUsername = prompt("수정된 작성자 이름:", foundReview.usernameContent);
      const updatedReview = prompt("수정된 리뷰 내용:", foundReview.reviewContent);

      if (updatedUsername !== null && updatedReview !== null) {
        foundReview.usernameContent = updatedUsername;
        foundReview.reviewContent = updatedReview;

        localStorage.setItem(reviewKey, JSON.stringify(storedReviews));
        alert("리뷰가 수정되었습니다.");

        // 수정 후에 저장된 리뷰를 다시 표시
        displayReviews(title);
      }
    } else {
      alert("비밀번호가 일치하지 않습니다. 수정 권한이 없습니다.");
    }
  }


  // 리뷰 삭제하기
  function deleteReview(index) {
    // 리뷰 데이터 가져오기
    const storedReviews = JSON.parse(localStorage.getItem(title));

    if (!storedReviews) {
      alert("삭제할 리뷰를 찾을 수 없습니다.");
      return;
    }

    // 사용자에게 비밀번호 입력 받기
    const userEnteredPassword = prompt("리뷰를 삭제하려면 비밀번호를 입력하세요:");
  
    // storedReviews에서 특정 인덱스의 리뷰 데이터들을 가져옴
    const foundReview = storedReviews[index];

    // 입력한 비밀번호와 저장된 비밀번호 비교
    if (foundReview && foundReview.passwordContent === userEnteredPassword) {
      // 사용자가 입력한 비밀번호와 저장된 비밀번호가 일치하면 삭제 진행
      const confirmDelete = confirm("정말로 이 리뷰를 삭제하시겠습니까?");

      if (confirmDelete) {
        storedReviews.splice(index, 1); // 해당 인덱스의 리뷰를 1개 삭제
        localStorage.setItem(title, JSON.stringify(storedReviews));
        alert("리뷰가 삭제되었습니다.");

        // 삭제 후에 저장된 리뷰를 다시 표시
        displayReviews(title);
      }
    } else {
      alert("비밀번호가 일치하지 않습니다. 삭제 권한이 없습니다.");
    }
  }
};

