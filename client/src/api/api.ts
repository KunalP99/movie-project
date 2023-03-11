export const getMoviesInTheatre = () => {
  return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => res.json());
};