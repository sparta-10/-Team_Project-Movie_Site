//리뷰 저장하고 내용 표시하기
export function displayReviews() {
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

  export function submitReview () {
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




