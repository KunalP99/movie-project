export const getMoviesInTheatre = async (pageNo: number) => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=enUS&page=${pageNo}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `ERROR: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getTrendingMovies = async () => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getUpcomingMovies = async () => {
  const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
  if (!res.ok) {
    throw new Error(
      `Error: Status code: ${res.status}`
    );
  }
  return await res.json();
};

export const getMovieDetails = async (movieId: string) => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getMovieVideos = async (movieId: string) => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getMovieCredits = async (movieId: string) => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getPersonMovieCredits = async (personId: string) => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getMoviesByOneGenre = async (genreId: string, page: number) => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genreId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const searchForMovie = async (searchQuery: string, page: number) => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getPopularPeople = async () => {
  return fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};