export const getMoviesInTheatre = (pageNo: number) => {
  return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=enUS&page=${pageNo}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `ERROR: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getTrendingMovies = () => {
  return fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};