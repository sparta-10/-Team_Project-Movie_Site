// 영화 제목에 검색어가 포함된 영화만 선택
export function searchMovies(movies, searchInputValue) {
  const resultMovies = movies.filter((movie) => movie.title.includes(searchInputValue));

  // 입력값이 없을 경우와 입력값이 공백일 경우 경고창 띄우기
  if (searchInputValue.trim() === "") {
    alert("영화 제목을 입력해주세요.");
    return movies;
  }
  // 영화 제목 잘못 입력했을 때 경고창 띄우기
  else if (resultMovies.length === 0) {
    alert("영화 제목을 확인해주세요.");
    return movies;
  }
  return resultMovies;
}
