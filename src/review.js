// 리뷰 보여지게 하는 함수
export function displayReviews(title) {
  const authorItemInput = document.getElementById("username");
  authorItemInput.value = "";
  const reviewItemInput = document.getElementById("review");
  reviewItemInput.value = "";
  const passwordInput = document.getElementById("password");
  passwordInput.value = "";

  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = ""; // 기존 목록 비우기

  const storedReviews = JSON.parse(localStorage.getItem(title)) || [];
  storedReviews.forEach((reviewData, index) => {
    const listItem = document.createElement("div");

    const authorItem = document.createElement("li");
    authorItem.textContent = `작성자 : ${reviewData.usernameContent}`;

    const reviewItem = document.createElement("li");
    reviewItem.textContent = `리뷰 : ${reviewData.reviewContent}`;

    // 수정 버튼 생성 및 클릭 이벤트 추가
    const editButton = document.createElement("button");
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => editReview(index, title)); // 리뷰 키 전달

    // 삭제 버튼 생성 및 클릭 이벤트 추가
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteReview(index, title)); // 리뷰 키 전달

    // 버튼들을 리스트 아이템에 추가
    listItem.appendChild(authorItem);
    listItem.appendChild(reviewItem);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    reviewList.appendChild(listItem);
  });
}
// 리뷰 저장하기
export function submitReview(username, review, password, title) {
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
}
// 리뷰 수정하기
async function editReview(index, title) {
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
      await Promise.resolve().then(() => {
        // localstorage.setItem을 Promise를 반환하는 비동기함수로 만들기 -> 수정된 내용 반영 후 displayReviews
        foundReview.usernameContent = updatedUsername;
        foundReview.reviewContent = updatedReview;
        localStorage.setItem(title, JSON.stringify(storedReviews));
        alert("리뷰가 수정되었습니다.");
      });
      // 수정 후에 저장된 리뷰를 다시 표시
      displayReviews(title);
    }
  } else {
    alert("비밀번호가 일치하지 않습니다. 수정 권한이 없습니다.");
  }
}

// 리뷰 삭제하기
async function deleteReview(index, title) {
  // 리뷰 데이터 가져오기
  const storedReviews = JSON.parse(localStorage.getItem(title));
  if (!storedReviews) {
    alert("삭제할 리뷰를 찾을 수 없습니다.");
    return;
  }
  // 사용자에게 비밀번호 입력 받기
  const userEnteredPassword = prompt("리뷰를 삭제하려면 비밀번호를 입력하세요:");
  // storedReviews에서 특정 인덱스의 리뷰 데이터를 가져옴
  const foundReview = storedReviews[index];
  // 입력한 비밀번호와 특정 인덱스의 저장된 비밀번호와 비교
  if (foundReview && foundReview.passwordContent === userEnteredPassword) {
    // 사용자가 입력한 비밀번호와 저장된 비밀번호가 일치하면 삭제 진행
    const confirmDelete = confirm("정말로 이 리뷰를 삭제하시겠습니까?");
    if (confirmDelete) {
      await Promise.resolve().then(() => {
        storedReviews.splice(index, 1);
        // 해당 인덱스의 리뷰를 1개 삭제
        localStorage.setItem(title, JSON.stringify(storedReviews));
        alert("리뷰가 삭제되었습니다.");
      });
      // 삭제 후에 저장된 리뷰를 다시 표시
      displayReviews(title);
    }
  } else {
    alert("비밀번호가 일치하지 않습니다. 삭제 권한이 없습니다.");
  }
}
