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

export const getMovieDetails = (movieId: string) => {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getMovieVideos = (movieId: string) => {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getMovieCredits = (movieId: string) => {
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getPersonMovieCredits = (personId: string) => {
  return fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};