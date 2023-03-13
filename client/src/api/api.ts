export const getMoviesInTheatre = () => {
  return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=enUS&page=1`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `ERROR: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};