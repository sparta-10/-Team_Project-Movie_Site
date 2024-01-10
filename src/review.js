  // submitReview 함수를 window에 등록
  window.submitReview = function () {
    const username = document.getElementById('username').value;
    const review = document.getElementById('review').value;
    const password = document.getElementById('password').value;

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

    const reviewData = {
      username: username,
      review: review,
      password: password
    };

    const timestamp = new Date().getTime();
    localStorage.setItem(`review_${timestamp}`, JSON.stringify(reviewData));

    document.getElementById('username').value = '';
    document.getElementById('review').value = '';
    document.getElementById('password').value = '';

    alert("리뷰가 작성되었습니다.");

    // 리뷰 작성 후에 저장된 리뷰를 다시 표시
    displayReviews();
  };

  window.onload = function () {
    displayReviews();
  };

  function displayReviews() {
    const reviewListElement = document.getElementById('reviewList');
    reviewListElement.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('review_')) {
        const reviewData = JSON.parse(localStorage.getItem(key));
        const listItem = document.createElement('li');
        listItem.textContent = `작성자: ${reviewData.username}, 리뷰: ${reviewData.review}`;
        reviewListElement.appendChild(listItem);
      }
    }
  }

// 나중에 모달창에 넣기.뼈대 부분.
// <form id="reviewForm">
// <label for="username">작성자:</label>
// <input type="text" id="username" required>

// <label for="review">리뷰:</label>
// <textarea id="review" required></textarea>

// <label for="password">확인 비밀번호:</label>
// <input type="password" id="password" required>

// <button type="button" onclick="submitReview()">리뷰 작성</button>
// </form>

// <ul id="reviewList"></ul>

