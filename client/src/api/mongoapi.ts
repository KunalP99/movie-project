export const getWatchlistMovies = () => {
  return fetch('http://localhost:5000/watchlist-movies')
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const createWatchlistMovie = (
  movieId: number, 
  title: string, 
  overview: string, 
  rating: number, 
  poster_path: string, 
  release_date: string,
  user_id: string
) => {
  return fetch('http://localhost:5000/watchlist-movies', {
    method: 'POST',
    body: JSON.stringify({
      movieId,
      title,
      overview,
      rating,
      poster_path, 
      release_date,
      user_id
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const deleteWatchlistMovie = async (userId: string ,movieId: number) => {
  return await fetch(`http://localhost:5000/watchlist-movies/${userId}/${movieId}`, {
    method: 'DELETE',
  });
};

export const addUser = (
  email: string,
  given_name: string,
  name: string,
  picture: string,
  sub: string
) => {
  return fetch('http://localhost:5000/user/sign-up', {
    method: 'POST',
    body: JSON.stringify({
      email,
      given_name,
      name,
      picture,
      sub
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const getHistoryMovies = (userId: string) => {
  return fetch(`http://localhost:5000/history/${userId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};

export const addMovieToHistory = (
  user_id: string,
  movie_id: number,
  title: string,
  user_rating: number,
  poster_path: string,
  watch_date: Date,
  rewatch: boolean,
  points: number
) => {
  return fetch('http://localhost:5000/history', {
    method: 'POST',
    body: JSON.stringify({
      user_id,
      movie_id,
      title,
      user_rating,
      poster_path,
      watch_date,
      rewatch,
      points
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(
          `Error: Status code: ${res.status}`
        );
      }
      return res.json();
    });
};