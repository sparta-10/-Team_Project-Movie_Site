// 영화 제목에 검색어가 포함된 영화만 선택
export function searchMovies(movies, searchInputValue) {
  return movies.filter((movie) => movie.title.includes(searchInputValue));
}
